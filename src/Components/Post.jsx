import React, { useEffect, useState } from 'react';
import UserHeader from './UserHeader';
import { useDispatch, useSelector } from 'react-redux'
import { sendPost, getAllPost, delPost, likePost } from '../Actions/action'
import { useNavigate } from 'react-router-dom';

const initial = {
  comment: '',
  date: new Date().toISOString().split('T')[0],
  time: new Date().toISOString().split('T')[1].split('.')[0]
}
function Post() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user')) || [];
  const [post, setPost] = useState(initial)


  const { comment } = post
  const handleComment = (e) => {
    setPost({ ...post, comment: e.target.value })
  }

  const { data, loading, failed } = useSelector((state) => state.getPost)

  useEffect(() => {
    dispatch(getAllPost())
  }, [comment, dispatch])

  const hanldeSubmit = () => {
    if (comment) {
      const obj = { ...post, username: user.name, img: user.img ? user.img : null, Uid: user.id }
      dispatch(sendPost(obj))
      setPost(initial)
    }
    else {
      document.getElementById('errorMessage').style.display = 'inline'
    }
  }

  const handleDel = (id) => {
    dispatch(delPost(id))
    dispatch(getAllPost())
  }

  const handleLike = (post) => {
    const userId = user?.id;

    // Here i checked user already like this post or not its return true or false.
    const hasLiked = post.like?.some((ele) => ele === userId);

    // Remove user's like if they have liked the post.
    const updatedLikes = hasLiked ? post.like.filter((likeId) => likeId !== userId) : [...(post.like || []), userId];

    // Here i remove user's dislike if they have disliked the post.
    const updatedDislikes = post.dislike?.filter((dislikeId) => dislikeId !== userId);

    const updatedPost = { ...post, like: updatedLikes, dislike: updatedDislikes };

    dispatch(likePost(updatedPost));
    dispatch(getAllPost());
  };


  const handleDislike = (post) => {
    const userId = user?.id;

    const hasLiked = post.like?.some((ele) => ele === userId);

    const updatedLikes = hasLiked ? post.like.filter((likeId) => likeId !== userId) : post.like;

    const hasDisliked = post.dislike?.some((ele) => ele === userId);

    const updatedDislikes = hasDisliked
      ? post.dislike.filter((dislikeId) => dislikeId !== userId)
      : [...(post.dislike || []), userId];

    const updatedPost = { ...post, like: updatedLikes, dislike: updatedDislikes };

    dispatch(likePost(updatedPost));
    dispatch(getAllPost());
  };

  return (
    <>
      <UserHeader />
      <div className="container mx-auto my-8 py-8 px-32 border bg-white rounded-lg shadow-lg ">
        <h1 className="text-3xl font-bold mb-4">Posts</h1>
        {Object.keys(user).length > 0 && (
          <>
            <div className="mb-4">
              <h2 className="text-xl"><i className="fas fa-heart text-red-500"></i> Welcome to the Developer Community</h2>
            </div>
            <div className="mb-4">
              <h3 className="bg-blue-300 p-2 rounded-md m-2 text-white">Say Something...</h3>
              <div className='relative pb-4'>
                <textarea
                  onChange={handleComment}
                  value={comment}
                  className="w-full p-2 border  rounded-md" placeholder="Create a Post" rows="4"></textarea>
                <span id='errorMessage' className='hidden text-xs italic text-red-500 absolute truncate left-0 bottom-0'>please write your post to submit</span>
              </div>
              <button
                onClick={hanldeSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-1">Submit</button>
            </div>
          </>
        )}
        {data && data.length > 0 ? (
          <>
            {data.map((post, i) =>
              post.comment && (
                <div key={i} className="overflow-hidden relative bg-gray-100 p-4 flex items-center rounded-lg mb-4">
                  {post.Uid === user.id && (
                    <>
                      <div className='clippy pt-1 pb-4 bg-green-400 absolute right-0 top-0 break-all flex flex-wrap w-10 text-center text-base text-white font-bold'>
                        Your Post
                      </div>
                      <i
                        className="fa-solid fa-trash-can rounded-full p-3 cursor-pointer hover:bg-red-500 hover:transition-all transition-all text-red-500 hover:text-white shadow-lg absolute bg-white right-10 bottom-7"
                        onClick={() => handleDel(post.id)}
                      ></i>
                    </>
                  )}

                  <div className="flex flex-col justify-center mb-2">
                    <img
                      className="h-24 w-24 rounded-full"
                      src={post.img ? `${post.img}` : 'https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png'}
                      alt="user"
                    />
                    <h4 className="ml-2 mt-2 capitalize font-bold">{post.username}</h4>
                  </div>
                  <div className='absolute left-1/2'>
                    <p className="mb-2">{post.comment}</p>
                    <p className="text-gray-500 text-xs">Posted on: {post.date}</p>
                    <p className="text-gray-500 text-xs">{post.time}</p>

                    <div className="flex items-center mt-2 gap-2 ">
                      <div className='relative mr-3'>
                        <i
                          className={`${post.like?.some((likeId) => likeId == user.id) ? "fa-solid text-blue-500" : "far text-zinc-600"} fa-thumbs-up hover:scale-110 cursor-pointer mr-2`}
                          onClick={() => handleLike(post)}
                        ></i>
                        <sup className='bg-blue-500 absolute rounded-full -right-2 text-xs -top-3 text-white font-semibold h-5 w-5 flex justify-center items-center'>
                          {post.like ? post.like.length : '0'}
                        </sup>
                      </div>
                      <div className='relative mr-3'>
                        <i
                          className={`${post.dislike?.some((dislikeId) => dislikeId == user.id) ? "fa-solid text-red-500" : "far text-zinc-600"} fa-thumbs-down hover:scale-110 cursor-pointer mr-2`} 
                          onClick={() => handleDislike(post)}
                        ></i>
                        <sup className='bg-red-500 absolute rounded-full -right-2 text-xs -top-3 text-white font-semibold h-5 w-5 flex justify-center items-center'>
                          {post.dislike ? post.dislike.length : '0'}
                        </sup>
                      </div>
                      <button
                        onClick={() => alert("currently on it.")}
                        className="text-blue-500 text-sm"
                      >
                        Reply (count)
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </>
        ) : (
          <h3 className='text-center m-20 text-3xl'>No Post Yet!</h3>
        )}

        {loading && <p>Loading...</p>}

        {failed && (
          <div className='min-h-1/2 flex flex-grow items-start justify-center bg-gray-50'>
            <div className='rounded-lg bg-white p-8 text-center shadow-xl'>
              <h1 className='mb-4 text-4xl font-bold'>404</h1>
              <p className='text-gray-600'>{failed}</p>
              <p className='text-red-600'>Oops! Something Went Wrong Contact With The Site Owner</p>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default Post;
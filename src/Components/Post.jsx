import React, { useEffect, useState, useCallback } from 'react';
import UserHeader from './UserHeader';
import { useDispatch, useSelector } from 'react-redux'
import { sendPost, getAllPost, delPost, likePost } from '../Actions/action'
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../utils/useDocumentTitle';
import Loader from './Loader';

const initialPostState = {
  comment: '',
  date: new Date().toISOString().split('T')[0],
  time: new Date().toISOString().split('T')[1].split('.')[0]
}

function Post() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useDocumentTitle('Posts');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const user = JSON.parse(localStorage.getItem('user')) || {}
  const [post, setPost] = useState(initialPostState)
  const [error, setError] = useState('')

  const { data, loading, failed } = useSelector((state) => state.getPost)

  useEffect(() => {
    dispatch(getAllPost())
  }, [dispatch])

  const handleComment = (e) => {
    setPost({ ...post, comment: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = useCallback(() => {
    if (!post.comment.trim()) {
      setError('Please write your post to submit')
      return
    }

    const postData = {
      ...post,
      username: user.name,
      img: user.img || null,
      Uid: user.id
    }

    dispatch(sendPost(postData))
    setPost(initialPostState)
    setError('')
  }, [post, user, dispatch])

  const handleDelete = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(delPost(id))
    }
  }, [dispatch])

  const handleLike = useCallback((post) => {
    const userId = user?.id
    if (!userId) return

    const hasLiked = post.like?.some((likeId) => likeId === userId)
    const updatedLikes = hasLiked
      ? post.like.filter((likeId) => likeId !== userId)
      : [...(post.like || []), userId]

    const updatedDislikes = post.dislike?.filter((dislikeId) => dislikeId !== userId)
    const updatedPost = { ...post, like: updatedLikes, dislike: updatedDislikes }

    dispatch(likePost(updatedPost))
  }, [user?.id, dispatch])

  const handleDislike = useCallback((post) => {
    const userId = user?.id
    if (!userId) return

    const hasLiked = post.like?.some((likeId) => likeId === userId)
    const updatedLikes = hasLiked
      ? post.like.filter((likeId) => likeId !== userId)
      : post.like

    const hasDisliked = post.dislike?.some((dislikeId) => dislikeId === userId)
    const updatedDislikes = hasDisliked
      ? post.dislike.filter((dislikeId) => dislikeId !== userId)
      : [...(post.dislike || []), userId]

    const updatedPost = { ...post, like: updatedLikes, dislike: updatedDislikes }
    dispatch(likePost(updatedPost))
  }, [user?.id, dispatch])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  if (!user.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view posts</h2>
          <button
            onClick={() => navigate('/sign_in')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <UserHeader />
      <div className="container mx-auto my-8 py-8 px-4 md:px-32">
        <div className="bg-white p-6">
          <h1 className="text-3xl font-bold mb-6 mx-auto max-w-7xl">Developer Community</h1>

          {/* Create Post Section */}
          <div className="mb-8 bg-gray-50 rounded-lg mx-auto max-w-7xl">
            <h2 className="text-xl font-semibold mb-4">
              <i className="fas fa-heart text-red-500 mr-2"></i>
              Share Your Thoughts
            </h2>
            <div className='relative'>
              <textarea
                onChange={handleComment}
                onKeyPress={handleKeyPress}
                value={post.comment}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="What's on your mind?"
                rows="4"
              />
              {error && (
                <span className='text-red-500 text-sm mt-1 block'>
                  {error}
                </span>
              )}
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-3 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>

          {/* Posts List */}
          {loading && <Loader />}

          {failed && (
            <div className='text-center py-8'>
              <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                <h3 className='text-red-800 font-semibold mb-2'>Error Loading Posts</h3>
                <p className='text-red-600'>{failed}</p>
                <button
                  onClick={() => dispatch(getAllPost())}
                  className='mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {!loading && !failed && data && data.length > 0 ? (
            <div className="space-y-4">
              {data.map((post) => (
                post.comment && (
                  <div key={post.id} className="bg-gray-50 p-6 rounded-xl relative border shadow-lg mx-auto max-w-7xl">
                    {post.Uid === user.id && (
                      <div className="absolute top-2 right-2 flex items-center space-x-2">
                        {/* <span className="bg-blue-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                          Your Post
                        </span> */}
                        <div className='clippy pt-1 pb-4 bg-green-400 absolute -right-2 -top-2 rounded-tr-xl break-all flex flex-wrap w-10 text-center text-base text-white font-bold'>
                          Your Post
                        </div>
                        <i
                          className="fa-solid fa-trash-can rounded-full p-3 cursor-pointer hover:bg-red-500 hover:transition-all transition-all text-red-500 hover:text-white shadow-lg absolute bg-white right-0 top-[76px]"
                          onClick={() => handleDelete(post.id)}
                        ></i>
                      </div>
                    )}

                    <div className="flex items-start space-x-4">
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={post.img || 'https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png'}
                        alt="user avatar"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold capitalize">{post.username}</h4>
                          <span className="text-gray-500 text-sm">
                            {new Date(post.date).toLocaleDateString()} at {post.time}
                          </span>
                        </div>

                        <p className="text-gray-800 break-words">{post.comment}</p>

                        <div className="flex items-center space-x-4 mt-2">
                          <button onClick={() => handleLike(post)} className={`flex items-center space-x-1 transition-colors duration-200 ${post.like?.includes(user.id) ? 'text-blue-500' : 'text-gray-500 hover:text-green-500'}`}>
                            <i className="fa-solid fa-thumbs-up"></i>
                            <span>{post.like?.length || 0}</span>
                          </button>
                          <button onClick={() => handleDislike(post)} className={`flex items-center space-x-1 transition-colors duration-200 ${post.dislike?.includes(user.id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}>
                            <i className="fa-solid fa-thumbs-down"></i>
                            <span>{post.dislike?.length || 0}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          ) : !loading && !failed && (
            <div className="text-center py-12">
              <h3 className="text-2xl text-gray-500 mb-4">No Posts Yet!</h3>
              <p className="text-gray-400">Be the first to share something with the community!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Post;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReplies, addReply, getPostById } from '../Actions/action';

function Discussion() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user')) || [];
  const [replyInput, setReplyInput] = useState('');

  const { replies } = useSelector((state) => state.replies);
  const { post } = useSelector((state) => state.currentPost);

  useEffect(() => {
    dispatch(getPostById(postId));
    dispatch(getReplies(postId));
  }, [dispatch, postId]);

  const handleReplyChange = (e) => {
    setReplyInput(e.target.value);
  };

  const handleReplySubmit = () => {
    if (replyInput) {
      const reply = {
        postId,
        username: user.name,
        comment: replyInput,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toISOString().split('T')[1].split('.')[0],
      };
      dispatch(addReply(reply));
      setReplyInput('');
    }
  };

  return (
    <div className="container mx-auto my-8 py-8 px-32 border bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Discussion</h1>

      {post && (
        <div className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <img
              className="h-12 w-12 rounded-full"
              src={post.img ? `${post.img}` : 'https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png'}
              alt="user"
            />
            <h4 className="ml-2 capitalize font-bold">{post.username}</h4>
          </div>
          <p className="mb-2">{post.comment}</p>
          <p className="text-gray-500 text-xs">Posted on: {post.date} at {post.time}</p>
        </div>
      )}

      <div className="mb-4">
        {replies.length > 0 ? (
          replies.map((reply, index) => (
            <div key={index} className="bg-white p-2 rounded-md mb-2 shadow-md">
              <p className="font-bold">{reply.username}</p>
              <p>{reply.comment}</p>
              <p className="text-gray-500 text-xs">Replied on: {reply.date} at {reply.time}</p>
            </div>
          ))
        ) : (
          <p>No replies yet.</p>
        )}
      </div>

      <div className="mt-4">
        <textarea
          value={replyInput}
          onChange={handleReplyChange}
          className="w-full p-2 border rounded-md"
          placeholder="Write a reply..."
          rows="2"
        ></textarea>
        <button
          onClick={handleReplySubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-1"
        >
          Reply
        </button>
      </div>
    </div>
  );
}

export default Discussion;

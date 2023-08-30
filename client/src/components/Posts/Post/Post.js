import React from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineLike, AiFillLike, AiOutlineDelete, AiOutlineMore } from 'react-icons/ai'; // Replace with appropriate React icons
import moment from 'moment';

import { likePost, deletePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><AiFillLike className="inline-block mr-1" size={18} />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><AiOutlineLike className="inline-block mr-1" size={18} />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><AiOutlineLike className="inline-block mr-1" size={18} />&nbsp;Like</>;
  };

  return (
    <div className="bg-white shadow-md rounded-md">
      <img className="h-56 object-cover object-center" src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-indigo-600 text-lg font-bold">{post.name}</p>
          <p className="text-gray-500 text-sm">{moment(post.createdAt).fromNow()}</p>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <button onClick={() => setCurrentId(post._id)} className="text-white">
            <AiOutlineMore size={20} />
          </button>
        )}
        <p className="text-gray-500 text-sm mt-1">{post.tags.map((tag) => `#${tag} `)}</p>
        <p className="text-2xl font-semibold my-2">{post.title}</p>
        <p className="text-gray-700">{post.message}</p>
        <div className="flex items-center justify-between mt-4">
          <button
            className={`flex items-center space-x-1 ${!user?.result && 'cursor-not-allowed opacity-50'}`}
            disabled={!user?.result}
            onClick={() => dispatch(likePost(post._id))}
          >
            <Likes />
          </button>
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <button onClick={() => dispatch(deletePost(post._id))} className="text-red-600 hover:text-red-700">
              <AiOutlineDelete size={18} />
              <span className="ml-1">Delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;

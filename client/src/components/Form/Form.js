import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FileBase64 } from 'react-file-base64'; 

import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <div className="p-4 bg-white border rounded-md">
        <p className="text-center">Please Sign In to create your own memories and like other's memories.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white border rounded-md">
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h6 className="text-2xl font-bold">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</h6>
        <input
          className="w-full p-2 mt-2 border rounded-md"
          name="title"
          type="text"
          placeholder="Title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <textarea
          className="w-full p-2 mt-2 border rounded-md resize-none"
          name="message"
          rows="4"
          placeholder="Message"
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <input
          className="w-full p-2 mt-2 border rounded-md"
          name="tags"
          type="text"
          placeholder="Tags (comma separated)"
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />
        <div className="mt-2">
          <FileBase64 type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <button className="w-full mt-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700" type="submit">
          Submit
        </button>
        <button className="w-full mt-2 py-2 text-white bg-red-600 rounded-md hover:bg-red-700" onClick={clear}>
          Clear
        </button>
      </form>
    </div>
  );
};

export default Form;

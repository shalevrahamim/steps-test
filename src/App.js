import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Comment from './components/comment/comment';

const LIMIT = 20;
let page = 1;

const getComments = async (page, limit) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${limit}`)
  return response.data;
};

const App = () => {
  const [commentState, setCommentState] = useState([]);

  const loadComments = async () => {
    const newComments = await getComments(page++, LIMIT);
    if (!newComments.length)
      document.getElementById('btnLoadComment').hidden = true;
    commentState.push(...newComments);
    console.log('commentState', commentState)
    setCommentState([...commentState]);
  }

  const insertComment = async () => {
    const inputValue = document.getElementById('inputComment').value;
    if (!inputValue)
      return;
    try {
      await axios.post('test.steps.me/test/testAssignComment', { body: inputValue });
    }
    catch (error) {
      console.log('error', error.message);
    }
    commentState.push({ body: inputValue });
    setCommentState([...commentState]);
  }
  console.log(commentState);
  return (
    <div className="App">
      <h1>Commenter</h1>
      <input id='inputComment' placeholder='Add a comment...' className='Input' />
      <button onClick={insertComment}>insert comment</button>
      <br />
      {commentState.map(item =>
        <Comment key={item.id} comment={item} />
      )}
      <button id='btnLoadComment' onClick={loadComments}>load more comments</button>
    </div>
  );
}

export default App;

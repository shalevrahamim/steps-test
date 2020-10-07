import React, { useState } from 'react';
import './App.css';
import Comment from './components/comment/comment';
import { getComments, sendComment } from './utils/commenter';

const EMAIL = 'shalevr1997@gmail.com';
const COMMENT_NAME = 'new comment';
let page = 1;

const App = () => {
  const [commentState, setCommentState] = useState([]);

  const loadComments = async () => {
    const newComments = await getComments(page++);
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
    const comment = await sendComment({ email: EMAIL, name: COMMENT_NAME, body: inputValue });
    commentState.push(comment);
    setCommentState([...commentState]);
  }

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

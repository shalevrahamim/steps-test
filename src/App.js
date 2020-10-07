import React, { useState } from 'react';
import './App.css';
import Comment from './components/comment/comment';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getComments, sendComment } from './utils/commenter';

const EMAIL = 'shalevr1997@gmail.com';
const COMMENT_NAME = 'new comment';
let page = 1;
let hasMoreComments = true;

const App = () => {
  const [commentState, setCommentState] = useState([]);

  const loadComments = async () => {
    const newComments = await getComments(page);
    if(!newComments.length)
      hasMoreComments = false;
    else
      page++;
    commentState.push(...newComments);
    setCommentState([...commentState]);
  }
  
  const insertComment = async () => {
    loadComments();
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
      <InfiniteScroll
        dataLength={commentState.length}
        next={loadComments}
        hasMore={hasMoreComments}
        loader={<h4>Loading comments data...</h4>}
      >
        {commentState.map(item =>
          <Comment key={item.id} comment={item} />
        )}
      </InfiniteScroll>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    const newComments = await getComments(page);
    if (!newComments.length)
      hasMoreComments = false;
    else
      page++;
    commentState.push(...newComments);
    setCommentState([...commentState]);
  }

  const insertComment = async () => {
    const inputValue = document.getElementById('inputComment').value;
    document.getElementById('inputComment').value = '';
    if (!inputValue)
      return;
    const comment = await sendComment({ email: EMAIL, name: COMMENT_NAME, body: inputValue, isMy: true });
    commentState.unshift(comment);
    setCommentState([...commentState]);
  }

  return (
    <div className="app">
      <input id='inputComment' placeholder='Add a comment...' className='input' />
      <button onClick={insertComment} className='button'>insert comment</button>
      <br />
      <InfiniteScroll
        dataLength={commentState.length}
        next={loadComments}
        hasMore={hasMoreComments}
        loader={<h4>Loading comments data...</h4>}
      >
        {commentState.map(item => <Comment key={item.id} comment={item} />)}
      </InfiniteScroll>
    </div>
  );
}

export default App;

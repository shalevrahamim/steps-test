import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Comment from './components/comment/comment';

const LIMIT = 20;
let page = 1;
const comments = [];

const getComments = async (page, limit) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${limit}`)
  const comments = response.json()
  return comments;
};

const App = () => {
  const [commentState, setCommentState] = useState({
    comments: comments,
    lala: "shalev"
  });

  const loadComments = async () => {
    const newComments = await getComments(page++, LIMIT);
    comments.push(...newComments);
    setCommentState({
      comments: comments
    })
  }

  const insertComment = async () => {
    console.log("comment inserted")
  }

  return (
    <div className="App">
      <h1>Commenter</h1>
    <input/>
    <button onClick={insertComment}>insert comment</button>
    <br/>
      {commentState.comments.map(item => {
        return <Comment comment={item.body} />
      })}
    <button onClick={loadComments}>load more comments</button>
    </div>
  );
}

export default App;

import React from 'react';
import './comment.css'

const comment = (props) => {
    const comment = props.comment;
    return (
        <div className='Comment'>
            <p>email: {comment.email}</p>
            <p>name: {comment.name}</p>
            <p>comment: {comment.body}</p>
        </div>
    )
}

export default comment;
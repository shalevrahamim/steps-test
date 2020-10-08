import React from 'react';
import './comment.css'

const comment = (props) => {
    const comment = props.comment;
    return (
        <div className='box'>
            <p className='email'>{comment.email}</p>
            <p className='name'>{comment.name}</p>
            <p>{comment.body}</p>
        </div>
    )
}

export default comment;
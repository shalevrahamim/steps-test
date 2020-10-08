import React from 'react';
import './comment.css';
import classNames from 'classnames';

const comment = (props) => {
    const comment = props.comment;
    return (
        <div className={classNames('box', { "my-box": comment.isMy })} >
            <p className='email'>{comment.email}</p>
            <p className='name'>{comment.name}</p>
            <p>{comment.body}</p>
        </div>
    )
}

export default comment;
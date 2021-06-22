import React from 'react';

const MessageComponent = props => {
    return (
        <div
            style={{
                position: 'absolute',
                bottom: '10%',
                right: '10%',
                zIndex: '999',
                padding: '4% 8% 4% 8%',
                background: 'green',
                opacity: '50%'
            }}
            className='border border-dark rounded'>
            <p>{props.message}</p>
        </div>
    );
};

export default MessageComponent;
import React from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ShareIcon from '@material-ui/icons/Share'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'

import './widget.css'
function Widget({ title, description, url, background }) {
    return (
        <div className='widget'>
            <img alt='title' src={background} onClick={() => window.open(background, '_blank')} />
            <h3 onClick={() => window.open(url, '_blank')}>{title}</h3>
            <p onClick={() => window.open(url, '_blank')}>{description}</p>
            <div className='bottomcontainer'>
                <FavoriteBorderIcon />
                <ShareIcon />
                <ChatBubbleOutlineIcon />
            </div>



        </div>
    )
}

export default Widget
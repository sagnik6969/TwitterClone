import React from 'react'
import './tweetbox.css'
// import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
// import image from './logo192.png'

function Twitbox({ name, text, Image }) {
    //const image = require("./logo192.png")
    return (

        <div className='tweetbox'>
            <img
                src={Image}
                alt="alternatetext"
            />
            <div className='tweetBody'>
                <h4>{name}<span className='username'>@{name}</span></h4>
                <p>{text}</p>

            </div>

        </div>
    )

}

export default Twitbox
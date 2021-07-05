import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import './searchbox.css'
function Searchbox() {
    return (
        <div className='searchbox'>
            <SearchIcon />
            <input type='text' placeholder='What’s happening?'></input>

        </div>
    )
}

export default Searchbox
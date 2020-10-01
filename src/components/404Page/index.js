import React from 'react';
import { Link } from 'react-router-dom';
import './404.css';

export default function InvalidPage(){
    return (
        <div className='wrapper'>
            <div>
                <div className="status-code">404</div>
                <div className='pos'>
                    <p className="msg">Sorry! The Page You're Looking For Was Not Found.</p>
                    <Link to='/'><button>Go To Home</button></Link>
                </div>
            </div>
        </div>
    )
}


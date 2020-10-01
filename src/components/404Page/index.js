import React from 'react'
import './404.css'

export default function InvalidPage(){
    return (
        <div className='wrapper'>
            <div>
                <div className="status-code">404</div>
                <p className="msg">Sorry! The Page You're Looking For Was Not Found.</p>
            </div>
        </div>
    )
}


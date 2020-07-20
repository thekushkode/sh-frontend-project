import React from 'react'
import SocialPage2 from './feed2'

export default function PublicFeed() {
    return (
        <div>
            <header style={{ marginBottom: '80px' }}>

            </header>
            <main style={{ display: 'flex',backgroundColor: '#e1f5fe' }}>
                <div md='6' style={{ width: '50%', marginTop: '10px', marginLeft: '10px' }}>
                    <SocialPage2 />
                </div>
                <div md='6' style={{ width: '50%' }}>
                    <h1>AdSense</h1>
                </div>

            </main >
        </div >
    )
}

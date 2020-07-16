import React from 'react'
import SocialPage2 from './feed2'

export default function PublicFeed() {
    return (
        <div>
            <header style={{ marginBottom: '100px' }}>

            </header>
            <main className='d-flex'>
                <div style={{ width: '50%' }}>
                    <SocialPage2 />
                </div>
                <div style={{ width: '50%' }}>
                    <h1>AdSense</h1>
                </div>
            </main>
        </div>
    )
}

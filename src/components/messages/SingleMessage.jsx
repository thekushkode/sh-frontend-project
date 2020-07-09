import React from 'react'
import moment from 'moment'
import { css } from 'glamor';
moment().format()

const recipientBackground = css({
    backgroundColor: 'rgb(240, 240, 240)',
    borderRadius: '10px',
    textAlign: "left"
});

const yourBackground = css({
    backgroundColor: 'rgb(0,153,255)',
    borderRadius: '10px',
    textAlign: "right"
});

// style={{ textAlign: "left" }}

// ---------------------------------------
// PROPS being passed for styling purposes:
//
// if (item.sender === user.displayName) {
//     styles = ['end', 'aqua-gradient', 'text-white']
// } else {
//     styles = ['start', 'tempting-azure-gradient lighten-3', 'text-black']
//


export default function SingleMessage(props) {
    return (
        <>
            {/* every timestamp appears above each message */}
            {/* these timestamps should be centered */}
            <div className='text-center'>
                <small>{moment(props.content.timeStamp).fromNow()}</small>
            </div>

            <small className={`row pl-3 justify-content-${props.formatting[0]}`} style={{ color: 'grey' }}>
                {(props.formatting[0] === 'start' ? props.content.sender : '')}
            </small>
            <div className={`d-flex justify-content-${props.formatting[0]} mb-3`}>
                <div className={`${props.formatting[1]} ${props.formatting[2]} rounded-pill px-1 w-75`} style={{ backgroundColor: props.formatting[3], borderRadius: '20px !important' }} >

                    {/* sender should get left and right aligned based on you vs recipient */}
                    {/* <div className='row pl-1 m-0'>
                        <small>{props.content.sender}</small>
                    </div> */}
                    {/* message content should get left and right aligned based on you vs recipient */}

                    <div className={`row p-2 m-0 justify-content-${props.formatting[0]}`}>
                        {props.content.message}
                    </div>
                </div>
            </div >
        </>
    )
}

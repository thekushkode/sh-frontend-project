import React from 'react'
import moment from 'moment'
import { css } from 'glamor';
moment().format()

const recipientBackground = css({
    backgroundColor: 'rgb(240, 240, 240)',
});

const yourBackground = css({
    backgroundColor: 'rgb(0,153,255)',
});



export default function SingleMessage(props) {
    return (
        <>
            <div className='text-center'>
                <small>{moment(props.content.timeStamp).fromNow()}</small>
            </div>
            <div className={`d-flex justify-content-${props.formating[0]}`}>
                <div className={`${props.formating[1]} rounded px-3 ${props.formating[2]} w-75 ${yourBackground}`}>
                    <div className='row pl-1'>
                        <small>{props.content.sender}</small>
                    </div>
                    {props.content.message}
                </div>
            </div>
        </>
    )
}

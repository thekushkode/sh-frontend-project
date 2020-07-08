import React from 'react'
import moment from 'moment'
moment().format()

export default function SingleMessage(props) {
    return (
        <>
            <div className='text-center'>
                <small>{moment(props.content.timeStamp).fromNow()}</small>
            </div>
            <div className={`d-flex justify-content-${props.formating[0]}`}>
                <div className={`${props.formating[1]} rounded px-3 ${props.formating[2]} w-75`}>
                    <div className='row pl-1'>
                        <small>{props.content.sender}</small>
                    </div>
                    {props.content.message}
                </div>
            </div>
        </>
    )
}

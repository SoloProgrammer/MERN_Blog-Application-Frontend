import React from 'react'
import './flash.css'

function Flash() {
    let items = [...new Array(21)]

    return (
        <>
            <div className="blocks">
                {
                    items.map((item,ind) => {
                        return (
                            <div key={ind} className="block">
                                <div className="img_block"></div>
                                <div className="time_block"></div>
                                <span className='like_comm_block'>
                                    <div></div>
                                    <div></div>
                                </span>
                                <div className="title_block"></div>
                                <div className="desc_block"></div>
                                <span className="author_block">
                                    <div className='user_block'></div>
                                    <div></div>
                                </span>
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default Flash

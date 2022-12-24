import e from 'cors';
import React, { useRef, useState } from 'react'
import './Share.css'
export const Share = ({ active, setActive, img }) => {

    let fas = document.querySelectorAll('.fa-brands');

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 2000);
    }
    let icon_box = useRef();
    active && setTimeout(() => {
        if (window.innerWidth < 600) {
            icon_box.current.classList.add('come1');
        }
    }, 100);

    const HandleClose = () => {

        document.querySelector('.hit').classList.add('over_search')

        setTimeout(() => {
            document.querySelector('.share_top .hit').classList.remove('over_search')
            icon_box.current.classList.remove('come1')
            setActive(false);
            fas.forEach(icon => {
                icon.classList.remove('op1')
            })
        }, 300);

    }

    const HandleOnchange = () => { };

    let whatsapp_btn = document.querySelector('.whatsapp_btn');
    let facebook_btn = document.querySelector('.facebook_btn');
    let linkedin_btn = document.querySelector('.linkedin_btn');
    let pinterest_btn = document.querySelector('.pinterest_btn');
    let twitter_btn = document.querySelector('.twitter_btn');
    let reddit_btn = document.querySelector('.reddit_btn');

    function init() {
        const post_url = encodeURI(window.location.href);
        const post_title = "Hey :), Check out this awesome Blog ! ";
        whatsapp_btn.setAttribute('href', `https://api.whatsapp.com/send?text=${post_title} ${post_url}`)
        facebook_btn.setAttribute('href', `https://www.facebook.com/sharer.php?u=${post_url}`)
        reddit_btn.setAttribute('href', `https://reddit.com/submit?url=${post_url}&title=${post_title}`)
        twitter_btn.setAttribute('href', `https://twitter.com/share?url=${post_url}&text=${post_title}`)
        pinterest_btn.setAttribute('href', `https://pinterest.com/pin/create/bookmarklet/?media=${img}&url=${post_url}&description=${post_title}`)
        linkedin_btn.setAttribute('href', `https://www.linkedin.com/shareArticle?url=${post_url}&title=${post_title}`);

        fas.forEach(icon => {
            icon.classList.add('op1')
        })

    }

    active && init();

    return (
        <>
            <div className={`comm_font ${!active ? "ShareBox" : "ShareBox show"}`}>
                <div ref={icon_box} className="Share_icons_box">

                    <div className="share_top">
                        <h3>Share <small ><i className="fa-solid fa-share-nodes share_icon"></i></small> </h3>
                        <div className="hiteffect">
                            <i onClick={HandleClose} className="fa-solid fa-xmark">
                                <div className='hit'></div>
                            </i>
                        </div>
                    </div>
                    <p>Share this blog via</p>
                    <div className="icons">
                        <a href='#' target='_blank' className='facebook_btn icon_btn'>
                            <span className='icon_name'> Facebook </span>
                            <i className="fa-brands fa-square-facebook"> </i></a>
                        <a href='#' target='_blank' className='whatsapp_btn icon_btn'>
                            <span className='icon_name'> Whatsapp </span>
                            <i className="fa-brands fa-square-whatsapp"></i></a>
                        <a href='#' target='_blank' className='linkedin_btn icon_btn'>
                            <span className='icon_name'> Linkedin </span>
                            <i className="fa-brands fa-linkedin"></i></a>
                        <a href='#' target='_blank' className='pinterest_btn icon_btn'>
                            <span className='icon_name'> Pinterest </span>
                            <i className="fa-brands fa-square-pinterest"></i></a>
                        <a href='#' target='_blank' className='twitter_btn icon_btn'>
                            <span className='icon_name'> Twitter </span>
                            <i className="fa-brands fa-square-twitter"></i></a>
                        <a href='#' target='_blank' className='reddit_btn icon_btn'>
                            <span className='icon_name'> Reddit </span>
                            <i className="fa-brands fa-square-reddit"></i></a>
                    </div>
                    <b className='c_b'>Or Copy Link</b>
                    <div className="copy_link">
                        <div className="inpt">
                            <input onChange={HandleOnchange} type="text" value={window.location.href} />
                            <button className={`${copied && "copied"}`} onClick={handleCopy}>{copied ? "Copied" : "Copy"} </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 
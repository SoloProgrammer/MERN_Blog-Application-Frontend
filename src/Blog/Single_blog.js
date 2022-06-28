import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import blogcontext from '../context/blog/blogcontext';
import 'react-toastify/dist/ReactToastify.css';

import loader from '../loader/loader.gif'
import Category_blogs from './Category_blogs';

function Single_blog({setblogdetail}) {

  const Bcontext = useContext(blogcontext)

  const {userdetail, Getuser,effectkey,seteffectkey, blog, fetch_single_blog, comments, load, like_blog, post_commnet, del_comment, like_comment, dislike_comment } = Bcontext;

  const [categoryblogs, setcategoryblogs] = useState([])

  const navigate = useNavigate();

  const fetch_blogs_by_category = async () => {
    const { category } = JSON.parse(localStorage.getItem("blogdetail"))

    const res1 = await fetch(`http://localhost:5000/api/blog/blogs_by_category/${category}`)

    const json1 = await res1.json();

    setcategoryblogs(json1.blogs_by_category)
  }

  const [Blogid, setblogid] = useState('');

  const apicalls = async () =>{
    if (localStorage.getItem("blogdetail") !== String(undefined)) {

      const { blogid } = JSON.parse(localStorage.getItem("blogdetail"))

      setblogid(blogid)
      fetch_blogs_by_category();
      const a = await fetch_single_blog(blogid);
      if(a === false){
        navigate('/')
      }
      Getuser();

    }
    else {

      navigate('/')
    }

  }

  useEffect(() => {

    apicalls()

  }, [effectkey])

  const [comminpt, setcomminpt] = useState('')

  const Handle_send = () => {
    const alert_txt = document.querySelector('.alert_txt');
    const Txtarea = document.querySelector('.textarea');
    if (comminpt.length === 0) {
      toast.error("Plz write the comment fisrt!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      alert_txt.classList.remove('none')
      Txtarea.classList.add('b-red')
      Txtarea.focus()
    }
    else {
      post_commnet(comminpt, Blogid);
      alert_txt.classList.add('none')
      Txtarea.classList.remove('b-red')
      setcomminpt('')

    }
  }


  const para_slice_1 = (para) => {
    let para_1 = para.slice(0, 758)
    return para_1;
  }

  let para_2 = '';

  if (blog.desc) {
    para_2 = blog.desc.slice(758);
  }

  const Handle_delete_blog = async (blogid) =>{

    console.log(blogid)
    
    const res = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/blog/Delete_blog/${blogid}`,{
      method:"DELETE"
    })

    // const json = await res.json();
    
    // console.log(json)
    navigate('/')
    
  }

  // console.log()

  return (
    <>
      <div className="h2">
        <h1> <span>Blogs</span> <span>/</span> <span>{blog.category}</span> </h1>

      </div>
      <div className="flex-1">
        <div className="singleblog">
          <h3 className='text-center gray pos-rel'>
            {blog.title}
            {blog.user === userdetail.id && <div className="actionsdiv">
              <i onClick={()=>{Handle_delete_blog(Blogid)}} className="fa-solid fa-trash"></i>
              <i className="fa-solid fa-pen-to-square"></i>
            </div>}
          </h3>
          {load ? <img src={`${loader}`} className="load1" alt="" /> : <img className='blogimg-1 m-b-2' src={`${process.env.REACT_APP_IMAGE_PATH_NAME}/${blog.blogimg}`} />}
          <p className=' heart_p'>
            <span>by - @{blog.author_name}</span>
            <span>
              {Object.keys(blog).length > 0 && <span className='Like-btn'><i onClick={() => { like_blog(Blogid) }} className={`${blog.Blikearr.includes(userdetail.id) ? "fa-solid red bg-red" : "fa-regular"} fa-heart`}></i> {blog.Blikearr.includes(userdetail.id) ? <span>liked</span> : <span>likes</span>} : <span>{blog.Blikearr.length}</span></span>}
            </span>
          </p>
          {blog.desc && <p className='desc'>{para_slice_1(blog.desc)} {para_2.length > 0 && <span className='desc display'>{para_2}</span>}</p>}
        </div>

        <div className="box-comm m-t-7">

          <h2 className='m-b-1'> <span className='lightslategray'>Comments on this blog</span>  <small className='comment_count'>[ {comments.length} ]</small></h2>
          <div className="comm_box">
            {comments.length === 0 && <p className='no_comm'> <span> <img style={{ "width": "12em" }} src="https://fmdam.org/wp-content/uploads/2016/05/MD-DNR-Comments-Fargo-Dam-and-FM-Diversion-Project.png" alt="" /> </span> No Comments Yet !</p>}
            {

              comments.length > 0 && comments.map((elm, index) => {
                return <div key={index} className="comm_content">
                  <div className="userdiv">
                    <div className="left">
                      <span className='user_name'> <img className='userlogo' src="https://i7.pngguru.com/preview/831/88/865/user-profile-computer-icons-user-interface-mystique.jpg" alt="user" /><span className='mx-2  font_8'>{elm.name}</span> </span>
                      <i id={`like${index}`} onClick={() => { like_comment(Blogid, elm.comm_id, index) }} className={`like ${elm.Clikearr.includes(userdetail.id) ? "fa-solid red" : "fa-regular thumb_up"} fa-thumbs-up`}>
                      </i>
                      <span className='count mx-1'> {elm.Clikearr.length} </span>
                      <i id={`dislike${index}`} onClick={() => { dislike_comment(Blogid, elm.comm_id, index) }} className={`${elm.Cdislikearr.includes(userdetail.id) ? "fa-solid" : "fa-regular"}       fa-thumbs-down dislike`} >
                      </i>
                      <span className='count mx-1'> {elm.Cdislikearr.length}</span>
                    </div>
                    {elm.name === userdetail.Name ? <div className="right icons">
                      <i onClick={() => { del_comment(elm.comm_id, Blogid) }} className="fa-solid fa-trash-can"></i>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                      : <div className='Rep comm_font cur_point'>
                        <span><i className="fa-solid fa-comment-dots"></i></span>  <span className='mx-1'>Reply</span>
                      </div>}
                  </div>
                  <p className='user_comm font_9'>{elm.comment}</p>
                  <hr />
                </div>
              })
            }
          </div>

          <div className="post_comm">
            <div className="comm_img_div">

              <img className='comm_img' src="https://www.dundas.com/Content/Images/home/home2020/icons/nav/resources/Blogs.png" />
              <span>Post Your Comment below : </span>

            </div>
            <div className="comm_inpt">
              <textarea className='textarea' value={comminpt} onChange={(e) => { setcomminpt(e.target.value) }} rows={7} type="text" name="comm" id="comment" />
              <img onClick={Handle_send} src="https://icons-for-free.com/iconfiles/png/512/send+icon-1320185654900887696.png" alt="" />
            </div>
            <span className='alert_txt none'>**plz write something before post</span>
          </div>

        </div>
      </div>
      {para_2.length > 0 && <span className='desc span_desc'>{para_2}</span>}

       <Category_blogs toast={toast} seteffectkey = {seteffectkey} effectkey = {effectkey} setblogdetail = {setblogdetail} categoryblogs={categoryblogs} blog={blog} />

      <ToastContainer position="top-right"
        autoClose={1600}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </>
  )
}

export default Single_blog

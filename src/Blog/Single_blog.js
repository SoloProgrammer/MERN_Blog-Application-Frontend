import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import blogcontext from '../context/blog/blogcontext';
import 'react-toastify/dist/ReactToastify.css';

import loader from '../loader/loader.gif'
import Category_blogs from './Category_blogs';

function Single_blog({ setblogdetail }) {

  const Bcontext = useContext(blogcontext)

  const { userdetail, Getuser, effectkey, seteffectkey, blog, fetch_single_blog, comments, load, like_blog, post_commnet, del_comment, like_comment, dislike_comment, setload, Reply_to_comments,delete_reply_of_comments } = Bcontext;

  const [categoryblogs, setcategoryblogs] = useState([])

  const navigate = useNavigate();

  const fetch_blogs_by_category = async () => {
    const { category } = JSON.parse(localStorage.getItem("blogdetail"))

    const res1 = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/blog/blogs_by_category/${category}`)

    const json1 = await res1.json();

    setcategoryblogs(json1.blogs_by_category)
  }

  const [Blogid, setblogid] = useState('');

  const apicalls = async () => {
    if (localStorage.getItem("blogdetail") !== String(undefined)) {

      const { blogid } = JSON.parse(localStorage.getItem("blogdetail"))

      setblogid(blogid)
      fetch_blogs_by_category();
      const a = await fetch_single_blog(blogid);
      if (a === false) {
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
    window.scrollTo(0, 0)
    setload(true)

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

  const Handle_delete_blog = async (blogid) => {

    let sure = window.confirm("Are you sure you want to delete this post!")
    if (!sure) return;


    const res = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/blog/Delete_blog/${blogid}`, {
      method: "DELETE"
    })

    navigate('/')
    toast.success("Your Blog has been removed", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  }

  const showrepbox = (index) => {

    let reply_box_by_id = document.getElementById(`all_rep_box${index}`);

    // Checking while reply is prsent or not if not present the reply_box_by_id will be null and if present it is not null 
    // and when it is present then only it removes the clas from the classlists.

    if (reply_box_by_id) {
      reply_box_by_id.classList.remove('show_rep_box')
    }

    let rep_box = document.getElementById(`send_rep_box${index}`);
    rep_box.classList.toggle('show_rep_box');


  }

  const Handle_show_reply = (index) => {

    let rep_box = document.getElementById(`send_rep_box${index}`);

    rep_box.classList.remove('show_rep_box');

    let reply_box_by_id = document.getElementById(`all_rep_box${index}`)

    let loader = document.getElementById(`load${index}`);

    if (!reply_box_by_id.classList.contains('show_rep_box')) {

      loader.classList.add('inline-block');

      setTimeout(() => {

        reply_box_by_id.classList.add('show_rep_box')

        loader.classList.remove('inline-block')
      }, 500);
    }
    else {
      reply_box_by_id.classList.remove('show_rep_box')
    }
  }

  const [reply_inpt,setreply_inpt] = useState('')

  const Onchange = (e) =>{
    setreply_inpt(e.target.value);
  }

  const Handle_post_reply = (index,id) =>{

    // index is needed bczz to remove classlist from rep_box which we find it by id i.e the index passing as a parameter in this function.

    Reply_to_comments(reply_inpt,id) // fetch function destructure from blogcontext....

    toast.success("Replied sucessfully..", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
        
    let rep_box = document.getElementById(`send_rep_box${index}`);
    rep_box.classList.remove('show_rep_box');

    setreply_inpt('');
  }

  const Handle_delete_reply = (comm_id,rep_id) =>{

    const confirm = window.confirm("Are you sure to remove this reply..")

    if(!confirm){
      return
    }

    delete_reply_of_comments(comm_id,rep_id);

    toast.success("Reply deleted successfully..", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }


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
              <i onClick={() => { Handle_delete_blog(Blogid) }} className="fa-solid fa-trash-can"></i>
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

        <div className="box-comm m-t-2">

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
                      : <div className='Rep comm_font cur_point' onClick={() => { showrepbox(index) }}>
                        <span><i className="fa-regular fa-comment-dots"></i></span>  <span className='mx-1'>Put Reply</span>
                      </div>}
                  </div>
                  <p className='user_comm font_9'>{elm.comment}</p>
                  <div id={`send_rep_box${index}`} className="rep_input_box ">
                    <label className='comm_font' htmlFor={`rep_inpt${index}`}>Write your reply here</label>
                    <div className="write_send_box">
                      <input value={reply_inpt} onChange={Onchange} className='comm_font' type="text" id={`rep_inpt${index}`} />
                      <button disabled={reply_inpt.length < 2 ? true : false} onClick={()=>{Handle_post_reply(index,elm.comm_id)}} className='share_btn'>
                        <i className="fa-solid cursor-pointer fa-share-from-square"></i>
                      </button>
                    </div>
                  </div>
                  {elm.Replyarr.length > 0 && <div className="show_repbox comm_font font_8">
                    <div className="see_rep_box">
                      <div onClick={() => { Handle_show_reply(index) }} className='rep_top f-bold font-9 cursor-pointer'>
                        <i className="fa-solid fa-circle mx-1 "></i>
                        <span className='c-blue'>
                          {elm.Replyarr.length}
                        </span>
                        <span className='mx-1 c-blue'>
                          {elm.Replyarr.length > 1 ? "Replies" : "Reply"}
                        </span>
                        <i className="fa-regular fa-comment"></i>
                        <span className='hidden' id={`load${index}`} > <img className='mx-1' style={{ "width": "1.5rem" }} src="https://www.lifung.com/wp-content/themes/lifung/dist/images/ajax-loader.gif" alt="" /> </span>
                      </div>
                      <div className="all_rep_box" id={`all_rep_box${index}`}>
                        {elm.Replyarr.map((rep, index) => {
                          return (
                            <div key={index} className="rep_detail">
                              <span>
                                 <span> <img className='mx-2 userlogo' src="https://pl-partners.vn/wp-content/uploads/2021/06/ca-nhan-01.png" alt="Logo" /></span>
                                 {rep.user} 
                                 {userdetail.Name === rep.user && <span>
                                  <i onClick={()=>{Handle_delete_reply(elm.comm_id,rep.rep_id)}} className="mx-2 fa-solid cursor-pointer fa-trash"></i>
                                </span> }
                              </span>
                              <p className=' rep_txt'>  {rep.reply}</p>
                            </div>)
                        })}
                      </div>
                    </div>
                  </div>}
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

      <Category_blogs toast={toast} seteffectkey={seteffectkey} effectkey={effectkey} setblogdetail={setblogdetail} categoryblogs={categoryblogs} blog={blog} />

    </>
  )
}

export default Single_blog

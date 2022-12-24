import React, { useEffect, useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import blogcontext from '../context/blog/blogcontext';
import 'react-toastify/dist/ReactToastify.css';

import loader from '../loader/loader.gif'
import loader3 from '../loader/loader3.gif'

import Category_blogs from './Category_blogs';

import { useParams } from 'react-router-dom'
import { Share } from './Share/Share';
import Addblog from './Addblog';


function Single_blog({ setblogdetail, setkey }) {

  const params = useParams();

  const Bcontext = useContext(blogcontext)

  const { single_load, islike, setislike, setBlog_likes, blog_likes, update_comment, setProgress, userdetail, effectkey, seteffectkey, blog, fetch_single_blog, comments, load, like_blog, post_commnet, del_comment, like_comment, dislike_comment, setload, Reply_to_comments, delete_reply_of_comments, update_reply } = Bcontext;

  const [categoryblogs, setcategoryblogs] = useState([])

  const navigate = useNavigate();

  const fetch_blogs_by_category = async () => {
    // const { category } = JSON.parse(localStorage.getItem("blogdetail"))

    const res1 = await fetch(`/api/blog/blogs_by_category/${params.category}`)
    // const res1 = await fetch(`/api/blog/blogs_by_category/${category}`)

    const json1 = await res1.json();

    if (!json1.status) {
      return navigate('/')
    }
    setcategoryblogs(json1.blogs_by_category)

  }

  const [Blogid, setblogid] = useState('');

  const apicalls = async () => {



    // if (localStorage.getItem("blogdetail") !== String(undefined)) {


    // adding try catch blog for error handling... in localstorage

    try {
      // const { blogid } = JSON.parse(localStorage.getItem("blogdetail"))
      // if (!blogid) {
      //   return navigate('/')
      // }

      fetch_blogs_by_category();

      // setblogid(blogid)
      setblogid(params.id)
      let a;
      a = await fetch_single_blog(params.id);

      // const a = await fetch_single_blog(blogid);
      // this condition triggred when when json.sucess == false in blogstate

      if (a === false) {
        navigate('/Invalid_link/3961941584165172686142834182348724384viewblog19263961276812')
      }



    } catch (error) {
      console.log(error)
      navigate('/')

    }

    // }
    // else {
    //   navigate('/')
    // }

  }

  useEffect(() => {
    apicalls()
    window.scrollTo(0, 0)
    setload(true)

  }, [])

  const [comminpt, setcomminpt] = useState('')

  const Handle_send = () => {

    if (!localStorage.getItem('token')) {
      return navigate('/Login')
    }

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

  function showtoast(msg, time = 1500, pos = "top-center") {
    toast.success(`${msg}`, {
      position: pos,
      autoClose: time,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }


  const para_slice_1 = (para) => {
    let para_1 = para.slice(0, 758)
    return para_1;
  }


  let para_2 = '';
  if (blog.desc) {
    para_2 = blog.desc.slice(758);
  }

  const Handle_edit_blog = () => navigate('/addblog?edit', { state: blog })

  const Handle_delete_blog = async (blogid, bucket_file_name) => {

    let sure = window.confirm("Are you sure you want to delete this post!")
    if (!sure) return;

    let trim_str = bucket_file_name.substring(40)

    // console.log(trim_str)

    if (bucket_file_name[0] + bucket_file_name[1] + bucket_file_name[2] + bucket_file_name[3] == "http") {

      if (trim_str[0] == "/") bucket_file_name = bucket_file_name.substring(41)
      else bucket_file_name = bucket_file_name.substring(52)

      // console.log(bucket_file_name)

      await fetch(`/api/blog/Delete_blog/${blogid}/${bucket_file_name}`, {
        method: "DELETE"
      })
    }
    else {
      await fetch(`/api/blog/Delete_blog/${blogid}/"noting"`, {
        method: "DELETE"
      })
    }

    navigate('/');

    showtoast("Your Blog has been removed");

  }


  function check_login() {
    if (!localStorage.getItem('token')) {
      return navigate('/Login')
    }
    return true
  }

  const showrepbox = (index) => {

    check_login()

    setreply_inpt('')


    let reply_box_by_id = document.getElementById(`all_rep_box${index}`);

    let rep_input = document.getElementById(`rep_inpt${index}`)


    let hide_txt = document.getElementById(`hide${index}`);
    if (hide_txt) {
      hide_txt.classList.remove('show_hide')
    }

    // Checking while reply is prsent or not if not present the reply_box_by_id will be null and if present it is not null 
    // and when it is present then only it removes the clas from the classlists.

    if (reply_box_by_id) {
      reply_box_by_id.classList.remove('show_rep_box')
    }

    let rep_box = document.getElementById(`send_rep_box${index}`);

    document.querySelectorAll('.rep_input_box').forEach(item => {
      if (item.classList.contains('show_rep_box')) {
        if (item != rep_box) {
          item.classList.remove('show_rep_box')
        }
      }
    })


    rep_box.classList.toggle('show_rep_box');

    // console.log(rep_inpt1)

    rep_input.focus();
  }

  const Handle_show_reply = (index) => {

    setreply_inpt('')

    let rep_box = document.getElementById(`send_rep_box${index}`);

    rep_box.classList.remove('show_rep_box');

    let reply_box_by_id = document.getElementById(`all_rep_box${index}`)

    let loader = document.getElementById(`load${index}`);

    let hide_txt = document.getElementById(`hide${index}`);

    if (!reply_box_by_id.classList.contains('show_rep_box')) {

      let delay = 0;

      if (!loader.classList.contains('first_load')) {
        loader.classList.add('inline-block');
        delay = 550
      }
      setTimeout(() => {

        hide_txt.classList.add('show_hide')
        reply_box_by_id.classList.add('show_rep_box')
        loader.classList.remove('inline-block')

      }, delay);

      loader.classList.add('first_load')

    }
    else {
      hide_txt.classList.remove('show_hide')
      reply_box_by_id.classList.remove('show_rep_box')
    }
  }

  const [reply_inpt, setreply_inpt] = useState('')

  const Onchange = (e) => {
    setreply_inpt(e.target.value);
  }

  const Handle_delete_comm = (comm_id, blog_id) => {
    let confirm = window.confirm("Are you sure to delete this comment!");

    if (!confirm) {
      return false
    }

    del_comment(comm_id, blog_id);

  }

  const Handle_post_reply = (index, id) => {
    // index is needed bczz to remove classlist from rep_box which we find it by id i.e the index passing as a parameter in this function.

    Reply_to_comments(reply_inpt, id) // this is the api fetch function destructure from blogcontext....

    let rep_box = document.getElementById(`send_rep_box${index}`);
    rep_box.classList.remove('show_rep_box');

    document.getElementById(`load${index}`).classList.remove('first_load')

    setreply_inpt('');
  }

  function show_confirm_box() {
    const confirmbox = document.querySelector('.confirmbox');
    const blockwall = document.querySelector('.blockwall');
    blockwall.classList.add('active')
    confirmbox.classList.add('show_conf')
  }

  const Handle_delete_reply = (comm_id, rep_id) => {

    const confirm = window.confirm("Are you sure to remove this reply..")

    if (!confirm) {
      return
    }

    delete_reply_of_comments(comm_id, rep_id);

  }

  const Handle_repuser = (e, index) => {

    let hide_txt = document.getElementById(`hide${index}`);

    hide_txt.classList.remove('show_hide');

    showrepbox(index);

    setreply_inpt("@" + e.target.innerText + " ")

  }


  const Handle_like_blog = async (Blogid) => {

    
    if(check_login()){

      like_blog(Blogid)
  
      if (islike) {
        setBlog_likes(blog_likes - 1)
        setislike(false)
  
      }
      else {
        setBlog_likes(blog_likes + 1)
        setislike(true)
      }
    }


  }

  const Handle_like_comment = (Blogid, comm_id, index) => {

    if(check_login()){
      like_comment(Blogid, comm_id, index)
    }

  }
  const Handle_dislike_comment = (Blogid, comm_id, index) => {

    if(check_login()) dislike_comment(Blogid, comm_id, index)
  }

  const comm_inpt = useRef()


  const wall = document.querySelector('.wall');
  const Editreview_box = document.querySelector('.Editreview_box');

  const [edit_vars, setEdit_vars] = useState({
    "text_area": "",
    "text": ""
  })

  const [comm_id, setcomm_id] = useState("")
  const [edit_req, setEdit_req] = useState("")
  const [repInd, setRepInd] = useState(0)

  const Handle_Edit = (blogid, comm_id, text, edit_req_text, rep_ind) => {

    edit_req_text == "comment" ? setEdit_req("comment") : setEdit_req("reply")

    if (rep_ind) setRepInd(rep_ind)

    setEdit_vars({ "text_area": text, text }) // same as "text":text..............

    setblogid(blogid)
    setcomm_id(comm_id)
    wall.classList.remove('none')

    setTimeout(() => {
      Editreview_box.classList.add('show_edit_box')
      comm_inpt.current.focus()
    }, 200);

  }

  const hide_edit_box = () => {
    wall.classList.add('none')
    Editreview_box.classList.remove('show_edit_box')
  }

  const Save_changes = () => {

    const regx = / |\n/g
    if (edit_vars.text == edit_vars.text_area) {
      hide_edit_box();
      return
    }
    if (edit_vars.text_area.replace(regx, "").length > 0) {
      hide_edit_box();
      if (edit_req == "comment") update_comment(Blogid, comm_id, edit_vars.text_area)
      else update_reply(Blogid, comm_id, edit_vars.text_area, repInd)
    }
  }

  const handlecancel = (index) => showrepbox(index);

  const [active, setActive] = useState(false);

  const HandleShare = () => setActive(true)

  return (
    <>

      {load && <div className="single_loader">
        {/* <img src="https://gifimage.net/wp-content/uploads/2018/04/loading-spinner-gif-1.gif" alt="laoding.."  /> */}
        <img src="https://i.gifer.com/6px6.gif" alt="laoding.." />
      </div>
      }

      <Share active={active} setActive={setActive} img={blog.blogimg
      } />

      <div className="blockwall"></div>
      {single_load && <div className="action_load">
        <img src={loader3} />
      </div>}
      <div className="confirmbox comm_font">
        <small>Confirm or not?</small>
        <div className="msg">
          Are you sure you want to delete this ?
        </div>
        <div className="confirm_btns">
          <button type='button'>wait</button>
          <button type='button'>yes,i am</button>
        </div>
      </div>
      <div className="h2">
        <h1> <span>Blogs</span> <span>/</span> <span>{blog.category}</span> </h1>

      </div>
      <div className="flex-1">
        <div className="singleblog">
          <h3 className='text-center gray pos-rel'>
            {blog.title}
            {blog.user === userdetail.id && <div className="actionsdiv">
              <i onClick={() => { Handle_delete_blog(Blogid, blog.blogimg) }} className="fa-solid fa-trash-can"></i>
              <i onClick={Handle_edit_blog} className="fa-solid fa-pen-to-square"></i>
            </div>}
          </h3>
          {load && <img src={`${loader}`} className="load1" alt="loader" />}
          <div className="single_blog_img">
            {Object.keys(blog).length > 0 && !load && <img alt='blog_img' className='blogimg-1 m-b-2' src={`${blog.blogimg[0] + blog.blogimg[1] + blog.blogimg[2] + blog.blogimg[3] == "http" ? blog.blogimg : `/uploads/${blog.blogimg}`} `} />}
          </div>
          <p className='heart_p'>
            <span><span><img className='author_' src="https://thumbs.dreamstime.com/z/web-165870686.jpg" alt="author" /></span> <span className='auth_name'> {blog.author_name}</span></span>
            <span>
              {Object.keys(blog).length > 0 && <span className='Like-btn'>
                <div className="sharebtn">
                  <i onClick={HandleShare} className="fa-solid fa-share"></i> <span>Share</span>
                </div>
                <i onClick={() => { Handle_like_blog(Blogid) }} className={`${blog.Blikearr.includes(userdetail.id) ? "fa-solid red bg-red" : "fa-regular"} fa-heart`}></i>
                <span>likes</span>
                <span>{blog_likes}</span>
              </span>}
            </span>
          </p>
          {/* {blog.desc && <p className='desc'>{para_slice_1(blog.desc)} {para_2.length > 0 && <span className='desc display'>{para_2}</span>}</p>} */}

          {
            blog.desc && <div className='comm_font temp' dangerouslySetInnerHTML={{ __html: para_slice_1(blog.desc) }} />
          }

          {blog.desc && <span className='comm_font desc display' dangerouslySetInnerHTML={{ __html: blog.desc }} />}

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
                      <span className='user_name'>
                        <img className='userlogo' src="https://i7.pngguru.com/preview/831/88/865/user-profile-computer-icons-user-interface-mystique.jpg" alt="user" />
                        <span className='mx-2  font_8'>{elm.name}</span>
                      </span>
                      <i id={`like${index}`} onClick={() => { Handle_like_comment(Blogid, elm.comm_id, index) }} className={`like ${elm.Clikearr.includes(userdetail.id) ? "fa-solid red" : "fa-regular thumb_up"} fa-thumbs-up`}>
                      </i>
                      <span className='count mx-1'> {elm.Clikearr.length} </span>
                      <i id={`dislike${index}`} onClick={() => { Handle_dislike_comment(Blogid, elm.comm_id, index) }} className={`${elm.Cdislikearr.includes(userdetail.id) ? "fa-solid" : "fa-regular"}       fa-thumbs-down dislike`} >
                      </i>
                      <span className='count mx-1'> {elm.Cdislikearr.length}</span>
                    </div>
                    {elm.name === userdetail.Name ? <div className="right icons">
                      <i onClick={() => { Handle_delete_comm(elm.comm_id, Blogid) }} className="fa-solid fa-trash-can"></i>
                      <i onClick={() => { Handle_Edit(blog._id, elm.comm_id, elm.comment, "comment") }} className="fa-solid fa-pen-to-square"></i>
                    </div>
                      : <div className='Rep comm_font cur_point' onClick={() => { showrepbox(index) }}>
                        <span><i className="fa-regular fa-comment-dots"></i></span>  <span className='mx-1'>Put Reply</span>
                      </div>}
                  </div>
                  <p className='user_comm font_9'>{elm.comment}</p>
                  <div id={`send_rep_box${index}`} className="rep_input_box ">
                    <label className='comm_font' htmlFor={`rep_inpt${index}`}>Write your reply here</label>
                    <div className="maintain">
                      <div className="textbox">
                        <input value={reply_inpt} onChange={Onchange} className="comm_font" required id={`rep_inpt${index}`} type="text" />
                        <div className="underline"></div>
                      </div>
                      <div className="justify_end">
                        <div className="post_cancel_review_btns">
                          <button onClick={() => { handlecancel(index) }} className='btn cancel_btn comm_font'>cancel</button>
                          <button disabled={reply_inpt.length < 1 ? true : false} onClick={() => { Handle_post_reply(index, elm.comm_id) }} className='btn reply_btn comm_font'>reply</button>

                        </div>
                      </div>
                    </div>
                  </div>
                  {elm.Replyarr.length > 0 && <div className="show_repbox comm_font font_8">
                    <div className="see_rep_box">
                      <div onClick={() => { Handle_show_reply(index) }} className='rep_top f-bold font-9 cursor-pointer'>
                        <i className="fa-solid fa-circle mx-1 "></i>
                        <span id={`hide${index}`} className='mx-r hide c-blue'>Hide</span>
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
                        {elm.Replyarr.map((rep, indx) => {
                          return (
                            <div key={indx} className="rep_detail">
                              <span>
                                <span> <img className='mx-2 userlogo' src="https://pl-partners.vn/wp-content/uploads/2021/06/ca-nhan-01.png" alt="Logo" /></span>
                                <span onClick={(e) => { Handle_repuser(e, index) }} className='cursor-pointer'>{rep.user}</span>
                                {userdetail.Name === rep.user && <span>
                                  <i onClick={() => { Handle_delete_reply(elm.comm_id, rep.rep_id) }} className="mx-2 fa-solid cursor-pointer fa-trash"></i>
                                </span>}
                                {userdetail.Name === rep.user && <span>
                                  <i onClick={() => { Handle_Edit(blog._id, elm.comm_id, rep.reply, "reply", indx) }} className="mx-2 cursor-pointer fa-solid fa-pen-to-square"></i>
                                </span>}
                              </span>
                              <p className=' rep_txt'> <span> {rep.reply}</span> </p>
                            </div>)
                        })}
                      </div>
                    </div>
                  </div>}
                  <hr className='bottom_hr' />
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
      {/* {para_2.length > 0 && <span className='desc span_desc'>{para_2}</span>} */}

      {para_2.length > 0 && <span className='comm_font desc span_desc' dangerouslySetInnerHTML={{ __html: para_2 }} />}

      <Category_blogs toast={toast} setProgress={setProgress} seteffectkey={seteffectkey} setkey={setkey} effectkey={effectkey} setblogdetail={setblogdetail} categoryblogs={categoryblogs} blog={blog} />

      <div className="wall none">
        <div className="Editreview_box comm_font">
          <h4>Edit {edit_req == "comment" ? "Comment" : "Reply"} Here <i className="mx-2 fa-solid fa-pen-to-square"></i></h4>
          <textarea ref={comm_inpt} value={edit_vars.text_area} onChange={(e) => (setEdit_vars({ ...edit_vars, "text_area": e.target.value }))} name="review_area" id="review_area" cols="30" rows="4"></textarea>
          <div className="btns">
            <button onClick={hide_edit_box} className='btn bold red'>Cancel</button>
            <button onClick={Save_changes} className='btn bold blue'>Save</button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Single_blog

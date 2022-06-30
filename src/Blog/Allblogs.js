import React, { useEffect, useContext, useState } from 'react'
import Blogitem from './Blogitem';
import loader from '../loader/loader.gif';
import blogcontext from '../context/blog/blogcontext';

import { Link } from 'react-router-dom'
import Category_navigation from './Category_navigation';

function Allblogs({ setblogdetail }) {

  const Bcontext = useContext(blogcontext);
  const { fetchallblogs, blogs, category, Getuser, load, setload } = Bcontext;


  setTimeout(() => {
    setload(false)
  }, 300);

  const setdesc = (desc) => {
    let newdesc = desc.slice(0, 80);

    return newdesc;
  }

  const Handle_view_blog = (blogid, category) => {

    setblogdetail({ blogid, category })
  }

  useEffect(() => {
    fetchallblogs();
    localStorage.removeItem('blogdetail')
    Getuser();

  }, [])

  const [open, setopen] = useState(false);

  const Handle_open_close = () => {
    if (open) {
      setopen(false)
    }
    else {
      setopen(true)
    }
  }


  return (
    <>
      <header className='blog_header'>
        <img src="https://care.wcwpds.wisc.edu/wp-content/uploads/sites/1321/2020/04/iStock-1127167754-1600x500.jpg" alt="" />
      </header>

      {load && blogs.length > 0 && <div className='loader1' >
        <img className="loader load" src={loader} alt="" />
        <p>Fething Blogs...</p>
      </div>}
      {!load && blogs.length > 0 && <div className="flex">
        {
          blogs.map((blog, index) => {
            return (
              <Link key={index} onClick={() => { Handle_view_blog(blog._id, blog.category) }} to="/singleblog">  <Blogitem blog={blog} setdesc={setdesc} /></Link>)
          })
        }
      </div>}

      {!load && blogs.length === 0 && <div className="blog_not_found">
        <div className="not_found_img">
          <img src="https://www.brightpearl.com/wp-content/uploads/2020/12/humanerrors.png" alt="" />
        </div>
        <p className='text-center'>
          The Blog of category
          {category === 'Sports' && <span className='yellow_cat'> {category}  </span>}
          {category === 'Nature' && <span className='green_cat'> {category}  </span>}
          {category === 'Travel' && <span className='purple_cat'> {category}  </span>}
          {category === 'Spiritual' && <span className='orange_cat'> {category}  </span>}
          {category === 'Fitness' && <span className='black_cat'> {category}  </span>}
          {category === 'Technical' && <span className='blue_cat'> {category}  </span>}
          is not Posted yet !!
        </p>
      </div>
      }
      {!load && blogs.length === 0 && <div className="m-b-24">

      </div>}
      <div className="write_btn">
        <Link className='write_blog_btn' to='/addblog'>  <span><i className="fa-solid fa-pen-clip"></i></span> <span>Write blog</span> </Link>
      </div>
      <Category_navigation open={open} setopen={setopen} />
      <div className="open_close_btn" onClick={Handle_open_close}>
        <i className={`fa-solid ${open ? "fa-chevron-right" : "fa-chevron-left"}`}></i><i className="fa-solid fa-list"></i>
      </div>
    </>
  )
}

export default Allblogs

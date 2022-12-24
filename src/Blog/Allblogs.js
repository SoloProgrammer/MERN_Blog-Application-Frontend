import React, { useEffect, useContext, useState } from 'react'
import Blogitem from './Blogitem';
import blogcontext from '../context/blog/blogcontext';

import { Link, useNavigate } from 'react-router-dom'

import Category_navigation from './Category_navigation';
import Flash from './BlogFash.js/Flash';
import Search from './Search/Search';
import BlogPagination from '../Blog/BlogPagination';

function Allblogs() {

  const Bcontext = useContext(blogcontext);
  const { setProgress, fetchallblogs, blogs, category, Getuser, load, setload } = Bcontext;

  const [loadingPagination, setLoadingPagination] = useState(false)

  // category blogs
  const [categoryblogs, setCategoryBlogs] = useState([])

  if (blogs.length > 0) {
    setTimeout(() => {
      setload(false)
    }, 500);
  }


  // useEffect(() => {
  //   setCategoryBlogs(blogs)
  // }, [blogs])


  function CallObserver() {
    const Observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
        else {
          entry.target.classList.remove('visible')
        }
      })
    })

    const hiddenElemets = document.querySelectorAll('.hidden');
    hiddenElemets.forEach(el => Observer.observe(el));
  }

  useEffect(() => CallObserver(), [categoryblogs])

  CallObserver();

  const navigate = useNavigate();

  let lastscroll = 0
  window.addEventListener('scroll', () => {
    const currentscroll = window.pageYOffset;

    let write_btn = document.querySelector('.write_btn');

    if (lastscroll < currentscroll) {
      if (write_btn) write_btn.classList.add("down")
    }
    else {
      if (write_btn) write_btn.classList.remove("down")
    }

    lastscroll = currentscroll
  })

  const setdesc = (desc) => {
    let newdesc = desc.slice(0, 80);
    return newdesc;
  }

  const Handle_view_blog = (blogid, category) => {

    setProgress(40)

    // setblogdetail({ blogid, category })

    navigate(`/viewblog/${blogid}/${category}/${Math.random(99999, 99999999) * Math.pow(10, 16)}`)

    setTimeout(() => {
      setProgress(80)
    }, 800);
    setTimeout(() => {
      setProgress(100)
    }, 1100);

  }

  useEffect(() => {
    fetchallblogs();
    localStorage.removeItem('blogdetail')
    if (localStorage.getItem('token')) {
      Getuser();
      if (!localStorage.getItem("view")) {

        setTimeout(() => {
          let innerdiv = document.querySelector('.innerdiv');
          if (innerdiv) {
            innerdiv.classList.add("view")
          }
        }, 3000);
      }
    }
  }, []);

  const [open, setopen] = useState(false);

  const Handle_open_close = () => {
    let innerdiv = document.querySelector('.innerdiv');
    innerdiv.classList.remove("view")
    localStorage.setItem("view", true)
    if (open) {
      setopen(false)
    }
    else {
      setopen(true)
    }
  }

  let wall = document.querySelector('.wall');
  let info_div = document.querySelector('.info_div');
  const CloseInfo = () => {
    wall.classList.add('none')
    localStorage.setItem('info', true)
  }

  setTimeout(() => {
    if (!localStorage.getItem('info')) {
      if (wall) wall.classList.remove('none')
      setTimeout(() => {
        if (info_div) info_div.classList.remove('scale_0')
      }, 1000);
    }
  }, 3000);


  const [search, setSearch] = useState(false)

  const HandleSearch = () => {
    document.querySelector('.hit').classList.add('over_search')
    setTimeout(() => {
      document.querySelector('.hit').classList.remove('over_search')
      setSearch(true)
    }, 400);
  }

  return (
    <>

      {search && <Search blogs={blogs} setSearch={setSearch} search={search} Handle_view_blog={Handle_view_blog} />}

      <div onClick={HandleSearch} className="search_icon">
        <i className="fa-solid fa-magnifying-glass">
          <div className='hit'></div>
          <span className='comm_font'>Search blog</span>
        </i>
      </div>
      <header className='blog_header'>
        <img src="https://care.wcwpds.wisc.edu/wp-content/uploads/sites/1321/2020/04/iStock-1127167754-1600x500.jpg" alt="" />
      </header>


      {
        load && <Flash />
      }
      {/* <Flash /> */}
      {!load && categoryblogs.length > 0 && <div className="flex">
        {
          categoryblogs.map((blog, index) => {
            return (
              <a className='cursor-pointer' key={index} onClick={() => { Handle_view_blog(blog._id, blog.category) }}>  <Blogitem blog={blog} setdesc={setdesc} /></a>)
          })
        }
      </div>}

      {!load && categoryblogs.length === 0 && <div className="blog_not_found">
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
          {category === 'Lifestyle' && <span className='lifecolor'> {category}  </span>}
          {category === 'Nation' && <span style={{ color: "rgb(127, 177, 9)" }}> {category}  </span>}
          is not Posted yet !!
        </p>
      </div>
      }
      {!load && blogs.length === 0 && <div className="m-b-24">

      </div>}
      <div className="write_btn">
        <Link className='write_blog_btn' to='/addblog'>  <span><i className="fa-solid fa-pen-clip"></i></span> <span>Write blog</span> </Link>
      </div>
      <Category_navigation open={open} setCategoryBlogs={setCategoryBlogs} categoryBlogs={categoryblogs} setload={setload} />

      <div className="open_close_btn" onClick={Handle_open_close}>
        <i className={`fa-solid ${open ? "fa-chevron-right" : "fa-chevron-left"}`}></i><i className="fa-solid fa-list"></i>
        <div className='innerdiv'></div>
      </div>

      {!localStorage.getItem('info') && <div className="wall none">
        <div className="info_div comm_font scale_0">
          <span><i className="fa-solid fa-circle-info"></i><span className='mx-2'>Info :</span></span>
          <h2>You can read more about the blog , like the blog , post comment on blog and many more <b>just by single tap on blog</b> to explore many more </h2>
          <div className="justify_end">
            <button onClick={CloseInfo} className='got_it'><span className='mx-2 white'>kk,Got It</span><i className="fa-solid fa-thumbs-up"></i></button>
          </div>
        </div>
      </div>}
     {loadingPagination && <div className="paginationLoader">
        <img src="https://imgs.search.brave.com/1BNNhZP0lA_OP2nj19UZOvigjEyfLF6TvGHSVSa2gJs/rs:fit:193:192:1/g:ce/aHR0cHM6Ly9naWZp/bWFnZS5uZXQvd3At/Y29udGVudC91cGxv/YWRzLzIwMTcvMDkv/YWpheC1sb2FkaW5n/LWdpZi10cmFuc3Bh/cmVudC1iYWNrZ3Jv/dW5kLTguZ2lm.gif" alt="laoding.." />
      </div>}
      <BlogPagination category={category} setCategoryBlogs={setCategoryBlogs} setLoadingPagination={setLoadingPagination}/>
    </>
  )
}

export default Allblogs

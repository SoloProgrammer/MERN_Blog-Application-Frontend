import React, { useEffect, useRef, useState } from 'react'

import './Search.css'

import miniLoader from "../../loader/loader_linear.gif"

function Search({ setSearch, search, Handle_view_blog }) {

  const [inpt, setInpt] = useState("");

  const [Searchblogs, setSearchblogs] = useState([])

  const [load, setLoad] = useState(false);

  const [notfound, setNotfound] = useState(false)

  const [results, setResults] = useState([])

  const [menu, setMenu] = useState(1)

  const inpt_ref = useRef()
  if (search && results.length == 0) {
    setTimeout(() => {
      document.querySelector('.search_box').classList.add('popup1')
      inpt_ref.current.focus()
    }, 100);

  }

  const handle_close = () => {
    document.querySelector('.hiteffect .hit').classList.add('over_search')
    setTimeout(() => {
      document.querySelector('.hiteffect .hit').classList.remove('over_search')
      setSearch(false)
    }, 300);
  }

  const Handle_change = (e) => {
    setInpt(e.target.value)
    setLoad(true)
    setNotfound(false)
  }

  const getallblogs = async () => {

    const res = await fetch(`/api/blog/Allblogs`);
    const json = await res.json();
    setSearchblogs(json.allblogs);

  }

  useEffect(() => {

    let timer = setTimeout(() => {
      setLoad(false)
      setResults([])
      if (inpt != "") {
        let query = menu == 1 ? "author_name" : "title"
        let results1 = Searchblogs.filter(blog => {
          if (blog[query].toLowerCase().includes(inpt.toLowerCase())) {
            return blog
          }
        })
        if (results1.length == 0) return setNotfound(true)

        setResults(results1)
      }
      setNotfound(false)

    }, 700);
    return () => clearTimeout(timer);
  }, [inpt, load]);

  useEffect(() => {
    getallblogs();
  }, [])

  const HandleOpenmenu = () => {
    document.querySelector('.search_by_menu').classList.toggle('open_menu')
    document.querySelector('.fa-caret-down').classList.toggle('fa-caret-down-rotate')
  }


  const HandleChangemenu = (n) => {
    setMenu(n)
    HandleOpenmenu()
    setLoad(true)
  }

  return (
    <div className={`Search_container flex comm_font`}>
      <div className={`search_box`}>
        <div className="hiteffect">
          <i onClick={handle_close} className="fa-solid fa-xmark">
            <div className='hit'></div>
          </i>
        </div>
        <h5 className='bold mx-2 mx-1'><img width={24} src="https://cdn-icons-png.flaticon.com/128/4208/4208531.png" alt="some" />
          Type query to search SearchBlogs here
        </h5>
        <div className="inpt">
          <input value={inpt} onChange={Handle_change} ref={inpt_ref} required type="text" id='search' />
          <label htmlFor="search">Search query</label>
          <span onClick={HandleOpenmenu} className="search_by">
            <span>By - </span>
            <span>{menu == 1 ? "Author" : "Title"}</span>
            <i className="mx-2 fa-solid fa-caret-down"></i>
          </span>
          <ul className='search_by_menu'>
            <li onClick={() => { HandleChangemenu(1) }} className={`${menu == 1 && "active"}`} id='1'>author name</li>
            <li onClick={() => { HandleChangemenu(2) }} className={`${menu == 2 && "active"}`} id='2'>blog title</li>
          </ul>
        </div>
        {results.length > 0 && inpt != "" && !load && <div className="search_results">
          <div className="all_results">
            {
              results.map(blog => {
                return (
                  <div key={blog._id} className="single_result">
                    <div className="left_head">
                      <img className='result_img' src={`${blog.blogimg[0] + blog.blogimg[1] + blog.blogimg[2] + blog.blogimg[3] == "http" ? blog.blogimg : `/uploads/${blog.blogimg}`} `} alt="blog Image" />
                    </div>
                    <div className="right_head">
                      <h4>{blog.title.slice(0, 40)} {blog.title.length > 40 ? "..." : "."} </h4>
                      <span className='user_name'>
                        <img className='mx-2 userlogo' src="https://pl-partners.vn/wp-content/uploads/2021/06/ca-nhan-01.png" alt="Logo" />
                        <span className='mx-1  font_8 comm_font bold'>{blog.author_name}</span>
                      </span>

                      <div className="view_result">
                        <button onClick={() => { Handle_view_blog(blog._id, blog.category) }}> <span>View blog</span><span><i className="mx-2 fa-solid fa-arrow-right-long white"></i></span> </button>
                        <div className="heart_comm">
                          <div className="like">
                            <i className="fa-solid red fa-heart"></i> <span>{blog.Blikearr.length}</span>
                          </div>
                          <div className="comments">
                            <i className="fa-regular fa-message"></i> <span>{blog.Comments.length}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>}
        {
          inpt == "" && <div className="infopara flex">
            <img src="https://pixabay.com/static/uploads/photo/2015/11/03/09/09/magnifying-glass-1020142_960_720.jpg" alt="results" />
            <small>RESULTS &nbsp; WILL &nbsp; APPEAR &nbsp; HERE !</small>
          </div>
        }
        {
          load && inpt != "" && <div className="search_loader">
            <img src={miniLoader} alt="loading" />
          </div>
        }
        {
          notfound && !load && <div className="Search_not_found">
            <img src="https://cdn.dribbble.com/users/1883357/screenshots/6016190/search_no_result.png" alt="not_found!" />
          </div>
        }
      </div>
    </div>
  )
}

export default Search

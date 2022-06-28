import React from 'react'
function Blogitem({ blog, setdesc }) {
  
  return (
      <div className="blogitems"> 
       <div className="category">
        {blog.category}
       </div>
       <div className="blog_image">
          <img className='blogimg' src={`${process.env.REACT_APP_IMAGE_PATH_NAME}/${blog.blogimg}`} />
       </div>
        <div className="blog_content">
          <div className="heart_comm">
            <div className="like">
              <i className="fa-solid red fa-heart"></i> Likes : <span>{blog.Blikearr.length}</span>
            </div>
            <div className="comments">
            <i className="fa-regular fa-message"></i> comments : <span>{blog.Comments.length}</span>
            </div>
          </div>
          <div className="author">
            <span><i className="fa-solid mx-1 fa-at"></i></span><span>{blog.author_name}</span>
          </div>
          <h3>{blog.title}</h3>
          <p>{setdesc(blog.desc)}......</p>
        </div>
      </div>
  )
}

export default Blogitem

import React from 'react'
function Blogitem({ blog, setdesc }) {

  const getpostedAt = (isodate) => {
    const newdate = new Date(isodate);
    const newstrdate = String(newdate);
    var hours = newdate.getHours()
    const minute = newdate.getMinutes();
    let hour = (hours % 12) || 12;
    let ampm = hours < 12 ? "am" : "pm"
    return ( newstrdate.slice(0, 11) + " ( " + hour + " : " + minute + ".00" + " - " +  ampm + " ) " );
  }
  
  return (
    <div className="blogitems hidden">
      <div className="blog_image">
      <div className="category">
        {blog.category}
      </div>
      <div className="b_img">
        <img className='blogimg' src={`${blog.blogimg[0] + blog.blogimg[1] + blog.blogimg[2] + blog.blogimg[3]== "http" ? blog.blogimg : `/uploads/${blog.blogimg}` } `} alt="blog Image" />
      </div>
        {/* <img className='blogimg' src={`${blog.blogimg}`} alt="blog Image" /> */}
      </div>
      <div className="blog_content">
        <div className="showdate comm_font">
          <i className="fa-solid fa-clock-rotate-left mx-2"></i>{getpostedAt(blog.createdAt)}
        </div>
        <div className="heart_comm">
          <div className="like">
            <i className="fa-solid red fa-heart"></i> Likes : <span>{blog.Blikearr.length}</span>
          </div>
          <div className="comments">
            <i className="fa-regular fa-message"></i> comments : <span>{blog.Comments.length}</span>
          </div>
        </div>
        <div className="author">
          <span><img className='author_' src="https://thumbs.dreamstime.com/z/web-165870686.jpg" alt="author" /></span><span>{blog.author_name}</span>
        </div>
        <h3>{blog.title}</h3>
        {/* <p>{setdesc(blog.desc)}......</p> */}
        {/* <span className='comm_font' dangerouslySetInnerHTML={{ __html: blog.desc }}/> */}
        <p>
        {/* <span className='comm_font blog_item_desc' dangerouslySetInnerHTML={{ __html: setdesc(blog.desc) }}/> <span>...</span> */}
        <span  className='comm_font blog_item_desc'>Read more about the blog , by single click onto blog ..... <i className="fa-solid fa-hand-pointer"></i></span>
        </p>
      </div>
    </div>
  )
}

export default Blogitem

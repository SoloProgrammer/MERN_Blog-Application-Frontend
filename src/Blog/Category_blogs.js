function Category_blogs({categoryblogs,seteffectkey,effectkey,blog,setblogdetail,toast}) {

  const Handle_view_related_blog = (blogid,category) =>{

    setblogdetail({blogid,category});

    if(effectkey){
      seteffectkey(false)
    }
    else{
      seteffectkey(true)
    }
    toast("Blog has been changed", {
      position: "top-right",
      autoClose: 700,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  }

  return (
    <>
    <div className="categoryblogs m-b-5">
    <div className="relatedblogs">
        {categoryblogs.length === 1 && <p className='para'>No other blogs are posted related to <span className='cat_name'> {blog.category}</span></p>}
        { categoryblogs.length > 1 && <h1 className='cat_h1' >Related blogs</h1>}
        {
        categoryblogs.length > 1 && categoryblogs.map((catblog, index) => {
            return catblog._id !== blog._id && (<div onClick={()=>{Handle_view_related_blog(catblog._id,catblog.category)}} key={index} className="catblogitems">
            <h3 className='cat_h3 comm_font'>{catblog.title}</h3>
            <div className="cat_blog_imgbox pos-rel">
              <div className="icon_box">
                <i className="fa-solid fa-eye"></i>
                <i className="fa-solid red fa-heart"></i>
              </div>
              <img className='blogimg2 m-b-2' src={`${process.env.REACT_APP_IMAGE_PATH_NAME}/${catblog.blogimg}`} />
            </div>
            </div>)
        })
        }
    </div>
  </div>
  </>
  )
}

export default Category_blogs

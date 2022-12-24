import { useNavigate } from 'react-router-dom'

function Category_blogs({ categoryblogs, seteffectkey, effectkey, blog, setblogdetail, setkey, setProgress }) {

  const navigate = useNavigate();

  const Handle_view_related_blog = (blogid, category) => {

    setkey(Math.random(10) * 10)

    setProgress(40);

    navigate(`/viewblog/${blogid}/${category}/${Math.random(99999, 99999999) * Math.pow(10, 16)}`)

    setTimeout(() => {
      setProgress(80)
    }, 800);
    setTimeout(() => {
      setProgress(100)
    }, 1100);

    if (effectkey) {
      seteffectkey(false)
    }
    else {
      seteffectkey(true)
    }

  }


  const Observer = new IntersectionObserver(entries =>{
    entries.forEach(entry =>{
      if(entry.isIntersecting){
        entry.target.classList.add('front')
      }
      else{
        entry.target.classList.remove('front')
      }
    })
  })
  const hiddenElemets = document.querySelectorAll('.right');
  hiddenElemets.forEach(el => Observer.observe(el));


  return (
    <>
      <div className="categoryblogs m-b-5 comm_font">
        {categoryblogs.length > 1 && <h1 className='cat_h1 text-center' > <small style={{fontWeight:"bold",fontSize:"1.5rem",color:"#3e3e3e"}}>read</small>  more <span className='cat_name comm_font'> {blog.category}</span > Blogs</h1>}
        <div className="relatedblogs">
          {categoryblogs.length === 1 && <p className='para m-0 m_t_7 text-center'>No other blogs are posted related to <span className='cat_name'> {blog.category}</span></p>}
          {
            categoryblogs.length > 1 && categoryblogs.map((catblog, index) => {
              return catblog._id !== blog._id && (<div onClick={() => { Handle_view_related_blog(catblog._id, catblog.category) }} key={index}  className="catblogitems cursor-pointer right">
                
                <div className="cat_blog_imgbox pos-rel">
                  <div className="icon_box">
                    <i className="fa-solid fa-eye"></i>
                    <i className="fa-solid red fa-heart"></i>
                  </div>
                  <img className='blogimg2 m-b-2' src={`${catblog.blogimg[0] + catblog.blogimg[1] + catblog.blogimg[2] + catblog.blogimg[3]== "http" ? catblog.blogimg : `/uploads/${catblog.blogimg}` } `} />
                </div>
                <div className='cat_bottom_div'>
                  <span className='justify_start'>
                    <span className='user_name'>
                      <img className='mx-2 userlogo' src="https://pl-partners.vn/wp-content/uploads/2021/06/ca-nhan-01.png" alt="Logo" />
                      <span className='mx-1  font_8 comm_font bold'>{catblog.author_name}</span>
                    </span>
                  </span>
                  <h4 className='cat_h3 comm_font'>{(catblog.title).slice(0,23)} {catblog.title.length > 23 && "..." }</h4>
                  <small className='comm_font'>{(catblog.desc).slice(0,56)}....</small>
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

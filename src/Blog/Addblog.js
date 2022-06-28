import React, { useContext, useEffect, useState } from 'react'
import blogcontext from '../context/blog/blogcontext'
import { Link,useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

function Addblog({ setblogdetail }) {
    const Bcontext = useContext(blogcontext);

    const { blogs, fetchallblogs, userdetail, Getuser } = Bcontext;

    const [Form_inputs, setform_inputs] = useState({
        file: "",
        category: 'Fitness'
    })

    useEffect(() => {
        fetchallblogs();
        Getuser();
    }, [])

    const DESc = (desc) => {
        const newdesc = desc.slice(0, 100)
        return newdesc;
    }

    let count = 0;
    blogs.forEach(blog => {
        if (blog.Blikearr.includes(userdetail.id)) {
            count += 1;
        }
    });

    const Onchange = (e) => {

        if (e.target.name !== "file") {

            setform_inputs({ ...Form_inputs, [e.target.name]: e.target.value })
        }
        else {
            setform_inputs({ ...Form_inputs, [e.target.name]: e.target.files[0] })
            
            
        }
        let upload_txt = document.querySelector('.upload_txt');

        if(e.target.name === 'file'){
                if(e.target.files[0]){
        
                    upload_txt.innerText = e.target.files[0].name;
                }
        }

    }

    const navigate = useNavigate();

    const [upload,setupload] = useState(false);

    
    const handle_add_blog = async () => {
        const { title, desc, category, file } = Form_inputs;
        
        if (!title || !desc || !file) {
            toast.error("PLz filled all the details", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            
            setupload("uploading");
            const Form = new FormData();

            Form.append('title', title)
            Form.append('desc', desc)
            Form.append('category', category)
            Form.append('blogimage', file)

            const res = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/blog/Addblog`,
                {
                    method: "POST",
                    headers: {
                        "auth-token": localStorage.getItem("token")
                    },
                    body: Form
                })

            const json = await res.json();

            setTimeout(() => {
                setupload("Uploading done")
            }, 700);


            setTimeout(() => {
                navigate('/')
            }, 1500 );

        }


    }

    const Handle_click = (blogid, category) => {

        setblogdetail({ blogid, category });

    }
    const file = document.getElementById('file');

    const Upload_btn = () => {
        file.click();
    }


    return (
        <>
            <div className='comm_font global_div'>
                <div className="formbox">
                    <h4>Add a blog  </h4>
                    <div className="inputs">

                        <div className="Input_box top">
                            <input onChange={Onchange} value={Form_inputs.title ? Form_inputs.title : ""} required className='top_2_input' id='title' name='title' type="text" />
                            <label className='top_2_label' htmlFor="title"><i className="mx-1 fa-solid fa-blog"></i> Blog Title</label>
                        </div>
                        <div className="Input_box top desc_inpt_box">
                            <textarea onChange={Onchange} value={Form_inputs.desc ? Form_inputs.desc : ""} rows={10} required id='desc' name='desc' type="text" />
                            <label className='top_2_label' htmlFor="desc"><i className="mx-1 fa-solid fa-align-left"></i>Blog Description</label>

                        </div>
                        <div className="bottom">
                            <div className="Input_box">
                                <label className='lab' htmlFor="category"> <i className="fa-solid fa-list-check"></i><span className='mx-1'>Blog category</span> </label>
                                <select onChange={Onchange} value={Form_inputs.category ? Form_inputs.category : ""} name='category' id='category' className="form-select" aria-label="Default select example">
                                    <option value="Fitness" >Fitness</option>
                                    <option value="Spiritual">Spiritual</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Nature">Nature</option>
                                </select>
                            </div>
                            <div className="file_box">
                                <label className='lab file_lab' htmlFor="file"><i className="fa-solid fa-image"></i><span className='mx-1'>Blog Image</span> </label>
                                <div className="upload_btn" onClick={Upload_btn}>
                                    <i className="fa-solid fa-upload"></i>
                                </div> <span className='upload_txt'> No file Choosen </span>
                                <input onChange={Onchange} id='file' name='file' type="file" />
                            </div>
                        </div>
                        <button disabled={upload === "uploading" ? true : false} onClick={handle_add_blog} className='add_btn'>
                           {!upload && <i className="mx-2 fa-solid fa-cloud-arrow-up"></i> }
                            {upload === "uploading" && <i className="mx-2 animate fa-solid fa-circle-notch"></i> }
                            {upload === "Uploading done" && <i className="mx-2 fa-solid fa-circle-check"></i> } 

                            {!upload && "Upload " }
                            {upload === "uploading" && "Uploading...." }
                            {upload === "Uploading done" && "Uploading done" } 

                            
                        </button>

                    </div>
                </div>
                <div className="likes_blog_div pos-rel width-45">
                    <h3><span><img src="https://cdn0.iconfinder.com/data/icons/tourism-and-outdoor-recreation-2/512/173_appriciate_remarks_good_like-512.png" className='i' alt="" /></span> Liked Blogs <small> [{count}] </small></h3>
                    <div className="fixed">
                        {
                            blogs.map(blog => {
                                return blog.Blikearr.includes(userdetail.id) && (
                                    <Link key={blog._id} to='/singleblog'><div onClick={() => { Handle_click(blog._id, blog.category) }} className="liked_blog ">
                                        <img src={`${process.env.REACT_APP_IMAGE_PATH_NAME}/${blog.blogimg}`} alt="" className='l-b-img' />
                                        <p className='txt_deco_none'>{blog.title}</p>
                                        <span className='like_desc'>{DESc(blog.desc)}..</span>
                                    </div></Link>
                                )
                            })
                        }
                    </div>
                    <Link to='/'>
                        <button className='add_btn width-full my-3'>
                                <i className="mx-2   fa-solid fa-braille"></i>
                                Go to Blogs page
                        </button>
                    </Link>
                    {count === 0 && <div className="nolikeblogs">
                        You Didn't Liked any Blog Yet
                    </div>}
                </div>
            </div>

            <ToastContainer position="top-center"
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

export default Addblog

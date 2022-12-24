import React, { useContext, useEffect, useState } from 'react'
import blogcontext from '../context/blog/blogcontext'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Addblog() {

    let locaObj = useLocation();

    let state = locaObj.state

    const Bcontext = useContext(blogcontext);
    const navigate = useNavigate();

    const { setProgress, blogs, fetchallblogs, userdetail, Getuser } = Bcontext;

    const [Form_inputs, setform_inputs] = useState({
        file: "",
        category: state?.category || 'Select blog category',
        title: state?.title || ""
    });

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchallblogs();
            Getuser();
            window.scrollTo(0, 0)
            if (locaObj.search != "?edit" || state == null) navigate('/addblog');
        }
        else {
            navigate('/Login')
        }
    }, []);




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

        if (e.target.name === 'file') {
            if (e.target.files[0]) {

                upload_txt.innerText = e.target.files[0].name;
            }
        }

    }


    const [upload, setupload] = useState(false);


    const handle_write_blog = async () => {

        const { title, category, file } = Form_inputs;

        function showtoast(msg) {
            toast.error(`${msg}`, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if (!title || !value) showtoast("Plz filled all the details!");

        else if (category == "Select blog category") showtoast("Plz select category of blog")

        else if (state == null && !file) showtoast("Plz upload an image file!");

        else if (file.size > 1000 * 1024) showtoast("Image size should not exceed 1 MB")

        else {

            
            const Form = new FormData();

            Form.append('title', title)
            Form.append('desc', value)
            Form.append('category', category)
            
            let res = null;
            
            if (locaObj.search != '?edit') {
                
                setupload("uploading");
                Form.append('blogimage', file);

                res = await fetch(`/api/blog/Addblog`,
                    {
                        method: "POST",
                        headers: {
                            "auth-token": localStorage.getItem("token")
                        },
                        body: Form
                    })
            }
            else {
                if(title === state.title && value === state.desc && category === state.category){
                    showtoast("No changes to save!")
                    return null;
                }
                
                setupload("Saving")

                res = await fetch(`/api/blog/Update_blog/${state._id}`,
                    {
                        method: "PUT",
                        headers:{
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify({title,value,category})
                    })
            }

            const json = await res.json();
            
            if (!json.status) {
                return navigate('/')
            }

            setTimeout(() => {
                setupload(!state ? "Uploading done" : "Changes saved");
            }, 700);

            setTimeout(() => {
                !state ? navigate('/') : window.history.back();
                let success_msg = !state ? "Blog posted sucessfully .." : "Changes have been made sucessfully"
                toast.success(success_msg, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }, 1500);

        }

    }

    const Handle_click = (blogid, category) => {

        setProgress(40);

        navigate(`/viewblog/${blogid}/${category}/${Math.random(99999, 99999999) * Math.pow(10, 16)}`)

        setTimeout(() => {
            setProgress(80)
        }, 800);
        setTimeout(() => {
            setProgress(100)
        }, 1100);

    }
    const file = document.getElementById('file');

    const Upload_btn = () => {

        
        function showtoast(msg) {
            toast.error(`${msg}`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        let msg = " blog Image cannot be changed only details can be :|"
        !state ? file.click() : showtoast(msg)
    }

    const [value, setValue] = useState(state?.desc || '');

    return (
        <>
            <div className='comm_font global_div'>
                <div className="formbox">
                    <h4> {locaObj.search == "" ? "Add a new blog" : "Edit Your blog Here"} </h4>
                    <div className="inputs">

                        <div className="Input_box top">
                            <input onChange={Onchange} value={Form_inputs.title ? Form_inputs.title : ""} required className='top_2_input' id='title' name='title' type="text" />
                            <label className='top_2_label' htmlFor="title"><i className="mx-1 fa-solid fa-blog"></i> Blog Title</label>
                        </div>

                        <div className="Input_box top desc_inpt_box">
                            <p className='m-t-minus1 lab' htmlFor="desc"><i className="mx-1 fa-solid fa-align-left"></i>Blog Description</p>

                            <ReactQuill name='desc' id='desc' theme="snow" value={value} onChange={setValue} />

                        </div>
                        <div className="bottom">
                            <div className="Input_box category_inpt">
                                <label className='lab' htmlFor="category"> <i className="fa-solid fa-list-check"></i><span className='mx-1'>Blog category</span> </label>
                                <select onChange={Onchange} value={Form_inputs.category ? Form_inputs.category : ""} name='category' id='category' className="form-select" aria-label="Default select example">
                                    <option value="Select blog category" >Select blog category</option>
                                    <option value="Fitness" >Fitness</option>
                                    <option value="Spiritual">Spiritual</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Nature">Nature</option>
                                    <option value="Nation">Nation</option>
                                    <option value="Lifestyle">Lifestyle</option>
                                </select>
                            </div>
                            <div className="file_box">
                                <label className='lab file_lab'><i className="fa-solid fa-image"></i><span className='mx-1'>Blog Image</span> </label>
                                <div className="upload_btn" onClick={Upload_btn}>
                                    <i className="fa-solid fa-upload"></i>
                                </div> <span className='upload_txt'> No file Choosen </span>
                                <input onChange={Onchange} id='file' name='file' type="file" />
                            </div>
                        </div>
                        {locaObj.search != "?edit" && <button disabled={upload === "uploading" || upload === "Uploading done"} onClick={handle_write_blog} className='add_btn'>
                            {!upload && <i className="mx-2 fa-solid fa-cloud-arrow-up"></i>}
                            {upload === "uploading" && <i className="mx-2 animate fa-solid fa-circle-notch"></i>}
                            {upload === "Uploading done" && <i className="mx-2 fa-solid fa-circle-check"></i>}

                            {!upload && "Upload "}
                            {upload === "uploading" && "Uploading...."}
                            {upload === "Uploading done" && "Uploading done"}

                        </button>}

                        {locaObj.search == "?edit" && <button disabled={upload === "Saving" || upload === "Changes saved"} onClick={handle_write_blog} className='add_btn'>
                            {!upload && <i className="mx-2 fa-solid fa-cloud-arrow-up"></i>}
                            {upload === "Saving" && <i className="mx-2 animate fa-solid fa-circle-notch"></i>}
                            {upload === "Changes saved" && <i className="mx-2 fa-solid fa-circle-check"></i>}

                            {!upload && "Save"}
                            {upload === "Saving" && "Saving...."}
                            {upload === "Changes saved" && "Changes saved"}

                        </button>}

                    </div>
                </div>
                <div className="likes_blog_div pos-rel width-45">
                    <h3><span><img src="https://cdn0.iconfinder.com/data/icons/tourism-and-outdoor-recreation-2/512/173_appriciate_remarks_good_like-512.png" className='i' alt="" /></span> Liked Blogs <small> [{count}] </small></h3>
                    <div className="fixed">
                        {
                            blogs.map(blog => {
                                return blog.Blikearr.includes(userdetail.id) && (
                                    <a className='cursor-pointer' key={blog._id} ><div onClick={() => { Handle_click(blog._id, blog.category) }} className="liked_blog ">
                                        <img src={`${blog.blogimg[0] + blog.blogimg[1] + blog.blogimg[2] + blog.blogimg[3] == "http" ? blog.blogimg : `/uploads/${blog.blogimg}`} `} alt="" className='l-b-img' />
                                        <p className='txt_deco_none text-center'>{blog.title}</p>
                                        <span className='like_desc'>{DESc(blog.desc)}..</span>
                                    </div></a>
                                )
                            })
                        }
                    </div>
                    <Link to='/'>
                        <button style={{ width: "100%" }} className='add_btn my-3'>
                            <i className="mx-2   fa-solid fa-braille"></i>
                            Go to Blogs page
                        </button>
                    </Link>
                    {count === 0 && <div className="nolikeblogs">
                        You Didn't Liked any Blog Yet
                    </div>}
                </div>
            </div>

        </>
    )
}

export default Addblog

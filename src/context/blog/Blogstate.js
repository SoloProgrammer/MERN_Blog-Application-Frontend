import { useState } from "react";
import blogcontext from "./blogcontext";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from "react-router-dom";

const Blogstate = (props) => {

    const host = process.env.REACT_APP_SERVER_HOST

    const [blog, setblog] = useState({})

    const [comments, setcomments] = useState([])

    const [load, setload] = useState(true)

    const [blogs, setBlogs] = useState([]);

    const [category, setcategory] = useState('')

    const [effectkey, seteffectkey] = useState(false);

    const [userdetail, setUserdetail] = useState([])

    const Getuser = async () => {
        const res = await fetch(`${host}/api/auth/getuser`,
            {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem("token")
                }
            })

        const json = await res.json()

        if(json.status === false){
            localStorage.clear();
        }
        else{

            setUserdetail({
                "Name": json.name1,
                "Email": json.email,
                "id": json._id
            })
        }

        return json;

    }


    const fetch_single_blog = async (blogid) => {
        const res = await fetch(`http://localhost:5000/api/blog/blog_by_id/${blogid}`);

        const json = await res.json();

        setblog(json.blog_by_id);

        setcomments(json.blog_by_id.Comments)

        setTimeout(() => {
            setload(false)
        }, 200);
    }

    const like_blog = async (blogid) => {

        const res = await fetch(`${host}/api/blog/like_Blog/${blogid}`, {
            method: "PUT",
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        });

        fetch_single_blog(blogid);
    }

    const post_commnet = async (comment, blogid) => {
        // console.log(comment, blogid)
        const res = await fetch(`${host}/api/blog/Addcomments/${blogid}`,
            {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },

                body: JSON.stringify({ comment })
            })

        toast.success("Comment posted sucessfully!", {
            position: "top-right",
            autoClose: 1600,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        fetch_single_blog(blogid);

        const json = await res.json();

        // console.log(json)
    }

    const del_comment = async (comm_id, blogid) => {
        // console.log(blogid, comm_id)
        const res = await fetch(`${host}/api/blog/Delete_comment/${blogid}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ comm_id })
        })
        const json = await res.json();

        if (json.status === "success") {
            fetch_single_blog(blogid);
            //    alert("comment deleted sucessfully..")
            toast.info("Comment deleted sucessfully!", {
                position: "top-right",
                autoClose: 1600,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const like_comment = async (blogid, comm_id, comm_index) => {
        // console.log(comm_id,comm_index)
        const res = await fetch(`${host}/api/blog/like_Comment/${blogid}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ comm_id, comm_index })
        })
        fetch_single_blog(blogid)
    }

    const dislike_comment = async (blogid, comm_id, comm_index) => {
        // console.log(comm_id,comm_index)
        const res = await fetch(`${host}/api/blog/dislike_Comment/${blogid}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ comm_id, comm_index })
        })
        fetch_single_blog(blogid)
    }

    const fetchallblogs = async () => {

        const res = await fetch('http://localhost:5000/api/blog/Allblogs');

        const json = await res.json();

        if (json.status) {
            setBlogs(json.allblogs);

        }
    }

    const fetch_category_blogs = async (category) => {
        const res = await fetch(`${host}/api/blog/blogs_by_category/${category}`);

        const json = await res.json();

        if (!json.status) {
            return setBlogs([])
        }

        setBlogs(json.blogs_by_category)

    }

    return (

        <blogcontext.Provider value={{userdetail,Getuser, effectkey, seteffectkey, blogs, blog, comments, fetch_category_blogs, fetchallblogs, fetch_single_blog, like_blog, load, post_commnet, del_comment, like_comment, dislike_comment, setcategory, category, setload }}>
            {props.children}
        </blogcontext.Provider>

    )
}

export default Blogstate

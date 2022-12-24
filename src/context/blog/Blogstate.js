import { useDebugValue, useState } from "react";
import blogcontext from "./blogcontext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blogstate = (props) => {

    const [blog, setblog] = useState({})

    const [comments, setcomments] = useState([])

    const [load, setload] = useState(true)

    const [blogs, setBlogs] = useState([]);

    const [category, setcategory] = useState('all')

    const [effectkey, seteffectkey] = useState(false);

    const [userdetail, setUserdetail] = useState([])

    const [progress, setProgress] = useState(0);

    const [single_load, setsingle_load] = useState(false);

    function showtoast(msg) {
        toast.success(`${msg}`, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function TokenisValid(resObj) {
        if (resObj.status === 401) {
            localStorage.clear();
            window.alert("Sorry seems to be your account session had been expried or token is invalid please login")
            window.location.href = window.location.origin + "/Login";
        }
    }

    const Getuser = async () => {
        const res = await fetch(`/api/auth/getuser`,
            {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem("token")
                }
            })

        TokenisValid(res)
        const json = await res.json()

        setUserdetail({
            "Name": json.name1,
            "Email": json.email,
            "id": json._id
        })
        return json;
    }

    const [blog_likes, setBlog_likes] = useState(0)


    const [islike, setislike] = useState(false);


    const fetch_single_blog = async (blogid) => {

        let user = {};
        if (localStorage.getItem('token')) {

            user = await Getuser();
        }

        const res = await fetch(`/api/blog/blog_by_id/${blogid}`);

        const json = await res.json();

        if (json.status === false) {
            return false
        }

        setblog(json.blog_by_id);

        setBlog_likes(json.blog_by_id.Blikearr.length)

        if (Object.keys(user).length > 0) {
            if (json.blog_by_id.Blikearr.includes(user._id)) { setislike(true) }
            else { setislike(false) }
        }

        setcomments(json.blog_by_id.Comments)

        setTimeout(() => {
            setload(false)
        }, 200);

    }

    const like_blog = async (blogid) => {

        const heart = document.querySelector('.fa-heart');

        if (!heart.classList.contains('fa-solid')) {
            heart.classList.add('fa-solid')
            heart.classList.add('red')
            heart.classList.add('bg-red')
        }
        else {
            heart.classList.add('fa-regular')
            heart.classList.remove('fa-solid')
            heart.classList.remove('red')
            heart.classList.remove('bg-red')
        }

        const res = await fetch(`/api/blog/like_Blog/${blogid}`, {
            method: "PUT",
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        });
        TokenisValid(res)

    }

    const post_commnet = async (comment, blogid) => {

        setsingle_load(true)

        const res = await fetch(`/api/blog/Addcomments/${blogid}`,
            {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },

                body: JSON.stringify({ comment })
            })

        TokenisValid(res)
        fetch_single_blog(blogid);
        setTimeout(() => {
            showtoast("Comment posted sucessfully !");
            setsingle_load(false)
        }, 300);


    }

    const update_comment = async (blogid, comm_id, new_comment) => {
        setsingle_load(true)
        const res = await fetch(`/api/blog/updateComment/${blogid}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ comm_id, new_comment })
            })
        TokenisValid(res)

        const json = await res.json();


        if (json.success) fetch_single_blog(blogid);
        setTimeout(() => {
            showtoast("Comment Updated sucessfully!");
            setsingle_load(false)
        }, 300);
    }

    const update_reply = async (blogid, comm_id, new_reply, rep_ind) => {
        setsingle_load(true)
        const res = await fetch(`/api/blog/update_reply/${blogid}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ comm_id, new_reply, rep_ind })
            })
        TokenisValid(res)

        const json = await res.json();

        if (json.success) fetch_single_blog(blogid);
        setTimeout(() => {
            showtoast("Reply Updated sucessfully!");
            setsingle_load(false)
        }, 300);
    }

    const del_comment = async (comm_id, blogid) => {
        setsingle_load(true)
        const res = await fetch(`/api/blog/Delete_comment/${blogid}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ comm_id })
        })
        TokenisValid(res)
        const json = await res.json();


        if (json.status === "success") fetch_single_blog(blogid);

        setTimeout(() => {
            showtoast("Comment deleted sucessfully!");
            setsingle_load(false)
        }, 300);

    }

    const like_comment = async (blogid, comm_id, comm_index) => {

        const like = document.getElementById(`like${comm_index}`);
        const dislike = document.getElementById(`dislike${comm_index}`);

        if (!like.classList.contains('fa-solid')) {
            like.classList.add('fa-solid')
            like.classList.add('red')
            dislike.classList.add('fa-regular')
            dislike.classList.remove('fa-solid')
        }
        else {
            like.classList.add('fa-regular')
            like.classList.remove('fa-solid')
            like.classList.remove('red')
        }


        const res = await fetch(`/api/blog/like_Comment/${blogid}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ comm_id, comm_index })
        })
        TokenisValid(res)
        fetch_single_blog(blogid)
    }

    const dislike_comment = async (blogid, comm_id, comm_index) => {

        const dislike = document.getElementById(`dislike${comm_index}`);
        const like = document.getElementById(`like${comm_index}`);

        if (!dislike.classList.contains('fa-solid')) {
            dislike.classList.add('fa-solid')
            like.classList.add('fa-regular')
            like.classList.remove('fa-solid')
            like.classList.remove('red')
        }
        else {
            dislike.classList.add('fa-regular')
            dislike.classList.remove('fa-solid')
        }

        const res = await fetch(`/api/blog/dislike_Comment/${blogid}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ comm_id, comm_index })
        })
        TokenisValid(res)
        fetch_single_blog(blogid)
    }

    const fetchallblogs = async () => {

        setProgress(40)

        setload(true)

        const res = await fetch(`/api/blog/Allblogs`);

        const json = await res.json();

        setProgress(80)

        if (json.status) {

            setBlogs(json.allblogs);
        }

        setProgress(100)

    }

    const fetch_category_blogs = async (category) => {
        setProgress(40)
        const res = await fetch(`/api/blog/blogs_by_category/${category}`);

        const json = await res.json();

        setProgress(80)

        if (!json.status) {
            setProgress(100)
            return setBlogs([])
        }

        setBlogs(json.blogs_by_category)

        setProgress(100)

    }

    const Reply_to_comments = async (rep, comm_id) => {

        setsingle_load(true)

        const res = await fetch(`/api/blog/push_reply/${blog._id}`,
            {
                method: "PUT",
                headers: {
                    "auth-token": localStorage.getItem('token'),
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ rep, comm_id })
            })
        TokenisValid(res)

        fetch_single_blog(blog._id);
        setTimeout(() => {
            showtoast("Replied sucessfully..");
            setsingle_load(false)
        }, 400);
    }

    const delete_reply_of_comments = async (comm_id, rep_id) => {

        setsingle_load(true)

        const res = await fetch(`/api/blog/delete_reply/${blog._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ comm_id, rep_id })
            })
        TokenisValid(res)
        fetch_single_blog(blog._id);
        setTimeout(() => {
            showtoast("Reply deleted sucessfully..");
            setsingle_load(false)
        }, 400);
    }

    const [stars, setstars] = useState(0);

    const [israte, setisrate] = useState(false)

    const [reviewid, setreviewid] = useState(false)

    const [feedback_by_user, setfeedback_by_user] = useState("");

    const [avg_rating, setavg_rating] = useState(0);

    const [is_review_added, setis_review_added] = useState(false)

    function set_average_ratings(json) {
        let sum = 0

        for (let i = 0; i < json.allstars.length; i++) {
            sum += json.allstars[i]
        }
        setavg_rating(sum / json.allstars.length)
    }

    const getstars = async () => {

        setProgress(40)

        const res = await fetch('/api/blog/getFeedbackbyuser',
            {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            })

        const json = await res.json();

        set_average_ratings(json)

        setProgress(80)

        if (json.success) {

            setfeedback_by_user(json.feedback_by_user)
            setstars(json.feedback_by_user.stars);
            setisrate(true);
            setreviewid(json.feedback_by_user._id);
        }
        else {
            setstars(0);
            setisrate(false);
        }

        setProgress(100)
    }

    const FirstRating = async (stars) => {
        const res = await fetch(`/api/blog/feedback/${stars}`,
            {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            })

        const json = await res.json();

        set_average_ratings(json);

        setisrate(true);
        setreviewid(json.feedback._id);

        getallfeedbacks();


    }
    const updateRating = async (stars) => {
        const res = await fetch(`/api/blog/updatefeedback/${reviewid}/${stars}`,
            {
                method: "PUT",
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            })

        const json = await res.json();

        set_average_ratings(json);

        getallfeedbacks();

    }

    const [allfeedbacks, setallfeedbacks] = useState("");

    const getallfeedbacks = async () => {
        const res = await fetch('/api/blog/getallfeedbacks');
        const json = await res.json()

        const Allfeedbacks = json.allfeedbacks;

        for (let i = 0; i < Allfeedbacks.length; i++) {
            if (Allfeedbacks[i].userid == userdetail.id) {
                Allfeedbacks[0] = [Allfeedbacks[i], Allfeedbacks[i] = Allfeedbacks[0]][0]
            }
        }

        setallfeedbacks(Allfeedbacks);
    }

    const addreview = async (review) => {
        setis_review_added(true)
        const res = await fetch(`/api/blog/addreview/updatefeedback`, {
            method: 'PUT',
            headers: {
                "auth-token": localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ review })

        })

        const json = await res.json()

        if (res) {
            getallfeedbacks();
            setisrate(true);
            setreviewid(json.feedback._id);
            setfeedback_by_user(json.feedback)
            setTimeout(() => {
                setis_review_added(false)
            }, 500);
        }

    }

    const delfeedback = async (id) => {
        const res = await fetch(`/api/blog/deletefeedback/${id}`,
            {
                method: 'DELETE'
            })

        const json = await res.json();


        if (res) {
            set_average_ratings(json);
            window.scrollTo(0, 0)
            getallfeedbacks();
            setisrate(false)
            setfeedback_by_user("")
        }
    }

    const update_review = async (review) => {
        setsingle_load(true)
        const res = await fetch('api/blog/updateReview',
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ review })
            })

        const json = await res.json();

        if (json.success) getallfeedbacks();

        setfeedback_by_user(json.feedback_by_user);

        setTimeout(() => {
            showtoast("Feedback updated sucessfully..");
            setsingle_load(false)
        }, 300);

    }

    // pagination states

    const [page,setpage] = useState(1)

    return (

        <blogcontext.Provider value={{ page,setpage,single_load, setislike, islike, blog_likes, setBlog_likes, progress, setProgress, update_review, delfeedback, is_review_added, feedback_by_user, addreview, getallfeedbacks, allfeedbacks, avg_rating, FirstRating, updateRating, israte, setisrate, stars, getstars, userdetail, Getuser, effectkey, seteffectkey, blogs, blog, comments, fetch_category_blogs, fetchallblogs, fetch_single_blog, like_blog, load, post_commnet, update_comment, del_comment, like_comment, dislike_comment, setcategory, category, setload, Reply_to_comments, delete_reply_of_comments, update_reply, setBlogs }}>
            {props.children}
        </blogcontext.Provider>

    )
}

export default Blogstate

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify';

function Login(props) {


    let navigate = useNavigate();
    const host = process.env.REACT_APP_SERVER_HOST

    const [credentials, setCredentails] = useState({
        email: "",
        password: "",
    })
    const Onchange = (e) => {
        setCredentails({ ...credentials, [e.target.name]: e.target.value })
    }

    function showtoast(msg) {
        toast.success(`${msg}`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const Handlesubmit = async (e) => {

        e.preventDefault()

        const { email, password } = credentials
        const res = await fetch(`${host}/api/auth/authenticate_user`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })

        const json = await res.json();

        if (json.Admin) {
            console.log(json.users)
            navigate("/Admin")
            localStorage.setItem('token', true)
        }
        else {

            if (json.success === true) {
                // props.show_Alert("Loggin Sucessfull,Add Notes now!!", "success")
                props.setkey(Math.random(10) * 10);
                toast.success("Loggin Sucessfull, Welcome to Blog_Home page", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                localStorage.setItem('token', json.authToken)
                setTimeout(() => {
                    navigate("/") //// async function in nature
                    
                }, 100);
                setCredentails({
                    email: "",
                    password: "",
                })

            }
            else {
                toast.error(json.errormsg, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

        }
    }

    return (
        <>
            <div className="Box system-ui ">
                <div className="Box_box shadow">
                    <h2 className='text-center'> Welcome to  <img className="mx-2" style={{ width: "100px" }} src="https://th.bing.com/th/id/OIP.sBbXymwnTY78P3xg0k4pGwHaDP?pid=ImgDet&w=524&h=229&rs=1" alt="cloud.png" /> App </h2>

                    <h6 style={{ color: "#12c512" }} className='text-center'>Storing Your Blogs on cloud</h6>
                    <p className='text-center'>Login to access Blog_App for free ,OR</p>
                    <Link style={{ "display": "block" }} className='text-center signup_btn' to="/Signup">Signup</Link>
                    <form className='accout_form my-3' onSubmit={Handlesubmit}>
                        <div className="form-group">
                            <label className='my-2' htmlFor="email"><i className="fa-solid fa-envelope mx-1"></i>Email address</label>
                            <input required value={credentials.email} onChange={Onchange} autoComplete='false' type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label className='my-2' htmlFor="password"><i className="fa-solid fa-key mx-1"></i>Password</label>
                            <input required value={credentials.password} onChange={Onchange} autoComplete='false' type="password" name='password' className="form-control" id="password" placeholder="Password" />
                        </div>
                        <div className="login_btn">
                            <button type="submit" className="btn btn-primary my-3">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login

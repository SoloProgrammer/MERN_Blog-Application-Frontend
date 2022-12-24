import React, { useState } from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom'

import { toast } from 'react-toastify';

function Login(props) {


    let navigate = useNavigate();
    let locat = useLocation();

    console.log(locat.state)

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
        const res = await fetch(`/api/auth/authenticate_user`,
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
                localStorage.setItem('token', json.authToken);
                
                
                window.history.back();


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
        <h1 className='text-center my-3 login_h1'>Login here</h1>

        <small><h2 style={{"fontSize":"1.5em"}} className='text-center'> Welcome to  <img className="mx-2" style={{ width: "100px" }} src="https://th.bing.com/th/id/OIP.sBbXymwnTY78P3xg0k4pGwHaDP?pid=ImgDet&w=524&h=229&rs=1" alt="cloud.png" /> App </h2></small>
            <div className="Box system-ui ">
                <div className="loginimg">
                    <img src="https://media.istockphoto.com/vectors/online-registration-and-sign-up-concept-young-man-signing-up-or-login-vector-id1219250758?b=1&k=20&m=1219250758&s=170667a&w=0&h=JD_DoiQEzxkBrrJlRm0DR08mGntWUEujxvnzhkoTg9w=" alt="" />
                </div>
                <div className="Box_box shadow">

                    <p className='text-center f-bold orange'>Login to access Blog_App for free ,OR</p>
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

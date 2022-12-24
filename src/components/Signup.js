import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Signup() {

    const [credentials, setCredentails] = useState({
        name1: "",
        email: "",
        password: "",
        cpassword: ""

    })
    function showtoast(msg) {
        toast.error(`${msg}`, {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    let navigate = useNavigate();
    const Onchange = (e) => {
        setCredentails({ ...credentials, [e.target.name]: e.target.value })
    }

    const Handlesubmit = async (e) => {
        e.preventDefault();

        const { name1, email, password, cpassword } = credentials

        if (password !== cpassword) {

            showtoast("Password and confirm password must match..");
        }

        else {

            const res = await fetch(`/api/auth/createuser`,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ name1, email, password })

                })

            const json = await res.json()

            if (json.success === true) {
                setCredentails({
                    name1: "",
                    email: "",
                    password: "",
                    cpassword: ""
                })

                toast.success("yayy!,Account Created Successfully ,Now You Can Login..Here", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate("/Login")
            }
            else {
                let errors = json.errors;

                errors && showtoast(errors[0].msg)

                json.errormsg && showtoast(json.errormsg)
            }
        }


    }
    return (
        <>
            <h1 className='text-center my-3 login_h1'>Sign-up here</h1>
            <h2 style={{"fontSize":"1.3em"}} className='text-center'> Welcome to  <img className="mx-2" style={{ width: "100px" }} src="https://th.bing.com/th/id/OIP.sBbXymwnTY78P3xg0k4pGwHaDP?pid=ImgDet&w=524&h=229&rs=1" alt="cloud.png" /> App </h2>
            <div className="Box system-ui ">
                <div className="Box_box shadow">

                    <p className='text-center f-bold orange'>Create an Account for free , OR</p>
                    <Link style={{ "display": "block" }} className='text-center signup_btn' to="/Login">Login</Link>
                    <form className='accout_form my-3' onSubmit={Handlesubmit}>
                        <div className="form-group">
                            <label className='my-2' htmlFor="exampleInputEmail1"><i className="fa-solid fa-user mx-1"></i>Full Name</label>
                            <input minLength={3} required value={credentials.name1} onChange={Onchange} autoComplete='false' type="text" className="form-control" id="name" name='name1' aria-describedby="emailHelp" placeholder="Enter name..." />
                        </div>
                        <div className="form-group">
                            <label className='my-2' htmlFor="exampleInputPassword1"><i className="fa-solid fa-envelope mx-1"></i>Email</label>
                            <input required value={credentials.email} onChange={Onchange} autoComplete='false' type="email" className="form-control" name='email' id="email" placeholder="Email..." />
                        </div>
                        <div className="form-group">
                            <label className='my-2' htmlFor="exampleInputPassword1"><i className="fa-solid fa-key mx-1"></i>Password</label>
                            <input required value={credentials.password} onChange={Onchange} autoComplete='false' type="text" name='password' className="form-control" id="password" placeholder="Password..." />
                        </div>
                        <div className="form-group">
                            <label className='my-2' htmlFor="exampleInputPassword1"><i className="fa-solid fa-key mx-1"></i>Confirm Password</label>
                            <input value={credentials.cpassword} onChange={Onchange} required autoComplete='false' type="password" name='cpassword' className="form-control" id="cpassowrd" placeholder="Confirm Password..." />
                        </div>
                        <div className="login_btn">
                            <button type="submit" className="btn btn-primary my-3">Sign-Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup

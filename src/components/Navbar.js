import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import blogcontext from '../context/blog/blogcontext';

function Navbar(props) {

  const loaction = useLocation();
  const navigate = useNavigate();

  const Bcontext = useContext(blogcontext)

  const { userdetail } = Bcontext

  const handlelogout = () => {
    localStorage.clear()
    navigate("/Login")
  }
  const click1 = (msg) => {
    props.show_Alert(msg, "danger");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {localStorage.getItem("token")  && localStorage.getItem("token") !== "true" && <i className="fa-solid fa-circle-user">

          <div className="userbox">
            <h2><i className="fa-solid fa-user-check mx-2"></i>{userdetail.Name}</h2>
            <h3>Logged in As</h3>
            <h4>{userdetail.Email}</h4>
          </div>

        </i>}
        <Link className="navbar-brand" to="/">Blog_App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {<Link onClick={() => { !localStorage.getItem("token") && click1("Login First to acesss inotebook Home page") }} className={`nav-link ${loaction.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>}
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${loaction.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
            {/* <li className="nav-item">
              <Link onClick={() => { !localStorage.getItem("token") && click1("Login First to acesss inotebook Blogs") }} className={`nav-link ${loaction.pathname === "/Blogs" ? "active" : ""}`} to="/Blogs">Blogs</Link>
            </li> */}

          </ul>

          {!localStorage.getItem("token") ? <form className="d-flex">
            <Link className="btn btn-outline-primary  mx-2" to="/Login">Login</Link>
            <Link className=" btn btn-outline-primary" to="/Signup">Sign-up</Link>
          </form> : <button onClick={handlelogout} className=" btn btn-outline-primary" >Logout</button>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

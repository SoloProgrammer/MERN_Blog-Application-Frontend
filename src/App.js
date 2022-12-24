import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/About';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import Signup from './components/Signup';
import { useContext, useState } from 'react';
import Allblogs from './Blog/Allblogs';
import Single_blog from './Blog/Single_blog';
import Addblog from './Blog/Addblog';
import M_top from './components/M_top'
import Page_not_found from './components/Page_not_found';
import Feedback from './components/Feedback';
import LoadingBar from 'react-top-loading-bar';

import blogcontext from './context/blog/blogcontext';


function App() {

  window.onunload = () => {
    // Clear the local storage
    window.localStorage.removeItem("view")
  }

  const Bcontext = useContext(blogcontext);

  const {progress,setProgress} = Bcontext;

  const [blogdetail, setblogdetail] = useState();

  // if (localStorage.getItem('blogdetail') === null || blogdetail !== undefined) {
  //   localStorage.setItem('blogdetail', JSON.stringify(blogdetail))
  // }

  const [key, setkey] = useState(0);

  const [editBlog,setEditBlog] = useState(false);

  return (
    <>
        <BrowserRouter>

          <M_top />

          <ToastContainer position="top-right"
            autoClose={1600}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />

          <Navbar />
          <LoadingBar waitingTime={500} color='#0cb2fa' progress={progress} onLoaderFinished={() => setProgress(0)}/>

          <Routes>

            <Route exact path="/" element={<Allblogs setblogdetail={setblogdetail} />} />

            <Route exact path="/singleblog" element={<Single_blog setEditBlog={setEditBlog} key={key} setkey={setkey} setblogdetail={setblogdetail} />} />

            <Route exact path="/Login" element={<Login setkey={setkey} />} />

            <Route exact path="/Signup" element={<Signup />} />

            <Route exact path="/viewblog/:id/:category/:random" element={<Single_blog key={key} setkey={setkey} setblogdetail={setblogdetail} />} />

            <Route exact path="/addblog" element={<Addblog editBlog = {editBlog} setblogdetail={setblogdetail} />} />

            <Route exact path="/feedback" element={<Feedback />} />

            {/* {
              
              localStorage.getItem("token") ? <Route exact path="/addblog" element={<Addblog editBlog = {editBlog} setblogdetail={setblogdetail} />} />
              : <Route exact path="/addblog" element={<Login setkey={setkey} />} />
            } */}


            {/* {

              localStorage.getItem("token") ? <Route exact path="/feedback" element={<Feedback />} />
                : <Route exact path="/feedback" element={<Login setkey={setkey} />} />
            } */}

            <Route path="*" element={<Page_not_found />} />

          </Routes>

        </BrowserRouter>


    </>
  );
}

export default App;

import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/About';
import { ToastContainer } from 'react-toastify';
import Blogstate from './context/blog/Blogstate';
import Login from './components/Login';
import Signup from './components/Signup';
import { useEffect, useState } from 'react';
import Allblogs from './Blog/Allblogs';
import Single_blog from './Blog/Single_blog';
import Addblog from './Blog/Addblog';
import Alert from './components/Alert';

function App() {

  const [alert, setAlert] = useState(null)

  const show_Alert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }



  const [blogdetail, setblogdetail] = useState();

  if (localStorage.getItem('blogdetail') === null || blogdetail !== undefined) {
    localStorage.setItem('blogdetail', JSON.stringify(blogdetail))
  }

  const[key,setkey] = useState(0)

  return (
    <>
      <Blogstate>
        <BrowserRouter>


          <ToastContainer position="top-right"
            autoClose={1600}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />

          <Navbar show_Alert={show_Alert} />
          <Alert alert={alert} />
          <Routes>

            {

              localStorage.getItem("token") ? <Route exact path="/" element={<Allblogs key={key} setblogdetail={setblogdetail} show_Alert={show_Alert} />} />
                : <Route exact path="/" element={<Login show_Alert={show_Alert} setkey={setkey}  />} />
            }


            <Route exact path="/about" element={<About />} />

            <Route exact path="/singleblog" element={<Single_blog setblogdetail={setblogdetail} />} />

            <Route exact path="/Login" element={<Login setkey={setkey} />} />

            <Route exact path="/Signup" element={<Signup show_Alert={show_Alert} />} />

            <Route exact path="/addblog" element={<Addblog setblogdetail={setblogdetail} />} />

          </Routes>



        </BrowserRouter>
      </Blogstate>


    </>
  );
}

export default App;

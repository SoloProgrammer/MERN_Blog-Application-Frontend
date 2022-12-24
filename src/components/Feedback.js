import React, { useState, useEffect, useContext, useRef } from 'react'
import blogcontext from '../context/blog/blogcontext';
import { toast } from 'react-toastify';
import loader3 from '../loader/loader3.gif'
import { useNavigate } from 'react-router-dom';

function Feedback() {

  const Bcontext = useContext(blogcontext);

  const { single_load, update_review, delfeedback, is_review_added, feedback_by_user, userdetail, addreview, Getuser, getallfeedbacks, allfeedbacks, avg_rating, stars, getstars, israte, FirstRating, updateRating } = Bcontext;

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      window.scrollTo(0, 0)
      getstars();
      getallfeedbacks();
      Getuser();
    }
    else{
      navigate('/Login')
    }
  }, [])

  const regx = / |\n/g;

  function toast_success(msg) {
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

  const upper_h3 = document.querySelector('.upper_h3');

  function common_code(id) {

    let allstars = document.querySelectorAll('.user_rating_star');
    allstars.forEach(eachstar => {

      if (eachstar.classList.contains('fa-solid') && eachstar.classList.contains('orange')) {
        eachstar.classList.remove('fa-solid')
        eachstar.classList.remove('orange')
      }
    })

  }

  const handlerate = (id) => {

    upper_h3.textContent = "Thankyou for your feeback !";
    common_code(id)

    if (israte) { updateRating(id) }

    else { FirstRating(id) }

    for (let i = 1; i <= id; i++) {

      let star = document.getElementById(`star${i}`);

      star.classList.add('fa-solid')
      star.classList.add('orange')
    }

    setTimeout(() => {
      const rate_text = document.querySelector('.rate_text');
      if (id == 1) rate_text.textContent = "Poor !"
      else if (id == 2) rate_text.textContent = "Not Bad !"
      else if (id == 3) rate_text.textContent = "Great !"
      else if (id == 4) rate_text.textContent = "Excellent !"
      else if (id == 5) rate_text.textContent = "Impressive !"
    }, 100);
  }

  const [inpt_review, setinpt_review] = useState("")

  const handleaddreview = () => {

    if (israte) {
      if (inpt_review.length > 0) addreview(inpt_review);
    }
    else {
      toast.error(`Plz Gave Rating - ⭐ to Review - 📝 !`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setinpt_review("")

  }

  const handlecancel = () => setinpt_review("");

  const wall = document.querySelector('.wall');
  const Editreview_box = document.querySelector('.Editreview_box');
  const [text_area, settext_area] = useState("");
  const [feedback,setFeedback] = useState("")

  const Feed_inpt = useRef()

  const Editfeedback = (review) => {
    settext_area(review)
    setFeedback(review)
    wall.classList.remove('none')

    setTimeout(() => {
      Editreview_box.classList.add('show_edit_box')
      Feed_inpt.current.focus()
    }, 200);

  }

  const hide_edit_box = () => {
    wall.classList.add('none')
    Editreview_box.classList.remove('show_edit_box')
  }

  const Update_Review = () => {
    hide_edit_box();
    if(feedback == text_area) return
    update_review(text_area);
  }

  const Removefeedback = (id) => {
    const confirm = window.confirm("Are you sure you want to remove your FEEDBACK?")
    if (confirm) {
      upper_h3.textContent = "RATE YOUR EXPERIENCE WITH US !";
      setTimeout(() => {
        const rate_text = document.querySelector('.rate_text');
        rate_text.textContent = "Rate us now !"
      }, 100);
      delfeedback(id)
      common_code(id);
      toast_success(`Your feedback Removed Sucessfully !`);

    }
  }

  function round_avg(avg_rating) {
    const new_avg = String(avg_rating)
    return new_avg.slice(0, 3)
  }

  const Observer = new IntersectionObserver(entries =>{
    entries.forEach(entry =>{
      if(entry.isIntersecting){
        entry.target.classList.add('front')
      }
      else{
        entry.target.classList.remove('front')
      }
    })
  })
  const hiddenElemets = document.querySelectorAll('.top1');
  hiddenElemets.forEach(el => Observer.observe(el));


  return (
    <>
      {single_load && <div className="action_load">
        <img src={loader3} />
      </div>}
      <div className="feedback_box m_b_5" >
        <div className="upper">
          <h3 className='text_center bold upper_h3 font_2_point_5'>
            {stars == 0 && "RATE YOUR EXPERIENCE WITH US"}
            {stars > 0 && "Thankyou for your feeback !"}
          </h3>
          <h5 className='m_t_3 text_center'>
            Your Feedback is very appreciable to us.
          </h5>
        </div>
        <div className="mid pointer_none">
          {<div className="m_l_2 avg_rating comm_font  text_center">

            <span className='bold'>"Average Ratings "</span> - ({round_avg(avg_rating)}) <small className='mx-2 bold'>Stars</small>
          </div>}
        </div>
        <div className="rev_img">
          <img src="https://static.vecteezy.com/system/resources/previews/000/691/405/original/customer-review-five-star-choice-illustration-vector.jpg" alt="" />
        </div>
        <div className="rate_box">
          <i onClick={() => { handlerate(1) }} id="star1" className={`user_rating_star cursor-pointer mx_point_15 ${stars >= 1 ? "fa-solid orange" : "fa-regular"}  fa-regular fa-star`}></i>
          <i onClick={() => { handlerate(2) }} id="star2" className={`user_rating_star cursor-pointer mx_point_15 ${stars >= 2 ? "fa-solid orange" : "fa-regular"}  fa-regular fa-star`}></i>
          <i onClick={() => { handlerate(3) }} id="star3" className={`user_rating_star cursor-pointer mx_point_15 ${stars >= 3 ? "fa-solid orange" : "fa-regular"}  fa-regular fa-star`}></i>
          <i onClick={() => { handlerate(4) }} id="star4" className={`user_rating_star cursor-pointer mx_point_15 ${stars >= 4 ? "fa-solid orange" : "fa-regular"}  fa-regular fa-star`}></i>
          <i onClick={() => { handlerate(5) }} id="star5" className={`user_rating_star cursor-pointer mx_point_15 ${stars >= 5 ? "fa-solid orange" : "fa-regular"}  fa-regular fa-star`}></i>
        </div>
        <div className="comm_font Rate_text_box">
          <span className='rate_text'>
            {stars == 0 && "Rate us now"}
            {stars == 1 && "Poor !"}
            {stars == 2 && "Not Bad !"}
            {stars == 3 && "Great !"}
            {stars == 4 && "Excellent !"}
            {stars == 5 && "Impressive !"}
          </span>
        </div>
        {feedback_by_user.length == 0 || feedback_by_user.review.replace(regx, "").length == 0 ? <div className="input_review_box comm_font">
          <h4>Share Your Experience with us <i className="mx-1 fa-regular fa-face-grin-hearts"></i> </h4>
          <div className="textbox">
            <input value={inpt_review} onChange={(e) => { setinpt_review(e.target.value) }} required id="review" type="text" />
            <label htmlFor="review">Write Your Review</label>
            <div className="underline"></div>
          </div>
          <div className="post_cancel_review_btns">
            <button onClick={handlecancel} className='btn cancel_btn'>cancel</button>
            <button onClick={handleaddreview} className='btn'>add review</button>
          </div>
          {is_review_added && <div className="loaderbox">
            <i className="fa-solid fa-circle-notch rotate"></i>
          </div>}
        </div> : ''}
        {feedback_by_user && feedback_by_user.review.replace(regx, "").length > 0 &&
          <div className='review_true comm_font'>
            <i className="fa-regular fa-circle-check"></i>
            <span>Reviewed Sucessfully !</span>
            <p className='info'>you can see all reviews in the below section</p>
          </div>}
        <h3 className='m_t_2_b_1 H_3'>All Reviwes and Ratings</h3>
        <div className="allfeedbacks comm_font">
          {allfeedbacks && allfeedbacks.map(feedback => {
            return (
              <div key={feedback._id} className='single_review top1'>
                <div className="review_user_detail">
                  <span className='user_name'>
                    <img className='userlogo' src="https://pl-partners.vn/wp-content/uploads/2021/06/ca-nhan-01.png" alt="user" />
                    <span className='mx-2 bold font_8'>{feedback.name}</span>
                    {userdetail.id == feedback.userid && <i onClick={() => (Removefeedback(feedback._id))} className="mx-2 fa-solid fa-trash"></i>}
                    {userdetail.id == feedback.userid && feedback.review.replace(regx, "").length != 0 && <i onClick={() => (Editfeedback(feedback.review))} className="mx-2 fa-solid fa-pen-to-square"></i>}
                  </span>
                  <p className='user_review'>
                    {feedback.review.replace(regx, "").length != 0 ? feedback.review : "Only Rated with stars , not reviewed yet."}
                  </p>
                  <span className="user_rating font_8 pointer_none">
                    <i id="star1" className={` cursor-pointer mx_point_15 ${feedback.stars >= 1 ? "fa-solid orange" : "fa-regular"}  fa-regular fa-star`}></i>
                    <i id="star2" className={` cursor-pointer mx_point_15 ${feedback.stars >= 2 ? "fa-solid orange" : "fa-regular"}  fa-regular fa-star`}></i>
                    <i id="star3" className={` cursor-pointer mx_point_15 ${feedback.stars >= 3 ? "fa-solid orange" : "fa-regular"}  fa-regular fa-star`}></i>
                    <i id="star4" className={` cursor-pointer mx_point_15 ${feedback.stars >= 4 ? "fa-solid orange" : "fa-regular"}  fa-regular fa-star`}></i>
                    <i id="star5" className={` cursor-pointer mx_point_15 ${feedback.stars >= 5 ? "fa-solid orange" : "fa-regular"}  fa-regular fa-star`}></i>
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="wall none">
        <div className="Editreview_box comm_font">
          <h4>Update Review Here <i className="mx-2 fa-solid fa-pen-to-square"></i></h4>
          <textarea ref = {Feed_inpt} value={text_area} onChange={(e) => (settext_area(e.target.value))} name="review_area" id="review_area" cols="30" rows="4"></textarea>
          <div className="btns">
            <button onClick={hide_edit_box} className='btn bold red'>Cancel</button>
            <button onClick={Update_Review} className='btn bold blue'>Update</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Feedback

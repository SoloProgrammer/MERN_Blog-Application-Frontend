import React,{useContext} from 'react'
import blogcontext from '../context/blog/blogcontext';

function Category_navigation({open,setopen}) {

    const Bcontext = useContext(blogcontext);
    const { fetchallblogs, fetch_category_blogs,setcategory,setload } = Bcontext;

    const Handleclick = (id,category) => {

        // setload(true)

        const all_li = document.querySelectorAll('.act');

        all_li.forEach(li => {
            li.classList.remove('active')
        })

        const li_by_id = document.getElementById(`${id}`);
        li_by_id.classList.add('active')

        if(category === "All"){
            return fetchallblogs();
        }

        fetch_category_blogs(category);

        setcategory(category);

    }

    return (
        <>
            <div className={` ${open && "open"} sidebar comm_font`}>
                <ul>
                    <li onClick={() => { Handleclick('li1','All') }} id='li1' className='act active'>
                        <div className="li_con">
                            <i className="fa-solid fa-braille"></i> <span>All</span>
                        </div>
                    </li>
                    <li onClick={() => { Handleclick('li2','Sports') }} id='li2' className='act'>
                        <div className="li_con">
                            <i className="fa-solid fa-baseball-bat-ball"></i><span>Sports</span>
                        </div>
                    </li>
                    <li onClick={() => { Handleclick('li3','Nature') }} id='li3' className='act'>
                        <div className="li_con">
                            <i className="fa-solid fa-tree"></i><span>Nature</span>
                        </div>
                    </li>
                    <li onClick={() => { Handleclick('li4','Fitness') }} id='li4' className='act'>
                        <div className="li_con">
                            <i className="fa-solid fa-dumbbell"></i><span>Fitness</span>
                        </div>
                    </li>
                    <li onClick={() => { Handleclick('li5','Spiritual') }} id='li5' className='act'>
                        <div className="li_con">
                            <i className="fa-solid fa-gopuram"></i> <span>Spiritual</span>
                        </div>
                    </li>
                    <li onClick={() => { Handleclick('li6','Travel') }} id='li6' className='act'>
                        <div className="li_con">
                            <i className="fa-solid fa-train"></i>   <span>Travel</span>
                        </div>
                    </li>
                    <li onClick={() => { Handleclick('li7','Technical') }} id='li7' className='act'>
                        <div className="li_con">
                            <i className="fa-solid fa-computer"></i>  <span>Technical</span>
                        </div>
                    </li>

                </ul>
            </div>
        </>
    )
}

export default Category_navigation

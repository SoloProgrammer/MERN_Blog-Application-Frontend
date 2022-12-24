import React, { useContext, useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import blogcontext from '../context/blog/blogcontext';
import SelectResults from './SelectResults';


function BlogPagination({category,setCategoryBlogs,setLoadingPagination}) {

  let [totalpages,setTotalpages] = useState(5);

  let Bcontext = useContext(blogcontext)
  const { page,setpage } = Bcontext;

  const [numOfBlogsPerPage,setNumOfBlogsPerPage] = useState(localStorage.getItem('num') ? localStorage.getItem('num') : 3)

  async function fetchPerPageBlogs(from){

    const config = {
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({category})
    }
    
    let res = await fetch(`/api/blog/limited_blogs?from=${from}&numOfBlogsPerPage=${numOfBlogsPerPage}`,config)
    let json = await res.json();
    setCategoryBlogs(json.blogs);
    window.scroll(0,0)
  }

   const totalresults = async () =>{
    setLoadingPagination(true)

    let res = await fetch(`/api/blog/totalnumOfBlogs?category=${category}`)
    let json = await res.json()
    setTotalpages(Math.ceil(json.results/numOfBlogsPerPage))
    setLoadingPagination(false)

  }

  useEffect(() =>{
    totalresults();
    fetchPerPageBlogs((1*numOfBlogsPerPage)-numOfBlogsPerPage);
  },[category,numOfBlogsPerPage])
  
  const HandlechangePage = async (e,page) =>{
    setpage(page)
    fetchPerPageBlogs((page*numOfBlogsPerPage)-numOfBlogsPerPage);
  }

  return (
    <Container style={{padding:"2rem",textAlign:"center"}} maxWidth="sm">
      <Stack style={{display:'flex',justifyContent:"space-evenly",flexDirection:'row',alignItems:'center',flexWrap:'wrap'}} spacing={2}>
        <Pagination page={page} onChange={HandlechangePage} count={totalpages} color="primary" size= {window.screen.width > 900 ? 'large' : 'medium'} />
        <SelectResults setpage={setpage} setNumOfBlogsPerPage={setNumOfBlogsPerPage}/>
      </Stack>
    </Container>
  );
}

export default BlogPagination

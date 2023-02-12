import React, { useState, useEffect } from 'react';
import http from "../../http";
import ListSms from '../../components/ListSms/ListSms';
import Form from "../../components/Form/Form";
//import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ReactPaginate from 'react-paginate';
import '../../components/Paginate/Paginate.css'
//import Paginate from '../Paginate/Paginate';



export default function ListPage() {

const [comments, setComments] = useState([]);
const [loading, setLoading] = useState(false);
//const [commentisChecked, setCommentisChecked] = useState([]);
const [commentsSelected, setCommentsSelected] = useState([]);

useEffect(() => {

   //fonction fetchGetCommentsJSON
   async function fetchGetCommentsJSON() {
   setLoading(true);
    const response = await fetch("http://localhost:1337/api/comments?sort[0]=createdAt:desc", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        
      },
      
      });
    if(!response.ok) {
      throw new Error("erreur dans le GET fetch")
    }
    const newComments = await response.json();
    return newComments;
  };
  fetchGetCommentsJSON()
   .then(res => {
     
      console.log("res use", res.data);
      setComments(res.data);
      setLoading(false);
     })
     .catch(err => {
      setLoading(false);
    });
}, []);
console.log("comments after useEffect", comments);


//fonction addComment pour ajouter un sms
function addComment(newComment) {

    //setLoading(false);
    setComments(comments => [...comments, newComment])
}

//toggle pour sélection ou déselectionner un sms
function toggleCheck(id) {
  console.log("id", id);
  const newComment = comments.filter(comment => comment.id === id);
  console.log("newComment", newComment);
  newComment[0].attributes.isChecked= !newComment[0].attributes.isChecked;
    setComments(
        comments.map((comment) => comment.id === newComment[0].id ? newComment[0] : comment)
    );
   setCommentsSelected(
    comments.filter(comment => comment.attributes.isChecked === true )
   )
  
 }

 function toggleCheckCurrentPage(items) {
    items.map((item=> toggleCheck(item.id)));
  
 }

 //fonction pour sélectionner ou déselectionner tous les sms
 function toggleAllCheck() {
  const allCheck = document.getElementById("checkallbox").checked;
  console.log("allCheck", allCheck);
 const newComments = comments.map((comment) => {
        return {
            id:comment.id,
            attributes: {
              ...comment.attributes,
            isChecked: allCheck
            }
        };
       
    }
    
 )
  console.log("newComments", newComments); 
  setComments(newComments);
 }
 


//fonction pour afficher la sweet alerte
// function deleteSweetReport() {
//   fireSweetAlert();
// };


  //le fonction pour sweetalert2
// function fireSweetAlert() {
  
//   //console.log(props);
//   Swal.fire({
     
//     title: 'Are you sure?',
//     text: "You won't be able to revert this!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire(
//         'Deleted!',
//         'Your file has been deleted.',
//         'success'
//       ).then(() => {deleteAllCommentsSelected()})
//     };
//   });
// };

//la fonction effacer les sms sélectionnés
function deleteAllCommentsSelected() {
  console.log("commentsSelected", commentsSelected);
  for (const comment of commentsSelected){
    console.log(`/api/comments/${comment.id}`);
    http.delete(`/api/comments/${comment.id}`)
    .then((res) => {
      console.log(res);
    })
    .catch(function (error) {
      console.log(error.toJSON());
    }) 
  };
  const newComments = comments.filter(item => !commentsSelected.includes(item));
  console.log(newComments);
  setComments(newComments);
  setCommentsSelected([]);
  document.getElementById("checkCurrentPage").checked=false;
  document.getElementById("checkallbox").checked=false;
}



//pagination 
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage, setPostsPerPage] = useState(5);
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentComments = comments.slice(indexOfFirstPost, indexOfLastPost);
const [numberPageRange] = useState(1);
const [numberPageMargin] = useState(1);
console.log("current comments", currentComments);
// const paginate = (pageNumber) => {
// 	setCurrentPage(pageNumber);
// };

// const previousPage = () => {
// 	if (currentPage !== 1) {
// 		setCurrentPage(currentPage - 1);
// 	}
// };

// const nextPage = () => {
// 	if (currentPage !== Math.ceil(comments.length / postsPerPage)) {
// 		setCurrentPage(currentPage + 1);
// 	}
// };

const paginate = ({ selected }) => {
  setCurrentPage(selected + 1);
};

function handleChangePostsPerPage(event) {
  setPostsPerPage( parseInt(event.target.value));
 console.log("value", typeof(parseInt(event.target.value)));
}



return (  
  <div className="App container bg-light shadow">
      <div className="row">
          <div className="col-sm-4 p-3 border-right">
              <h5>envoyer votre sms </h5>
            <ToastContainer />
            <Form addComment={addComment} />
          </div>
            
          <div className="col-sm-8  pt-3 bg-white">
            <ListSms comments={currentComments} setComments={setComments}
            toggleCheck={toggleCheck} toggleAllCheck={toggleAllCheck} 
            loading={loading} handleChangePostsPerPage={handleChangePostsPerPage}
            postsPerPage={postsPerPage} toggleCheckCurrentPage={toggleCheckCurrentPage}
            deleteAllCommentsSelected={deleteAllCommentsSelected}/>


              {/*  <Paginate
						postsPerPage={postsPerPage}
						totalPosts={comments.length}
						currentPage={currentPage}
						paginate={paginate}
						previousPage={previousPage}
						nextPage={nextPage}
					/> */}
    
          <ReactPaginate
						onPageChange={paginate}
            pageRangeDisplayed={numberPageRange}
            marginPagesDisplayed={numberPageMargin}
						pageCount={Math.ceil(comments.length / postsPerPage)}
						previousLabel={'Prev'}
						nextLabel={'Next'}
						containerClassName={'pagination'}
						pageLinkClassName={'page-number'}
						previousLinkClassName={'page-number'}
						nextLinkClassName={'page-number'}
						activeLinkClassName={'active'}
					/>
       
          </div>
    </div>
</div>
);
}



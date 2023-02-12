import React from 'react';
import Comment from "../Comment/Comment";
//import http from "../../http";
import Swal from 'sweetalert2';



export default function ListSms(props) {
const comments = props.comments;

const postsPerPage = props.postsPerPage;
const handleChangePostsPerPage = props.handleChangePostsPerPage;
const toggleAllCheck = props.toggleAllCheck;
const toggleCheck = props.toggleCheck;
const deleteAllCommentsSelected = props.deleteAllCommentsSelected;
const toggleCheckCurrentPage = props.toggleCheckCurrentPage;
const loading = props.loading;

//   useEffect(() => {

//     setLoading(true);
//     http.get("/api/comments").then(res => {
      
//       console.log("res.data.data", res.data.data);
//       setComments(res.data.data)
//       setLoading(false)
//     })
  
//       .catch(err => {
//        setLoading(false);
//      });
//  }, []);


//toggle pour sélection ou déselectionner un sms
//  const toggleCheck = (id) => {
//   console.log("id", id);
//   const newComment = comments.filter(comment => comment.id === id);
//   console.log("newComment", newComment);
//   newComment[0].attributes.isChecked= !newComment[0].attributes.isChecked;
//     setComments(
//         comments.map((comment) => comment.id === newComment[0].id ? newComment[0] : comment)
//     );
//    setCommentsSelected(
//     comments.filter(comment => comment.attributes.isChecked === true )
//    )
  
//  }

 //fonction pour sélectionner ou déselectionner tous les sms
//  function toggleAllCheck() {
//   const allCheck = document.getElementById("checkallbox").checked;
//   console.log("allCheck", allCheck);
//  const newComments = comments.map((comment) => {
//         return {
//             id:comment.id,
//             attributes: {
//               ...comment.attributes,
//             isChecked: allCheck
//             }
//         };
       
//     }
    
//  )
//   console.log("newComments", newComments); 
//   setComments(newComments);
//  }
 
// console.log("afternewComments", comments);

//fonction pour afficher la sweet alerte
// const deleteSweetReport = () => {
//   fireSweetAlert();
// };


  //le fonction pour sweetalert2
function fireSweetAlert() {
  
  //console.log(props);
  Swal.fire({
     
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      ).then(() => {deleteAllCommentsSelected()})
    };
  });
};

//la fonction effacer les sms sélectionnés
// function deleteAllCommentsSelected() {
//   console.log("commentsSelected", commentsSelected);
//   for (const comment of commentsSelected){
//     console.log(`/api/comments/${comment.id}`);
//     http.delete(`/api/comments/${comment.id}`)
//     .then((res) => {
//       console.log(res);
//     })
//     .catch(function (error) {
//       console.log(error.toJSON());
//     }) 
//   };
//   const newComments = comments.filter(item => !commentsSelected.includes(item));
//   console.log(newComments);
//   setComments(newComments);
//   setCommentsSelected([]);
 
// }



   return (
   
    <div className="commentList">
      <h5 className="text-muted mb-4">
        <span className="badge badge-success"></span>{" "}
        Liste des sms envoyé{comments.length > 0 ? "s" : ""}   
      </h5>
      <button className="btn btn-danger btn-sm mx-1 float-right" 
         
         onClick={() =>{fireSweetAlert()}}>
                          Delete sms &#10003;
        </button>
      
          
     
      <div className="d-flex justify-content-start align-items-center">
        <div>
          <label htmlFor="checkallbox" className="p-2 m-0">Tous</label>
          <input
            name="checkallbox"
            type="checkbox"
            id="checkallbox"
            onChange={() => toggleAllCheck()} />
        </div>
      
          <div className="col-2 mx-3">
            <select className="form-select form-select-sm " value={postsPerPage} onChange={handleChangePostsPerPage}>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
       <div>
          <label htmlFor="checkCurrentPage" className="p-2 m-0">Page courante</label>
          <input
            name="checkCurrentPage"
            type="checkbox"
            id="checkCurrentPage"
            onChange={() => toggleCheckCurrentPage(comments)} />
        </div>
      </div>
      
      {comments.length === 0 && !loading ? (
        <div className="alert text-center alert-info">
          Aucun sms
        </div>
      ) : null}

      {comments && comments.map((comment, index) => (
        <Comment key={index} comment={comment} toggleCheck={toggleCheck}/>
        
      ))}
   
        
    </div>
  );
}
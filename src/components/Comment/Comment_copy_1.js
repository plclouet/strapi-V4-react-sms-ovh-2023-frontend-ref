import React from "react";
//import http from "../http";
//import Swal from 'sweetalert2';

export default function Comment(props) {
  //console.log("props", props);
  const { nomComplet, numTel, description, createdAt, isChecked } = props.comment.attributes;
  const id  = props.comment.id;
  // const deleteComment = props.deleteComment;
  // const selectedArray = props.selectedArray;
  const toggleCheck = props.toggleCheck;

  
  //les fonctions pour sweetalert2
// const fireSweetAlert = () => {
//     console.log(selectedArray);
    
//     Swal.fire({
       
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire(
//           'Deleted!',
//           'Your file has been deleted.',
//           'success'
//         ).then(() => {deleteComment(id)})
//       };
//     });
// };

//   const deleteSweetReport = (id) => {
     
//     fireSweetAlert(id);
//   };

  return (
    <div className="media mb-3" name="box">

      <div className={`media-body p-2 shadow-sm rounded 
      ${isChecked ? 'bg-secondary text-white' : 'bg-light' } border`}
      onClick={() => toggleCheck(id)}>
      <div className="d-flex flex-row justify-content-between">
        <label htmlFor="checkbox" className="p-2 m-0">{nomComplet}
        </label>
        {isChecked ? (<i className="fa-solid fa-check"></i>) : 
      (<i className="fa-thin fa-square"></i>)}
      
      </div>
        
        <h6 className="mt-0 mb-1">{numTel} à {createdAt.slice(0,16)} </h6> 
        <div className="d-flex flex-row justify-content-center">
            {description}
          
        </div>

      </div>
    </div>
  );
}
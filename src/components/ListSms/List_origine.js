import React from "react";
import Comment from "../Comment/Comment";
import Swal from 'sweetalert2';



export default function List(props) {

  const deleteMultiComment = props.deleteMultiComment;
  const selectedArray = props.selectedArray;
  const toggleAllCheckbox = props.toggleAllCheckbox;
  
  const fireSweetAlert = () => {
    
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
        ).then(() => {deleteMultiComment()})
      };
    });
  };
  
  const deleteSweetComment = () => {
     
    fireSweetAlert();
  };



  

  return (
   
    <div className="commentList">
      <h5 className="text-muted mb-4">
        <span className="badge badge-success">{props.comments.length}</span>{" "}
        Liste des sms envoyé{props.comments.length > 0 ? "s" : ""}   
      </h5>
      <button className="btn btn-danger btn-sm mx-1 float-right" 
         disabled={(selectedArray.length === 0? true: false)}
         onClick={() =>{deleteSweetComment()}}>
                          Delete sms &#10003;
        </button>
      <div className="d-flex justify-content-start align-items-center">
      <label htmlFor="checkallbox" className="p-2 m-0">Tous</label>
        <input
            name="checkallbox"
            type="checkbox"
            defaultChecked={props.isChecked}
            onChange={() => toggleAllCheckbox()} />
      </div>
      
      {props.comments.length === 0 && !props.loading ? (
        <div className="alert text-center alert-info">
          Aucun sms
        </div>
      ) : null}

      {props.comments.map((comment, index) => (
        <Comment key={index} comment={comment} deleteComment={props.deleteComment}
        toggleCheckbox={props.toggleCheckbox} toggleAllCheckbox={props.toggleAllCheckbox} 
        selectedArray={selectedArray}/>
      ))}
    </div>
  );

}
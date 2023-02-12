import React, { useState, useEffect } from 'react';
import http from "../..http";
import List from "../../components/ListSms";
import Form from "../../components/Form";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ListPage() {

const [comments, setComments] = useState([]);
const [loading, setLoading] = useState(false);
const [commentisChecked, setCommentisChecked] = useState([]);
const [commentsSelected, setCommentsSelected] = useState([]);

useEffect(() => {

   setLoading(true);
   http.get("/api/comments").then(res => console.log("res", res))
   .then(res => {
     
      setComments(res.data.data) ,
      setLoading(false)
     })
     .catch(err => {
      setLoading(false);
    });
}, []);


function addComment(comment) {
    setLoading(false);
    setComments({
      ...comments,
      comment
    }),
}

function deleteComment(id) {
  http.delete(`/api/comments/${id}`)
  .then(res => {
    console.log(res);
    const newcomments = comments.filter(item => item.id !== id);
    setLoading(false);
    setComments(newcomments);

  }).catch(function (error) {
    console.log(error.toJSON());
  })
}

function deleteMultiComment() {
  let deleteArray = selectedArray;

}

function toggleCheckbox(id) {
  let selectedArray = this.state.selectedArray
  let find = selectedArray.indexOf(id)

  if(find > -1) {
    selectedArray.splice(find, 1)
  } else {
    selectedArray.push(id)
  }

  this.setState({
    selectedArray
})
console.log("selectArray", selectedArray);
}

function toggleAllCheckbox() {
    
  this.setState({
    isChecked:!this.state.isChecked,
})

let selectedArray = this.state.selectedArray;
  const comments = this.state.comments;
  const checkallboxe = document.getElementsByName('checkallbox');
  const checkboxes = document.getElementsByName('checkbox');
 
  for(var i=0, n=checkboxes.length;i<n;i++) {
    checkboxes[i].checked = checkallboxe[0].checked;
  }
  if (!this.state.isChecked){
    selectedArray=[];
    comments.map(comment => selectedArray.push(comment.id));
    this.setState({
      selectedArray
  })
  } else {
    selectedArray=[];
    this.setState({
      selectedArray
  })
  }
  console.log("selectArray", selectedArray);
}


return (  
  <div className="App container bg-light shadow">

  <div className="row">
    <div className="col-sm-4  pt-3 border-right">
      <h6>Envoyer votre sms</h6>
      <ToastContainer />
      <Form addComment={addComment} />
    </div>
    <div className="col-sm-8  pt-3 bg-white">
      <List
        loading={loading}
        comments={comments}
        selectedArray={selectedArray}
        deleteComment={deleteComment} 
        deleteMultiComment={deleteMultiComment} 
        toggleCheckbox={toggleCheckbox}
        toggleAllCheckbox={toggleAllCheckbox}
      />
    </div>
  </div>
</div>);
}




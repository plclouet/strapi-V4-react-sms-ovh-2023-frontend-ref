import React, { Component } from "react";
import http from "./http";
import List from "./components/List";
import Form from "./components/Form";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      loading: false,
      isChecked: false,
      selectedArray: []
    };

    this.addComment = this.addComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.deleteMultiComment = this.deleteMultiComment.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.toggleAllCheckbox = this.toggleAllCheckbox.bind(this);
  }

  //chargement initial
  componentDidMount() {
    // loading
    this.setState({ loading: true });
    
    // get all the comments
    http.get("/api/comments")
    .then(res => console.log("res", res))
      //.then(res => res.json())
      .then(res => {
        this.setState({
          comments: res.data.data,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }


   //ajouter un nouveau comment
  addComment(comment) {
    this.setState({
      loading: false,
      comments: [comment, ...this.state.comments]
    });
  }
 
  //effacer un comment
  deleteComment(id) {
    http.delete(`/api/comments/${id}`)
    .then(res => {
      console.log(res);
      const newcomments = this.state.comments.filter(item => item.id !== id);
      this.setState({
        loading: false,
        comments: newcomments
      });
    }).catch(function (error) {
      console.log(error.toJSON());
    })
  }

//effacer plusieurs sms
deleteMultiComment() {
  let deleteArray = this.state.selectedArray;
  console.log(deleteArray);
  for (const id of deleteArray) {
    http.delete(`/api/comments/${id}`)
    .then(res => {
      console.log(res);
      const newcomments = this.state.comments.filter(item => item.id !== id);
      this.setState({
        loading: false,
        comments: newcomments
      });
    })
    .catch(function (error) {
      console.log(error.toJSON());
    })    
  }
  deleteArray=[];
  this.setState({
    selectedArray:deleteArray
})
const checkallboxe = document.getElementsByName('checkallbox');
checkallboxe[0].checked = false;
const checkboxes = document.getElementsByName('checkbox');
for(var i=0, n=checkboxes.length;i<n;i++) {
  checkboxes[i].checked = false;
}
console.log("après delete", this.state.selectedArray);

}



//gestion d'une checkbox
  toggleCheckbox(id) {
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



  //gestion de toutes les checkbox
  toggleAllCheckbox() {
    
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

  render() {

    <header className="App-header">
   
    <h1 className="App-title">
      SMS

    </h1>
   
  </header>
   
    return (

      
      <div className="App container bg-light shadow">
        

        <div className="row">
          <div className="col-sm-4  pt-3 border-right">
            <h6>Envoyer votre sms</h6>
            <ToastContainer />
            <Form addComment={this.addComment} />
          </div>
          <div className="col-sm-8  pt-3 bg-white">
            <List
              loading={this.state.loading}
              comments={this.state.comments}
              selectedArray={this.state.selectedArray}
              deleteComment={this.deleteComment} 
              
              deleteMultiComment={this.deleteMultiComment} 
              toggleCheckbox={this.toggleCheckbox}
              toggleAllCheckbox={this.toggleAllCheckbox}
            />
          </div>
        </div>
      </div>
     
    );
  }
}

export default HomePage;

import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

//le schema pour le questionnaire à mettre en dehors de la fonction Form
const schema = yup.object({
    nomComplet: yup.string().required(),
    numTel: yup.string().required(),
    description: yup.string().required(),

}).required();



export default function Form(props) {


 const addComment = props.addComment;
  const [loading, setLoading] = useState(false);
  // const [comment, setComment] = useState([{
  //   nomComplet: "",
  //   numTel: "",
  //   description: "",
  //   isChecked: false
  // }]);

  //notify
  function notify() {toast("sms bien envoyé", {
    position: "top-center",
    autoClose: 500
  });
}

  //useForm
  const { register, handleSubmit, formState:{ errors }, reset } = useForm({
    resolver: yupResolver(schema),
  
    
   
  });


  const [movies, setMovies] = useOutletContext();




  //fonction onSubmit
function onSubmit(data) {

  //fonction fetchPostCommentJSON
  async function fetchPostCommentJSON(data) {
   
    const response = await fetch("http://localhost:1337/api/comments", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          nomComplet: data.nomComplet,
          numTel: data.numTel,
          description: data.description,
          isChecked: false,
      }}),
    });
    if(!response.ok) {
      throw new Error("erreur dans le POST fetch")
    }
    const newComment = await response.json();
    return newComment;
  }
    
    console.log("data",data);
    setLoading(true);
    fetchPostCommentJSON(data)
    .then(newComment => {
      setLoading(false);
      console.log(newComment.data);
      notify();
      addComment(newComment.data);
      reset({
        nomComplet: "",
        numTel: "",
        isChecked: false
      });
      setMovies(movies.map((m) => {
        return {
            ...m,
            isChecked:false
            }
      }));
    }).catch(error => console.log(error));
  }
  //console.log("props", props);


  //function prechoix pour le message
  function monMessage(e) {
    document.getElementById("description").value = e.target.value;
    console.log("value", e.target.value);
  }

  // console.log("essai new data", newComment);

    return (
   
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Nom</label>
            <textarea rows="5" {...register("nomComplet")} className="form-control"
            value={props?.noms}/>
            <p>{errors.nomComplet?.message}</p>
          </div>

          <div className="form-group">
          <label>Téléphone</label>
            <textarea rows="5" {...register("numTel")} className="form-control"
            value={props?.tels}/>
            <p>{errors.numTel?.message}</p>
          </div>

          <div className="form-group">
          <label>Message</label>
            <textarea rows="5" {...register("description")} className="form-control" 
            id="description"/>
            <p>{errors.description?.message}</p>
          </div>
          <div className="mb-3">
            <select className="form-select form-select-sm " onChange={monMessage} defaultValue={"DEFAULT"}
            name="selectDescription" id="selectDescription">
              <option value="DEFAULT" disabled>Choisir un message...</option>
              <option value="Votre IRM est dictée vous pouvez venir la chercher au service de radiologie du CMC">IRM</option>
              <option value="Votre IRM est dictée vous pourrez venir la chercher au service de radiologie du CMC la semaine prochaine">IRM semaine prochaine</option>
              <option value="Votre examen est prêt vous pouvez venir le chercher au service de radiologie du CMC">Examen</option>
              <option value="Votre examen est prêt vous pourrez venir le chercher au service de radiologie du CMC la semaine prochaine">Examen semaine prochaine</option>
            </select>
          </div>

          <div className="form-group">
            <input type="submit" disabled={loading} className="btn btn-primary" />
          </div>
        </form>

    );

}
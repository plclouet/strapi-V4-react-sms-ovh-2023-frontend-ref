import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { read, utils } from 'xlsx';
import { v4 as uuidv4 } from 'uuid';
import { useOutletContext } from "react-router-dom";
import Form from "../../components/Form/Form";


const schema = yup.object({
  //fileXlsx: yup.string().required(),
   // firstName: yup.string().required(),
//   age: yup.number().positive().integer().required(),

}).required();

export default function HomePage() {


    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastComment, setLastComment] = useState([]);

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    
    console.log("bonjour", data.fileXlsx[0]);
    const files = data.fileXlsx;
   handleImportBis(files);

}

const [movies, setMovies, moviesSelected, setMoviesSelected] = useOutletContext();
//   const [movies, setMovies] = useState([]);
//   const [moviesSelected, setMoviesSelected] = useState([]);

//   const handleImport = ($event) => {
//       const files = $event.target.files;
//       console.log("select", files);
//       if (files.length) {
//           const file = files[0];
//           const reader = new FileReader();
//           reader.onload = (event) => {
//               const wb = read(event.target.result);
//               const sheets = wb.SheetNames;

//               if (sheets.length) {
//                   const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
//                    setMovies(rows);
               
//                   console.log("rows", rows);
//               }
//           }
//           reader.readAsArrayBuffer(file);
//       }
//   }

  const handleImportBis = (files) => {
   // const files = document.getElementById("inputGroupFile").files;
   // console.log("select", files);
    if (files.length) {
        const file = files[0];
       
        const reader = new FileReader();
        reader.onload = (event) => {
            const wb = read(event.target.result);
            const sheets = wb.SheetNames;
            console.log("wb", wb);
            if (sheets.length) {
                console.log("sheets0", wb.Sheets[sheets[0]]["!ref"].slice(4)-1);
                const lim = wb.Sheets[sheets[0]]["!ref"].slice(4)-1;
                console.log("wb", wb.Sheets[sheets[0]]);
                const rows = utils.sheet_to_json(wb.Sheets[sheets[0]], {range: 'A3:B'+lim});
               
                //const rows = tmp1.slice(-1);
                rows.map(row => {
               return (
                row.isChecked = false,
                row.id = uuidv4()

               ) 
                 
                }
                );
              
                setMovies(rows);
                //localStorage.setItem("COOKIE_DATA",JSON.stringify(rows));
                console.log("rows", rows);
                console.log("movies", movies);
            }
        }
        reader.readAsArrayBuffer(file);
    }
}


useEffect(() => {

    //fonction fetchGetCommentsJSON
    async function fetchGetCommentsJSON() {
    setLoading(true);
     const response = await fetch("http://localhost:1337/api/comments", {
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
    setLastComment(newComment);
    setComments(comments => [...comments, newComment])
}

const toggleCheck = (id) => {
    console.log("id", id);
    const newMovie = movies.filter(movie => movie.id === id);
    console.log("newMovie", newMovie);
    newMovie[0].isChecked= !newMovie[0].isChecked;
    setMovies(
        movies.map((m) => m.id === newMovie[0].id ? newMovie[0] : m)
    );
   setMoviesSelected(
    movies.filter(m => m.isChecked === true )
   )
    
    
  };
  console.log("movies", movies);
  console.log("moviesSelected", moviesSelected);
  console.log("Noms", moviesSelected.map((m) => m.Patient));
  console.log("Portables", moviesSelected.map((m) => m.Portable));
  console.log("remise à zéro", movies.map((m) => {
    return {
        ...m,
        isChecked:false
        }
  }));
  console.log("lastComment", lastComment);
  console.log("loading", loading);

  return (

    <div className="App container bg-light shadow">
     <div className="row ">
            <div className="col-sm-6 p-3 border-right">
              <h5>envoyer votre sms </h5>
              <ToastContainer />
              <Form  addComment={addComment} noms={moviesSelected.map((m) => m.Patient)} 
              tels={moviesSelected.map((m) => String(m.Portable).replace(/\s+/g, '').replace(/^0/, '+33'))}/>
              <div className="m-3">
                <p>dernier sms envoyé</p>
                 {
                    lastComment.length===0 ?  <p>Aucun</p> : 
                    
                    <div className="media mb-3" name="box">

                         <div className="media-body p-2 shadow-sm rounded border">
                                <div className="d-flex flex-column">
                                    <div>
                                        {lastComment.attributes.nomComplet}
                                    </div>
                                    <div>
                                        {lastComment.attributes.numTel}
                                    </div>
                                    <div>
                                       à {lastComment.attributes.createdAt.slice(0,16)}
                                    </div>
                                    <div>
                                        {lastComment.attributes.description}
                                    </div>
                                </div>
                            </div>
                    </div>
                 } 
     
           {/* {lastComment && <Comment comment={lastComment}/> } */}
              </div>
            
            </div>
            <div className="col-sm-6  pt-3 bg-white">
            <div className="col  p-3 border-right">
                    <form className="form-control form-control-lg" onSubmit={handleSubmit(onSubmit)}>
                        
                       
                        <input {...register("fileXlsx")} type="file" name="fileXlsx" className="custom-file-input" id="inputGroupFile" required 
                                            //onChange={handleImportBis}
                         accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                                      
                        <p>{errors.file?.message}</p>
                            
                        {/* <input {...register("firstName")} />
                        <p>{errors.firstName?.message}</p> */}
        
                        {/* <input {...register("age")} />
                        <p>{errors.age?.message}</p> */}
                                    
                    
                    <input type="submit" />
                    </form>
                    
             </div>
            
             <div className="row">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                               
                                <th scope="col">Patient</th>
                                <th scope="col">Portable</th>
                                <th scope="col">Checked</th>
                            </tr>
                        </thead>
                        <tbody> 
                                {
                                    movies.length
                                    ?
                                    movies.map((movie, index) => (
                                        <tr key={index} className={`${movie.isChecked  ? 'bg-secondary text-white' : 'bg-light' }`}
                                        onClick={() => toggleCheck(movie.id)}>
                                            
                                            <th scope="row">{ index + 1 }</th>
                                            
                                            <td>{ movie.Patient }</td>
                                            <td>{String(movie.Portable).replace(/\s+/g, '').replace(/^0/, '+33')}</td>
                                            <td onClick={() => toggleCheck(movie.id)}>{movie.isChecked ? (<i className="fa-solid fa-check"></i>) : 
                                            (<i className="fa-thin fa-square"></i>)} 
                                            </td>
                                            {/* <td><span className="badge bg-warning text-dark">{ movie.Rating }</span></td> */}
                                        </tr> 
                                    ))
                                    :
                                    <tr>
                                        <td colSpan="5" className="text-center">No Movies Found.</td>
                                    </tr> 
                                }
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>
    </div>
   
  );
}

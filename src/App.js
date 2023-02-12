import React, { useState } from "react";  
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [moviesSelected, setMoviesSelected] = useState([]);

  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header />
        <div className="flex-fill p-3">
          <Outlet context={[movies, setMovies, moviesSelected, setMoviesSelected]}/>
        </div>
      <Footer />
    </div>
  );
}

export default App;

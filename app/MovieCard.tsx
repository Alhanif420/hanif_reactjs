"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardText } from 'react-bootstrap';


const MovieCard = () => {
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies');
        
        setMovieData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {movieData && (
        <div className="row">
          {movieData.data.map((movie, index) => (
            <div key={index} className="col-md-4">
              <Card className='bg-transparent text-white
               text-center movieImage'>
                <img className="card-img-top"
                 src={movie.foto} alt="Card image cap"></img>
                <div className='bg-dark p-2 m-1'>
                  <CardText>{movie.judul}</CardText>
                  <CardText>Rating: {movie.rating}</CardText>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



export default MovieCard;
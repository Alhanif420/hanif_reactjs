"use client";

import { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Card, CardText, Carousel } from "react-bootstrap";

type Movie = {
    id: number;
    foto: string;
    judul: string;
    rating: number;
};

const MovieCard = () => {
    const [movieData, setMovieData] = useState<Movie[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/movies');
                setMovieData(response.data.data);
                console.log(response.data);
            } catch (error) {
                console.log('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [movieData]);

    function setDelete(id: number) {
        try {
            axios.delete('http://localhost:5000/api/movies/' + id);
        } catch (error) {
            console.log('Error delete data: ', error)
        }
    }

    return (
        <div>
            {movieData && (
                <div className="row">
                    {movieData.map((movie, index) => (
                        <div key={index} className="col-md-4">
                            <Card className='bg-transparent text-white text-center movieImage'>
                                <div>
                                    <img 
                                        className="card-img-top"
                                        src={movie.foto}
                                        alt="Card image cap"
                                        style={{ height : "300px"}}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <Button as="a" variant="danger" onClick={() => setDelete(movie.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                        </svg>
                                    </Button>    
                                </div>

                                <div className="bg-dark p-2 m-1">
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
}

export default MovieCard;
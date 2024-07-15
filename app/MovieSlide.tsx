import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";

type Movie = {
    id: number;
    foto: string;
    judul: string;
    rating: number;
    sutradara: string;
};

const MovieSlide = () => {
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
        <>
            <Carousel>
                {movieData?.map((movie, index) => (
                    <Carousel.Item>
                        <img 
                        src={movie.foto}
                        className="d-block w-100"
                        />
                        <Carousel.Caption>
                            <h3>{movie.judul}</h3>
                            <p>{movie.sutradara}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}   
            </Carousel>
        </>
    )
}

export default MovieSlide;
import {useEffect, useState} from "react";
import axios from "axios";
import {PulseLoader} from "react-spinners";
import './MoviesComponent.css';

function MoviesComponent() {
    const [movies, setMovies] = useState([]);
    const [showLoadingTitle, setShowLoadingTitle] = useState(true);
    const [showRequest, setShowRequest] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const [showMovieLoading, setShowMovieLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/movies")
            .then(resp$ => {
                setMovies(resp$.data);
                setShowLoadingTitle(false);
            })
            .catch(err$ => {
                console.log(err$.message);
            })
        axios.get("http://localhost:8080/movies/categories")
            .then(resp$ => {
                setCategories(resp$.data);
            })
            .catch(err$ => {
                console.log(err$.message)
            })
    }, []);
    return (
        <>
            <div className={'row'}>
                <div className={'col-3'}>
                    <h2>Movies list</h2>
                    {showLoadingTitle &&
                        <h2 style={{display: 'inline'}}>Loading<PulseLoader style={{verticalAlign: '-3px'}}/></h2>}
                    {!showLoadingTitle && movies.slice(0, 10).map(movie => {
                        return (
                            <div onClick={() => getMovie(movie.title)} className={'movie'}
                                 key={movie.id}>{movie.title} {movie.releaseYear}</div>
                        )
                    })}
                </div>
                <div className={'col-4'}>
                    <h2>Result set</h2>
                    {showRequest &&
                        <h2 style={{display: 'inline'}}>Loading<PulseLoader style={{verticalAlign: '-3px'}}/></h2>}
                    {!showRequest && movieList.map(movie => {
                        return (
                            <div className={'movie'} key={movie.id}>{movie.title} {movie.releaseYear}</div>
                        )
                    })}
                </div>
                <div className={'col-4'}>
                    <h2>Movie category list</h2>
                    {showLoadingTitle &&
                        <h2 style={{display: 'inline'}}>Loading<PulseLoader style={{verticalAlign: '-3px'}}/></h2>}
                    {!showLoadingTitle && categories.slice(0,10).map(category => {
                        return (
                            <div onClick={() => getMovieCategory(category)} className={'movie'} key={Math.random()}>{category}</div>
                        )
                    })}
                </div>
            </div>
        </>
    )

    function getMovie(title) {
        setShowRequest(true);
        axios.get("http://localhost:8080/movies/search", {params: {title: title}})
            .then(resp$ => {
                setShowRequest(false);
                setMovieList(resp$.data);
            })
            .catch(err$ => {
                console.log(err$);
                setShowRequest(false);
            })
    }

    function getMovieCategory(category) {
        setShowRequest(true);
        axios.get("http://localhost:8080/movies/categories/search", {params: {category: category}})
            .then(resp$ => {
                setMovieList(resp$.data);
                setShowRequest(false);
            })
            .catch(err$ => {
                setShowRequest(false);
                console.log(err$.message);
            })
    }

}

export default MoviesComponent;
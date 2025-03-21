import MovieDetails from "@/app/movies/[id]"

/* eslint-disable @typescript-eslint/ban-ts-comment */
export const TMDB_CONFIG = {
    BASE_URL : 'https://api.themoviedb.org/3',
    API_KEY : process.env.EXPO_PUBLIC_MOVIE_API_Key,
    Headers:{
        accept:'Application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_Key}`
    }

}

export const fetchMovies = async ({query} : {query:string}) => {
    const endPoint = query ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`

    const response = await fetch(endPoint,{
        method:'GET',
        headers:TMDB_CONFIG.Headers
    }) 

    if(!response.ok){
        // @ts-ignore
        throw new Error('Faild to fetch movies',response.statusText)
    }

    const data = await response.json();

    return data.results;

}


export const getMovieDetail = async (movieId:string): Promise<MovieDetails>=>{
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,{
            method:'GET',
            headers:TMDB_CONFIG.Headers
        });
        if(!response.ok){
            throw new Error('Failed to fetch movie');
        }else{
            const data = response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
} 

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWU5ZWYxODIyNDZiODNmZjQ1OTE2ZjQ4ZjJmNDU1YyIsIm5iZiI6MTc0MjIwMzcyNS40NTEsInN1YiI6IjY3ZDdlYjRkMjVmMDFkNTQxNjdjMjA0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zCQeEEzSeMO-tTDzL5DmYHYVmuneUh5RLMLkgL-aXF4'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));
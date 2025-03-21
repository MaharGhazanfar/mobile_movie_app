
// fetch movies
// fetch movie details
// useFetch(fetchFunction)

import { useEffect, useState } from "react"

const useFetch = <T>(fetchFunction: ()=> Promise<T> , autoFetch = true)=> {

    const [data, setData] = useState<T|null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error|null>(null);
    const fetchData = async() =>{
       try {
        setLoading(true);
        setError(null);
        const results = await fetchFunction();
        setData(results);
       } catch (error) {
        setError(error instanceof Error ? error : new Error( 'An error Occured'));
       }finally{
        setLoading(false);
       }
    }

    const resetData = ()=>{
        setData(null);
        setLoading(false);
        setError(null);
    }

    useEffect(()=>{
        if(autoFetch){
            fetchData();
        }
    },[]);


    return {data, loading, error,resetData,refetch:fetchData};


}

export default useFetch;
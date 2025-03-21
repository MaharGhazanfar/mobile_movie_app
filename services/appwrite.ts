// Track the search made by user 

import { Client, Account, ID, Databases, Query } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTIO_ID!;


const client = new Client()
    .setProject('67d92bf60030c593c4e1')
    .setPlatform('com.ce.movieapp')
    .setEndpoint('https://cloud.appwrite.io/v1');


    const database = new Databases(client);


export const updateSearchCount = async (query : string, movie:Movie)=>{
    try {
       //Check if the record of that search already beem stored
    const results = await database.listDocuments(DATABASE_ID, COLLECTION_ID,[Query.equal('search_term',query)])
    console.log(results);
    if(results.documents.length > 0){
      const existingMovie = results.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
            count:existingMovie.count+1
        }
    )
    }else{
        await database.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
                search_term : query,
                movie_id:movie.id,
                title:movie.title,
                poster_url:`https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                count:1
            }
                    )  
    } 
    } catch (error) {
        console.log(error);
        throw error;
    }
    

    // If a document found increment the search count field 
    // if not found then create a new document in appwrite database -> 1
}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined>=>{
try {
    const results = await database.listDocuments(DATABASE_ID, COLLECTION_ID,[Query.limit(5),Query.orderDesc('count')])
  return results.documents as unknown as TrendingMovie[];
} catch (error) {
    console.log(error);
    return undefined;

}
}
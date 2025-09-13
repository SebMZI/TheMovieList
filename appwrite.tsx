import { Client, Databases, ID, Query } from "appwrite";
import { fetchMovieCredits, fetchSeriesCredits } from "./api/tmdb";

const client = new Client()
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ?? "")
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ?? "");

const databases = new Databases(client);

export const addToDatabase = async (media) => { 
  try {
    const rating = Math.round((media.vote_average / 10) * 5);
    const titleToQuery = media?.title?.trim() || media?.name?.trim();
    const mediaTypeToQuery = media?.media_type?.trim();

    if (!titleToQuery || !mediaTypeToQuery) {
      console.error("Cannot add/query media: missing title or media_type", media);
      return;
    }

    const result = await databases.listDocuments({
      databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID ?? "",
      collectionId: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID ?? "",
      queries: [
        Query.equal("title", titleToQuery),
        Query.equal("media_type", mediaTypeToQuery),
      ],
    });

    if (result.documents.length > 0) {
      console.log("This media is already in the database.");
      console.log(result.documents[0]);
      return result.documents[0];
    }

    if(media.media_type === "movie") {
      const movieCredits = await fetchMovieCredits(media.id);
      const movieCast = movieCredits.cast.sort((a, b) => a.order - b.order).slice(0, 4).map(member => member.name).join(", ");
      const movieProducers = movieCredits.crew.filter(member => member.job === "Producer" || "Executive producer").slice(0, 9).map(member => member.name).join(", ");
      media.cast = movieCast;
      media.producers = movieProducers;

    }else {
      const tvCredits = await fetchSeriesCredits(media.id);
      const tvCast = tvCredits.cast.sort((a, b) => a.order - b.order).slice(0, 4).map(member => member.name).join(", ");
      const tvProducers = tvCredits.crew.filter(member => member.job === "Producer" || "Executive producer").slice(0, 9).map(member => member.name).join(", ");
      media.producers = tvProducers;
      console.log("TV Cast:", tvProducers);
      media.cast = tvCast;
    }

    const movie = await databases.createDocument({
      databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID ?? "",
      collectionId: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID ?? "",
      documentId: ID.unique(),
      data: {
        title: titleToQuery,
        media_type: mediaTypeToQuery,
        tmdb_id: media.id || 0,
        overview: media.overview || "",
        poster_url: media.poster_path ? `https://image.tmdb.org/t/p/w500${media.poster_path}` : "",
        vote_average: rating || 0,
        air_date: media.first_air_date || media.release_date || "",
        cast: media.cast || "",
        producers: media.producers || "",
      }
    });

    console.log("Media added successfully!");
    return movie;
  } catch (error) {
    console.error("Error adding to database:", error);
  }
};


import axios from 'axios';
const TMDBBearerToken = import.meta.env.VITE_TMDB_BEARER_TOKEN;

export const apiClient = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const TMDBClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${TMDBBearerToken}`,
    'Content-Type': 'application/json',
  },
});


export const vidSrcClient = axios.create({
  baseURL: 'https://',
  headers: {
    'Content-Type': 'application/json',
  },
});



// TODO - add axios interceptors
// TODO - update env name in netlify

// TODO - axios interceptors
// TODO - update env name in netlify

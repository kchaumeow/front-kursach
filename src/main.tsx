import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Box} from "@chakra-ui/react";
import movieApi from "./api.ts";
import { useToast } from '@chakra-ui/react'
import MovieCard, {Movie} from "./components/MovieCard.tsx";
function App() {
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    setMovies([]);
    setLoading(true);
    movieApi.getMovies().then((response) => {
      setMovies(response.data);
    }).catch((error) => {
      console.error(error);
      toast({
        title: error.title,
        description: error.data,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }).finally(() => setLoading(false));
  }, []);
  if (isLoading) return <Box>Loading...</Box>;
  if (!movies.length) return <Box>No movies found</Box>;
  return (
    <Box>
      {movies.map(movie => <div key={movie.id}><MovieCard movie={movie}/></div>)}
    </Box>
  )
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

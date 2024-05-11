import {Box, Button, Heading, Text} from "@chakra-ui/react";
import movieApi from "../api.ts";
import { useToast } from '@chakra-ui/react'
import MovieCard, {Movie} from "../components/MovieCard.tsx";
import Parsing from '../components/Parsing.tsx';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
export function Home() {
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  function reloadMovies() {
    movieApi.getMovies().then((response) => {
      setMovies(response.data);
    }).catch((error) => {
      toast({
        title: error.response.data.message,
        description: error.response.data.description[0],
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "top-right"
      })
    }).finally(() => setLoading(false));
  }
  useEffect(() => {
    setMovies([]);
    setLoading(true);
    movieApi.getMovies().then((response) => {
      setMovies(response.data);
    }).catch((error) => {
      toast({
        title: error.response.data.message,
        description: error.response.data.description[0],
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "top-right"
      })
    }).finally(() => setLoading(false));
  }, []);
  if (isLoading) return <Box>Загрузка...</Box>;
  if (!movies.length) return (
    <>
      <Text textAlign="center" p={2} fontSize="large">База фильмов пуста</Text>
      <Heading mt="70px" textAlign="center" mb={4}>Спарсить фильм по id кинопоиска с его страницы</Heading>
      <Parsing reload={reloadMovies} />
    </>
);
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {movies.map(movie => <div key={movie.id}><MovieCard movie={movie} reload={reloadMovies}/></div>)}
      <Link to="/movies/create">
        <Button colorScheme="teal">Добавить фильм</Button>
      </Link>
      <Heading mt="70px" mb={4}>Спарсить фильм по id кинопоиска с его страницы</Heading>
      <Parsing reload={reloadMovies}/>
    </Box>
  )
}

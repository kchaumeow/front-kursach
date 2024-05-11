import {Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Stack, StackDivider, Text, useToast} from "@chakra-ui/react";
import movieApi from "../api";
import { Link } from "react-router-dom";

export type Movie = {
  id: number;
  name: string;
  kinopoisk_id: number;
  release_year: number;
  genre: string;
  link: string;
  description: string;
  rating: number;
}

export default function MovieCard({movie, reload}: {movie: Movie, reload: Function}){
  const toast = useToast();
  return (
    <Card variant="filled" m={5} w="1200px">
      <CardHeader>
        <Heading size='lg'>{movie.name}</Heading>
      </CardHeader>
      
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Описание
            </Heading>
            <Text pt='2' fontSize='sm'>
              {movie.description}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Дата выхода
            </Heading>
            <Text pt='2' fontSize='sm'>
              {movie.release_year}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
            Рейтинг
            </Heading>
            <Text pt='2' fontSize='sm'>
              {movie.rating}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
            Жанр
            </Heading>
            <Text pt='2' fontSize='sm'>
              {movie.genre}
            </Text>
          </Box>
        </Stack>
      </CardBody>
      <CardFooter>
        <Box display="flex" gap={5}>
        <Button colorScheme="red" onClick={()=> {
          movieApi.deleteMovie(movie.id).then(()=> {
            reload();
          }).catch((error)=> {
            toast({
              title: error.title,
              description: error.data,
              status: 'error',
              duration: 5000,
              isClosable: true,
              position: "top-right"
            })
          })

        }}>Удалить</Button>
        <Link to={`/movies/${movie.id}`}>
          <Button colorScheme="yellow">Обновить данные</Button>
        </Link>
        </Box>
      </CardFooter>
    </Card>
  )
}
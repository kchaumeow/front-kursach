import {Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text} from "@chakra-ui/react";

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

export default function MovieCard({movie}: {movie: Movie}){
  return (
    <Card>
      <CardHeader>
        <Heading size='md'>{movie.name}</Heading>
      </CardHeader>
      
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Описание:
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
        </Stack>
      </CardBody>
    </Card>
  )
}
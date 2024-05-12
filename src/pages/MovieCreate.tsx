import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  StackDivider,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Movie } from "../components/MovieCard";
import { useState } from "react";
import movieApi from "../api";

export default function MovieCreate() {
  const [updatedMovie, setMovie] = useState<Movie>({
    name: "",
    description: "",
    id: 0,
    release_year: 0,
    rating: 0,
    kinopoisk_id: 0,
    genre: "",
    link: "http://localhost:5173/movies/create",
  });
  const toast = useToast();
  return (
    <Card variant="elevated" m={10}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          movieApi
            .createMovie(updatedMovie)
            .then((response) => {
              toast({
                title: "Новый фильм добавлен!",
                description: response.data.name,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
              });
            })
            .catch((error) => {
              console.log(error);
              toast({
                title: error.response.data.message,
                description: error.response.data.link[0],
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
              });
            });
        }}
      >
        <CardHeader>
          <Text>Начните заполнять поля. После нажмите кнопку "Сохранить"</Text>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Название
              </Heading>
              <Input
                value={updatedMovie.name}
                onChange={(e) =>
                  setMovie((prev) => ({ ...prev, name: e.target.value }))
                }
                type="text"
                minLength={1}
                isRequired
              />
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Описание
              </Heading>
              <Input
                value={updatedMovie.description}
                onChange={(e) =>
                  setMovie((prev) => ({ ...prev, description: e.target.value }))
                }
                type="text"
                minLength={1}
                isRequired
              />
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Дата выхода
              </Heading>
              <Input
                value={updatedMovie.release_year.toString()}
                onChange={(e) =>
                  setMovie((prev) => ({
                    ...prev,
                    release_year: parseInt(e.target.value),
                  }))
                }
                type="number"
                min={1900}
                max={2040}
                isRequired
              />
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Рейтинг
              </Heading>
              <NumberInput
                value={updatedMovie.rating}
                precision={1}
                step={0.2}
                onChange={(e) => setMovie((prev) => ({ ...prev, rating: +e }))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Жанр
              </Heading>
              <Input
                value={updatedMovie.genre}
                onChange={(e) =>
                  setMovie((prev) => ({ ...prev, genre: e.target.value }))
                }
                type="text"
                minLength={1}
                isRequired
              />
            </Box>
          </Stack>
        </CardBody>
        <CardFooter>
          <Button type="submit">Сохранить</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

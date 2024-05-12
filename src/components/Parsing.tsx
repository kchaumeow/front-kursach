import { Box, Button, Select, useToast } from "@chakra-ui/react";
import { useState } from "react";
import movieApi from "../api";

const ids = [
  "326",
  "342",
  "361",
  "370",
  "430",
  "435",
  "448",
  "49684",
  "258687",
  "535341",
];

export default function Parsing({ reload }: { reload: Function }) {
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const [id, setId] = useState("");
  return (
    <Box mb={300}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          movieApi
            .getMovieByKinoposikId(+id)
            .then((response) => {
              console.log(response.data);
              toast({
                title: "Фильм успешно спаршен",
                description: response.data.name,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
              });
            })
            .catch((error) => {
              console.error(error);
              toast({
                title: error.data.message,
                description: error.data.description[0],
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
              });
            })
            .finally(() => {
              setLoading(false);
              reload();
            });
        }}
      >
        <Box display="flex" flexDirection="column" gap={5} alignItems="center">
          <Select
            w="400px"
            value={id}
            placeholder="Выбрать id фильма с КиноПоиска"
            required
            onChange={(e) => {
              setId(e.target.value);
            }}
          >
            {ids.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </Select>
          <Button type="submit" disabled={isLoading} colorScheme="blue">
            Спарсить фильм
          </Button>
        </Box>
      </form>
    </Box>
  );
}

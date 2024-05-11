import { Box, Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound(){
    return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" m={10} gap={10}>
        <Heading textAlign="center">Этой страницы не существует</Heading>
        <Link to="/"><Button>На главную</Button></Link>
    </Box>
    )
}
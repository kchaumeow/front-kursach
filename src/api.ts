import axios from "axios";
import {Movie} from "./components/MovieCard.tsx";
interface CreateMovie {
  id?: number;
  name: string;
  kinopoisk_id: number;
  release_year: number;
  genre: string;
  link: string;
  description: string;
  rating: number;
}

interface UpdateMovie {
  name?: string;
  kinopoisk_id?: number;
  release_year?: number;
  genre?: string;
  link?: string;
  description?: string;
  rating?: number;
}
const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
})
class MovieApi {
  async getMovies() {
    return httpClient.get<Movie[]>("/movies/");
  }
  async getMovieByKinoposikId(kinopoisk_id: number) {
    return httpClient.get<Movie>(`/movies/${kinopoisk_id}/`);
  }
  async createMovie(movie: CreateMovie) {
    return httpClient.post("/movies/", movie);
  }
  
  async updateMovie(id: number, movie: UpdateMovie) {
    return httpClient.put(`/movies/${id}/`, movie);
  }
  
  async deleteMovie(id: number) {
    return httpClient.delete(`/movies/${id}/`);
  }
}
const movieApi = new MovieApi();
export default movieApi;
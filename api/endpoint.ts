const BASE_URL = process.env.BASE_URL ?? '';
const API_VERSION = process.env.API_VERSION ?? '';

export default {
  search: () => `${BASE_URL}/${API_VERSION}/search/movie`,
  credits: (movieId: string) => `${BASE_URL}/${API_VERSION}/movie/${movieId}/credits`,
  similar: (movieId: string) => `${BASE_URL}/${API_VERSION}/movie/${movieId}/similar`
}
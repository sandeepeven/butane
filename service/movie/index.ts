import { METHOD, ENDPOINT } from '@/api'

const ACCESS_TOKEN = process.env.ACCESS_TOKEN ?? ''

async function searchMovie(movieName: string) {
	return new Promise(async (resolve, reject) => {
		try {
			const endpoint = ENDPOINT.search()
			METHOD.GET(
				endpoint,
				{
					query: movieName,
				},
				{
					Authorization: 'Bearer' + ' ' + ACCESS_TOKEN,
				},
				(response) => resolve(response)
			)
		} catch (error) {
			console.log('search error', error)
		}
	})
}

async function getMovieCredits(movieId: string) {
	return new Promise(async (resolve, reject) => {
		try {
			const endpoint = ENDPOINT.credits(movieId)
			METHOD.GET(
				endpoint,
				{},
				{
					Authorization: 'Bearer' + ' ' + ACCESS_TOKEN,
				},
				(response) => resolve(response)
			)
		} catch (error) {
			console.log('createMovieCredits', error)
		}
	})
}


async function getSimilarMovies(movieId: string) {
	return new Promise(async (resolve, reject) => {
		try {
			const endpoint = ENDPOINT.similar(movieId)
			METHOD.GET(
				endpoint,
				{},
				{
					Authorization: 'Bearer' + ' ' + ACCESS_TOKEN,
				},
				(response) => resolve(response)
			)
		} catch (error) {
			console.log('getSimilarMovies', error)
		}
	})
}




export default {
	searchMovie,
	getMovieCredits,
	getSimilarMovies,
}

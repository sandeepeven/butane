import { Movie } from '@/service'

export async function GET(request: Request, { params }: { params: { id: string } }): Promise<Response> {
	const movieId = params.id
	console.log('movieId', movieId)
	return new Promise(async (resolve, reject) => {
		if (movieId) {
			const data = await Movie.getMovieCredits(movieId)
			resolve(
				Response.json({
					status: true,
					data,
				})
			)
		} else {
			resolve(Response.json({
				status: true,
				data: [],
			}))
		}
	})
}

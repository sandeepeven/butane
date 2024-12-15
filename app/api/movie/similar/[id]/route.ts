import { Movie } from '@/service'
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<Response> {
	const movieId = params.id
	console.log('movieId', movieId)
	return new Promise(async (resolve, reject) => {
		if (movieId) {
			const data = await Movie.getSimilarMovies(movieId)
			resolve(
				NextResponse.json({
					status: true,
					data,
				})
			)
		} else {
			resolve(NextResponse.json({
				status: true,
				data: [],
			}))
		}
	})
}

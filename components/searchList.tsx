import React, { MouseEvent } from 'react'
import { MovieItem } from '@/types/movie'

export default ({
	data,
	loading = true,
	captureMovie
}: {
	data: Array<MovieItem> | []
	loading: boolean
	captureMovie: (event: MouseEvent<HTMLDivElement>) => void
}) => {
	const noData = data.length === 0
  const hasMovie = !noData && !loading
	return (
		<div id="search-list-id" className="w-11/12 mx-4 p-4 bg-white sm:top-56 md:top-28 absolute border rounded-md max-h-52 hidden overflow-scroll">
			{loading && <span className="loader place-self-center" />}
			{noData && (
				<span className="place-self-center text-black text-lg">
					no movie found...
				</span>
			)}
			{hasMovie && data.map((movie) => (
				<div key={movie.id} onClick={captureMovie} data-movie={JSON.stringify(movie)} className='hover:bg-fuchsia-400 cursor-pointer text-black hover:text-white p-2'>
					<span id="movie-title" className="text-base text-inherit ">
						{movie.title}
					</span>
					<span id="movie-year" className="text-base text-inherit ml-2">
						({movie.release_date?.slice(0, 4)})
					</span>
				</div>
			))}
		</div>
	)
}

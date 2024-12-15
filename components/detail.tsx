import type { CastItem, DetailItem } from '@/types/movie'
import Genres from '@/constants/genre.json'
import Image from 'next/image'
import SimilarMovie from './similarList'

const listGenres = (data: Array<number>) => data.map((id, index) => <span key={id} className="p-1 text-sm rounded-lg bg-blue-400 text-white mx-2">{Genres[String(id) as keyof typeof Genres]}</span>)

const listCast = (data: Array<CastItem>) => (
	<div className="flex w-full overflow-y-scroll p-2 my-2">
		{data.map((item) => (
			<div key={item.cast_id} className="p-4 border">
				<Image
					src={
						'https://image.tmdb.org/t/p/original' +
						item.profile_path
					}
					height={80}
					width={60}
					alt={item.name}
				/>
				<div className="text-xs mt-3">Character: {item.character}</div>
				<div className="text-xs mt-3">Name: {item.name}</div>
        <div className="text-xs mt-3">{item.known_for_department}</div>
			</div>
		))}
	</div>
)

export default ({
	rate,
	popularity,
	title,
	genre_ids,
	cast,
	original_language,
	overview,
	poster_path,
	star,
	similar,
}: DetailItem) => (
	<div>
		<p className="my-2">Overview: {overview}</p>
		<div className="my-2">Genre: {listGenres(genre_ids)}</div>
		<div className="my-4">Cast:- {listCast(cast)}</div>
		<div>Language: {original_language}</div>
		<div>Popularity: {popularity}</div>
		<div className="flex mt-4">
			Star: <Star n={5} rate={rate} star={star} />
		</div>
		<div className="flex w-full overflow-y-scroll justify-evenly m-4">
			{similar.map(item => <SimilarMovie key={item.id} {...item} />)}
		</div>
	</div>
)

const Star = ({ n, rate, star }: { n: number, rate: (e: React.MouseEvent<HTMLDivElement>) => void, star: string | null }) =>
	Array.from({ length: n }).map((_, index) => (
		<div
      key={index}
			className={`star-${index} peer bg-slate-300 mx-1 cursor-pointer`}
			style={{
				backgroundColor: star && String(index) < star ? "#facc15" : "#cbd5e1",
				...styles.clipStar
			}}
			onClick={rate}
			data-star-rating={index + 1}
		/>
	))

const styles = {
	clipStar: {
		clipPath:
			'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
		height: 25,
		width: 25,
    marginLeft: 10,
	},
}

import Image from 'next/image'
import type { MovieItem } from '@/types/movie'

export default ({ poster_path, title, release_date }: MovieItem) => {
	return (
		<div className="w-full border-black">
			<div className="relative w-[80px] h-[80px]">
			<Image
				src={'https://image.tmdb.org/t/p/original' + poster_path}
				layout='fill'
				objectFit='contain'
				objectPosition='center'
				alt={title + '- Poster'}
			/>
			</div>
			<div className="text-xs mt-2 text-emerald-400 text-center">
				{title}
			</div>
			<div className="text-xs mt-1 text-fuchsia-400 font-medium text-center">
				({release_date?.split('-')[0]})
			</div>
		</div>
	)
}

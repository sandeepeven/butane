import React from 'react'
import { MovieItem } from '@/types/movie'
import { Loader } from '.'
import { useRouter } from 'next/navigation'

export default ({
	id,
	data,
	title,
	loading,
	onSearch,
}: {
	data: Array<MovieItem> | []
	id: string
	title: string
	loading: boolean
	onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
	const router = useRouter();
	return (
		<div className="mx-4 mt-6">
			<h2 className="text-2xl">{title}</h2>
			<input
				className="border my-6 p-2 text-fuchsia-400"
				type="text"
				placeholder="search..."
				onChange={onSearch}
			/>
			<ul className="mt-4 max-h-screen overflow-scroll">
				{loading && <Loader />}
				{!loading &&
					data.map((item) => (
						<span key={item.id} className="flex items-center">
							<input
								type="checkbox"
								name="selected-movie"
								id={`${id}-selected-movie`}
								className="h-6 w-6 my-2 accent-blue-400"
								data-movie-id={item.id}
							/>
							<li
								onClick={() => router.push(`/detail/${item.id}?list=${id}`)}
								title={item.overview}
								className="text-lg ml-4"
							>
								{item.title}
								{` (${item.release_date.slice(0, 4)})`}
							</li>
						</span>
					))}
			</ul>
		</div>
	)
}

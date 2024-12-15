export type MovieItem = {
	adult: boolean
	backdrop_path: string
	genre_ids: number[]
	id: number
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string
	release_date: string
	title: string
	video: boolean
	vote_average: number
	vote_count: number
}

export type CastItem = {
	adult: boolean
	gender: number
	id: number
	known_for_department: string
	name: string
	original_name: string
	popularity: number
	profile_path: string
	cast_id: number
	character: string
	credit_id: string
	order: number
}

export type DetailItem = {
	popularity: number
	title: string
	star: null | string
	original_language: string
	cast: Array<CastItem>
	poster_path: string
	genre_ids: Array<number>
	overview: string
	release_date: string
	rate: (e: React.MouseEvent<HTMLDivElement>) => void
	similar:  [] | MovieItem[]
}
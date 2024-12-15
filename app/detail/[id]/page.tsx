'use client'
import * as React from 'react'
import { getMovieById, updateStarRating } from '@/app/lib/firebase/firestore'
import { ReadonlyURLSearchParams, useParams, useRouter, useSearchParams } from 'next/navigation'
import { MovieItem, DetailItem } from '@/types/movie'
import Image from 'next/image'
import { MovieDetail } from '@/components'

const UID = typeof window !== "undefined" ? window.localStorage.getItem('uid') || '' : ''

const defaultState = {
	genre_ids: [],
	id: 0,
	original_language: '',
	overview: '',
	popularity: 0,
	poster_path: 'null',
	release_date: '',
	title: '',
	cast: [],
	crew: [],
	star: null,
	rate: (e: React.MouseEvent<HTMLDivElement>) => undefined,
	similar: [],
}

export default function Page() {
	const [data, setData] = React.useState<DetailItem>(defaultState)
	const [similar, setSimilar] = React.useState<MovieItem[] | []>([])
	const [loading, setLoading] = React.useState(true)
	const { id }: {id: string } = useParams()
	const queries: { get: (name: string) => "seen" | "unseen" } = useSearchParams() as { get: (name: string) => "seen" | "unseen" }
	const router = useRouter()

	const getMovieDetail = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const response = (await getMovieById(
					UID,
					id,
					queries.get('list')
				)) as DetailItem
				setData(response)
				resolve(true)
			} catch (error) {
				console.log('getMovieDetail', error)
			}
		})
	}

	const getRecommendation = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await fetch(`/api/movie/similar/${id}`)
				const response = await result.json()
				setSimilar(response.data.results)
				resolve(true)
			} catch (error) {
				console.log('getRecommendation', error)
			}
		})
	}

	const getDetail = () => {
		Promise.all([
			getMovieDetail(),
			getRecommendation()
		]).then((result) => {
			setLoading(false)
		}).catch((err) => {
			console.log('getDetail', err)
		})
	}

	React.useEffect(() => {
		getDetail()
	}, [])

	const rateCallback = async (e: React.MouseEvent<HTMLDivElement>) => {
		const star = e.currentTarget.getAttribute('data-star-rating')
		setLoading(true)
		if (star) {
			await updateStarRating(UID, id, 'unseen', star)
		}
		setLoading(false)
	}

	if (loading) {
		return (
			<div className="flex flex-row min-h-screen justify-center items-center">
				<div className="loader"></div>
			</div>
		)
	}

	return (
		<>
			<button onClick={() => router.back()} className="p-2 ml-8 mt-4 hover:bg-black hover:text-white border">{'<- Back'}</button>
			<h1 className="text-3xl m-8">
				{data.title}({data.release_date?.split('-')[0]})
			</h1>
			<Image
				src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
				alt="poster-image"
				width={200}
				height={300}
				className="m-8"
			/>
			<div className="p-8">
				<MovieDetail
					original_language={data.original_language}
					popularity={data.popularity}
					genre_ids={data.genre_ids}
					cast={data.cast}
					release_date={data.release_date}
					overview={data.overview}
					poster_path={data.poster_path}
					title={data.title}
					star={data.star}
					rate={rateCallback}
					similar={similar}
				/>
			</div>
		</>
	)
}

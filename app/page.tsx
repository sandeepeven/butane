'use client'
import { useState, useEffect } from 'react'
import { Fxn } from '@/utils'
import type { MovieItem } from '@/types/movie'
import { onAuthStateChanged } from 'firebase/auth'
import type { firebaseUser as FBUser } from './lib/firebase/auth'
import { auth } from './lib/firebase/clientApp'
import {
	getMovies,
	addMovie,
	moveMovie,
	deleteMovie,
	searchDBMovie,
} from './lib/firebase/firestore'
import { useRouter } from 'next/navigation'
import { SearchList, MovieList } from '../components'
import ListAction from '@/components/listAction'
import { Toaster, toast } from 'sonner'

const UID = typeof window !== "undefined" ? window.localStorage.getItem('uid') || '' : ''

export default function Page() {
	const [data, setData] = useState([])
	const [searching, setSearching] = useState(false)
	const [unseenLoad, setUnseenLoad] = useState(false)
	const [seenLoad, setSeenLoad] = useState(false)
	const [movingMovie, setMovingMovie] = useState(false)
	const [user, setUser] = useState<FBUser | null>(null)
	const [pageLoading, setPageLoading] = useState(true)
	const [unseen, setUnseen] = useState<[] | Array<MovieItem>>([])
	const [seen, setSeen] = useState<[] | Array<MovieItem>>([])
	const router = useRouter()

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (!currentUser) {
				router.push('/login')
			} else {
				setPageLoading(false)
				setUser(currentUser)
			}
		})

		// Clean up the listener on component unmount
		return () => unsubscribe()
	}, [])

	const searchMovie = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearching(true)
		const { value } = event.target
		const searchList = document.getElementById('search-list-id')
		if (value) {
			const response = await fetch('/api/movie?movie=' + value)
			const result = await response.json()
			setData(result.data.results)
			searchList?.classList.remove('hidden')
		} else {
			searchList?.classList.add('hidden')
		}
		setSearching(false)
	}

	const searchMovieDebounce = Fxn.debounce(searchMovie, 300)

	const captureMovie = async (e: React.MouseEvent<HTMLDivElement>) => {
		const movie = e.currentTarget.getAttribute('data-movie')
		if (movie) {
			try {
				const ID = JSON.parse(movie).id
				const response = await fetch(`/api/movie/credit/${ID}`)
				const credits = await response.json()
				let data = JSON.parse(movie)
				if (credits.status) {
					data['cast'] = credits.data.cast
					data['star'] = 0
				}
				await addMovie(UID, data)
				const searchList = document.getElementById('search-list-id')
				searchList?.classList.add('hidden')
				const ele = document.getElementById(
					'search-movie-id'
				) as HTMLInputElement
				ele.value = ''
				getUnseenMovies()
			} catch (error) {
				console.log('captureMovie', error)
			}
		}
	}

	useEffect(() => {
		if (!unseen.length) getUnseenMovies()
		if (!seen.length) getSeenMovies()
	}, [])

	const getSeenMovies = async () => {
		setSeenLoad(true)
		const response: any = await getMovies(UID, 'seen')
		setSeenLoad(false)
		setSeen(response)
	}

	const getUnseenMovies = async () => {
		setUnseenLoad(true)
		const response: any = await getMovies(UID, 'unseen')
		setUnseenLoad(false)
		setUnseen(response)
	}

	const moveToWatched = async (e: React.MouseEvent<HTMLButtonElement>) => {
		// get all checked from the unwatched list
		const q = document.querySelectorAll('#unseen-selected-movie:checked')
		let ids: any = []
		q.forEach((t) => ids.push(t.getAttribute('data-movie-id')))
		if (ids.length) {
			setMovingMovie(true)
			// const response: any = await Movie.watchedMovie(ids)
			const response = await moveMovie(UID, 'unseen', 'seen', ids)
			toast('Movie(s) moved to WATCHED')
			setMovingMovie(false)
			getSeenMovies()
			getUnseenMovies()
		}
	}

	const moveToUnwatched = async (e: React.MouseEvent<HTMLButtonElement>) => {
		// get all checked from the unwatched list
		const q = document.querySelectorAll('#seen-selected-movie:checked')
		let ids: any = []
		q.forEach((t) => ids.push(t.getAttribute('data-movie-id')))
		if (ids.length) {
			setMovingMovie(true)
			// const response: any = await Movie.unwatchMovie(ids)
			await moveMovie(UID, 'seen', 'unseen', ids)
			toast('Movie(s) moved to NOT SEEN')
			setMovingMovie(false)
			getUnseenMovies()
			getSeenMovies()
		}
	}

	const logoutUser = () => {
		localStorage.removeItem('accessToken')
		router.push('/login')
	}

	const deleteSelected = async (e: React.MouseEvent<HTMLButtonElement>) => {
		const q = document.querySelectorAll('#seen-selected-movie:checked')
		let ids: any = []
		q.forEach((t) => ids.push(t.getAttribute('data-movie-id')))
		if (ids.length) {
			setSeenLoad(true)
			// const response: any = await Movie.deleteSeenMovie(ids)
			await deleteMovie(UID, ids, 'seen')
			toast('Movie(s) deleted')
			setSeenLoad(false)
			getSeenMovies()
		}
	}

	const onSearchSeen = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === "") {
			getSeenMovies()
			return
		}
		const result = await searchDBMovie(UID, e.target.value, 'seen') as MovieItem[]
		setSeen(result)
	}

	const onSearchUnseen = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === "") {
			getUnseenMovies()
			return
		}
		const result = await searchDBMovie(UID, e.target.value, 'unseen') as MovieItem[]
		setUnseen(result)
	}

	const onSearchSeenDebounce = Fxn.debounce(onSearchSeen, 400)
	const onSearchUnseenDebounce = Fxn.debounce(onSearchUnseen, 400)

	if (pageLoading) {
		return (
			<div className="flex flex-row min-h-screen justify-center items-center">
				<div className="loader"></div></div>
		)
	}

	return (
		<div className="sm:mt-24 md:mt-0">
			<Toaster position='top-right' />
			<div className="text-right m-4">
				Hello {user?.email}
				<span
					onClick={logoutUser}
					className="underline text-blue-600 ml-3 cursor-pointer"
				>
					Logout
				</span>
			</div>
			<div className="flex justify-center py-2">
				<input
					autoComplete="off"
					type="text"
					name="search-movie"
					id="search-movie-id"
					className="w-full mx-6 p-2 border border-black text-lg text-black outline-none rounded-md"
					placeholder="Search movie..."
					onChange={searchMovieDebounce}
				/>
				<SearchList
					loading={searching}
					data={data}
					captureMovie={captureMovie}
				/>
			</div>
			<div className="flex sm:flex-col md:flex-row justify-between">
				<MovieList
					loading={unseenLoad}
					id="unseen"
					data={unseen}
					onSearch={onSearchUnseenDebounce}
					title="Not Watched"
				/>
				<ListAction
					moveToUnwatched={moveToUnwatched}
					moveToWatched={moveToWatched}
					deleteSelected={deleteSelected}
					loading={movingMovie || unseenLoad || seenLoad}
				/>
				<MovieList
					loading={seenLoad}
					data={seen}
					onSearch={onSearchSeenDebounce}
					id="seen"
					title="Seen"
				/>
			</div>
		</div>
	)
}

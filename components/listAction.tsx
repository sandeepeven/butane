type props = {
	loading: boolean
	moveToWatched: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
	moveToUnwatched: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
	deleteSelected: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
}

export default ({ loading, moveToWatched, moveToUnwatched, deleteSelected }: props) => (
	<div className="sm:fixed sm:top-0 sm:flex sm:flex-row md:relative md:flex-col justify-evenly md:mt-28 bg-white p-1">
		<button
			disabled={loading}
			className="sm:mx-2 md:mx-16 rounded border border-black hover:bg-red-500 hover:text-white p-2 my-3"
			onClick={deleteSelected}
		>delete seen {'🗑️'}</button>
		<button
			disabled={loading}
			className="sm:mx-2 md:mx-16 rounded border border-black hover:bg-green-400 p-2 my-3"
			onClick={moveToWatched}
		>{"seen ->"}</button>
		<button
			disabled={loading}
			className="sm:mx-2 md:mx-16 rounded border border-black hover:bg-yellow-300 p-2 my-3"
			onClick={moveToUnwatched}
		>
			{"<- put back"}
		</button>
	</div>
)

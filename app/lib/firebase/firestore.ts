import {
	query,
	collection,
	getDocs,
	limit,
	where,
	setDoc,
	deleteDoc,
  documentId,
  doc,
	orderBy,
	startAt,
	endAt,
	DocumentData,
	getDoc,
	updateDoc
} from 'firebase/firestore'
import { db } from './clientApp'

export async function getMovies(uid: string, collectionName: 'seen' | 'unseen') {
	const ref = collection(db, `users/${uid}/${collectionName}`)
	const q = query(ref, orderBy("title"), limit(30))
	const querySnapshot = await getDocs(q)
	const result = querySnapshot.docs.map((doc) => (doc.data()))
	return result
}

export async function addMovie(
	uid: string,
	data: any,
	collectionName = 'unseen'
) {
	const ref = doc(db, `users/${uid}/${collectionName}/${data.id}`)
	await setDoc(ref, { titleLowercase: (data.title).toLowerCase(), ...data })
}

export async function moveMovie(
	uid: string,
	sourceCollection: string,
	destinationCollection: string,
	ids: Array<number>
) {
	if (!ids.length) return
	const sourceRef = collection(db, `users/${uid}/${sourceCollection}`)
	const q = query(sourceRef, where(documentId(), "in", ids))
	const querySnapshot = await getDocs(q)
	for (const docSnapshot of querySnapshot.docs) {
		const docData = docSnapshot.data()
		// Copy the document to the destination
    const docRef = doc(db, `users/${uid}/${destinationCollection}/${docData.id}`)
		await setDoc(docRef, docData)
		// Delete the document from the source
		await deleteDoc(docSnapshot.ref)
	}
}

export async function deleteMovie(
	uid: string,
	ids: Array<number>,
	collectionName = 'seen'
) {
	const ref = collection(db, `users/${uid}/${collectionName}`)
	const q = query(ref, where(documentId(), "in", ids))
  const querySnapshot = await getDocs(q)
  for (const docSnapshot of querySnapshot.docs) {
    await deleteDoc(docSnapshot.ref)
  }
}


export async function searchDBMovie(
	uid: string,
	search: string,
	collectionName: 'seen' | 'unseen'
): Promise<DocumentData[]> {
	const ref = collection(db, `users/${uid}/${collectionName}`)
	// const q = query(ref, where(search, "in", document))
	const toSearch = search.toLowerCase()
	const q = query(ref, orderBy("titleLowercase"), startAt(toSearch), endAt(toSearch + "\uf8ff"))
  const querySnapshot = await getDocs(q)
  const result: DocumentData[] = querySnapshot.docs.map((doc) => (doc.data()))
	return result
}


export async function getMovieById(
	uid: string,
	id: string,
	collectionName: 'seen' | 'unseen'
): Promise<DocumentData | null> {
	const ref = doc(db, `users/${uid}/${collectionName}/${id}`)
	const document = await getDoc(ref)
	if (document.exists()) {
		return document.data()
	}
	return null
}

export async function updateStarRating(
	uid: string,
	id: string,
	collectionName: 'seen' | 'unseen',
	star: string
): Promise<void> {
	const ref = doc(db, `users/${uid}/${collectionName}/${id}`)
	await updateDoc(ref, { star })
}





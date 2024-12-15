import { Movie } from '@/service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<Response> {
	const movie = request.nextUrl.searchParams.get("movie")
	return new Promise(async (resolve, reject) => {
		if (movie) {
			const data = await Movie.searchMovie(movie)
			resolve(
				Response.json({
					status: true,
					data,
				})
			)
		} else {
			resolve(Response.json({
				status: true,
				data: [],
			}))
		}
	})
}

// export async function POST(request: Request) {
// 	return new Promise(async (resolve, reject) => {
// 		const headers = request.headers
// 		const token = headers.get('authorization')?.split(' ')[1]
// 		try {
// 			const userCredential = await validateAuth(token)
// 			if (userCredential) {
// 				const { movie } = await request.json()
// 				const userRef = db.collection('users').doc(userCredential.uid)
// 				await userRef.set({
// 					createdAt: FieldValue.serverTimestamp(),
// 					userId: userCredential.uid,
// 					updatedAt: FieldValue.serverTimestamp(),
// 				})
// 				const unseenRef = userRef.collection('unseen').doc(String(movie.id))
// 				const response = await unseenRef.set(movie)
// 				if (response) {
// 					resolve(
// 						Response.json({
// 							status: true,
// 							data: null,
// 							message: 'success',
// 						})
// 					)
// 				} else {
// 					Response.json({
// 						status: true,
// 						data: null,
// 						message: 'save failed',
// 					})
// 				}
// 			}
// 		} catch (error: any) {
// 			console.log('error:59', error)
// 			if (error.code === 'auth/id-token-expired') {
// 				resolve(Response.json({ status: false, message: 'login' }))
// 			} else {
// 				reject('error')
// 			}
// 		}
// 	})
// }

// export async function DELETE(request: Request) {
// 	return new Promise(async (resolve, reject) => {
// 		const headers = request.headers
// 		const token = headers.get('authorization')?.split(' ')[1]
// 		try {
// 			const userCredential = await validateAuth(token)
// 			if (userCredential) {
// 				const { movieIds } = await request.json()

// 				const batch = db.batch()

// 				const userRef = db.collection('users').doc(userCredential.uid)
// 				await userRef.update({
// 					updatedAt: FieldValue.serverTimestamp(),
// 				})

// 				const seenRef = userRef.collection('seen')

// 				movieIds.forEach((docId: any) => {
// 					const docRef = seenRef.doc(docId);
// 					batch.delete(docRef); // Queue the delete operation
// 				});

// 				// Commit the batch
// 				await batch.commit()

// 				console.log(
// 					'delete movies successfully'
// 				)

// 				resolve(
// 					Response.json({
// 						status: true,
// 						data: null,
// 						message: 'success',
// 					})
// 				)
// 			}
// 		} catch (error) {
// 			console.log('error', error)
// 			Response.json({
// 				status: true,
// 				data: null,
// 				message: 'failed',
// 			})
// 		}
// 	})
// }

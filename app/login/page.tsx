'use client'
import './style.css'
import Link from 'next/link'
import { logIn } from '../lib/firebase/auth'
import type { firebaseUser } from '../lib/firebase/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from "firebase/auth"

export default function Login() {
	const router = useRouter()
	const [err, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errMessage, setErrMessage] = useState(false)

	const validate = (field: FormData) =>
		field.get('email') && field.get('email')

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		const data = new FormData(e.currentTarget)
		if (validate(data)) {
			try {
				const email = data.get('email') as string
				const pass = data.get('password') as string
				const user: firebaseUser = await logIn(email, pass)
				if (typeof window !== "undefined") {
					localStorage.setItem("uid", user.uid)
				}
				setLoading(false)
				const form = document.getElementById('form') as HTMLFormElement
				form.reset()
				router.push('/')
			} catch (error: any) {
				console.log('login form', error)
				setError(true)
				setLoading(false)
			}
		} else {
			alert('Invalid form data. Check email and password again.')
		}
	}

	return (
		<div>
			<h2 className="text-4xl text-center text-green-500 my-5 animate-pulse">
				Project Butane
			</h2>
			<div className="flex items-center justify-center">
				<form id="form" onSubmit={onSubmit}>
					<label htmlFor="email">Email Address</label>
					<br />
					<input
						type="text"
						id="email"
						name="email"
						placeholder="Enter email"
					/>
					<br />
					<label htmlFor="password">Password</label>
					<br />
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Enter password"
					/>{' '}
					<br />
					<button disabled={loading} type="submit">Submit</button>
					<br />
					<Link href="/sign-up">Sign Up</Link>
				</form>
			</div>
		</div>
	)
}

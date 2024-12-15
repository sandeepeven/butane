'use client'
import React from 'react'
import './style.css'
import Link from 'next/link'
import { Rgx } from '@/utils'
import { useRouter } from 'next/navigation'
import { signUp } from '../lib/firebase/auth'

export default function SignUp() {
	const router = useRouter()
	const [error, setError] = React.useState(false)
	const [loading, setLoading] = React.useState(false)

	const validate = (field: FormData) => {
		if (field.get('password') !== field.get('confirmpassword')) {
			return false
		} else if (!Rgx.email.test(field.get('email') as string)) {
			return false
		}
		return true
	}

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		try {
			const form = document.getElementById('form') as HTMLFormElement
			const data = new FormData(e.currentTarget)
			if (validate(data)) {
				await signUp(
					data.get('email') as string,
					data.get('password') as string
				)
				form.reset()
				setLoading(false)
				router.push('/login')
			}
		} catch (error) {
			console.log('sign up', error)
			alert('Invalid form data. Check email and password again.')
		}
		setLoading(false)
	}
	return (
		<div>
			<h2 className="text-4xl text-center text-green-500 my-10 animate-pulse">
				Project Butane
			</h2>
			<div className="flex items-center justify-center">
				<form id="form" onSubmit={onSubmit}>
					<label htmlFor="email">Email Address</label>
					<br />
					<input
						type="text"
						name="email"
						placeholder="Email"
						autoComplete="off"
						required
					/>
					<br />
					<label htmlFor="password">Password</label>
					<br />
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						autoComplete="off"
						required
					/>
					<br />
					<label htmlFor="confirm-password">Confirm password</label>
					<br />
					<input
						type="text"
						name="confirm-password"
						id="confirm-password"
						placeholder="Confirm password"
						autoComplete="off"
						required
					/>
					<br />
					<button type="submit">Sign up</button>
					<br />
					<Link href="/login">Login</Link>
				</form>
			</div>
		</div>
	)
}

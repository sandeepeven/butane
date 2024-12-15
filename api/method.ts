enum METHOD {
	get = 'GET',
	post = 'POST',
	delete = 'DELETE'
}

const defaultHeader = {
	accept: 'application/json',
	'Content-Type': 'application/json',
}

const GET = (
	url: string,
	query = {},
	headers = {},
	callback: (data: any) => void
) => {
	const options = {
		method: METHOD.get,
		headers: Object.assign(defaultHeader, headers),
	}

	try {
		if (Object.keys(query).length) {
			url += '?' + new URLSearchParams(query).toString()
		}
		fetch(url, options)
			.then((rawResponse) => rawResponse.json())
			.then((response) => callback(response))
			.catch((error) => {})
	} catch (error) {}
}

const POST = (
	url: string,
	body = {},
	headers = {},
	callback: (data: any) => void
) => {
	const options = {
		method: METHOD.post,
		headers: Object.assign(defaultHeader, headers),
		body: JSON.stringify(body),
	}

	try {
		fetch(url, options)
			.then((rawResponse) => rawResponse.json())
			.then((response) => callback(response))
			.catch((error) => {})
	} catch (error) {}
}


const DELETE = (
	url: string,
	body = {},
	headers = {},
	callback: (data: any) => void
) => {
	const options = {
		method: METHOD.delete,
		headers: Object.assign(defaultHeader, headers),
		body: JSON.stringify(body),
	}

	try {
		fetch(url, options)
			.then((rawResponse) => rawResponse.json())
			.then((response) => callback(response))
			.catch((error) => {})
	} catch (error) {}
}

export default {
	GET,
	POST,
	DELETE
}

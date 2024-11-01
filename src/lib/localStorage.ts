import { z } from 'zod'

export type Link = {
	label: string
	isSolo: boolean
	url: string
	icon: string
}

export const linkSchema = z.object({
	label: z.string().min(1),
	isSolo: z.boolean(),
	url: z.string().url(),
	icon: z.string()
})

export function createLink(input: Link, callback?: () => void): Link[] {
	const data = linkSchema.parse(input)

	let links = JSON.parse(localStorage.getItem('links') ?? '[]')
	links.push(data)
	localStorage.setItem('links', JSON.stringify(links))

	callback?.()

	return links
}

export function getAllLinks(): Link[] {
	return JSON.parse(localStorage.getItem('links') ?? '[]')
}

export function deleteLink(url: string, callback?: () => void): Link[] {
	const links = JSON.parse(localStorage.getItem('links') ?? '[]')
	const newLinks = links.filter((link: Link) => link.url !== url)
	localStorage.setItem('links', JSON.stringify(newLinks))

	callback?.()

	return newLinks
}

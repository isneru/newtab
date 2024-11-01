import { deleteLink, Link } from '@lib/localStorage'
import * as Icons from '@components/selected-icons'
import clsx from 'clsx'

type Props = {
	link: Link
	shiftHeld: boolean
	setLinks: React.Dispatch<React.SetStateAction<Link[]>>
}

export const LinkButton = ({ link, shiftHeld, setLinks }: Props) => {
	return shiftHeld ? (
		<button
			draggable={false}
			title={`delete ${link.label}?`}
			className={clsx(
				'group hover:bg-rose-950/25 hover:text-rose-600',
				link.isSolo && 'solo w-96'
			)}
			key={link.url}
			onClick={() => {
				const newLinks = deleteLink(link.url)
				setLinks(newLinks)
			}}>
			<Icons.TrashSimple
				className='hidden group-hover:block group-hover:fill-rose-600'
				weight='bold'
			/>
			{Object.entries(Icons).map(
				([name, IconComponent]) =>
					link.icon === name && (
						<IconComponent
							className='group-hover:hidden'
							key={name}
							weight='bold'
						/>
					)
			)}
			{link.isSolo && <span>{link.label}</span>}
		</button>
	) : (
		<a
			title={link.label}
			className={clsx(link.isSolo && 'solo')}
			key={link.url}
			href={link.url}>
			{Object.entries(Icons).map(
				([name, IconComponent]) =>
					link.icon === name && <IconComponent key={name} weight='bold' />
			)}
			{link.isSolo && <span>{link.label}</span>}
		</a>
	)
}

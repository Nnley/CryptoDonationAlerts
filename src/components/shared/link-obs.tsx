'use client'

import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'
import React from 'react'

interface Props {
	link: string
	className?: string
}

export const LinkObs = ({ link, className }: Props) => {
	const [showCheck, setShowCheck] = React.useState<boolean>(false)

	const handleCopy = async () => {
		try {
			navigator.clipboard.writeText(link)
			setShowCheck(true)
			setTimeout(() => {
				setShowCheck(false)
				setTimeout(() => {}, 400)
			}, 3000)
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<div className={cn('flex flex-col items-center', className)}>
			<p className='text-[#868686] mb-1'>Ссылка для OBS</p>
			<div className='flex items-center gap-2'>
				<a className='text-[#4888FF] max-w-96 truncate' href={link}>
					{link}
				</a>
				<div className='relative'>
					<Copy
						size={20}
						color='#959595'
						className={cn(
							'cursor-pointer transition-all duration-300',
							showCheck ? 'scale-0 opacity-0' : 'scale-100 opacity-100 hover:scale-125'
						)}
						onClick={handleCopy}
					/>
					<Check
						size={24}
						color='#22C232'
						className={cn(
							'absolute top-[-1px] left-[-2px] transition-all duration-300',
							showCheck ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
						)}
					/>
				</div>
			</div>
		</div>
	)
}

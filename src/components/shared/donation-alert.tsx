import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface Props {
	imageUrl: string
	firstTextBlock: string
	secondTextBlock: string
	duration: number
	className?: string
}

export const DonationAlert = ({ imageUrl, firstTextBlock, secondTextBlock, duration, className }: Props) => {
	const [showAlert, setShowAlert] = useState<boolean>(false)

	useEffect(() => {
		setShowAlert(true)

		const timer = setTimeout(() => {
			setShowAlert(false)
		}, duration)
		return () => clearTimeout(timer)
	}, [firstTextBlock, secondTextBlock])

	return (
		<div
			className={cn(
				className,
				'flex flex-col justify-center items-center gap-4 opacity-0 transition-opacity duration-500',
				showAlert ? 'opacity-100' : 'opacity-0'
			)}
		>
			<img src={imageUrl} alt='img' width={240} height={240} />
			<p className='m-auto text-white font-semibold'>{firstTextBlock}</p>
			<p className='m-auto text-white font-semibold'>{secondTextBlock}</p>
		</div>
	)
}

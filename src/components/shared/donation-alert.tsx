import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
	imageUrl: string
	firstTextBlock: string
	secondTextBlock: string
	duration: number
	audioName?: string
	className?: string
}

export const DonationAlert = ({ imageUrl, firstTextBlock, secondTextBlock, duration, audioName, className }: Props) => {
	const [showAlert, setShowAlert] = React.useState<boolean>(false)
	const audioRef = React.useRef<HTMLAudioElement>(null)

	React.useEffect(() => {
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
			<audio ref={audioRef} controls src={`http://localhost:3000/audio/${audioName}`} autoPlay className='hidden' />
		</div>
	)
}

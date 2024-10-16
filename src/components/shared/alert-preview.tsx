import { IAlertSettings, IDonation } from '@/constants/alert.types'
import { cn, formatTextBlockString } from '@/lib/utils'
import { useState } from 'react'

interface Props extends Omit<IAlertSettings, 'duration' | 'minAmount'> {
	className?: string
}

export const AlertPreview = ({ imageUrl, firstTextBlock, secondTextBlock, className }: Props) => {
	const [donationTemplate] = useState<IDonation>({
		transactionId: '0',
		walletAddress: 'UQDD8dqOzaj4zUK6ziJOo_G2lx6qf1TEktTRkFJ7T1c_fKne',
		amount: '5000',
		tokenName: 'HMSTR',
	})

	return (
		<div
			className={cn(
				'flex flex-col justify-center items-center gap-4 w-[600px] h-[350px] relative bg-black/15',
				className
			)}
		>
			<img src={imageUrl} alt='img' width={140} height={140} className='z-10' />
			<div className='flex flex-col items-center gap-1 z-10'>
				<p className='text-white font-semibold text-sm'>{formatTextBlockString(firstTextBlock, donationTemplate)}</p>
				<p className='text-white font-semibold text-sm'>{formatTextBlockString(secondTextBlock, donationTemplate)}</p>
			</div>
			<img src='/alert-preview.jpg' alt='Alert preview' className='absolute w-full h-full object-cover rounded-lg' />
		</div>
	)
}

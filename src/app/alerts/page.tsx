'use client'

import { DonationAlert } from '@/components/shared/donation-alert'
import { IDonation, INetworkData } from '@/constants/alert.types'
import { useEvents } from '@/hooks/useEvents'
import { formatTextBlockString } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import handleEventProcessing from './handle-event-processing'

export default function Alerts() {
	const searchParams = useSearchParams()

	if (!searchParams.get('wallet')) {
		return (
			<div className='flex justify-center items-center h-screen font-extrabold text-2xl bg-white'>
				Нет адреса вашего кошелька. Проверьте ссылку.
			</div>
		)
	}

	const [networksData, setNetworksData] = React.useState<INetworkData>({
		TON: {
			address: searchParams.get('wallet')!,
			lastTransactionId: '',
		},
	})

	const [imageUrl, setImageUrl] = React.useState<string>(
		searchParams.get('imageUrl') || 'https://i.gifer.com/origin/e0/e02ce86bcfd6d1d6c2f775afb3ec8c01_w200.gif'
	)
	const [firstTextBlock, setFirstTextBlock] = React.useState<string>(
		searchParams.get('firstTextBlock') || 'New donate from {walletAddress}!'
	)
	const [secondTextBlock, setSecondTextBlock] = React.useState<string>(
		searchParams.get('secondTextBlock') || 'Donated {amount} {networkType}'
	)
	const [alertDuration, setAlertDuration] = React.useState<number>(Number(searchParams.get('duration')) || 5000)
	const [minAmount, setMinAmount] = React.useState<number>(Number(searchParams.get('minAmount')) || 1)

	const [queue, setQueue] = React.useState<IDonation[]>([])
	const { events, isLoading } = useEvents(networksData.TON!.address)

	React.useEffect(() => {
		if (isLoading || !events) {
			return
		}

		handleEventProcessing(
			events.filter(event => !event.in_progress),
			networksData,
			setNetworksData,
			setQueue
		)
	}, [events, isLoading])

	React.useEffect(() => {
		if (queue.length > 0) {
			const timer = setTimeout(() => {
				setQueue(prev => prev.slice(1))
			}, alertDuration + 1000)

			return () => clearTimeout(timer)
		}
	}, [queue])

	return (
		<div className='h-screen flex items-center justify-center'>
			{queue.length > 0 && (
				<DonationAlert
					key={queue[0].transactionId}
					firstTextBlock={formatTextBlockString(firstTextBlock, queue[0])}
					secondTextBlock={formatTextBlockString(secondTextBlock, queue[0])}
					imageUrl={imageUrl}
					duration={alertDuration}
				/>
			)}
		</div>
	)
}

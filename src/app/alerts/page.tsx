'use client'

import { DonationAlert } from '@/components/shared/donation-alert'
import { IAlertSettings, IDonation, INetworkData } from '@/constants/alert.types'
import { Event } from '@/constants/event.types'
import { useEvents } from '@/hooks/useEvents'
import { formatTextBlockString } from '@/lib/utils'
import React from 'react'

export default function Alerts() {
	const [networksData, setNetworksData] = React.useState<INetworkData>({
		TON: {
			address: 'UQDD8dqOzaj4zUK6ziJOo_G2lx6qf1TEktTRkFJ7T1c_fKne',
			lastTransactionId: '',
		},
	})

	if (!Boolean(networksData)) {
		return <div style={{ textAlign: 'center' }}>Нет данных о кошельках</div>
	}

	const [alertSettings, setAlertSettings] = React.useState<IAlertSettings>({
		imageUrl: 'https://i.gifer.com/origin/e0/e02ce86bcfd6d1d6c2f775afb3ec8c01_w200.gif',
		duration: 5000,
		minAmount: 0,
		firstTextBlock: 'New donate from {walletAddress}!',
		secondTextBlock: 'Donated {amount} {networkType}',
	})

	const [donations, setDonations] = React.useState<IDonation[]>([])

	const { events, isLoading } = useEvents(networksData.TON!.address)

	React.useEffect(() => {
		if (isLoading) {
			return
		}

		if (!Boolean(events.some((event: Event) => event.event_id === networksData.TON!.lastTransactionId))) {
			setNetworksData({
				...networksData,
				TON: { address: networksData.TON!.address, lastTransactionId: events[0]?.event_id, isEmptyWallet: false },
			})

			return
		}

		if (!events || events.length === 0) {
			setNetworksData({
				...networksData,
				TON: { ...networksData.TON!, isEmptyWallet: true },
			})

			return
		}

		if (networksData.TON?.isEmptyWallet) {
			setNetworksData({
				...networksData,
				TON: { address: networksData.TON!.address, lastTransactionId: events[0]?.event_id, isEmptyWallet: false },
			})

			if (!donations.some((donate: IDonation) => donate.transactionId === events[0]?.event_id)) {
				setDonations(prevDonates => [
					...prevDonates,
					...events.map((event: Event) => {
						const action = event.actions[0]
						if (action.TonTransfer) {
							return {
								transactionId: event.event_id,
								walletAddress: action.TonTransfer?.sender.address,
								tokenName: 'TON',
								amount: action.TonTransfer?.amount?.toString() || '0',
							}
						} else {
							return {
								transactionId: event.event_id,
								walletAddress: action.JettonTransfer?.sender.address,
								tokenName: 'TON',
								amount: action.JettonTransfer?.amount?.toString() || '0',
							}
						}
					}),
				])
			}

			return
		}

		if (Boolean(networksData.TON?.lastTransactionId) && events[0]?.event_id !== networksData.TON?.lastTransactionId) {
			const lastTransactionIdIndex = events.findIndex(
				(event: Event) => event.event_id === networksData.TON!.lastTransactionId
			)

			if (
				lastTransactionIdIndex &&
				!donations.some((donate: IDonation) => donate.transactionId === events[0]?.event_id)
			) {
				setDonations(prevDonates => [
					...prevDonates,
					...events.slice(0, lastTransactionIdIndex).map((event: Event) => {
						const action = event.actions[0]
						if (action.TonTransfer) {
							return {
								transactionId: event.event_id,
								walletAddress: action.TonTransfer?.sender.address,
								tokenName: 'TON',
								amount: action.TonTransfer?.amount?.toString() || '0',
							}
						} else {
							return {
								transactionId: event.event_id,
								walletAddress: action.JettonTransfer?.sender.address,
								tokenName: 'TON',
								amount: action.JettonTransfer?.amount?.toString() || '0',
							}
						}
					}),
				])

				setNetworksData({
					...networksData,
					TON: { ...networksData.TON!, lastTransactionId: events[0]?.event_id, isEmptyWallet: false },
				})
			}
		} else {
			setNetworksData({
				...networksData,
				TON: { address: networksData.TON!.address, lastTransactionId: events[0]?.event_id },
			})
		}
	}, [events])

	React.useEffect(() => {
		if (donations.length > 0) {
			const timer = setTimeout(() => {
				setDonations(prev => prev.slice(1))
			}, alertSettings.duration + 1000)

			return () => clearTimeout(timer)
		}
	}, [donations])
	console.log(donations)

	return (
		<div className='h-screen flex items-center justify-center'>
			{donations.length > 0 && (
				<DonationAlert
					key={donations[0].transactionId}
					firstTextBlock={formatTextBlockString(alertSettings.firstTextBlock, donations[0])}
					secondTextBlock={formatTextBlockString(alertSettings.secondTextBlock, donations[0])}
					imageUrl={alertSettings.imageUrl}
					duration={alertSettings.duration}
				/>
			)}
		</div>
	)
}

import { IDonation, INetworkData } from '@/constants/alert.types'
import { Event } from '@/constants/event.types'
import { Address } from '@ton/core'

const handleEventProcessing = (
	events: Event[],
	isLoading: boolean,
	networksData: INetworkData,
	setNetworksData: React.Dispatch<React.SetStateAction<INetworkData>>,
	setQueue: React.Dispatch<React.SetStateAction<IDonation[]>>
) => {
	if (isLoading || !events) {
		return
	}

	if (events.length === 0) {
		return setNetworksData({
			...networksData,
			TON: {
				...networksData.TON!,
				isEmptyWallet: true,
			},
		})
	}

	if (networksData.TON?.isEmptyWallet) {
		setNetworksData({
			...networksData,
			TON: {
				address: networksData.TON!.address,
				lastTransactionId: events[0]?.event_id,
				isEmptyWallet: false,
			},
		})
		return setQueue(prevDonates => [
			...prevDonates,
			...events.map((event: Event) => {
				const action = event.actions[0]
				if (action.TonTransfer) {
					return {
						transactionId: event.event_id,
						walletAddress: Address.parse(action.TonTransfer!.sender.address).toString({
							bounceable: false,
						}),
						tokenName: event.actions[0].simple_preview.value.split(' ')[1],
						amount: event.actions[0].simple_preview.value.split(' ')[0] || '0',
					}
				} else {
					return {
						transactionId: event.event_id,
						walletAddress: Address.parse(action.JettonTransfer!.sender.address).toString({
							bounceable: false,
						}),
						tokenName: event.actions[0].simple_preview.value.split(' ')[1],
						amount: event.actions[0].simple_preview.value.split(' ')[0] || '0',
					}
				}
			}),
		])
	}

	if (networksData.TON?.lastTransactionId === '') {
		return setNetworksData({
			...networksData,
			TON: { ...networksData.TON!, lastTransactionId: events[0]?.event_id },
		})
	}

	if (networksData.TON?.lastTransactionId !== events[0]?.event_id) {
		const lastTransactionIdIndex = events.findIndex(
			(event: Event) => event.event_id === networksData.TON!.lastTransactionId
		)

		if (lastTransactionIdIndex && lastTransactionIdIndex > 0) {
			setNetworksData({
				...networksData,
				TON: { ...networksData.TON!, lastTransactionId: events[0]?.event_id },
			})
			return setQueue(prevDonates => [
				...prevDonates,
				...events.slice(0, lastTransactionIdIndex).map((event: Event) => {
					const action = event.actions[0]
					if (action.TonTransfer) {
						return {
							transactionId: event.event_id,
							walletAddress: Address.parse(action.TonTransfer!.sender.address).toString({
								bounceable: false,
							}),
							tokenName: event.actions[0].simple_preview.value.split(' ')[1],
							amount: event.actions[0].simple_preview.value.split(' ')[0] || '0',
						}
					} else {
						return {
							transactionId: event.event_id,
							walletAddress: Address.parse(action.JettonTransfer!.sender.address).toString({
								bounceable: false,
							}),
							tokenName: event.actions[0].simple_preview.value.split(' ')[1],
							amount: event.actions[0].simple_preview.value.split(' ')[0] || '0',
						}
					}
				}),
			])
		} else {
			return setNetworksData({
				...networksData,
				TON: { address: networksData.TON!.address, lastTransactionId: events[0]?.event_id },
			})
		}
	}
}

export default handleEventProcessing

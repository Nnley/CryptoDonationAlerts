export type NetworkType = 'TON' | 'ETH' | 'TRC'

interface NetworkConfig {
	address: string
	lastTransactionId: string
	isEmptyWallet?: boolean
}

export type INetworkData = {
	[key in NetworkType]?: NetworkConfig
}

export interface IAlertSettings {
	imageUrl: string
	firstTextBlock: string
	secondTextBlock: string
	duration: number
	minAmount: number
}

export interface IDonation {
	transactionId: string
	amount: string
	tokenName: string
	walletAddress?: string
}

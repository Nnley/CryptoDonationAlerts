interface Account {
	address: string
	is_scam: boolean
	is_wallet: boolean
	name?: string
	icon?: string
}

interface TonTransfer {
	sender: Account
	recipient: Account
	amount: number
}

interface Jetton {
	address: string
	name: string
	symbol: string
	decimals: number
	image: string
	verification: string
}

interface JettonTransfer {
	sender: Account
	recipient: Account
	senders_wallet: string
	recipients_wallet: string
	amount: string
	comment: string
	jetton: Jetton
}

interface SimplePreview {
	name: string
	description: string
	value: string
	value_image?: string
	accounts: Account[]
}

interface Action {
	type: string
	status: string
	TonTransfer?: TonTransfer
	JettonTransfer?: JettonTransfer
	simple_preview: SimplePreview
	base_transactions: string[]
}

export interface Event {
	event_id: string
	account: Account
	timestamp: number
	actions: Action[]
	is_scam: boolean
	lt: number
	in_progress: boolean
	extra: number
}

export interface EventsResponse {
	events: Event[]
	next_from?: number
}

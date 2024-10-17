import { EventsResponse } from '@/constants/event.types'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRef } from 'react'

const getEvents = async (address: string) => {
	try {
		const response = await axios.get(`https://test.io/v2/accounts/${address}/events?limit=20`)
		return response.data
	} catch (error) {
		console.error(error)
		return []
	}
}

export const useEvents = (address: string): EventsResponse & { isLoading: boolean } => {
	const previousEventsRef = useRef([])

	const { data, isLoading } = useQuery({
		queryKey: ['events', address],
		queryFn: () => getEvents(address),
		// staleTime: 5000,
		// refetchInterval: 5000,
		select: data => {
			if (JSON.stringify(data.events) === JSON.stringify(previousEventsRef.current)) {
				return previousEventsRef.current
			}
			previousEventsRef.current = data.events
			return data.events
		},
	})

	return { events: data, isLoading }
}

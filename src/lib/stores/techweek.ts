import { writable } from 'svelte/store';

export interface TechEvent {
	id: string;
	title: string;
	time: string;
	duration: string;
	speaker?: string;
	location: string;
	description?: string;
}

export interface DaySchedule {
	date: string;
	dayName: string;
	events: TechEvent[];
}

// Sample data for the tech week schedule
const techWeekData: DaySchedule[] = [
	{
		date: '2025-09-29',
		dayName: 'Monday',
		events: [
			{
				id: '1',
				title: 'L’IA générative',
				time: '17:00',
				duration: '2h',
				location: 'Room 6616',
				description: 'Discussion on generative AI'
			}
		]
	},
	{
		date: '2025-09-30',
		dayName: 'Tuesday',
		events: [
			{
				id: '2',
				title: 'Puzzle & Logic Quest',
				time: '09:15',
				duration: '1h 30m',
				location: 'Room 6613',
				description: 'Interactive logic and puzzle challenge'
			},
			{
				id: '3',
				title: 'Quiz',
				time: '10:45',
				duration: '15m',
				location: 'Jean-Paul Morin',
				description: 'Quick tech quiz session'
			},
			{
				id: '4',
				title: 'Keynote avec Ollivier Dyens',
				time: '11:00',
				duration: '1h',
				location: 'Jean-Paul Morin',
				description: 'Keynote address'
			},
			{
				id: '5',
				title: 'Entrepreneuriat',
				time: '14:00',
				duration: '1h 30m',
				location: 'Jean-Paul Morin',
				description: 'Entrepreneurship talk'
			},
			{
				id: '6',
				title: 'Federated Learning & Agentic AI',
				time: '16:00',
				duration: '2h 30m',
				location: 'Jean-Paul Morin',
				description: 'Exploring federated learning and agentic AI'
			}
		]
	},
	{
		date: '2025-10-01',
		dayName: 'Wednesday',
		events: [
			{
				id: '7',
				title: 'Développement durable @ GameDev',
				time: '10:00',
				duration: '1h 30m',
				location: 'Online / Unity MTL',
				description: 'Game development for sustainability'
			},
			{
				id: '8',
				title: 'Quiz',
				time: '11:30',
				duration: '15m',
				location: 'Jean-Paul Morin',
				description: 'Quick quiz session'
			},
			{
				id: '9',
				title: 'AppsAnywhere Conference',
				time: '11:45',
				duration: '45m',
				location: 'Jean-Paul Morin',
				description: 'Conference on AppsAnywhere'
			},
			{
				id: '10',
				title: 'Kiosques',
				time: '12:00',
				duration: '4h 30m',
				location: 'Mezzanine',
				description: 'Technology kiosks'
			},
			{
				id: '11',
				title: 'Cybersecurity',
				time: '12:30',
				duration: '1h',
				location: 'Jean-Paul Morin',
				description: 'Session on cybersecurity'
			},
			{
				id: '12',
				title: 'Animaze',
				time: '15:00',
				duration: '4h',
				location: 'Jean-Paul Morin',
				description: 'Animaze event'
			},
			{
				id: '13',
				title: 'Web Dev Portfolio Atelier',
				time: '16:00',
				duration: '2h',
				location: 'Room 6613',
				description: 'Web development portfolio workshop'
			}
		]
	},
	{
		date: '2025-10-02',
		dayName: 'Thursday',
		events: [
			{
				id: '14',
				title: 'Pixels & Code: Retro Game From Scratch With SDL',
				time: '15:00',
				duration: '2h',
				location: 'Room 6615',
				description: 'Build retro games with SDL'
			},
			{
				id: '15',
				title: 'Tech Hiring Panel',
				time: '18:00',
				duration: '1h 30m',
				location: '6e étage',
				description: 'Panel on tech hiring'
			},
			{
				id: '16',
				title: 'CyberSprint',
				time: '09:30',
				duration: '2h',
				location: '6e étage',
				description: 'Cybersecurity sprint challenge'
			},
			{
				id: '17',
				title: 'Animaze',
				time: '12:00',
				duration: '7h',
				location: 'Jean-Paul Morin',
				description: 'Animaze event'
			}
		]
	},
	{
		date: '2025-10-03',
		dayName: 'Friday',
		events: [
			{
				id: '18',
				title: 'Animaze',
				time: '09:00',
				duration: '10h',
				location: 'Jean-Paul Morin',
				description: 'Animaze event (full day)'
			}
		]
	},
	{
		date: '2025-10-04',
		dayName: 'Saturday',
		events: [
			{
				id: '19',
				title: 'NASA Space Apps Challenge Montréal',
				time: '09:00',
				duration: '8h',
				location: 'Jean-Paul Morin & Mezzanine',
				description: 'Hackathon challenge'
			}
		]
	},
	{
		date: '2025-10-05',
		dayName: 'Sunday',
		events: [
			{
				id: '20',
				title: 'NASA Space Apps Challenge Montréal',
				time: '09:00',
				duration: '8h',
				location: 'Jean-Paul Morin & Mezzanine',
				description: 'Hackathon challenge'
			}
		]
	}
];

export const techWeekSchedule = writable<DaySchedule[]>(techWeekData);

// Helper function to get today's date in local timezone
function getTodayLocalDate(): string {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

// Helper function to get the next upcoming event
export function getNextEvent(): TechEvent | null {
	const now = new Date();
	const currentTime = now.getHours() * 100 + now.getMinutes();
	const today = getTodayLocalDate();

	for (const day of techWeekData) {
		if (day.date >= today) {
			for (const event of day.events) {
				const eventTime = parseInt(event.time.replace(':', ''));
				if (day.date > today || eventTime > currentTime) {
					return event;
				}
			}
		}
	}
	return null;
}

// Helper function to get events for today
export function getTodayEvents(): TechEvent[] {
	const today = getTodayLocalDate();
	const todaySchedule = techWeekData.find(day => day.date === today);
	return todaySchedule?.events || [];
}
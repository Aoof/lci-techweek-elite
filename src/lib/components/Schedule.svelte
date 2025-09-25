<script lang="ts">
	import { techWeekSchedule, getNextEvent, type DaySchedule, type TechEvent } from '$lib/stores/techweek';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Clock from '@lucide/svelte/icons/clock';
	import User from '@lucide/svelte/icons/user';
	import { onMount } from 'svelte';

	let schedule: DaySchedule[] = [];
	let nextEvent: TechEvent | null = null;

	onMount(() => {
		schedule = $techWeekSchedule;
		nextEvent = getNextEvent();
	});

	function formatTime(time: string): string {
		const [hours, minutes] = time.split(':');
		const hour24 = parseInt(hours);
		const hour12 = hour24 > 12 ? hour24 - 12 : hour24 === 0 ? 12 : hour24;
		const ampm = hour24 >= 12 ? 'PM' : 'AM';
		return `${hour12}:${minutes} ${ampm}`;
	}

	function isToday(date: string): boolean {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		const today = `${year}-${month}-${day}`;
		return date === today;
	}

	function formatDate(dateString: string): string {
		// Parse the date string and create a date object
		const [year, month, day] = dateString.split('-').map(Number);
		const date = new Date(year, month - 1, day); // month is 0-indexed
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}

	function isPastEvent(date: string, time: string): boolean {
		const now = new Date();
		const eventDateTime = new Date(`${date}T${time}:00`);
		return eventDateTime < now;
	}
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
	<div class="max-w-4xl mx-auto">
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Tech Week 2025</h1>
			<p class="text-lg text-gray-600 dark:text-gray-300">September 29-October 5, 2025</p>
		</div>

		{#if nextEvent}
			<div class="bg-blue-600 dark:bg-blue-700 rounded-lg p-6 mb-8 text-white shadow-lg">
				<h2 class="text-sm uppercase tracking-wide font-medium mb-2 opacity-90">Next Up</h2>
				<h3 class="text-2xl font-bold mb-2">{nextEvent.title}</h3>
				<div class="flex flex-wrap gap-4 text-sm">
					<span class="flex items-center">
						<Clock class="w-4 h-4 mr-2" />
						{formatTime(nextEvent.time)} • {nextEvent.duration}
					</span>
					<span class="flex items-center">
						<MapPin class="w-4 h-4 mr-2" />
						{nextEvent.location}
					</span>
					{#if nextEvent.speaker}
						<span class="flex items-center">
							<User class="w-4 h-4 mr-2" />
							{nextEvent.speaker}
						</span>
					{/if}
				</div>
			</div>
		{/if}

		<!-- Schedule Grid -->
		<div class="grid gap-6 md:gap-8">
			{#each schedule as day}
				<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
					<div class="bg-gray-100 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
						<div class="flex items-center justify-between">
							<h2 class="text-xl font-semibold text-gray-900 dark:text-white">
								{day.dayName}
							</h2>
							<span class="text-sm text-gray-500 dark:text-gray-400 {isToday(day.date) ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full' : ''}">
								{formatDate(day.date)}
								{isToday(day.date) ? ' (Today)' : ''}
							</span>
						</div>
					</div>
					
					<div class="p-6">
						<div class="space-y-4">
							{#each day.events as event}
								<div class="flex {isPastEvent(day.date, event.time) ? 'opacity-50' : ''} transition-opacity">
									<div class="flex-shrink-0 w-20 text-sm font-medium text-gray-500 dark:text-gray-400 pt-1">
										{formatTime(event.time)}
									</div>
									<div class="flex-1 ml-4">
										<div class="border-l-4 border-gray-200 dark:border-gray-600 {nextEvent?.id === event.id ? 'border-blue-500 dark:border-blue-400' : ''} pl-4">
											<h3 class="font-semibold text-gray-900 dark:text-white mb-1">
												{event.title}
											</h3>
											<div class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
												{#if event.speaker}
													<p class="font-medium">{event.speaker}</p>
												{/if}
												<div class="flex items-center gap-4">
													<span class="flex items-center">
														<MapPin class="w-4 h-4 mr-1" />
														{event.location}
													</span>
													<span class="flex items-center">
														<Clock class="w-4 h-4 mr-1" />
														{event.duration}
													</span>
												</div>
												{#if event.description}
													<p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
														{event.description}
													</p>
												{/if}
											</div>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div class="text-center mt-12 text-gray-500 dark:text-gray-400 text-sm">
			<p>All times are in local timezone. Events subject to change.</p>
		</div>
	</div>
</div>
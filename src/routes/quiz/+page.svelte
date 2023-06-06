<script>
	import { onMount } from "svelte";

  export let data;
</script>

<div class="grid items-center">
	{#each data.versions as version, i}
		<a
			href="quiz/{version}"
			class=" text-sky-900 p-3 bg-sky-400 hover:bg-sky-200 duration-200 text-center text-lg"
		>
			<span class="font-bold underline-none">
				{i + 1}.
			</span>
			<span class="underline">
				{new Date(parseInt(version.split('.')[0])).toLocaleString()}
			</span>
		</a>
	{/each}

	<a
		href="/"
		class="bottom-5 left-5 fixed bg-yellow-300 duration-200 p-3 shadow font-semibold hover:bg-yellow-500 hover:shadow-lg rounded-full"
		>&lt; Zurück</a
	>
</div>

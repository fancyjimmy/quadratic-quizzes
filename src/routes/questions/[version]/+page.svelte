<script>
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";

  export let data;
  export let form;

  if (browser && form?.successful) {
    goto("/questions");
  }
</script>

<form action="?/save" method="post">
  <input type="hidden" name="questions" value={JSON.stringify(data.questions)}>

  <button
    class="p-3 bg-yellow-300 rounded-full shadow font-bold fixed bottom-5 hover:bg-yellow-500 hover:shadow-xl duration-200 right-5">
    Speichern
  </button>

</form>
<a href="/questions"
   class="bottom-5 left-5 fixed bg-yellow-300 duration-200 p-3 font-semibold shadow hover:bg-yellow-500 hover:shadow-lg rounded-full">&lt; Zurück</a>

<div class="h-full w-full overflow-y-auto bg-sky-300 flex items-center flex-col">
  {#each data.questions as question}
    <div class="shadow-md lg:p-4 xl:p-5 md:p-2 p-2 m-3 rounded bg-white w-[clamp(400px,80%,800px)] max-w-[800px]">
      <p class="text-lg">{question.question}</p>
      <div class="flex flex-col gap-2 p-2 sm:p-1">
        {#each question.answers as answer}
          <div
            class="lg:p-2 xl:p-2 md:p-2 p-1 rounded shadow hover:shadow-lg hover:bg-gray-300 bg-gray-200 duration-200 {answer.correct
								? 'bg-sky-400 hover:bg-sky-300'
								: ''}"
          >
            <label class="flex gap-2 {answer.correct ? 'font-semibold hover:text-sky-800 text-sky-900' : ''}">
              <input type="checkbox" bind:checked={answer.correct} />
              <p>{answer.value}</p>
            </label>

            <div class="w-full text-sm">
              <p
                class="text-gray-800 hover:text-gray-900 select-none {answer.correct ? 'text-sky-900 hover:text-sky-700 ' :''}">
                Grund:</p>
              <input type="text" class="rounded focus:outline-0 px-0.5 text-gray-500 w-full"
                     spellcheck="false" bind:value={answer.reason} />
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

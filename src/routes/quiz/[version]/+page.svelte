<script>
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  export let data;
  export let form;

  if (browser && form?.successful) {
    goto("/questions");
  }

  let questionsToGo = [...Array(data.questions.length)].map((_, i) => i);

  questionsToGo = questionsToGo.sort((a, b) => 0.5 - Math.random());


  function isWrong(question) {
    const isRight = question.answers.reduce((acc, answer) => {
      return (answer.checked === answer.correct) && acc;
    }, true);
    return !isRight;
  }

  onMount(() => {
    window.addEventListener("keypress",  (event) => {
      if (event.key === 'ArrowRight') {
        if (currentQuestionIndex < questionsToGo.length - 1) {
          currentQuestionIndex += 1;
          console.log(currentQuestion);
        }
      } else if (event.key === 'ArrowLeft') {
        if (currentQuestionIndex > 0) {
          currentQuestionIndex -= 1;
          console.log(currentQuestion);
        }
      }
    });
  })

  let finished = false;

  data.questions.forEach(
    (question) => {
      question.answers.sort((a, b) => 0.5 - Math.random());
      question.answers.forEach(answer => {
        answer.checked = false;
      });
    }
  );
  let currentQuestionIndex = 0;
  $: currentQuestion = data.questions[questionsToGo[currentQuestionIndex]];
</script>

{#if !finished}

  <div class="flex justify-between w-full fixed bottom-5">
    <button
      class="bg-yellow-300 hover:bg-yellow-400 shadow hover:shadow-xl p-3 duration-200"
      class:disabled={currentQuestionIndex === 0}
      on:click={() => {
			if (currentQuestionIndex > 0) {
				currentQuestionIndex -= 1;
			}
		}}
    >
      &lt; vorherige Frage
    </button>

    {#if currentQuestionIndex == questionsToGo.length - 1}
      <button
        class="bg-sky-500 hover:bg-sky-600 shadow hover:shadow-xl p-3 duration-200 rounded text-white"
        on:click={() => {
          finished = true;
        }}
      >
        Fertig
      </button>
    {/if}
    <button
      class="bg-yellow-300 hover:bg-yellow-400 shadow hover:shadow-xl p-3 duration-200"
      class:disabled={currentQuestionIndex + 1 >= questionsToGo.length}
      on:click={() => {
			if (currentQuestionIndex < questionsToGo.length - 1) {
				currentQuestionIndex += 1;
			}
		}}
    >
      nächste Frage &gt;
    </button>
  </div>
  <div class="h-screen w-full overflow-y-auto bg-sky-300 grid place-items-center">
    <div class="fixed top-5 right-5">
      {currentQuestionIndex + 1} / {data.questions.length}
    </div>
    <div
      class="shadow-lg lg:p-4 xl:p-5 md:p-2 p-2 m-3 rounded bg-white w-[clamp(400px,80%,800px)] max-w-[800px] relative"
    >
<div class="absolute h-5 w-5 top-2 right-2 bg-lime-400 rounded {isWrong(currentQuestion) ? 'bg-red-500' : ''}">
   </div>
      <p class="text-lg">{currentQuestion.question}</p>
      <div class="flex flex-col gap-2 p-2 sm:p-1">
        {#each currentQuestion.answers as answer}
          <div
            class="lg:p-2 xl:p-2 md:p-2 p-1 rounded shadow hover:shadow-lg hover:bg-gray-300 bg-gray-200 duration-200 {answer.checked
							? 'bg-sky-400 hover:bg-sky-300'
							: ''}"
          >
            <label
              class="flex gap-2 {answer.checked
								? 'font-semibold hover:text-sky-800 text-sky-900'
								: ''}"
            >
              <input type="checkbox" bind:checked={answer.checked} />
              <p>{answer.value}</p>
            </label>
          </div>
        {/each}
      </div>
    </div>
  </div>

{:else}
  <div class="h-screen w-full overflow-y-auto bg-sky-300 grid place-items-center">

    <div>
      <div class="fixed top-10 right-10">
        <h1 class="text-4xl font-bold">Richtig</h1>
        <p class="text-xl">
          {data.questions.map((question) => {
            return !isWrong(question);
          }).filter(isRight => isRight).length} / {data.questions.length}
        </p>
      </div>


      <div class="flex flex-col items-center">
        {#each data.questions.filter(question => isWrong(question)) as wrongQuestion}

          <div class="shadow-md lg:p-4 xl:p-5 md:p-2 p-2 m-3 rounded bg-white w-[clamp(400px,80%,800px)] max-w-[800px]">
            <p class="text-lg">{wrongQuestion.question}</p>
            <div class="flex flex-col gap-2 p-2 sm:p-1">
              {#each wrongQuestion.answers as answer}
                <div
                  class="lg:p-2 xl:p-2 md:p-2 p-1 rounded shadow hover:shadow-lg duration-200 {answer.correct === answer.checked
								? 'bg-lime-400 hover:bg-lime-300'
								: 'hover:bg-red-300 bg-red-400'}"
                >
                  <label class="flex gap-2 font-semibold {answer.correct === answer.checked ? 'hover:text-lime-800 text-lime-900' : 'hover:text-red-800 text-red-900'}">
                    <input type="checkbox" checked={answer.checked} disabled />
                    <p>{answer.value}</p>
                  </label>

                  {#if answer.reason}

                    <div class="w-full text-sm p-2 rounded {answer.correct === answer.checked
								? 'bg-lime-100'
								: 'bg-red-100'}">
                      <p
                        class="text-gray-800 hover:text-gray-900 select-none {answer.correct  === answer.checked ? 'text-lime-900 hover:text-lime-700 ' :'text-red-900 hover:text-red-700'}">
                        Grund:</p>
                      <p
                        class="rounded focus:outline-0 px-0.5 text-gray-500 w-full">
                        {answer.reason}
                      </p>
                    </div>
                  {/if}

                </div>
              {/each}
            </div>
          </div>
        {/each}

      </div>
    </div>

  </div>


{/if}

<a
  href="/quiz"
  class="top-5 left-5 fixed bg-yellow-300 duration-200 p-3 font-semibold shadow hover:bg-yellow-500 hover:shadow-lg rounded-full"
>&lt; Zurück</a
>


<style>
    .disabled {
        filter: saturate(5%);
    }
</style>

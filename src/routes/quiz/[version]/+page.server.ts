import { loader } from "$lib/Loader";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  return {
    questions: loader.getVersion(params.version)
  };
};

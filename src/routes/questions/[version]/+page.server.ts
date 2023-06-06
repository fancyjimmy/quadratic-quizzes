import { loader } from "$lib/Loader";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  return {
    questions: loader.getVersion(params.version)
  };
};

export const actions: Actions = {
  save: async ({ request }) => {
    const formData = await request.formData();
    const value = formData.get("questions");
    if (value) {
      loader.saveVersion(value.toString(), Date.now() + ".json");
    }

    return {
      successful: true
    };

  }

};
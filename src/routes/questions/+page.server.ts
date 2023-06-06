import {loader} from "$lib/Loader";

export const load = async () => {
    return {
        versions: loader.getVersions()

    }
}
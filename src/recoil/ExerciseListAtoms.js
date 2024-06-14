import {atom, selector} from 'recoil';
import {getAllExercises, getExercisesByBodyPart} from "../utils/http/exerciseData";

export const searchFilterState = atom({
    key: 'searchFilterState',
    default: "",
});

export const bodyPartFilterState = atom({
    key: 'bodyPartFilterState',
    default: "all",
});

export const filteredExercisesState = selector({
    key: 'filteredExercisesState',
    get: async ({get}) => {
        const bodyPartFilter = get(bodyPartFilterState);
        const search = get(searchFilterState).toLowerCase();

        let result;
        result = bodyPartFilter.toLowerCase() === 'all'
            ? await getAllExercises()
            : await getExercisesByBodyPart(bodyPartFilter);

        if (!result) return [];

        return search
            ? result.filter(
                (item) =>
                    item.name.toLowerCase().includes(search) ||
                    item.target.toLowerCase().includes(search) ||
                    item.equipment.toLowerCase().includes(search) ||
                    item.bodyPart.toLowerCase().includes(search)
            )
            : result;
    },
});
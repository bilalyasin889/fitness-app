import {atom, selector} from 'recoil';

export const exercisesDataState = atom({
    key: 'exercisesDataState',
    default: null,
});

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
        let exerciseData = get(exercisesDataState);
        const bodyPartFilter = get(bodyPartFilterState).toLowerCase();
        const search = get(searchFilterState).toLowerCase();

        if (!exerciseData) return null;
        if (exerciseData.length === 0) return [];

        if (bodyPartFilter !== 'all')
            exerciseData = exerciseData.filter(item => item.bodyPart.toLowerCase() === bodyPartFilter)

        return search
            ? exerciseData.filter(
                (item) =>
                    item.name.toLowerCase().includes(search) ||
                    item.targetMuscle.toLowerCase().includes(search) ||
                    item.equipment.toLowerCase().includes(search) ||
                    item.bodyPart.toLowerCase().includes(search)
            )
            : exerciseData;
    },
});
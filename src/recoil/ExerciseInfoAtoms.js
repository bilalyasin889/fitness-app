import {atom, selector} from 'recoil';
import {getExerciseById, getExercisesByEquipment, getExercisesByTargetMuscle} from "../utils/http/exerciseData";

export const exerciseIdState = atom({
    key: 'exerciseIdState',
    default: null,
});

export const exerciseState = selector({
    key: 'exerciseState',
    get: async ({get}) => {
        const id = get(exerciseIdState);
        if (id === null) return null;
        return await getExerciseById(id);
    },
});

export const targetExercisesState = selector({
    key: 'targetExercisesState',
    get: async ({get}) => {
        const exercise = get(exerciseState);
        if (!exercise?.targetMuscle) return [];
        return await getExercisesByTargetMuscle(exercise.targetMuscle);
    },
});

export const equipmentExercisesState = selector({
    key: 'equipmentExercisesState',
    get: async ({get}) => {
        const exercise = get(exerciseState);
        if (!exercise?.equipment) return [];
        return await getExercisesByEquipment(exercise.equipment);
    },
});
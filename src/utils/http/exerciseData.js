import {APPLICATION_URIS, HOSTS} from '../../config/applicationUris';
import ApiClient from "./ApiClient";

const HOST = HOSTS.exerciseDB;
const API_URIS = APPLICATION_URIS.exerciseDB;
const HEADERS = {
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
};

const apiClient = new ApiClient(HOST, HEADERS);

export const getAllExercises = async () => {
    const params = {
        limit: '9999',
        offset: '0'
    };
    return apiClient.get(API_URIS.exercises, params)
        .then((response) => {
            console.debug("getAllExercises: Successfully retrieved all exercises.");
            return response.data;
        })
        .catch((error) => {
            console.error("getAllExercises: Error retrieving all exercises.", error.message);
            return null;
        });
};

export const getBodyParts = async () => {
    return apiClient.get(API_URIS.bodyPartList)
        .then((response) => {
            console.debug("getBodyParts: Successfully retrieved body parts.");
            return (['all', ...response.data]);
        })
        .catch((error) => {
            console.error("getBodyParts: Error retrieving body parts.", error.message);
            return (['all']);
        });
};

export const getExercisesByBodyPart = async (bodyPart) => {
    const params = {
        limit: '9999',
        offset: '0'
    };
    return apiClient.get(API_URIS.exercisesByBodyPart(bodyPart), params)
        .then((response) => {
            console.debug(`getExercisesByBodyPart: Successfully retrieved exercises for body part [${bodyPart}].`);
            return response.data;
        })
        .catch((error) => {
            console.error(`getExercisesByBodyPart: Error retrieving exercises for body part [${bodyPart}].`, error.message);
            return null;
        });
};

export const getExercisesByTargetMuscle = async (targetMuscle) => {
    const params = {
        limit: '9999',
        offset: '0'
    };

    return apiClient.get(API_URIS.exercisesByTargetMuscle(targetMuscle), params)
        .then((response) => {
            console.debug(`getExercisesByTargetMuscle: Successfully retrieved exercises for target muscle [${targetMuscle}].`);
            return response.data.sort(() => Math.random() - 0.5).slice(0, 3);
        })
        .catch((error) => {
            console.error(`getExercisesByTargetMuscle: Error retrieving exercises by target muscle [${targetMuscle}]:`, error.message);
            return [];
        });
};

export const getExercisesByEquipment = async (equipment) => {
    const params = {
        limit: '9999',
        offset: '0'
    };
    return apiClient.get(API_URIS.exercisesByEquipment(equipment), params)
        .then((response) => {
            console.debug(`getExercisesByEquipment: Successfully retrieved exercises for equipment [${equipment}].`);
            return response.data.sort(() => Math.random() - 0.5).slice(0, 3);
        })
        .catch((error) => {
            console.error(`getExercisesByEquipment: Error retrieving exercises by equipment [${equipment}]:`, error.message);
            return [];
        });
};

export const getExerciseById = async (id) => {
    return apiClient.get(API_URIS.exerciseById(id))
        .then((response) => {
            console.debug(`getExerciseById: Successfully retrieved exercise info for id [${id}].`);
            return response.data;
        })
        .catch((error) => {
            console.error(`getExerciseById: Error retrieving exercise info for id [${id}]:`, error.message);
            return null;
        });
};
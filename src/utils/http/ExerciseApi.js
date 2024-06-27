import useAxiosService from "./UseAxiosService";
import {APPLICATION_URIS, HOSTS} from '../../config/applicationUris';

const HOST = HOSTS.exercise;
const API_URIS = APPLICATION_URIS.exercise;

export const useExerciseApi = () => {
    const axiosInstance = useAxiosService(HOST);

    const getAllExercises = async () => {
        return axiosInstance.get(API_URIS.exercises)
            .then((response) => {
                console.debug("getAllExercises: Successfully retrieved all exercises.");
                return response.data;
            })
            .catch((error) => {
                console.error("getAllExercises: Error retrieving all exercises.", error.message);
                return null;
            });
    };

    const getBodyParts = async () => {
        return axiosInstance.get(API_URIS.bodyPartList)
            .then((response) => {
                console.debug("getBodyParts: Successfully retrieved body parts.");
                return (['all', ...response.data]);
            })
            .catch((error) => {
                console.error("getBodyParts: Error retrieving body parts.", error.message);
                return (['all']);
            });
    };

    const getExercisesByBodyPart = async (bodyPart) => {
        return axiosInstance.get(API_URIS.exercisesByBodyPart(bodyPart))
            .then((response) => {
                console.debug(`getExercisesByBodyPart: Successfully retrieved exercises for body part [${bodyPart}].`);
                return response.data;
            })
            .catch((error) => {
                console.error(`getExercisesByBodyPart: Error retrieving exercises for body part [${bodyPart}].`, error.message);
                return null;
            });
    };

    const getExercisesByTargetMuscle = async (exerciseId, targetMuscle) => {
        return axiosInstance.get(API_URIS.exercisesByTargetMuscle(targetMuscle))
            .then((response) => {
                console.debug(`getExercisesByTargetMuscle: Successfully retrieved exercises for target muscle [${targetMuscle}].`);
                return getRandomExercises(exerciseId, response.data, 3);
            })
            .catch((error) => {
                console.error(`getExercisesByTargetMuscle: Error retrieving exercises by target muscle [${targetMuscle}]:`, error.message);
                return [];
            });
    };

    const getExercisesByEquipment = async (exerciseId, equipment) => {
        return axiosInstance.get(API_URIS.exercisesByEquipment(equipment))
            .then((response) => {
                console.debug(`getExercisesByEquipment: Successfully retrieved exercises for equipment [${equipment}].`);
                return getRandomExercises(exerciseId, response.data, 3);
            })
            .catch((error) => {
                console.error(`getExercisesByEquipment: Error retrieving exercises by equipment [${equipment}]:`, error.message);
                return [];
            });
    };

    const getRandomExercises = (exerciseId = null, data, size) => {
        const filteredData = exerciseId ? data.filter(item => item.id !== parseInt(exerciseId)) : data;

        return filteredData.sort(() => Math.random() - 0.5).slice(0, size)
    }

    const getExerciseById = async (id) => {
        return axiosInstance.get(API_URIS.exerciseById(id))
            .then((response) => {
                console.debug(`getExerciseById: Successfully retrieved exercise info for id [${id}].`);
                return response.data;
            })
            .catch((error) => {
                console.error(`getExerciseById: Error retrieving exercise info for id [${id}]:`, error.message);
                return null;
            });
    };

    const getFavourites = async () => {
        return axiosInstance.get(API_URIS.favourites)
            .then((response) => {
                console.debug('getFavourites: Successfully retrieved user favourite exercises.');
                return {success: true, data: response.data};
            })
            .catch((error) => {
                console.error('getFavourites: Error retrieving user favourite exercises:', error.message);
                return null;
            });
    };

    const isFavouriteExercise = async (exerciseId) => {
        return axiosInstance.get(API_URIS.isFavourite(exerciseId))
            .then((response) => {
                console.debug(`isFavouriteExercise: Successfully retrieved favourite status for id [${exerciseId}]:`);
                return {success: true, data: response.data};
            })
            .catch((error) => {
                console.error(`isFavouriteExercise: Error retrieving favourite status for id [${exerciseId}]:`, error.message);
                return {success: false};
            });
    };

    const addFavouriteExercise = async (exerciseId) => {
        return axiosInstance.post(API_URIS.addFavourite(exerciseId))
            .then(() => {
                console.debug(`addFavouriteExercise: Successfully added user favourite exercise for id [${exerciseId}]:`);
                return {success: true};
            })
            .catch((error) => {
                console.error(`addFavouriteExercise: Error adding user favourite exercise for id [${exerciseId}]:`, error.message);
                return {success: false};
            });
    };

    const removeFavouriteExercise = async (exerciseId) => {
        return axiosInstance.delete(API_URIS.removeFavourite(exerciseId))
            .then(() => {
                console.debug(`removeFavouriteExercise: Successfully removed user favourite exercise for id [${exerciseId}]:`);
                return {success: true};
            })
            .catch((error) => {
                console.error(`removeFavouriteExercise: Error removed user favourite exercise for id [${exerciseId}]:`, error.message);
                return {success: false};
            });
    };

    return {
        getAllExercises,
        getBodyParts,
        getExercisesByBodyPart,
        getExercisesByTargetMuscle,
        getExercisesByEquipment,
        getExerciseById,
        getFavourites,
        isFavouriteExercise,
        addFavouriteExercise,
        removeFavouriteExercise
    };
};
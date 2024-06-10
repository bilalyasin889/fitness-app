import {getRequest} from "./utils";
import {HOSTS, APPLICATION_URIS} from '../config/applicationUris';

const HOST = HOSTS.exerciseDB;
const API_URIS = APPLICATION_URIS.exerciseDB;
const HEADERS = {
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
};

export const getAllExercises = async () => {
    const url = HOST + API_URIS.exercises;
    const params = {
        limit: '9999',
        offset: '0'
    };
    return getRequest(url, HEADERS, params);
};

export const getBodyParts = async () => {
    const url = HOST + API_URIS.bodyPartList;
    return getRequest(url, HEADERS);
};

export const getExercisesByBodyPart = async (bodyPart) => {
    const url = HOST + API_URIS.exercisesByBodyPart(bodyPart);
    const params = {
        limit: '9999',
        offset: '0'
    };
    return getRequest(url, HEADERS, params);
};

export const getExercisesByTargetMuscle = async (targetMuscle) => {
    const url = HOST + API_URIS.exercisesByTargetMuscle(targetMuscle);
    const params = {
        limit: '9999',
        offset: '0'
    };
    return getRequest(url, HEADERS, params);
};

export const getExercisesByEquipment = async (equipment) => {
    const url = HOST + API_URIS.exercisesByEquipment(equipment);
    const params = {
        limit: '9999',
        offset: '0'
    };
    return getRequest(url, HEADERS, params);
};

export const getExerciseById = async (id) => {
    console.log("key : " + process.env.REACT_APP_RAPID_API_KEY);
    const url = HOST + API_URIS.exerciseById(id);
    return getRequest(url, HEADERS);
};
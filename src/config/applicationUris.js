export const HOSTS = {
    exerciseDB: 'https://exercisedb.p.rapidapi.com'
};

export const APPLICATION_URIS = {
    exerciseDB: {
        exercises: '/exercises',
        bodyPartList: '/exercises/bodyPartList',
        exercisesByBodyPart: (bodyPart) => `/exercises/bodyPart/${bodyPart}`,
        exercisesByTargetMuscle: (targetMuscle) => `/exercises/target/${targetMuscle}`,
        exercisesByEquipment: (equipment) => `/exercises/equipment/${equipment}`,
        exerciseById: (id) => `/exercises/exercise/${id}`
    }
};
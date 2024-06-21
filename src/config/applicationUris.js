export const HOSTS = {
    exercise: 'http://localhost:8080/api/v1/exercises'
};

export const APPLICATION_URIS = {
    exercise: {
        exercises: '/all',
        bodyPartList: '/body-parts',
        exercisesByBodyPart: (bodyPart) => `/body-part/${bodyPart}`,
        exercisesByTargetMuscle: (targetMuscle) => `/target-muscle/${targetMuscle}`,
        exercisesByEquipment: (equipment) => `/equipment/${equipment}`,
        exerciseById: (id) => `/${id}`
    }
};
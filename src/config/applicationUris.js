export const HOSTS = {
    auth: 'http://localhost:8081/api',
    exercise: 'http://localhost:8080/api/v1/exercises'
};

export const APPLICATION_URIS = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        userInfo: '/user/info',
        updateUserInfo: '/user/update-info',
    },
    exercise: {
        exercises: '/all',
        bodyPartList: '/body-parts',
        exercisesByBodyPart: (bodyPart) => `/body-part/${bodyPart}`,
        exercisesByTargetMuscle: (targetMuscle) => `/target-muscle/${targetMuscle}`,
        exercisesByEquipment: (equipment) => `/equipment/${equipment}`,
        exerciseById: (id) => `/${id}`
    }
};
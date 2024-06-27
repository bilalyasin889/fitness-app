export const HOSTS = {
    auth: 'http://localhost:8081/api',
    exercise: 'http://localhost:8080/api/v1'
};

export const APPLICATION_URIS = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        userInfo: '/user/info',
        updateUserInfo: '/user/update-info',
    },
    exercise: {
        exercises: '/exercises/all',
        bodyPartList: '/exercises/body-parts',
        exercisesByBodyPart: (bodyPart) => `/exercises/body-part/${bodyPart}`,
        exercisesByTargetMuscle: (targetMuscle) => `/exercises/target-muscle/${targetMuscle}`,
        exercisesByEquipment: (equipment) => `/exercises/equipment/${equipment}`,
        exerciseById: (id) => `/exercises/${id}`,
        favourites: '/favourites',
        isFavourite:  (exerciseId) => `/favourites/isFavourite/${exerciseId}`,
        addFavourite:  (exerciseId) => `/favourites/add/${exerciseId}`,
        removeFavourite:  (exerciseId) => `/favourites/remove/${exerciseId}`
    }
};
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
        addFavourite:  (exerciseId) => `/favourites/add/${exerciseId}`,
        removeFavourite:  (exerciseId) => `/favourites/remove/${exerciseId}`,
        withFavourite : {
            exercises: '/exercises/with-favourite/all',
            exercisesByTargetMuscle: (targetMuscle) => `/exercises/with-favourite/target-muscle/${targetMuscle}`,
            exercisesByEquipment: (equipment) => `/exercises/with-favourite/equipment/${equipment}`,
            exerciseById: (id) => `/exercises/with-favourite/${id}`,
        }
    }
};
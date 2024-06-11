const initialState = {
    exerciseList: [],
    searchFilter: "",
    bodyPartFilter: "all"
};

// selectors
export const getExercises = (state) => state.exercises.exerciseList;
export const getSearchFilter = (state) => state.exercises.searchFilter;
export const getBodyPartFilter = (state) => state.exercises.bodyPartFilter;

// action types
export const EXERCISES_CHANGED = "exercises/exercisesChanged";
export const SEARCH_CHANGED = "exercises/searchFilterChanged";
export const BODY_PART_FILTER_CHANGED = "exercises/bodyPartFilterChanged";

//Reducer actions
export function exercisesReducer(state = initialState, action) {
    switch (action.type) {
        case EXERCISES_CHANGED:
            return {...state, exerciseList: action.payload};
        case SEARCH_CHANGED:
            return {...state, searchFilter: action.payload};
        case BODY_PART_FILTER_CHANGED:
            return {...state, bodyPartFilter: action.payload};
        default:
            return state;
    }
}

// action creators
export const updateExercises = (exerciseList) => ({
    type: EXERCISES_CHANGED,
    payload: exerciseList
});

export const searchChanged = (searchQuery) => ({
    type: SEARCH_CHANGED,
    payload: searchQuery
});

export const bodyPartFilterChanged = (bodyPart) => ({
    type: BODY_PART_FILTER_CHANGED,
    payload: bodyPart
});

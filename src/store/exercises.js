const initialState = {
    exerciseList: [],
    bodyParts: [],
    searchFilter: "",
    bodyPartFilter: "all",
    currentPage: 1,
    exercisesPerPage: 9
};

// selectors
export const getExercises = (state) => state.exercises.exerciseList;
export const getBodyPartsList = (state) => state.exercises.bodyParts;
export const getSearchFilter = (state) => state.exercises.searchFilter;
export const getBodyPartFilter = (state) => state.exercises.bodyPartFilter;
export const getCurrentPage = (state) => state.exercises.currentPage;
export const getExercisesPerPage = (state) => state.exercises.exercisesPerPage;

// action types
export const EXERCISES_CHANGED = "exercises/exercisesChanged";
export const BODY_PARTS_CHANGED = "exercises/BodyPartsChanged";
export const SEARCH_CHANGED = "exercises/searchFilterChanged";
export const BODY_PART_FILTER_CHANGED = "exercises/bodyPartFilterChanged";
export const CURRENT_PAGE_CHANGED = "exercises/currentPageChanged";
export const EXERCISES_PAGE_COUNT_CHANGED = "exercises/pageCountChanged";

//Reducer actions
export function exercisesReducer(state = initialState, action) {
    switch (action.type) {
        case EXERCISES_CHANGED:
            return {...state, exerciseList: action.payload};
        case BODY_PARTS_CHANGED:
            return {...state, bodyParts: action.payload};
        case SEARCH_CHANGED:
            return {...state, searchFilter: action.payload};
        case BODY_PART_FILTER_CHANGED:
            return {...state, bodyPartFilter: action.payload};
        case CURRENT_PAGE_CHANGED:
            return {...state, currentPage: action.payload};
        case EXERCISES_PAGE_COUNT_CHANGED:
            return {...state, exercisesPerPage: action.payload};
        default:
            return state;
    }
}

// action creators
export const updateExercises = (exerciseList) => ({
    type: EXERCISES_CHANGED,
    payload: exerciseList
});

export const updateBodyParts = (bodyPartList) => ({
    type: BODY_PARTS_CHANGED,
    payload: bodyPartList
});

export const searchChanged = (searchQuery) => ({
    type: SEARCH_CHANGED,
    payload: searchQuery
});

export const bodyPartFilterChanged = (bodyPart) => ({
    type: BODY_PART_FILTER_CHANGED,
    payload: bodyPart
});

export const currentPageChanged = (pageNumber) => ({
    type: CURRENT_PAGE_CHANGED,
    payload: pageNumber
});

export const pageCountChanged = (pageCount) => ({
    type: EXERCISES_PAGE_COUNT_CHANGED,
    payload: pageCount
});
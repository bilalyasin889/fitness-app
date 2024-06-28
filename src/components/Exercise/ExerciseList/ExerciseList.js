import {exercisesDataState, filteredExercisesState} from "../../../recoil/ExerciseListAtoms";
import {useRecoilValue, useSetRecoilState} from "recoil";
import React, {useEffect} from "react";
import {useExerciseApi} from "../../../utils/http/ExerciseApi";
import PaginatedExercises from "../PaginatedExercises/PaginatedExercises";

import './ExerciseList.css'

const ExerciseList = () => {
    const setExerciseData = useSetRecoilState(exercisesDataState);
    const {getAllExercises} = useExerciseApi();

    useEffect(() => {
        const fetchData = async () => {
            let result = await getAllExercises()

            if (!result) setExerciseData([]);
            else setExerciseData(result)
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const exerciseList = useRecoilValue(filteredExercisesState);

    if (!exerciseList) {
        return null;
    }

    return (
        <>
            <h2 className="heading-level-2 result-title">Showing Results</h2>
            {exerciseList.length === 0 ?
                (
                    <>
                        <h3 className="result-not-found">No exercises found</h3>
                    </>
                )
                :
                (<PaginatedExercises exerciseList={exerciseList}/>)
            }
        </>
    );
};

export default ExerciseList;
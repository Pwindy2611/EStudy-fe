import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { GetAllUnitsByCourse } from "@/service/api/apiCourseRequest";

const useGetAllUnits = (params: any) => {
  const { course: idCourse } = params;
  const courseId = Number(idCourse);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.persistedReducer.auth?.login?.data);
  const unitsFromState = useSelector((state: any) => state.ThunkReducer.unit?.units?.data?.units);
  
  const userId = user?.user.userId;

  const apiRequest = useMemo(() => ({
    courseId: courseId,
    userId: userId
  }), [courseId, userId,dispatch]);

  useEffect(() => {
    if (!unitsFromState || !unitsFromState.some((unit: any) => unit.courseId === courseId)) {
      GetAllUnitsByCourse(apiRequest, dispatch);
    }
  }, [dispatch,courseId]);

  return unitsFromState;
};

export default useGetAllUnits;

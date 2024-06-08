import * as request from "@/lib/utils/request";
import {
    getCourseStart,
    getCourseFailed,
    getCourseSuccess,
    getCourseDetailSuccess,
    getCourseDetailStart,
    getCourseDetailFailed,
    getAllCourseByUsersStart,
    getAllCourseByUsersSuccess,
    getAllCourseByUsersFailed,
    getUnregisteredCoursesStart,
    getUnregisteredCoursesSuccess,
    getUnregisteredCoursesFailed,
    getPopularCourseStart,
    getPopularCourseSuccess,
    getPopularCourseFailed,
}
from "@/service/reduxState/courseSlices";

import {
  getUnitStart,
  getUnitFailed,
  getUnitSuccess
}
from "@/service/reduxState/unitSlices"

export const getAllCourse = async (dispatch:any) => {//truyen req user(username,password), dispatch( truyen action tu state cua login), navigate( chuyen den trang moi nhu route-dom cua react)
    dispatch(getCourseStart());
    try {
      const res = await request.get('/Courses_API/Get_AllCourses');
      dispatch(getCourseSuccess(res));//nhan du lieu tu backend
    } catch (err:any) {
      dispatch(getCourseFailed(err.response.data));
    }
  };

  export const getPopularCourse = async (data:any,dispatch:any) => {
    dispatch(getPopularCourseStart()); 
    try{
      const res = await request.post('/Courses_API/Get_OutstandingCoursesUserNotBought',data);
       dispatch(getPopularCourseSuccess(res));
    }catch (err:any) {
      dispatch(getPopularCourseFailed(err.response.data));
    }
  }
  
  export const getUnregisterCourse = async (idUser:any,dispatch:any) => {
    dispatch(getUnregisteredCoursesStart()); 
    try{
      const res = await request.post('/Courses_API/Get_UnregisteredCourses',idUser);
       dispatch(getUnregisteredCoursesSuccess(res));
    }catch (err:any) {
      dispatch(getUnregisteredCoursesFailed(err.response.data));
    }
  }

 
export const getDetailCourse = async (idCourse:any,dispatch:any) => {
  dispatch(getCourseDetailStart()); 
  try{
    const res = await request.post('/UserCourses_API/Get_DetailCourseAndUserBought',idCourse);
     dispatch(getCourseDetailSuccess(res));
  }catch (err:any) {
    dispatch(getCourseDetailFailed(err.response.data));
  }
}

export const getAllCoursesByUser = async (idUser:any,dispatch:any)=>{
  dispatch(getAllCourseByUsersStart());
  try {
    const res = await request.post('/UserCourses_API/Get_AllCoursesByUser', idUser);
     dispatch(getAllCourseByUsersSuccess(res))
  }
  catch (err:any) {
    dispatch(getAllCourseByUsersFailed(err.response));
  }
};

export const GetAllUnitsByCourse = async (data:any,dispatch:any) => {
  dispatch(getUnitStart());
  try {
        const res = await request.post('/Unit_API/Get_AllUnitsByCourse', data);
        dispatch(getUnitSuccess(res));
      }catch (err:any) {
    dispatch(getUnitFailed(err));
  }
};
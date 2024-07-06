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

import {
  getContentUnitStart,
  getContentUnitFailed,
  getContentUnitSuccess
}
from "@/service/reduxState/containerAndLessonSlices"

export const getAllCourse = async (dispatch:any) => {//truyen req user(username,password), dispatch( truyen action tu state cua login), navigate( chuyen den trang moi nhu route-dom cua react)
    dispatch(getCourseStart());
    try {
      const res = await request.get('/Courses_API/Get_AllCourses');
      dispatch(getCourseSuccess(res));//nhan du lieu tu backend
    } catch (err:any) {
      dispatch(getCourseFailed(err.response?.data));
    }
  };

  export const getPopularCourse = async (data:any,dispatch:any) => {
    dispatch(getPopularCourseStart()); 
    try{
      const res = await request.post('/Courses_API/Get_OutstandingCoursesUserNotBought',data);
       dispatch(getPopularCourseSuccess(res));
    }catch (err:any) {
      dispatch(getPopularCourseFailed(err.response?.data));
    }
  }
  
  export const getUnregisterCourse = async (idUser:any,dispatch:any) => {
    dispatch(getUnregisteredCoursesStart()); 
    try{
      const res = await request.post('/Courses_API/Get_UnregisteredCourses',idUser);
       dispatch(getUnregisteredCoursesSuccess(res));
    }catch (err:any) {
      dispatch(getUnregisteredCoursesFailed(err.response?.data));
    }
  }

 
export const getDetailCourse = async (idCourse:any,dispatch:any) => {
  dispatch(getCourseDetailStart()); 
  try{
    const res = await request.post('/UserCourses_API/Get_DetailCourseAndUserBought',idCourse);
     dispatch(getCourseDetailSuccess(res));
  }catch (err:any) {
    dispatch(getCourseDetailFailed(err.response?.data));
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

export const GetAllUnitsByCourse = async (data: any, dispatch: any) => {
  dispatch(getUnitStart());

  try {
    // Gọi API để lấy danh sách các unit
    const res = await request.post('/Unit_API/Get_AllUnitsByCourse', data);
    dispatch(getUnitSuccess(res));
    
    const listUnits = res.units;
    let UnitsArray: any[] = [];

    if (listUnits && listUnits.length > 0) {
      // Tạo một mảng các promise để gọi API cho từng unit
      const unitPromises = listUnits.map((unit: any) =>
        request.post('/Container_API/Get_AllContainerAndLessonByUnit', { unitId: unit.unitId })
      );

      // Chờ tất cả các promise hoàn thành
      const unitDetailsResponses = await Promise.all(unitPromises);

      // Tạo mảng các unitDetail từ kết quả của các API call
      UnitsArray = unitDetailsResponses.map((res: any) => res.unitDetail);

      dispatch(getContentUnitStart());

      try {
        dispatch(getContentUnitSuccess(UnitsArray));
      } catch (err: any) {
        dispatch(getContentUnitFailed(err.message || err));
      }
    } else {
      console.log("listUnits failed or empty!!");
    }
  } catch (err: any) {
    dispatch(getUnitFailed(err.message || err));
  }
};


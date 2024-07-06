"use client"
import Image from 'next/image';
import  Link  from 'next/link';
import GetLoadingCourse from "@/app/components/course/loadingCourse"

import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoursesByUser } from "@/service/api/apiCourseRequest";

export default function GetCoursesByUser() {

    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.persistedReducer.auth.login.data);
    const checkNoCourse =useSelector((state: any) => state.ThunkReducer.courses.AllCourseByUsers?.data);
    const listCourses = useSelector((state: any) => state.ThunkReducer.courses.AllCourseByUsers?.data?.courses);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user?.user?.userId) {
            const UserId = {
                userId: user.user.userId
            }
            getAllCoursesByUser(UserId, dispatch).then(() => {
                setIsLoading(false);
            });
        }
    }, [dispatch, user]);

    if (isLoading) {
        return  <GetLoadingCourse></GetLoadingCourse>
    }


    return(
      <div className="relative">
        {checkNoCourse?.status==404||listCourses==null ? (
        <div>Học viên chưa mua khoá học nào</div>)
        :(
          <>
          <h2 className="  font-semibold text-3xl text-[#17165B] ">Khoá học của tôi</h2>
            <div className=" mt-16 grid grid-cols-3 gap-14">
            {listCourses.map((course:any) =>{
                return(
                <Link key={course.courseId} href={`/course/${course.courseId}/Learning/Unit/LandingCourse/courseOption`}className=" group h-full">
                <div className=" shadow-md flex flex-col items-center group-hover:shadow-lg transition duration-500 delay-75 ease-in-out bg-white p-4 rounded-xl mb-5 h-full">
                <div className='mb-5 w-full h-72 group relative overflow-hidden rounded-[10px] '>
                  <Image className=' object-cover h-full transition duration-500 ease group-hover:brightness-[95%] group-hover:scale-105' 
                  width={1000} 
                  height={1000} 
                  quality={100}
                  alt='image' 
                  src={course.courseImage}>
                  </Image>
                </div>
                <h3 className=" text-base font-medium text-center">{course.courseName}</h3>
                <div className=' mt-3 rounded-xl px-4 py-2 bg-green-500 text-white text-base font-medium w-fit'>Đã kích hoạt</div>
                </div>
              </Link>
                )
              })}
            </div>
          </>
        )}
      </div>
    )
}
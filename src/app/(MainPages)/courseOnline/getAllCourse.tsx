"use client"
import Image from 'next/image';
import  Link  from 'next/link';

import { useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getUnregisterCourse } from "@/service/api/apiCourseRequest";
import GetLoadingCourse from "@/app/components/course/loadingCourse"

import addDotsToCurrency from "@/lib/utils/currency"
export default function GetAllCourses() {
  const [isLoading, setIsLoading] = useState(true);
   const user = useSelector((state: any) => state.persistedReducer.auth.login?.data?.user);
    const dispatch = useDispatch();
    const listCourses = useSelector((state: any) => state.ThunkReducer.courses.UnregisteredCourses?.data?.unregisteredCoursesResponse);
    useEffect(() => {
            const UserId = { userId: user?.userId };
            getUnregisterCourse(UserId, dispatch).then(()=>{
              setIsLoading(false);
            })
    }, [dispatch, user]);

    if (isLoading) {
      return  <GetLoadingCourse></GetLoadingCourse>
  }

    return(
      <div className="relative p-16">
            <h2 className="  font-semibold text-3xl text-[#17165B] ">Combo khoá học online :</h2>
            <div className=" mt-16 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-14">
            {listCourses?.map((course:any) =>{
                return(
                <Link key={course.courseId} href={`/course/${course.courseId}/courseDetails`}className=" group">
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
                  <div className=" pt-2 flex flex-col">
                    <div className="">
                      <i className="fa-solid fa-star course__icon-star text-sm text-star-color"></i>
                      <i className="fa-solid fa-star course__icon-star text-sm text-star-color"></i>
                      <i className="fa-solid fa-star course__icon-star text-sm text-star-color"></i>
                      <i className="fa-solid fa-star course__icon-star text-sm text-star-color"></i>
                      <i className="fa-solid fa-star course__icon-star text-sm text-star-color"></i>
                    </div>
                  </div>
                  {
                      course.courseSale > 0 ? 
                      (
                        <div className="flex items-center">                  
                         <span className=" text-xl font-semibold text-price-color">{addDotsToCurrency(course.lastPrice)}đ</span>
                        <span className=" text-xl line-through px-3">{addDotsToCurrency(course.coursePrice)}đ</span>
                        <span className=" py-[3px] px-[6px] text-white font-bold text-sm bg-primary-bg-orange-color rounded-xl my-[10px]">-{course.courseSale}%</span>
                        </div>   

                      ): (
                        <div className="flex flex-col items-center"> 
                        <span className=" text-xl font-semibold text-price-color">{addDotsToCurrency(course.lastPrice)}đ</span>
                        <span className=" py-[3px] px-[6px] text-white font-bold text-sm bg-primary-bg-orange-color rounded-xl my-[10px]">Không hỗ trợ giảm giá</span>
                        </div>
                       
                      )
                    }
                  </div>
              </Link>
                )
              })}
            </div>
        </div>
    )
}
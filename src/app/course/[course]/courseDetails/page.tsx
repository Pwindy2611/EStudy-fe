"use client"
import  Link  from 'next/link';
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";
import  LoadingEvent from "@/app/components/partialView/loadingEvent"

import {getDetailCourse} from "@/service/api/apiCourseRequest"
import { useEffect} from 'react';

import OrderDialog from "@/app/components/courseDetail/dialogOrderCourse"
import  addDotsToCurrency  from "@/lib/utils/currency";

export default function CourseDetail({ params }: { params: {course: string } })
{
  const { course: idCourse } = params;
  const courseId = Number(idCourse);
  const router = useRouter();
  const dispatch = useDispatch();
  const state =useSelector((state: any) => state.ThunkReducer.courses.CourseDetail);

  useEffect(() => {
    getDetailCourse({courseId}, dispatch);
  }, [dispatch, courseId, router.push]);

  const courseDetail = useSelector((state: any) => state.ThunkReducer.courses.CourseDetail?.data?.courseDetail);
  const lastPrice =useSelector((state: any) => state.ThunkReducer.courses.CourseDetail?.data?.finalPrice);
  const amountUser = useSelector((state: any) => state.ThunkReducer.courses.CourseDetail?.data);
  if(state.isFetching==true){
    return <LoadingEvent/>
  }
  else{
    if (!courseDetail || courseId !== courseDetail.courseId) {
      return <div className='w-full py-[60px] text-5xl font-extrabold text-center'>Khoá học không tồn tại</div>;
    }
  }
  
  var coursePrice:string;
  if(courseDetail.coursePrice){
    coursePrice = addDotsToCurrency(courseDetail.coursePrice)+"đ";
  }
  else{
    coursePrice="Free"
  }

  return(
    <div>
    <div className=" items-center justify-center flex">
      <div className=" w-full py-[60px] bg-cover bg-courseDetails rounded-xl px-2">
        <div className=" max-w-[1200px] m-auto grid">
          <h2 className=" text-3xl text-white">
            {courseDetail.courseName}
          </h2>
          <Link href="" className=" my-[10px] text-sm py-[6px] px-[10px] bg-tag-bg-color w-fit text-nav-hover-text-color inline-block rounded-[30px] font-medium no-underline"> {courseDetail.courseTag}</Link>
          <div className=" flex items-center">
            <div className=" flex text-sm text-star-color items-center">
              <span className="mr-2">5</span>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <span className=" text-white mx-2 text-sm">(630 đánh giá)</span>
            <span className=" text-white text-sm mx-2">{amountUser.totalAmount>0?(<span>{amountUser.totalAmount} học viên</span>):(<span>Chưa có học viên nào đăng kí</span>)} </span>
          </div>
          <div className=" mt-[10px] flex flex-col w-full gap-4 justify-center">
            <p className=" text-white text-sm mx-[6px] flex items-center gap-2">
              <i className="fa-solid fa-circle-check text-price-color text-xl"></i> Dành cho
              các bạn từ band 4.0 trở lên.
            </p>
            <p className=" text-white text-sm mx-[6px] flex items-center gap-2">
              <i className="fa-solid fa-circle-check text-price-color text-xl"></i> Sở hữu
              trọn bộ 4 khoá học
              <span className=" italic font-semibold"
                >IELTS Intensive online: Listening - Reading - Writing -
                Speaking</span
              >
            </p>
            <p className=" text-white text-sm mx-[6px] flex items-center gap-2">
              <i className="fa-solid fa-circle-check text-price-color text-xl"></i> Tặng kèm
              khoá
              <span className=" underline font-semibold"
                >Luyện nghe nói tiếng Anh cùng Ted Talks</span
              >
              trị giá 599k
            </p>
            <p className=" text-white text-sm mx-[6px] flex items-center gap-2">
              <i className="fa-solid fa-circle-check text-price-color text-xl"></i> Combo
              khoá học có giá trị 12 tháng
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className=" bg-exam-bg-color mt-10 rounded-xl overflow-hidden">
      <div className="max-w-[1200px] m-auto grid">
        <ul className=" ml-[10px] mt-[20px] list-none flex flex-wrap border-b-[1px] border-b-[#e0e0e0] bg-transparent max-w-full relative">
          <li className=" flex whitespace-nowrap">
            <Link
              href=""
              className=" text-tag-search-transition-color no-underline text-xl p-4 border-b-2 border-b-transparent transition hover:text-primary-bg-color duration-300 ease-in-out hover:border-b-primary-bg-color"
              >Mục tiêu khóa học</Link>
          </li>
          <li className="flex whitespace-nowrap">
            <Link href="" className=" text-tag-search-transition-color no-underline text-xl p-4 border-b-2 border-b-transparent transition hover:text-primary-bg-color duration-300 ease-in-out hover:border-b-primary-bg-color"
              >Thông tin khóa học</Link>
          </li>
          <li className="flex whitespace-nowrap">
            <Link href="" className=" text-tag-search-transition-color no-underline text-xl p-4 border-b-2 border-b-transparent transition hover:text-primary-bg-color duration-300 ease-in-out hover:border-b-primary-bg-color"
              >Chương trình học</Link>
          </li>
          <li className="flex whitespace-nowrap">
            <Link href="" className=" text-tag-search-transition-color no-underline text-xl p-4 border-b-2 border-b-transparent transition hover:text-primary-bg-color duration-300 ease-in-out hover:border-b-primary-bg-color">Đánh giá (630)</Link>
          </li>
        </ul>
        <div className="grid lg:grid-cols-2 md:grid-cols-2">
          <div className="">
            <div className=" p-4 shadow-md border-[1px] border-course-border-color my-5 rounded-[10px]">
              <h2 className=" text-2xl my-4">
                Bạn sẽ đạt được gì sau khoá học?
              </h2>
              <p className=" text-base my-4">
                1️⃣ Đạt mục tiêu tối thiểu 7.0 trong IELTS Reading General
                Training
              </p>
              <p className="text-base my-4">
                2️⃣ Đạt mục tiêu tối thiểu 7.0 trong IELTS Reading General
                Training
              </p>
              <p className="text-base my-4">
                3️⃣ Đạt mục tiêu tối thiểu 7.0 trong IELTS Reading General
                Training
              </p>
              <p className="text-base my-4">
                4️⃣ Đạt mục tiêu tối thiểu 7.0 trong IELTS Reading General
                Training
              </p>
            </div>
            <div className=" p-4 shadow-md border-[1px] border-course-border-color my-5 rounded-[10px]">
              <h2 className=" text-2xl my-4">
                Bạn sẽ đạt được gì sau khoá học?
              </h2>
              <p className=" text-base my-4">
                1️⃣ Đạt mục tiêu tối thiểu 7.0 trong IELTS Reading General
                Training
              </p>
              <p className="text-base my-4">
                2️⃣ Đạt mục tiêu tối thiểu 7.0 trong IELTS Reading General
                Training
              </p>
              <p className="text-base my-4">
                3️⃣ Đạt mục tiêu tối thiểu 7.0 trong IELTS Reading General
                Training
              </p>
              <p className="text-base my-4">
                4️⃣ Đạt mục tiêu tối thiểu 7.0 trong IELTS Reading General
                Training
              </p>
            </div>
            <div className=" p-4 shadow-md border-[1px] border-course-border-color my-5 rounded-[10px]">
              <h2 className=" text-2xl my-4">
                Bạn sẽ đạt được gì sau khoá học?
              </h2>
              <p className=" text-base my-4">
                1️⃣ Đạt mục tiêu tối thiểu 7.0 trong IELTS Reading General
                Training
              </p>
              <p className="text-base my-4">
                2️⃣ Đạt mục tiêu tối thiểu 7.0 trong IELTS Reading General
                Training
              </p>
              <p className="text-base my-4">
                3️⃣ Đạt mục tiêu tối thiểu 7.0 trong IELTS Reading General
                Training
              </p>
              <p className="text-base my-4">
                4️⃣ Đạt mục tiêu tối thiểu 7.0 trong IELTS Reading General
                Training
              </p>
            </div>
            <div className=" p-4 shadow-md border-[1px] border-course-border-color my-5 rounded-[10px]">
              <h2 className=" text-2xl my-4">
                Bạn sẽ đạt được gì sau khoá học?
              </h2>
              <p className=" text-base my-4">
                1️⃣ Đạt mục tiêu tối thiểu 7.0 trong IELTS Reading General
                Training
              </p>
              <p className="text-base my-4">
                2️⃣ Đạt mục tiêu tối thiểu 7.0 trong IELTS Reading General
                Training
              </p>
              <p className="text-base my-4">
                3️⃣ Đạt mục tiêu tối thiểu 7.0 trong IELTS Reading General
                Training
              </p>
              <p className="text-base my-4">
                4️⃣ Đạt mục tiêu tối thiểu 7.0 trong IELTS Reading General
                Training
              </p>
            </div>
            <div className=" p-4 shadow-md border-[1px] border-course-border-color my-5 rounded-[10px]">
              <h2 className=" text-2xl my-4">
                Bạn sẽ đạt được gì sau khoá học?
              </h2>
              <p className=" text-base my-4">
                1️⃣ Đạt mục tiêu tối thiểu 7.0 trong IELTS Reading General
                Training
              </p>
              <p className="text-base my-4">
                2️⃣ Đạt mục tiêu tối thiểu 7.0 trong IELTS Reading General
                Training
              </p>
              <p className="text-base my-4">
                3️⃣ Đạt mục tiêu tối thiểu 7.0 trong IELTS Reading General
                Training
              </p>
              <p className="text-base my-4">
                4️⃣ Đạt mục tiêu tối thiểu 7.0 trong IELTS Reading General
                Training
              </p>
            </div>
        </div>
        <div className="h-fit mt-5 bg-white shadow-xl rounded-[10px]">
          <Image
            width={1000}
            height={1000}
            src="/img/English Doodle Icon Set Vector Download.jpg"
            alt=""
            className=" text-transparent rounded-[10px] w-full"
          />
          <div className=" p-4 border-b-[1px] border-b-course-border-color">
            <h2 className=" text-2xl text-center my-[10px] font-bold">{courseDetail.courseName}</h2>
            <div className=" flex item-center">
              <h3 className=" text-3xl text-price-color font-semibold items-center flex">{addDotsToCurrency(lastPrice)}</h3>
              <div className=" ml-[10px]"> 
                <span className=" block text-sm line-through text-exam-text-color">Giá gốc: {coursePrice}đ</span>
                <span className=" text-sm text-economy-price-text-color font-medium">(-{courseDetail.courseSale}%)</span>
              </div>
            </div>
            <OrderDialog courseId={courseId} CoursesDetail={courseDetail} lastPrice={lastPrice}></OrderDialog>
            <Link href="" className=" text-primary-bg-color border-nav-text-color block mt-[10px] p-[10px] rounded-[10px] no-underline text-base text-center border-[1px] border-transparent"
              >Học thử miễn phí</Link>
          </div>
          <div className="p-4 border-b-[1px] border-b-course-border-color">
            <div className="details__ads">
              <p className=" gap-3 flex items-center text-sm my-[10px]">
                <i className="fa-solid fa-users details__icon-under"></i>{amountUser.totalAmount>0?(<span>{amountUser.totalAmount} học viên đã đăng ký</span>):(<span>Chưa có học viên nào đăng kí</span>)}
              </p>
              <p className=" gap-3 flex items-center text-sm my-[10px]">
                <i className="fa-solid fa-book-open details__icon-under"></i>
                {courseDetail.courseTag}
              </p>
              <p className=" gap-3 flex items-center text-sm my-[10px]">
                <i className="fa-solid fa-pencil details__icon-under"></i>
                1,970 bài tập thực hành
              </p>
              <p className="  gap-3 flex items-center text-sm my-[10px]">
                <i className="fa-solid fa-user-clock details__icon-under"></i>
                Combo 4 khoá học có giá trị 12 tháng
              </p>
              <p className=" gap-3 flex items-center text-sm my-[10px]">
                <i className="fa-solid fa-house-laptop details__icon-under"></i>

                Có thể học trên điện thoại và máy tính
              </p>
            </div>
          </div>
          <div className="p-4 border-b-[1px] border-b-course-border-color">
            <div className=" text-sm text-primary-bg-color"
              >{courseDetail.courseDescription}</div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
  )
}
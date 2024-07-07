"use client" 

import Image from 'next/image';
import  Link  from 'next/link';


import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import GetPoplarCourses from "@/app/components/partialView/getPopularCourse"
import { useSelector } from "react-redux";

const words = `Trang web của chúng tôi cung cấp các khóa học trực tuyến chất lượng cao và dịch vụ thi thử, giúp bạn dễ dàng nâng cao kiến thức và kỹ năng chuyên môn mọi lúc, mọi nơi. Đăng ký ngay hôm nay để tiếp cận hàng loạt khóa học đa dạng, từ cơ bản đến nâng cao, được thiết kế bởi các chuyên gia hàng đầu trong ngành. Trải nghiệm dịch vụ thi thử chuyên nghiệp để đánh giá và cải thiện hiệu suất học tập của bạn một cách hiệu quả nhất !
`;

export default function Home() {
  const user = useSelector((state: any) => state.persistedReducer.auth.login.data);
  const infoUser=useSelector((state: any) => state.persistedReducer.auth.getAllInfoUser?.data?.user);

  return (
    <div className='max-w-[1440px] max-2xl:max-w-7xl max-xl:max-w-5xl m-auto'>
      <div className="flex gap-5 items-center px-3">
        <div className='w-3/6 flex flex-col justify-start gap-3'>
          <span className=' font-semibold text-5xl text-black tracking-wide'>Welcome to the</span>
          <span className='font-semibold text-5xl text-primary-bg-color tracking-wide'>Learning English</span>
          <span ><TextGenerateEffect words={words} /></span>
          <Link href={user||infoUser ? "\profile":"/register"} className='mt-7 ml-16 w-fit group cursor-pointer px-[20px] py-[8px] bg-primary-bg-color rounded-md hover:bg-white border-[1px] border-transparent hover:border-primary-bg-color duration-75 shadow-md ease-linear'>
            <span  className=" group-hover:text-primary-bg-color text-base no-underline font-medium text-white tracking-wide">{user||infoUser ? "KHOÁ HỌC CỦA TÔI":"BẮT ĐẦU"} </span>
          </Link>
        </div>
        <Image
          width={100}
          height={100}
          src="/img/.svg/Certification.svg"
          alt=""
          className=" w-3/6 "
        />
      </div>
      <div className=" max-w-full mt-20">
        <div className="">
          <h2 className=" font-semibold text-3xl text-center text-[#17165B]">Đề thi mới nhất</h2>
          <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-14 mt-16">
            <div className='shadow-xl hover:shadow-2xl transition duration-300 ease-in bg-white/55 rounded-lg px-4'>
              <Link
                href="#"
                className=" no-underline text-black ">
                <div className=" p-3 flex flex-col items-center">
                  <Image
                    width={100}
                    height={100}
                    src="/img/.svg/classroom.svg"
                    alt=""
                    className=" w-full p-3"
                  />
                  <h4 className=" text-xl font-medium text-center mt-4 tracking-wide">
                    IELTS Simulation Listening test 1
                  </h4>
                  <div className=" flex flex-col w-full text-sm text-exam-text-color my-4 items-center">
                    <div className='w-full flex items-center justify-between'>
                      <div className=' flex gap-2 items-center'>
                        <i className="fa-regular fa-clock"></i>
                        <span className=" text-sm text-slate-700 font-semibold">40 phút</span>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <i className="fa-solid fa-user-pen"></i>
                        <span className="text-sm text-slate-700 font-semibold">297723</span>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <i className="fa-regular fa-comment"></i>
                        <span className="text-sm text-slate-700 font-semibold">993</span>
                      </div>
                    </div>
                    <div>
                    </div>
                  </div>
                  <div className=" flex gap-6">
                    <div className=" rounded-md bg-[#F4EEFA] text-sm p-2 text-[#A482D6] inline-block">#IELTS Academic</div>
                    <div className=" rounded-md bg-[#E6F4FF] text-sm p-2 text-[#1A9BFC] inline-block">#Listening</div>
                  </div>
                  <div className=' group mt-4'>
                    <button className=" hover:bg-slate-100 px-5 py-2 cursor-pointer bg-transparent rounded-full border-[2px] border-[#C0E3EB] text-lg flex items-center gap-4">Chi tiết
                    <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </Link>
            </div>
            <div className='shadow-xl hover:shadow-2xl transition duration-300 ease-in bg-white/55 rounded-lg px-4'>
              <Link
                href="#"
                className=" no-underline text-black ">
                <div className=" p-3 flex flex-col items-center">
                  <Image
                    width={100}
                    height={100}
                    src="/img/.svg/desk.svg"
                    alt=""
                    className=" w-full p-3"
                  />
                  <h4 className=" text-xl font-medium text-center mt-4 tracking-wide">
                    IELTS Simulation Listening test 1
                  </h4>
                  <div className=" flex flex-col w-full text-sm text-exam-text-color my-4 items-center">
                    <div className='w-full flex items-center justify-between'>
                      <div className=' flex gap-2 items-center'>
                        <i className="fa-regular fa-clock"></i>
                        <span className=" text-sm text-slate-700 font-semibold">40 phút</span>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <i className="fa-solid fa-user-pen"></i>
                        <span className="text-sm text-slate-700 font-semibold">297723</span>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <i className="fa-regular fa-comment"></i>
                        <span className="text-sm text-slate-700 font-semibold">993</span>
                      </div>
                    </div>
                    <div>
                    </div>
                  </div>
                  <div className=" flex gap-6">
                    <div className=" rounded-md bg-[#F4EEFA] text-sm p-2 text-[#A482D6] inline-block">#IELTS Academic</div>
                    <div className=" rounded-md bg-[#E6F4FF] text-sm p-2 text-[#1A9BFC] inline-block">#Listening</div>
                  </div>
                  <div className=' group mt-4'>
                    <button className=" hover:bg-slate-100 px-5 py-2 cursor-pointer bg-transparent rounded-full border-[2px] border-[#C0E3EB] text-lg flex items-center gap-4">Chi tiết
                    <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </Link>
            </div>
            <div className='shadow-xl hover:shadow-2xl transition duration-300 ease-in bg-white/55 rounded-lg px-4'>
              <Link
                href="#"
                className=" no-underline text-black ">
                <div className=" p-3 flex flex-col items-center">
                  <Image
                    width={100}
                    height={100}
                    src="/img/.svg/grammar.svg"
                    alt=""
                    className=" w-full p-3"
                  />
                   <h4 className=" text-xl font-medium text-center mt-4 tracking-wide">
                    IELTS Simulation Listening test 1
                  </h4>
                  <div className=" flex flex-col w-full text-sm text-exam-text-color my-4 items-center">
                    <div className='w-full flex items-center justify-between'>
                      <div className=' flex gap-2 items-center'>
                        <i className="fa-regular fa-clock"></i>
                        <span className=" text-sm text-slate-700 font-semibold">40 phút</span>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <i className="fa-solid fa-user-pen"></i>
                        <span className="text-sm text-slate-700 font-semibold">297723</span>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <i className="fa-regular fa-comment"></i>
                        <span className="text-sm text-slate-700 font-semibold">993</span>
                      </div>
                    </div>
                    <div>
                    </div>
                  </div>
                  <div className=" flex gap-6">
                    <div className=" rounded-md bg-[#F4EEFA] text-sm p-2 text-[#A482D6] inline-block">#IELTS Academic</div>
                    <div className=" rounded-md bg-[#E6F4FF] text-sm p-2 text-[#1A9BFC] inline-block">#Listening</div>
                  </div>
                  <div className=' group mt-4'>
                    <button className=" hover:bg-slate-100 px-5 py-2 cursor-pointer bg-transparent rounded-full border-[2px] border-[#C0E3EB] text-lg flex items-center gap-4">Chi tiết
                    <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </Link>
            </div>
            <div className='shadow-xl hover:shadow-2xl transition duration-300 ease-in bg-white/55 rounded-lg px-4'>
              <Link
                href="#"
                className="no-underline text-black ">
                <div className=" p-3 flex flex-col items-center">
                  <Image
                    width={100}
                    height={100}
                    src="/img/.svg/program.svg"
                    alt=""
                    className=" w-full p-3"
                  />
                  <h4 className=" text-xl font-medium text-center mt-4 tracking-wide">
                    IELTS Simulation Listening test 1
                  </h4>
                  <div className=" flex flex-col w-full text-sm text-exam-text-color my-4 items-center">
                    <div className='w-full flex items-center justify-between'>
                      <div className=' flex gap-2 items-center'>
                        <i className="fa-regular fa-clock"></i>
                        <span className=" text-sm text-slate-700 font-semibold">40 phút</span>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <i className="fa-solid fa-user-pen"></i>
                        <span className="text-sm text-slate-700 font-semibold">297723</span>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <i className="fa-regular fa-comment"></i>
                        <span className="text-sm text-slate-700 font-semibold">993</span>
                      </div>
                    </div>
                    <div>
                    </div>
                  </div>
                  <div className=" flex gap-6">
                    <div className=" rounded-md bg-[#F4EEFA] text-sm p-2 text-[#A482D6] inline-block">#IELTS Academic</div>
                    <div className=" rounded-md bg-[#E6F4FF] text-sm p-2 text-[#1A9BFC] inline-block">#Listening</div>
                  </div>
                  <div className=' group mt-4'>
                    <button className=" hover:bg-slate-100 px-5 py-2 cursor-pointer bg-transparent rounded-full border-[2px] border-[#C0E3EB] text-lg flex items-center gap-4">Chi tiết
                    <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="relative my-[150px] w-screen rounded-3xl left-1/2 transform -translate-x-1/2 bg-[#F5F5FD]  p-16">
            <GetPoplarCourses></GetPoplarCourses>
          </div>
        </div>
      </div>
    </div>
  );
}

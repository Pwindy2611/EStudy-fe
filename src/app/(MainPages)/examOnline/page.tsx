import Image from "next/image";
import  Link  from 'next/link';

import GetAllExams from "./getAllExam"
export default function ExamOnline()
{
    return(
    <div className="pt-10 max-w-[1440px] max-2xl:max-w-7xl max-xl:max-w-5xl m-auto">
      <div className=" pt-[60px] bg-exam-bg-color shadow-md rounded-2xl">
      <div className=" flex flex-col items-center">
        <h1 className="px-[16px] text-3xl font-semibold">Thư viện đề TOEIC</h1>
        <div className=" mt-[30px] p-2">
        </div>
      </div>
    </div>
    <div className="relative p-16">
     <GetAllExams></GetAllExams> 
    </div>
      </div>
    )
}
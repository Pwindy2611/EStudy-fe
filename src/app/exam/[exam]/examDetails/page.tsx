"use client"
import  Link  from 'next/link';
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";
import  LoadingEvent from "@/app/components/partialView/loadingEvent"

import {getDetailExam} from "@/service/api/apiExamRequest"
import { useEffect} from 'react';
import { Bounce, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export default function ExamDetail({ params }: { params: {exam: string } })
{
  const user = useSelector((state:any) => state.persistedReducer.auth.login.data);
  const { exam: idExam } = params;
  const examId = idExam;
  const router = useRouter();
  const dispatch = useDispatch();
  const state =useSelector((state: any) => state.ThunkReducer.exam.detailExam);
  const userExam=useSelector((state: any) => state.ThunkReducer.exam.detailExam?.data?.userExamResponse);

  useEffect(() => {
    if(!user){
      console.log("dsadAS")
      toast.info('Hãy đăng nhập tài khoản !', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      router.push("/login");
    }
    else{
    getDetailExam({examId,userId:user.user.userId}, dispatch);
    }
  }, [dispatch, examId, router.push]);

  const ExamDetail = useSelector((state: any) => state.ThunkReducer.exam.detailExam?.data?.exams);

  if(state.isFetching==true){
    return <LoadingEvent/>
  }
  else{
    if (!ExamDetail || examId !== ExamDetail.examId) {
      return <div className='w-full py-[60px] text-5xl font-extrabold text-center'>Đề thi không tồn tại</div>;
    }
  }
  

  return(
    <div className="flashcard__content pt-8 pb-48">
    <div className="">
      <div className=" flex w-full">
        <div className=" m-auto max-w-[800px]">
          <div className="testOnline__box">
            <div className=" bg-[#eee] p-[5px] rounded-[30px] text-black font-normal w-fit">#TOEIC</div>
            <h2 className="testOnline__header">
              {ExamDetail.examName}
            </h2>
            <p className="testOnline__description">
              Thời gian làm bài: 120 phút | 7 phần thi | 200 câu hỏi 
            </p>
            <p className="testOnline__description">
              {state.data.totalUsers} người đã luyện tập đề thi này
              và có {state.data.totalAmountTest} lượt làm đề thi
            </p>
            <p className="testOnline__aleart">
              Chú ý: để được quy đổi sang scaled score (ví dụ trên thang
              điểm 990 cho TOEIC hoặc 9.0 cho IELTS), vui lòng chọn chế độ
              làm FULL TEST.
            </p>
            {userExam &&(
               <table className="min-w-full my-6 bg-white border border-gray-200">
               <thead>
                 <tr>
                   <th className="py-2 px-4 border-b border-gray-200 text-left">Ngày làm</th>
                   <th className="py-2 px-4 border-b border-gray-200 text-left">Kết quả</th>
                   <th className="py-2 px-4 border-b border-gray-200 text-left">Thời gian làm bài</th>
                   <th className="py-2 px-4 border-b border-gray-200 text-left">Chi tiết</th>
                 </tr>
               </thead>
               <tbody>{
               userExam?.map((detail:any)=>(
                <tr key={detail.userExamId} >
                <td className="py-2 px-4 border-b border-gray-200 flex items-center">
                  {detail.dateTime}
                  <span className="ml-2 text-xs bg-green-500 text-white rounded-full px-2 py-1">Full test</span>
                </td>
                <td className="py-2 px-4 border-b border-gray-200">(Điểm: {detail.score})</td>
                <td className="py-2 px-4 border-b border-gray-200">{detail.userTime}</td>
                <Link href={`/exam/${detail.userExamId}/examRevision`}>
                <td className="py-2 px-4 border-b border-gray-200 text-blue-500 hover:underline cursor-pointer">Xem chi tiết</td>
                </Link>
              </tr>
              ))}
                </tbody>
                </table>
            )}
            <div className=" bg-[#d8f0e2] border-[1px] border-[#c8ead6] text-[#1f5e39] p-[10px] rounded-[10px] text-base my-[20px]">
              <div className="">
              <i className="fa-regular fa-lightbulb pr-2"></i>
              Pro tips: Hình thức luyện tập từng phần và chọn mức thời gian phù hợp sẽ giúp bạn tập trung vào giải đúng các câu hỏi thay vì phải chịu áp lực hoàn thành bài thi.
              </div>
            </div>
            <Link href={`/exam/${ExamDetail.examId}/testExam`} className=" py-3 inline-block px-3 bg-primary-bg-color text-white hover:text-primary-bg-color text-md font-medium hover:bg-white border-transparent border-[1px] rounded-lg hover:border-primary-bg-color transition duration-200 ease-in-out"
              >BẮT ĐẦU THI</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
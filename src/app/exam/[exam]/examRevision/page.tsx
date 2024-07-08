"use client"
import { getExamRevision } from "@/service/api/apiExamRequest";
import  Link  from 'next/link';
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingContent from "@/app/components/partialView/loadingContent";
import {BoxRevision} from "@/app/components/partialView/boxRevision"

export default function RevisionExam({ params }: { params: {exam: string } }) {
    const { exam: idExam } = params;
    const userExamId = idExam;
    const dispatch = useDispatch();
    const revisionList = useSelector((state:any) => state.ThunkReducer.exam.examRevision?.data?.questions);
    const examName = useSelector((state:any) => state.ThunkReducer.exam.examRevision?.data?.examInfo?.examName);
    const examAudio = useSelector((state:any) => state.ThunkReducer.exam.examRevision?.data?.examInfo?.examAudio);
    console.log(examName)
    const [isFetching, setIsFetching]= useState<boolean>(true);

    useEffect(() => {
        getExamRevision(userExamId, dispatch).finally(() => {
            setTimeout(() => setIsFetching(false), 2000); }); 
    }, [dispatch, userExamId,examName]);

    const getCorrectAnswersCount = () => {
        return revisionList ? revisionList.filter((question:any) => question.state && question.userAnswer === question.correctAnswer).length : 0;
    };

    const getIncorrectAnswersCount = () => {
        return revisionList ? revisionList.filter((question:any) => question.userAnswer && question.userAnswer !== question.correctAnswer).length : 0;
    };

    const getUnansweredCount = () => {
        return revisionList ? revisionList.filter((question:any) => !question.userAnswer).length : 0;
    };


    if(isFetching){
        return <LoadingContent></LoadingContent>
    }
    return (
        <div className="p-6 bg-white">
            <div className=" max-w-[800px] mb-16 m-auto bg-[#d8f0e2] border-[1px] border-[#c8ead6] text-[#1f5e39] p-[10px] rounded-[10px] text-base my-[20px]">
                <i className="fa-regular fa-lightbulb pr-2"></i>
                Tips: Khi xem chi tiết đáp án, bạn có thể tạo và lưu highlight từ vựng, keywords và tạo note để học và tra cứu khi có nhu cầu ôn lại đề thi này trong tương lai.
            </div>

            <div className=" max-w-[700px] m-auto grid grid-cols-3 max-[600px]:grid-cols-2 max-[460px]:grid-cols-1 gap-4 justify-center mb-16">
                <div className=" flex flex-col justify-center items-center  bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                    <div className="text-green-500 text-2xl mb-2">✔</div>
                    <p className="text-lg font-semibold text-gray-900">Trả lời đúng</p>
                    <p className="text-xl font-bold text-gray-900">{getCorrectAnswersCount()}</p>
                    <p className="text-sm text-gray-500">câu hỏi</p>
                </div>
                <div className=" flex flex-col justify-center items-center bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                    <div className="text-red-500 text-2xl mb-2">✘</div>
                    <p className="text-lg font-semibold text-gray-900">Trả lời sai</p>
                    <p className="text-xl font-bold text-gray-900">{getIncorrectAnswersCount()}</p>
                    <p className="text-sm text-gray-500">câu hỏi</p>
                </div>
                <div className=" flex flex-col  justify-center items-center bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                    <div className="text-gray-500 text-2xl mb-2">—</div>
                    <p className="text-lg font-semibold text-gray-900">Bỏ qua</p>
                    <p className="text-xl font-bold text-gray-900">{getUnansweredCount()}</p>
                    <p className="text-sm text-gray-500">câu hỏi</p>
                </div>
            </div>

            <div className="my-5 grid grid-cols-3 m-auto gap-8 max-[860px]:grid-cols-2 max-[600px]:grid-cols-1">
                {revisionList && revisionList.map((question:any, index:any) => (
                    <div key={question.questionId} className="flex justify-center items-center">
                        <span className='aspect-square mr-2 w-11 h-11 p-1 flex items-center justify-center bg-blue-200 text-black font-medium text-lg rounded-full'>
                            {index + 1}
                        </span>
                        <span className="mr-2">{question.correctAnswer}:</span>
                        <span className={`mr-2 ${question.userAnswer ? 'line-through' : ''}`}>
                            {question.userAnswer || "chưa trả lời"}
                        </span>
                        <span className={`mr-2 ${!question.userAnswer ? 'line-through' : question.state ? 'text-green-500' : 'text-red-500'}`}>
                            {!question.userAnswer ? '—' : question.state ? '✔' : '✘'}
                        </span>
                        <BoxRevision examName={examName} ObjectAnswer={question} examAudio={examAudio}></BoxRevision>
                    </div>
                ))}
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import {getCompleteExam } from '@/service/api/apiExamRequest'; 

import { Bounce, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface examDialogProps {
  examId:any;
}

const ExamDialog: React.FC<examDialogProps> = ({examId}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: any) => state.persistedReducer?.auth?.login?.data);
  

  const submit = async () => {
    const idToast=toast.loading('Đang xác nhận...', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    const storedAnswers = JSON.parse(sessionStorage.getItem('answerTest') || '{}');
    const time= JSON.parse(sessionStorage.getItem('countdown')||'{}');
    const answersToSend = Object.keys(storedAnswers).map(key => ({
        QuestionId: parseInt(key), 
        Answer: storedAnswers[key].Answer,
        State: storedAnswers[key].State
    }));

    const data = {
        examId: examId,
        userId: user.user.userId,
        score: 0,
        answer: answersToSend,
        userTime:time
    };

    const rest = await getCompleteExam(data,dispatch)
    if(rest==200){
      sessionStorage.removeItem('answerTest');
      sessionStorage.removeItem('countdown');
         toast.update(idToast, {
        render:'Nộp bài thành công!',
        type: "success", 
        isLoading: false ,
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
      router.push(`/exam/${examId}/examDetails`)
    }
    else{
        toast.update(idToast, {
            render:'Nộp bài thất bại!',
            type: "error", 
            isLoading: false ,
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
    }
   
};

  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button >Nộp bài</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Bạn muốn nộp bài ?</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
      <AlertDialogCancel className=' bg-slate-300 w-full text-black block mt-[10px] p-[10px] rounded-[10px] no-underline text-base text-center border-[1px] border-transparent'>Huỷ</AlertDialogCancel>
            <AlertDialogAction onClick={submit}
             className="bg-primary-bg-color w-full text-white block mt-[10px] p-[10px] rounded-[10px] no-underline text-base text-center border-[1px] border-transparent" 
            > Tiếp tục</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default ExamDialog;

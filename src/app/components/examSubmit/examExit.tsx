import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import {getCompleteExam } from '@/service/api/apiExamRequest'; 

import { Bounce, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface examExitDialogProps {
  examId:any;
}

const ExamExitDialog: React.FC<examExitDialogProps> = ({examId}) => {
  const router = useRouter();
  
  const submit = async () => {
     sessionStorage.removeItem('answerTest');
     sessionStorage.removeItem('countdown');
         toast.info('Thoát thành công!', {
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
};

  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
      <button  className=" inline-block text-base text-black border-[1px] border-primary-bg-color bg-slate-100 rounded-xl ml-[10px] font-semibold p-2 hover:bg-primary-bg-color hover:text-white transition duration-300 ease-in-out" >Thoát</button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Bạn muốn thoát và không lưu bài làm ?</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
      <AlertDialogCancel className=' bg-slate-300 w-full text-black block mt-[10px] p-[10px] rounded-[10px] no-underline text-base text-center border-[1px] border-transparent'>Huỷ</AlertDialogCancel>
            <AlertDialogAction onClick={submit}
             className="bg-primary-bg-color w-full text-white block mt-[10px] p-[10px] rounded-[10px] no-underline text-base text-center border-[1px] border-transparent" 
            >Xác nhận</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default ExamExitDialog;

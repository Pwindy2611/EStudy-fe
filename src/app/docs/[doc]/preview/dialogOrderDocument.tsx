import React, { useState } from 'react';
import { Button } from "@/components/ui/buttonDocument";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { FaDownload, FaExpand } from 'react-icons/fa';
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


import { RequestApiOrderDocument } from "@/service/api/apiOrderRequest";
import Image from 'next/image';

import { Bounce, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface OrderDialogProps {
  documentId: number;
  documentName: string;
  documentPrice: number;
  documentDes:string;
  documentPublic:boolean;
}

const OrderDialog: React.FC<OrderDialogProps> = ({ documentId,documentDes,documentName,documentPrice ,documentPublic}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: any) => state.persistedReducer.auth.getAllInfoUser?.data?.user);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const checkUser = () => {
    if (!user) {
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
  }

  const handleOrder = async () => {
    setIsSubmitting(true); 
    const dataOrder = {
      userId: user.userId,
      documentId: documentId,
    };
   const idToast=toast.loading('Đang chuyển hướng đến trang Momo....', {
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
    try {
      const paymentSuccess = await RequestApiOrderDocument(dataOrder, dispatch,documentPrice,documentId,documentName, user.userId, router.push);
      if (paymentSuccess) {
        toast.update(idToast, {
          render: 'Chuyển hướng thành công!',
          type: "success",
          isLoading: false,
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.update(idToast, {
          render: 'Chuyển hướng thất bại!',
          type: "error",
          isLoading: false,
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (err) {
      toast.update(idToast, {
        render: 'Chuyển hướng thất bại!',
        type: "error",
        isLoading: false,
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
    setIsSubmitting(false); 
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button onClick={checkUser}><FaDownload className="mr-2" /> Download now</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[490px] p-0 overflow-hidden">
        <AlertDialogHeader className='bg-primary-bg-color p-4'>
          <AlertDialogTitle className='text-lg'>{documentName}</AlertDialogTitle>
          <AlertDialogDescription className='text-black text-base'>
          {documentDes}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className=' px-6 flex justify-between gap-28 items-center'>
          <p className='text-black text-base font-semibold'>Tổng :</p>
          <div className='flex flex-col gap-3'>
               <p className='text-black text-base font-semibold'>Thanh toán {documentPrice} đ</p>
                <Image className='ml-auto' alt="momo" src={'https://paymentsdk.spotifycdn.com/svg/providers/momo.svg'} width={20} height={20} quality={100}></Image>
          </div>
       
        </div>
        <div className='flex gap-32 justify-between items-center p-5'>
           <AlertDialogCancel className=' bg-slate-300 w-full text-black block mt-[10px] p-[10px] rounded-[10px] no-underline text-base text-center border-[1px] border-transparent'>Cancel</AlertDialogCancel>
            <AlertDialogAction
             className="bg-primary-bg-color w-full text-white block mt-[10px] p-[10px] rounded-[10px] no-underline text-base text-center border-[1px] border-transparent" 
             onClick={handleOrder}
            > Mua ngay
            </AlertDialogAction>
        </div>
           
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default OrderDialog;

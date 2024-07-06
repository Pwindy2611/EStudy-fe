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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
  } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { OrderCourseBody, OrderCourseBodyType } from '@/schemaValidate/orderCourse.schema'

import { RequestApiOrder } from "@/service/api/apiOrderRequest";

import { Bounce, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface OrderDialogProps {
  courseId: number;
  CoursesDetail: any;
  lastPrice: number;
}

const OrderDialog: React.FC<OrderDialogProps> = ({ courseId, CoursesDetail,lastPrice }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: any) => state.persistedReducer?.auth?.login?.data?.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<OrderCourseBodyType>({
    resolver: zodResolver(OrderCourseBody),
    defaultValues: {
      address: '',
      email: ''
    }
  });

  const checkUser = () => {
    if (!user) {
      router.push("/login");
    }
  }

  const handleOrder = async (values: OrderCourseBodyType) => {
    setIsSubmitting(true); 
    const { address, email } = values;
    const dataOrder = {
      UserId: user.userId,
      CourseId: courseId,
      Address: address,
      TotalAmount: CoursesDetail.coursePrice,
      Email: email,
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
    const res = await RequestApiOrder(dataOrder, dispatch,lastPrice, CoursesDetail, user.userId, router.push);
    console.log(res)
    if(res?.status ==400){
      toast.update(idToast, { 
        render:'Chuyển hướng thất bại !',
         type: "error", 
         isLoading: false ,
         position: "bottom-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
         transition: Bounce,});
    }
    else{
      toast.update(idToast, { 
        render:'Chuyển hướng thành công !',
         type: "success", 
         isLoading: false ,
         position: "bottom-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
         transition: Bounce,});
    }
    setIsSubmitting(false); 
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button onClick={checkUser}>ĐĂNG KÝ HỌC NGAY</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[490px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Thanh toán khoá học</AlertDialogTitle>
          <AlertDialogDescription>
          Mua khoá học: {CoursesDetail.courseName}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleOrder)} noValidate>
            <div className="grid gap-4 py-4">
              <div className="grid items-center gap-4">
                <Label htmlFor="phone" className="text-left">
                  Email
                </Label>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="col-span-3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid items-center gap-4">
                <Label htmlFor="address" className="text-left">
                  Address
                </Label>
                <FormField
                  control={form.control}
                  name='address'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="col-span-3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <AlertDialogFooter>
            <AlertDialogCancel className=' bg-slate-300 w-full text-black block mt-[10px] p-[10px] rounded-[10px] no-underline text-base text-center border-[1px] border-transparent'>Cancel</AlertDialogCancel>
            <AlertDialogAction
             className="bg-primary-bg-color w-full text-white block mt-[10px] p-[10px] rounded-[10px] no-underline text-base text-center border-[1px] border-transparent" 
             type="submit" 
             disabled={isSubmitting}
            > ĐẶT HÀNG NGAY</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default OrderDialog;

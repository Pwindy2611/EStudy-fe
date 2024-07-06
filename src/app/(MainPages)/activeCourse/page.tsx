"use client"
import  Link  from 'next/link';
import { useSelector } from "react-redux";
import {ActiveCodeCourse} from "@/service/api/apiOrderRequest"
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {ActiveCode,ActiveCodeType} from '@/schemaValidate/orderCourse.schema'
import { Bounce, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function ActiveCourse()
{
  const user = useSelector((state:any)=> state.persistedReducer.auth.login?.data);
  const form = useForm<ActiveCodeType>({
    resolver: zodResolver(ActiveCode),
    defaultValues: {
      code: ''
    }
  });

  const handleActive = async (values: ActiveCodeType) => {
    const idToast =  toast.loading('Kiểm tra mã kích hoạt...', {
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
    if(user){
      const codeActive=values;
      const dataReq={
        userId:user.user.userId,
        code: codeActive.code
      }
      const res=await ActiveCodeCourse(dataReq);
      if(res.status===200){
        toast.update(idToast, {
          render:'Kích hoạt thành công !',
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
      }
      else{
        toast.update(idToast, {
          render:'Kích hoạt thất bại !',
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
          transition: Bounce,
        });
      }
    }
    else{
      toast.update(idToast, {
        render:'Bạn chưa đăng nhập !',
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
        transition: Bounce,
      });
    }
  }

    return(
        <div >
      <div className="pt-10 flex mx-[40px] items-center justify-center">
        <div className=" w-[600px] px-[60px] py-[30px] border-[1px] border-course-border-color rounded-xl shadow-md">
          <h3 className="text-4xl font-medium">Kích hoạt khoá học</h3>
          <p className=" text-base font-medium my-[10px]">Mã kích hoạt</p>
          <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleActive)}
            className='flex flex-col'
            noValidate
          >
            <FormField
              control={form.control}
              name='code'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Nhập mã kích hoạt' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button type='submit' className=" w-full block text-center group cursor-pointer my-5 py-[10px] bg-primary-bg-color rounded-md hover:bg-white border-[1px] border-transparent hover:border-primary-bg-color duration-75 shadow-md ease-linear">
            <span  className=" group-hover:text-primary-bg-color text-lg font-medium no-underline text-white tracking-wide">Kích hoạt</span>
            </button>
          </form>
        </Form>
        </div>
      </div>
    </div>
    )
}
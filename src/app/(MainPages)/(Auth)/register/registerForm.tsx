"use client"
import  Link  from 'next/link';
import React, { useState,useEffect} from 'react';
import { useDispatch} from "react-redux";
import { useRouter } from 'next/navigation';
import { registerUser } from  "@/service/api/apiAuthRequest";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { initializeFacebookSDK } from '@/lib/utils/facebookSDK';
import {handleFacebookLogin} from "@/service/socialConnect/authFacebookService"
import {handleGoogleLogin} from "@/service/socialConnect/authGoogleService"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RegisterBody, RegisterBodyType } from '@/schemaValidate/auth.schema'
import TextTitle from './textTitle';

import { Bounce, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export default function RegisterForm(){
    const dispatch = useDispatch();
    const navigate = useRouter();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    useEffect(() => {
      initializeFacebookSDK();
      if (window.FB) {
        console.log('Facebook SDK đã được khởi tạo.');
      } else {
        console.error('Facebook SDK không được khởi tạo.');
      }
    }, []);

    const form = useForm<RegisterBodyType>({
      resolver: zodResolver(RegisterBody),
      defaultValues: {
        email: '',
        username: '',
        phone:'',
        password: '',
        confirmPassword: ''
      }
    })

    const handleRegister = async (values:RegisterBodyType)=>{
      const idToast =  toast.loading('Đang tạo tài khoản ...', {
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
        const { email, password, username} = values;
        const newUser = {
          UserEmail: email,
          UserPassword:password,
          UserName:username,
        };
       const toastRes= await registerUser(newUser,dispatch);
        if(toastRes?.status!=200 &&toastRes?.status){
        toast.update(idToast, {
        render:'Tạo tài khoản thất bại, '+toastRes?.data + '!',
        type: "error", 
        isLoading: false ,
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:"colored",
        transition: Bounce,
          });
        }
        else{
          toast.update(idToast, {
            render:'Tạo tài khoản thành công !',
            type: "success", 
            isLoading: false ,
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme:"colored",
            transition: Bounce,
              });
            toast.warn(`Chúng tôi đã gửi đường dẫn xác thực đến email của bạn, hãy kiểm tra !`, {
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
              toast.info('Đường dẫn sẽ hết hiệu lực sau 1 phút', {
                position: "bottom-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
              sessionStorage.setItem('registeredEmail', email);
              navigate.push('/login');
        }

      }

    return(
        <div className="pt-10 mx-10 flex items-center justify-center">
        <div className="bg-white/35 w-[600px] px-[60px] py-[30px] rounded-lg shadow-xl">
            <TextTitle></TextTitle>
          <Form {...form}>
            <form
            className='flex flex-col'
              onSubmit={form.handleSubmit(handleRegister)}
              noValidate>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <p className="text-base font-medium mt-5 mb-1">Email</p>
                  <FormControl>
                    <Input placeholder='Nhập email' type='email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <p className=" text-base font-medium mt-5 mb-1">Số điện thoại</p>
                  <FormControl>
                    <Input placeholder='Nhập số điện thoại'{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <p className="text-base font-medium mt-5 mb-1">Tên đăng nhập</p>
                  <FormControl>
                    <Input placeholder='Nhập tên đăng nhập' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <p className="text-base font-medium mt-5 mb-1">Mật khẩu</p>
                  <FormControl>
                  <div className="relative">
                      <Input placeholder='Nhập mật khẩu' type={passwordVisible ? 'text' : 'password'} {...field} />
                      <button type='button'
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() => setPasswordVisible(!passwordVisible)} 
                      >
                        {passwordVisible ? '🐵':'🙈' }
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <p className="text-base font-medium mt-5 mb-1">Xác nhận mật khẩu</p>
                  <FormControl>
                  <div className="relative">
                      <Input placeholder='Xác nhận mật khẩu' type={confirmPasswordVisible ? 'text' : 'password'} {...field} />
                      <button type='button'
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                      >
                        {confirmPasswordVisible ? '🐵':'🙈'}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button type='submit' className=' w-40 m-auto bg-primary-bg-color text-white  text-lg font-medium my-6 hover:bg-primary-bg-color-hover transition duration-150 ease-in-out text-center  no-underline py-2 rounded-[6px] border-none'>
              Đăng ký
            </button>
          </form>
          </Form>
          <div className=' m-auto w-4/5 flex items-center justify-center gap-3'>
            <hr className=' w-full'></hr>
            <span className=' text-lg font-normal text-slate-300'>Or</span>
            <hr className='w-full'></hr>
          </div>
        <button onClick={()=>handleFacebookLogin(dispatch,navigate)} onKeyUp={()=>handleFacebookLogin(dispatch,navigate)} className=" flex justify-center items-center gap-3 hover:bg-slate-100 transition duration-500 ease-in-out text-slate-400 mt-3 w-full px-3 py-2 border-[2px] border-slate-300 rounded no-underline text-base font-normal text-center"
        >
          <i className="fa-brands fa-facebook text-2xl text-blue-500"></i>
          <span>Đăng kí với Facebook</span></button>
            <br />
            <button onClick={()=>handleGoogleLogin(dispatch,navigate)} onKeyUp={()=>handleGoogleLogin(dispatch,navigate)} data-onsuccess="onSignIn" className="flex justify-center items-center gap-3 hover:bg-slate-100 transition duration-500 ease-in-out text-slate-400 mt-3 w-full px-3 py-2 border-[2px] border-slate-300 rounded no-underline text-base font-normal text-center"
              >
                <i className="fa-brands fa-google text-2xl text-red-500"></i>
                <span>Đăng kí với Google</span></button>
        <br />
        <div className='flex items-center gap-1 justify-center mt-[20px] no-underline text-black text-base '>
          <span>Bạn đã có tài khoản?</span>
          <Link href="/login" className="hover:underline transition duration-300 ease-in-out hover:text-primary-bg-color"
          > Đăng nhập ngay</Link>
        </div>
        </div>
      </div>
    )
}
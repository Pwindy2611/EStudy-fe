"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { loginUser,forgotPassword} from "@/service/api/apiAuthRequest";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormGetValues } from 'react-hook-form';
import { initializeFacebookSDK } from '@/lib/utils/facebookSDK';
import { loadGoogleSdk } from '@/lib/utils/googleSDK';
import {handleFacebookLogin} from "@/service/socialConnect/authFacebookService"
import {handleGoogleLogin} from "@/service/socialConnect/authGoogleService"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginBody, LoginBodyType } from '@/schemaValidate/auth.schema';
import TextTitle from './textTitle';
import { Bounce, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import CountdownTimer from '@/app/components/partialView/CountdownTimer';

export default function LoginForm() {
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange',
  });

  const {
    formState: { errors, isValid },
  } = form;
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [showCountdown, setShowCountdown] = useState(false);
  const [showResendCode, setShowResendCode] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  useEffect(() => {
    if (!isValid && Object.keys(errors).length > 0) {
      setConfirmPasswordVisible(true);
    }
  }, [isValid, errors,confirmPasswordVisible]);

  useEffect(() => {
    initializeFacebookSDK();
    if (window.FB) {
      console.log('Facebook SDK đã được khởi tạo.');
    } else {
      console.error('Facebook SDK không được khởi tạo.');
    }

    loadGoogleSdk();
    
    const countdownEndTime = sessionStorage.getItem('countdownEndTime');
    if (countdownEndTime && new Date().getTime() < Number(countdownEndTime)) {
      setShowCountdown(true);
    }
  }, []);

  const handleLogin = async (values: LoginBodyType) => {
    const { email, password } = values;
    const newUser = {
      UserEmail: email,
      UserPassword: password,
    };
    const storedEmail = sessionStorage.getItem('registeredEmail');
    const countdownEndTime = Number(sessionStorage.getItem('countdownEndTime'));
    const currentTime = new Date().getTime();
    const idToast =  toast.loading('Đang đăng nhập ...', {
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
    const toastRes = await loginUser(newUser, dispatch);
    if (toastRes?.status != 200) {
      setConfirmPasswordVisible(true);
      sessionStorage.setItem('registeredEmail', email);
      toast.update(idToast, { 
        render: 'Đăng nhập thất bại !',
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
      if (toastRes?.data == "User is not verification") {
        if(!(storedEmail === email && countdownEndTime > currentTime))
          {
            clearSessionData();
            setShowCountdown(false);
            setShowResendCode(false);
            handleTimeout();
            toast.info('Bấm gửi lại để nhận lại đường dẫn xác thực!', {
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
        }
        else{
          toast.info('Đường dẫn đã được gửi, hãy kiểm tra email của bạn !', {
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
        }
      }
      
    } else {
      toast.update(idToast, {
        render:'Đăng nhập thành công !',
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
      clearSessionData();
      navigate.push('/');
    }
  };

  const handleTimeout = () => {
    setShowResendCode(true);
  };

  const resetCountdown = async () => {
  const idToast =  toast.loading('Đang gửi ...', {
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
    toast.update(idToast, {
      render:'Gửi link thành công ! Đường dẫn sẽ có hiệu lực trong vòng 1 phút',
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
    const endTime = new Date().getTime() + 60000;
    sessionStorage.setItem('countdownEndTime', endTime.toString());
    setShowCountdown(true);
    setShowResendCode(false);
  };

  const clearSessionData =()=> {
    sessionStorage.removeItem('registeredEmail');
    sessionStorage.removeItem('countdownEndTime');
  }

  const handleForgotPassword =async (values: UseFormGetValues<LoginBodyType>)=>{
    console.log(values)
    const idToast =  toast.loading('Đang gửi ...', {
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
    const emailUser = {
      userEmail : values().email,
  }
    const resForgot = await forgotPassword(emailUser);
    if(resForgot?.status ===200){
      toast.update(idToast, {
        render:'Gửi thành công !',
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
        render: 'Gửi thất bại !',
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
  }

  return (
    <div className="pt-10 mx-10 flex items-center justify-center">
      <div className="bg-white/35 w-[600px] px-[60px] py-[30px] rounded-lg shadow-xl">
        <TextTitle />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className='flex flex-col'
            noValidate
          >
            <p className="text-base font-medium mt-5 mb-1">Email</p>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Nhập email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-base font-medium mt-5 mb-1">Mật khẩu</p>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
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
                </FormItem>)}
            />
            {
              confirmPasswordVisible==true &&(
                <a onClick={()=>handleForgotPassword(form.getValues)} 
                onKeyUp={()=>handleForgotPassword(form.getValues)}
                role="button" 
                tabIndex={0}
              className="text-black w-fit mt-2 px-2 hover:text-blue-700 transition duration-300 cursor-pointer font-base text-sm no-underline pb-4"
            >
              Forgot Password ?
            </a>
              )
            }
            <button type='submit' className="w-40 m-auto bg-primary-bg-color text-white  text-lg font-medium my-6 hover:bg-primary-bg-color-hover transition duration-150 ease-in-out text-center  no-underline py-2 rounded-[6px] border-none">
              Đăng nhập
            </button>
          </form>
        </Form>
        {showCountdown && !showResendCode && <CountdownTimer duration={calculateTimeLeft()} onTimeout={handleTimeout} />}
        {showResendCode && (
          <button
            className="text-black hover:text-blue-700 transition duration-300 cursor-pointer font-medium text-base flex m-auto text-center no-underline pb-4"
            onClick={resetCountdown}
            onKeyUp={resetCountdown}
          >
            Resend Link
          </button>
        )}
        <div className=' m-auto w-4/5 flex items-center justify-center gap-3'>
          <hr className=' w-full'></hr>
          <span className=' text-lg font-normal text-slate-300'>Or</span>
          <hr className='w-full'></hr>
        </div>
        <button onClick={()=>handleFacebookLogin(dispatch,navigate)} onKeyUp={()=>handleFacebookLogin(dispatch,navigate)}  className=" flex justify-center items-center gap-3 hover:bg-slate-100 transition duration-500 ease-in-out text-slate-400 mt-3 w-full px-3 py-2 border-[2px] border-slate-300 rounded no-underline text-base font-normal text-center">
          <i className="fa-brands fa-facebook text-2xl text-blue-500"></i>
          <span>Đăng nhập với Facebook</span></button>
        <br />
        <button onClick={()=>handleGoogleLogin(dispatch,navigate)} onKeyUp={()=>handleGoogleLogin(dispatch,navigate)} data-onsuccess="onSignIn" className="flex justify-center items-center gap-3 hover:bg-slate-100 transition duration-500 ease-in-out text-slate-400 mt-3 w-full px-3 py-2 border-[2px] border-slate-300 rounded no-underline text-base font-normal text-center">
          <i className="fa-brands fa-google text-2xl text-red-500"></i>
          <span>Đăng nhập với Google</span></button>
        <br />
        <div className='flex items-center gap-1 justify-center mt-[20px] no-underline text-black text-base '>
          <span>Bạn chưa là một thành viên?</span>
          <Link href="/register" className="hover:underline transition duration-300 ease-in-out hover:text-primary-bg-color"> Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
}

function calculateTimeLeft() {
  const endTime = Number(sessionStorage.getItem('countdownEndTime'));
  const currentTime = new Date().getTime();
  return endTime - currentTime;
}

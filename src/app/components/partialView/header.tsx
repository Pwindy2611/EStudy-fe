"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../service/api/createInstance";
import { logOutSuccess } from "../../../service/reduxState/authSlices";
import Link from 'next/link';
import Image from "next/image";   
import {DropdownMenuDemo} from "./propDown"
export default function Header() {
  
  const user = useSelector((state:any)=> state.persistedReducer.auth.login.data);
  const accessToken = user?.accessToken;
  const id = user?._id;
  const dispatch = useDispatch();
  const navigate = useRouter();
  let axiosJWT = createAxios(user, dispatch, logOutSuccess);

  const [scrollPosition, setScrollPosition] = useState(0);
  const pathname = usePathname(); // Lấy URL hiện tại

  useEffect(() => {
    const handleScroll = () => {
      const header:any = document.querySelector('.header');
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition >0) {
        header.classList.add('shadow-md');
        header.classList.add('bg-white');
      } else {
        if (!pathname.startsWith('/course/')) {
          header.classList.remove('shadow-md');
          header.classList.remove('bg-white');
        }
      }

      setScrollPosition(currentScrollPosition);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const header:any = document.querySelector('.header')
    if (pathname.startsWith('/course/')) {
      header.classList.add('shadow-md');
      header.classList.add('bg-white');
    } else {
        header.classList.remove('shadow-md');
        header.classList.remove('bg-white');
    }
  }, [pathname]);

  return (
    <div className='header sticky z-20 top-0 left-0 right-0 transition duration-500 ease-in-out'>
      <nav className=" w-full py-5">
        <div className="w-full max-w-7xl mx-auto">
          <div className=" w-full flex items-center justify-between">
            <div>
              <Link className='flex gap-2 items-center' href="/">
                <Image
                  className="nav__img"
                  src="/img/.svg/logo.svg"
                  alt="Logo"
                  width={80}
                  height={80}
                  quality={100}
                />
                <h1 className='text-2xl font-semibold tracking-wide'>
                  E-<span className='text-primary-bg-color'>Study</span>
                </h1>
              </Link>
            </div>
            <div>
              <ul className="list-none flex items-center max-lg:hidden gap-6">
                <li className="group">
                  <Link href="/courseOnline" className="group-hover:text-primary-bg-color group-hover:duration-75 delay-75 transition ease-linear no-underline font-medium text-black text-lg tracking-normal">
                    Khóa học online
                  </Link>
                </li>
                <li className="group">
                  <Link href="/examOnline" className="group-hover:text-primary-bg-color group-hover:duration-75 delay-75 transition ease-linear no-underline font-medium text-black text-lg tracking-normal">
                    Đề thi online
                  </Link>
                </li>
                <li className="group">
                  <Link href="/flashCard" className="group-hover:text-primary-bg-color group-hover:duration-75 delay-75 transition ease-linear no-underline font-medium text-black text-lg tracking-normal">
                    Flashcards
                  </Link>
                </li>
                <li className="group">
                  <Link href="/activeCourse" className="group-hover:text-primary-bg-color group-hover:duration-75 delay-75 transition ease-linear no-underline font-medium text-black text-lg tracking-normal">
                    Kích hoạt khóa học
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className='flex gap-4 px-2'>
                  {user ? (
                    <>
                    <DropdownMenuDemo UserName={user.user.userName} UserImage={user.user.userImage}></DropdownMenuDemo>
                    </>
                  ) : (
                    <>
                  <Link href="/login" className="cursor-pointer hover:scale-110 px-[20px] py-[8px] border-[1px] border-primary-bg-color rounded-md max-lg:hidden hover:bg-slate-100 duration-500 shadow-md ease-in-out">
                    <span className="text-base no-underline font-medium text-primary-bg-color tracking-wide">Đăng Nhập</span>
                  </Link>
                  <Link href={`${user ? '/' : '/register'}`} className="cursor-pointer hover:scale-110 px-[20px] py-[8px] bg-primary-bg-color rounded-md max-lg:hidden hover:bg-primary-bg-color-hover duration-500 shadow-md ease-in-out">
                    <span className="text-base no-underline font-medium text-white tracking-wide">Đăng ký</span>
                  </Link>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

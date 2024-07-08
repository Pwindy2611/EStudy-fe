"use client"
import React from 'react';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import  Link  from 'next/link';

export default function Footer() {
    const pathname = usePathname();
 
    if (pathname.startsWith('/course/')||pathname.startsWith('/exam/')||pathname.startsWith('/PaymentConfirmation')) {
        return null; 
    }

    return(
        <footer className="mt-14 py-9 border-t-[1px] border-t-[#e7eaf3] px-[20px] w-full bg-primary-bg-color">
            <div className="">
                <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-8">
                    <div className="flex flex-col items-center gap-3">
                        <Image
                            width={80}
                            height={80}
                            src="/img/.svg/logo_white.svg"
                            alt=""
                        />
                        <p className="text-sm font-semibold">© 2024</p>
                        <div className="flex w-full gap-4 justify-center">
                            <Link href="https://web.facebook.com/?_rdc=1&_rdr" className="footer__link">
                                <i className="fa-brands fa-facebook footer__icon fil text-white"></i>
                            </Link>
                            <Link href="https://www.instagram.com/" className="footer__link">
                                <i className="fa-brands fa-instagram footer__icon text-white"></i>
                            </Link>
                            <Link href="https://x.com/i/flow/login?redirect_after_login=%2Fhome" className="footer__link">
                                <i className="fa-brands fa-twitter footer__icon text-white"></i>
                            </Link>
                            <Link href="https://www.linkedin.com/" className="footer__link">
                                <i className="fa-brands fa-linkedin footer__icon text-white"></i>
                            </Link>
                            <Link href="https://www.tiktok.com/" className="footer__link">
                                <i className="fa-brands fa-tiktok footer__icon text-white"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h3 className="text-2xl font-bold text-white">Khóa học online</h3>
                        <ul className="list-none flex flex-col gap-4">
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS General Reading</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS General Writing</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">Complete TOEIC</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS Fundamentals</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS Intensive Listening</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS Intensive Reading</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS Intensive Speaking</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS Intensive Writing</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h3 className="text-2xl font-bold text-white">Khóa học online</h3>
                        <ul className="list-none flex flex-col gap-4">
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS General Reading</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS General Writing</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">Complete TOEIC</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS Fundamentals</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS Intensive Listening</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS Intensive Reading</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS Intensive Speaking</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS Intensive Writing</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h3 className="text-2xl font-bold text-white">Khóa học online</h3>
                        <ul className="list-none flex flex-col gap-4">
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS General Reading</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS General Writing</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">Complete TOEIC</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS Fundamentals</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS Intensive Listening</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS Intensive Reading</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS Intensive Speaking</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS Intensive Writing</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h3 className="text-2xl font-bold text-white">Khóa học online</h3>
                        <ul className="list-none flex flex-col gap-4">
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS General Reading</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS General Writing</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">Complete TOEIC</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS Fundamentals</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS Intensive Listening</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS Intensive Reading</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS Intensive Speaking</Link>
                            </li>
                            <li>
                                <Link href="" className="text-base no-underline text-white font-light">IELTS Intensive Writing</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mx-6 mt-9">
                    <h3 className="text-center text-white text-3xl font-extrabold">
                        Thông tin nhóm thành viên
                    </h3>
                    <ul className="mt-4 list-none flex flex-col items-center justify-center gap-5">
                        <li>
                            <p className="font-light text-base text-white"></p>
                        </li>
                        <li>
                            <p className="font-light text-base text-white">
                                Trường Đại học Ngoại ngữ và Tin học Tp.HCM
                            </p>
                        </li>
                        <li>
                            <p className="font-light text-base text-white">
                                Điện thoại liên hệ/Hotline: 096 *** ****
                            </p>
                        </li>
                        <li>
                            <p className="font-light text-base text-white">Email: softwaretestact@gmail.com</p>
                        </li>
                        <li>
                            <p className="font-light text-base text-white">
                                Địa chỉ liên hệ hợp tác: 828 Đ. Sư Vạn Hạnh, Phường 12, Quận 10, Hồ Chí Minh, Việt Nam
                            </p>
                        </li>
                    </ul>
                    <p className="text-white text-lg font-medium text-center mt-5">
                        @2024 - Bản quyền của ANHEMTOIDICODE
                    </p>
                </div>
            </div>
        </footer>
    );
}

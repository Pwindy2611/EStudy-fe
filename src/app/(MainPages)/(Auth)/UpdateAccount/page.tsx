"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector} from "react-redux";
import { InfoUser,UpdateImage,editPassword,getAllInfoUser} from "@/service/api/apiAuthRequest";
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea"
import { InfoUserBody, infoUserType, ResetPasswordBody, ResetPasswordBodyType } from '@/schemaValidate/user.schema';
import { Bounce, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const UpdateAccount = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state:any)=> state.persistedReducer.auth.login.data);
  const infoUser=useSelector((state: any) => state.persistedReducer.auth.getAllInfoUser?.data?.user);

  const [activeTab, setActiveTab] = useState(0);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(infoUser?.userImage);
  const [selectedBanner, setSelectedBanner] = useState('/public/img/add_image-1024');


  const formInfoUser = useForm<infoUserType>({
    resolver: zodResolver(InfoUserBody),
    defaultValues: {
      username: infoUser?.userName,
      email: infoUser?.userEmail,
      phoneNumber: infoUser?.phoneNumber,
      description: infoUser?.userDescription
    }
  });

  const formResetPassword = useForm<ResetPasswordBodyType>({
    resolver: zodResolver(ResetPasswordBody),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  }); 

  const handleTabClick = (index:any) => {
    setActiveTab(index);
  };

  const handleImageChange = (event:any, setPreview:any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader?.readAsDataURL(file);
  };

  const handleBasicInfoSave = async (values: infoUserType) => {
    const idToast =  toast.loading('Đang kiểm tra...', {
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
    const { username, email, phoneNumber, description} =values;
    const updatedUser = {
      userId: user?.user?.userId,
      userName: username,
      userEmail: email,
      phoneNumber: phoneNumber,
      userDescription: description
    }
    const res=await InfoUser(updatedUser,dispatch);
    if(res?.status==200 && res?.status){
      toast.update(idToast, {
        render:'Cập nhật thông tin thành công!',
        type: "success", 
        isLoading: false ,
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        progress: undefined,
      });
      await getAllInfoUser({userId: user?.user?.userId},dispatch)
    }
    else{
      toast.update(idToast, {
        render:'Cập nhật thông tin thất bại!',
        type: "success", 
        isLoading: false ,
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        progress: undefined,
      });
    }
  };

  const handlePasswordSave = async (values: ResetPasswordBodyType) => {
    const idToast =  toast.loading('Đang kiểm tra...', {
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
    const {newPassword,confirmPassword,oldPassword} =values;
    const data={
    userId : user?.user?.userId,
    oldPassword : oldPassword,
    newPassword : newPassword,
    confirmPassword: confirmPassword
    }
    const res=await editPassword(data);
    if(res?.status==200 && res?.status){
      toast.update(idToast, {
        render:'Cập nhật mật khẩu thành công !',
        type: "success", 
        isLoading: false ,
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        progress: undefined,
      });
    }
    else{
      console.log(res)
      toast.update(idToast, {
        render:'Cập nhật mật khẩu thất bại !',
        type: "error", 
        isLoading: false ,
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        progress: undefined,
      });
    }
  };

  const handleImageSave = async () => {
    const idToast =  toast.loading('Đang kiểm tra...', {
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
    const formData = new FormData();
    formData.append('userId', user?.user?.userId);
    if (selectedAvatar) {
      formData.append('userAvatar', selectedAvatar);
    }
    if (selectedBanner) {
      formData.append('userBanner', selectedBanner);
    }

    const response = await UpdateImage(formData);

      if (response.status === 200) {
        toast.update(idToast ,{
          render:'Cập nhật ảnh thành công!',
          type: "success", 
          isLoading: false ,
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          progress: undefined,
        });
      } else {
        toast.update(idToast, {
          render:'Cập nhật ảnh thất bại!',
          type: "error", 
          isLoading: false ,
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          progress: undefined,
        });
      }
    };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div className="mt-11 m-auto w-[600px] px-[60px] py-[30px] border-[1px] border-course-border-color rounded-lg shadow-xl">
      <h3 className="text-3xl">Cập nhật thông tin cá nhân</h3>
      <ul className="ml-[10px] mt-[20px] list-none flex border-b-[1px] border-b-[#e0e0e0] bg-transparent max-w-full relative">
        <li className="flex">
          <div
            className={` cursor-pointer no-underline p-[16px] border-b-[2px] text-base ${activeTab === 0 ? 'text-nav-hover-text-color border-b-nav-hover-text-color' : 'hover:text-nav-hover-text-color hover:border-b-nav-hover-text-color'}`}
            onClick={() => handleTabClick(0)}
          >
            Thông tin cơ bản
          </div>
        </li>
        <li className="flex">
          <div
            className={` cursor-pointer no-underline p-[16px] border-b-[2px] text-base ${activeTab === 1 ? 'text-nav-hover-text-color border-b-nav-hover-text-color' : 'hover:text-nav-hover-text-color hover:border-b-nav-hover-text-color'}`}
            onClick={() => handleTabClick(1)}
          >
            Đổi ảnh đại diện
          </div>
        </li>
        <li className="flex">
          <div
            className={` cursor-pointer no-underline p-[16px] border-b-[2px] text-base ${activeTab === 2 ? 'text-nav-hover-text-color border-b-nav-hover-text-color' : 'hover:text-nav-hover-text-color hover:border-b-nav-hover-text-color'}`}
            onClick={() => handleTabClick(2)}
          >
            Đổi mật khẩu
          </div>
        </li>
      </ul>
      <div className={`${activeTab === 0 ? 'block' : 'hidden'}`}>
        <p className="text-base my-[10px]">
          Email: chiemhoctot@gmail.com (STUDY4 không hỗ trợ đổi email. Vui lòng liên hệ chúng tôi nếu bạn đã mua khóa học và muốn đổi account.)
        </p>
        <Form {...formInfoUser}>
          <form
           onSubmit={formInfoUser.handleSubmit(handleBasicInfoSave)}
           className='flex flex-col'
           noValidate>
          <p className="text-base my-[10px]">Tên của bạn</p>
          <FormField
              control={formInfoUser.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={infoUser?.userName}  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        <p className="text-base my-[10px]">Email</p>
        <FormField
              control={formInfoUser.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={infoUser?.userEmail} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        <p className="text-base my-[10px]">Về bản thân</p>
        <FormField
              control={formInfoUser.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                  <Textarea placeholder={infoUser?.userDescription ? infoUser?.userDescription:'Chia sẻ những điều thú vị về bạn' }  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-base my-[10px]">Phone Number</p>
        <FormField
              control={formInfoUser.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={infoUser?.phoneNumber} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <button type='submit' className="w-full bg-primary-bg-color text-white block text-xl font-medium my-3 text-center no-underline py-3 rounded-[6px] border-none">
              Lưu
            </button>
          </form>
        </Form>
      </div>
      <div className={`${activeTab === 1 ? 'flex flex-col' : 'hidden'}`}>
  <p className="text-xl text-center font-medium text-primary-bg-color my-[30px]">Ảnh đại diện</p>
  <div className='w-[300px] rounded-full h-[300px] shadow-2xl m-auto mb-8 overflow-hidden'>
  <Image
    src={selectedAvatar}
    alt=""
    width={1000}
    height={1000}
    id="previewImg"
    className='object-cover  w-full h-full'
  />
  </div>
  <label className=" m-auto my-6 cursor-pointer text-base font-medium text-primary-bg-color w-[180px] p-[10px] rounded-[4px] border-[1px] border-primary-bg-color bg-white hover:bg-gray-100 text-center transition duration-300">
    Chọn ảnh đại diện
    <input
      type="file"
      className="hidden"
      onChange={(e) => handleImageChange(e, setSelectedAvatar)}
    />
  </label>
  <p className="text-xl text-center font-medium text-primary-bg-color my-[30px]">Banner</p>
  <Image
    src={selectedBanner}
    alt=""
    width={400}
    height={200}
    id="previewImg1"
    className=' w-full shadow-xl  rounded-lg'
  />
  <label className=" m-auto my-6 cursor-pointer text-base font-medium text-primary-bg-color w-[180px] p-[10px] rounded-[4px] border-[1px] border-primary-bg-color bg-white hover:bg-gray-100 text-center transition duration-300">
    Chọn banner
    <input
      type="file"
      className="hidden"
      onChange={(e) => handleImageChange(e, setSelectedBanner)}
    />
  </label>
  <button onClick={handleImageSave} className="w-full bg-primary-bg-color text-white block text-xl font-medium my-3 text-center no-underline py-3 rounded-[6px]">
    Lưu
  </button>
      </div>

      <div className={`${activeTab === 2 ? 'block' : 'hidden'}`}>
      <Form {...formResetPassword}>
          <form
           onSubmit={formResetPassword.handleSubmit(handlePasswordSave)}
           className='flex flex-col'
           noValidate>
             <p className="text-base my-[10px]">Mật khẩu cũ</p>
            <FormField
              control={formResetPassword.control}
              name='oldPassword'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                  <div className="relative">
                      <Input placeholder='Nhập mật khẩu cũ' type={oldPasswordVisible ? 'text' : 'password'} {...field} />
                      <span
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() => setOldPasswordVisible(!oldPasswordVisible)}
                      >
                        {oldPasswordVisible ? '🙈' : '👁️'}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>)}
            />
            <p className="text-base my-[10px]">Mật khẩu mới</p>
            <FormField
              control={formResetPassword.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                  <div className="relative">
                      <Input placeholder='Nhập mật khẩu mới' type={newPasswordVisible ? 'text' : 'password'} {...field} />
                      <span
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                      >
                        {newPasswordVisible ? '🙈' : '👁️'}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>)}
            />
             <p className="text-base my-[10px]">Nhập lại mật khẩu</p>
             <FormField
              control={formResetPassword.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                  <div className="relative">
                      <Input placeholder='Xác nhận mật khẩu' type={confirmPasswordVisible ? 'text' : 'password'} {...field} />
                      <span
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                      >
                        {confirmPasswordVisible ? '🙈' : '👁️'}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button type='submit' className="w-full bg-primary-bg-color text-white block text-xl font-medium my-3 text-center no-underline py-3 rounded-[6px] border-none">
              Lưu
            </button>
            </form>
      </Form>
      </div>
      <Link href='/profile' className=' mt-5 flex w-full items-center justify-center gap-2 text-lg font-medium group hover:cursor-pointer'>
        <i className="fa-solid fa-arrow-left text-2xl group-hover:text-primary-bg-color transition duration-300 ease-in-out"></i>
        <h1 className='group-hover:text-primary-bg-color transition duration-300 ease-in-out'>Trở về trang profile</h1>
        </Link>
    </div>
  );
};

export default UpdateAccount;

import * as request from "@/lib/utils/request";
import {
  loginStart,
    loginFailed,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFailed,
    logOutStart,
    logOutSuccess,
    logOutFailed,
    getAllInfoUserStart,
    getAllInfoUserSuccess,
    getAllInfoUserFailed,
} from "@/service/reduxState/authSlices";

export const loginUser = async (user:any, dispatch:any) => {//truyen req user(username,password), dispatch( truyen action tu state cua login), navigate( chuyen den trang moi nhu route-dom cua react)
  dispatch(loginStart());
  try {
    const res = await request.post('/Auth_API/Login', user);
    dispatch(loginSuccess(res));
    if(res.status==200){
      getAllInfoUser({userId:res?.user?.userId},dispatch)
    }
  } catch (err:any) {
    dispatch(loginFailed());
    return err?.response;
  }
};

export const registerUser = async (user:any, dispatch:any) => {
  dispatch(registerStart());
  try {
    await request.post('/Auth_API/Register', user);
    dispatch(registerSuccess());
  } catch (err:any) {
    dispatch(registerFailed());
    return err?.response;
  }
};

export const logOut = async (dispatch:any) => {
  dispatch(logOutStart());
  try {
    dispatch(logOutSuccess());
  } catch (err) {
    dispatch(logOutFailed());
  }
};

export const reSendEmail = async (email:any) => {
  try {
    const res =await request.post('/Auth_API/ResendLink', email);
    return res;
  } catch (err:any) {
    return err?.response;
  }
} 

export const forgotPassword = async (email:any) => {
  try{
    const res = await request.post('/Auth_API/RequestForgotPassword', email);
    return res;
  }catch (err:any) {
    return err?.response;
  }
}

export const InfoUser = async (user:any, dispatch:any) => {
  try {
    const res = await request.post('/Auth_API/EditUserProfile', user);
    return res;
  } catch (err:any) {
    return err?.response;
  }
};

export const UpdateImage = async (user:any) => {
  try {
    const res = await request.post('/Auth_API/User_UpdateImage', user, { headers: {
      'Content-Type': 'multipart/form-data'
    }});
    return res;
  } catch (err:any) {
    return err?.response;
  }
};

export const editPassword = async (data:any) => {
  try {
    const res = await request.post('/Auth_API/EditPassword', data);
    return res;
  } catch (err:any) {
    return err?.response;
  }
};

export const getAllInfoUser = async (idUser:any,dispatch:any) => {
    dispatch(getAllInfoUserStart());
    try {
      const res = await request.post(`/Auth_API/Get_UserProfile`,idUser);
      dispatch(getAllInfoUserSuccess(res));
    } catch (err:any) {
      dispatch(getAllInfoUserFailed(err.response.data));
    }
}
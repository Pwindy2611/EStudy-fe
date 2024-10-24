  import { Bounce, toast } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";
  import {
    loginStart,
    loginFailed,
    loginSuccess,
  } from "@/service/reduxState/authSlices";
  import { getAllInfoUser } from "@/service/api/apiAuthRequest";
  import { jwtDecode } from "jwt-decode";

  export const handleGoogleLogin = async (dispatch: any, navigate: any) => {
    const clearSessionData =()=> {
      sessionStorage.removeItem('registeredEmail');
      sessionStorage.removeItem('countdownEndTime');
    }
    dispatch(loginStart());
    const popup = window.open(`${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}`, '_blank', 'width=500,height=600');

    // Function to handle message event
    const handlePopupMessage = (event: MessageEvent) => {
      if (event.origin === process.env.NEXT_PUBLIC_DOMAIN_BE) {
        const { token } = event.data;
        if (token) {
          try {
            const decoded = jwtDecode(token) as { [key: string]: any };
            if (decoded) {
              dispatch(loginSuccess(decoded));
              getAllInfoUser({ userId: decoded.nameid }, dispatch);
              toast.success('Đăng nhập Google thành công!', {
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
              navigate.push("/");
            }
          } catch (error) {
            dispatch(loginFailed());
            console.error('Lỗi khi giải mã token:', error);
            toast.error('Lỗi khi giải mã token!', {
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
        } else {
          dispatch(loginFailed());
          toast.error('Đăng nhập Google thất bại!', {
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

        // Gỡ bỏ listener sau khi đăng nhập xong
        window.removeEventListener("message", handlePopupMessage);
      }
    };

    // Thêm event listener
    window.addEventListener("message", handlePopupMessage);

    await new Promise<void>((resolve) => {
      const checkPopupClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkPopupClosed);

          // Gỡ bỏ event listener khi popup đóng
          window.removeEventListener("message", handlePopupMessage);

          resolve();
        }
      }, 500);
    });
  };

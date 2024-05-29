"use client"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { deleteUser, getAllUsers } from  "@/service/api/apiAuthRequest";
import { createAxios } from "@/service/api/createInstance";
import "./getAllUser.css";
import { loginSuccess } from "@/service/reduxState/authSlices";

const HomePage = () => {
  const user = useSelector((state: any) => state.auth.login?.currentUser); // Get user data from redux state
  const userList = useSelector((state: any) => state.user.users?.allUsers);
  const msg = useSelector((state: any) => state.users?.msg);
  const dispatch = useDispatch();
  const navigate = useRouter();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleDelete = (id: any) => {
    deleteUser(user?.accessToken, dispatch, id, axiosJWT);
  };

  useEffect(() => {
    if (!user) {
      navigate.push("/login");
    }
    if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch, axiosJWT);
    }
  }, [user, navigate, dispatch, axiosJWT]);

  const renderMsg = (msg: any) => {
    if (typeof msg === 'string') {
      return msg;
    }
    if (typeof msg === 'object' && msg !== null) {
      return JSON.stringify(msg); // Convert object to string for display
    }
    return null;
  };

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {`Your role: ${user?.admin ? 'Admin' : 'User'}`}
      </div>
      <div className="home-userlist">
        {userList?.map((user: any) => {
          return (
            <div key={user._id} className="user-container">
              <div className="home-user">{user.username}</div>
              <div
                className="delete-user"
                onClick={() => handleDelete(user._id)}
              >
                {" "}
                Delete{" "}
              </div>
            </div>
          );
        })}
      </div>
      <div className="errorMsg">{renderMsg(msg)}</div> {/* Render msg properly */}
    </main>
  );
};

export default HomePage;

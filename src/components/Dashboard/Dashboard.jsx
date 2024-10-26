import { useContext, useEffect, useState } from "react";
import Hall from "../Hall/Hall";
import Wrapper from "../Wrapper/Wrapper";

import './Dashboard.css'
import { fakeGetUserConfig } from "../../services/fakeAPI.service";
import { AuthContext } from "../../contexts/Auth.context";
import { StoreContext, StoreProvider } from "../../contexts/Store.context";
import DialogWidget from "../DialogWidget/DialogWidget";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { userConfig, setUserConfig } = useContext(StoreContext);

  const navigate = useNavigate();

  const handleUserConfig = async (authId) => {
    const configData = await fakeGetUserConfig(authId);

    if (!configData?.id) {
      navigate('/error')
    }

    setUserConfig(configData);
  };

  const handleUserData = (id, name, token) => {
    setAuth({
      id: id,
      username: name,
      token: token
    });
    handleUserConfig(id);
  };

  useEffect(() => {
    let authId = localStorage.getItem('user_id');
    let authName = localStorage.getItem('username');
    let authToken = localStorage.getItem('access_token');

    if (!auth?.id || !auth?.username || !auth?.token) {
      handleUserData(authId, authName, authToken);
      return;
    }

    handleUserData(auth.id, auth.username, auth.token);
  }, []);

  return (
    <>
      <div className='dashboard'>
        <Wrapper/>
        <Hall/>
      </div>

      <DialogWidget/>
    </>
  );
};

export default Dashboard;
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth.context";
import { useNavigate } from "react-router-dom";
import { BLANK_AUTH } from "../../constant/mockup";
import { message } from "antd";

const Header = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ nameUser, setNameUser ] = useState('');

  const onLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");

    setAuth(BLANK_AUTH);
    setNameUser('');
    message.info("Logout successfully");
    navigate('/login');
  };

  const authHandler = () => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      return;
    }

    setNameUser(localStorage.getItem('username'));
  };

  useEffect(() => {
    authHandler();
  }, [auth]);

  const gohome = () => {
    navigate('/');
  }

  return (
    <>
      <div className='title'>
        <h1 onClick={gohome}>D&D System</h1>

        <div className='label'>
          <h3>{nameUser}</h3>
          <span>|</span>
          <nav>
            <a href="/register">Register</a>
            {!nameUser && <a href="/login">Login</a>}
            {!!nameUser && <a onClick={onLogout}>Logout</a>}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
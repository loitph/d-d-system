import { useContext, useState } from 'react';
import './Register.css'
import { BLANK_USER } from '../../../constant/mockup';
import { fakeLogin, fakeRegister } from '../../../services/fakeAPI.service';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/Auth.context';

const Register = () => {
  const [ registerForm, setRegister ] = useState(BLANK_USER);

  const [formError, setFormError] = useState({
    username: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegister({
      ...registerForm,  // Keep the existing form data
      [name]: value  // Update the changed field
    });
  };

  const { auth, setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const onRegister = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const res = await fakeLogin(registerForm);
    if (res?.data?.token) {
      message.error("User was created");
    } else {
      const newRes = await fakeRegister(registerForm);

      if (newRes.data) {
        message.success("Register successfully");
        localStorage.setItem('access_token', newRes.data.token);
        localStorage.setItem('username', newRes.data.username);
        localStorage.setItem('user_id', newRes.data.id);

        setAuth(newRes.data);
        navigate('/');
      }
    }

  };

  const regexPattern = /^[a-zA-Z.#@*!$%^]{6,24}$/;
  const validate = () => {
    let valid = true;
    
    if (!regexPattern.test(registerForm.username)) {
      formError.username = 'Username invalid'
      setFormError({...formError});
      valid = false
    } else {
      delete formError.username;
      setFormError({...formError});
    }
    
    if (!regexPattern.test(registerForm.password)) {
      formError.password = 'Password invalid'
      setFormError({...formError});
      valid = false
    } else {
      delete formError.password;
      setFormError({...formError});
    }
    return valid;
  };

  return (
    <>
      <div className="form-wrapper">

        <div className="mask"></div>
        <div className="form-input">
          <h1>Register</h1>
          <form onSubmit={onRegister}>
            {formError.username && <span className='msg-error'>username error</span>}
            <input
              type='text'
              name='username'
              placeholder='username'
              value={registerForm.username}
              onChange={handleChange}
              className={
                !formError.username ? '' : 'username-error'
              }
            />
            

            {formError.password && <span className='msg-error'>password error</span>}
            <input
              type='password'
              name='password'
              placeholder='password'
              value={registerForm.password}
              onChange={handleChange}
              className={
                !formError.password ? '' : 'password-error'
              }
            />

            <p className='noti'>Username and Password only contain 6-24 characters, which include its uppercase and not digit.</p>
            <p className='noti'>Symbols allow: ., #, @, *, !, $, %, ^</p>

            <button type='submit'>Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
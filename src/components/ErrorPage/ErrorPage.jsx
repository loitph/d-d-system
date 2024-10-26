import { useNavigate } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate('/login');
  };

  const navigateRegister = () => {
    navigate('/register');
  };

  return (
    <>
      <div className='error-container'>
        <div className="mask"></div>
        <div className="error-content">
          <p>Page not found! Please try again or just Login</p>
          <div className='btn-error-navigate'>
            <button
              className='btn-login'
              onClick={navigateLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;

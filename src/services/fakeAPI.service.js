import axios from "axios";
import { LIST_CARD_DEFAULT, USER_DATA } from "../constant/mockup";

// Token generation function using the Web Crypto API (works in browser)
const generateToken = async (inputText) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(inputText);

  // Hash the input text using SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  // Convert buffer to hexadecimal or base64
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hexString = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return btoa(hexString);  // Optional base64 encoding
};

const login = (username, password) => {
  const URL = '/api/v1/user/login';
  const data = { username, password };

  return axios.post(URL, data);
};

const register = (username, password) => {
  const URL = '/api/v1/user/register';
  const data = { username, password };
  return axios.post(URL, data);
};


const fakeLogin = async (data) => {
  const db = [...USER_DATA];

  const exist = db.find(i => i.username === data.username &&
    i.password === data.password);

  // simulate delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(250);

  if (exist) {
    return {
      data: {
        username: exist.username,
        token: exist.token,
        configure: exist.configure
      },
    }
  } else {
    return {
      data: {
        username: '',
        token: '',
        configure: []
      },
    };
  }
};

const fakeRegister = async (data) => {
  let newUser = data;

  // generate token
  const code = await generateToken(data.username);

  newUser.token = code;
  newUser.configure = LIST_CARD_DEFAULT;

  USER_DATA.push(newUser);

  return {
    data: {
      username: newUser.username,
      token: newUser.token,
      configure: newUser.configure
    },
  };
};


export { fakeLogin, fakeRegister };


import axios from "axios";
import { USER_CONFIG, USER_DATA } from "../constant/mockup";

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

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fakeLogin = async (data) => {
  const db = [...USER_DATA];

  const exist = db.find(i => i.username === data.username &&
    i.password === data.password);

  // simulate delay
  await delay(210);

  if (exist) {
    return {
      data: {
        id: exist.id,
        username: exist.username,
        token: exist.token,
      },
    }
  } else {
    return {
      data: {
        id: '',
        username: '',
        token: '',
      },
    };
  }
};

const generateUUIDv4 = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

const fakeRegister = async (data) => {
  let newUser = data;

  // generate token
  const code = await generateToken(data.username);

  newUser.id = generateUUIDv4();
  newUser.token = code;

  USER_DATA.push(newUser);

  return {
    data: {
      id: newUser.id,
      username: newUser.username,
      token: newUser.token,
    },
  };
};

const fakeGetUserConfig = async (userId) => {
  const res = USER_CONFIG.find(u => u.id === userId);

  // simulate delay
  await delay(210);

  return res || {
    id: userId,
    board: [],
    widget: []
  };
};


export { fakeLogin, fakeRegister, fakeGetUserConfig };


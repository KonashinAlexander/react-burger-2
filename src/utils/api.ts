import { TChangePassForm, TForm, TLoginForm } from "./prop-types";

export const BASE_URL = "https://norma.nomoreparties.space/api/";

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res: any) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

const request = async (endpoint: string, options?: RequestInit | undefined) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const res_1 = await checkResponse(res);
  return checkSuccess(res_1);
};

export const getIngredients = () => request("ingredients").then(res => res.data);

export const getOrderDetails = (newOrder: object) => request(
  "orders", {
  method: 'POST',
  body: JSON.stringify(newOrder),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
});

export const getPasswordReset = (email: string) => request(
  "password-reset", {
  method: 'POST',
  body: JSON.stringify({ "email": email }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
});

export const changePassword = (form: TChangePassForm) => request(
  "password-reset/reset", {
  method: 'POST',
  body: JSON.stringify(form),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
});

export const createUser = (form: TForm) => request(
  "auth/register", {
  method: 'POST',
  body: JSON.stringify(form),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
});

export const postUserLogin = (form: TLoginForm) => request(
  "auth/login", {
  method: 'POST',
  body: JSON.stringify(form),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    Authorization: localStorage.accessToken,
  }
})
.then(data=>{
  localStorage.setItem('accessToken', data.accessToken)
  localStorage.setItem('refreshToken', data.refreshToken)
  localStorage.setItem('user', JSON.stringify(data.user))
  document.cookie = `token=${data.refreshToken}`
})

export const getUserInfo = () => request(
  "auth/user", {
  method: 'GET',
  body: JSON.stringify(null),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    Authorization: localStorage.accessToken
  }
});

export const updateUserInfo = (form: TForm) => request(
  "auth/user", {
  method: 'PATCH',
  body: JSON.stringify(form),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    Authorization: localStorage.accessToken
  }
});

export const getNewToken = () => request(
  "auth/token", {
  method: 'POST',
  body: JSON.stringify({ "token": localStorage.refreshToken }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    Authorization: localStorage.accessToken
  }
});

export const getExit = () => request(
  "auth/logout", {
  method: 'POST',
  body: JSON.stringify({ "token": localStorage.refreshToken }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
});



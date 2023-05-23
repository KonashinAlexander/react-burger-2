export const BASE_URL = "https://norma.nomoreparties.space/api/";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

const request = (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export const getIngredients = () => request("ingredients").then(res => res.data);

export const getOrderDetails = (newOrder) => request(
  "orders", {
  method: 'POST',
  body: JSON.stringify(newOrder),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
});

export const getPasswordReset = (email) => request(
  "password-reset", {
  method: 'POST',
  body: JSON.stringify({ "email": email }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
});

export const changePassword = (form) => request(
  "password-reset/reset", {
  method: 'POST',
  body: JSON.stringify(form),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
});

export const createUser = (form) => request(
  "auth/register", {
  method: 'POST',
  body: JSON.stringify(form),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
});

export const loginUser = (form) => request(
  "auth/login", {
  method: 'POST',
  body: JSON.stringify(form),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    Authorization: localStorage.accessToken,
  }
});

export const getUserInfo = () => request(
  "auth/user", {
  method: 'GET',
  body: JSON.stringify(),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    Authorization: localStorage.accessToken
  }
});

export const updateUserInfo = (form) => request(
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



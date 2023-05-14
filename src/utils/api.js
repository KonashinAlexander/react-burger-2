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

const email = { "email": "konashin.alexander@yandex.ru" }
export const getPasswordReset = () => request(
  "password-reset", {
  method: 'POST',
  body: JSON.stringify(email),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
});


const reset = {
  "password": "qwerty",
  "token": "6171c96b-4005-43bf-97ef-805e551c556d"
}
export const changePassword = () => request(
  "password-reset/reset", {
  method: 'POST',
  body: JSON.stringify(reset),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
});


const user = {
  "email": "konashin.alexander@yandex.ru",
  "password": "qwerty",
  "name": "Alexander"
}
export const createUser = (form) => request(
  "auth/register", {
  method: 'POST',
  body: JSON.stringify(form),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
});


const a = {
  "success": true,
  "user": {
    "email": "konashin@gmail.com",
    "name": "Alexander"
  },
  "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjBiZWQ5OGE0YjYyMDAxYzgzNzlmMyIsImlhdCI6MTY4NDA2MTkxMywiZXhwIjoxNjg0MDYzMTEzfQ.BqjNMhWgWSH4lNVuoCklLTQqc289HOkBdGDWchu2gtc",
  "refreshToken": "85580115a4e343857497e85eec1f79a9e98ddc8f7e0c128f5de91233187833de057baa7eece12bf3"
}
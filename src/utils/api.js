// export const API_URL = 'https://norma.nomoreparties.space/api';

// function request(url, options) {
//   return fetch(url, options).then(checkResponse)
// }

// export const checkResponse = (res) => {
//   return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
// };

// export const getIngredients = () => {
//   return fetch(`${API_URL}/ingredients`)
//     .then(checkResponse)
//     .then((dataIngredients) => {
//       if (dataIngredients.success) {
//         return dataIngredients.data;
//       }
//     })
//   // .catch((err) => {
//   //   console.log('getIngredients error >>', err);
//   // });
// };

// export const getOrderDetails = (newOrder) => {

//   return fetch(`${API_URL}/orders`, {
//     method: 'POST',
//     body: JSON.stringify(newOrder),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   })
//     .then(checkResponse)
//     .then((dataOrder) => {
//       if (dataOrder.success) {
//         return dataOrder;
//       }
//     })
//   // .catch((err) => {
//   //   console.log('getOrder error >>', err);
//   // });
// };



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

import { updateOrderDetails } from "../services/reducers/order";
export const API_URL = 'https://norma.nomoreparties.space/api';


export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
  return fetch(`${API_URL}/ingredients`)
    .then(checkResponse)
    .then((dataIngredients) => {
      if (dataIngredients.success) {
        return dataIngredients.data;
      }
    })
  // .catch((err) => {
  //   console.log('getIngredients error >>', err);
  // });
};

export const getOrderDetails = (newOrder) => {

  return fetch(`${API_URL}/orders`, {
    method: 'POST',
    body: JSON.stringify(newOrder),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(checkResponse)
    .then((dataOrder) => {
      if (dataOrder.success) {
        console.log(dataOrder)
        return dataOrder;
      }
    })
  // .catch((err) => {
  //   console.log('getOrder error >>', err);
  // });
};
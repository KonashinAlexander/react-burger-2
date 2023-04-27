// export const INGREDIENTS_API_URL = 'https://norma.nomoreparties.space/api/ingredients'
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

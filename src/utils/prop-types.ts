
export type TIngredientsType = {
    __v: number,
    _id: string,
    calories: number,
    carbohydrates: number,
    fat: number,
    image: string,
    image_large: string,
    image_mobile: string,
    name: string,
    price: number,
    proteins: number,
    type: string
}

export type TIngredientsDetailsType = TIngredientsType & {
    count: number;
}

export type TConstructorIngredients = TIngredientsDetailsType & {
  uuid: string;
  pose: string;
  position: 'bottom' | 'top';
}

export type TConstructorElementItemProps = TIngredientsType & {
    id: number;
    index: number;
    image: string;
    name: string;
    price: number;
    // props: TIngredientsType;
  }

export  type TBurgerIngredientsProps = {
    key: string;
    count: number;
  } & TIngredientsType


export  interface IIngredientsStore {
    ingredientsStore: {
        data: TIngredientsType[];
        isLoading: boolean;
        error: string | null;
    }
}

export type TConstructorStore = {
    constructorStore: {
      buns: TIngredientsType[],
      bunsIds: string[],
      ingredients: TIngredientsType[],
      ingredientsIds: string[],
    }
  }

export type TDetailsStore = {
  detailsStore: {
    ingredientDetails: TIngredientsType,
  }
}
  
export type TConctrElemProps = {
    name: string;
    image: string;
    data: TIngredientsType;
    count: number;
    uuid: string;
    i: number;
    pose: string;
    type: string
  }
  
export  type TFormChange = { 
    target: { 
        name: string; 
        value: string; 
    }; 
}

export type TPreventDefault = {
  preventDefault: () => void;
}

export type TUser = {
  name: string;
  email: string;
}

export type TLoginForm = { 
  email: string; 
  password: string; 
}

export type TChangePassForm = { 
  token: string; 
  password: string; 
}

export type TForm = {
  name: string;
  email: string;
  password: string;
}

export type TSingleOrderDetails = {
  _id: string,
  createdAt: string,
  ingredients: string[],
  name: string,
  number: number,
  status: string,
  updatedAt: string,
}

export type TFeedOrderItemProps = {
  props: TSingleOrderDetails,
  onClick: ()=>void,
  id: number,
}

export interface IOrdersListState {
  orders: TSingleOrderDetails[],
  success: boolean,
  total: number,
  totalToday: number,
}

export type TIngredientsState = {
  data: TIngredientsType[],
  isLoading: boolean,
  error: {message: string} | null
}
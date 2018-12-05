import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CartReducer from './CartReducer';
import CatalogueReducer from './CatalogueReducer';
import ItemReducer from './ItemReducer';
import OrdersReducer from './OrdersReducers';
import UserReducer from './UserReducer';
import ModelReducer from './ModelReducer';

export default combineReducers({
  auth: AuthReducer,
  cart: CartReducer,
  cards: CatalogueReducer,
  orders: OrdersReducer,
  item: ItemReducer,
  user: UserReducer,
  model: ModelReducer
});

import { combineReducers } from "redux";
import homeReducer from '@modules/home/api/slice';
import categariesReducer from '@modules/categories/api/slice'
import cartReducer from '@modules/cart/api/slice'

const rootReducer = combineReducers({
    home: homeReducer,
    categories: categariesReducer,
    cart : cartReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

import { combineReducers } from "redux";
import homeReducer from '@modules/home/api/slice';

const rootReducer = combineReducers({
    home: homeReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

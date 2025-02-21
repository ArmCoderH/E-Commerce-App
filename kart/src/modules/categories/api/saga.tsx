import { fetchCategoriesData } from "./api";
import { GET_CATEGORIES } from "./constants";
import { setData, setError, setLoading } from "./slice";
import {call, put, takeEvery} from 'redux-saga/effects'


function* fetchApiDataSaga(): any {
    try {
        console.log("Fetching categories..."); // Debugging
        yield put(setLoading());
        const data = yield call(fetchCategoriesData);
        console.log("Fetched data:", data); // Debugging
        yield put(setData(data));
    } catch (error: any) {
        console.error("Fetch error:", error.message); // Debugging
        yield put(setError(error.message));
    }
}


function* categoriesSaga() {
    yield takeEvery(GET_CATEGORIES,fetchApiDataSaga)
}

export default categoriesSaga;
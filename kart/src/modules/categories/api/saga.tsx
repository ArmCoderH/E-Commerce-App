import { fetchCategoriesData } from "./api";
import { GET_CATEGORIES } from "./constants";
import { setData, setError, setLoading } from "./slice";
import {call, put, takeEvery} from 'redux-saga/effects'


function* fetchApiDataSaga(): any{
    try {
        yield put(setLoading())
        const data = yield call(fetchCategoriesData)
        yield put(setData(data))
    } catch (error:any) {
        yield put(setError(error.message))
    }
}

function* categoriesSaga() {
    yield takeEvery(GET_CATEGORIES,fetchApiDataSaga)
}

export default categoriesSaga;
import 'babel-polyfill';
import { takeLatest } from 'redux-saga';

export function* onStand() {
    console.log("stand action");
}

export default function*() {
    yield takeLatest('STAND', onStand);
}
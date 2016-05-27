import 'babel-polyfill';
import { takeLatest, delay } from 'redux-saga';
import { select, put, call } from 'redux-saga/effects';
import { score } from '../lib/cards';
import { dealToDealer, determineWinner } from '../action_creators';

const getDealerHand = (state) => state.get('dealerHand');

export function* onStand() {
    let dealerHand;
    while(true) {
        yield put(dealToDealer());
        dealerHand = yield select(getDealerHand);
        if(score(dealerHand) >= 17) {
            break;
        }
        else {
            yield call(delay, 750);
        }
    }
    yield put(determineWinner());
}

export default function*() {
    yield takeLatest('STAND', onStand);
}
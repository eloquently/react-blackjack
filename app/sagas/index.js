import 'babel-polyfill';
import { takeLatest, delay } from 'redux-saga';
import { select, put, call } from 'redux-saga/effects';
import { score } from '../lib/cards';
import { dealToDealer, determineWinner,
         setRecord } from '../action_creators';
import { fetchUser } from '../lib/api';

const getDealerHand = (state) => state.game.get('dealerHand');
const getSpeed = (state) => state.settings.get('speed');
const getUserToken = 
    (state) => state.settings.get('userToken');

export function* onStand() {
    const dealSpeed = yield select(getSpeed);
    let dealerHand;
    while(true) {
        yield put(dealToDealer());
        dealerHand = yield select(getDealerHand);
        if(score(dealerHand) >= 17) {
            break;
        }
        else {
            yield call(delay, dealSpeed);
        }
    }
    yield put(determineWinner());
}

export function* onFetchRecord() {
    const userToken = yield select(getUserToken);
    const user = yield call(fetchUser, userToken);
    yield put(setRecord(user.win_count, user.loss_count));
}

export default function*() {
    yield [ takeLatest('STAND', onStand),
            takeLatest('FETCH_RECORD', onFetchRecord)
    ];
}
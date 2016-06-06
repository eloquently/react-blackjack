import 'babel-polyfill';
import { takeLatest, delay } from 'redux-saga';
import { select, put, call } from 'redux-saga/effects';
import { score } from '../lib/cards';
import { dealToDealer, determineWinner,
         setRecord, fetchingRecord,
         fetchedRecord, patchingRecord,
         patchedRecord } from '../action_creators';
import { fetchUser, patchUser } from '../lib/api';

const getDealerHand = (state) => state.game.get('dealerHand');
const getSpeed = (state) => state.settings.get('speed');
const getUserToken = 
    (state) => state.settings.get('userToken');
const getWinCount = (state) => state.game.get('winCount');
const getLossCount = (state) => state.game.get('lossCount');

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
    yield put(fetchingRecord());
    const user = yield call(fetchUser, userToken);
    yield put(fetchedRecord());
    yield put(setRecord(user.win_count, user.loss_count));
}

export function* onPatchRecord() {
    const userToken = yield select(getUserToken);
    const winCount = yield select(getWinCount);
    const lossCount = yield select(getLossCount);
    yield put(patchingRecord());
    console.log({user: { 
            win_count: winCount, 
            loss_count: lossCount
        }});
    yield call(patchUser, userToken, {
        user: { 
            win_count: winCount, 
            loss_count: lossCount
        }
    });
    yield put(patchedRecord());
}

export default function*() {
    yield [ 
        takeLatest('STAND', onStand),
        takeLatest('FETCH_RECORD', onFetchRecord),
        takeLatest('SETUP_GAME', onPatchRecord)
    ];
}
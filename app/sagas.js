import { takeEvery, delay, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';

import { dealToDealer, determineWinner, setRecord, 
         savingRecord, savedRecord, fetchingRecord,
         fetchedRecord } from './action_creators';
import { score } from './lib/cards';

import { fetchUser, patchUser } from './lib/api';

export function* dealToDealerUntilDone(getState) {
    let dealerScore = score(getState().game.get('dealerHand'));
    while (true) {
        if(dealerScore < 17) {
            yield put(dealToDealer());
            dealerScore = score(getState().game.get('dealerHand'));
            if(dealerScore >= 17) {
                break;
            }
        } else {
            break;
        }
        yield call(delay, getState().settings.get('speed'));
    }
    yield put(determineWinner());
}

export function* doFetchRecord(getState) {
    const userToken = getState().settings.get('userToken');
    if(userToken === undefined) {
        yield put(setRecord(0,0));
    } else {
        try {
            yield put(fetchingRecord());
            const user = yield call(fetchUser, userToken);
            yield put(setRecord(user.win_count, user.loss_count));
            yield put(fetchedRecord());
        } catch(e) {
            console.log(e);
            yield put(setRecord(0,0));
        }
    }
}

export function* doSaveRecord(getState) {
    const userToken = getState().settings.get('userToken');
    const winCount = getState().game.get('winCount');
    const lossCount = getState().game.get('lossCount');
    if(userToken !== undefined && 
        winCount !== undefined && 
        lossCount !== undefined) {
            
        yield put(savingRecord());
        yield call(patchUser, userToken, { 
            user: {
                win_count: winCount, 
                loss_count: lossCount 
            } 
        });
        yield put(savedRecord());
    }
}


export function* watchActions(getState) {
    yield fork(takeEvery, 'STAND', dealToDealerUntilDone, getState);
    yield fork(takeLatest, 'FETCH_RECORD', doFetchRecord, getState);
    yield fork(takeLatest, 'SETUP_GAME', doSaveRecord, getState);
}
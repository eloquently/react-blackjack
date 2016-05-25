import { takeEvery, delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { dealToDealer, determineWinner } from './action_creators';
import { score } from './lib/cards';

export function* dealToDealerUntilDone(getState) {
    let dealerScore = score(getState().get('dealerHand'));
    while (true) {
        if(dealerScore < 17) {
            yield put(dealToDealer());
            dealerScore = score(getState().get('dealerHand'));
            if(dealerScore >= 17) {
                break;
            }
        } else {
            break;
        }
        yield call(delay, 500);
    }
    yield put(determineWinner());
}

export function* watchStand(getState) {
    yield* takeEvery('STAND', dealToDealerUntilDone, getState);
}
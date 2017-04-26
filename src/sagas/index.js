/* eslint func-names: "off" */

import { takeEvery } from 'redux-saga';
import { LOAD_DEFAULT, CALC_PRICE } from '../state/job-ads';
import { loadDefault, calcPrice } from './job-ads';

export default function* rootSaga() {
    yield [
        takeEvery(LOAD_DEFAULT, loadDefault),
        takeEvery(CALC_PRICE, calcPrice)
    ];
}

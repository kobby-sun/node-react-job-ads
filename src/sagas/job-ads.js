var numeral = require('numeral');
var moment = require('moment');
import { call, put, select } from 'redux-saga/effects';
import { LOAD_DEFAULT_SUCCESS, CALC_PRICE_SUCCESS, GENERATE_PAYSLIP_SUCCESS } from '../state/job-ads';
import { api } from '../services'
import RuleParser from '../lib/rule-parser';

export function* loadDefault(action) {
    const [products, customers] = yield [
        call(api.fetchProducts),
        call(api.fetchCustomers)
    ]

    yield put({ type: LOAD_DEFAULT_SUCCESS, payload: { products: products, customers: customers } });
}

export function* calcPrice(action) {

    const products = yield select(state => state.ads.products);
    const customers = yield select(state => state.ads.customers);

    let data = action.payload.values;

    let customer = _.find(customers, { name: data.customer })
    if (customer) {
        let discounts = customer.premier.discounts

        let parser = RuleParser.new(data)

        data = parser.parseRules(discounts, products)
    }


    yield put({ type: CALC_PRICE_SUCCESS, payload: data });
}



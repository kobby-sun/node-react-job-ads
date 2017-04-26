
import flow from 'lodash/flow';
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Form, Text, Select, Textarea, Checkbox, Radio, RadioGroup, FormField, NestedForm, FormError } from 'react-form'
import { connect } from 'react-redux';
import { loadDefault, calcPrice } from '../state/job-ads';
var numeral = require('numeral');
var moment = require('moment');
var _ = require('lodash');

const AdCheckoutForm = ({ onSubmit, onChange, products, customers, cart }) => (
  <Form
    onChange={onChange}
    onSubmit={onSubmit}
    defaultValues={{
      products: []
    }}>
    {({ values, submitForm, addValue, removeValue, getError }) => {

      const customerSel = _.map(customers, customerOpt => { return { label: customerOpt.name, value: customerOpt.name } })
      const productSel = _.map(products, productOpt => { return { label: productOpt.name, value: productOpt.name } })
      const qtySel = _.map([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], qtyOpt => { return { label: qtyOpt, value: qtyOpt } })


      return (

        <form
          onSubmit={submitForm}>

          <div>
            <div className="container">
              <div className="spacer">
                <div className="row">
                  <div className="col-lg-8  col-lg-offset-2">
                    <h3>Job Ad Checkout</h3>
                    <hr />
                    <div>
                      <h4>Customer</h4>
                      <div>
                        <Select
                          className='form-control'
                          field='customer'
                          options={customerSel}
                        />
                      </div>
                    </div>
                    <br />
                    <div>
                      <h4>Products</h4>
                      <div>
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Qty</th>
                              <th>Price</th>
                              <th><button type="button" className="btn btn-default" onClick={() => addValue('products', {})}>Add Product</button></th>
                            </tr>
                          </thead>
                          <tbody>
                            {!values.products.length ? (
                              <tr><td colSpan="4"><em>No products have been added yet</em></td></tr>
                            ) : values.products.map((member, index) => (
                              <tr key={index}>
                                <td>
                                  <Select
                                    className='form-control'
                                    field={`products.${index}.product`}
                                    options={productSel}
                                  />

                                </td>
                                <td>
                                  <Select
                                    className='form-control'
                                    field={`products.${index}.qty`}
                                    options={qtySel}
                                  />
                                </td>
                                <td>
                                  {
                                    '$' + (cart.products[index] ? cart.products[index].total : 0)
                                  }
                                  <br />
                                  {
                                    (cart.products[index] && cart.products[index].discount != 0 ? '(' + -cart.products[index].discount + ')' : '')
                                  }

                                </td>
                                <td><button
                                  type="button"
                                  className="btn btn-default"
                                  title="Remove Product"
                                  onClick={() => removeValue('products', index)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td></td>
                              <td></td>
                              {cart && cart.products.length > 0 ? (
                                <td style={{ backgroundColor: '#37BC9B' }}><h4>${cart ? cart.total : '0'}</h4>
                                  {cart ? '(' + -cart.discount + ')' : '0'}</td>
                              ) : (<td></td>)}
                              <td></td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>

                    <br /><br />

                    <div>
                      <button type="submit" className="btn btn-primary">
                        Checkout
                    </button>

                    </div>

                  </div>

                </div>
              </div>
            </div>


          </div>

        </form>
      )
    }}
  </Form>
)

class AdCheckout extends React.Component {

  componentDidMount() {
    this.props.loadDefault();
  }

  render() {
    const { customers, products, cart, calcPrice } = this.props
    return (
      <AdCheckoutForm
        customers={customers}
        products={products}
        cart={cart}
        onChange={calcPrice}
        onSubmit={(values) => {
          window.alert(JSON.stringify(cart, null, 2))
        }}
      />
    );
  }
}

const stateToProps = state => ({
  customers: state.ads.customers,
  products: state.ads.products,
  cart: state.ads.cart
});

const actionsToProps = dispatch => ({
  loadDefault: () => dispatch(loadDefault()),
  calcPrice: values => dispatch(calcPrice(values))
});

AdCheckout.defaultProps = { products: [], customers: [] };

const decorators = flow([
  connect(stateToProps, actionsToProps)
]);

export default decorators(AdCheckout);
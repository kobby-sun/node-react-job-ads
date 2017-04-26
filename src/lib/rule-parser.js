var _ = require('lodash');

function RuleParser(data) {
    this.data = _.clone(data);
}

RuleParser.prototype.parseRules = function (discounts, products) {

    this.data.total = 0;
    this.data.discount = 0;

    const round = d => Math.round(d * 100) / 100

    const calc_discount = (p) => {
        let _p = _.find(products, {name: p.product})
        p.discount = 0;
        p.total = 0;
        _.each(discounts, d => {
            if (p.product == d.product.name) {
                let rule = d.rule.replace('${qty}', p.qty).replace('${price}', d.product.price)
                let discount = 0
                if (eval(rule))
                    discount = round(eval(d.discount.replace('${qty}', p.qty).replace('${price}', d.product.price)))
                p.discount += discount || 0
                
            }
        })
        if (p.qty != null && p.product != null){
            p.total = round((p.qty * _p.price) - p.discount)
        }

        this.data.total = round(this.data.total + p.total)
        this.data.discount = round(this.data.discount + p.discount)
    }

    _.each(this.data.products, p => {
        calc_discount(p)
    })

    return this.data;
};

RuleParser.new = function (data) {
    return new RuleParser(data)
}

export default RuleParser
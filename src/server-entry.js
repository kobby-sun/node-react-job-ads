import babelPolyfill from "babel-polyfill";

import path from 'path';
import express from 'express';
import compression from 'compression';
import logger from 'morgan';
import swig from 'swig';

var swagger = require('swagger-express-middleware');

var Middleware = swagger.Middleware;
var MemoryDataStore = swagger.MemoryDataStore;
var Resource = swagger.Resource;

process.env.DEBUG = 'swagger:middleware';

try {

    var app = express();
    var middleware = new Middleware(app);

    middleware.init('./static/swagger.json', function (err) {

        var p_classic = { id: 'classic', name: 'Classic Ad', price: 269.99 }
        var p_standout = { id: 'standout', name: 'Standout Ad', price: 322.99 }
        var p_premium = { id: 'premium', name: 'Premium Ad', price: 394.99 }

        var d_3for2onClassic = { name: '3for2onClassic', desc: 'Gets a for 3 for 2 deal on Classic Ads', product: p_classic, rule: '${qty} >= 3', discount: "${price}" }
        var d_discountOnStandoutPriceTo299PerAd = { name: 'discountOnStandoutPriceTo299PerAd', desc: 'Gets a discount on Standout Ads where the price drops to $299.pp per ad', product: p_standout, rule: '1 == 1', discount: "(${price} - 299) * ${qty}" }
        var d_discountOnPremiumWhere4OrMorePriceTo379dot99PerAd = { name: 'discountOnPremiumWhere4OrMorePriceTo379dot99PerAd', desc: 'Gets a discount on Premium Ads where 4 or more are purchased. The price drops to $379.99 per ad', product: p_premium, rule: '${qty} >= 4', discount: "(${price} - 379.99) * ${qty}" }
        var d_5for4onClassic = { name: '5for4onClassic', desc: 'Gets a 5 for 4 deal on Classic Ads', product: p_classic, rule: '${qty} >= 5', discount: "${price}" }
        var d_discountOnStandoutPriceTo309dot99PerAd = { name: 'discountOnStandoutPriceTo309dot99PerAd', desc: 'Gets a discount on Standout Ads where the price drops to $309.99 per ad', product: p_standout, rule: '1 == 1', discount: "(${price} - 309.99) * ${qty}" }
        var d_discountOnPremiumWhen3RrMorePriceTo389dot99PerAd = { name: 'discountOnPremiumWhen3RrMorePriceTo389dot99PerAd', desc: 'Gets a discount on Premium Ads when 3 or more are purchased. The price drops to $389.99 per ad', product: p_premium, rule: '${qty} >= 3', discount: "(${price} - 389.99) * ${qty}" }
        

        var myDB = new MemoryDataStore();
        myDB.save(
            new Resource('/api/products/classic', p_classic),
            new Resource('/api/products/standout', p_standout),
            new Resource('/api/products/premium', p_premium),

            new Resource('/api/discounts/3for2onClassic', d_3for2onClassic),
            new Resource('/api/discounts/discountOnStandoutPriceTo299PerAd', d_discountOnStandoutPriceTo299PerAd),
            new Resource('/api/discounts/discountOnPremiumWhere4OrMorePriceTo379dot99PerAd', d_discountOnPremiumWhere4OrMorePriceTo379dot99PerAd),
            new Resource('/api/discounts/5for4onClassic', d_5for4onClassic),
            new Resource('/api/discounts/discountOnStandoutPriceTo309dot99PerAd', d_discountOnStandoutPriceTo309dot99PerAd),
            new Resource('/api/discounts/discountOnPremiumWhen3RrMorePriceTo389dot99PerAd', d_discountOnPremiumWhen3RrMorePriceTo389dot99PerAd),

            new Resource('/api/customers/DEFAULT', { name: 'DEFAULT', premier: { name: 'DEFAULT Premier', discounts: [] } }),
            new Resource('/api/customers/UNILEVER', { name: 'UNILEVER', premier: { name: 'UNILEVER Premier', discounts: [d_3for2onClassic] } }),
            new Resource('/api/customers/APPLE', { name: 'APPLE', premier: { name: 'APPLE Premier', discounts: [d_discountOnStandoutPriceTo299PerAd] } }),
            new Resource('/api/customers/NIKE', { name: 'NIKE', premier: { name: 'NIKE Premier', discounts: [d_discountOnPremiumWhere4OrMorePriceTo379dot99PerAd] } }),
            new Resource('/api/customers/FORD', { name: 'FORD', premier: { name: 'FORD Premier', discounts: [d_5for4onClassic, d_discountOnStandoutPriceTo309dot99PerAd, d_discountOnPremiumWhen3RrMorePriceTo389dot99PerAd] } }),
        );


        //middleware(path.join(__dirname, '../tests/files/petstore.yaml'), app, function(err, middleware) {
        // middleware(path.join('./static/swagger.json'), app, function (err, middleware) {

        var server = require('http').createServer(app);

        app.set('port', process.env.PORT || 8000);
        app.use(compression());
        app.use(logger('dev'));

        app.use(express.static('static'));

        app.get('/', function (req, res, next) {
            let page = swig.renderFile('views/index.html', {});
            res.status(200).send(page);
        });

        // Add all the Swagger Express Middleware, or just the ones you need.
        // NOTE: Some of these accept optional options (omitted here for brevity)
        app.use(
            middleware.metadata(),
            middleware.CORS(),
            middleware.files({
                // Override the Express App's case-sensitive and strict-routing settings
                // for the Files middleware.
                caseSensitive: false,
                strict: false
            },
                {
                    // Serve the Swagger API from "/swagger/api" instead of "/api-docs"
                    apiPath: '/api',

                    // Disable serving the "PetStore.yaml" file
                    rawFilesPath: false
                }),
            middleware.parseRequest(),
            middleware.validateRequest(),
            middleware.mock(myDB)
        );


        //error log
        app.use(function (err, req, res, next) {
            console.log(err.stack.red);
            res.status(err.status || 500);
            res.send({ message: err.message });
        });

        app.listen(8000, function () {
            console.log('The Swagger Pet Store is now running at http://localhost:8000');
        });
    });
}
catch (error) {
    console.error('@error.stack || error');
    console.error(error.stack || error);
}

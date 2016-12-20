/* jshint node: true */

module.exports = function (environment) {
    var ENV = {
        modulePrefix: 'cdg-frontend',
        environment: environment,
        rootURL: '/',
        locationType: 'auto',
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            },
            EXTEND_PROTOTYPES: {
                // Prevent Ember Data from overriding Date.parse.
                Date: false
            }
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        }
    };

    if (environment === 'development') {
        ENV.APP.CONTENTFUL_SPACE = "nibrxe5ozouo";
        ENV.APP.CONTENTFUL_ACCESS_TOKEN = "da2826c8c0a71a8a2def6ad4d01110b575abbeaf2e9c37311011eb82d4fc6973";
        ENV.googleMap = {
          apiKey: 'AIzaSyCSrrLhuDjF6M36ss5Yc7YMtk9GCf3TYkA'
        };
        ENV.contentSecurityPolicy = {
          'default-src': "'none'",
          'script-src': "'self' 'unsafe-eval' *.googleapis.com maps.gstatic.com",
          'font-src': "'self' fonts.gstatic.com",
          'connect-src': "'self' maps.gstatic.com",
          'img-src': "'self' *.googleapis.com maps.gstatic.com csi.gstatic.com",
          'style-src': "'self' 'unsafe-inline' fonts.googleapis.com maps.gstatic.com"
        };
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'test') {
        ENV.APP.CONTENTFUL_SPACE = "nibrxe5ozouo";
        ENV.APP.CONTENTFUL_ACCESS_TOKEN = "da2826c8c0a71a8a2def6ad4d01110b575abbeaf2e9c37311011eb82d4fc6973";

        // Testem prefers this...
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {

    }

    return ENV;
};

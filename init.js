/**
 Require js initialization module definition file for StudioLite
 @class Require init js
 **/
require.config({
    waitSeconds: 25,
    baseUrl: '/components/digg/',
    paths: {
        'Elements': 'Elements',
        'Consts': 'Consts',
        'jquery': '_common/_jquery/std/jq1.9.1/jquery-1.9.1',
        'backbone': '_common/_js/backbone/backbone',
        'text': '_common/_js/requirejs/text',
        'backbone.controller': '_common/_js/backbone-controller/backbone.controller',
        'RC4': '_common/_js/rc4/RC4',
        'Lib': '_libs/Lib',
        'bootbox': '_common/_js/bootbox/bootbox',
        'platform': '_common/_js/platform/platform',
        'moment': '_common/_js/moment/moment',
        'Cookie': '_common/_js/cookie/jquery.cookie',
        'visibility': '_common/_js/visibility/jquery.visible',
        'ComBroker': '_controllers/ComBroker',
        'XDate': '_common/_js/xdate/xdate',
        'simplestorage': '_common/_js/simplestorage/simpleStorage',
        'underscore': '_common/_js/underscore/underscore',
        'bootstrap': '_common/_js/bootstrap/js/bootstrap',
        'localizer': '_common/_js/localizer/dist/jquery.localize',
        'StackView': '_views/StackView',
        'TimelineMax': '_common/_js/gsap/TimelineMax',
        'TweenMax': '_common/_js/gsap/TweenMax',
        'TweenLite': '_common/_js/gsap/TweenLite',
        'ScrollToPlugin': '_common/_js/gsap/plugins/ScrollToPlugin',
        'DiggView': '_views/DiggView',
        'LoadingView': '_views/LoadingView',
        'DiggModel': '_models/DiggModel',
        'DiggCollection': '_collections/DiggCollection'
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'Consts': {
            deps: ['backbone']
        },
        'backbone.controller': {
            deps: ['underscore', 'jquery']
        },
        'LayoutRouter': {
            deps: ['Elements', 'backbone.controller']
        },
        'ScrollToPlugin': {
            exports: 'ScrollToPlugin'
        },
        'underscore': {
            exports: '_'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'visibility': {
            deps: ['jquery'],
            exports: 'visibility'
        },
        'Cookie': {
            deps: ['jquery'],
            exports: 'cookie'
        },
        'ComBroker': {
            deps: ['backbone', 'jquery']
        },
        'Elements': {
            exports: 'Elements'
        },
        'bootbox': {
            deps: ['jquery'],
            exports: 'bootbox'
        },
        'RC4': {
            exports: 'RC4'
        }
    }
});

require(['App'], function (App) {
    new App();
});
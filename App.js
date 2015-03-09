/**
 App MediaSignage Inc (c) open source digital signage project.
 Visit Github for license and docs: http://git.digitalsignage.com
 @class App
 @constructor
 @return {Object} instantiated App
 **/
define(['underscore', 'jquery', 'backbone', 'bootstrap', 'backbone.controller', 'ComBroker', 'Lib', 'TweenLite', 'ScrollToPlugin', 'Elements', 'DiggView', 'LoadingView', 'text!_templates/_diggEntry.html'], function (_, $, Backbone, Bootstrap, backbonecontroller, ComBroker, Lib, TweenLite, ScrollToPlugin, Elements, DiggView, LoadingView, diggEntry) {
    var App = Backbone.Controller.extend({

        // app init
        initialize: function () {
            var self = this;
            window.BB = Backbone;
            BB.globs = {};
            BB.SERVICES = {};
            BB.EVENTS = {};
            BB.LOADING = {};
            BB.CONSTS = {};
            BB.SCROLL_SPEED = 10;
            BB.globs['UNIQUE_COUNTER'] = 0;
            BB.globs['RC4KEY'] = '226a3a42f34ddd778ed2c3ba56644315';
            BB.lib = new Lib();
            BB.lib.addBackboneViewOptions();
            BB.comBroker = new ComBroker();
            BB.comBroker.name = 'AppBroker';
            window.log = BB.lib.log;
            self.m_skip = false;
            self.m_scrollPosition = 0;
            $.ajaxSetup({cache: false});
            $.ajaxSetup({
                headers: {'Authorization': 'somePasswordHere'}
            });

            _.templateSettings = {interpolate: /\{\{(.+?)\}\}/g};
            self.m_diggEntry = _.template(diggEntry);
            self._loadPosts();

            self._initViews();

            /*
             // internationalization
             require(['localizer'], function () {
             var lang = "en";
             var opts = { language: lang, pathPrefix: "./_lang" };
             $("[data-localize]").localize("local", opts);
             });

             // router init
             require(['LayoutRouter'], function (LayoutRouter) {
             var LayoutRouter = new LayoutRouter();
             BB.history.start();
             BB.comBroker.setService(BB.SERVICES['LAYOUT_ROUTER'], LayoutRouter);
             LayoutRouter.navigate('authenticate/_/_', {trigger: true});
             });
             */
        },

        _initViews: function () {
            var self = this;
            // internationalization
            require(['StackView', 'DiggCollection'], function (StackView, DiggCollection) {

                self.m_stackView = new StackView.Fader({duration: 333});
                BB.comBroker.setService('APP_STACK_VIEW', self.m_stackView);

                self.m_diggCollection = new DiggCollection();


                self.m_loadingView = new LoadingView({
                    el: Elements.LOADING_CONTAINER,
                    collection: self.m_diggCollection
                });

                self.m_diggView = new DiggView({
                    el: Elements.DIGG_CONTAINER,
                    collection: self.m_diggCollection
                });

                self.m_stackView.addView(self.m_loadingView);
                self.m_stackView.addView(self.m_diggView);
                self.m_stackView.selectView(self.m_loadingView);

                self.m_diggCollection.getData();
            });
        },

        /**
         Every interval scroll page, of no changes, we hit bottom
         and scroll back to top
         @method _scroll
         **/
        _scroll: function () {
            var self = this;
            var $win = $(window);
            var times = 1;

            setInterval(function () {
                var currentPosition = $win.scrollTop();

                // page @ top
                if (currentPosition == 0) {
                    self.m_skip = false;
                    times = 1;
                    self.m_scrollPosition = 0;
                    return;
                }

                // no changes, page @ bottom
                if (currentPosition == self.m_scrollPosition) {
                    TweenLite.to(window, 2, {scrollTo: {y: 0}, ease: Power2.easeOut});
                    self.m_skip = true;
                    times = 1;
                    self.m_scrollPosition = currentPosition;
                    return;
                }
                self.m_scrollPosition = currentPosition;

            }, 3000);

            setInterval(function () {
                if (self.m_skip)
                    return;
                TweenLite.to(window, 2, {scrollTo: {y: times}, ease: Power2.easeOut});
                times = times + BB.SCROLL_SPEED;
            }, 500);
        },

        /**
         Load Digg posts
         @method _loadPosts
         **/
        _loadPosts: function () {
            var self = this;

            $.get('https://secure.digitalsignage.com/Digg', function (data) {
                var half = Math.round(_.size(data) / 2);
                var i = 0;
                _.forEach(data, function (k) {
                    i++;
                    var ele = (i > half) ? Elements.DIGGS_P1 : Elements.DIGGS_P2;
                    $(ele).append(self.m_diggEntry(k));
                });
                self._scroll();
            });
        }
    });
    return App;
});
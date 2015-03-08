/**
 App MediaSignage Inc (c) open source digital signage project.
 Visit Github for license and docs: http://git.digitalsignage.com
 @class App
 @constructor
 @return {Object} instantiated App
 **/
define(['underscore', 'jquery', 'backbone', 'bootstrap', 'backbone.controller', 'ComBroker', 'Lib', 'TweenLite', 'ScrollToPlugin', 'visibility', 'text!_templates/_diggEntry.html'], function (_, $, Backbone, Bootstrap, backbonecontroller, ComBroker, Lib, TweenLite, ScrollToPlugin, visibility, diggEntry) {
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
            BB.globs['UNIQUE_COUNTER'] = 0;
            BB.globs['RC4KEY'] = '226a3a42f34ddd778ed2c3ba56644315';
            BB.lib = new Lib();
            BB.lib.addBackboneViewOptions();
            BB.comBroker = new ComBroker();
            BB.comBroker.name = 'AppBroker';
            window.log = BB.lib.log;
            self.m_skip = false;
            self.m_times = 0;
            self.m_scrollPosition = 0;
            $.ajaxSetup({cache: false});
            $.ajaxSetup({
                headers: {'Authorization': 'somePasswordHere'}
            });

            _.templateSettings = {
                interpolate: /\{\{(.+?)\}\}/g
            };

            self.m_diggEntry = _.template(diggEntry);

            self._loadPosts();

            // internationalization
            /*
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

        /**
         Load Digg posts
         @method _loadPosts
         **/
        _loadPosts: function () {
            var self = this;

            $.get('https://secure.digitalsignage.com/Digg', function (data) {
                $('#loadingDigg').fadeOut();
                var half = Math.round(_.size(data) / 2);
                var i = 0;
                var $win = $(window);
                self.m_times = 1;
                _.forEach(data, function (k) {
                    i++;
                    var ele = (i > half) ? '#diggsP1' : '#diggsP2';
                    $(ele).append(self.m_diggEntry(k));
                });

                setInterval(function () {
                    var currentPosition = $win.scrollTop();
                    if (currentPosition == 0){
                        self.m_skip = false;
                        self.m_times = 1;
                        self.m_scrollPosition = 0;
                        return;
                    }
                    if (currentPosition == self.m_scrollPosition){
                        TweenLite.to(window, 2, {scrollTo: {y: 0}, ease: Power2.easeOut});
                        self.m_skip = true;
                        self.m_times = 1;
                        self.m_scrollPosition = currentPosition;
                        return;
                    }
                    self.m_scrollPosition = currentPosition;
                }, 3000);

                setInterval(function () {
                    if (self.m_skip)
                        return;
                    TweenLite.to(window, 2, {scrollTo: {y: self.m_times}, ease: Power2.easeOut});
                    self.m_times = self.m_times + 10;
                }, 700);


            });
        }
    });
    return App;
});
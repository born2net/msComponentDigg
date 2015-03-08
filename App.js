/**
 App MediaSignage Inc (c) open source digital signage project.
 Visit Github for license and docs: http://git.digitalsignage.com
 @class App
 @constructor
 @return {Object} instantiated App
 **/
define(['underscore', 'jquery', 'backbone', 'bootstrap', 'backbone.controller', 'ComBroker', 'Lib', 'TweenLite', 'ScrollToPlugin', 'text!_templates/_diggEntry.html'], function (_, $, Backbone, Bootstrap, backbonecontroller, ComBroker, Lib, TweenLite, ScrollToPlugin, diggEntry) {
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
                var times = 1;
                var skip = false;

                _.forEach(data, function (k) {
                    i++;
                    var ele = (i > half) ?  '#diggsP1' : '#diggsP2';
                    $(ele).append(self.m_diggEntry(k));
                });

                setInterval(function () {
                    if (skip)
                        return;
                    TweenLite.to(window, 2, {scrollTo: {y: times}, ease: Power2.easeOut});
                    times = times + 10;
                }, 500);


                $win.scroll(function () {
                    if ($win.scrollTop() == 0) {
                        skip = false;
                        // hit the top
                    } else if ($win.height() + $win.scrollTop() == $(document).height()) {
                        // hit the bottom
                        skip = true;
                        times = 0;
                        TweenLite.to(window, 2, {scrollTo: {y: times}, ease: Power2.easeOut});
                    }
                });
            });
        }
    });
    return App;
});
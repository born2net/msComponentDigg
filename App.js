/**
 App MediaSignage Inc (c) open source digital signage project.
 Visit Github for license and docs: http://git.digitalsignage.com
 @class App
 @constructor
 @return {Object} instantiated App
 **/
define(['Consts', 'bootstrap', 'backbone.controller', 'ComBroker', 'Lib', 'Elements', 'DiggView', 'LoadingView'], function (Consts, bootstrap, backbonecontroller, ComBroker, Lib, Elements, DiggView, LoadingView) {
    var App = Backbone.Controller.extend({

        // app init
        initialize: function () {
            var self = this;
            BB.SCROLL_SPEED = 10;
            BB.globs['UNIQUE_COUNTER'] = 0;
            BB.lib = new Lib();
            BB.lib.addBackboneViewOptions();
            BB.comBroker = new ComBroker();
            BB.comBroker.name = 'AppBroker';
            window.log = BB.lib.log;

            $.ajaxSetup({cache: false});
            $.ajaxSetup({headers: {'Authorization': ''}});
            self._initViews();
        },

        /**
         Initialize the Backbone views of the application
         @method _initViews
         **/
        _initViews: function () {
            var self = this;
            require(['StackView', 'DiggCollection'], function (StackView, DiggCollection) {

                self.m_stackView = new StackView.Fader({duration: 333});
                BB.comBroker.setService(BB.EVENTS.APP_STACK_VIEW, self.m_stackView);

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
        }
    });
    return App;
});
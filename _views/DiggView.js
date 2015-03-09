/**
 Digg Backbone posts view
 @class DiggView
 @constructor
 @return {object} instantiated DiggView
 **/
define(['jquery', 'backbone', 'text!_templates/DiggArticle.html', 'TweenLite', 'ScrollToPlugin'], function ($, Backbone, DiggArticle, TweenLite, ScrollToPlugin) {


    var DiggView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.m_skip = false;
            self.m_scrollPosition = 0;
            _.templateSettings = {interpolate: /\{\{(.+?)\}\}/g};
            self.m_diggArticle = _.template(DiggArticle);

            self.collection.on('add', function () {
                self._loadPosts();
            });
        },

        /**
         Load Digg posts
         @method _loadPosts
         **/
        _loadPosts: function () {
            var self = this;
            var half = Math.round(self.collection.length / 2);
            var i = 0;
            self.collection.forEach(function (model) {
                i++;
                var ele = (i > half) ? Elements.DIGGS_P1 : Elements.DIGGS_P2;
                $(ele).append(self.m_diggArticle(model.toJSON()));
            });
            self._scroll();

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
        }
    });

    return DiggView;
});
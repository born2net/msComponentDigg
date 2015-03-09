/**
 Digg data collection
 @class DiggCollection
 @constructor
 @return {Object} instantiated DiggCollection
 **/
define(['jquery', 'backbone', 'DiggModel'], function ($, Backbone, DiggModel) {

    var DiggCollection = Backbone.Collection.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
        },

        getData: function(){
            var self = this;
            self.fetch({
                data: {},
                success: function (models) {
                    log(models);
                },
                error: function () {
                    log('error fetch /Queues collection');
                }
            });
        },

        model: DiggModel,
        url: 'https://secure.digitalsignage.com/Digg',
        _loadDiggPosts: function(){
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

    return DiggCollection;

});
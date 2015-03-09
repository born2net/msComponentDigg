/**
 Digg data model
 @class DiggModel
 @constructor
 @return {Object} instantiated DiggModel
 **/
define(['jquery', 'backbone'], function ($, Backbone) {

    var DiggModel = Backbone.Model.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            //self._loadDiggPosts();

            self.on('change',function(e){
                log(e);
                log(self.get(0));
            });
            self.fetch();
        },

        change: function(e){
            log(e);
        },
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

    return DiggModel;

});
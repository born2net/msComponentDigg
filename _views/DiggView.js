/**
 Digg Backbone posts view
 @class DiggView
 @constructor
 @return {object} instantiated DiggView
 **/
define(['jquery', 'backbone'], function ($, Backbone) {


    var DiggView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            self.collection.on('add', function(){
                console.log('Collection data added');
                BB.comBroker.getService('APP_STACK_VIEW').selectView(Elements.DIGG_CONTAINER);
                self.collection.off('add');
            });
        }

    });

    return DiggView;
});
/**
 Loading progress view
 @class LoadingView
 @constructor
 @return {object} instantiated LoadingView
 **/
define(['jquery', 'backbone'], function ($, Backbone) {

    /**
     Custom event fired when bar meter changed event
     @event BAR_METER_CHANGED
     @param {This} caller
     @param {Self} context caller
     @param {Event}
     @static
     @final
     **/
    // Backbone.EVENTS.BAR_METER_CHANGED = 'BAR_METER_CHANGED';

    var LoadingView = Backbone.View.extend({

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

    return LoadingView;
});
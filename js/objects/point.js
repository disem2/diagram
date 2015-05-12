/**
 * Created by dima on 09.05.15.
 */

var Point = Parse.Object.extend('Point', {
    position: {
        x: null,
        y: null
    },
    dId: null,

    setPosition: function(position) {
        this.set('position', position);
    }
});
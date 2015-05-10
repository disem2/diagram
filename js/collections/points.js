/**
 * Created by dima on 09.05.15.
 */
var Points = Backbone.Collection. extend({
    model: Point,

    addPoint: function(position) {
        var point = new Point({
            position: {
                x: position.x,
                y: position.y
            }
        });
        this.add(point);
    },

    getPointsCoordinates: function() {
        var result = [];

        this.each(function(element){
            result.push(element.get('position'));
        }, this);
        return result;
    }
});
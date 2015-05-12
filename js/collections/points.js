/**
 * Created by dima on 09.05.15.
 */
var Points = Parse.Collection. extend({
    model: Point,
    query: new Parse.Query(Point),

    //addPoint: function(position) {
    //    var point = new Point({
    //        position: {
    //            x: position.x,
    //            y: position.y
    //        }
    //    });
    //    point.save(null, {
    //        success: function (object) {
    //            console.log('done');
    //        },
    //        error: function (model, error) {
    //            console.log(error);
    //        }
    //    });
    //},

    sortCollection: function() {
        this.comparator = function(object) {
            return object.get('position').x;
        };

        this.sort();
    },

    getPointsCoordinates: function() {
        var result = [];

        this.each(function(element){
            result.push(element.get('position'));
        }, this);
        return result;
    },

    getObject: function(id) {
        var el;
        this.each(function(element){
            if(element.get('dId') == id){
                el = element;
            }
        }, this);
        return el;
    }
});
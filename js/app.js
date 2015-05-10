var startPoints = [
    {
        x: 1,
        y: 3
    },
    {
        x: 2,
        y: 8
    },
    {
        x: 3,
        y: 5
    },
    {
        x: 4,
        y: 6
    }
];


var AppView = Backbone.View.extend({
    el: '#app',

    events: {

    },
    collections: {
        points: null
    },
    field: {
        canvas: null,
        divisionX: 100,
        divisionY: 10,
        pointRadius: 3,
        fieldSize: {
            x: 800,
            y: 100
        }
    },

    initialize: function() {
        this.collections.points = new Points();
        this.addPoints(startPoints);
        this.drawField();
        this.render();
    },

    addPoints: function(points) {
        var i = 0, pointsQuantity = points.length;

        for(i; i < pointsQuantity; i++) {
            this.collections.points.addPoint(points[i]);
        }

    },

    drawField: function() {
        this.field.canvas = d3.select('#app')
            .append('svg')
            .attr('width', this.field.fieldSize.x)
            .attr('height', this.field.fieldSize.y);
    },

    drawCircles: function(circles) {
        var i = 0, circlesQuantity = circles.length;

        for(i; i < circlesQuantity; i++) {
            this.drawCircle(circles[i]);
        }

    },

    drawCircle: function(position) {
        this.field.canvas.append('circle')
            .attr('cx', position.x * this.field.divisionX)
            .attr('cy', position.y * this.field.divisionY)
            .attr('r', this.field.pointRadius)
            .attr('fill', 'red');
    },

    render: function() {
        this.drawCircles(this.collections.points.getPointsCoordinates());
    }
});
var appView = new AppView();
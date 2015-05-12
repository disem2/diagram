
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
        divisionY: 20,
        pointRadius: 4,
        fieldSize: {
            x: 800,
            y: 400
        },
        pointColor: '#FF0000',
        vectorColor: '#FF0000',
        vectorWidth: 2
    },
    behavior: null,

    initialize: function() {
        Parse.initialize("p8Vs9Umpi09ID0eGQIhZrY8d4688hw50jNMa1lDK", "bJcXykDRqxeq1dFfkztJAzWplfmiWxHyMUtgETKi");
        var that = this;
        this.collections.points = new Points();
        this.collections.points.fetch({
            success: function () {
                that.render();
            }
        });
        this.collections.points.sortCollection();

        this.drawField();
        this.render();
        this.addChangingValuesListener();

    },

    addChangingValuesListener: function() {
        var that = this;
        this.behavior = d3.behavior.drag()
            .on("dragstart", function(){
                d3.select(this).style('fill', 'green');
            })
            .on("drag", function(){
                var target = this,
                    id = $(target).attr('data-id'),
                    lines = d3.selectAll("." + id)[0],
                    i = 0, linesQuantity = lines.length;
                d3.select(this)
                    .attr('cy', d3.event.y);

                for(i; i < linesQuantity; i++) {
                    if($(lines[i]).attr('left-point') === id) {
                        d3.select(lines[i]).attr('y1', d3.event.y);
                    } else if($(lines[i]).attr('right-point') === id) {
                        d3.select(lines[i]).attr('y2', d3.event.y);
                    }
                }

            })
            .on("dragend", function(){
                d3.select(this).style('fill', that.field.pointColor);
                var target = this,
                    id = $(target).attr('data-id'),
                    currentObject = that.collections.points.getObject(id),
                    newY = (that.field.fieldSize.y - d3.event.sourceEvent.offsetY) / that.field.divisionY,
                    position = {
                        x: currentObject.get('position').x,
                        y: newY
                    };

                currentObject.setPosition(position);

                currentObject.save();

            })
    },

    drawField: function() {
        var i = 1, XDivisionsQuantity = this.field.fieldSize.x / this.field.divisionX,
            j = 1, YDivisionsQuantity = this.field.fieldSize.y / this.field.divisionY;

        this.field.canvas = d3.select('#app')
            .append('svg')
            .attr('width', this.field.fieldSize.x)
            .attr('height', this.field.fieldSize.y);

        this.field.canvas.append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', this.field.fieldSize.y)
            .attr('stroke', '#000000')
            .attr('stroke-width', 1);

        this.field.canvas.append('line')
            .attr('x1', 0)
            .attr('y1', this.field.fieldSize.y)
            .attr('x2', this.field.fieldSize.x)
            .attr('y2', this.field.fieldSize.y)
            .attr('stroke', '#000000')
            .attr('stroke-width', 1);

        for(i; i < XDivisionsQuantity; i++) {
            this.field.canvas.append('line')
                .attr('x1', i * this.field.divisionX)
                .attr('y1', this.field.fieldSize.y - 5)
                .attr('x2', i * this.field.divisionX)
                .attr('y2', this.field.fieldSize.y)
                .attr('stroke', '#000000')
                .attr('stroke-width', 1);
        }
        for(j; j < YDivisionsQuantity; j++) {
            this.field.canvas.append('line')
                .attr('x1', 0)
                .attr('y1', this.field.fieldSize.y - j * this.field.divisionY)
                .attr('x2', 5)
                .attr('y2', this.field.fieldSize.y - j * this.field.divisionY)
                .attr('stroke', '#000000')
                .attr('stroke-width', 1);
        }

    },

    drawPoints: function(points) {
        var i = 0, pointsQuantity = points.length;

        for(i; i < pointsQuantity; i++) {
            this.drawCircle(points[i]);
        }

    },

    drawVectors: function(points) {
        var i = 0, pointsQuantity = points.length;

        for(i; i < pointsQuantity - 1; i++) {
            this.drawLine(points[i], points[i+1]);
        }

    },

    drawLine: function(position1, position2) {
        
        this.field.canvas.append('line')
            .attr('x1', position1.x * this.field.divisionX)
            .attr('y1', this.field.fieldSize.y - position1.y * this.field.divisionY)
            .attr('x2', position2.x * this.field.divisionX)
            .attr('y2', this.field.fieldSize.y - position2.y * this.field.divisionY)
            .attr('left-point', "x" + position1.x)
            .attr('right-point', "x" + position2.x)
            .attr('class', 'line x' + position1.x + " x" + position2.x)
            .attr('stroke', this.field.vectorColor)
            .attr('stroke-width', this.field.vectorWidth);
    },

    drawCircle: function(position) {

        this.field.canvas.append('circle')
            .attr('cx', position.x * this.field.divisionX)
            .attr('cy', this.field.fieldSize.y - position.y * this.field.divisionY)
            .attr('data-id', "x" + position.x)
            .attr('class', 'point')
            .attr('r', this.field.pointRadius)
            .attr('fill', this.field.pointColor)
            .call(this.behavior);
},

    render: function() {
        this.drawVectors(this.collections.points.getPointsCoordinates());
        this.drawPoints(this.collections.points.getPointsCoordinates());
    }
});
var appView = new AppView();
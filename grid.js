function playTestSound() {
var audio = new Audio('kick.wav');
audio.play();
}

function gridData() {
	var data = new Array();
	var xpos = 50; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	var ypos = 50;
	var width = 25;
	var height = 25;
	var click = 0;
	
	// iterate for rows	
	for (var row = 0; row < 11; row++) {
		data.push( new Array() );
		
		// iterate for cells/columns inside rows
		for (var column = 0; column < 16; column++) {
			data[row].push({
				x: xpos,
				y: ypos,
				width: width,
				height: height,
				click: click
			})
			// increment the x position. I.e. move it over by 50 (width variable)
			xpos += width + 50;
		}
		// reset the x position after a row is complete
		xpos = 50;
		// increment the y position for the next row. Move it down 50 (height variable)
		ypos += height+32;	
	}
	return data;
}

var gridData = gridData();	
// I like to log the data to the console for quick debugging
console.log(gridData);

var grid = d3.select("#grid")
	.append("svg")
	.attr("width",screen.width)
	.attr("height",screen.height);
	
var row = grid.selectAll(".row")
	.data(gridData)
	.enter().append("g")
	.attr("class", "row");
	
var column = row.selectAll(".square")
	.data(function(d) { return d; })
	.enter().append("rect")
	.attr("class","square")
	.attr("x", function(d) { return d.x; })
	.attr("y", function(d) { return d.y; })
	.attr("width", function(d) { return d.width; })
    .attr("height", function(d) { return d.height; })
    .style("fill-opacity",0)
	.style("fill", "#ffffff")
	.style("stroke", "#fff")
	.on('click', function(d) {
       d.click ++;
       if ((d.click)%2 == 0 ) { d3.select(this).style("fill","#fff").style("fill-opacity",0); }
	   if ((d.click)%2 == 1 ) { d3.select(this).style("fill","#ffffff").style("fill-opacity",1); }
    });

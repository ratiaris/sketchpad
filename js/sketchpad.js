var minSize = 10;
var backgroundColor = "green";
var foregroundColor = "blue";

var random255 = function() {
	return Math.floor((Math.random() * 255) + 1);
}

var randomRGB = function() {
	return "rgb(" + random255() +"," + random255() +"," + random255() +")";
}

var resetBoxShadow = function() {
	this.style.boxShadow = "inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 6px -6px black";
}

var generateGrids = function(width, height, nbGrids) {
	if ((nbGrids * (minSize + 1) + 1) > width) {
		nbGrids = Math.floor(width / (minSize + 1) - 1);		
		rowHeight = minSize;
		cellWidth = minSize;
		console
	} else {
		var rowHeight = Math.floor((width - nbGrids - 1)/ nbGrids);
		var cellWidth = Math.floor((height - nbGrids - 1) / nbGrids);
		if (rowHeight < cellWidth) {
			rowHeight = cellWidth;
		} else {
			cellWidth = rowHeight;
		}
		if (rowHeight < minSize) {
			rowHeight = minSize;
			cellWidth = minSize;
			//$body.width(minSize * nbGrids + nbGrids + 1);
		}
	}
	console.log("Width: " + width + " |Height: " + height);
	console.log("rowHeight: " + rowHeight + " |cellWidth: " + cellWidth);
	console.log("nbGrids: " + nbGrids);
	var grids = [];
	for (var gridRowIndex = 0; gridRowIndex < nbGrids; ++gridRowIndex) {
		grids.push('<div class="grid-row">');
		for (var gridColumnIndex = 0; gridColumnIndex < nbGrids; ++gridColumnIndex) {
			//grids.push('<div class="grid">' + (gridRowIndex * nbGrids + gridColumnIndex + 1) + '</div>');
			grids.push('<div class="grid"></div>');
		}
		grids.push('</div>');
	}	
	var section = document.getElementById('grid-container');
	section.innerHTML = grids.join('');


    //var css = '.grid{width:' + cellWidth + 'px;}.grid-row{height:' + rowHeight +'px;}.grid-container{height:' + gridSize +'px;width:' + gridSize +'px;}';
    var css = '.grid{width:' + cellWidth + 'px;}.grid-row{height:' + rowHeight +'px;}';
    //console.log('style: ' +css);
	var $style = $('<style type="text/css"></style>').appendTo('head'); 
    $style.html(css);
    $('.grid').mouseenter(function() {
    	if (this.hasChangedColor !== undefined) {
	    	var opacity = parseFloat($(this).css("opacity"));
	    	if (opacity < 1) {
	    		opacity += 0.1;
		    	$(this).css("opacity" , opacity);
	    	}
    	} else {
    		var color = randomRGB();
	    	$(this).css( { "background-color" : color, "opacity" : 0.1 });
	    	this.hasChangedColor = true;
    	}
	});
}

$(document).ready(function() {
	var $body = $(this.ie6 ? document.body : document); // using document in ie6 causes a crash
	var width = $body.width();
	var height = $body.height();

	var button = document.getElementById('button');
	button.onmousedown = function() {
		this.style.boxShadow = "inset 0 1px 4px rgba(0, 0, 0, 0.6)";
		var nbGrids = prompt("How many grids per side shall be generated?");
		generateGrids(width, height, nbGrids);
	};	
	button.onmouseup = resetBoxShadow;
	button.onmouseout = resetBoxShadow;
	generateGrids(width, height, 150);
});
var grid_size = 64;
var minSize = 10;
var backgroundColor = "green";
var foregroundColor = "blue";

var random255 = function() {
	return Math.floor((Math.random() * 255) + 1);
}

var randomRGB = function() {
	return "rgb(" + random255() +"," + random255() +"," + random255() +")";
}

$(document).ready(function() {
	var $body = $(this.ie6 ? document.body : document); // using document in ie6 causes a crash
	var width = $body.width();
	var height = $body.height();

	var rowHeight = Math.floor((height - grid_size - 1)/ grid_size);
	var cellWidth = Math.floor((width - grid_size - 1) / grid_size);
	if (rowHeight < cellWidth) {
		rowHeight = cellWidth;
	} else {
		cellWidth = rowHeight;
	}
	if (rowHeight < minSize) {
		rowHeight = minSize;
		cellWidth = minSize;
		//$body.width(minSize * grid_size + grid_size + 1);
	}
	console.log("Width: " + width + " |Height: " + height);
	console.log("rowHeight: " + rowHeight + " |cellWidth: " + cellWidth);
	var grids = [];
	for (var gridRowIndex = 0; gridRowIndex < grid_size; ++gridRowIndex) {
		grids.push('<div class="grid-row">');
		for (var gridColumnIndex = 0; gridColumnIndex < grid_size; ++gridColumnIndex) {
			//grids.push('<div class="grid">' + (gridRowIndex * grid_size + gridColumnIndex + 1) + '</div>');
			grids.push('<div class="grid"></div>');
		}
		grids.push('</div>');
	}	
	var $section = $('#grid-container');
	$section.append(grids.join(''));

    var css = '.grid{width:' + cellWidth + 'px;}.grid-row{height:' + rowHeight +'px;}';
    console.log('style: ' +css);
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
});
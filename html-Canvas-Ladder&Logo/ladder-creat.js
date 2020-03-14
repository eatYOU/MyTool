window.onload = function() {
	draw([1], '#00b050'); //green
	draw([2], '#00b050');
	draw([3], '#00b050');
	draw([4], '#00b050');
	draw([5], '#00b050');
	newLine();

	draw([5, 1], '#0070c0'); //blue
	draw([5, 2], '#0070c0');
	draw([5, 3], '#0070c0');
	draw([5, 4], '#0070c0');
	draw([10], '#0070c0');
	newLine();

	draw([10, 1], '#7030a0'); //purple
	draw([10, 2], '#7030a0');
	draw([10, 3], '#7030a0');
	draw([10, 4], '#7030a0');
	draw([10, 5], '#7030a0');
	newLine();

	draw([10, 5, 1], '#f0c000'); //orange
	draw([10, 5, 2], '#f0c000');
	draw([10, 5, 3], '#f0c000');
	draw([10, 5, 4], '#f0c000');
	draw([10, 10], '#f0c000');
	newLine();

	draw([10, 10, 1], '#ff0000'); //red
	draw([10, 10, 2], '#ff0000');
	draw([10, 10, 3], '#ff0000');
	draw([10, 10, 4], '#ff0000');
	draw([10, 10, 5], '#ff0000');
	newLine();
}


function draw(array, color) {
	var idx = 0;
	var lw = 10;
	var ss = color;
	var fs = '#acf';
	var size = [80 * 3, 80];
	var fill = false;

	//10
	var canvas = new creat(idx, size);
	var ctx = canvas.getContext('2d');
	ctx.strokeStyle = ss;
	ctx.fillStyle = fs;
	ctx.lineWidth = lw;
	for (var i = 0; i < array.length; i++) {
		console.log("draw " + array[i] + " " + color);
		switch(array[i]) {
			case 10:
			ctx.beginPath();
			ctx.arc(80 * i + 40, 40, 33, 0, 2 * Math.PI, false);
			ctx.closePath();
			ctx.stroke();
			break;

			case 5:
			pos = [[95, 0], [0, 69], [36, 181], [154, 181], [190, 69]];
			offset = [250 * i + 30, 35, 0.32];
			ctx.beginPath();
			moveTo(ctx, pos[0], offset);
			lineTo(ctx, pos[1], offset);
			lineTo(ctx, pos[2], offset);
			lineTo(ctx, pos[3], offset);
			lineTo(ctx, pos[4], offset);
			lineTo(ctx, pos[0], offset);
			ctx.closePath();
			ctx.stroke();
			break;

			case 4:
			pos = [[0, 0], [0, 180], [180, 180], [180, 0]];
			offset = [266 * i + 30, 55, 0.30];
			ctx.beginPath();
			moveTo(ctx, pos[0], offset);
			lineTo(ctx, pos[1], offset);
			lineTo(ctx, pos[2], offset);
			lineTo(ctx, pos[3], offset);
			lineTo(ctx, pos[0], offset);
			ctx.closePath();
			ctx.stroke();
			break;

			case 3:
			pos = [[100, 0], [0, 173], [200, 173]];
			offset = [250 * i + 35, 62, 0.30];
			ctx.beginPath();
			moveTo(ctx, pos[0], offset);
			lineTo(ctx, pos[1], offset);
			lineTo(ctx, pos[2], offset);
			lineTo(ctx, pos[0], offset);
			ctx.closePath();
			ctx.stroke();
			break;

			case 2:
			pos = [[100, 0], [0, 173], [200, 173]];
			offset = [250 * i + 35, 62, 0.30];
			ctx.beginPath();
			moveTo(ctx, pos[0], offset);
			lineTo(ctx, pos[1], offset);
			lineTo(ctx, pos[2], offset);
			moveTo(ctx, pos[2], offset);
			ctx.closePath();
			ctx.stroke();
			break;

			case 1:
			pos = [[100, 0], [0, 173], [200, 173]];
			offset = [250 * i + 35, 62, 0.30];
			ctx.beginPath();
			moveTo(ctx, pos[0], offset);
			lineTo(ctx, pos[1], offset);
			ctx.closePath();
			ctx.stroke();
			break;
		}
	}
}

function creat(idx, size) {
	var main = document.getElementById("main");
	var canvas = document.createElement("canvas");
	canvas.width = size[0];
	canvas.height = size[1];
	canvas.id = "canvas_" + idx;
	main.appendChild(canvas);
	return canvas;
}

function moveTo(ctx, pos, offset) {
	var x = (pos[0] + offset[0]) * offset[2];
	var y = (pos[1] + offset[1]) * offset[2];
	ctx.moveTo(x, y);
}

function lineTo(ctx, pos, offset) {
	var x = (pos[0] + offset[0]) * offset[2];
	var y = (pos[1] + offset[1]) * offset[2];
	ctx.lineTo(x, y);
}

function newLine() {
	var main = document.getElementById("main");
	var div = document.createElement("div");
	main.appendChild(div);
}
window.onload = function() {
	company.init();
	project.init();
}



var company = {
	config: {
		name: 'company-logo',
		strokeStyle: 'black',
		multiX: 1,
		multiY: 1,
		width: 440,
		height:440,
		lineWidth: 10,
		lineLength: 30,
		fontStyle: "40px bold 黑体",
		cells: [
			{text:'', rotate: 0.0, textPos:[0, -1.2], fillStyle:'#fff', pos:[[0,0],[-5.7,-2],[5.7,-2], [0,0]]},
			{text:'三棱', rotate: 0.3, textPos:[-3, 1], fillStyle:'#fff', pos:[[0,0],[-6,-2],[-6,2],[0,4]]},
			{text:'科技', rotate: -0.6, textPos:[ 3, 1], fillStyle:'#fff', pos:[[0,0],[6,-2],[6,2], [0,4]]},
			],
		style1: {
			pos:[[0.5,3], [1, -5], [-1, -5], [-0.5, 3]],
			drawTran: [-176, 100],
			drawRote: -0.48,
			paintTran: [-303, 80],
			paintRote: -0.64,
			lights:[
			{color:'red',			tranX:72, tranY:-29, rotate:0.16},
			{color:'orange',		tranX:72, tranY:-29, rotate:0.16},
			{color:'yellow',		tranX:72, tranY:-29, rotate:0.16},
			{color:'green',			tranX:72, tranY:-29, rotate:0.16},
			{color:'greenYellow',	tranX:72, tranY:-29, rotate:0.16},
			{color:'blue',			tranX:72, tranY:-29, rotate:0.16},
			{color:'purple',		tranX:72, tranY:-29, rotate:0.16},
		]},

		style2: {
			pos:[[0.5,3], [1, -5], [-1, -5], [-0.5, 3]],
			drawTran: [-192, 100],
			drawRote: -0.48,
			paintTran: [-308, 50],
			paintRote: -0.64,
			lights:[
			{color:'red',			tranX:75, tranY:  1, rotate:0.16},
			{color:'orange',		tranX:75, tranY:-59, rotate:0.16},
			{color:'yellow',		tranX:75, tranY:  1, rotate:0.16},
			{color:'green',			tranX:75, tranY:-59, rotate:0.16},
			{color:'greenYellow',	tranX:75, tranY:  1, rotate:0.16},
			{color:'blue',			tranX:75, tranY:-59, rotate:0.16},
			{color:'purple',		tranX:75, tranY:  1, rotate:0.16},
		]},

		style3: {
			pos:[[0.8,5], [0.8, 0], [-0.8, 0], [-0.8, 5]],
			drawTran: [-150,-140],
			drawRote: 0,
			paintTran: [-200, 100],
			paintRote: 0,
			lights:[
			{color:'red',			tranX:50, tranY:-20, rotate:0},
			{color:'orange',		tranX:50, tranY:-20, rotate:0},
			{color:'yellow',		tranX:50, tranY:-20, rotate:0},
			{color:'green',			tranX:50, tranY: 20, rotate:0},
			{color:'greenYellow',	tranX:50, tranY: 20, rotate:0},
			{color:'blue',			tranX:50, tranY: 20, rotate:0},
			{color:'purple',		tranX:50, tranY: 20, rotate:0},
		]},
	},

	init: function(){
		this.creat('style1');
		this.creat('style2');
		this.creat('style3');
	},

	creat: function(name) {
		var cfg = this.config;
		var div = document.getElementById(name);
		var canvas = document.createElement('canvas');
		div.appendChild(canvas);
		canvas.width = cfg.width;
		canvas.height = cfg.height;
		var ctx = canvas.getContext('2d');
		this.draw(ctx, cfg, name);
		this.paint(ctx, cfg, name);
	},

	draw: function(ctx, cfg, name) {
		var tran = cfg[name].drawTran;
		var rote = cfg[name].drawRote;
		ctx.translate(tran[0], tran[1]);
		ctx.rotate(rote);
		ctx.strokeStyle = "#fff";
		ctx.lineWidth = 5;
		for (let idx in cfg[name].lights) {
			var light = cfg[name].lights[idx];
			ctx.fillStyle = light.color;
			ctx.beginPath();
			this.moveTo(ctx, this.getPosLight(name, idx, 0), cfg.lineLength);
			this.lineTo(ctx, this.getPosLight(name, idx, 1), cfg.lineLength);
			this.lineTo(ctx, this.getPosLight(name, idx, 2), cfg.lineLength);
			this.lineTo(ctx, this.getPosLight(name, idx, 3), cfg.lineLength);
			this.lineTo(ctx, this.getPosLight(name, idx, 0), cfg.lineLength);
			ctx.translate(light.tranX, light.tranY);
			ctx.rotate(light.rotate);
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		}
	},

	paint: function(ctx, cfg, name) {
		var tran = cfg[name].paintTran;
		var rote = cfg[name].paintRote;
		ctx.rotate(rote);
		ctx.translate(tran[0], tran[1]);
		ctx.strokeStyle = cfg.strokeStyle;
		ctx.lineWidth = 5;
		for (let idx in cfg.cells) {
			var cell = cfg.cells[idx];
			ctx.fillStyle = cell.fillStyle;
			ctx.beginPath();
			this.moveTo(ctx, this.getPos(idx, 0), cfg.lineLength);
			this.lineTo(ctx, this.getPos(idx, 1), cfg.lineLength);
			this.lineTo(ctx, this.getPos(idx, 2), cfg.lineLength);
			this.lineTo(ctx, this.getPos(idx, 3), cfg.lineLength);
			this.lineTo(ctx, this.getPos(idx, 0), cfg.lineLength);
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		}
		for (let idx in cfg.cells) {
			var cell = cfg.cells[idx];
			ctx.font = cfg.fontStyle;
			ctx.fillStyle = "black";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			// ctx.translate(0, 0);
			// ctx.rotate(cell.rotate);
			var textPos = this.setPos(cell.textPos, cfg.lineLength);
			ctx.fillText(cell.text, textPos[0], textPos[1]);
		}
	},

	getPos: function(x, y) {
		var pos = this.config.cells[x].pos;
		return pos[y];
	},

	getPosLight: function(name, x, y) {
		var pos = this.config[name].pos;
		return pos[y];
	},

	setPos: function(pos, length) {
		var x = parseInt(pos[0] * length * this.config.multiX + this.config.width * 0.5);
		var y = parseInt(pos[1] * length * this.config.multiY + this.config.height * 0.5);
		return [x, y];
	},

	moveTo: function(ctx, pos, length) {
	var x = this.setPos(pos, length)[0];
	var y = this.setPos(pos, length)[1];
	ctx.moveTo(x, y);
	},

	lineTo: function(ctx, pos, length) {
	var x = this.setPos(pos, length)[0];
	var y = this.setPos(pos, length)[1];
	ctx.lineTo(x, y);
	},
}




var project = { 
	config: {	
		name: 'project-logo',
		prefix: 'rotate',
		strokeStyle: 'white',
		multiX: 1,
		multiY: 1.732,
		width: 400,
		height: 400,
		lineWidth: 10,
		lineLength: 100,
		fontStyle: "60px bold 黑体",
		cells: [
		{text:'鑫', textPos:[[ 1,-0.33],[ 1,-0.33],[0,-0.66]], pos:[[0,0], [ 2, 0], [ 1, 1]], rotate:[0,  0,  60], fillStyle:'#FFC000'},
		{text:'聚', textPos:[[ 0,-0.66],[ 0,-0.66],[0,-0.66]], pos:[[0,0], [ 1, 1], [-1, 1]], rotate:[0,  0, 300], fillStyle:'#0070C0'},
		{text:'众', textPos:[[-1,-0.33],[-1,-0.33],[0,-0.66]], pos:[[0,0], [-1, 1], [-2, 0]], rotate:[0,  0, 300], fillStyle:'#FF0000'},
		{text:'众', textPos:[[-1, 0.33],[ 1,-0.33],[0,-0.66]], pos:[[0,0], [-2, 0], [-1,-1]], rotate:[0,180, 300], fillStyle:'#FF0000'},
		{text:'合', textPos:[[ 0, 0.66],[ 0,-0.66],[0,-0.66]], pos:[[0,0], [-1,-1], [ 1,-1]], rotate:[0,  0, 300], fillStyle:'#0070C0'},
		{text:'鑫', textPos:[[ 1, 0.33],[-1,-0.33],[0,-0.66]], pos:[[0,0], [ 1,-1], [ 2, 0]], rotate:[0,  0, 300], fillStyle:'#FFC000'},
		],
	},

	init: function() {
		this.creat(0);
		this.creat(1);
		this.creat(2);
	},

	creat: function(x) {
		var cfg = this.config;
		var div = document.getElementById(cfg.prefix + x);
		var canvas = document.createElement('canvas');
		div.appendChild(canvas);
		canvas.width = cfg.width;
		canvas.height = cfg.height;
		var ctx = canvas.getContext('2d');

		this.paint(ctx, cfg, x);
		this.border(ctx, cfg);
		this.fillText(ctx, cfg, x);
	},

	paint: function(ctx, cfg, x) {
		ctx.strokeStyle = cfg.strokeStyle;
		ctx.lineWidth = 0;
		for (let idx in cfg.cells) {
			var cell = cfg.cells[idx];
			ctx.fillStyle = cell.fillStyle;
			ctx.beginPath();
			this.moveTo(ctx, this.getPos(idx, 0), cfg.lineLength);
			this.lineTo(ctx, this.getPos(idx, 1), cfg.lineLength);
			this.lineTo(ctx, this.getPos(idx, 2), cfg.lineLength);
			this.lineTo(ctx, this.getPos(idx, 0), cfg.lineLength);
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		}
	},


	border: function(ctx, cfg) {
		ctx.strokeStyle = cfg.strokeStyle;
		ctx.lineWidth = cfg.lineWidth;
		ctx.beginPath();
		this.moveTo(ctx, this.getPos(0, 1), cfg.lineLength);
		this.lineTo(ctx, this.getPos(3, 1), cfg.lineLength);
		this.moveTo(ctx, this.getPos(1, 1), cfg.lineLength);
		this.lineTo(ctx, this.getPos(4, 1), cfg.lineLength);
		this.moveTo(ctx, this.getPos(2, 1), cfg.lineLength);
		this.lineTo(ctx, this.getPos(5, 1), cfg.lineLength);
		this.lineTo(ctx, this.getPos(0, 1), cfg.lineLength);
		this.lineTo(ctx, this.getPos(1, 1), cfg.lineLength);
		this.lineTo(ctx, this.getPos(2, 1), cfg.lineLength);
		this.lineTo(ctx, this.getPos(3, 1), cfg.lineLength);
		this.lineTo(ctx, this.getPos(4, 1), cfg.lineLength);
		this.lineTo(ctx, this.getPos(5, 1), cfg.lineLength);
		ctx.closePath();
		ctx.stroke();
	},


	fillText: function(ctx, cfg, x) {
		for (let idx in cfg.cells) {
			var cell = cfg.cells[idx];
			ctx.font = cfg.fontStyle;
			ctx.fillStyle = "#fff";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.translate(200, 200);
			ctx.rotate(cfg.cells[idx].rotate[x] * Math.PI/180);
			ctx.translate(-200, -200);
			var textPos = this.setPos(cell.textPos[x], cfg.lineLength);
			ctx.fillText(cell.text, textPos[0], textPos[1]);
		}
	},

	getPos: function(x, y) {
		var pos = this.config.cells[x].pos;
		return pos[y];
	},

	setPos: function(pos, length) {
		var x = parseInt(pos[0] * length * this.config.multiX + this.config.width * 0.5);
		var y = parseInt(pos[1] * length * this.config.multiY + this.config.height * 0.5);
		return [x, y];
	},

	moveTo: function(ctx, pos, length) {
	var x = this.setPos(pos, length)[0];
	var y = this.setPos(pos, length)[1];
	ctx.moveTo(x, y);
	},

	lineTo: function(ctx, pos, length) {
	var x = this.setPos(pos, length)[0];
	var y = this.setPos(pos, length)[1];
	ctx.lineTo(x, y);
	},
}





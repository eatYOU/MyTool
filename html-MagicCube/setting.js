window.onload = function() {
	var cube = new MagicCube(1, null);
	cube.init();
	cube.turnCube("left");
	cube.turnPlane("left");
	cube.turnCube("up");
	cube.turnCube("zLeft");
	cube.turnCube("left");
	cube.turnCube("xInverse");
	cube.turnPlane("right");
	cube.turnCube("up");
	cube.turnCube("right");
	// cube.turnPlane("inverse");
	cube.turnCube("down");
	cube.creatCube();
	cube.turnCube("right");
	cube.turnCube("up");
}

function MagicCube(type, data) {
	var self = this;
	this.init = function() {
		this.data = this.orginData;
		console.log(this.data);
	}

	this.planeConfig = [
		{},
		{idx: 1, color: "#ace", bgcolor: "#468"},
		{idx: 2, color: "#aec", bgcolor: "#486"},
		{idx: 3, color: "#cae", bgcolor: "#648"},
		{idx: 4, color: "#cea", bgcolor: "#684"},
		{idx: 5, color: "#eac", bgcolor: "#846"},
		{idx: 6, color: "#eca", bgcolor: "#864"},
	]

	this.blockView = [["", "UP", "", ""], ["LEFT", "FRONT", "RIGHT", "BACK"], ["", "DOWN", "", ""]]; 

	this.orginData = {
		LEFT: 	[10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
		FRONT:  [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
		RIGHT: 	[30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
		BACK: 	[40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
		UP: 	[50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
		DOWN: 	[60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
	}

	this.__data = {}

	this.cubeAction = {
		NONE: 		"0123456789",
		LEFT: 		"0369258147",
		RIGHT: 		"0741852963",
		REVERSE: 	"0987654321",
	}


	this.turnCube = function(action) {
		this.__data = {};
		switch (action) {
			case "left":
			this.turnCubeAction("LEFT", "FRONT", "NONE");
			this.turnCubeAction("FRONT", "RIGHT", "NONE");
			this.turnCubeAction("RIGHT", "BACK", "NONE");
			this.turnCubeAction("BACK", "LEFT", "NONE");
			this.turnCubeAction("UP", "UP", "RIGHT");
			this.turnCubeAction("DOWN", "DOWN", "LEFT");
			break;
			case "right":
			this.turnCubeAction("LEFT", "BACK", "NONE");
			this.turnCubeAction("FRONT", "LEFT", "NONE");
			this.turnCubeAction("RIGHT", "FRONT", "NONE");
			this.turnCubeAction("BACK", "RIGHT", "NONE");
			this.turnCubeAction("UP", "UP", "LEFT");
			this.turnCubeAction("DOWN", "DOWN", "RIGHT");
			break;
			case "up":
			this.turnCubeAction("LEFT", "LEFT", "LEFT");
			this.turnCubeAction("FRONT", "DOWN", "NONE");
			this.turnCubeAction("RIGHT", "RIGHT", "RIGHT");
			this.turnCubeAction("BACK", "UP", "REVERSE");
			this.turnCubeAction("UP", "FRONT", "NONE");
			this.turnCubeAction("DOWN", "BACK", "REVERSE");
			break;
			case "down":
			this.turnCubeAction("LEFT", "LEFT", "RIGHT");
			this.turnCubeAction("FRONT", "UP", "NONE");
			this.turnCubeAction("RIGHT", "RIGHT", "LEFT");
			this.turnCubeAction("BACK", "DOWN", "REVERSE");
			this.turnCubeAction("UP", "BACK", "REVERSE");
			this.turnCubeAction("DOWN", "FRONT", "NONE");
			break;
			case "xInverse":
			this.turnCube("left");
			this.turnCube("left");
			case "yInverse":
			this.turnCube("up");
			this.turnCube("up");
			case "zLeft":
			this.turnCube("right");
			this.turnCube("down");
			this.turnCube("left");
			case "zRight":
			this.turnCube("right");
			this.turnCube("up");
			this.turnCube("left");
		}
		this.data = Object.assign(this.__data);
		console.log(JSON.stringify(this.data));
		
	}

	
	this.turnCubeAction = function(__key, key, action) {
		var plane = this.data[key];
		var __plane = [];
		for (var i = 0; i < 10; i++) {
			var idx = this.cubeAction[action][i];
			__plane.push(plane[idx]);
		}
		this.__data[__key] = __plane;
		console.log(__key + ": " + __plane);
	}

	this.turnPlane = function(action) {
		this.__data = Object.assign(this.data);
		switch (action) {
			case "left":
				this.turnCubeAction("FRONT", "FRONT", "LEFT");
				this.turnPlaneAction("LEFT", "UP", [9, 6, 3], [7, 8, 9]);
				this.turnPlaneAction("UP", "RIGHT", [7, 8, 9], [1, 4, 7]);
				this.turnPlaneAction("RIGHT", "DOWN", [1, 4, 7], [3, 2, 1]);
				this.turnPlaneAction("DOWN", "LEFT", [3, 2, 1], [9, 6, 3]);
				break;
			case "right":
				this.turnCubeAction("FRONT", "FRONT", "RIGHT");
				this.turnPlaneAction("LEFT", "DOWN", [9, 6, 3], [3, 2, 1]);
				this.turnPlaneAction("UP", "LEFT", [7, 8, 9], [9, 6, 3]);
				this.turnPlaneAction("RIGHT", "UP", [1, 4, 7], [7, 8, 9]);
				this.turnPlaneAction("DOWN", "RIGHT", [3, 2, 1], [1, 4, 7]);
				break;
			case "reverse":
				this.turnPlane("left");
				this.turnPlane("left");
				break;
		}
		this.data = Object.assign(this.__data);
		console.log(JSON.stringify(this.data));

	}


	this.turnPlaneAction = function(__key, key, __idx, idx) {
		var plane = this.data[key];
		var __plane = this.data[__key];
		for (let i in __idx) {
			__plane[__idx[i]] = plane[idx[i]];
		}
		this.__data[__key] = __plane;
		console.log(__key + ": " + __plane);
	}




	this.creatCube = function() {
		var outer = Elem.get("outer");
		console.log(outer.id);
		for (var i = 0; i < this.blockView.length; i++) {
			var block = Elem.set("div",outer, "block", "top");
			var flex = Elem.set("div", block, "flex");
			for (var j = 0; j < this.blockView[i].length; j++) {
				var key = this.blockView[i][j];
				var table = Elem.set("table", flex, "table", key);
				if (key)
					this.creatPlane(table, key);
			}
		}
	}

	this.creatPlane = function(table, key) {
		for (var i = 0; i < 3; i++) {
			var tr = Elem.set("tr", table, "tr", i);
			for (var j = 0; j < 3; j++) {
				var td = Elem.set("td", tr, "td", j);
				var idx = i * 3 + j + 1;
				var value = this.data[key][idx];
				td.innerHTML = value;
				var cid = Math.floor(value / 10);
				td.style.color = this.planeConfig[cid].color;
				td.style.backgroundColor = this.planeConfig[cid].bgcolor;
			}
		}
	}


}



//元素
var  Elem = {};

//创建一个元素
Elem.set = function (type, parent, className, idx) {
	var item = document.createElement(type);
	if (idx != null) {
		if (className)
			item.id = className + "_" + idx;
		else
			item.id = idx;
	}
	if (className)
		item.className = className;
	if (parent)
		parent.appendChild(item);
	return item;
}

//获取当个元素
Elem.get = function (name) {
	return document.getElementById(name);
}







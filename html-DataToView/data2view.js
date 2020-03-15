var tb = "";
var tk = "";
var tv = "";
var partList = [];

function dataListToView(dataList, dataType) {
	for(let i in dataList) {
		var title = dataList[i].title;
		var outer = Elem.get('outer');
		var inner = Elem.set('div', outer, 'inner', title);
		var line = Elem.set('div', inner, 'flex', title);
		var bg = Elem.set('div', inner, 'bg', title);
		for (let j in viewConfig) {
			var btn;
			if (j == 0) {
				btn = Elem.set('div', line, 'btnData', title);
				btn.innerHTML =  i > 0 ? i + '.' + title : title;
			} else {
				btn = Elem.set('div', line, 'btnView', title);
				btn.innerHTML = viewConfig[j].viewType;
			}
			if (dataList[i].data == null) break;
			btn.x = i;
			btn.color = viewConfig[j].color;
			btn.bgcolor = viewConfig[j].bgcolor;
			Elem.color(btn, btn.color, btn.bgcolor);
			btn.viewType = viewConfig[j].viewType;
			btn.onclick = function() {
				var btn = Elem.btn;
				if (btn) 
					Elem.color(btn, btn.color, btn.bgcolor);
				Elem.color(this, this.bgcolor, this.color);
				Elem.btn = this;
				Elem.viewWidth = 100;
				var that = dataList[this.x];
				if (that.width && this.viewType == "table" || this.viewType == "line")
					Elem.viewWidth = that.width;
				var view = Elem.get('view_' + that.title);
				if (view) {
					Elem.remove(view);
					if (that.viewType == this.viewType) 
						return;
				}
				that.viewType = this.viewType;
				if (dataType == "csv")
					csvToView(that.data, that.title, this.viewType);
				if (dataType == "json")
					jsonToView(that.data, that.title, this.viewType);
			}
		}
	}
}


function toText(text) {
	return text.toString().replace(/</g, "|").replace(/>/g, "|");
}


function jsonToView(data, title, viewType) {
	if (viewType == 'data')
		dataToView(JSON.stringify(data), title);
	else if (viewType == 'table')
		jsonToTable(data, title);
	else if (viewType == 'line')
		jsonToLine(data, title);
	else if (viewType == 'list')
		jsonToList(data, title);
	else if (viewType == 'k&v')
		jsonToValue(data, title);
}

function jsonToTable(data, title) {
	var str = JSON.stringify(data);
	str = str.replace(/'/g, '').replace(/"/g, '').replace(/},/g, '}');
	str = str.replace(/\[{/g, '<table><tr><td><h3>').replace(/}]/g, ']');
	str = str.replace(/\[/g, '<table><tr><td>').replace(/]/g, '</td></tr></table>');
	str = str.replace(/{/g, '<tr><td><h3>').replace(/}/g, '</td></tr>');
	str = str.replace(/,/g, '</td><td><h3>').replace(/:/g, '</h3>');
	dataToView(str, title);
	return str;
}


function jsonToLine(data, title) {
	var val = "";
	for (let x in data) {
		var str = JSON.stringify(data[x]);
		str = str.replace(/'/g, '').replace(/"/g, '').replace(/},/g, '}');
		str = str.replace(/\[{/g, '<table><tr><td><h3>').replace(/}]/g, ']');
		str = str.replace(/\[/g, '<table><tr><td>').replace(/]/g, '</td></tr></table>');
		str = str.replace(/{/g, '<tr><td><h3>').replace(/}/g, '</td></tr>');
		str = str.replace(/,/g, '</td><td><h3>').replace(/:/g, '</h3>');
		val += addTitle(title, x, data instanceof Array);
		if (data[x] instanceof Object)
			val += str;
		else
			val += "<tr><td colspan='100' >" + str + "</td></tr>";
	}
	dataToView(val, title);
	return val;
}


function jsonToValue(data, title) {
	var val = "";
	for (let x in data) {
		val += addTitle(title, x, data instanceof Array);
		if (data[x] instanceof Object) {
			for (let y in data[x]) {
				var str = JSON.stringify(data[x][y]);
				str = str.replace(/'/g, '').replace(/"/g, '').replace(/},/g, '}');
				str = str.replace(/\[{/g, '<table><tr><td><h3>').replace(/}]/g, ']');
				str = str.replace(/\[/g, '<table><tr><td>').replace(/]/g, '</td></tr></table>');
				str = str.replace(/{/g, '<tr><td><h3>').replace(/}/g, '</td></tr>');
				str = str.replace(/,/g, '</td><td><h3>').replace(/:/g, '</h3>');
				val += "<tr><th>" + y + "</th><td>" + str + "</td></tr>";
				if (!data[y] instanceof Object)
					val += "<tr><td colspan='100' >" + str + "</td></tr>";
			}
		} else{
			val += "<tr><td colspan='100' >" + data[x] + "</td></tr>";
		}
	}
	dataToView(val, title);
	return val;
}


function jsonToList(data, title) {
	var val = "";
	for (let x in data) {
		val += addTitle(title, x, data instanceof Array);
		if (data[x] instanceof Object) {
			for (let y in data[x]) {
				var str = JSON.stringify(data[x][y]);
				str = str.replace(/'/g, '').replace(/"/g, '').replace(/},/g, '}');
				str = str.replace(/\[{/g, '<table><tr><td><h3>').replace(/}]/g, ']');
				str = str.replace(/\[/g, '<table><tr><td>').replace(/]/g, '</td></tr></table>');
				str = str.replace(/{/g, '<tr><td><h3>').replace(/}/g, '</td></tr>');
				str = str.replace(/,/g, '</td><td><h3>').replace(/:/g, '</h3>');
				val += "<tr><th>" + y + "</th></tr><tr><td>" + str + "</td></tr>";
				if (!data[y] instanceof Object)
					val += "<tr><td colspan='100' >" + str + "</td></tr>";
			}
		} else{
			val += "<tr><td colspan='100' >" + data[x] + "</td></tr>";
		}
	}
	dataToView(val, title);
	return val;
}


function addTitle(title, x, isArr) {
	var val = "<tr><td colspan='3' class='td-title'>" + title;
	if (isArr)
		val += "[" + x + "]" + "</td></tr>";
	else
		val += "." + x + "</td></tr>";
	return val;
}

function csvToView(data, title, viewType) {
	if (viewType == 'data')
		dataToView(data, title);
	else if (viewType == 'table')
		csvToTable(data, title);
	else if (viewType == 'k&v')
		csvToValue(data, title);
	else if (viewType == 'list')
		csvToList(data, title);
	else if (viewType == 'line')
		csvToLine(data, title);
}

function arrToTable(data, title) {
	data = data.substring(1, data.length-1);
	data = data.replace(/,\n/g, '</td></tr><tr><th>');
	data = data.replace(/,/g, '</td><td>');
	var val = '<table>';
	val +='<tr><th></th><th>';
	val += data;
	val += '</td></tr><tr></tr>';
	val += '</table>';
	dataToView(val, title);
};

function csvSplit(data) {
	data = data.replace(/\n\n\n/g, '\n');
	data = data.replace(/\n\n/g, '\n');
	data = data.trim();
	return data.replace('\n', '~').split('~');
}

function csvToTable(data, title) {
	var split = csvSplit(data);
	var values = split[1].split('\n');
	var val = '<table>';
	val += '<tr><th>';
	val += split[0].replace(/,/g, '</th><th>');
	val += '</th></tr>';
	for (let i in values) {
		val += '<tr><td>';
		val += values[i].replace(/,/g, '</td><td>');
		val += '</td></tr>';
	}
	val += '<tr></tr>';
	val += '</table>';
	dataToView(val, title);
};


function csvToLine(data, title) {
	var split = csvSplit(data);
	var values = split[1].split('\n');
	var val = '<table>';
	for (let i in values) {

		val += '<tr></tr>';
		val += addTitle(title, i, true);
		val += '<tr><th>';
		val += split[0].replace(/,/g, '</th><th>');
		val += '</th></tr>';
		val += '<tr><td>';
		val += values[i].replace(/,/g, '</td><td>');
		val += '</td></tr>';
	}
	val += '<tr></tr>';
	val += '</table>';
	dataToView(val, title);
};


function csvToValue(data, title) {
	var split = csvSplit(data);
	var keyList = split[0].split(',');
	var valuesList = split[1].split('\n');
	var val = '<table>';
	for (let i in valuesList) {
		val += '<tr></tr>';
		val += addTitle(title, i, true);
		for (let j in keyList) {
			key = keyList[j];
			value = valuesList[i].split(',')[j];
			val += '<tr><th>' + key + '</th>';
			val += '<td>' + value + '</td></tr>';
		}
	}
	val += '</td></tr><tr></tr>';
	val += '</table>';
	dataToView(val, title);
};


function csvToList(data, title) {
	var split = csvSplit(data);
	var keyList = split[0].split(',');
	var valuesList = split[1].split('\n');
	var val = '<table>';
	for (let i in valuesList) {
		val += '<tr></tr>';
		val += addTitle(title, i, true);
		for (let j in keyList) {
			key = keyList[j];
			value = valuesList[i].split(',')[j];
			val += '<tr><th>' + key + '</th></tr>';
			val += '<tr><td>' + value + '</td></tr>';
		}
	}
	val += '</td></tr><tr></tr>';
	val += '</table>';
	dataToView(val, title);
};


function dataToView(val, title, type) {
	var bg = Elem.get('bg_' + title);
	var view = Elem.set("table", bg, 'view', title);
	view.innerHTML = val;
}

var rules;
var rule;
var start;
var end;
var string;
var now;
var state;
var height;
var width;
var percent_H;
var percent_W;
var readAll;
var strEnd;
var pre;
var nextRule;
var ans;
var s;
var e;
//文件读入
var openFile = function(event) {
	var input = event.target
	var reader = new FileReader()
	reader.onload = function() {
		if (reader.result) {
			rules = foo(reader.result)
			rule = div(rules)
			printRule();
		}
	}
	reader.readAsText(input.files[0])
	$("#startState").removeAttr("disabled")
	$("#endState").removeAttr("disabled")
	$("#inputTape").removeAttr("disabled")
}
//分行
function foo(str) {
	var ans = str.split(/[\n,]/g)
	return ans
}
//分列
function printRule() {
	$("label").remove(".ruleList");
	for (let i = 1; i < rules.length; i++)
		$("#showRule").append("<label class=\"ruleList\" id=\"ruleList" + i + "\">" + rules[i] + "<br></label>")
}
//输入框（初始状态、终止状态）
function checkForm() {
	string = "";
	start = document.getElementById("startState").value
	end = document.getElementById("endState").value.split(",")
	runStateChange("未运行")
	runPrintRule()
}
//输入纸带
function inputString() {
	runStateChange("未运行")
	if (document.getElementById("inputTape").value) {
		$("#confirmButton").removeAttr("disabled");
		Turing();
	} else
		$("#confirmButton").attr("disabled", "disabled")
	document.getElementById("inputTape").focus();
}
//运行图灵机
function Turing() {
	var Tstring = document.getElementById("inputTape").value
	string = "";
	for (let i = 0; i < 100; i++)
		string = string + "B";
	string = string + Tstring;
	strEnd = string.length;
	for (let i = strEnd; i < strEnd + 100; i++)
		string = string + "B";
	now = 100;
	strEnd--;
	s = now - 1;
	e = strEnd + 1;
	state = start;
	readAll = false;
	$("td").remove(".showTapeCharClass");
	$("td").remove(".showTapeStateClass");
	$("#runState").removeAttr("disabled")
	runStateChange("运行中");

	for (let i = 0; i < string.length; i++) {
		$("#showTapeChar").append("<td class=\"showTapeCharClass\" id=\"showTapeChar" + i + "\">" + i + "</td>")
		$("#showTapeState").append("<td class=\"showTapeStateClass\" id=\"showTapeState" + i + "\">" + "" + "</td>")
	}
	runFindRule()
	runPrintRule()
	printTape();
}

function runFindRule() {
	for (let i = 1; i < rule.length; i++) {
		//读取整个输入带
		if (!readAll && now == strEnd) {
			readAll = true;
		}
		//当输入带被全部读取后
		if (readAll) {
			//遍历终止状态
			for (let j = 0; j < end.length; j++) {
				//接受
				if (state.trim() === end[j].trim()) {
					//接受
					ans = 1;
					return;
				}
			}
		}
		//找到下一条规则
		if (state == rule[i][0] && string[now] == rule[i][1]) {
			//debug
			nextRule = i;
			ans = 0;
			return;
		}
	}
	//拒绝
	ans = -1;
	return 0;
}

function runPrintRule() {
	for (let i = 1; i < rule.length; i++)
		$("#ruleList" + i).css({
			"color": '#004974',
			"box-shadow": "inset 2px 2px 5px #BABECC, inset -5px -5px 10px #FFF",
		})
	$("#ruleList" + nextRule).css({
		"color": "#AE1100",
		"box-shadow": "-5px -5px 20px #FFF, 5px 0px 20px #BABECC",
	})
	window.location.hash = "#ruleList" + nextRule;
}

function runChaneState() {
	if (ans == 1) {
		alert("成功匹配！")
		runStateChange("运行完成：接受");
		return;
	} else if (ans == -1) {
		alert("不匹配！")
		runStateChange("运行完成：拒绝");
		return;
	}
	if (string[now].trim() === "B" && rule[nextRule][3].trim() !== "B") {
		if (now >= e)
			e++;
		if (now <= s)
			s--;
	}
	string = strReplace(string, now, rule[nextRule][3])
	state = rule[nextRule][2];
	if (rule[nextRule][4][0].trim() === "L".trim()) {
		now--;
	} else if (rule[nextRule][4][0].trim() === "R".trim()) {
		now++;
	} else if (rule[nextRule][4][0].trim() === "S".trim());
	else {
		alert("位移参数错误！")
		runStateChange("运行终止：错误");
		alert("****" + rule[nextRule][4][0] + "****")
		return;
	}
}

function runOneStep() {
	runChaneState()
	printTape()
	runFindRule()
	runPrintRule()
	return;
}

function runAll() {
	runChaneState()
	while (ans == 0) {
		runFindRule()
		runChaneState()
	}
	printTape()
	runPrintRule()
}

function div(str) {
	end = new Array();
	let ans = new Array();
	let temp = str[0].split(" ");
	start = temp[0];
	for (let i = 1; i < temp.length; i++)
		end[i - 1] = temp[i];
	document.getElementById("startState").value = start;
	document.getElementById("endState").value = end;
	document.getElementById("inputTape").focus();
	for (let i = 1; i < str.length; i++) {
		ans[i] = str[i].split(" ")
	}
	return ans;
}

function strReplace(str, index, c) {
	let ans = "";
	for (let i = 0; i < index; i++)
		ans = ans + str[i];
	ans = ans + c;
	for (let i = index + 1; i < str.length; i++)
		ans = ans + str[i];
	return ans;
}

function printTape() {
	for (let i = 0; i < string.length; i++) {
		$("#showTapeChar" + i).attr("hidden", "hidden")
		$("#showTapeState" + i).attr("hidden", "hidden")
		$("#showTapeState" + i)[0].innerHTML = ""
	}
	$("#showTapeState" + now)[0].innerHTML = state
	for (let i = s; i <= e; i++) {
		$("#showTapeChar" + i)[0].innerHTML = string[i]
		$("#showTapeChar" + i).removeAttr("hidden")
		$("#showTapeState" + i).removeAttr("hidden")
	}
	$("#showTapeChar" + pre).css({
		"box-shadow": "inset 1px 1px 2px #BABECC, inset -1px -1px 2px #FFF",
		"color": "#004974"
	})
	$("#showTapeState" + pre).css({
		"box-shadow": "inset 1px 1px 2px #BABECC, inset -1px -1px 2px #FFF",
		"color": "#004974"
	})
	$("#showTapeChar" + now).css({
		"box-shadow": "-5px -5px 20px #FFF, 5px 0px 20px #BABECC",
		"color": "#AE1100"
	})
	$("#showTapeState" + now).css({
		"box-shadow": "-5px -5px 20px #FFF, 5px 0px 20px #BABECC",
		"color": "#AE1100"
	})
	pre = now;
}

window.onresize = function() {
}

window.onload = function() {
	runStateChange("未运行");
}

function runStateChange(newState) {
	document.getElementById("runState").value = newState;
	if (document.getElementById("runState").value.trim() === "未运行".trim()) {
		$("#showTapeTable").attr("hidden", "hidden");
		$("#runOneStepButton").attr("disabled", "disabled");
		$("#runAllButton").attr("disabled", "disabled");
		$("#runState").attr("disabled", "disabled");
	} else if (document.getElementById("runState").value.trim() === "运行中".trim()) {
		$("#showTapeTable").removeAttr("hidden");
		$("#runOneStepButton").removeAttr("disabled");
		$("#runAllButton").removeAttr("disabled");
	} else if (document.getElementById("runState").value.trim() === "运行完成：接受".trim() ||
		document.getElementById("runState").value.trim() === "运行完成：拒绝".trim() ||
		document.getElementById("runState").value.trim() === "运行终止：错误".trim()) {
		$("#showTapeTable").removeAttr("hidden");
		$("#runOneStepButton").attr("disabled", "disabled");
		$("#runAllButton").attr("disabled", "disabled");
		$("#runState").attr("disabled", "disabled");
	}
}

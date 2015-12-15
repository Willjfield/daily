"use strict"

var someVar
var animation

function setup(){
	createCanvas(800,800)
	someVar = 3.67
	animation = new Timeline('someVar')
	animation.addKey(500, 2,'linear')
	animation.addKey(832,4,'linear')
	animation.addKey(100,5,'linear')
	//We need to have Timeline order the keyframes sequentially on its own
	fill(255)
}
function draw(){
	background(0)
	ellipse(200,200,someVar,someVar)
}

function mousePressed(){
	animation.play()
}


///////////////////////////////////////////////
/*BELOW IS FIRST PASS AT CODE FOR P5_Timeline*/
///////////////////////////////////////////////


var Timeline = function(_variable){
	this.variable = {
		name: _variable,
		value: window[_variable]
	}
	this.keys = []
	this.isPlaying = false
}

Timeline.prototype.addKey = function(targetValue,time,interpolation){
	var key = {
		targetValue: targetValue,
		time: time,
		interpolation: interpolation
	}	
	this.keys.push(key)
}

Timeline.set = function (_variable, value){
	window[_variable] = value
}

Timeline.prototype.play = function(){
	var startValue = window[this.variable.name]
	var curValue = startValue
	var isPlaying = this.isPlaying
	var keys = this.keys
	var variable = this.variable
	var startTime = 0
	var keyNum = 0

	if(!isPlaying){
		startTime = millis()
	}
	
	isPlaying = true

	var animate = function(){
		var elapsedTime = millis()-startTime;
		console.log('start value:' + startValue)
		console.log('target value:' + keys[keyNum].targetValue)
		if(elapsedTime<keys[keyNum].time*1000){
			setTimeout(animate,1000/getFrameRate())					
			if(keys[keyNum].interpolation=='linear'){
				curValue=startValue+(keys[keyNum].targetValue-startValue)*(elapsedTime/(keys[keyNum].time*1000))
				//lerp actually works too with the below expression:
				//curValue = lerp(startValue,keys[keyNum].targetValue,elapsedTime/(keys[keyNum].time*1000))
			}else if(keys[keyNum].interpolation == 'ease'){
				//Put in code for easing here
				curValue=startValue+(keys[keyNum].targetValue-startValue)*(elapsedTime/(keys[keyNum].time*1000))
			}
				console.log('setting value to: ')
			Timeline.set(variable.name,curValue)
		}else if(keyNum<keys.length-1){
			startValue = window[variable.name]
			startTime = millis()//keys[keyNum].time
			keyNum++
			setTimeout(animate,1000/getFrameRate())
		}	
		isPlaying = false
		console.log(someVar)
	}	
	animate()
}


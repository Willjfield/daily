"use strict"

var armLength;
var arms=[];
var correctSpeed;
var elSize= 30;

function setup(){
	createCanvas(windowWidth, windowHeight);
	background(0);
	stroke(255);
	strokeWeight(1);
	ellipseMode(CENTER);
	armLength = 75;
	correctSpeed = .1;
}
function draw(){
	background(0);
	
	for(var ar in arms){
		if(ar>0){
			if(abs(dist(arms[ar].x,arms[ar].y,arms[ar-1].x,arms[ar-1].y))>20){
					arms[ar].hingeStart(arms[ar-1]);
					arms[ar-1].hingeEnd(arms[ar]);
			}
			if(abs(dist(arms[ar].x,arms[ar].y,arms[ar-1].x,arms[ar-1].y))>armLength*2){
				line(arms[ar].x,arms[ar].y,arms[ar-1].x,arms[ar-1].y);
				var correct = createVector(arms[ar].x-arms[ar-1].x,arms[ar].y-arms[ar-1].y);
				correct.normalize();
				arms[ar].x -= correct.x*correctSpeed*(abs(dist(arms[ar].x,arms[ar].y,arms[ar-1].x,arms[ar-1].y))-(armLength*2));
				arms[ar].y -= correct.y*correctSpeed*(abs(dist(arms[ar].x,arms[ar].y,arms[ar-1].x,arms[ar-1].y))-(armLength*2));
			}
		}else{
			arms[ar].display();
		}
		
		arms[ar].update();
	}
}
function keyTyped() {
  if (key === 'z') {
      arms.pop();
  	elSize *= 1.333333333333334
  }
  return false; // prevent any default behavior
}

function getSelectedArm(){
	for(var arm in arms){
		if(dist(arms[arm].x,arms[arm].y,mouseX,mouseY)<20){
			arms[arm].isSelected = true;
			return arms[arm]
		}
	}		
}

function mousePressed() {

	var selectedArm = getSelectedArm()
	
	if(selectedArm == undefined){
		var newArm = new drawArm(mouseX,mouseY);
		arms.push(newArm);
	}else{
		return false
	}
	elSize *= .75
}

function mouseReleased(){
	for(var arm in arms){
		arms[arm].isSelected = false;
	}
}
function drawArm(x, y){
	this.x = x;
	this.y = y;
	this.elWidth = elSize;
	this.hingeX;
	this.hingeY;
	this.isSelected = false;
}
drawArm.prototype.update = function(){
		if(this.isSelected){
			this.x = mouseX;
			this.y = mouseY;
		}
}
drawArm.prototype.display = function(){
	ellipse(this.x,this.y,this.elWidth,this.elWidth);
	line(this.x,this.y,this.hingeX,this.hingeY);
}

function dJoints(armA,armB){
	return dist(armA.x,armA.y,armB.x,armB.y);
}

drawArm.prototype.hingeStart = function(armB){ 
	var dist = dJoints(this,armB);
	var a = (Math.pow(armLength,2)-Math.pow(armLength,2)+Math.pow(dist,2)/(2*dist));
	var h = Math.sqrt(Math.pow(armLength,2)-Math.pow(a,2));

	var px = this.x+a*(armB.x-this.x)/dist;
	var py = this.y+a*(armB.y-this.y)/dist;

	this.hingeX = px+h*(armB.y-this.y)/dist;
	this.hingeY = py-h*(armB.x-this.x)/dist;

	this.display();	
}

drawArm.prototype.hingeEnd = function(armB){ 
	var dist = -dJoints(this,armB);
	var a = (Math.pow(armLength,2)-Math.pow(armLength,2)+Math.pow(dist,2)/(2*dist));
	var h = Math.sqrt(Math.pow(armLength,2)-Math.pow(a,2));

	var px = this.x+a*(armB.x-this.x)/dist;
	var py = this.y+a*(armB.y-this.y)/dist;

	this.hingeX = px+h*(armB.y-this.y)/dist;
	this.hingeY = py-h*(armB.x-this.x)/dist;

	this.display();	
}

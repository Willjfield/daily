var arm1;
var arm2;
var armLength;

function setup(){
	createCanvas(550,550);
	background(0);
	stroke(255);
	strokeWeight(2);
	
	armLength = 200;
	arm1 = new drawArm(100,150);
	arm2 = new drawArm(300,300);
	arm3 = new drawArm(50,450);
}
function draw(){
	background(0,8);
	translate(100,0);
	//translate(Math.sin(frameCount/50)*10,Math.cos(frameCount/50)*10);
	arm1.hingeStart(arm2);
	arm2.hingeEnd(arm1);
	
	arm2.hingeStart(arm3);
	arm3.hingeEnd(arm2);

	arm3.hingeStart(arm1);
	arm1.hingeEnd(arm3);

	arm1.x+=Math.sin(frameCount/20)*5;
	arm1.y+=Math.cos(frameCount/20)*5;

	arm2.x-=Math.sin(frameCount/20)*5;
	arm2.y-=Math.cos(frameCount/20)*5;

	arm3.x+=Math.cos(frameCount/20)*5;
	arm3.y-=Math.sin(frameCount/20)*5;
}

function drawArm(x, y){
	this.x = x;
	this.y = y;
	this.hingeX;
	this.hingeY;
}

drawArm.prototype.display = function(){
	rect(this.x,this.y,20,20);
	line(this.x+10,this.y+10,this.hingeX,this.hingeY);
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

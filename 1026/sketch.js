var armLength;
var arms=[];
var correctSpeed;

function setup(){
	createCanvas(1000,1000);
	background(0);
	stroke(255);
	strokeWeight(2);
	ellipseMode(CENTER);
	armLength = 100;
	correctSpeed = .05;
}
function draw(){
	background(0);
	
	for(ar in arms){
		if(ar>0){
			console.log(ar);
			if(abs(dist(arms[ar].x,arms[ar].y,arms[ar-1].x,arms[ar-1].y))>40){
				arms[ar].hingeStart(arms[ar-1]);
				arms[ar-1].hingeEnd(arms[ar]);
			}
			if(abs(dist(arms[ar].x,arms[ar].y,arms[ar-1].x,arms[ar-1].y))>armLength*2){
				var correct = createVector(arms[ar].x-arms[ar-1].x,arms[ar].y-arms[ar-1].y);
				correct.normalize();
				arms[ar].x -= correct.x*correctSpeed*(abs(dist(arms[ar].x,arms[ar].y,arms[ar-1].x,arms[ar-1].y))-(armLength*2));
				arms[ar].y -= correct.y*correctSpeed*(abs(dist(arms[ar].x,arms[ar].y,arms[ar-1].x,arms[ar-1].y))-(armLength*2));
				line(arms[ar].x,arms[ar].y,arms[ar-1].x,arms[ar-1].y);
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
      }
  return false; // prevent any default behavior
}


function mousePressed() {
	var newArm = new drawArm(mouseX,mouseY);
	var makeNew = false;
	for(ar in arms){
		if(arms.length>0){
			if(abs(dJoints(arms[ar],newArm))>100){
				makeNew = true;
			}
	
		}
	}
	if(arms.length==0){
		makeNew=true
	}

	if(makeNew){
		arms.push(newArm);
	}
}

function drawArm(x, y){
	this.x = x;
	this.y = y;
	this.hingeX;
	this.hingeY;
}

drawArm.prototype.update = function(){
	if(mouseIsPressed){
		if(dist(mouseX,mouseY,this.x,this.y)<40){
			this.x = mouseX;
			this.y = mouseY;
		}
	}
}
drawArm.prototype.display = function(){
	ellipse(this.x,this.y,20,20);
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

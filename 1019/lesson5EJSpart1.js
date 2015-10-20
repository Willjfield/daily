var cats = ["Roger","Lily"];
var humans = ["Will","Jess"];

var beings = [cats,humans];

console.log(beings.reduce(function(a,b){
	return a.concat(b);
}));


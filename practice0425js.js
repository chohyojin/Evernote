var myTimer1, myTimer2;
function rankScroll() {
	myTimer1 = setInterval(scroll, 3000);
	var top = 0;

	function scroll() {
		var list = document.getElementById("rlist");
		myTimer2 = setInterval(animation, 50);


		if(top == -301) {
			top = -1;
		}


		function animation() {
			if(top % 30 ==0) {
				clearInterval(myTimer2);
				top--;
			}
			else {
				list.style.top = top + "px";
				top--;
			}
		}
	}

}

function mouseOn() {
 	clearInterval(myTimer1);
 	clearInterval(myTimer2);
 	var ranking = document.getElementById("ranking");
 	ranking.style.height = "300px";

 	var list = document.getElementById("rlist");
 	list.style.top = "0";
}


function mouseOut() {

	var ranking = document.getElementById("ranking");
	ranking.style.height = "30px";
	rankScroll();

}
var main=function() {
	
	//Nav bar button click
	$('.nav_bar a').click(function(){
		$(this).toggleClass(".nav_btn");
	});
	
	var img = document.getElementById(".scaled");
	function enlarge (img) {
		img.style.width= "75%";
	};
	
	
};

$(document).ready(main);

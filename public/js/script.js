$(document).ready(function() {

	console.log('test');

	$.ajax({
		url: "/api/users", 
		success: function(result){
			console.log(result)
			$("#userlist").html(result.name);
		}
	});

	$.ajax({
		url: "/api/posts", 
		success: function(result){
			console.log(result)
			$("#postlist").html(result.name);
		}
	});

});
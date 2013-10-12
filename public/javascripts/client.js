$(document).ready(function(){
	$('#urlForm').submit(function (e) {
	    var $this = $(this);
	    e.preventDefault();
	    e.stopPropagation();

	    $.post($this.attr('action'), $this.serialize(), function (response) {
		    console.log(typeof response, response);
		    if (response.result === 'success') {
		    	window.location.reload();
		    } else {
		    	alert('Error creating link! check console for reason!');
		    }
	    });
	});
});
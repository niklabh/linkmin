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
		    	alert('Error creating link! Check console for reason!');
		    }
	    });
	});

	$('a.removeURL').click(function (e) {
		var $this = $(this);
		e.preventDefault();
		e.stopPropagation();

		console.log($this.data('key'));

		var body = {
			key: $this.data('key')
		};
		$.post('/shortner/delete', body, function (response) {
			console.log(typeof response, response);
			if (response.result === 'success') {
				window.location.reload();
			} else {
				alert('Error deleting link! Check console for reason!');
			}
		});
	});
});
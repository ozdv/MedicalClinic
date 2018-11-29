// Delete patient call
$(document).ready(function(){
	$('.delete-patient').on('click', function(e){
		$target = $(e.target);
		const id = $target.attr('data-id');
		$.ajax({
			type:'DELETE',
			url: '/patients/'+id,
			success: function(response){
				alert('Deleting Patient');
				window.location.href='/patientslist/';
			},
			error: function(err){
				console.log(err);
			}
		})
	});
});

// Delete doctor call
$(document).ready(function () {
	$('.delete-doctor').on('click', function (e) {
		$target = $(e.target)
		const id = $target.attr('data-id')
		$.ajax({
			type:'DELETE',
			url: '/doctors/'+id,
			success: function(response){
				alert('Deleting Doctor')
				window.location.href='/doctorslist/'
			},
			error: function(err){
				console.log(err);
			}
		})
	})
})
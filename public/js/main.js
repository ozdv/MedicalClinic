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

// Delete nurse call
$(document).ready(function () {
	$('.delete-nurse').on('click', function (e) {
		$target = $(e.target)
		const id = $target.attr('data-id')
		$.ajax({
			type:'DELETE',
			url: '/nurses/'+id,
			success: function(response){
				alert('Deleting Nurse')
				window.location.href='/nurseslist/'
			},
			error: function(err){
				console.log(err);
			}
		})
	})
})


// Delete receptionist call
$(document).ready(function () {
	$('.delete-receptionist').on('click', function (e) {
		$target = $(e.target)
		const id = $target.attr('data-id')
		$.ajax({
			type:'DELETE',
			url: '/receptionists/'+id,
			success: function(response){
				alert('Deleting Receptionist')
				window.location.href='/receptionistslist/'
			},
			error: function(err){
				console.log(err);
			}
		})
	})
})

// Delete equipment call
$(document).ready(function () {
	$('.delete-equipment').on('click', function (e) {
		$target = $(e.target)
		const id = $target.attr('data-id')
		$.ajax({
			type:'DELETE',
			url: '/equipments/'+id,
			success: function(response){
				alert('Deleting Equipment')
				window.location.href='/equipmentslist/'
			},
			error: function(err){
				console.log(err);
			}
		})
	})
})
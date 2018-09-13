$(".row-body").hide()
$("#modal-login").show()

$.ajax({
    method:"GET",
    url: "http://localhost:3000/users/login",
    headers: {
        token: localStorage.getItem('tokenjwt')
    }
})
  .done(data => {
    $(".row-body").show()
    $("#modal-login").hide()
})
  .fail(err => {
    alert('You have not login')
})
// var app = new Vue({
//   el: '#login-box',
//   data: function () {
//     return {
//       input: {}
//     }
//   },
//   methods: {
//     login: function () {
//       axios.post('http://localhost:3000/users/login',this.input)
//       .then(response => {
//       this.input = {};
//         this.$router.push({ path: '/' });
//       })
//         .catch(function (error) {
//           console.log(error);
//         });
//     }
//   }
// })

function login(email, password) {
  console.log('masuk ajax')

  $.ajax({
    method:"POST",
    url: "http://localhost:3000/users/login",
    data: {
      email: email,
      password: password
    },
    dataType: "json"
  })
  .done(function (data) {
  
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("tokenjwt", data.token);
  
        document.location = './index.html'
    } else {
        alert("Sorry, your browser does not support Web Storage. Please change to another browser to login")
    }
  })
  .fail(err => {
    alert(err.message)
  })
}

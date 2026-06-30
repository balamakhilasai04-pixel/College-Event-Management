document
.getElementById("forgotForm")
.addEventListener(
"submit",
async function(e){

e.preventDefault();

console.log("Button Clicked");

const email =
document
.getElementById("email")
.value;

const newPassword =
document
.getElementById("newPassword")
.value;

try{

const response =
await fetch(
"http://localhost:5000/api/auth/forgot-password",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
email,
newPassword
})
}
);

const data =
await response.json();

alert(data.message);

window.location.href =
"login.html";

}
catch(error){

console.log(error);

alert(
"Something went wrong"
);

}

});
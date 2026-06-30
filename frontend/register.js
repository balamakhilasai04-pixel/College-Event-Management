document
.getElementById(
"registerForm"
)

.addEventListener(
"submit",

async function(e){

e.preventDefault();

const userData = {

name:
document
.getElementById("name")
.value,

email:
document
.getElementById("email")
.value,

phone:
document
.getElementById("phone")
.value,

password:
document
.getElementById("password")
.value,

role:
document
.getElementById("role")
.value

};

try{

const response =
await fetch(
"http://localhost:5000/api/auth/register",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify(
userData
)
}
);

const data =
await response.json();

alert(
data.message
);

console.log(data);

if(response.ok){

window.location.href =
"/frontend/login/";

}

}
catch(error){

console.log(error);

alert(
"Registration Failed"
);

}

});
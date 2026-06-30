document
.getElementById("loginForm")
.addEventListener(
"submit",
async function(e){

e.preventDefault();

try{

const loginData = {

email:
document
.getElementById("email")
.value,

password:
document
.getElementById("password")
.value

};

const response =
await fetch(
"http://localhost:5000/api/auth/login",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify(loginData)
}
);

const data =
await response.json();

console.log(data);

if(!response.ok){

alert(
data.message ||
"Login Failed"
);

return;

}

// Save token FIRST
localStorage.setItem(
"token",
data.token
);

// Save user FIRST
localStorage.setItem(
"user",
JSON.stringify(data.user)
);

alert(
data.message
);

// Redirect LAST
window.location.href =
"/frontend/dashboard";

}
catch(error){

console.log(error);

alert(
"Something went wrong"
);

}

});

const eventId = localStorage.getItem("selectedEventId");
const eventName = localStorage.getItem("selectedEventName");

document.getElementById("eventName").innerHTML =
    "Registering for: <b>" + eventName + "</b>";

async function submitRegistration(){

    const name =
    document.getElementById("name").value;

    const email =
    document.getElementById("email").value;

    const phone =
    document.getElementById("phone").value;

    
    if(
        !name ||
        !email ||
        !phone
    ){

        alert("Please fill all required fields");

        return;

    }

    try{

        const response =
        await fetch(
            "http://localhost:5000/api/registrations",
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

    eventId: eventId,

    eventName: eventName,

    userName: name,

    userEmail: email,

    phone: phone

})
            }
        );

        const data =
        await response.json();

        alert("Registration Successful!");

        localStorage.removeItem("selectedEventId");
        localStorage.removeItem("selectedEventName");

        window.location.href="../index.html";

    }
    catch(error){

        console.log(error);

        alert("Registration Failed");

    }

}
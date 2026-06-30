console.log("Announcements JS Loaded");
const user =
JSON.parse(
localStorage.getItem(
"user"
)
);
const announcementForm =
document.getElementById("announcementForm");

if(user && user.role === "participant"){

    announcementForm.style.display = "none";

}

const formDiv =
document.getElementById(
"announcementForm"
);

if(user && user.role === "organizer"){

    formDiv.innerHTML = `
        <input id="title" placeholder="Title">

        <textarea id="message" placeholder="Announcement"></textarea>

        <button onclick="createAnnouncement()">
            Post Announcement
        </button>
    `;

} else if(user && user.role === "participant") {

    formDiv.innerHTML = `
        <p class="view-only-msg">
            📢 You can view all announcements here
        </p>
    `;
}
loadAnnouncements();
async function
createAnnouncement(){

const title =
document.getElementById(
"title"
).value;

const message =
document.getElementById(
"message"
).value;

try{

const response =
await fetch(
"http://localhost:5000/api/announcements",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({

title,
message

})
}
);

const data =
await response.json();

alert(
data.message
);

loadAnnouncements();

}
catch(error){

console.log(error);

alert(
"Failed"
);

}

}
async function
loadAnnouncements(){

try{

const response =
await fetch(
"http://localhost:5000/api/announcements"
);
console.log("Loading announcements...");
const announcements =
await response.json();
console.log("Total announcements:", announcements.length);
console.log(announcements);
const list =
document.getElementById(
"announcementList"
);

list.innerHTML =
"";

announcements.forEach(
(item)=>{

list.innerHTML +=

`

<div class="announcement-card">

    <h2>
        📢 ${item.title}
    </h2>

    <p>
        ${item.message}
    </p>

    <div class="announcement-footer">

        Posted on :
        ${new Date(item.createdAt).toLocaleDateString()}

    </div>

</div>

`;

});

}
catch(error){

console.log(error);

}

}
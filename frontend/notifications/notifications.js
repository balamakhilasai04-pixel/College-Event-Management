const notifications = [

"📢 Hackathon registrations close tomorrow",

"🎉 New Event Added: Game Fest",

"🏆 Certificates available for Tech Fest"

];

const list =
document.getElementById(
"notificationList"
);

notifications.forEach(
(item)=>{

list.innerHTML +=

`
<div class="notification">

${item}

</div>
`;

});
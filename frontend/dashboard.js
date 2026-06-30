const savedUser = localStorage.getItem("user");

if (!savedUser) {
    window.location.href = "/frontend/login/";
} else {
    const user = JSON.parse(savedUser);

    const registrationMenu =
        document.getElementById("registrationMenu");

    const myRegistrationMenu =
        document.getElementById("myRegistrationMenu");

    const createEventBtn =
        document.getElementById("createEventBtn");

        const quickCreateBtn =
document.getElementById("quickCreateBtn");

const quickViewBtn =
document.getElementById("quickViewBtn");


    const announcementBtn =
        document.getElementById("announcementBtn");

    /* Show user name */

    const userNameElement =
        document.getElementById("userName");

    if (userNameElement) {
        userNameElement.textContent =
            user.name || "User";
    }

    /* Show logged-in role badge */

    const roleBadge =
        document.getElementById("userRoleBadge");

    const userRole = String(
        user.role || "participant"
    )
        .trim()
        .toLowerCase();

    if (roleBadge) {
        roleBadge.classList.remove(
            "organizer-role",
            "participant-role"
        );

        if (userRole === "organizer") {
            roleBadge.textContent =
                "👑 Organizer";

            roleBadge.classList.add(
                "organizer-role"
            );
        } else {
            roleBadge.textContent =
                "🎉 Participant";

            roleBadge.classList.add(
                "participant-role"
            );
        }
    }

    /* Optional old role text, if it exists in HTML */

    const roleElement =
        document.getElementById("userRole");

    if (roleElement) {
        roleElement.textContent =
            userRole.charAt(0).toUpperCase() +
            userRole.slice(1);
    }

    /* Sidebar menu visibility */
if (userRole === "participant") {

    if (registrationMenu)
        registrationMenu.style.display = "none";

    if (myRegistrationMenu)
        myRegistrationMenu.style.display = "flex";

    if (createEventBtn)
        createEventBtn.style.display = "none";

    if (quickCreateBtn)
        quickCreateBtn.style.display = "none";

    if (quickViewBtn)
        quickViewBtn.style.display = "flex";

    if (announcementBtn)
        announcementBtn.style.display = "flex";

}
else {

    if (registrationMenu)
        registrationMenu.style.display = "flex";

    if (myRegistrationMenu)
        myRegistrationMenu.style.display = "none";

    if (createEventBtn)
        createEventBtn.style.display = "flex";

    if (quickCreateBtn)
        quickCreateBtn.style.display = "flex";

    if (quickViewBtn)
        quickViewBtn.style.display = "flex";

    if (announcementBtn)
        announcementBtn.style.display = "flex";

}
}


/* LOAD DASHBOARD DATA */

async function loadDashboard() {
    try {
        const response =
            await fetch(
                "http://localhost:5000/api/events"
            );

        const events =
            await response.json();
            loadCategoryChart(events);
            loadStatusChart(events);

        const totalEvents =
            document.getElementById("totalEvents");

        if (totalEvents) {
            totalEvents.textContent =
                Array.isArray(events)
                    ? events.length
                    : 0;
        }

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const upcomingEvents =
            Array.isArray(events)
                ? events.filter(function (event) {
                    const eventDate =
                        new Date(event.date);

                    return eventDate >= today;
                })
                : [];

        const upcomingEventsElement =
            document.getElementById("upcomingEvents");

        if (upcomingEventsElement) {
            upcomingEventsElement.textContent =
                upcomingEvents.length;
        }

        const registrationResponse =
            await fetch(
                "http://localhost:5000/api/registrations"
            );

        const registrations =
            await registrationResponse.json();
            loadRegistrationChart(
    events,
    registrations
);

        const totalRegistrations =
            document.getElementById(
                "totalRegistrations"
            );

        if (totalRegistrations) {
            totalRegistrations.textContent =
                Array.isArray(registrations)
                    ? registrations.length
                    : 0;
        }

        const announcementResponse =
            await fetch(
                "http://localhost:5000/api/announcements"
            );

        const announcements =
            await announcementResponse.json();

        const totalAnnouncements =
            document.getElementById(
                "totalAnnouncements"
            );

        if (totalAnnouncements) {
            totalAnnouncements.textContent =
                Array.isArray(announcements)
                    ? announcements.length
                    : 0;
        }
    } catch (error) {
        console.log(
            "Dashboard Error:",
            error
        );
    }
}


/* LOAD NOTIFICATIONS */

async function loadNotifications() {
    try {
        const response =
            await fetch(
                "http://localhost:5000/api/announcements"
            );

        const announcements =
            await response.json();

        const safeAnnouncements =
            Array.isArray(announcements)
                ? announcements
                : [];

        const notificationCount =
            document.getElementById(
                "notificationCount"
            );

        if (notificationCount) {
            notificationCount.textContent =
                safeAnnouncements.length;
        }

        const notificationList =
            document.getElementById(
                "notificationList"
            );

        if (!notificationList) {
            return;
        }

        notificationList.innerHTML = "";

        if (safeAnnouncements.length === 0) {
            notificationList.innerHTML =
                `
                <p class="no-notifications">
                    No notifications yet.
                </p>
                `;

            return;
        }

        if (safeAnnouncements.length === 0) {

    notificationList.innerHTML =

    `
    <p class="no-notifications">

        No new notifications.

    </p>
    `;

}
else{

    notificationList.innerHTML =

    `
    <p class="no-notifications">

        Check the Announcements page
        for the latest updates.

    </p>
    `;

}
    } catch (error) {
        console.log(
            "Notification Error:",
            error
        );
    }
}


/* OPEN OR CLOSE NOTIFICATIONS */

function openNotifications() {
    const panel =
        document.getElementById(
            "notificationPanel"
        );

    if (!panel) {
        return;
    }

    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
}


/* NAVIGATION */

function goDashboard() {
    window.location.href =
        "/frontend/dashboard/";
}

function goToEvents() {
    window.location.href =
        "/frontend/events/";
}

function goCreateEvent() {
    window.location.href =
        "/frontend/create-event/";
}

function goRegistrations() {
    window.location.href =
        "/frontend/registrations/";
}

function goMyRegistrations() {
    window.location.href =
        "/frontend/my-registrations/";
}

function goProfile() {
    window.location.href =
        "/frontend/profile/";
}

function goSettings() {
    window.location.href =
        "/frontend/settings/";
}

function goAnnouncements() {
    window.location.href =
        "/frontend/announcements/";
}

function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.location.href =
        "/frontend/login/";
}


/* START */

loadDashboard();

loadNotifications();
function loadCategoryChart(events){

    const categoryCounts = {};

    events.forEach(event => {

        const category =
            event.category || "Other";

        categoryCounts[category] =
            (categoryCounts[category] || 0) + 1;

    });

    new Chart(

    document.getElementById("categoryChart"),

    {

        type: "pie",

        data: {

            labels: Object.keys(categoryCounts),

            datasets: [

                {

                    data: Object.values(categoryCounts),

                    backgroundColor: [

                        "#06b6d4",
                        "#8b5cf6",
                        "#10b981",
                        "#f59e0b"

                    ]

                }

            ]

        }

    }

);
}
function loadRegistrationChart(events, registrations){

    const eventNames = [];
    const registrationCounts = [];

    events.forEach(event => {

        eventNames.push(event.title);

        const count = registrations.filter(reg =>
            reg.eventId === event._id
        ).length;

        registrationCounts.push(count);

    });

    new Chart(

        document.getElementById("registrationChart"),

        {

            type: "bar",

            data: {

                labels: eventNames,

                datasets: [{

                    label: "Registrations",

                    data: registrationCounts,

                    backgroundColor: "#8b5cf6"

                }]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        display: false

                    }

                },

                scales: {

                    y: {

                        beginAtZero: true

                    }

                }

            }

        }

    );

}
function loadStatusChart(events) {

    let upcoming = 0;
    let completed = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    events.forEach(event => {

        const eventDate = new Date(event.date);

        if (eventDate >= today) {
            upcoming++;
        } else {
            completed++;
        }

    });

    new Chart(

        document.getElementById("statusChart"),

        {

            type: "doughnut",

            data: {

                labels: [

                    "Upcoming",
                    "Completed"

                ],

                datasets: [

                    {

                        data: [

                            upcoming,
                            completed

                        ],

                        backgroundColor: [

                            "#06b6d4",
                            "#8b5cf6"

                        ]

                    }

                ]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        }

    );

}

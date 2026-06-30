const savedUser = localStorage.getItem("user");

if (!savedUser) {
    window.location.href = "/frontend/login/";
} else {
    const user = JSON.parse(savedUser);

    document.getElementById("settingsName").value =
        user.name || "";

    document.getElementById("settingsEmail").value =
        user.email || "";

    document.getElementById("settingsPhone").value =
        user.phone || "";

    const savedNotificationPreference =
        localStorage.getItem("eventNotifications");

    document.getElementById("notificationToggle").checked =
        savedNotificationPreference !== "false";
}


/* SAVE PROFILE */

document
    .getElementById("profileForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();

        const savedUser =
            localStorage.getItem("user");

        if (!savedUser) {
            alert("Please login again.");
            window.location.href = "/frontend/login/";
            return;
        }

        const user =
            JSON.parse(savedUser);

        const updatedName =
            document
                .getElementById("settingsName")
                .value
                .trim();

        const updatedPhone =
            document
                .getElementById("settingsPhone")
                .value
                .trim();

        if (!updatedName) {
            alert("Name is required.");
            return;
        }

        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/auth/update-profile",
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            email: user.email,
                            name: updatedName,
                            phone: updatedPhone
                        })
                    }
                );

            const data =
                await response.json();

            if (response.ok) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                document
                    .getElementById("settingsName")
                    .value =
                    data.user.name || "";

                document
                    .getElementById("settingsPhone")
                    .value =
                    data.user.phone || "";

                alert(
                    data.message ||
                    "Profile updated successfully."
                );

            } else {

                alert(
                    data.message ||
                    "Unable to update profile."
                );
            }

        } catch (error) {

            console.log(
                "Update Profile Error:",
                error
            );

            alert(
                "Cannot connect to server. Make sure backend is running."
            );
        }

    });

/* SAVE NOTIFICATION SETTING */

document
    .getElementById("notificationToggle")
    .addEventListener("change", function () {

        localStorage.setItem(
            "eventNotifications",
            this.checked
        );
    });


/* CHANGE PASSWORD */

const changePasswordBtn =
    document.getElementById("changePasswordBtn");

const passwordForm =
    document.getElementById("passwordForm");

const cancelPasswordBtn =
    document.getElementById("cancelPasswordBtn");


changePasswordBtn.addEventListener(
    "click",
    function () {

        passwordForm.classList.remove("hidden");

        changePasswordBtn.classList.add("hidden");
    }
);


cancelPasswordBtn.addEventListener(
    "click",
    function () {

        passwordForm.reset();

        passwordForm.classList.add("hidden");

        changePasswordBtn.classList.remove("hidden");
    }
);


passwordForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const currentPassword =
            document.getElementById("currentPassword").value;

        const newPassword =
            document.getElementById("newPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        if (newPassword !== confirmPassword) {
            alert("New passwords do not match.");
            return;
        }


        if (newPassword.length < 6) {
            alert("New password must contain at least 6 characters.");
            return;
        }


        const user =
            JSON.parse(
                localStorage.getItem("user")
            );


        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/auth/change-password",
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            email: user.email,
                            currentPassword: currentPassword,
                            newPassword: newPassword
                        })
                    }
                );


            const data =
                await response.json();


            if (response.ok) {

                alert(
                    data.message ||
                    "Password changed successfully."
                );

                passwordForm.reset();

                passwordForm.classList.add("hidden");

                changePasswordBtn.classList.remove("hidden");

            } else {

                alert(
                    data.message ||
                    "Unable to change password."
                );
            }

        } catch (error) {

            console.log(
                "Change Password Error:",
                error
            );

            alert(
                "Cannot connect to server. Make sure backend is running."
            );
        }

    }
);

/* NAVIGATION */

function goDashboard() {
    window.location.href = "/frontend/dashboard/";
}


function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.location.href = "/frontend/login/";
}
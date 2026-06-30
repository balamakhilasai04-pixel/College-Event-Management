document.addEventListener("DOMContentLoaded", function () {

    const savedUser =
        localStorage.getItem("user");

    console.log("Saved user from localStorage:", savedUser);

    if (!savedUser) {

        alert("Login session not found. Please login again.");

        window.location.href =
            "/frontend/login/";

        return;
    }

    let user;

    try {

        user =
            JSON.parse(savedUser);

    } catch (error) {

        console.log("User data error:", error);

        localStorage.removeItem("user");

        alert("Login data is invalid. Please login again.");

        window.location.href =
            "/frontend/login/";

        return;
    }

    document.getElementById("profileName").textContent =
        user.name || "User";

    document.getElementById("profileEmail").textContent =
        user.email || "Not available";

    document.getElementById("profilePhone").textContent =
        user.phone || "Not available";

    document.getElementById("profileRole").textContent =
        user.role || "Participant";

    document.getElementById("profileInitial").textContent =
        user.name
            ? user.name.charAt(0).toUpperCase()
            : "U";

});


function goDashboard() {

    window.location.href =
        "/frontend/dashboard/";

}
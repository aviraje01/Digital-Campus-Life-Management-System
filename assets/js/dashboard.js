window.onload = function () {

    // Assignment
    document.querySelectorAll("#box")[0].children[1].textContent =
        "Pending: " + (localStorage.getItem("assignmentPending") || 0);

    document.querySelectorAll("#box")[0].children[2].textContent =
        "Due Today: " + (localStorage.getItem("assignmentToday") || 0);


    // Attendance
    document.querySelectorAll("#box")[1].children[1].textContent =
        "Present: " + (localStorage.getItem("presentCount") || 0) +
        " | Absent: " + (localStorage.getItem("absentCount") || 0);

    document.querySelectorAll("#box")[1].children[2].textContent =
        "Percentage: " + (localStorage.getItem("attendancePercent") || 0) + "%";


    // Habit
    document.querySelectorAll("#box")[2].children[1].textContent =
        "Habits: " + (localStorage.getItem("habitCount") || 0);

    document.querySelectorAll("#box")[2].children[2].textContent =
        "Streak: " + (localStorage.getItem("habitStreak") || 0) + " days";


    // Study Planner
    document.querySelectorAll("#box")[3].children[1].textContent =
        "Tasks Today: " + (localStorage.getItem("tasksToday") || 0);

    document.querySelectorAll("#box")[3].children[2].textContent =
        "Hours Planned: 2"; // You can make this dynamic too


    // Time Table
    document.querySelectorAll("#box")[4].children[1].textContent =
        "Next Class: " + (localStorage.getItem("nextClass") || "None");

    document.querySelectorAll("#box")[4].children[2].textContent =
        localStorage.getItem("nextClassTime") || "—";
};

// LOGOUT BUTTON ACTION
document.getElementById("log-out").addEventListener("click", function () {

    let confirmLogout = confirm("Are you sure you want to log out?");

    if (confirmLogout) {

        // Clear saved data (optional)
        localStorage.clear();

        // Redirect to login page
        window.location.href = "login.html";
    }
});

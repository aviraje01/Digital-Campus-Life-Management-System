// Select Elements
const addBtn = document.getElementById("add");
const formDiv = document.querySelector(".form");
const subjectInput = document.getElementById("subject");
const attendanceInput = document.getElementById("attendance");
const dateInput = document.getElementById("date");
const presentInput = document.getElementById("pre");
const submitBtn = document.getElementById("submit");
const tableBody = document.querySelector(".assignment-table tbody");

// Show / Hide Form
addBtn.addEventListener("click", () => {
    formDiv.classList.toggle("show");
});

// Add Attendance
submitBtn.addEventListener("click", () => {

    const subject = subjectInput.value.trim();
    const attendance = attendanceInput.value.trim();
    const date = dateInput.value;
    const present = presentInput.value.trim().toLowerCase();

    // Validation
    if (!subject || !attendance || !date || !present) {
        alert("Please fill all fields");
        return;
    }

    // Format Date (DD Mon)
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short"
    });

    // Status color class
    const statusClass = present === "present" ? "present" : "absent";

    // Create Row
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${subject}</td>
        <td>${attendance}</td>
        <td>${formattedDate}</td>
        <td id="${statusClass}">${present.charAt(0).toUpperCase() + present.slice(1)}</td>
        <td><button class="delete-row">Delete</button></td>
    `;

    tableBody.appendChild(newRow);

    // Clear inputs
    subjectInput.value = "";
    attendanceInput.value = "";
    dateInput.value = "";
    presentInput.value = "";
});

// Delete Row
tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-row")) {
        e.target.closest("tr").remove();
    }
});

function saveAttendanceStats() {
    let rows = document.querySelectorAll(".assignment-table tbody tr");
    let present = 0;
    let absent = 0;

    rows.forEach(row => {
        let status = row.children[3].textContent.trim().toLowerCase();
        if (status === "present") present++;
        else if (status === "absent") absent++;
    });

    let total = present + absent;
    let percentage = total ? Math.round((present / total) * 100) : 0;

    localStorage.setItem("presentCount", present);
    localStorage.setItem("absentCount", absent);
    localStorage.setItem("attendancePercent", percentage);
}

saveAttendanceStats();

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


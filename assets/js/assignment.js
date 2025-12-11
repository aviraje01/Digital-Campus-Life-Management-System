// Select elements
const addBtn = document.getElementById("add");
const formDiv = document.querySelector(".form");
const subjectInput = document.getElementById("subject");
const assignmentInput = document.getElementById("assignment");
const dateInput = document.getElementById("date");
const statusInput = document.getElementById("status");
const submitBtn = document.getElementById("submit");
const tableBody = document.querySelector(".assignment-table tbody");

// Show or hide form
addBtn.addEventListener("click", () => {
    formDiv.classList.toggle("show");
});

// Add assignment
submitBtn.addEventListener("click", () => {

    let subject = subjectInput.value.trim();
    let assignment = assignmentInput.value.trim();
    let date = dateInput.value;
    let status = statusInput.value.trim().toLowerCase();

    // Validation
    if (!subject || !assignment || !date || !status) {
        alert("Please fill all the fields");
        return;
    }

    // Format date (DD Mon)
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short"
    });

    // Create table row
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${subject}</td>
        <td>${assignment}</td>
        <td>${formattedDate}</td>
        <td class="${status === "completed" ? "completed" : "pending"}">
            ${status.charAt(0).toUpperCase() + status.slice(1)}
        </td>
        <td><button class="delete-row">Delete</button></td>
    `;

    tableBody.appendChild(newRow);

    // Clear form
    subjectInput.value = "";
    assignmentInput.value = "";
    dateInput.value = "";
    statusInput.value = "";
});

// Delete row when Delete button clicked
tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-row")) {
        e.target.closest("tr").remove();
    }
});

function saveAssignmentStats() {
    let rows = document.querySelectorAll(".assignment-table tbody tr");
    let pending = 0;
    let todayDue = 0;

    let today = new Date().toLocaleDateString("en-GB");

    rows.forEach(row => {
        let status = row.children[3].textContent.trim();
        let dueDate = row.children[2].textContent.trim();

        if (status === "Pending") pending++;
        if (dueDate === today) todayDue++;
    });

    localStorage.setItem("assignmentPending", pending);
    localStorage.setItem("assignmentToday", todayDue);
}

saveAssignmentStats();

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


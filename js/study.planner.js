// Make every table cell editable except headers
document.querySelectorAll("table td").forEach(cell => {

    cell.addEventListener("click", function () {

        let oldValue = cell.textContent.trim();

        // Prevent adding multiple inputs
        if (cell.querySelector("input")) return;

        // Create input field
        let input = document.createElement("input");
        input.type = "text";
        input.value = oldValue;
        input.style.width = "90%";
        input.style.fontSize = "18px";
        input.style.textAlign = "center";

        // Replace text with input
        cell.textContent = "";
        cell.appendChild(input);
        input.focus();

        // Save on Enter
        input.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                save();
            }
        });

        // Save when clicking outside
        input.addEventListener("blur", save);

        function save() {
            let newValue = input.value.trim();
            if (newValue === "") newValue = oldValue;
            cell.textContent = newValue;
        }
    });
});

function saveStudyStats() {

    let rows = document.querySelectorAll("table tr");
    let tasksToday = 0;

    rows.forEach(row => {
        let todayCell = row.children[new Date().getDay()];
        if (todayCell && todayCell.textContent.trim() !== "" && row.rowIndex !== 0)
            tasksToday++;
    });

    localStorage.setItem("tasksToday", tasksToday);
}

saveStudyStats();

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


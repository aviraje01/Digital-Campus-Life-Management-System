// Make all timetable cells editable on click
document.querySelectorAll("tbody td").forEach(cell => {

    // Skip lunch break row (because it has colspan)
    if (cell.parentElement.classList.contains("lunch-row")) return;

    cell.addEventListener("click", function () {

        let oldValue = cell.textContent.trim();

        // If already editing, do nothing
        if (cell.querySelector("input")) return;

        // Create input
        let input = document.createElement("input");
        input.type = "text";
        input.value = oldValue;
        input.style.width = "90%";

        // Replace text with input
        cell.textContent = "";
        cell.appendChild(input);
        input.focus();

        // Save on ENTER
        input.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                saveChanges();
            }
        });

        // Save on clicking outside
        input.addEventListener("blur", saveChanges);

        function saveChanges() {
            let newValue = input.value.trim();

            // Prevent empty text
            if (newValue === "") newValue = oldValue;

            cell.textContent = newValue;
        }
    });
});

function saveNextClass() {
    let currentHour = new Date().getHours();
    let currentMin = new Date().getMinutes();

    let time = currentHour * 60 + currentMin;

    let rows = document.querySelectorAll("tbody tr");
    let nextClass = "None";
    let nextTime = "—";

    rows.forEach(row => {
        let t = row.children[0].textContent.trim();
        let start = t.split("-")[0].trim();
        let h = parseInt(start.split(":")[0]);
        let m = parseInt(start.split(":")[1]);
        let total = h * 60 + m;

        if (total > time && nextClass === "None") {
            nextClass = row.children[1].textContent.trim();
            nextTime = start;
        }
    });

    localStorage.setItem("nextClass", nextClass);
    localStorage.setItem("nextClassTime", nextTime);
}

saveNextClass();

// LOGOUT BUTTON ACTION
document.getElementById("log-out").addEventListener("click", function () {

    let confirmLogout = confirm("Are you sure you want to log out?");

    if (confirmLogout) {

        // Clear saved data (optional)
        localStorage.clear();

        // Redirect to login page
        window.location.href = "index.html";
    }
});



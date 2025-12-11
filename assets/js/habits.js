
document.querySelectorAll(".habit-table tbody td:first-child").forEach(cell => {

    cell.addEventListener("click", function () {

        let oldValue = cell.innerHTML.trim();

        // Avoid adding an input twice
        if (cell.querySelector("input")) return;

        // Create input box
        let input = document.createElement("input");
        input.type = "text";
        input.value = oldValue.replace(/<br>/g, " ");
        input.style.width = "90%";

        cell.innerHTML = "";
        cell.appendChild(input);
        input.focus();

        function save() {
            let newValue = input.value.trim();
            if (newValue === "") newValue = oldValue;
            cell.innerHTML = newValue.replace(/\n/g, "<br>");
        }

        input.addEventListener("blur", save);
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") save();
        });
    });
});

document.querySelectorAll(".habit-table tbody td:not(:first-child)").forEach(cell => {

    cell.addEventListener("click", function () {

        if (cell.textContent.trim() === "✔") {
            cell.textContent = "";
            cell.classList.remove("done");
        } else {
            cell.textContent = "✔";
            cell.classList.add("done");
        }
    });

});

function saveHabitStats() {
    let habits = document.querySelectorAll(".habit-table tbody tr").length;
    let streak = 0;

    document.querySelectorAll(".done").forEach(d => streak++);

    localStorage.setItem("habitCount", habits);
    localStorage.setItem("habitStreak", streak);
}

saveHabitStats();

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


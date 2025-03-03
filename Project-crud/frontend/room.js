const API_URL = "http://localhost:3000/api/rooms";

const roomForm = document.getElementById("roomForm");
const roomsTableBody = document.getElementById("roomsTableBody");
const cancelUpdateButton = document.getElementById("cancelUpdate");

// Reset the form
function resetForm() {
    const roomIdInput = document.getElementById("roomId");
    const typeInput = document.getElementById("type");
    const priceInput = document.getElementById("price");
    const statusInput = document.getElementById("status");

    roomIdInput.value = "";
    typeInput.value = "";
    priceInput.value = "";
    statusInput.value = "";
    cancelUpdateButton.style.display = "none"; // Hide the cancel button
}

// Fetch room data from API
async function fetchrooms() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const rooms = await res.json();

        roomsTableBody.innerHTML = rooms
            .map(
                (room) => `
            <tr>
                <td>${room.id}</td>
                <td>${sanitize(room.type)}</td>
                <td>${room.price}</td>
                <td>${sanitize(room.status)}</td>
                <td>
                    <button onclick="editroom(${room.id}, '${sanitize(room.type)}', ${room.price}, '${sanitize(room.status)}')">Edit</button>
                    <button onclick="deleteroom(${room.id})">Delete</button>
                </td>
            </tr>
        `
            )
            .join("");
    } catch (error) {
        console.error("Error fetching rooms:", error);
        alert("There was an error fetching the rooms data.");
    }
}

// Delete a room
async function deleteroom(id) {
    if (confirm("Are you sure you want to delete this room?")) {
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            fetchrooms(); // Refresh the table after deletion
        } catch (error) {
            console.error("Error deleting room:", error);
            alert("There was an error deleting the room.");
        }
    }
}

// Edit room details
function editroom(id, type, price, status) {
    const roomIdInput = document.getElementById("roomId");
    const typeInput = document.getElementById("type");
    const priceInput = document.getElementById("price");
    const statusInput = document.getElementById("status");

    roomIdInput.value = id.toString();
    typeInput.value = type;
    priceInput.value = price.toString();
    statusInput.value = status;
    cancelUpdateButton.style.display = "inline"; // Show the cancel button
}

// Add event listener for cancel button
cancelUpdateButton.addEventListener("click", resetForm);

// Add or update room
roomForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const roomIdInput = document.getElementById("roomId");
    const typeInput = document.getElementById("type");
    const priceInput = document.getElementById("price");
    const statusInput = document.getElementById("status");

    const roomId = roomIdInput.value.trim();
    const type = typeInput.value.trim();
    const price = parseFloat(priceInput.value.trim());
    const status = statusInput.value.trim();

    // Ensure price is a valid number
    if (!type || isNaN(price) || price <= 0 || !status) {
        alert("Please fill in all the fields: type, price (positive number), and status.");
        return;
    }

    try {
        const method = roomId ? "PUT" : "POST";
        const url = roomId ? `${API_URL}/${roomId}` : API_URL;

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type, price, status }),
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        resetForm();
        fetchrooms();
    } catch (error) {
        console.error("Error saving/updating room:", error);
        alert("There was an error saving or updating the room.");
    }
});

// Function to sanitize input strings
function sanitize(str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}




// Fetch rooms when the page loads
fetchrooms();

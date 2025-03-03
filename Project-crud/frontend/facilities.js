const API_URL = "http://localhost:3000/api/facilities";

const facilityForm = document.getElementById("facilityForm");
const facilitiesTableBody = document.getElementById("facilitiesTableBody");

facilityForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const facilityId = document.getElementById("facilityId").value;
  const roomId = document.getElementById("roomId").value;
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;

  try {
    if (facilityId) {
      await fetch(`${API_URL}/${facilityId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, name, description }),
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, name, description }),
      });
    }

    facilityForm.reset();
    fetchFacilities();
  } catch (error) {
    console.error("Error saving/updating facility:", error);
    alert("Error saving/updating facility. Please try again.");
  }
});

async function fetchFacilities() {
        const res = await fetch(API_URL);
        const facilities = await res.json();

        facilitiesTableBody.innerHTML = facilities
        .map(
        (facility) => `
          <tr>
            <td>${facility.id}</td>
            <td>${facility.roomId}</td>
            <td>${facility.name}</td>
            <td>${facility.description}</td>
          </tr>
        `
      )
      .join("");
    }


fetchFacilities();

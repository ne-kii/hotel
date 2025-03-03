const API_URL = "http://localhost:3000/api/bookings"; // Update API URL to bookings

const bookingForm = document.getElementById("bookingForm");
const bookingsDiv = document.getElementById("bookings");

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get values from form inputs
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const checkinDate = document.getElementById("checkinDate").value;
  const checkoutDate = document.getElementById("checkoutDate").value;
  const numGuests = document.getElementById("numGuests").value;

  // Send booking data to the API
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, checkinDate, checkoutDate, numGuests }),
  });

  // Reset the form and fetch updated bookings
  bookingForm.reset();
  fetchBookings();
});

async function fetchBookings() {
  const res = await fetch(API_URL);
  const bookings = await res.json();
  bookingsDiv.innerHTML = bookings
    .map((booking) => `
      <div>
        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        <p><strong>Check-in Date:</strong> ${booking.checkinDate}</p>
        <p><strong>Check-out Date:</strong> ${booking.checkoutDate}</p>
        <p><strong>Guests:</strong> ${booking.numGuests}</p>
      </div>
    `)
    .join("");
}

fetchBookings();

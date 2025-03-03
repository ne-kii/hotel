const API_URL = "http://localhost:3000/api/users";

const userForm = document.getElementById("userForm");
const usersDiv = document.getElementById("users");

userForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, address }),
  });

  userForm.reset();
  fetchUsers();
});

async function fetchUsers() {
  const res = await fetch(API_URL);
  const users = await res.json();

  usersDiv.innerHTML = users
    .map(
      (user) => `
        <div class="user-card">
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Address:</strong> ${user.address}</p>
        </div>
      `
    )
    .join("");
}

fetchUsers();

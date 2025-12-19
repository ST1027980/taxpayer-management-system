// Select elements
const form = document.getElementById("taxForm");
const list = document.getElementById("taxpayerList");
const errorMsg = document.getElementById("errorMsg");

// Load stored taxpayers when page loads
document.addEventListener("DOMContentLoaded", loadTaxpayers);

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const taxId = document.getElementById("taxId").value.trim();
  const email = document.getElementById("email").value.trim();

  // Validation
  if (name === "" || taxId === "" || email === "") {
    errorMsg.textContent = "All fields are required.";
    return;
  }

  if (!/^\d{10}$/.test(taxId)) {
    errorMsg.textContent = "Tax ID must be exactly 10 digits.";
    return;
  }

  errorMsg.textContent = "";

  const taxpayer = { name, taxId, email };

  saveTaxpayer(taxpayer);
  displayTaxpayer(taxpayer);

  form.reset();
});

// Save taxpayer to LocalStorage
function saveTaxpayer(taxpayer) {
  let taxpayers = JSON.parse(localStorage.getItem("taxpayers")) || [];
  taxpayers.push(taxpayer);
  localStorage.setItem("taxpayers", JSON.stringify(taxpayers));
}

// Load taxpayers from LocalStorage
function loadTaxpayers() {
  const taxpayers = JSON.parse(localStorage.getItem("taxpayers")) || [];
  taxpayers.forEach(displayTaxpayer);
}

// Display taxpayer in table
function displayTaxpayer(taxpayer) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${taxpayer.name}</td>
    <td>${taxpayer.taxId}</td>
    <td>${taxpayer.email}</td>
    <td class="delete">Delete</td>
  `;

  // Delete functionality
  row.querySelector(".delete").addEventListener("click", () => {
    removeTaxpayer(taxpayer.taxId);
    row.remove();
  });

  list.appendChild(row);
}

// Remove taxpayer from LocalStorage
function removeTaxpayer(taxId) {
  let taxpayers = JSON.parse(localStorage.getItem("taxpayers")) || [];
  taxpayers = taxpayers.filter(t => t.taxId !== taxId);
  localStorage.setItem("taxpayers", JSON.stringify(taxpayers));
}

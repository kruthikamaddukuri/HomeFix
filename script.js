
const bookingModal = document.getElementById("booking-modal");
const serviceSelect = document.getElementById("service-select");
const bookingMessage = document.getElementById("booking-message");
const problemInput = document.getElementById("problem");
const serviceSearch = document.getElementById("service-search");
const serviceCards = document.querySelectorAll(".service-card");
const noResults = document.getElementById("no-results");

function showBooking() {
  bookingModal.classList.add("show");
  bookingMessage.textContent = "";
  bookingMessage.style.color = "";
  document.body.style.overflow = "hidden";
}

function closeBooking() {
  bookingModal.classList.remove("show");
  document.body.style.overflow = "";
}

function selectService(service) {
  serviceSelect.value = service;
  showBooking();
}

function searchServices() {
  const searchText = serviceSearch.value.trim().toLowerCase();
  let visibleCount = 0;

  serviceCards.forEach(function (card) {
    const serviceName = card.dataset.service.toLowerCase();
    const serviceDescription = card.textContent.toLowerCase();

    const matches =
      serviceName.includes(searchText) ||
      serviceDescription.includes(searchText);

    card.style.display = matches ? "" : "none";

    if (matches) {
      visibleCount++;
    }
  });

  noResults.style.display = visibleCount === 0 ? "block" : "none";
}

function confirmBooking() {
  const selectedService = serviceSelect.value;
  const problem = problemInput.value.trim();

  if (!selectedService) {
    bookingMessage.style.color = "#DC2626";
    bookingMessage.textContent = "Please select a service first.";
    return;
  }

  if (!problem) {
    bookingMessage.style.color = "#DC2626";
    bookingMessage.textContent = "Please describe your home repair problem.";
    problemInput.focus();
    return;
  }

  bookingMessage.style.color = "#15803D";
  bookingMessage.textContent =
    `✓ Your ${selectedService} request is ready! This is a demo booking.`;

  console.log("HomeFix demo booking:", {
    service: selectedService,
    problem: problem
  });
}

// Close the booking modal when clicking outside it
bookingModal.addEventListener("click", function (event) {
  if (event.target === bookingModal) {
    closeBooking();
  }
});

// Close the modal with the Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && bookingModal.classList.contains("show")) {
    closeBooking();
  }
});

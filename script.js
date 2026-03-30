document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }

  const bookingForm = document.getElementById("booking-form");
  const nightsOutput = document.getElementById("nights-output");
  const estimateOutput = document.getElementById("estimate-output");

  function calculateEstimate() {
    if (!bookingForm || !nightsOutput || !estimateOutput) return;

    const checkin = bookingForm.querySelector('[name="checkin"]')?.value;
    const checkout = bookingForm.querySelector('[name="checkout"]')?.value;
    const roomType = bookingForm.querySelector('[name="room"]')?.value;

    const prices = {
      "classic": 95,
      "deluxe": 135,
      "suite": 185
    };

    if (!checkin || !checkout || !roomType) {
      nightsOutput.textContent = "-";
      estimateOutput.textContent = "-";
      return;
    }

    const start = new Date(checkin);
    const end = new Date(checkout);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (!Number.isFinite(diff) || diff <= 0) {
      nightsOutput.textContent = "Data të pavlefshme";
      estimateOutput.textContent = "-";
      return;
    }

    const total = diff * prices[roomType];
    nightsOutput.textContent = diff + (diff === 1 ? " natë" : " net");
    estimateOutput.textContent = "€" + total.toLocaleString("sq-AL");
  }

  if (bookingForm) {
    bookingForm.addEventListener("input", calculateEstimate);
    calculateEstimate();
  }
});


let userLocation = "Unknown";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();

      userLocation =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.district ||
        "Unknown";

      const line3 = document.querySelector(".line-3");
      if (line3) {
        line3.innerText = `-- Signal stronger in ${userLocation}. --`;
      }
    } catch (error) {
      console.error("Location error:", error);
    }
  });
}

function sendSignal() {
  const email = document.getElementById("email").value;
  if (!email) {
    alert("Enter email first");
    return;
  }

  fetch("https://docs.google.com/forms/d/e/1FAIpQLSe2Ev0wVLp8_3Mw4oKJTYiav-8k7DoK3KXQ2GGDPRm4Y8vsWQ/formResponse",
 {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      "entry.344334900": email   
    })
  });
const footer = document.getElementById("footer");

footer.style.opacity = "0";

setTimeout(() => {
  typeText(footer, "-- Signal Established --", 60);
}, 300);


document.getElementById("email").value = "";

}
function typeText(element, text, speed = 50) {
  element.textContent = "";
  let i = 0;
  element.style.opacity = "1";

  const typing = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
    }
  }, speed);
}




function updateClock() {
   const UTC= "UTC";
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Format minutes and seconds with leading zeros
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Display in h:mm:s format (no leading zero for hours)
    document.getElementById("clock").textContent = `${hours}:${minutes}:${seconds}${UTC}`;
}

// Update every second
setInterval(updateClock, 1000);
updateClock(); // Initial call to avoid delay


const emailInput = document.getElementById("email");
const errorText = document.getElementById("emailError");
const button = document.getElementById("signalBtn");

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

emailInput.addEventListener("input", () => {
  if (gmailRegex.test(emailInput.value)) {
    errorText.style.display = "none";
    button.disabled = false;
  } else {
    errorText.style.display = "block";
    button.disabled = true;
  }
});




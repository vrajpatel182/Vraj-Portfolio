const hardcodedTours = {
      kerala: { title: "Kerala Backwater", desc: "Experience the serene backwaters." },
      goa: { title: "Goa Paradise", desc: "Sun, sand, and sea." },
      manali: { title: "Manali Adventure", desc: "Snowy peaks and thrills." }
    };

    // 2. LOAD ANY TOUR (Dynamic)
    function loadTourData() {
      const params = new URLSearchParams(window.location.search);
      const tourKey = params.get("tour") ? params.get("tour").toLowerCase() : "";
      
      let selectedTour = null;

      // Check hardcoded list first
      if (hardcodedTours[tourKey]) {
        selectedTour = hardcodedTours[tourKey];
      } else {
        // Check Admin-added tours from localStorage
        const adminTours = JSON.parse(localStorage.getItem('addedTours')) || [];
        const found = adminTours.find(t => t.name.toLowerCase() === tourKey);
        if (found) {
          selectedTour = { title: found.name, desc: found.desc };
        }
      }

      if (selectedTour) {
        document.getElementById("tourTitle").textContent = selectedTour.title;
        document.getElementById("tourDesc").textContent = selectedTour.desc;
        calculateTotal();
      } else {
        document.getElementById("tourTitle").textContent = "Tour Not Found";
      }
    }

    // 3. CALCULATION
    function calculateTotal() {
      const people = document.getElementById("people").value || 1;
      const days = document.getElementById("days").value;
      const hotel = document.getElementById("hotel").value;
      const car = document.getElementById("car").value;

      const total = people * days * (Number(hotel) + Number(car));
      document.getElementById("totalPrice").textContent = total.toLocaleString();
    }

    // 4. SAVE & REDIRECT
    function saveBooking() {
      const date = document.getElementById("travelDate").value;
      const people = document.getElementById("people").value;

      if (!date || !people || people <= 0) {
        alert("Please select a date and enter number of travelers.");
        return;
      }

      const bookingData = {
        tour: document.getElementById("tourTitle").textContent,
        hotel: document.getElementById("hotel").selectedOptions[0].text.split(' – ')[0],
        car: document.getElementById("car").selectedOptions[0].text.split(' – ')[0],
        people: people,
        days: document.getElementById("days").value,
        date: date,
        price: document.getElementById("totalPrice").textContent
      };

      localStorage.setItem("booking", JSON.stringify(bookingData));
      window.location.href = "payment.html";
    }

    window.onload = loadTourData;
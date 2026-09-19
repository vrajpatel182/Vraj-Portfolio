let currentTransactionID = "";

    // Load Data from previous page
    const rawData = JSON.parse(localStorage.getItem("booking")) || {};

    function cleanText(text) {
      if (!text) return "N/A";
      return String(text).replace(/[^\x20-\x7E]/g, '').trim();
    }

    const data = {
      tour: cleanText(rawData.tour),
      hotel: cleanText(rawData.hotel),
      car: cleanText(rawData.car),
      people: cleanText(rawData.people),
      days: cleanText(rawData.days),
      name: cleanText(rawData.name || "Customer"),
      email: cleanText(rawData.email || "No Email"),
      tourDate: cleanText(rawData.date || "Not Selected") // Added Tour Date
    };

    // UI Updates
    document.getElementById("tour").textContent = data.tour;
    document.getElementById("hotel").textContent = data.hotel;
    document.getElementById("car").textContent = data.car;
    document.getElementById("people").textContent = data.people;
    document.getElementById("days").textContent = data.days;

    function processPayment() {
      currentTransactionID = "TG-" + Math.random().toString(36).substr(2, 9).toUpperCase();

      const finalBooking = {
        name: data.name,
        email: data.email,
        tour: data.tour,
        persons: data.people,
        total: "5,000",
        status: "PAID",
        txnId: currentTransactionID,
        bookingDate: new Date().toLocaleDateString() // Record current date as booking date
      };

      let bookings = JSON.parse(localStorage.getItem('allBookings')) || [];
      bookings.push(finalBooking);
      localStorage.setItem('allBookings', JSON.stringify(bookings));

      document.getElementById("displayID").textContent = currentTransactionID;
      document.getElementById("currentDate").textContent = new Date().toLocaleString();
      document.getElementById("paymentMethods").style.display = "none";
      document.getElementById("downloadSection").style.display = "block";
      alert("Payment Successful! Record sent to Admin.");
    }

    function downloadPDF() {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      const img = new Image();
      img.src = 'image/SIGN.jpeg';

      const today = new Date().toLocaleDateString();

      img.onload = function () {
        // --- Header Design ---
        doc.setFillColor(13, 110, 253);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(255, 255, 255);
        doc.text("TourGen Official Receipt", 20, 25);
        
        doc.setFontSize(10);
        doc.text("Thank you for booking with us!", 20, 32);

        // --- Details Table ---
        doc.setTextColor(0, 0, 0);
        doc.autoTable({
          startY: 50,
          head: [['Description', 'Details']],
          body: [
            ['Transaction ID', currentTransactionID],
            ['Booking Date', today],
            ['Destination', data.tour],
            ['Hotel Category', data.hotel],
            ['Transport Type', data.car],
            ['Total Travelers', data.people],
            ['Payment Status', 'PAID (Advance)']
          ],
          theme: 'striped',
          headStyles: { fillColor: [13, 110, 253] }
        });

        // --- Financials ---
        const finalY = doc.lastAutoTable.finalY + 15;
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`Total Amount Paid: INR 5,000.00`, 20, finalY);
        
        // --- Signature Section ---
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("Authorized Signature:", 150, finalY + 5);
        
        // The Signature Image
        doc.addImage(img, 'JPEG', 150, finalY + 8, 40, 20);
        
        doc.setDrawColor(200, 200, 200);
        doc.line(150, finalY + 30, 195, finalY + 30); // Signature line
        doc.text("TourGen Management", 155, finalY + 35);

        // --- Save ---
        doc.save(`TourGen_Receipt_${currentTransactionID}.pdf`);
      };

      img.onerror = function() {
        alert("Signature image not found, but downloading PDF anyway.");
        // If image fails, trigger the onload logic without the image
        img.onload(); 
      };
    }
const defaults = [
            { name: "Kerala", img: "image/kerala.jpg", price: "₹3500", dur: "3 Days", desc: "Backwaters" },
            { name: "Himachal", img: "image/manali.jpg", price: "₹4000", dur: "5 Days", desc: "Mountains" }
        ];

        function showSection(id, btn) {
            document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            document.getElementById(id).classList.add('active');
            btn.classList.add('active');
        }

        function render() {
            const tours = JSON.parse(localStorage.getItem('myTours')) || defaults;
            const bookings = JSON.parse(localStorage.getItem('allBookings')) || [];

            document.getElementById('stat-tours').innerText = tours.length;
            document.getElementById('stat-bookings').innerText = bookings.length;

            // Render Tour Table
            document.getElementById('tourTable').innerHTML = tours.map((t, i) => `
                <tr>
                    <td class="ps-4"><img src="${t.img}" class="tour-img-sm"></td>
                    <td><span class="fw-bold">${t.name}</span></td>
                    <td class="text-primary fw-bold">${t.price}</td>
                    <td class="text-end pe-4">
                        <button onclick="deleteTour(${i})" class="btn text-danger"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            `).join('');

            // Render User Bookings
            const bookingBody = document.getElementById('bookingTable');
            if(bookings.length === 0) {
                bookingBody.innerHTML = `<tr><td colspan="5" class="text-center py-5 text-muted">No customers yet.</td></tr>`;
            } else {
                bookingBody.innerHTML = bookings.reverse().map(b => `
                    <tr>
                        <td class="ps-4">
                            <div class="d-flex align-items-center">
                                <div class="avatar-circle me-3">${b.name.charAt(0).toUpperCase()}</div>
                                <div>
                                    <div class="fw-bold">${b.name}</div>
                                    <small class="text-muted">${b.email}</small>
                                </div>
                            </div>
                        </td>
                        <td><span class="badge bg-light text-primary border">${b.tour}</span></td>
                        <td>${b.persons} Persons</td>
                        <td class="fw-bold text-success">₹${b.total}</td>
                        <td class="text-end pe-4"><span class="badge bg-success">PAID</span></td>
                    </tr>
                `).join('');
            }
        }

        document.getElementById('tourForm').addEventListener('submit', function(e) {
            e.preventDefault();
            let tours = JSON.parse(localStorage.getItem('myTours')) || defaults;
            tours.push({
                name: document.getElementById('name').value,
                img: document.getElementById('img').value,
                desc: document.getElementById('desc').value,
                price: '₹' + document.getElementById('price').value.replace('₹',''),
                dur: document.getElementById('dur').value
            });
            localStorage.setItem('myTours', JSON.stringify(tours));
            this.reset();
            bootstrap.Modal.getOrCreateInstance(document.getElementById('addTourModal')).hide();
            render();
        });

        function deleteTour(i) {
            let tours = JSON.parse(localStorage.getItem('myTours')) || defaults;
            tours.splice(i, 1);
            localStorage.setItem('myTours', JSON.stringify(tours));
            render();
        }

        window.onload = render;
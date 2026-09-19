
        // Default Data including HIMACHAL
        const initialTours = [
            { name: "Kerala", img: "image/kerala.jpg", desc: "Natural wonders, backwaters, and cultural heritage await in God's Own Country.", price: "₹3500", dur: "3-10d", season: "Dec-Jan" },
            { name: "Himachal Pradesh", img: "image/manali.jpg", desc: "Famous for snow-capped mountains, green valleys, and thrilling adventure sports.", price: "₹4000", dur: "4-10d", season: "Dec-Jan" },
            { name: "Goa", img: "image/goa.jpg", desc: "Unwind at sun-kissed beaches, vibrant nightlife, and historic Portuguese architecture.", price: "₹4000", dur: "2-7d", season: "Nov-Feb" }
        ];

        function renderTours() {
            const grid = document.getElementById('tourGrid');
            let tours = JSON.parse(localStorage.getItem('myTours'));

            if (!tours || tours.length === 0) {
                tours = initialTours;
                localStorage.setItem('myTours', JSON.stringify(initialTours));
            }

            grid.innerHTML = tours.map(tour => `
                <div class="col xyz tour-card-item" data-name="${tour.name.toLowerCase()}">
                    <div class="card shadow-sm border-0">
                        <div class="card-img-container">
                            <img src="${tour.img}" class="card-img-top" alt="${tour.name}" onerror="this.src='https://via.placeholder.com/400x250'">
                        </div>
                        <div class="card-body d-flex flex-column text-start">
                            <h3 class="h4 fw-bold">${tour.name}</h3>
                            <p class="text-muted small flex-grow-1">${tour.desc}</p>
                            <div class="row border-top pt-3 g-0 text-center">
                                <div class="col-4 border-end"><small class="text-muted d-block">Time</small><strong>${tour.dur}</strong></div>
                                <div class="col-4 border-end"><small class="text-muted d-block">Price</small><strong>${tour.price}</strong></div>
                                <div class="col-4"><small class="text-muted d-block">Season</small><strong>${tour.season}</strong></div>
                            </div>
                            <a href="booking.html?tour=${tour.name.toLowerCase().replace(/\s+/g, '-')}" 
                               class="btn btn-outline-primary mt-3 rounded-pill">See More</a>
                        </div>
                    </div>
                </div>
            `).join('');

            // Handle search from Home page
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('search')) {
                document.getElementById('searchInput').value = urlParams.get('search');
                searchPackage();
            }
        }

        function searchPackage() {
            let filter = document.getElementById("searchInput").value.toLowerCase().trim();
            let items = document.querySelectorAll(".tour-card-item");
            let found = false;

            items.forEach(item => {
                if (item.getAttribute("data-name").includes(filter)) {
                    item.style.display = "block";
                    found = true;
                } else {
                    item.style.display = "none";
                }
            });
            document.getElementById("noResult").style.display = found ? "none" : "block";
        }

        window.onload = renderTours;
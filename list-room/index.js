document.addEventListener("DOMContentLoaded", function () {
    const ratings = document.querySelectorAll('.rating');

    ratings.forEach(function (rating) {
        const ratingValue = parseInt(rating.getAttribute('data-rating'));
        const stars = [];

        // Tạo các sao dựa trên ratingValue
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            if (i <= ratingValue) {
                star.innerHTML = '★'; // Có sao
            } else {
                star.innerHTML = '☆'; // Không có sao
            }
            rating.appendChild(star);
        }
    });
});

//MINH
let date_time = JSON.parse(localStorage.getItem('date_time'));
let abc = date_time.month_start + " / " + date_time.day_start + " / " + date_time.year_start + " - " + date_time.month_end + " / " + date_time.day_end + " / " + date_time.year_end;
document.getElementById("abc").setAttribute('value', abc);

function search_location() {
    window.location = "http://127.0.0.1:5500/list-room/";
}

let search_hotel = document.querySelector('.search-hotel');

search_hotel.addEventListener('change', function () {
    let location = search_hotel.value;
    localStorage.setItem('location', JSON.stringify(location));
});

let locations = JSON.parse(localStorage.getItem('location'));

let data_location = 'http://localhost:3000';

function list_hotel(data) {
    let form_hotel = "";
    for (let i = 0; i < data.length; i++) {
        form_hotel += `
                    <div class="card mb-3 ms-0 id-hotel" value="${data[i].hotel_id}">
                    <div class="row p-3">
                        <div class="col-md-4">
                            <img src="${data[i].image[0]}" class="img-fluid rounded" alt="..." />
                        </div>
                        <div class="col-md-8 d-flex flex-column">
                            <div class="card-body">
                                <h5 class="card-title d-flex align-items-center text-blue">
                                    ${data[i].name}
                                    <div class="rating ps-2" data-rating="${data[i].star}"></div>
                                </h5>
                                <p class="card-text">
                                  ${data[i].description}
                                </p>
                            </div>
                            <div class="p-3 d-flex justify-content-between align-items-center">
                                <div class="">`;

        for (let j = 0; j < data[i].amenities.length; j++) {
            form_hotel += `
              <p class="mx-1 btn btn-secondary" style="font-size: 14px">
                                        ${data[i].amenities[j]}
                                    </p>`
        }
        form_hotel += `</div>
            <ul class="list-group list-group-flush text-center">
                <li class="list-group-item card-price fw-bold rounded" style="width: auto">
                    8.7
                </li>
                <li class="list-group-item">2,801 reviews</li>
                <li class="list-group-item">
                    <button type="button" class="btn btn-primary">
          View more
        </button>
                </li>
            </ul>
        </div>
    </div>
    </div>
    </div>`

    }
    document.getElementById("list-hotel").innerHTML = form_hotel;

}

fetch(data_location + '/hotels?address_like=' + locations)
    .then(response => response.json())
    .then(data => {
        list_hotel(data);

        let quantityHotel = data.length;
        document.getElementById("quantity-hotel").innerHTML = locations + ' ' + quantityHotel + ' properties';

        //Filter star
        const radioStarHotel = document.getElementsByName("star-hotel");

        radioStarHotel.forEach(input => {
            input.addEventListener('click', function () {
                const selectedStar = this.value;
                const filteredData = data.filter(item => item.star == selectedStar);
                list_hotel(filteredData);
                nextRoomDetail();
            });
        });
        //properties
        const amenities_hotel = document.querySelectorAll('.amenities-hotel');

        function findAmenitites() {
            const amenitiesValues = [];
            amenities_hotel.forEach(checkbox => {
                if (checkbox.checked) {
                    amenitiesValues.push(checkbox.value);
                }
            });

            function amenities(hotel) {
                for (let i = 0; i < amenitiesValues.length; i++) {
                    if (!hotel.amenities.includes(amenitiesValues[i])) {
                        return false;
                    }
                }
                return true;
            }

            const foundHotels = [];
            for (let i = 0; i < data.length; i++) {
                if (amenities(data[i])) {
                    foundHotels.push(data[i]);
                }
            }
            list_hotel(foundHotels);
            nextRoomDetail();
            console.log("Các khách sạn có amenities bao gồm" + amenitiesValues)
            console.log(foundHotels);
        }
        amenities_hotel.forEach(checkbox => {
            checkbox.addEventListener('click', findAmenitites);
        });

        //SORT STAR
        console.log(data);
        document.getElementById('sort-star-hotel').addEventListener("click", function () {
            data.sort((a, b) => b.star - a.star);
            list_hotel(data);
            nextRoomDetail();
        })
        //SORT PRICE 
        //ascending
        document.getElementById('price-ascending').addEventListener("click", function () {
            function minRoomPrice(hotel) {
                let minPrice = data[0].rooms[0].price;
                for (let i = 0; i < hotel.rooms.length; i++) {
                    if (hotel.rooms[i].price < minPrice) {
                        minPrice = hotel.rooms[i].price;
                    }
                }
                console.log(minPrice);

                return minPrice;
            }
            data.sort((a, b) => minRoomPrice(a) - minRoomPrice(b));
            list_hotel(data);
            nextRoomDetail();
        })
        //decrease
        document.getElementById('price-decrease').addEventListener("click", function () {
            function maxRoomPrice(hotel) {
                let maxPrice = data[0].rooms[0].price;
                for (let i = 0; i < hotel.rooms.length; i++) {
                    if (hotel.rooms[i].price > maxPrice) {
                        maxPrice = hotel.rooms[i].price;
                    }
                }
                console.log(maxPrice);
                return maxPrice;
            }
            data.sort((a, b) => maxRoomPrice(b) - maxRoomPrice(a));
            list_hotel(data);
            nextRoomDetail();
        })


        //Next-room-detail
        function nextRoomDetail() {
            let id_hotel = document.getElementsByClassName("id-hotel");

            Array.from(id_hotel).forEach(function (element) {
                element.addEventListener("click", function () {
                    var value = element.getAttribute("value");
                    localStorage.setItem('id-hotel', JSON.stringify(value));
                    window.location = "http://127.0.0.1:5500/Room-Detail/";
                });
            });
        }
        nextRoomDetail();

        //Next-register
        function nextRegister() {
            let register = document.getElementsByClassName("register");

            Array.from(register).forEach(function (element) {
                element.addEventListener("click", function () {
                    window.location = "http://127.0.0.1:5500/Login-out/";
                });
            });
        }
        nextRegister();

    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
function generateRatings() {
  const ratings = document.querySelectorAll(".rating");

  ratings.forEach(function (rating) {
    const ratingValue = parseInt(rating.getAttribute("data-rating"));
    const stars = [];

    // Xóa các sao cũ nếu có
    rating.innerHTML = '';

    // Tạo các sao dựa trên ratingValue
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      if (i <= ratingValue) {
        star.innerHTML = "★"; // Có sao
      } else {
        star.innerHTML = "☆"; // Không có sao
      }
      rating.appendChild(star);
    }
  });
}
//MINH


function handleBackEvent() {
  window.location.reload();
};
window.addEventListener('popstate', handleBackEvent);
document.addEventListener('DOMContentLoaded', (event) => {
  if (performance.navigation.type === performance.navigation.TYPE_BACK_FORWARD) {
    handleBackEvent();
  }
});

function search_location() {
  window.location = "http://127.0.0.1:5500/list-room/";
}

let search_hotel = document.querySelector(".search-hotel");

search_hotel.addEventListener("change", function () {
  let location = search_hotel.value;
  localStorage.setItem("location", JSON.stringify(location));
});

let locations = JSON.parse(localStorage.getItem('location'));
//Set Location
search_hotel.querySelectorAll('option').forEach(function (option) {
  if (option.value === locations) {
    option.selected = true;
  }
});

// Reder List Room
function list_hotel(hotelFiltered) {
  let form_hotel = "";
  for (let i = 0; i < hotelFiltered.length; i++) {
    form_hotel += `
                        <div class="card mb-3 ms-0 id-hotel" value="${hotelFiltered[i].id}">
                        <div class="row p-3">
                            <div class="col-md-4">
                                <img src="${hotelFiltered[i].image[0]}" class="img-fluid rounded" alt="..." />
                            </div>
                            <div class="col-md-8 d-flex flex-column">
                                <div class="card-body">
                                    <h5 class="card-title d-flex align-items-center text-blue">
                                        ${hotelFiltered[i].name}
                                        <div class="rating ps-2" data-rating="${hotelFiltered[i].star}"></div>
                                    </h5>
                                    <p class="card-text">
                                      ${hotelFiltered[i].description}
                                    </p>
                                </div>
                                <div class="p-3 d-flex justify-content-between align-items-center">
                                    <div class="">`;

    for (let j = 0; j < hotelFiltered[i].amenities.length; j++) {
      form_hotel += `
                  <p class="mx-1 btn btn-secondary" style="font-size: 14px">
                                            ${hotelFiltered[i].amenities[j]}
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


//Next-room-detail
function nextRoomDetail() {
  let id_hotel = document.getElementsByClassName("id-hotel");

  Array.from(id_hotel).forEach(function (element) {
    element.addEventListener("click", function () {
      var value = element.getAttribute("value");
      localStorage.setItem("id-hotel", JSON.stringify(value));
      window.location = "http://127.0.0.1:5500/Room-Detail/";
    });
  });
}

//Next-register
function nextRegister() {
  let register = document.getElementsByClassName("register");

  Array.from(register).forEach(function (element) {
    element.addEventListener("click", function () {
      window.location = "http://127.0.0.1:5500/Login-out/";
    });
  });
}
//render Amenities
function renderAmenities(hotelAmenities) {
  let renderAmenitie = '';
  for (let i = 0; i < hotelAmenities.length; i++) {
    renderAmenitie += `<div class="form-check">
    <input class="form-check-input amenities-hotel" type="checkbox" value="${hotelAmenities[i]}" id="${hotelAmenities[i]}" />
    <label class="form-check-label d-flex d-flex justify-content-between" for="${hotelAmenities[i]}">
    ${hotelAmenities[i]}
      <span>23</span>
    </label>
  </div>`
  }
  document.getElementById('amenities-hotel').innerHTML = renderAmenitie;
};


let urlHotel = 'http://localhost:3000';

fetch(urlHotel + '/hotels')
  .then(response => response.json())
  .then(data => {
    //Get hotel with location
    const hotelFiltered = data.filter((hotel) => {
      return hotel.address.includes(locations);
    });


    list_hotel(hotelFiltered);
    //Check properties Hotel
    let quantityHotel = hotelFiltered.length;
    document.getElementById("quantity-hotel").innerHTML = locations + ' ' + quantityHotel + ' properties';

    //Filter star and properties

    let hotelAmenities = [...new Set(hotelFiltered.flatMap(hotel => hotel.amenities))];
    let localStorageStarAndAmenities = {
      star: 'All',
      amenities: []
    }

    function restoreFilters() {
      let starAndAmenities = JSON.parse(localStorage.getItem('starAndAmenities'));
      if (starAndAmenities) {
        // Khôi phục trạng thái radio button theo star
        if (starAndAmenities.star) {
          const radioStarHotel = document.getElementsByName("star-hotel");
          radioStarHotel.forEach((input) => {
            if (input.value == starAndAmenities.star) {
              input.checked = true;
            }
          });
        }

        // Khôi phục trạng thái checkbox theo amenities
        if (starAndAmenities.amenities) {
          const amenities_hotel = document.querySelectorAll(".amenities-hotel");
          amenities_hotel.forEach((checkbox) => {
            if (starAndAmenities.amenities.includes(checkbox.value)) {
              checkbox.checked = true;
            }
          });
        }
      }
    }

    window.addEventListener('load', () => {
      restoreFilters();
      filterHotels();
    });

    renderAmenities(hotelAmenities);

    function filterByAmenities(hotels) {
      const amenitiesValues = [];

      const amenities_hotel = document.querySelectorAll(".amenities-hotel");
      amenities_hotel.forEach((checkbox) => {
        if (checkbox.checked) {
          amenitiesValues.push(checkbox.value);
        }
      });
      localStorageStarAndAmenities.amenities = amenitiesValues;


      function hasAllAmenities(hotel) {
        for (let i = 0; i < amenitiesValues.length; i++) {
          if (!hotel.amenities.includes(amenitiesValues[i])) {
            return false;
          }
        }
        return true;
      }
      return hotels.filter(hasAllAmenities);
    }

    function filterByStar(hotels, selectedStar) {
      if (selectedStar == "all") {
        document.getElementById("filter-rating").innerText = "All";
        return hotels;
      } else {
        document.getElementById("filter-rating").innerText = selectedStar + " Star";
        return hotels.filter(item => item.star <= selectedStar);
      }
    }

    function filterHotels() {
      const selectedStar = document.querySelector('input[name="star-hotel"]:checked').value;
      const filteredByStar = filterByStar(hotelFiltered, selectedStar);
      const filteredByAmenities = filterByAmenities(filteredByStar);

      localStorageStarAndAmenities.star = selectedStar;
      localStorage.setItem("starAndAmenities", JSON.stringify(localStorageStarAndAmenities));
      starAndAmenities = JSON.parse(localStorage.getItem('starAndAmenities'));

      list_hotel(filteredByAmenities);
      generateRatings();
      limit = 999;
      loadHotel();
      nextRoomDetail();
    }

    // Listen to click events of amenities checkboxes
    document.querySelectorAll(".amenities-hotel").forEach((checkbox) => {
      checkbox.addEventListener("click", function () {
        filterHotels();
      });
    });

    // Listen to click events of star rating radio buttons
    const radioStarHotel = document.getElementsByName("star-hotel");
    radioStarHotel.forEach((input) => {
      input.addEventListener("click", function () {
        filterHotels();
      });
    });


    //SORT STAR
    let popup_sort = document.querySelector(".popup-sort");
    document.getElementById('sort-star-hotel').addEventListener("click", function () {
      popup_sort.classList.add("show-popup-sort");
      popup_sort.innerHTML = `<i class="bi bi-sort-down"></i>Start
      <button id="remove-sort"><i class="bi bi-x-lg"></i></button>`;
      hotelFiltered.sort((a, b) => b.star - a.star);
      list_hotel(hotelFiltered);
      generateRatings();
      nextRoomDetail();
      limit = 999;
      loadHotel();
    })
    //SORT PRICE 
    //ascending
    document.getElementById('price-ascending').addEventListener("click", function () {
      popup_sort.classList.add("show-popup-sort");
      popup_sort.innerHTML = `<i class="bi bi-sort-down"></i> Ascending
            <button id="remove-sort"><i class="bi bi-x-lg"></i></button>`;

      function minRoomPrice(hotel) {
        let minPrice = hotelFiltered[0].rooms[0].price;
        for (let i = 0; i < hotel.rooms.length; i++) {
          if (hotel.rooms[i].price < minPrice) {
            minPrice = hotel.rooms[i].price;
          }
          console.log(minPrice);

          return minPrice;
        }
      }
      generateRatings();
      limit = 999;
      loadHotel();
      hotelFiltered.sort((a, b) => minRoomPrice(a) - minRoomPrice(b));
      list_hotel(hotelFiltered);
      nextRoomDetail();
    });
    //decrease
    document.getElementById('price-decrease').addEventListener("click", function () {
      popup_sort.classList.add("show-popup-sort");
      popup_sort.innerHTML = `<i class="bi bi-sort-up"></i> Decrease
            <button id="remove-sort"><i class="bi bi-x-lg"></i></button>`;

      function maxRoomPrice(hotel) {
        let maxPrice = hotelFiltered[0].rooms[0].price;
        for (let i = 0; i < hotel.rooms.length; i++) {
          if (hotel.rooms[i].price > maxPrice) {
            maxPrice = hotel.rooms[i].price;
          }
          console.log(maxPrice);
          return maxPrice;
        }
        console.log(maxPrice);
        return maxPrice;
      }
      generateRatings();
      limit = 999;
      hotelFiltered.sort((a, b) => maxRoomPrice(b) - maxRoomPrice(a));
      list_hotel(hotelFiltered);
      nextRoomDetail();
      loadHotel();

    })
    //Remove popup 
    document.getElementById('remove-sort').addEventListener("click", function () {
      location.reload();
    })



    //Pagination
    let thisPage = 1;
    let limit = 2;
    let listHotel = document.querySelectorAll('.id-hotel');


    function loadHotel() {
      let beginGetHotel = limit * (thisPage - 1);
      let endGetHotel = limit * thisPage - 1;

      listHotel.forEach((item, key) => {
        item.classList.remove("d-none")
        item.classList.remove("d-block")
        if (key >= beginGetHotel && key <= endGetHotel) {
          item.classList.add("d-block")
        } else {
          item.classList.add("d-none")
        }
      });
      listHotel = document.querySelectorAll('.id-hotel');

      nextRoomDetail()
      listPageHotel();
      list_hotel();
    };

    function listPageHotel() {
      let count = Math.ceil(listHotel.length / limit);
      let paginationElement = document.getElementById("pagination-page");
      paginationElement.innerText = '';

      paginationElement.classList.remove("style-hidden-pagination");
      hiddenPagination = document.querySelectorAll(".id-hotel");
      if (hiddenPagination.length == 0) {
        paginationElement.classList.add("style-hidden-pagination");
        paginationElement.innerText = 'Hẻm Còn Gì! Ahihi';
        return;
      }

      for (let i = 1; i <= count; i++) {
        let newPage = document.createElement('a');
        newPage.classList.add('ms-2');
        newPage.href = "#";
        newPage.innerHTML = `<li>${i}</li>`;
        newPage.classList.add('page-link');

        if (i === thisPage) {
          newPage.classList.add('is-active');
        }

        newPage.addEventListener("click", function (e) {
          e.preventDefault();
          changePage(i);
        });

        paginationElement.appendChild(newPage);
      }
    };

    function changePage(i) {
      thisPage = i;
      loadHotel();
    };


    generateRatings();
    loadHotel();
    filterHotels();
    nextRoomDetail();
    nextRegister();
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

//start code Văn
const inputs = document.querySelectorAll(".non-negative-input");

// Duyệt qua từng ô input và thêm sự kiện input
inputs.forEach((input) => {
  input.addEventListener("input", function () {
    // Kiểm tra nếu giá trị nhập vào là số âm
    if (this.value < 0) {
      this.value = 0; // Thay thế bằng 0
    }
    let a = [];

    inputs.forEach((input) => {
      a.push(input.value);
    });

    // Hiển thị giá trị của biến test
    document.getElementById("Adults_children_room").innerHTML = `${a[0]} Adults ${a[1]} Children ${a[2]} Room`;
    let Adults_children = {
      Adults: a[0],
      Children: a[1],
      Room: a[2]
    };
    localStorage.setItem("Adults_children", JSON.stringify(Adults_children));
  });
});
(function Set_Adults_children_Time() {
  let Adults_children = JSON.parse(localStorage.getItem("Adults_children"));
  document.getElementById("Adults_children_room").innerHTML = `${Adults_children.Adults} Adults ${Adults_children.Children} Children ${Adults_children.Room} Room`;
})();
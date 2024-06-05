document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-btn]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var category = btn.getAttribute("data-btn");

            // Loại bỏ lớp 'active-quick' từ tất cả các button
            document.querySelectorAll("[data-btn]").forEach(function (btn) {
                btn.classList.remove("active-quick");
            });
            // Thêm lớp 'active-quick' cho button được click
            btn.classList.add("active-quick");

            // Gọi hàm để hiển thị danh mục tương ứng
            showCategory(category);
        });
    });
});

function showCategory(category) {
    // Ẩn tất cả các carousel-item
    document.querySelectorAll(".id-category").forEach(function (item) {
        item.style.display = "none";
    });
    // Hiển thị carousel-item tương ứng với category được chọn
    document.querySelectorAll(`[data-ci="${category}"]`).forEach(function (item) {
        item.style.display = "block";
    });
}

$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 0,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
        },
        768: {
            items: 2,
        },
        1100: {
            items: 3,
        },
        1400: {
            items: 4,
            loop: false,
        }
    }
});
let abc = document.getElementsByClassName("abc");
console.log(abc);
//MINH
let search_hotel = document.querySelector('.search-hotel');

search_hotel.addEventListener('change', function () {
    let location = search_hotel.value;
    localStorage.setItem('location', JSON.stringify(location));
});

function search_location() {
    window.location = "http://127.0.0.1:5500/list-room/";
}

//Next List-room
let elements = document.getElementsByClassName("search-location-hotel");
Array.from(elements).forEach(function (element) {
    element.addEventListener("click", function () {
        var value = element.getAttribute("value");
        localStorage.setItem('location', JSON.stringify(value));
        window.location = "http://127.0.0.1:5500/list-room/";
    });
});

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

const clickCounts = {};

const searchLocations = document.querySelectorAll('.search-location-hotel');
searchLocations.forEach(location => {
    location.addEventListener('click', function () {
        const value = location.getAttribute('value');
        clickCounts[value] = (clickCounts[value] || 0) + 1;
        localStorage.setItem('LocationsClick', JSON.stringify(clickCounts));

        console.log(clickCounts);

    });
});

let data_location = 'http://localhost:3000';

fetch(data_location + '/hotels')
    .then(response => response.json())
    .then(data => {})
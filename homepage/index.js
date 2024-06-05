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

function handleBackEvent() {
  window.location.reload();
}
window.addEventListener('popstate', handleBackEvent);

document.addEventListener('DOMContentLoaded', (event) => {
  if (performance.navigation.type === performance.navigation.TYPE_BACK_FORWARD) {
    handleBackEvent();
  }
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

//MINH
let search_hotel = document.querySelector('.search-hotel');

search_hotel.addEventListener('change', function () {
  let location = search_hotel.value;
  localStorage.setItem('location', JSON.stringify(location));
});


//Không hiểu vì sao k áp được sự kiện onlick trong html
// function search_location() {
//   window.location = "http://127.0.0.1:5500/list-room/";
//   console.log("Oke");
// }
//Đoạn dưới này dùng đỡ cho đoạn trên
let abc = document.getElementsByClassName("abc");
Array.from(abc).forEach(function (element) {
  element.addEventListener("click", function () {
    window.location = "http://127.0.0.1:5500/list-room/";
  });
});


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

let locations = JSON.parse(localStorage.getItem('location'));
console.log(locations);
//Set Location
search_hotel.querySelectorAll('option').forEach(function (option) {
  if (option.value === locations) {
    option.selected = true;
  }
});
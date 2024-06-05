function handleBackEvent() {
  window.location.reload();
}
window.addEventListener('popstate', handleBackEvent);

document.addEventListener('DOMContentLoaded', (event) => {
  if (performance.navigation.type === performance.navigation.TYPE_BACK_FORWARD) {
    handleBackEvent();
  }
});

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

// Gọi hàm ngay sau khi khai báo các phần tử HTML cần thiết

function setRating() {
  let rating = document.querySelector(".rating");
  rating.setAttribute("data-rating", star.toString());
}

(function abc() {
  let title_hotel, name, address;
  let amenities = " ";
  let image = " ";
  let price = " ";
  
  let hotel_id = JSON.parse(localStorage.getItem("id-hotel"));

  fetch("http://localhost:3000/hotels")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((hotel) => {
        if (hotel && hotel.id && hotel.id === hotel_id) {
          title_hotel = hotel.description;
          document.getElementById("title_hotel").innerHTML = title_hotel;
          price += `<option selected>Room</option>`;
          for (let i = 1; i <= 3; i++) {
            price += `<option value="">
            <span> ${i} </span>
            <span>(USD ${hotel.rooms[0].price * i * 0.000039}$) </span>`;
          }
          document.getElementById("price").innerHTML = price;
          for (let i = 0; i < hotel.amenities.length; i++) {
            amenities += `
              <div class="col border rounded m-2">
                <p class="p-3 m-0" style="text-align: center;">${hotel.amenities[i]}</p>
              </div>`;
          }
          // Nối chuỗi HTML vào thuộc tính innerHTML của phần tử
          document.getElementById("amenities").innerHTML = amenities;
          for (let j = 0; j < hotel.image.length; j++) {
            image += `
          <div class="card" style="width: 25rem">
              <div class="image-wrapper-browse">
                <img id="image_1"
                  src="${hotel.image[j]}"
                  alt="..." />
              </div>
            </div>`;
          }
          document.getElementById("image").innerHTML = image;
          address = hotel.address;
          name = hotel.name;
          star = hotel.star;
        }
      });
      document.getElementById("name").innerHTML = name;
      document.getElementById("address").innerHTML = address;
      setRating();
      //Minh bổ sung
      generateRatings();
    })
    .catch((error) => {
      // Xử lý lỗi nếu có
      console.error("Có vấn đề xảy ra trong quá trình yêu cầu:", error);
    });
})();

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
const inputs2 = document.querySelectorAll(".date");
inputs2.forEach((input) => {
  input.addEventListener("input", function () {
    const inputDate = document.getElementById("date");
    const date = inputDate.value;
    console.log(date);
  });
});

function Booking() {
  // Parse stored data from local storage
  let hotel_id_demo2 = JSON.parse(localStorage.getItem("Adults_children"));

  if (hotel_id_demo2 == null) {
    alert("Bạn chưa chọn số lượng");
    return;
  }

  window.location = "http://127.0.0.1:5500/Confirm-Booking/index.html";
}

let search_hotel = document.querySelector(".search-hotel");

let locations = JSON.parse(localStorage.getItem('location'));
console.log(locations);
//Set Location
search_hotel.querySelectorAll('option').forEach(function (option) {
  if (option.value === locations) {
    option.selected = true;
  }
});

function search_location() {
  window.location = "http://127.0.0.1:5500/list-room/";
}




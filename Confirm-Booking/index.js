(function Booking() {
    let date = JSON.parse(localStorage.getItem("date_time"));
    let startDate = new Date(date.year_start + 2000, date.month_start - 1, date.day_start);
    let endDate = new Date(date.year_end + 2000, date.month_end - 1, date.day_end);
    let oneDay = 24 * 60 * 60 * 1000; // Số mili giây trong một ngày
    let totalDaysSelected = Math.round(Math.abs((endDate - startDate) / oneDay));

    document.getElementById("Total_length_of_stays").innerHTML = totalDaysSelected + " nights";

    //Minh comment
    //   let hotel_id = JSON.parse(localStorage.getItem("Name_Anh_Minh_Set"));
    //end
    // Lấy dữ liệu từ localStorage
    let Adults_children = JSON.parse(localStorage.getItem("Adults_children"));

    if (!date) {
        const today = new Date();
        date = {
            day_start: today.getDate(),
            month_start: today.getMonth() + 1,
            year_start: today.getFullYear(),
            day_end: today.getDate(),
            month_end: today.getMonth() + 1,
            year_end: today.getFullYear()
        };
        console.log(date);
    }

    // Kiểm tra và thiết lập dữ liệu Adults_children mặc định nếu không tồn tại
    if (!Adults_children) {
        Adults_children = {
            Adults: 1,
            Children: 0
        };
    }

    // Minh fix: Lấy dữ liệu id-hotel từ localStorage
    let hotel_id1 = JSON.parse(localStorage.getItem("id-hotel"));

    // Hiển thị dữ liệu trên giao diện
    document.getElementById("date_start").innerHTML = date.day_start + "-" + date.month_start + "-" + date.year_start;
    document.getElementById("date_end").innerHTML = date.day_end + "-" + date.month_end + "-" + date.year_end;
    document.getElementById("Adults_children").innerHTML = Adults_children.Adults + " Adults & " + Adults_children.Children + " Children";

    fetch("http://localhost:3000/hotels")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((hotel) => {
                if (hotel && hotel.id && hotel.id === hotel_id1) {
                    document.getElementById("name_hotel").innerHTML = hotel.name;
                    document.getElementById("address").innerHTML = hotel.address;
                    document.getElementById("price").innerHTML = "$" + parseInt(hotel.rooms[0].price * 0.000039) + ".00";
                }
            });
        });
})();
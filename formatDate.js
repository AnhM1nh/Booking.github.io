if (localStorage.getItem('date_time')) {
    let date_time = JSON.parse(localStorage.getItem('date_time'));
    let set_date = date_time.month_start + " / " + date_time.day_start + " / " + date_time.year_start + " - " +
        date_time.month_end + " / " + date_time.day_end + " / " + date_time.year_end;
    document.getElementById("date-time").setAttribute('value', set_date);
} else {
    let date = new Date();
    // localStorage.setItem("date_time", JSON.stringify(Adults_children))
    let set_date = (date.getMonth() + 1) + " / " + date.getDate() + " / " + date.getFullYear() + " - " + (date
        .getMonth() + 1) + " / " + (date
        .getDate() + 1) + " / " + date.getFullYear();
    document.getElementById("date-time").setAttribute('value', set_date);
};

function handleFormatDate() { // handleFormatMutipleDate
    var dateRangeInput = document.getElementById('date-time').value;
    var dateParts = dateRangeInput.split(" - ");

    const startDate = formatDate(dateParts[0])
    const endDate = formatDate(dateParts[1])
    document.getElementById('date-time').value = startDate + " - " + endDate;;
}

function formatDate(data) {
    var startDateParts = data.split("/");
    var formattedStartDate = startDateParts[1] + "/" + startDateParts[0] + "/" + startDateParts[2];
    return formattedStartDate;
};
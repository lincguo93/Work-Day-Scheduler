var Day = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        meridiem: "pm",
        reminder: ""
    },
    
]

function getDate() {
    var currentDate = moment().format('dddd,MMMM Do');
    $("#currentDay").text(currentDate);
}

getDate();

function save() {
    localStorage.setItem("Day", JSON.stringify(Day));
}

function displaySave(){
    Day.forEach(function(_thisHour){
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

function init() {
    var savedDay = JSON.parse(localStorage.getItem("Day"));
    if (savedDay) {
        Day = savedDay;
    }

    save();
    displaySave();
}

Day.forEach(function(thisHour){
    var hourRow = $("<form>").attr({"class": "row"});

    $(".container").append(hourRow);

    var hourField = $("<div>").text(`${thisHour.hour}${thisHour.meridiem}`).attr({"class": "col-md-2 hour"});

    var hourPlan = $("<div>").attr({"class": "col-md-9 description p-0"});

    var planInfo = $("<textarea>");
    hourPlan.append(planInfo);
    
    // var planInfo = $("<textarea>");
    // hourPlan.append(planInfo);
    planInfo.attr("id", thisHour.id);

    if (thisHour.time < moment().format("HH")){
        planInfo.attr({"class": "past"})

    }else if (thisHour.time === moment().format("HH")){
        planInfo.attr({"class": "present"})
    
    }else if (thisHour.time > moment().format("HH")){
        planInfo.attr({"class": "future"})
    }

    var saveButton = $("<i class= 'far fa-save fa-lg'></i>");
    var saveInfo = $("<button>").attr({"class": "col-md-1 saveBtn"});

    saveInfo.append(saveButton);
    hourRow.append(hourField, hourPlan, saveInfo);

})

init();

$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    Day[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIdex);
    save();
    displaySave();
})

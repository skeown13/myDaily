let currentDay = dayjs().format("MMMM DD, YYYY")

$("#currentTime").text(currentDay)

function hourUpdater() {
  let currentTime = dayjs().hour()
  
  // Technically makes it so that nothing can be saved to local storage during the midnight hour, but most people are asleep at that time and it can be worked on later
  if (currentTime === 00) {
    $(".time").each(function() {
      let key = $(this).text()
      localStorage.removeItem(key)
    })
  }

  // Change the Jumbotron/Hero Image depending on the time of day it is
  if (currentTime >= "05" && currentTime < "10") {
    // morning time
    $(".jumbotron").toggleClass("day evening", false).toggleClass("morning", true)
    $(".time").toggleClass("timeDay timeEvening", false).toggleClass("timeMorning", true)
    $(".saveBtn").toggleClass("saveBtnDay saveBtnEvening", false).toggleClass("saveBtnMorning", true)
  } else if (currentTime >= "10" && currentTime < "18") {
    // day time
    $(".jumbotron").toggleClass("morning evening", false).toggleClass("day", true)
    $(".time").toggleClass("timeMorning timeEvening", false).toggleClass("timeDay", true)
    $(".saveBtn").toggleClass("saveBtnMorning saveBtnEvening", false).toggleClass("saveBtnDay", true)
  } else {
    // night time
    $(".jumbotron").toggleClass("morning day", false).toggleClass("evening", true)
    $(".time").toggleClass("timeMorning timeDay", false).toggleClass("timeEvening", true)
    $(".saveBtn").toggleClass("saveBtnMorning saveBtnDay", false).toggleClass("saveBtnEvening", true)
  }

  $(".todo").each(function() {
    let hour = parseInt($(this).attr("id").slice(4, 6))
    
    if (currentTime > hour) {
      ($(this).toggleClass("present future", false).toggleClass("past", true))
    } else if (currentTime === hour) {
      ($(this).toggleClass("past future", false).toggleClass("present", true))
    } else {
      ($(this).toggleClass("past present", false).toggleClass("future", true))
    }
  })
}

let interval = setInterval(hourUpdater, 15000)

hourUpdater()

let saveBtn = function(event) {
  event.preventDefault()
  let key = $(this).siblings(".time").text()
  let value = $(this).siblings(".todo").val()
  localStorage.setItem(key, value)
}

let loadPage = function () {
  $("#hour0700").val(localStorage.getItem("0700"))
  $("#hour0800").val(localStorage.getItem("0800"))
  $("#hour0900").val(localStorage.getItem("0900"))
  $("#hour1000").val(localStorage.getItem("1000"))
  $("#hour1100").val(localStorage.getItem("1100"))
  $("#hour1200").val(localStorage.getItem("1200"))
  $("#hour1300").val(localStorage.getItem("1300"))
  $("#hour1400").val(localStorage.getItem("1400"))
  $("#hour1500").val(localStorage.getItem("1500"))
  $("#hour1600").val(localStorage.getItem("1600"))
  $("#hour1700").val(localStorage.getItem("1700"))
  $("#hour1800").val(localStorage.getItem("1800"))
  $("#hour1900").val(localStorage.getItem("1900"))
  $("#hour2000").val(localStorage.getItem("2000"))
  $("#hour2100").val(localStorage.getItem("2100"))
}

$(document).ready(loadPage)

$(".saveBtn").click(saveBtn)

let linedBtn = function(event) {
  event.preventDefault()
  $("body").removeClass("kindergarten").addClass("lined")
}

let kindergartenBtn = function(event) {
  event.preventDefault()
  $("body").removeClass("lined").addClass("kindergarten")
}

$("#lined").click(linedBtn)
$("#kindergarten").click(kindergartenBtn)

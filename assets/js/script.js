let dateHolder = dayjs().$D

function hourUpdater() {
  let currentDay = dayjs().format("MMMM DD, YYYY")
  let updatedCurrentDay = dayjs().$D
  let currentTime = dayjs().hour()
  $("#currentTime").text(currentDay)

  // if the start of the day matches that it is the start of the day then clear the local storage as relates to the text inputs
  if (updatedCurrentDay > dateHolder) {
    $(".time").each(function() {
      let key = $(this).text()
      localStorage.removeItem(key)
    })
    dateHolder = updatedCurrentDay
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
  if (localStorage.getItem("lined") === "true") {
    $("body").removeClass("kindergarten graph").addClass("lined")
  } else if (localStorage.getItem("kindergarten") === "true") {
    $("body").removeClass("lined graph").addClass("kindergarten")
  } else {
    $("body").removeClass("lined kindergarten").addClass("graph")
  }
  
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
  $("body").removeClass("kindergarten graph").addClass("lined")
  localStorage.removeItem("kindergarten")
  localStorage.removeItem("graph")
  localStorage.setItem("lined", true)
}

let kindergartenBtn = function(event) {
  event.preventDefault()
  $("body").removeClass("lined graph").addClass("kindergarten")
  localStorage.removeItem("lined")
  localStorage.removeItem("graph")
  localStorage.setItem("kindergarten", true)
}

let graphBtn = function(event) {
  event.preventDefault()
  $("body").removeClass("lined kindergarten").addClass("graph")
  localStorage.removeItem("lined")
  localStorage.removeItem("kindergarten")
  localStorage.setItem("graph", true)
}

$("#lined").click(linedBtn)
$("#kindergarten").click(kindergartenBtn)
$("#graph").click(graphBtn)

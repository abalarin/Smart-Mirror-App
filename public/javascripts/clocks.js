function showWeather(){
  Number.prototype.toFixedDown = function(digits) {
      var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
          m = this.toString().match(re);
      return m ? parseFloat(m[1]) : this.valueOf();
  };

  $.post( "http://api.openweathermap.org/data/2.5/weather?lat=41.06&lon=-74.14&appid=ecc85481de66f8c9680322d39a0ce658", function(data) {

    var tempFah = 9/5 * (data.main.temp - 273) + 32;
    var high = 9/5 * (data.main.temp_max - 273) + 32;
    var low = 9/5 * (data.main.temp_min - 273) + 32;

    document.getElementById("location").innerText = data.name + " "+ tempFah.toFixedDown(1) + "°F";
    document.getElementById("highlow").innerText = low.toFixedDown(1) + "°F - " + high.toFixedDown(1) + "°F";

    var sunset = new Date(data.sys.sunset*1000).getHours();
    var sunrise = new Date(data.sys.sunrise*1000).getHours();
    var currentTime = new Date().getHours();

    if(sunset > currentTime)
      document.getElementById("timeImg").src="../images/sun.png";
    else if(currentTime > sunrise )
      document.getElementById("timeImg").src="../images/moonWhite.png";
    // Will display time in 10:30:23 format
    //var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    console.log(data);
  });
}


function getTime(date){
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var timePeriod = "AM";

    if(h == 0){
    	h = 12;
    }
    if(h > 12){
    	h = h - 12;
    	timePeriod = "PM";
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    return {'h':h, 'm':m, 's':s, 'tp': timePeriod}
}
function getTimePeriod(){
  var date = new Date();

}
function getMonth(date){
  var month = date.getMonth();

  if(month == 0)
    month = "January";
  else if(month == 1)
    month = "Febuary";
  else if(month == 2)
    month = "March";
  else if(month == 3)
    month = "April";
  else if(month == 4)
    month = "May";
  else if(month == 5)
    month = "June";
  else if(month == 6)
    month = "July";
  else if(month == 7)
    month = "August";
  else if(month == 8)
    month = "September";
  else if(month == 9)
    month = "October";
  else if(month == 10)
    month = "November";
  else if(month == 11)
    month = "December";

  return month;
}

function getDay(date){
  var day = date.getDay()

  if(day == 1)
    day = "Monday";
  else if (day == 2)
    day = "Tuesday";
  else if (day == 3)
    day = "Wednesday";
  else if (day == 4)
    day = "Thursday";
  else if (day == 5)
    day = "Friday";
  else if (day == 6)
    day = "Saturday";
  else if (day == 7)
    day = "Sunday";

  return day;
}

function showTime(){
  var date = new Date();
  var time = getTime(date);

  document.getElementById("MyClockDisplay").innerText = time.h + ":" + time.m;
  document.getElementById("timePeriod").innerText = time.tp;
  document.getElementById("seconds").innerText = time.s;


  document.getElementById("day").innerText = getDay(date) + " - " + getMonth(date) + " " + date.getDate();

  showWeather();
  setTimeout(showTime, 1000);
}

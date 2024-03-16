/*
Saik Jalal
saj325@lehigh.edu
CSE264
Programming Assignment #3
*/

const express = require("express");
const path = require("path");
//const sprintf = require("sprintf-js").sprintf;
//that isn't used

const app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(
  path.resolve(__dirname, "public")
));

let month = 0;
let year = 0;
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function genCalendar(month, year, req, res) {


  // If your feeling clever, come up with a more streamlined way to write this function
  function calcLastDayOfMonth(month) {
    let lastDay = 0;
    if (month === 4 || month === 6 || month === 9 || month === 11)
      lastDay = 30;
    else if (month !== 2)
      lastDay = 31;
    else if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0))
      lastDay = 29;
    else
      lastDay = 28;
    return lastDay;
  }

  //above is code given to us that takes into account the days each month has.

  function istoday(m, d, y) {
    const today = new Date();
    return m == today.getMonth() + 1 && y == today.getFullYear() && d == today.getDate();
  }

  //function to check if the day is today

  const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let monthName = monthNames[month]
  /* Code to create calendar rows and cells goes here */
  //var numDays = []; //array for num days in each month
  var sumOfDays = []; //array to hold the days 
  /*
  for (let i = 1; i <= monthNames.length; i++) { //iterate through each month
    numDays[i] = calcLastDayOfMonth(i); //this gives the number of days in the given month
    sumOfDays[i] = []; //the total number of days (changes by month)
    for (let j = 1; j <= numDays[i]; j++) {
      sumOfDays[i][j] = j; //populate each month
    }
  }
  */

  // Loop through each month
for (let i = 1; i <= 12; i++) {
  // get the number of days for the respective month
  const daysInMonth = calcLastDayOfMonth(i);

  // Populate the days
  sumOfDays[i] = [];

  // populate the array with days
  for (let j = 1; j <= daysInMonth; j++) {
      sumOfDays[i].push(j);
      //Source for push: https://www.w3schools.com/jsref/jsref_push.asp
  }
}

  /*
  const sumOfDays = []; //this will hold all of the days of each month

  // Loop through each month and populate
  for (let i = 1; i <= 12; i++) {
    const daysInMonth = calcLastDayOfMonth(i); //as provided to us by Prof's code
    const holdDays = []; //this array will hold the number of days
    for (let j = 1; j <= daysInMonth; j++) {
      holdDays.push(j);
    }
    sumOfDays.push(daysArray); //push the days into the array. This means just add to the end of the array till the condition is met
    //Source for push: https://www.w3schools.com/jsref/jsref_push.asp


  }
  */


  //these cannot be a constant
  var today = new Date().getDate();
  var thcurrentMonth = new Date().getMonth() + 1;
  var thcurrentYear = new Date().getFullYear();

  var starting = new Date(year, month - 1, 1).getDay() + 1;
  let count = 1;

  //calendar object does not need to be created although I did create one. 

  //Might see a calendar object being called in the index.ejs, but that is before the change.
  /*
  res.render("index", {
    weekDays: weekDays,
    date: {
      month: monthNames[month],
      year: year
    },
    monthNum: month,
    months: monthNames,
    days: sumOfDays,
    starting: starting,
    count: count,
    today: today,
    thcurrentMonth: thcurrentMonth,
    thcurrentYear: thcurrentYear,
  });
  */
  
  //create calendar object
  var calendar = {
    monthNum : month,
    months : monthNames,
    days : sumOfDays,
    starting : starting
  }
  
  res.render("index", {
    weekDays : weekDays,
    date : {
      month : monthName,
      year : year
    },
    calendar : calendar,
    count: count,
    today: today,
    thcurrentMonth : thcurrentMonth,
    thcurrentYear : thcurrentYear,
  });
}

app.get("/calendar", function (req, res) {
  if (req.query.month && req.query.year) {
    month = parseInt(req.query.month);
    year = parseInt(req.query.year);
  } else {
    let today = new Date();
    month = today.getMonth() + 1;
    year = today.getFullYear();
  }
  genCalendar(month, year, req, res);
});

app.get("/backmonth", function (req, res) {
  // Assign new month and year and call genCalendar
  if (month <= 1) {
    month = 12;
    year--;
  } else {
    month--;
  }
  genCalendar(month, year, req, res)
});

app.get("/forwardmonth", function (req, res) {
  // Assign new month and year and call genCalendar
  if (month <= 12) {
    month = 1;
    year++;
  } else {
    month++;
  }
  genCalendar(month, year, req, res);
});

app.get("/backyear", function (req, res) {
  // Assign new month and year and call genCalendar
  year--;
  genCalendar(month, year, req, res)

});

app.get("/forwardyear", function (req, res) {
  // Assign new month and year and call genCalendar
  year++;
  genCalendar(month, year, req, res)

});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
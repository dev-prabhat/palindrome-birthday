//1- Check the input date is palindrome or not

function reverseStr(Str) {
    var charList = Str.split("")
    var reverseList = charList.reverse()
    reverseList = reverseList.join('')
    return reverseList
}


function isPalindrome(Str) {
    var reverse = reverseStr(Str)
    return Str === reverse
}


function dateToString(date) {
    var dateInStr = { day: "", month: "", year: "" }

    date.day < 10 ? dateInStr.day = "0" + date.day : dateInStr.day = date.day.toString()

    date.month < 10 ? dateInStr.month = "0" + date.month : dateInStr.month = date.month.toString()

    dateInStr.year = date.year.toString()
    return dateInStr
}


function dateInAllFormat(date) {
    var dateStr = dateToString(date)

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yyddmm = dateStr.year.slice(-2) + dateStr.day + dateStr.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}


function checkPalindromeForAllDateFormat(date) {
    var listOfPalindromes = dateInAllFormat(date)

    var flag = false;

    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            flag = true
            break;
        }
    }
    return flag;
}

//2- Now if input date is not palindrome then calculate next palindrome date and also calculate how many days it arrive 

function isLeapYear(year) {
    if (year % 400 === 0)
        return true

    if (year % 100 === 0)
        return false

    if (year % 4 === 0)
        return true
    else false
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        }
        else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    }
    else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++
    }

    return { day, month, year }
}

function getNextPalindromeDate(date) {

    var nextDate = getNextDate(date);
    var counter = 0;

    while (1) {
        counter++;
        var isPalindrome = checkPalindromeForAllDateFormat(nextDate)
        if (isPalindrome) break;

        nextDate = getNextDate(nextDate)
    }
    return [counter, nextDate]
}

//3- Take input date from UI and calculate the palindrome


var bdayInput = document.querySelector("#bday-input")
var checkButton = document.querySelector("#check-button")
var resultOutput = document.querySelector('#output-result')

function clickHandler() {
    var bdayStr = bdayInput.value
    if (bdayStr !== " ") {
        var listOfDate = bdayStr.split("-")
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        }


        var IsPalindorme = checkPalindromeForAllDateFormat(date)

        if (IsPalindorme) {
            resultOutput.innerText = "Yay!! Your Birthday is Palindrome"
        } else {
            var [counter, nextDate] = getNextPalindromeDate(date)
            var { day, month, year } = nextDate;
            var nextPalindromeDate = `${day}-${month}-${year}`
            resultOutput.innerText = `Next Palindrome date is ${nextPalindromeDate} which is after ${counter} days`
        }

    }
}

checkButton.addEventListener("click", clickHandler)
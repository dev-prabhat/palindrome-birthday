//1- Check the input date is palindrome or not

const reverseStr = Str => Str.split("").reverse().join('')


const isPalindrome = Str => {
    let reverse = reverseStr(Str)
    return Str === reverse
}


const dateToString = date => {
    const dateInStr = { day: "", month: "", year: "" }

    date.day < 10 ? dateInStr.day = "0" + date.day : dateInStr.day = date.day.toString()

    date.month < 10 ? dateInStr.month = "0" + date.month : dateInStr.month = date.month.toString()

    dateInStr.year = date.year.toString()
    return dateInStr
}


const dateInAllFormat = date => {
    const dateStr = dateToString(date)

    const ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    const mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    const yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    const ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    const mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    const yyddmm = dateStr.year.slice(-2) + dateStr.day + dateStr.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}


const checkPalindromeForAllDateFormat = date => {
    const listOfPalindromes = dateInAllFormat(date)

    let flag = false;

    for (let i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            flag = true
            break;
        }
    }
    return flag;
}

//2- Now if input date is not palindrome then calculate next palindrome date and also calculate how many days it arrive 

const isLeapYear = year => {
    if (year % 400 === 0)
        return true

    if (year % 100 === 0)
        return false

    if (year % 4 === 0)
        return true
    else false
}

const getNextDate = date => {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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

const getNextPalindromeDate = date => {

    let nextDate = getNextDate(date);
    let counter = 0;

    while (1) {
        counter++;
        let isPalindrome = checkPalindromeForAllDateFormat(nextDate)
        if (isPalindrome) break;

        nextDate = getNextDate(nextDate)
    }
    return [counter, nextDate]
}

//3- Take input date from UI and calculate the palindrome


const bdayInput = document.querySelector("#bday-input")
const checkButton = document.querySelector("#check-button")
const resultOutput = document.querySelector('#output-result')

const clickHandler = () => {
    let bdayStr = bdayInput.value
    if (bdayStr !== " ") {
        const listOfDate = bdayStr.split("-")
        const date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        }


        let IsPalindorme = checkPalindromeForAllDateFormat(date)

        if (IsPalindorme) {
            resultOutput.innerText = "Yay!! Your Birthday is Palindrome"
        } else {
            const [counter, nextDate] = getNextPalindromeDate(date)
            const { day, month, year } = nextDate;
            const nextPalindromeDate = `${day}-${month}-${year}`
            resultOutput.innerText = `Next Palindrome date is ${nextPalindromeDate} which is after ${counter} days`
        }

    }
}

checkButton.addEventListener("click", clickHandler)
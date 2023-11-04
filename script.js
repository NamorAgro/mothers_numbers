const numbers = document.querySelectorAll('input')
console.log(numbers)
const output = document.getElementById('main_number_output')


let countOfChosenYears = []

const countButton = document.querySelector('.button')
countButton.addEventListener('click', () => {
    const checkNumbers = checkNumber0() && checkNumber1() && checkNumber2() && checkNumber3()
    if (checkNumbers) {
        const mainNumber = sumNumbers()
        output.innerText = mainNumber
        const rows = countRowsForTable()
        const tableout = makeTable(rows, mainNumber)
        yearsChoise(tableout, mainNumber)
    }
})

//Numbers check for inputs
function checkNumber0() {
    if (numbers[0].value < 32 && numbers[0].value >= 0) {
        const number0 = numbers[0].value
        if (number0.length != 2) {
            console.log('must be with 2 numbers')
        }
        else {
            return true
        }
    }
    else {
        console.log('no')
    }
}

function checkNumber1() {
    if (numbers[1].value < 13 && numbers[1].value >= 1) {
        const number0 = numbers[1].value
        if (number0.length != 2) {
            console.log('must be with 2 numbers')
        }
        else {
            return true
        }
    }
    else {
        console.log('no')
    }
}

function checkNumber2() {
    if (numbers[2].value < 2024 && numbers[2].value >= 1920) {
        const number0 = numbers[2].value
        if (number0.length != 4) {
            console.log('must be with 2 numbers')
        }
        else {
            return true
        }
    }
    else {
        console.log('no')
    }
}

function checkNumber3() {
    if (numbers[3].value < 91 && numbers[3].value >= 0) {
        const number0 = numbers[3].value
        if (number0.length < 1) {
            console.log('must be with 3 numbers')
        }
        else {
            return true
        }
    }
    else {
        console.log('no')
    }
}

function sumNumbers() {
    let sumNumber = ''
    for (let i = 0; i < 3; i++) {

        sumNumber += numbers[i].value.toString()
    }
    return sumNumber
}

/** 
 * Making table for numbers
 */

const tablePlace = document.getElementById('table_place')



function countRowsForTable() {
    const yearsToCount = numbers[3].value;
    let rowCount = 0;

    if (yearsToCount % 8 == 0) {
        return ([rowCount = yearsToCount / 8, 0]);
    }
    else {
        return ([Math.floor(rowCount = yearsToCount / 8), yearsToCount % 8]);

    }
}

function makeTable(rawsArray, mainNumber) {

    const oldTable = tablePlace.querySelector('table');
    if (oldTable) {
        tablePlace.removeChild(oldTable);
        if (myChart) {
            myChart.destroy(); // Destroy the existing chart instance
        }
        countOfChosenYears.length = 0
    }

    const table = document.createElement('table');

    rawNumber = rawsArray[0];
    numberToImport = 0;
    mainNumber = mainNumber.split('').map(Number)

    let yearsArray = []

    for (let i = 0; i < rawNumber * 2; i++) {
        const row = document.createElement('tr');
        if (i % 2 == 0) {
            for (let i = 0; i < 8; i++) {
                const cell = document.createElement('td');
                cell.classList.add('year__class')
                cell.textContent = numberToImport;
                yearsArray.push(cell)
                row.appendChild(cell);
                numberToImport += 1;
            }
        }
        else {
            for (let i = 0; i < 8; i++) {
                const cell = document.createElement('td');
                cell.textContent = mainNumber[i];
                cell.classList.add('value__class')
                row.appendChild(cell);
                if (mainNumber[i] == 9) {
                    mainNumber[i] = 0
                }
                else {
                    mainNumber[i] += 1
                }
            }
        }
        table.appendChild(row)
    };

    if (rawsArray[1] != 0) {
        for (let i = 0; i < 2; i++) {
            const row = document.createElement('tr');
            if (i % 2 == 0) {
                for (let i = 0; i < rawsArray[1]; i++) {
                    const cell = document.createElement('td');
                    cell.classList.add('year__class')
                    cell.textContent = numberToImport;
                    yearsArray.push(cell)
                    row.appendChild(cell);
                    numberToImport += 1;
                }
            }
            else {
                for (let i = 0; i < rawsArray[1]; i++) {
                    const cell = document.createElement('td');
                    cell.textContent = mainNumber[i];
                    cell.classList.add('value__class')
                    row.appendChild(cell);
                    if (mainNumber[i] == 9) {
                        mainNumber[i] = 0
                    }
                    else {
                        mainNumber[i] += 1
                    }
                }
            }
            console.log(row)
            table.appendChild(row)
        };
    };

    tablePlace.appendChild(table)
    return yearsArray
};



// function to choise array of numbers in table, for making a chart
function yearsChoise(yearArray, mainNumber) {
    yearArray.forEach((yearElement, index) => {
        yearElement.addEventListener('click', () => {
            setClickedYears(yearArray, yearElement, index, mainNumber)

        })
    })
}

function setClickedYears(yearArray, yearElement, index, mainNumber) {
    const staticLineSumNum = mainNumber.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    const countOfLinesNum = mainNumber.toString().length;


    const staticLineNum = parseFloat((staticLineSumNum / countOfLinesNum).toFixed(1));
    console.log(staticLineNum)

    if (countOfChosenYears.length < 1) {
        countOfChosenYears.push(index)
        yearElement.classList.add('clicked')
        console.log(countOfChosenYears)
    }
    else if (countOfChosenYears.length == 1) {
        if (countOfChosenYears.includes(index)) {
            console.log('same number')
            console.log(countOfChosenYears)
        }
        else {
            countOfChosenYears.push(index)
            yearElement.classList.add('clicked')
            console.log(countOfChosenYears)
            getNeededYears(yearArray)
            makeNewNumbers(staticLineNum)
        }
    }
    else {
        if (countOfChosenYears.includes(index)) {
            console.log('same number')
            console.log(countOfChosenYears)
        }
        else {
            checkWhatYearIsNear(yearArray, index)
            getNeededYears(yearArray)
            makeNewNumbers(staticLineNum)
        }
    }

}

function getNeededYears(yearArray) {
    let [smaller, bigger] = [Math.min(countOfChosenYears[0], countOfChosenYears[1]), Math.max(countOfChosenYears[0], countOfChosenYears[1])];
    for (let i = smaller; i < bigger + 1; i++) {
        yearArray[i].classList.add('clicked')
    }
}

function checkWhatYearIsNear(yearArray, index) {
    let [smaller, bigger] = [Math.min(countOfChosenYears[0], countOfChosenYears[1]), Math.max(countOfChosenYears[0], countOfChosenYears[1])];
    for (let i = smaller; i < bigger + 1; i++) {
        yearArray[i].classList.remove('clicked')
    }
    const closest = countOfChosenYears.reduce((prev, curr) =>
        Math.abs(curr - index) < Math.abs(prev - index) ? curr : prev
    )
    const closestIndex = countOfChosenYears.findIndex(num => num === closest);
    if (closestIndex !== -1) {
        countOfChosenYears[closestIndex] = index;
    }
}

/**
 * 
 *  ---------------------------------- Chart JS ---------------------------
 * 
 */

function makeNewNumbers(staticLineNum) {
    let number = []
    let value = []
    const valueClasses = document.querySelectorAll('.value__class')
    let [smaller, bigger] = [Math.min(countOfChosenYears[0], countOfChosenYears[1]), Math.max(countOfChosenYears[0], countOfChosenYears[1])];
    for (let i = smaller; i < bigger + 1; i++) {
        number.push(i)
        value.push(parseInt(valueClasses[i].textContent, 10));
    }
    const staticLineValue = staticLineNum;
    console.log(staticLineNum)
    let prevShow
    let nowShow

    let numberNew = []
    let valueNew = []

    for (let i = 0; i < value.length; i++) {
        if (i == 0) {
            if (value[i] > staticLineValue) {
                nowShow = 1
            }
            else if (value == staticLineValue) {
                nowShow = 2
            }
            else {
                nowShow = 0
            }
            numberNew.push(number[i])
            valueNew.push(value[i])
        }
        else {
            if (value[i] > staticLineValue) {
                nowShow = 1
            }
            else if (value == staticLineValue) {
                nowShow = 2
            }
            else {
                nowShow = 0
            }
            if (prevShow != nowShow) {
                let fPoint = {}
                let sPoint = {}
                fPoint.x = number[i - 1]
                fPoint.y = value[i - 1]
                sPoint.x = number[i]
                sPoint.y = value[i]
                const interPoint = findIntersection(fPoint, sPoint, staticLineValue)
                // console.log(interPoint)
                numberNew.push(interPoint.x)
                valueNew.push(interPoint.y)
                numberNew.push(number[i])
                valueNew.push(value[i])
            }
            else {
                numberNew.push(number[i])
                valueNew.push(value[i])
            }
        }
        prevShow = nowShow
    }

    const { aboveStaticLine, belowStaticLine } = generateData(valueNew, staticLineValue);
    makeChart(aboveStaticLine, belowStaticLine, numberNew, staticLineValue)
}

// in this function we separate data on what will be under static line and above.
// tha thing is that number what is on static line we push for both arrays 
function generateData(valueNew, staticLineValue) {
    const aboveStaticLine = [];
    const belowStaticLine = [];
    valueNew.forEach((v, i) => {
        if (v > staticLineValue) {
            aboveStaticLine.push(v);
            belowStaticLine.push(null);
        } else if (v < staticLineValue) {
            belowStaticLine.push(v);
            aboveStaticLine.push(null);
        } else {
            aboveStaticLine.push(v);
            belowStaticLine.push(v);
        }
    });
    return { aboveStaticLine, belowStaticLine };
}

// playing with numbers
// here we calculate the point were static line is crosed
function findIntersection(point1, point2, staticY) {
    const slope = (point2.y - point1.y) / (point2.x - point1.x);

    const yIntercept = point1.y - slope * point1.x;

    //now me must take search for a month in those crosed static line numbers
    // we have number till 10, but munth is 12.
    // so wee must take a % of those 12 months 
    const xIntersection = Math.round(((staticY - yIntercept) / slope) * 100) / 100;


    const decimalPartString = xIntersection.toFixed(2).split('.')[1];
    const ProcentForMonth = parseInt(decimalPartString, 10);
    // console.log(ProcentForMonth);
    
    //take procent of month and make a month, when is crosed line
    const monthIs = Math.ceil(12 / 100 * ProcentForMonth); 

    let monthPlusMonth = parseInt(numbers[1].value) + monthIs
    
    if(monthPlusMonth > 12){
        monthPlusMonth = monthPlusMonth - 12
    }


    // here we combinate the xIntersection number with month
    const integerPart = Math.floor(xIntersection).toString();
    const combinedNumber = parseFloat(integerPart + '.' + monthPlusMonth);

    if (combinedNumber >= Math.min(point1.x, point2.x) &&
        combinedNumber <= Math.max(point1.x, point2.x)) {
        return { x: combinedNumber, y: staticY };
    }

    return null;
}


/**
 * 
 *  ----- Chart drowing -----
 * 
 */

// make a chart that is null on the page loade
let myChart = null

// Rest of your Chart.js code
function makeChart(aboveStaticLine, belowStaticLine, numberNew, staticLineValue) {
    const ctx = document.getElementById('myChart');

    if (myChart) {
        myChart.destroy(); // Destroy the existing chart instance
    }

    // If the chart instance doesn't exist, create a new one
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: numberNew,
            datasets: [
                {
                    label: 'Выше числа судьбы',
                    data: aboveStaticLine,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: '+1', // fill to the next dataset (which will be our static line dataset)
                    backgroundColor: 'rgba(0, 255, 0, 0.5)' // light green
                },
                {
                    label: 'Число судьбы',
                    data: Array(numberNew.length).fill(staticLineValue),
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    fill: false // no fill for the static line itself
                },
                {
                    label: 'Ниже числа судьбы',
                    data: belowStaticLine,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: '-1', // fill to the previous dataset (which is our static line dataset)
                    backgroundColor: 'rgba(255, 0, 0, 0.5)' // light red
                }
            ]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true,
                }
            },
        }
    });
}
//Create a new branch off of gh-pages called loops-practice

//The goal:
// Create a clean pull request with completed questions
// Commit at least 4 times/person
// answer questions below

const latestExchangeRate = {
    "base": "USD",
    "date": "2018-02-13",
    "rates": {
        "AUD": 1.2742,
        "BGN": 1.5858,
        "BRL": 3.2954,
        "CAD": 1.2604,
        "CHF": 0.93424,
        "CNY": 6.3443,
        "CZK": 20.584,
        "DKK": 6.0397,
        "EUR": 0.81083,
        "GBP": 0.72111,
        "HKD": 7.8219,
        "HRK": 6.0291,
        "HUF": 253.11,
        "IDR": 13640,
        "ILS": 3.533,
        "INR": 64.277,
        "ISK": 101.68,
        "JPY": 107.69,
        "KRW": 1085.1,
        "MXN": 18.631,
        "MYR": 3.947,
        "NOK": 7.899,
        "NZD": 1.3736,
        "PHP": 52.124,
        "PLN": 3.3877,
        "RON": 3.7773,
        "RUB": 57.777,
        "SEK": 8.0587,
        "SGD": 1.3228,
        "THB": 31.51,
        "TRY": 3.8,
        "ZAR": 11.982
    },
    multiplyByTen: (num) => num * 10
}

//create a function that returns the base and date for and object. Use latestExchangeRate as an example to test your function
const getBaseAndDate = (obj) =>{
    console.log (`Base:${obj.base} Date: ${obj.date}`)
}
//getBaseAndDate(latestExchangeRate);
//create a function that returns a list of availble currencies from a given object. Use latestExchangeRate as an example to test your function
const getListOfCurrencies = (obj) => {
    console.log(Object.keys(obj.rates))
}
// getListOfCurrencies(latestExchangeRate)
// create a function that console logs a string with the currency and the currency rate for each currency in a given object. For example, 'AUD is at a 1.2742 conversion rate'. Use latestExchangeRate as an example to test your function
const stringCurrencyAndRate = (obj) => {
    // console.log(latestExchangeRate['rates'])
   Object.entries(obj['rates']).forEach(([key,value]) => {
       console.log(`${key} is at a ${value} conversion rate.`) 
    })

}
// stringCurrencyAndRate(latestExchangeRate);


//create a function that takes in an object and console logs the result of the object's multiplyByTen method on each of the exchange rates. Use latestExchangeRate as an example to test your function
const mulitplierForExchangeRate = (obj) =>{
    
    Object.values(obj['rates']).forEach((value) => {
        console.log(obj.multiplyByTen(value))
    }
)}

mulitplierForExchangeRate(latestExchangeRate);



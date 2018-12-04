function calculateTax(trades) {
    // transactions
    let edittedTrades = [];
    for (let i = 0; i < trades.length; i++) {
        let tradeArr = trades[i].split(",");

        let trade = {}; // set trade hash
        trade.date = tradeArr[0];
        trade.symbol = tradeArr[1];
        trade.action = tradeArr[2];
        trade.quantity = parseInt(tradeArr[3]);
        trade.valueOfTrade = parseInt(tradeArr[4]);

        edittedTrades.push(trade)
    }

    let currentTrades = filterByYear(edittedTrades, "2015");
    let currentTicketSymbols = Array.from(new Set(currentTrades.map(trade => trade.symbol)));

    let sumProfit = 0;
    for (let i = 0; i < currentTicketSymbols.length; i++) {
        let tickerSymbol = currentTicketSymbols[i];
        let currentTickerTrades = currentTrades.filter(trade => trade.symbol === tickerSymbol);
        let newProfit = tradesWithTickerSymbols(currentTickerTrades);

        sumProfit += newProfit;
    }

    if (sumProfit > 0) {
        return ("$" + (0.25*sumProfit).toFixed(2));
    } else {
        return "$0.00";
    }
}

function filterByYear(arrayTrades, year) { // set by year
    return arrayTrades.filter(transaction =>
        transaction.date.substr(0,4) === year
    )
}

function tradesWithTickerSymbols(trades) {
    let queue = [];
    let profit = 0;
    for (let i = 0; i < trades.length; i++) {
      let eachTrade = trades[i];

        if (queue.length === 0) {
            queue.push(eachTrade)
            continue
        }

        if (queue[queue.length - 1].action === eachTrade.action) {
            queue.push(eachTrade)
            continue
        }

        //value made on queue and last trade. Get new queue and profit
        if (eachTrade.action === "S") {
            let deltaTrade = findLastSell(queue, eachTrade, profit)
            queue = deltaTrade.queue;
            profit = deltaTrade.profit;
        } else if (eachTrade.action === "B") {
            let deltaTrade = findLastBuy(queue, eachTrade, profit)
            queue = deltaTrade.queue;
            profit = deltaTrade.profit;
        }
    }

    return profit
}

function findLastSell(queue, transaction, profit) { //get last sell

    if (queue.length === 0) {
        return {queue: [transaction], profit: profit}
    }

    if (queue[0].quantity > transaction.quantity) {
        queue[0].quantity -= transaction.quantity;
        profit += (transaction.valueOfTrade - queue[0].valueOfTrade) * transaction.quantity;
        return {queue: queue, profit: profit}

    } else if (queue[0].quantity === transaction.quantity){
        profit += (transaction.valueOfTrade - queue[0].valueOfTrade) * transaction.quantity;
        queue.shift()
        return {queue: queue, profit: profit}

    } else if (queue[0].quantity < transaction.quantity) {
        let firstOut = queue.shift()
        transaction.quantity -= firstOut.quantity;
        profit += (transaction.valueOfTrade - firstOut.valueOfTrade) * firstOut.quantity
        return findLastSell(queue, transaction, profit)
    }
}

function findLastBuy(queue, transaction, profit) {
    if (queue.length === 0) {
        return {queue: [transaction], profit: profit}
    }

    if (queue[0].quantity > transaction.quantity) {
        queue[0].quantity -= transaction.quantity;
        profit -= (transaction.valueOfTrade - queue[0].valueOfTrade) * transaction.quantity
        return {queue: queue, profit: profit}
    } else if (queue[0].quantity === transaction.quantity){
        profit -= (transaction.valueOfTrade - queue[0].valueOfTrade) * transaction.quantity
        queue.shift()
        return {queue: queue, profit: profit}
    } else if (queue[0].quantity < transaction.quantity) {
        let firstOut = queue.shift()
        transaction.quantity -= firstOut.quantity
        profit -= (transaction.valueOfTrade - firstOut.valueOfTrade) * firstOut.quantity
        return findLastBuy(queue, transaction, profit)
    }
}


let testCase = ["2015-01-03,AAPL,B,50,80.0",
"2015-01-05,AAPL,B,60,100.0",
"2015-02-05,AAPL,S,70,130.0",
"2015-02-08,AAPL,S,10,90.0",
"2015-03-10,AAPL,S,80,120.0",
"2015-03-12,AAPL,B,10,70.0",
"2015-04-08,AAPL,B,70,160.0"]

console.log(calculateTax(testCase))
console.log("Should be the string \"$625.00\" when given an ordered arr of trade strings that is the one above")

console.log(calculateTax(["2015-01-03,AMZN,B,10,180.0",
"2015-01-05,AMZN,S,150,190.0",
"2015-02-05,AMZN,B,30,130.0",
"2015-02-08,AMZN,B,10,990.0",
"2015-03-10,AMZN,S,80,120.0",
"2015-03-12,AMZN,B,10,70.0",
"2015-04-08,AMZN,B,70,10.0"]))

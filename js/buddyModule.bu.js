var buddyModule = (function(){
    function getWeeklyTransactions(transactions){
        var data = [];
        var now = new Date();
        var first = now.getDate(); - now.getDay();
        var last = first - 6;
        var firstDay = new Date(now.setDate(first));
        var lastDay = new Date(now.setDate(last));
        transactions.forEach((transaction)=>{
            if(transaction.created_date !== null){
                var transDate = new Date(transaction.created_date);
                if(transDate.getTime() > lastDay.getTime()){
                    data.push(transaction);
                }
            }
        });
        return data;
    }
    function getBuyerTransactions(transactions,buyer){
        var data = [];
        transactions.forEach((transaction)=>{
            if(transaction.buyer === buyer){
                data.push(transaction);
            }
        });
        return data;
    }
    function dateDiff(date1,date2){
        var date1 = new Date(date1);
        var date2 = new Date(date2);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    function sumArray(array){
        var total = 0;
        array.forEach((value)=>{
            total += value;
        });
        return total;
    }
    return {
        _toPounds:function(grams){
            return grams / 28 / 16;
        },
        _toOz:function(grams){
            return grams / 28;
        },
        calculatePersonalUse:function(transactions){
            var total = 0;
            transactions.forEach((transaction)=>{
                if(transaction.trans_type === 'S' && transaction.buyer === 'Me' && !parseInt(transaction.discrepency)){
                    total += parseFloat(transaction.product_amount);
                }
            });
            return total;
        },
        calculateDiscrepency:function(transactions){
            var total = 0;
            transactions.forEach((transaction)=>{
                if(parseInt(transaction.discrepency)){
                    total += parseFloat(transaction.product_amount);
                }
            });
            return total;
        },
        calclatePurchases:function(transactions,orders){
            var data = {grams:0,dollars:0};
            transactions.forEach((transaction)=>{
                if(transaction.trans_type === 'P'){
                    data.grams += parseFloat(transaction.product_amount);
                    data.dollars += parseInt(transaction.payment);
                }
            });
            if(orders !== undefined){
                var orderData = this.calculateOrderTotals(orders);
                data.grams += parseFloat(orderData.grams);
                data.dollars += parseFloat(orderData.dollars);
            }
            return data;
        },
        calculateSales:function(transactions){
            var data = {grams:0,dollars:0};
            transactions.forEach((transaction)=>{
                if(transaction.trans_type === 'S' && transaction.buyer !== 'Me'){
                    data.grams += parseFloat(transaction.product_amount);
                    data.dollars += parseInt(transaction.payment);
                }
            });
            return data;
        },
        calculateWeeklyTotals:function(transactions){
            var data = {sales:{},purchases:{},personal:0,discrepency:0};
            var transactions = getWeeklyTransactions(transactions);
            data.personal = this.calculatePersonalUse(transactions);
            data.sales = this.calculateSales(transactions);
            data.purchases = this.calclatePurchases(transactions);
            data.discrepency = this.calculateDiscrepency(transactions);
            return data;
        },
        calculateTotals:function(transactions,orders){
            var personalGrams = this.calculatePersonalUse(transactions);
            var discrepencyGrams = this.calculateDiscrepency(transactions);
            var purchaseData = this.calclatePurchases(transactions,orders);
            var salesData = this.calculateSales(transactions);
            return {sales:{grams:salesData.grams,dollars:salesData.dollars},purchases:{grams:purchaseData.grams,dollars:purchaseData.dollars},personal:{use:personalGrams,discrepency:discrepencyGrams}};
        },
        calculateOrderTotals:function(orders){
            var data = {grams:0,dollars:0};
            orders.forEach((order)=>{
                data.grams += parseFloat(order.product_amount);
                data.dollars += parseInt(order.usd_total_amount);
            });
            return data;
        },
        calculateSaleFrequency:function(transactions,buyer){
            transactions = getBuyerTransactions(transactions,buyer);
            var dateDiffs = [];
            for(var i = 0; i < transactions.length; i++){
                if(i + 1 < transactions.length){
                    dateDiffs.push(dateDiff(transactions[i].teh_date,transactions[i + 1].teh_date));
                }
            }
            total = 0;
            dateDiffs.forEach((diff)=>{
                if(diff < 100){total += diff;}
            });
            return total / transactions.length;
        },
        calculateAvgSaleAmount:function(transactions,buyer){
            data = {grams:0,dollars:0};
            grams = [];
            dollars = [];
            transactions = getBuyerTransactions(transactions,buyer);
            transactions.forEach((transaction)=>{
                grams.push(parseFloat(transaction.product_amount));
                dollars.push(parseInt(transaction.payment));
            });
            data.grams = sumArray(grams) / grams.length;
            data.dollars = sumArray(dollars) / dollars.length;
            return data;
        },
        getLastSale:function(transactions,buyer){
            transactions = getBuyerTransactions(transactions,buyer);
            return transactions[transactions.length - 1];
        },
        daysSinceLastSale:function(transactions,buyer){
            lastSale = this.getLastSale(transactions,buyer);
            return dateDiff(lastSale.teh_date,Date.now());
        },
        buyerStats:function(transactions,buyer){
            var saleData = this.calculateAvgSaleAmount(transactions,buyer);
            data = {
                avgFrequency:this.calculateSaleFrequency(transactions,buyer),
                daysSinceSale:this.daysSinceLastSale(transactions,buyer),
                avgGrams:saleData.grams,
                avgDollars:saleData.dollars,
                predictedDays:this.calculateSaleFrequency(transactions,buyer) - this.daysSinceLastSale(transactions,buyer)
            };
            return data;
        },
        weeklyStats:function(tranactions){
            var weeklyData = this.calculateWeeklyTotals(tranactions);
            var totalGrams = weeklyData.sales.grams + weeklyData.personal + weeklyData.discrepency;
            var personalPercent = (weeklyData.personal / totalGrams) * 100;
            var discrepPercent = (weeklyData.discrepency / totalGrams) * 100;
            var salesPercent = (weeklyData.sales.grams / totalGrams) * 100;
            return {total:totalGrams,personal:personalPercent,sold:salesPercent,discrepency:discrepPercent,income:weeklyData.sales.dollars,expense:weeklyData.purchases.dollars}
        },
        calculatePersonalInvestment:function(transactions){
            var total = 0;
            transactions.forEach((transaction)=>{
                if(transaction.trans_type === 'T' && transaction.buyer === 'Me'){
                    total += parseInt(transaction.payment);
                }
            });
            return total;
        },
        calculateTransferVariance:function(transfers){
            var differences = [];
            transfers.forEach((transfer)=>{
                var initialDollars = parseFloat(transfer.btc_gained) * parseFloat(transfer.initial_rate);
                var finalDollars = parseFloat(transfer.btc_gained) * parseFloat(transfer.completion_rate);
                var difference = finalDollars - initialDollars;
                differences.push(difference);
            });
            return sumArray(differences);
        }
    }
}());

// module.exports = buddy;

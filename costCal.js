function getUserConsumptionInfo(){
    return {
        prodQuantity:  document.getElementById('prodQuantity').value,
        prodFormat:  document.getElementById('tabaccoProductFormat').value,
        consumptionPeriod:  document.getElementById('consumptionPeriod').value,
        prodPrice:  document.getElementById('prodPrice').value
    };
}

function calculatePeriodicCosts() {
    let smokerInfo = getUserConsumptionInfo();
    const totalCost = smokerInfo.prodQuantity * smokerInfo.prodPrice;
    if ( smokerInfo.consumptionPeriod === "daily" ) {
        return {
            daily: totalCost, 
            weekly: totalCost * 7,
            monthly: totalCost * 7 * 4,
            anual: totalCost * 7 * 4 * 12
        }
    }
    else if ( smokerInfo.consumptionPeriod === "weekly" ) {
        return {
            weekly: totalCost, 
            daily: totalCost / 7,
            monthly: totalCost * 4,
            anual: totalCost * 4 * 12
        }
    }
    else {
        return {
            monthly: totalCost, 
            weekly: totalCost / 4,
            daily: totalCost / 4 * 7,
            anual: totalCost * 12
        } 
    }
}

function displayUserInfo(){

    let periodicCosts = calculatePeriodicCosts();
    for ( let period in periodicCosts ) {
        periodicCosts[period] = periodicCosts[period].toFixed(2);
    }
    document.getElementById('dailyLeak').innerHTML =  "$" + periodicCosts.daily + " per day,";
    document.getElementById('weeklyLeak').innerHTML =  "$" + periodicCosts.weekly + " per week,";
    document.getElementById('monthlyLeak').innerHTML = "$" + periodicCosts.monthly + " per month, and ";
    document.getElementById('anualLeak').innerHTML = "$" + periodicCosts.anual + " per year.";
    setTimeout(displayUserInfo, 1000);
}
document.getElementById('test').onload = displayUserInfo();
//console.log(prodPrice);

function getUserConsumptionInfo(){
    return {
        prodQuantity:  document.getElementById('prodQuantity').value,
        prodFormat:  document.getElementById('tabaccoProductFormat').value,
        consumptionPeriod:  document.getElementById('consumptionPeriod').value,
        prodPrice:  document.getElementById('prodPrice').value
    };
}

function calcQuantityCosts(smokerInfo) {
    let quantity = smokerInfo.prodFormat,
        baseCosts = smokerInfo.prodQuantity * smokerInfo.prodPrice;
    if ( ! isNaN(parseInt(quantity)))
    {
        return baseCosts * quantity;  
    }
    return baseCosts;
}

function calculatePeriodicCosts() {
    const smokerInfo = getUserConsumptionInfo(),
          totalCost = calcQuantityCosts(smokerInfo),
          period = smokerInfo.period;

    if ( period === "daily" ) {
        return {
            daily: totalCost, 
            weekly: totalCost * 7,
            monthly: totalCost * 7 * 4,
            anual: totalCost * 7 * 4 * 12
        }
    }
    else if ( period === "weekly" ) {
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
    document.getElementById('dailyLeak').innerHTML =  "leaks you of " + "<strong>$" + periodicCosts.daily + "</strong> per day,";
    document.getElementById('weeklyLeak').innerHTML =  "<strong>$" + periodicCosts.weekly + "</strong> per week,";
    document.getElementById('monthlyLeak').innerHTML = "<strong>$" + periodicCosts.monthly + "</strong> per month, and ";
    document.getElementById('anualLeak').innerHTML = "<strong>$" + periodicCosts.anual + "</strong> per year.";
    setTimeout(displayUserInfo, 500);
}

function resetCigarQuantity() {
    document.getElementById("prodQuantity").value = 1;
}

document.getElementById('textCalc').onload = displayUserInfo();
document.getElementById('tabaccoProductFormat').addEventListener('change', resetCigarQuantity);



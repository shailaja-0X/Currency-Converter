
const amountInput = document.querySelector("#amountInput");
const baseCurrencySelect = document.querySelector("#baseCurrencySelect");
const targetCurrencySelect = document.querySelector("#targetCurrencySelect");
const refreshBtn = document.querySelector("#refresh-btn");
const rateDisplay = document.querySelector("#rate-display");
const inverseDisplay = document.querySelector("#inverse-display");
const statusMsg = document.querySelector("#status-msg");

refreshBtn.addEventListener("click", convertCurrency);

async function convertCurrency()
{
    try 
    {
        let amount = parseFloat(amountInput.value); 
        let base =  baseCurrencySelect.value;
        let target = targetCurrencySelect.value;

        const response = await fetch(`https://open.er-api.com/v6/latest/${base}`, { cache: "no-store"});
        const data = await response.json();
        // console.log(data);

        let conversionRate = data.rates[target];

        let conversionFinalAmount = amount * conversionRate;
        let inverseRate = 1 / conversionRate;

        rateDisplay.textContent = `${amount} ${base} = ${conversionFinalAmount.toFixed(2)} ${target}`;
        inverseDisplay.textContent = `1 ${target} = ${inverseRate.toFixed(4)} ${base}`;

        statusMsg.textContent = "Converted successfully";
     }
    catch (error)
    {
        console.log("Fetch Exception caught: ", error);
        statusMsg.textContent = "Failed to pull conversion rates. Check your connection.";
        rateDisplay.textContent = "ERROR";
        inverseDisplay.textContent = "ERROR";
    }
    
}
 convertCurrency();


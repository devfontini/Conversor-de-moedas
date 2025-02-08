async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const resultField = document.getElementById("result");
    const errorMessage = document.getElementById("errorMessage");

    if (amount === "") {
        resultField.value = "";
        return;
    }

    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            throw new Error("Erro ao obter taxas de câmbio");
        }

        const rate = data.rates[toCurrency];
        const result = (amount * rate).toFixed(2);
        resultField.value = result;
        errorMessage.textContent = "";
    } catch (error) {
        resultField.value = "";
        errorMessage.textContent = "Erro ao obter taxas de câmbio. Tente novamente!";
    }
}

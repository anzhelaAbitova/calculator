/* Значения из текстовых инпутов */

const totalCost = document.getElementById('total-cost'),
    anInitialFee = document.getElementById('an-initial-fee'),
    creidtTerm = document.getElementById('credit-term');

/* Значения из range инпутов */

const totalCostRange = document.getElementById('total-cost-range'),
    anInitialFeeRange = document.getElementById('an-initial-fee-range'),
    creidtTermRange = document.getElementById('credit-term-range');

/* Итоговые значения */

const totalAmountOfCredit = document.getElementById('amount-of-credit'),
    totalMonthlyPayment = document.getElementById('monthly-payment'),
    totalRecommendedIncome = document.getElementById('recommended-income');


/* Все range : */
const inputsRange = document.querySelectorAll('.input-range');

/* Все кнопки с процентной ставкой : */
const bankBtns = document.querySelectorAll('.bank');

const assignValue = () => {
    totalCost.value = totalCostRange.value;
    anInitialFee.value = anInitialFeeRange.value;
    creidtTerm.value = creidtTermRange.value;
}

assignValue();

const banks = [
    {
        name: 'alfa',
        precents: 8.7
    },
    {
        name: 'sberbank',
        precents: 8.4
    },
    {
        name: 'pochta',
        precents: 7.9
    },
    {
        name: 'tinkoff',
        precents: 9.2
    },
]

let currentPrecent = banks[0].precents;

for (let bank of bankBtns) {
    bank.addEventListener('click', () => {
        for(let item of bankBtns) {
            item.classList.remove('active');
        }
        bank.classList.add('active');
        takeActiveBank(bank);
    })
}

const takeActiveBank = currentActive => {
    const dataAttrValue = currentActive.dataset.name;
    const currentBank = banks.find(bank => bank.name === dataAttrValue);
    currentPrecent = currentBank.precents;
    calculation(totalCost.value, anInitialFee.value, creidtTerm.value);
}

for (let input of inputsRange) {
    input.addEventListener('input', () => {
        assignValue();
        calculation(totalCost.value, anInitialFee.value, creidtTerm.value);
    })
}

const calculation = (totalCost = 0, anInitialFee = 100000, creidtTerm = 1) => {
    /* 
        ЕП - Ежемесячный платеж
        РК - Размер кредита
        ПС - Процентная ставка
        КМ - Количество месяцев

        ЕП = (РК + (((РК / 100) * ПС) / 12) * КМ) / КМ;
    */
    let monthlyPayment; // Ежемесячный платеж
    let loanAmount = totalCost - anInitialFee; // Размер кредита
    let interestRate = currentPrecent; // Процентная ставка
    let numberOfYears = creidtTerm; // Количество лет
    let numberOfMonths = 12 * numberOfYears; // Количество месяцев

    monthlyPayment = (loanAmount + (((loanAmount / 100) * interestRate) / 12) * numberOfMonths) / numberOfMonths;
    const monthlyPaymentArounded = Math.round(monthlyPayment);
    
    if (monthlyPaymentArounded < 0) {
        return false;
    } 
    else {
        totalAmountOfCredit.innerHTML = `${loanAmount} ₽`;
        totalMonthlyPayment.innerHTML = `${monthlyPaymentArounded} ₽`;
        totalRecommendedIncome.innerHTML = `${monthlyPaymentArounded + ((monthlyPaymentArounded / 100) * 35)} ₽`;
    }

}
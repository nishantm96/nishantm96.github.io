const form = document.querySelector('.multi-step-form');

const addons = document.querySelectorAll('.addon');

const formSteps = document.querySelectorAll('.form-step');
const stepList = document.querySelectorAll('.step');

const planOptions = document.querySelectorAll('.plan-option');

const planDurationInput = document.getElementById('plan-duration');

const selectedPlanElement = document.querySelector('.selected-plan');
const selectedPlanBillElement = document.getElementById('plan-bill');
const addonsBillList = document.getElementById('addons-bill');

const changePlanLink = document.getElementById('change-plan');

const totalBillElement = document.querySelector('.total-bill');
const totalBillAmountElement = document.querySelector('.total-bill-amount');

const nameFormItem = document.getElementById('name-form-item');
const emailFormItem = document.getElementById('email-form-item');
const phoneFormItem = document.getElementById('phone-form-item');


const planPrices = {
    arcade: { monthly: 9, yearly: 90 },
    advanced: { monthly: 12, yearly: 120 },
    pro: { monthly: 15, yearly: 150 }
}

const addonPrices = {
    "online-service": { monthly: 1, yearly: 10 },
    "large-storage": { monthly: 2, yearly: 20 },
    "customizable-profile": { monthly: 2, yearly: 20 }
}

const durationNotation = {
    'monthly': 'mo',
    'yearly': 'yr'
}

changePlanLink.addEventListener('click', () => {
    selectStep(2);
})

planDurationInput.addEventListener('change', (e) => {
    if (e.target.checked) {
        addons[0].querySelector('.addon-price').textContent = '$10/yr';
        addons[1].querySelector('.addon-price').textContent = '$20/yr';
        addons[2].querySelector('.addon-price').textContent = '$20/yr';
    } else {
        addons[0].querySelector('.addon-price').textContent = '$1/mo';
        addons[1].querySelector('.addon-price').textContent = '$2/mo';
        addons[2].querySelector('.addon-price').textContent = '$2/mo';
    }
});

formSteps.forEach((step) => {
    const stepNumber = Number(step.dataset.step);
    switch (stepNumber) {
        case 1:
            step.querySelector('.next-btn').addEventListener('click', () => {
                // validate current inputs
                let name = nameFormItem.querySelector('#name').value;
                let email = emailFormItem.querySelector('#email').value;
                let phone = phoneFormItem.querySelector('#phone').value;
                let invalid = false;
                if (name === null || typeof (name) === 'undefined' || name === '') {
                    nameFormItem.classList.add('invalid');
                    invalid = true;
                } else {
                    nameFormItem.classList.remove('invalid');
                }

                if (email === null || typeof (email) === 'undefined' || email === '') {
                    emailFormItem.classList.add('invalid');
                    invalid = true;
                } else {
                    let emailregex = new RegExp(/[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}/);
                    if (!email.match(emailregex)) {
                        emailFormItem.querySelector('.input-hint').textContent = `Please provide a valid email address`;
                        emailFormItem.classList.add('invalid');
                    } else {
                        emailFormItem.classList.remove('invalid');
                    }
                }

                if (phone === null || typeof (phone) === 'undefined' || phone === '') {
                    phoneFormItem.classList.add('invalid');
                    invalid = true;
                } else {
                    let phoneregex = new RegExp(/([+]?\d{1,4})?[ -]?\d{10}/);
                    if (!phone.match(phoneregex)) {
                        phoneFormItem.querySelector('.input-hint').textContent = `Please provide a valid phone number`;
                        phoneFormItem.classList.add('invalid');
                        invalid = true;
                    } else {
                        phoneFormItem.classList.remove('invalid');
                    }
                }
                if (invalid) {
                    return;
                }

                selectStep(2);
            });

            break;
        case 2:
            step.querySelector('.back-btn').addEventListener('click', () => {
                selectStep(1);
            });
            step.querySelector('.next-btn').addEventListener('click', () => {
                selectStep(3);
            });
            break;
        case 3:
            step.querySelector('.back-btn').addEventListener('click', () => {
                selectStep(2);
            });
            step.querySelector('.next-btn').addEventListener('click', () => {
                prepareBill();
                selectStep(4);
            });
            break;
        case 4:
            step.querySelector('.back-btn').addEventListener('click', () => {
                selectStep(3);
            });
            break;
        default:
    }
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let formdata = new FormData(form);
    selectStep(5);
    form.reset();
});

function prepareBill() {
    let formdata = new FormData(form);
    let totalBill = 0;
    let planDuration = 'monthly';
    if (formdata.get('yearly') === 'on') {
        planDuration = 'yearly';
    }
    const selectedPlan = formdata.get("plan");
    selectedPlanElement.textContent = `${selectedPlan.replace(/^./, char => char.toUpperCase())} (${planDuration.replace(/^./, char => char.toUpperCase())})`;
    selectedPlanBillElement.textContent = `$${planPrices[selectedPlan][planDuration]}/${durationNotation[planDuration]}`;

    totalBill += planPrices[selectedPlan][planDuration];

    addonsBillList.innerHTML = '';

    if (formdata.get('addon-online-service') === 'on') {
        const addonBillItem = document.createElement('li');
        const selectedAddon = document.createElement('span');
        const billAmount = document.createElement('div');
        billAmount.textContent = `+$${addonPrices['online-service'][planDuration]}/${durationNotation[planDuration]}`
        billAmount.classList.add('bill-amount');

        totalBill += addonPrices['online-service'][planDuration];
        selectedAddon.classList.add('selected-addon');
        selectedAddon.textContent = 'Online Service';

        addonBillItem.appendChild(selectedAddon);
        addonBillItem.appendChild(billAmount);
        addonsBillList.appendChild(addonBillItem);
    }

    if (formdata.get('addon-large-storage') === 'on') {
        const addonBillItem = document.createElement('li');
        const selectedAddon = document.createElement('span');
        const billAmount = document.createElement('div');
        billAmount.textContent = `+$${addonPrices['large-storage'][planDuration]}/${durationNotation[planDuration]}`;
        billAmount.classList.add('bill-amount');

        totalBill += addonPrices['large-storage'][planDuration];

        selectedAddon.classList.add('selected-addon');
        selectedAddon.textContent = 'Large Storage';

        addonBillItem.appendChild(selectedAddon);
        addonBillItem.appendChild(billAmount);

        addonsBillList.appendChild(addonBillItem);

    }

    if (formdata.get('addon-customizable-profile') === 'on') {
        const addonBillItem = document.createElement('li');
        const selectedAddon = document.createElement('span');
        const billAmount = document.createElement('div');
        billAmount.textContent = `+$${addonPrices['customizable-profile'][planDuration]}/${durationNotation[planDuration]}`;
        billAmount.classList.add('bill-amount');

        totalBill += addonPrices['customizable-profile'][planDuration];

        selectedAddon.classList.add('selected-addon');
        selectedAddon.textContent = 'Customizable Profile';

        addonBillItem.appendChild(selectedAddon);
        addonBillItem.appendChild(billAmount);

        addonsBillList.appendChild(addonBillItem);

    }

    if (planDuration === 'monthly') {
        totalBillElement.querySelector('span').textContent = 'Total (per month)';
        totalBillAmountElement.textContent = `+$${totalBill}/${durationNotation[planDuration]}`;
    } else {
        totalBillElement.querySelector('span').textContent = 'Total (per year)';
        totalBillAmountElement.textContent = `+$${totalBill}/${durationNotation[planDuration]}`;
    }
}

function selectStep(stepNumber) {
    formSteps.forEach((step, index) => {
        if (index === stepNumber - 1) {
            step.classList.add('show');
        } else {
            step.classList.remove('show');
        }
    });
    stepList.forEach((step, index) => {
        if (stepNumber == 5) stepNumber--;
        if (index === stepNumber - 1) {
            step.classList.add('selected');
        } else {
            step.classList.remove('selected');
        }
    });
}

function setDefaults() {
    planOptions[0].querySelector('input').checked = true;
    planDurationInput.checked = false;
    selectStep(1);
}

setDefaults();

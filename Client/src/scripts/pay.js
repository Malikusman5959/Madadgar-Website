let firstStep = document.querySelector('.pay-step-1');
let secondStep = document.querySelector('.pay-step-2');
let firstStepSaveBtn = document.querySelector('.pay-step-1 .save-btn');
let secondStepSaveBtn = document.querySelector('.pay-step-2 .save-btn');

firstStepSaveBtn.onclick = function(e){
    e.preventDefault();
    firstStep.classList.remove('active');
    secondStep.classList.add('active');
}

secondStepSaveBtn.onclick = function(e){
    window.location.href = 'index.html';
}

let cardNumberInput = document.body.querySelector('.card-number-input');
let maskOptionsNumber = {
mask: '****-****-****-****',
min: -10000,
max: 10000,
thousandsSeparator: ''
};
let maskNumberInput = IMask(cardNumberInput, maskOptionsNumber);

let cvvCodeInput = document.querySelector('.cvv-code');
cvvCodeInput.addEventListener('input', ()=>{
    if(cvvCodeInput.value.length > 3){
        cvvCodeInput.value = cvvCodeInput.value.substr(0,3);
    }
})

let cardDateInput = document.body.querySelector('.card-number-date');
let maskOptionsDate = {
mask: '**/**',
min: -10000,
max: 10000,
thousandsSeparator: ''
};
let maskCardInput = IMask(cardDateInput, maskOptionsDate);

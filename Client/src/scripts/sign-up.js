let occupantsButtons = document.querySelectorAll('.sign-up__start-section__plan-block');

occupantsButtons.forEach(element => {
    element.addEventListener('click', ()=>{
        occupantsButtons.forEach(el=>{
            el.classList.remove('active');
        })
        element.classList.add('active');
    })
})

let signUpFirstStep = document.querySelector('.sign-up__start-section');
let signUpIndividual = document.querySelector('.sign-up-individual');
let signUpCorporate = document.querySelector('.sign-up-corporate');
let chooseAccountBtn = document.querySelector('.choose-account-btn');

chooseAccountBtn.onclick = function(e){
    e.preventDefault();
    let choosedOption = signUpFirstStep.querySelector('.sign-up__start-section__plan-block.active');

        if(choosedOption.classList.contains('individual')){
            signUpFirstStep.classList.remove('active');
            signUpIndividual.classList.add('active');
        }
        else if(choosedOption.classList.contains('corporate')){
            signUpFirstStep.classList.remove('active');
            signUpCorporate.classList.add('active');
        }
}

function redirectPay(){
    window.location.href = 'pay.html';
}
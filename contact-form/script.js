const form = document.getElementById('contact-form');
const firstnameGroup = document.getElementById('first-name-group');
const lastnameGroup = document.getElementById('last-name-group');
const emailGroup = document.getElementById('email-group');
const querytypeGroup = document.getElementById('query-type-radioset');
const messageGroup = document.getElementById('message-group');
const consentGroup = document.getElementById('consent-group');
const notificationContainer = document.getElementById('notification');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    console.log(formdata);

    const firstname = formdata.get('first-name');
    const lastname = formdata.get('last-name');
    const email = formdata.get('email');
    const queryType = formdata.get('query-type');
    const message = formdata.get('message');
    const consent = formdata.get('consent');
    let invalid = false;

    if(firstname === null || typeof(firstname) === 'undefined' || firstname === '') {
        invalid = true;
        firstnameGroup.querySelector('.input-hint').textContent = 'This field is required';
        firstnameGroup.classList.add('invalid');
    } else {
        firstnameGroup.classList.remove('invalid');
        firstnameGroup.querySelector('.input-hint').textContent = '';
    }

    if(lastname === null || typeof(lastname) === 'undefined' || lastname === '') {
        invalid = true;
        lastnameGroup.querySelector('.input-hint').textContent = 'This field is required';
        lastnameGroup.classList.add('invalid');
    } else {
        lastnameGroup.classList.remove('invalid');
        lastnameGroup.querySelector('.input-hint').textContent = '';
    }

    if(email === null || typeof(email) === 'undefined' || email === '') {
        invalid = true;
        emailGroup.querySelector('.input-hint').textContent = 'This field is required';
        emailGroup.classList.add('invalid');
    } else {
        let emailregex = new RegExp(/[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}/);
        if(!email.match(emailregex)) {
            invalid = true;
            emailGroup.querySelector('.input-hint').textContent = 'Please enter a valid email address';
            emailGroup.classList.add('invalid');
        } else {
            emailGroup.querySelector('.input-hint').textContent = '';
            emailGroup.classList.remove('invalid');
        }

    }

    if(queryType === null || typeof(queryType) === 'undefined' || queryType === '') {
        invalid = true;
        querytypeGroup.querySelector('.input-hint').textContent = 'Please select a query type';
        querytypeGroup.classList.add('invalid');
    } else {
        querytypeGroup.querySelector('.input-hint').textContent = '';
        querytypeGroup.classList.remove('invalid'); 
    }

    if(message === null || typeof(message) === 'undefined' || message === '') {
        invalid = true;
        messageGroup.querySelector('.input-hint').textContent = 'Please select a query type';
        messageGroup.classList.add('invalid');
    } else {
        messageGroup.querySelector('.input-hint').textContent = '';
        messageGroup.classList.remove('invalid');
    }

    if(consent === null || typeof(consent) === 'undefined' || message === '') {
        invalid = true;
        consentGroup.querySelector('.input-hint').textContent = 'To submit this form, please consent to being contacted';
        consentGroup.classList.add('invalid');
    } else {
        consentGroup.querySelector('.input-hint').textContent = '';
        consentGroup.classList.remove('invalid');
    }

    if(invalid === false) {
        form.reset();
        notificationContainer.classList.add('show');
        setTimeout(() => {
            notificationContainer.classList.remove('show');
        }, 3000);
    }
 
});
const API_URL = 'https://api.adviceslip.com/advice';
const adviceIdElement = document.getElementById('advice-id');
const adviceContentElement = document.getElementById('advice-content');
const newAdviceBtn = document.getElementById('new-advice-btn');


async function getAdvice() {
    const response = await fetch(API_URL);
    const data = await response.json();

    adviceIdElement.textContent = data.slip.id;
    adviceContentElement.innerHTML = `&#8220;${data.slip.advice}&#8221;`;
}

newAdviceBtn.addEventListener('click', getAdvice);


getAdvice();


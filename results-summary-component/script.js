
const marksList = document.querySelector('.marks-list');
const avgMarks = document.querySelector('.avg-score')

async function loadData() {
    const response = await fetch('./data.json');
    const data = await response.json();
    return data;
}

loadData().then((data) => {
    data.forEach(item => {
        const li = document.createElement('li');
        li.classList.add(`sub-${item.category.toLowerCase()}`);

        const img = document.createElement('img');
        img.setAttribute('src', item.icon);
        img.setAttribute('alt', `${item.category.toLowerCase()}-icon`);
        li.appendChild(img);

        const subtitle = document.createElement('span');
        subtitle.textContent = item.category;
        subtitle.classList.add('sub-title');
        li.appendChild(subtitle);

        const marksContainer = document.createElement('span');
        const obtmarksContainer = document.createElement('span');
        obtmarksContainer.classList.add('sub-marks');
        obtmarksContainer.textContent = item.score;

        const maxmarksContainer = document.createElement('span');
        maxmarksContainer.classList.add('max-sub-marks');
        maxmarksContainer.textContent = ' / 100';

        marksContainer.appendChild(obtmarksContainer);
        marksContainer.appendChild(maxmarksContainer);

        li.appendChild(marksContainer);
        marksList.appendChild(li);
    });

    let avgmarks = Math.floor(data.reduce((acc, item) => item.score + acc, 0) / data.length);
    avgMarks.textContent = avgmarks;
});


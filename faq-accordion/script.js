const accordionPanels = document.querySelectorAll('.accordion-panel');

accordionPanels.forEach(item => {
    item.addEventListener('click', () => {
        item.parentElement.classList.toggle('open');
    });

    item.addEventListener('keydown', (e) => {
        if(e.keyCode === 13 || e.keyCode == 32)
            item.parentElement.classList.toggle('open');
    });
});
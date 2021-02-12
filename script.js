const paneles = document.querySelectorAll('.nbalogo');

paneles.forEach((panel) => {
    panel.addEventListener('click', () => {
        removerClaseActiva();
        panel.classList.add('active');
    });
});

function removerClaseActiva(){
    paneles.forEach((panel) => {
        panel.classList.remove('active');
    });
}
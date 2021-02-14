const paneles = document.querySelectorAll('.razalogo');

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
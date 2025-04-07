document.addEventListener('DOMContentLoaded', async () => {

function ajustarPosicaoTexto() {
    const welcometext = document.getElementById("welcometext");
    const larguraTela = window.innerWidth;

    if (larguraTela <= 768) {
        welcometext.setAttribute("x", "50%");
        welcometext.setAttribute("y", "-10%");
    } else {
        welcometext.setAttribute("x", "35%");
        welcometext.setAttribute("y", "-10%");
    }
}

await new Promise(resolve => setTimeout(resolve, 200));

ajustarPosicaoTexto();

window.addEventListener('resize', function() {
    ajustarPosicaoTexto();
});

});
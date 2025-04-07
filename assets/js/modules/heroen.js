function ajustarPosicaoTexto() {
        const welcometext = document.getElementById("welcometext");

        if (welcometext) {
            const larguraTela = window.innerWidth;

            if (larguraTela <= 768) {
                welcometext.setAttribute("x", "50%");
                welcometext.setAttribute("y", "-10%");
            } else {
                welcometext.setAttribute("x", "30%");
                welcometext.setAttribute("y", "-10%");
            }
        } else {
        }
    }

    function checkAndAdjustPosicao() {
        const larguraTela = window.innerWidth;

        if (larguraTela > 600) {  
            ajustarPosicaoTexto(); 
        }
    }

    window.onload = function() {
        checkAndAdjustPosicao(); 
    };

    window.addEventListener('resize', function() {
        checkAndAdjustPosicao(); 
    });

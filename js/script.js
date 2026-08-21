document.addEventListener('DOMContentLoaded', function() {
    
    // ----------------------------------------------------
    // INTERAÇÃO ADICIONAL: Contador de Caracteres
    // ----------------------------------------------------
    const campoMensagem = document.getElementById('mensagem');
    const contadorDisplay = document.getElementById('contador');

    if (campoMensagem && contadorDisplay) {
        campoMensagem.addEventListener('input', function() {
            // Conta quantos caracteres foram digitados e atualiza no HTML
            contadorDisplay.textContent = campoMensagem.value.length;
        });
    }

    // ----------------------------------------------------
    // VALIDAÇÃO DO FORMULÁRIO E FEEDBACK VISUAL
    // ----------------------------------------------------
    const form = document.getElementById('form-contato');
    const feedback = document.getElementById('form-feedback');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 

            // 1. Limpa mensagens e cores de erros anteriores
            feedback.className = 'escondido';
            feedback.innerHTML = '';
            
            const todosCampos = form.querySelectorAll('input, textarea');
            todosCampos.forEach(function(campo) {
                campo.classList.remove('input-erro');
            });
            
            // 2. Captura os campos inteiros (para podermos pintar a borda deles depois)
            const inputNome = document.getElementById('nome');
            const inputEmail = document.getElementById('email');
            const inputMensagem = document.getElementById('mensagem');

            let erros = [];

            // 3. Validação (se der erro, adiciona a mensagem e pinta a borda do campo específico)
            if (inputNome.value.trim() === '') {
                erros.push('• O campo Nome é obrigatório.');
                inputNome.classList.add('input-erro');
            }

            const email = inputEmail.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email === '') {
                erros.push('• O campo E-mail é obrigatório.');
                inputEmail.classList.add('input-erro');
            } else if (!emailRegex.test(email)) {
                erros.push('• Por favor, insira um formato de e-mail válido.');
                inputEmail.classList.add('input-erro');
            }

            if (inputMensagem.value.trim() === '') {
                erros.push('• O campo Mensagem não pode ficar vazio.');
                inputMensagem.classList.add('input-erro');
            }

            // 4. Condicional de Exibição (Erro x Sucesso)
            if (erros.length > 0) {
                // Mostra a caixa de erro
                feedback.classList.remove('escondido');
                feedback.classList.add('alerta-erro');
                feedback.innerHTML = '<strong>Corrija os seguintes problemas:</strong><br><br>' + erros.join('<br>');
            } else {
                // Sucesso: Esconde o formulário inteiro e mostra um feedback visual
                form.classList.add('escondido');
                feedback.classList.remove('escondido');
                feedback.classList.add('alerta-sucesso');
                feedback.innerHTML = `
                    <h3>🎉 Mensagem enviada com sucesso!</h3>
                    <p>Agradecemos o contato. Nossa equipe retornará em breve.</p>
                    <button onclick="location.reload()" class="btn-voltar">Enviar nova mensagem</button>
                `;
            }
        });
    }
});
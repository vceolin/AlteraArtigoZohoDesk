// Salva a opção selecionada
function salvarConfiguração(_opcaoSelecionada) {
    var opcaoSelecionada = chrome.storage.opcaoSelecionada;
    chrome.storage.sync.set({
        opcaoSelecionada: _opcaoSelecionada
    }, function () {
        // Mensagem para avisar que a alteração foi salva.
        var status = document.getElementById('status');
        status.textContent = 'Salvo.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}
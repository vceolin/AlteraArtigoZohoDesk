// Saves options to chrome.storage
function save_options() {
    var tempoInst = document.getElementById('tempoInstrucao').value;
    chrome.storage.sync.set({
        tempoInstrucao: tempoInst
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        tempoInstrucao: 1
    }, function (items) {
        document.getElementById('tempoInstrucao').value = items.tempoInstrucao;
        document.getElementById('textInput').value = items.tempoInstrucao;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);



function updateTextInput(val) {
    document.getElementById('textInput').value = val.text;
}
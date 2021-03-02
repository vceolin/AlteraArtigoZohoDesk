//variavel que armazena a opcao selecionada
var opcao = "";
//constante para definir os nomes que serão salvos
const ids = ["Ativado", "Desativado"]
$(function() {


    //pega o valor da opção selecionada no storage do chrome
    chrome.storage.local.get("opcaoSelecionada", function(result) {
        opcao = result.opcaoSelecionada;
    });

    //botões
    $("#btnAtivado").click(function() {
        colorirBotao(ids[0]);
        salvarConfiguracao(ids[0]);
    });
    $("#btnDesativado").click(function() {
        colorirBotao(ids[1]);
        salvarConfiguracao(ids[1]);
    });

    $("#btnLimpar").click(function() {
        chrome.storage.local.clear();
    });

    // Colore o botão para aparecer como selecionado
    function colorirBotao(_opcaoSelecionada) {
        var idBotao = "#btn" + _opcaoSelecionada
            //primeiro remove o selected de todos os botões
        $("button").removeClass("active");
        //agora coloca o selected no botão selecionado
        $(idBotao).addClass("active");
    }

    // Salva a opção selecionada
    function salvarConfiguracao(_opcaoSelecionada) {
        var opcaoSelecionada = chrome.storage.opcaoSelecionada;
        chrome.storage.local.set({
            opcaoSelecionada: _opcaoSelecionada
        });
        //muda o valor da variavel opcao
        opcao = _opcaoSelecionada
    }
})
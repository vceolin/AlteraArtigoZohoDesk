//variavel que armazena a opcao selecionada
var opcao = "";
//constante para definir os nomes que serão salvos
const ids = ["LixeiraAnalytics", "ArtigoDesk", "Desativado"]
$(function()
{


    //pega o valor da opção selecionada no storage do chrome
    chrome.storage.sync.get("opcaoSelecionada", function (result) 
    {
        opcao = result.opcaoSelecionada;
    });

    console.log(opcao);
    //Roda a função de colorir o botão a primeira vez para recuperar a cor do selecionado antes
    colorirBotao(opcao);

    //botões
    $("#btnLixeiraAnalytics").click(function()
    {
        colorirBotao(ids[0]);
        salvarConfiguracao(ids[0]);
    });
    $("#btnArtigoDesk").click(function()
    {
        colorirBotao(ids[1]);
        salvarConfiguracao(ids[1]);
    });
    $("#btnDesativado").click(function()
    {
        colorirBotao(ids[2]);
        salvarConfiguracao(ids[2]);
    });

    // Colore o botão para aparecer como selecionado
    function colorirBotao(_opcaoSelecionada) 
    {
        var idBotao = "#btn" + _opcaoSelecionada
        //primeiro remove o selected de todos os botões
        $("button").removeClass("active");
        //agora coloca o selected no botão selecionado
        $(idBotao).addClass("active");
    }

    // Salva a opção selecionada
    function salvarConfiguracao(_opcaoSelecionada) 
    {
        var opcaoSelecionada = chrome.storage.opcaoSelecionada;
        chrome.storage.sync.set({
            opcaoSelecionada: _opcaoSelecionada
        });
        //muda o valor da variavel opcao
        opcao = _opcaoSelecionada
    }
})
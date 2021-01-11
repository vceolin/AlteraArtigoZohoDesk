//Pega a opção selecionada no pop up
chrome.storage.sync.get('opcaoSelecionada', function (result) 
{
    opcao = result.opcaoSelecionada;
});

//Só se executa esse script se a opção selecioanda for ArtigoDesk
if(opcao == "LixeiraAnalytics")
{
    //aguarda 5 segundos pra pagina iniciar completamente
    setTimeout(iniciarRestauracao, 5000);

    function iniciarRestauracao()
    {
        //primeiro verifica se está numa tela que existe a lixeira, para não haver erro
        if(document.getElementsByClassName("trashNav") != null)
        {
            //verifica se não possui a classe que diz que a lixeira está selecionada
            if(!document.getElementsByClassName("trashNav")[0].classList.contains("navOptSelected"))
            {
                document.getElementsByClassName("trashNav")[0].click();
                console.log("############### Clicou na lixeira!");
            }
        }
        //aguarda 5 segundos antes de rodar
        setTimeout(marcarObjetos, 5000);
    }

    function marcarObjetos()
    {
        console.log("############### Iniciou a marcação!");
        //pega todas as linhas da lista
        var linhas = document.getElementById("TrashObjectList").getElementsByTagName("li");
        //evento onMouseOver
        const mouseoverEvent = new Event('mouseover');

        for(i = 0; i < linhas.length; i++)
        {
            console.log("############### Navegando por linhas!");
            //Primeira div, depois quinta div, depois primeiro span e pega o atributo tip
            if(linhas[i].children[0].children[5].children[0].getAttribute("tip") == "Excluído por Sucesso Cliente")
            {
                console.log("############### Achou algo excluído pelo Sucesso Cliente!");
                //primeiro o span acima do checkbox
                var checkbox = linhas[i].children[0].children[0];
                checkbox.style.opacity = 100;
                checkbox.classList.add("fillcolor");
                //agora o span do checkbox
                checkbox.children[0].setAttribute("ischecked", true);
                checkbox.children[0].classList.add("checkedBox");
            }
        }

        concluiRestauracao();
    }

    function concluiRestauracao()
    {
        //aperta o botão de restaurar
        document.getElementById("TrashViewRestoreButton").click();
        console.log("############### Apertou o botão de restaurar!");

    //espera 10 minutos e da um refresh na pagina
        setTimeout(function(){
            chrome.tabs.getSelected(null, function(tab) {
                var code = 'window.location.reload();';
                chrome.tabs.executeScript(tab.id, {code: code});
            });
        }, 100000);
    }
}


  
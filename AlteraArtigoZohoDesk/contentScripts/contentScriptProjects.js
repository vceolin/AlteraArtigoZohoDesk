//Pega a opção selecionada no pop up
var opcao
chrome.storage.sync.get("opcaoSelecionada", function (result) 
{
    opcao = result.opcaoSelecionada;

    //Só se executa esse script se a opção selecioanda for ArtigoDesk
    if (opcao == "LimparProjects") 
    {
        //vai rodar até não ter mais. eh um loop recursivo para ficar repetindo com um timeout
        var rodar = function () {
            //teste para parar de rodar quando acabar os projetos
            if (document.getElementsByClassName("projindrow") != null) 
            {
                //pega todas as linhas da tabela
                var linha = document.getElementsByClassName("projindrow")[0];
                //Verifica se o projeto está nos status cancelado ou concluído, para não arquivar nenhum em andamento
                if (linha.innerText.includes("Concluído") || linha.innerText.includes("Cancelado")) 
                {
                    linha.children[0].children[0].children[0].click();
                    //clica no botão de arquivar do dropdown
                    document.querySelector('[title="Mover para o arquivo"]').click();
                    //confirma a operação
                    document.getElementById("button1").click();
                }
                setTimeout(rodar, 1000);
            }
        }
        //aguarda 10 segundos para rodar. O projects tem problemas em carregar as coisas portanto inspeciono o elemento para que ele veja os valores
        //essa é a primeira execução
        setTimeout(rodar, 30000);
    }
});

    
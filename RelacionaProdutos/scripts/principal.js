//testa se esta ativado a extensao
chrome.storage.local.get(['opcaoSelecionada'], function(result) {
    console.log(result.opcaoSelecionada);
    if (result.opcaoSelecionada == "Ativado") {
        //pega a tabela
        document.getElementsByTagName("tbody")[0].rows;
        //roda pra cada linha da tabela
        (function loopTabela(i) {
            setTimeout(function() { //settimeout para aguardar um tempo antes de rodar de novo
                //pega a tabela de novo (parece inútil mas serve nas outras vezes que o for rodar)
                tabela = document.getElementsByTagName("tbody")[0].rows;
                var tmpId = tabela[i].children[0].innerText; //codigo marketplace
                //pega o array no storage
                chrome.storage.local.get(['produtos'], function(result) {
                    console.log(result.produtos);
                    //com o codigo, ve se ele já existe (se já existe já rodou).
                    if (result.produtos == undefined || !result.produtos.some(x => x.Id == tmpId)) {
                        //se entrou aqui é porque não existe ainda (o find retornou undefined)
                        var produto = new Object();
                        produto.Id = tmpId;

                        //tr > td style > span table-text-content > div table-text-truncate
                        var conteudo = tabela[i].children[1].children[1].children[0].innerHTML;
                        //vai vir um texto sem formatação, exemplo: TSHIRT MASCULINA MANGALARGA - MMWM8711 <br> Color: Preto | Variation: GG
                        //primeiro vamos quebrar e pegar o codigo. Sabemos que ele fica logo depois do " - ". Para não pegar um traço aleatório no meio do nome,
                        //usaremos o método lastIndexOf (https://www.w3schools.com/jsref/jsref_lastindexof.asp)
                        var posInicial = conteudo.lastIndexOf(" - ") + 3; //adicionado 3 para pegar a posição do primeiro digito ao invés da primeira posição do match
                        var posFinal = conteudo.lastIndexOf(" <br>");
                        produto.Codigo = conteudo.substring(posInicial, posFinal); //pega o codigo do produto
                        //agora a cor, mesma logica
                        posInicial = conteudo.lastIndexOf("Color: ") + 7;
                        posFinal = conteudo.lastIndexOf(" | ");
                        produto.Color = conteudo.substring(posInicial, posFinal);

                        //por fim a variation
                        posInicial = conteudo.lastIndexOf("Variation: ") + 11;
                        posFinal = conteudo.length - 1; //ultimo caractere da string
                        produto.Variation = conteudo.substring(posInicial, posFinal).trim(); //remove espaços em branco

                        //salvando produto no array. a condição é pra primeira execução
                        if (result.produtos == undefined) {
                            result.produtos = [produto];
                        } else {
                            result.produtos.push(produto);
                        }
                        //e enviando pro storage
                        chrome.storage.local.set({ produtos: result.produtos }, function() {
                            console.log("Salvou no array o produto" + result.produtos)

                            //Vamos relacionar agora...
                            //1o passo: Clicar no botão de relacionar anúncio
                            tabela[i].children[2].children[0].click()

                            //continuacao no secundario.js
                        });
                    } else {
                        //repetição do loop
                        i++
                        if (i < tabela.length) {
                            loopTabela(i); //chama a função de novo
                        } else {
                            //clica na proxima pagina
                            //pega o botão de página que está ativo, vai para o próximo e clica nele
                            document.getElementsByClassName("page ls-active")[0].nextElementSibling.children[0].click()
                        }
                    }
                });
            }, 10)
        })(0); //esse 0 é o i da chamada da função, ela começa com 0. Não confunda com timeout.
    }
});
//testa se esta ativado a extensao
chrome.storage.local.get(['opcaoSelecionada'], function(result) {
    console.log(result.opcaoSelecionada);
    if (result.opcaoSelecionada == "Ativado") {
        //pegando array de produtos
        chrome.storage.local.get(["produtos"], function(result) {
            console.log(result.produtos);

            //pegando novamente qual o código para fazer a pesquisa no array
            var nomeProduto = document.getElementsByTagName("p")[1].innerHTML.trim()
            nomeProduto = nomeProduto.substring(0, (nomeProduto.length - 4)); //remove o <br> do final da string
            var idProduto = document.getElementsByTagName("p")[2].innerHTML.trim();
            var posInicial = nomeProduto.lastIndexOf(" - ") + 3; //adicionado 3 para pegar a posição do primeiro digito ao invés da primeira posição do match
            var posFinal = nomeProduto.length;
            var codProduto = nomeProduto.substring(posInicial, posFinal); //pega o codigo do produto
            //acha o produto no storage do chrome
            var produto = result.produtos.find(x => x.Id == idProduto);
            console.log(produto);

            //procura o produto na Lista de produtos não selecionados 
            (function loopVariacoes(i) {
                var tabela = document.getElementsByTagName("tbody")[0].rows;
                if (tabela[i].innerText.includes(codProduto)) {
                    //aperta o botão de selecionar
                    tabela[i].children[0].children[4].click()

                    //aguarda MAIS um pouco a tela carregar
                    setTimeout(function() {
                        var variacoes = document.getElementById("scroll-box-variants").children[0].children[0]
                        variacoes = variacoes.rows;

                        if (variacoes.length != 0) {
                            //cicla para achar o certo
                            (function loopSecundario(j, iAux) {
                                //tr > td > cor. Exemplo > "Cor:Preto"
                                var corVariacao = variacoes[j].children[0].children[0].innerHTML;

                                //tr > td > tamanho. Exemplo > "Tamanho:g"
                                var tamanhoVariacao = variacoes[j].children[0].children[1].innerHTML;

                                //SWITCH PARA TRATAR CORES ERRADAS
                                switch (corVariacao) {
                                    case "Cor:BRANCA":
                                        corVariacao = "Cor:Branco";
                                        break;
                                    case "Cor:AMARELA":
                                        corVariacao = "Cor:Amarelo";
                                        break;
                                    case "Cor:UNICA": //se for cor unica tanto faz
                                        corVariacao = "Cor:" + produto.Color;
                                        break;
                                    case "Cor:VERMELHA":
                                        corVariacao = "Cor:Vermelho"
                                    case "Cor:AJUL JEANS":
                                        corVariacao = "Cor:Azul"
                                        break;
                                    case "Cor:JADE":
                                        corVariacao = "Cor:Verde"
                                        break;
                                }
                                if (corVariacao.toUpperCase() === ("Cor:" + produto.Color).toUpperCase() && tamanhoVariacao.toUpperCase() === ("Tamanho:" + produto.Variation).toUpperCase()) {
                                    //clica no botão selecionar
                                    variacoes[j].children[0].children[2].click();
                                    //clica no salvar
                                    setTimeout(function() {
                                        document.getElementById("btn-associate-product").click();
                                        //clica no cancelar caso já estiver associado ou der algum outro erro
                                        setTimeout(function() { document.getElementsByClassName("ls-btn ls-btn-default")[0].click() }, 500)
                                    }, 200)

                                } else {
                                    //nao achou entao continua o loop
                                    j++
                                    if (j < variacoes.length) {
                                        loopSecundario(j, iAux); //chama a função de novo
                                    } else {
                                        document.getElementsByClassName("ls-float-right remove-product ls-btn-xs ls-btn-danger")[0].click();
                                        //se não achou nada, volta para antes
                                        setTimeout(function() {
                                            iAux++;
                                            loopVariacoes(iAux);
                                        }, 500);
                                    }

                                }
                            })(0, i);
                        } else {
                            document.getElementsByClassName("ls-float-right remove-product ls-btn-xs ls-btn-danger")[0].click();
                            //se não achou nada, volta para antes
                            setTimeout(function() {
                                i++;
                                loopVariacoes(i);
                            }, 200);
                        }
                        console.log("achou nada");
                    }, 1000);
                } else {
                    //continua o loop
                    i++;
                    if (i < tabela.length) {
                        loopVariacoes(i);
                    } else {
                        //se rodou tudo e não achou, clica no voltar
                        document.getElementsByClassName("ls-btn ls-btn-default")[0].click()
                    }
                }
            })(0);
        });
    }
});
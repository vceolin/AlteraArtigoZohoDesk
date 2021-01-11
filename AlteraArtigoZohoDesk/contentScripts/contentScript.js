const intervaloTempo = 1000; //Altere esse valor para mudar de quanto em quanto tempo o método retirarLabel será chamado
console.log("############### Rodou!");
setTimeout(clicarDropDown, intervaloTempo); //primeira instrução

function clicarDropDown()
{
    var dropdown = document.querySelector('[editor-command="insertoptions"]');

    if(dropdown != null)
    {
        console.log("############### DropDown encontrado!");
        dropdown.click();
        setTimeout(clicarEditHtml, intervaloTempo);
    }
    else //se for nulo tenta novamente em 1 segundo
    {
        setTimeout(clicarDropDown, intervaloTempo);
    }
}

function clicarEditHtml()
{
    var edit = document.querySelector('[data-insertoptions="edithtml"]');
    if(edit != null)
    {
        console.log("############### Botão editar encontrado!");
        edit.click();
        setTimeout(executarReplace, intervaloTempo);
    }
    else //se for nulo volta para o clicar dropDown
    {
        /*
        é necessário voltar para o clicar dropDown pois às vezes ele é encontrado
        antes de ser totalmente carregado, então ao clicar nele não acontece nada e,
        portanto, não carrega o botão "edit"
        */
        setTimeout(clicarDropDown, intervaloTempo);
    }
    
}

function executarReplace()
{
    document.getElementsByClassName("ze_ed_txtarea")[0].value = document.getElementsByClassName("ze_ed_txtarea")[0].value.replaceAll("suporte.groupsoftware.com.br", "desk.zoho.com");
    console.log("############### Alteração realizada!");
    setTimeout(clicarSalvar, intervaloTempo);
}

function clicarSalvar()
{
    document.getElementById("zdeditor_htmlview_insert").click();
    console.log("############### Botão salvar clicado!");
    setTimeout(clicarPublicar, intervaloTempo);
}

function clicarPublicar()
{
    var publicar = document.getElementById("publish_btn")
    if(publicar != null)
    {
        console.log("############### Botão publicar encontrado!");
        publicar.click();
    }
    else //se for nulo tenta novamente em 1 segundo
    {
        setTimeout(clicarPublicar, intervaloTempo);
    }
}
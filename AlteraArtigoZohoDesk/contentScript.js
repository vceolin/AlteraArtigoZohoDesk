const intervaloTempo = 1000; //Altere esse valor para mudar de quanto em quanto tempo o método retirarLabel será chamado
console.log("############### Rodou!");

function clicarDropDown()
{
    var dropdown = document.querySelector('[editor-command="insertoptions"]');

    if(dropdown != null)
    {
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
        edit.click();
        setTimeout(executarReplace, intervaloTempo);
    }
    else
    {
        setTimeout(clicarEditHtml, intervaloTempo);
    }
    
}

function executarReplace()
{
    document.getElementsByClassName("ze_ed_txtarea")[0].value = document.getElementsByClassName("ze_ed_txtarea")[0].value.replaceAll("suporte.groupsoftware.com.br", "desk.zoho.com");
    setTimeout(clicarSalvar, intervaloTempo);
}

function clicarSalvar()
{
    document.getElementById("zdeditor_htmlview_insert").click();
    setTimeout(clicarPublicar, intervaloTempo);
}

function clicarPublicar()
{
    document.getElementById("publish_btn").click();
}

setTimeout(clicarDropDown, intervaloTempo);
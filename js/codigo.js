$(function(){
	//alert("cargado");
	iniciar();

    function iniciar(){
        var caja;
        $($("#completable input")).each(function(index){
            caja = $(this);
            caja.attr("class", "" );
            caja.attr("size", caja.attr("data-respuesta").length + 2);
            caja.focus(function(e){
                console.log($(this).attr("data-respuesta"));
                $(this).attr("class", "");
            });
        });
    }
    var uiDialogo = $("#dialog");
    uiDialogo.dialog({
        title:"Mensaje",
        modal:true,
        show:"slideDown",
        hide:"slideUp",
        autoOpen:false,
        buttons: [
            {
                text: "Aceptar",
                icons: {
                    primary: "ui-icon-check"
                },
                click: function() {
                    $(this).dialog( "close" );
                }
            }
        ]
    });

    $("#btnCalificar").click(revisar);
    $("#btnResetear").click(reiniciar);
    function revisar(){
        var caja;
        var buenas = 0;
        var total = $("#completable input").length;
        var mensajeFinal = "";
        $($("#completable input")).each(function(index){
            caja = $(this);
            if(caja.val() != ""){
                if(quitarAcentos(caja.attr("data-respuesta")) == quitarAcentos(caja.val())){
                    caja.attr("class", "correcto" );
                    caja.prop('disabled', true);
                    caja.val(caja.attr("data-respuesta"));
                    ++buenas;
                } else {
                    caja.attr("class", "incorrecto" );
                }
            } else {
                mensajeFinal = "Por favor llena todos los campos de texto";
            }
        });
        if(mensajeFinal == ""){
            if(buenas === total){
                mensajeFinal = "¡Excelente!";
            } else if(buenas === total-1){
                mensajeFinal = "¡Bien!";
            } else {
                mensajeFinal = "Revisa nuevamente el tema.";
            }
            retroalimentar(mensajeFinal+"<br/>Obtuviste <b>"+buenas+"</b> de <b>"+total+"</b>.");
        } else {
            retroalimentar(mensajeFinal);
        }

    }
    function retroalimentar(cadena){
        //$('#retroalimentacion').html(cadena);
        uiDialogo.html(cadena).dialog( "option", "title", "Mensaje" ).dialog("open");
    }
    function quitarAcentos(str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
        // remove accents, swap ñ for n, etc
        var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to   = "aaaaeeeeiiiioooouuuunc------";
        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes
        return str;
    }
    function reiniciar(){
        var caja;
        $("#completable input").each(function(index){
            caja = $(this);
            caja.val("");
            caja.attr("class", "" );
            caja.prop('disabled', false);
        });
    }

});
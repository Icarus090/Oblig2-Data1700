const orderList = [];

function showOrders() {
    $.get("/getOrders", function (orders) {
        let output = "<table><tr>" +
            "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th>" +
            "<th>Telefonnr</th><th>Epost</th>"+
            "</tr>";
        for (let order of orders){
            output += "<tr><td>" + order.film + "</td><td>" + order.antall + "</td><td>" + order.fornavn + "</td><td>" + order.etternavn + "</td><td>" + order.telefonnr + "</td><td>" + order.epost + "</td></tr>";
        }
        $("#Transaksjon").html(output);
    });
}

function createOrder() {
    const antallError = document.getElementById("ErrorAntall");
    const fornavnError = document.getElementById("ErrorFornavn");
    const etternavnError = document.getElementById("ErrorEtternavn");
    const telefonnrError = document.getElementById("ErrorTelefonnr");
    const epostError = document.getElementById("ErrorEpost");

    const film = $("#Film").val();
    const antall = $("#Antall").val();
    const fornavn = $("#Fornavn").val();
    const etternavn = $("#Etternavn").val();
    const telefonnr = $("#Telefonnr").val();
    const epost = $("#Epost").val();

    let isValid = true;

    if (antall === "") {
        antallError.style.visibility = "visible";
        isValid = false;
    } else {
        antallError.style.visibility = "hidden";
    }

    if (fornavn === "") {
        fornavnError.style.visibility = "visible";
        isValid = false;
    } else {
        fornavnError.style.visibility = "hidden";
    }

    if (etternavn === "") {
        etternavnError.style.visibility = "visible";
        isValid = false;
    } else {
        etternavnError.style.visibility = "hidden";
    }

    const telefonnrRegex = /^[0-9]{8}$/;
    if (telefonnr === "" || !telefonnrRegex.test(Number(telefonnr))) {
        telefonnrError.style.visibility = "visible";
        isValid = false;
    } else {
        telefonnrError.style.visibility = "hidden";
    }

    const epostRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (epost === "" || !epostRegex.test(epost)) {
        epostError.style.visibility = "visible";
        isValid = false;
    } else {
        epostError.style.visibility = "hidden";
    }

    if (isValid){
        const order = {
            film: film,
            antall: antall,
            fornavn: fornavn,
            etternavn: etternavn,
            telefonnr: telefonnr,
            epost: epost
        };

        $.post("/saveOrder", order, function (){
            $("#Film").val("0");
            $("#Antall").val("");
            $("#Fornavn").val("");
            $("#Etternavn").val("");
            $("#Telefonnr").val("");
            $("#Epost").val("");
            showOrders();
        })
    }
}

function deleteAllOrders() {
    $.get("/deleteOrders", function() {
        showOrders();
    });
}
let bilettRegister = [];

function hentBilettRegister() {
    $.get("http://localhost:8080/orders/getOrders", function(data) {
        bilettRegister = data;
        visBilettRegister();
    });
}

function visBilettRegister() {
    let ut = "<table><tr>" +
        "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th>" +
        "<th>Telefonnr</th><th>Epost</th>" +
        "</tr>";
    for (let p of bilettRegister) {
        ut += `<tr><td>${p.film}</td><td>${p.antall}</td><td>${p.fornavn}</td><td>${p.etternavn}</td><td>${p.telefonnr}</td><td>${p.epost}</td></tr>`;
    }
    document.getElementById("Transaksjon").innerHTML = ut;
}

function tickets() {
    const antallError = document.getElementById("ErrorAntall");
    const fornavnError = document.getElementById("ErrorFornavn");
    const etternavnError = document.getElementById("ErrorEtternavn");
    const telefonnrError = document.getElementById("ErrorTelefonnr");
    const epostError = document.getElementById("ErrorEpost");

    const film = document.getElementById("Film").value;
    const antall = document.getElementById("Antall").value;
    const fornavn = document.getElementById("Fornavn").value;
    const etternavn = document.getElementById("Etternavn").value;
    const telefonnr = document.getElementById("Telefonnr").value;
    const epost = document.getElementById("Epost").value;

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

    if (isValid) {
        const person = {
            film: film,
            antall: antall,
            fornavn: fornavn,
            etternavn: etternavn,
            telefonnr: telefonnr,
            epost: epost
        };

        $.post("http://localhost:8080/orders/saveOrder", person, function() {
            document.getElementById("Film").value = "0";
            document.getElementById("Antall").value = "";
            document.getElementById("Fornavn").value = "";
            document.getElementById("Etternavn").value = "";
            document.getElementById("Telefonnr").value = "";
            document.getElementById("Epost").value = "";
            hentBilettRegister();
        });
    }
}

function clearBilettRegister() {
    $.ajax({
        url: 'http://localhost:8080/orders/deleteOrders',
        type: 'DELETE',
        success: function() {
            hentBilettRegister();
        }
    });
}

hentBilettRegister();
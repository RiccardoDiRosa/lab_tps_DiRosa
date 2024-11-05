<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Anagrafica</title>
</head>
<body>

<h1>Anagrafica</h1>
<table id="tabella">
    <thead>
        <tr>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Età</th>
            <th>Indirizzo</th>
            <th>Citta</th>
            <th>Numero</th>
        </tr>
    </thead>
    <tbody id="tab">

    </tbody>
</table>

<script>
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'anagrafica.json', true); 
    var tbody = document.getElementById("tab");
    var arr=["nome","cognome","eta","indirizzo","citta","numero"];
    xhr.onload = function() {
        if (xhr.status === 200) {
            var persone = JSON.parse(xhr.responseText);
            for(persona in persone){
                var r=document.createElement("tr");
                for(key in arr){
                    var c=document.createElement("td");
                    let n=arr[key];
                    console.log(n)
                    c.innerText=persona[n];
                    r.appendChild(c);
                }
                tbody.appendChild(r);
            }
        }
    }

    xhr.send();
</script>

</body>
</html>
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function converterData(dataTelegram) {
    var data = new Date(dataTelegram * 1000);
    var hora = data.getHours();
    var minutos = data.getMinutes();
    var dia;
    if (data.getDate() < 10) {
        dia = "0" + data.getDate();
    } else {
        dia = data.getDate();
    }
    var mes;
    if ((data.getMonth() + 1) < 10) {
        mes = "0" + (data.getMonth() + 1);
    } else {
        mes = (data.getMonth() + 1);
    }
    var ano = data.getFullYear();
    var dataFormatada = dia + "/" + mes + "/" + ano + " - " + hora + ":" + minutos;
    return dataFormatada;
}

function sendText() {
    var xhr = new XMLHttpRequest();
    var textos = document.getElementById("textos");
    xhr.open('GET', 'https://api.telegram.org/bot263333913:AAGWdzoqn7JrjoNG7c-XaWqsOPiDzVO0-wo/getUpdates', true);
    xhr.onload = function(e) {
        if (this.status == 200) {

            var body = this.responseText;
            var jsonData = JSON.parse(body);
            var result = jsonData.result;

            if (result.length > 0) {
                var msg = "";
                for (var i = result.length - 1; i >= 0; i--) {					
                    var nome = result[i].message.from.first_name;
                    var text = result[i].message.text;
					var dataTel = result[i].message.date;
                    msg = "<p>" + msg + (converterData(dataTel) + " - " + nome + ": " + text) + "</p>";
                    textos.innerHTML = msg;
                }
            }


        }
    };

    xhr.send();
}
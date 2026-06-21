const API_URL =
"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/-21.2074%2C-44.9905?unitGroup=metric&key=Q8JXMJ9F427FNLKP8ANDGRWRV&contentType=json";

async function buscarClima() {

    try {

        const resposta = await fetch(API_URL);

        const dados = await resposta.json();

        console.log(dados);

        document.getElementById("local").innerHTML =
            dados.resolvedAddress;

        document.getElementById("temperatura").innerHTML =
            Math.round(
                dados.currentConditions.temp
            ) + "°C";

        document.getElementById("descricao").innerHTML =
            dados.currentConditions.conditions;

        document.getElementById("umidade").innerHTML =
            dados.currentConditions.humidity + "%";

        document.getElementById("vento").innerHTML =
            dados.currentConditions.windspeed + " km/h";

        const icone =
            dados.currentConditions.icon;

        document.getElementById("icone").src =
            `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/${icone}.png`;

        atualizarDataHora();

    } catch (erro) {

        console.error(erro);

        document.getElementById("local").innerHTML =
            "Erro ao carregar dados";

    }

}

function atualizarDataHora(){

    const agora = new Date();

    document.getElementById("data").innerHTML =
        agora.toLocaleDateString(
            "pt-BR",
            {
                weekday:"long",
                day:"2-digit",
                month:"long",
                year:"numeric"
            }
        );

    document.getElementById("hora").innerHTML =
        agora.toLocaleTimeString(
            "pt-BR"
        );
}

setInterval(
    atualizarDataHora,
    1000
);

buscarClima();
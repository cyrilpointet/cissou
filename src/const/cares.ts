/*
qte
text
nappy
none
duration
*/
export const careList = {
    milk: {
        title: "Tétées / biberons de lait",
        legend: "lait en ml (estimation)",
        type: "qte",
        chartType: "bar"
    },
    water: {
        title: "Biberons d'eau",
        legend: "eau en ml",
        type: "qte",
        chartType: "bar"
    },
    meal: {
        title: "Repas solides",
        legend: "Repas solides",
        type: "text",
        chartType: "bar"
    },
    nappy: {
        title: "Changes / couches",
        legend: "Changes / couches",
        type: "nappy",
        chartType: "bar"
    },
    bath: {
        title: "Bains / toilettes",
        legend: "Bains / toilettes",
        type: "none",
        chartType: "bar"
    },
    sleep: {
        title: "Sommeil / siestes",
        legend: "sommeil - durée en heure",
        type: "duration",
        chartType: "bar"
    },
    weight: {
        title: "Pesée",
        legend: "Poids en kg",
        type: "qte",
        chartType: "line"
    },
    size: {
        title: "Taille",
        legend: "taille en cm",
        type: "qte",
        chartType: "line"
    },
    temperature: {
        title: "Température",
        legend: "°C",
        type: "qte",
        chartType: "line"
    },
    comment: {
        title: "Commentaires et remarques",
        legend: "Commentaires et remarques",
        type: "text",
        chartType: "bar"
    },
}
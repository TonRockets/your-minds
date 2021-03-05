const { GoogleSpreadsheet } = require('google-spreadsheet');
const Credencial = require('./credencial.json');

//ID da planilha que estou acessando
const doc = new GoogleSpreadsheet('1s3cbKCOYwoQ06YMeMPUaItHGWhmYyGOYOOI8uWvWPOI')

//Conectando à planilha
const usarPlanilha = async () => {

    //Conectando na planilha com a credencial
    await doc.useServiceAccountAuth(Credencial)
    await doc.loadInfo()
    console.log(doc.title)

    //Escolhendo qual folha irei utilizar (no caso é a folha "configuração", 3º folha)
    const folha = doc.sheetsByIndex[2]

    //Carregando células desejadas
    await folha.loadCells('A3:B3')
    console.log(folha.title);

    //Fazendo um get nos valores das células já carregadas
    const celulaPromocional = folha.getCell(2, 0)
    console.log(celulaPromocional.value);
    const infoDaPromocao = folha.getCell(2, 1)
    console.log(infoDaPromocao.value);

}
usarPlanilha()

const cadastroDePromo = async () => {
    await doc.useServiceAccountAuth(Credencial)
    await doc.loadInfo()
    console.log(doc.title)

    const folha = doc.sheetsByIndex[1]

    folha.addRow({
        Nome: "Jeniffer Oliveira",
        Whatsapp: "(21) 987299471",
        'E-mail': "jeniffer.areneira@gmail.com",
        Promo: "10% DESC."
        })
}

cadastroDePromo()
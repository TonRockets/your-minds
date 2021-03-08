import { GoogleSpreadsheet } from 'google-spreadsheet'
import credencial from '../../credencial.json'

const doc = new GoogleSpreadsheet('1s3cbKCOYwoQ06YMeMPUaItHGWhmYyGOYOOI8uWvWPOI')

export default async (req, res) => {

    try {
        await doc.useServiceAccountAuth(credencial)
        await doc.loadInfo()

        const folha = doc.sheetsByIndex[2]
        await folha.loadCells('A3:B3')

        const celulaPromocional = folha.getCell(2, 0)
        const infoDaPromocao = folha.getCell(2, 1)

        res.end(JSON.stringify({
            mostrarCupom: celulaPromocional.value === 'VERDADEIRO',
            mensagem: infoDaPromocao.value
        }))

    } catch (error) {
        console.log('deu erro', error);
        res.end(JSON.stringify({
            mostrarCupom: false,
            mensagem: ''
        }))
    }
}



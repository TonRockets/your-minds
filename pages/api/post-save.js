import { GoogleSpreadsheet } from 'google-spreadsheet'
import credencial from '../../credencial.json'

const doc = new GoogleSpreadsheet('1s3cbKCOYwoQ06YMeMPUaItHGWhmYyGOYOOI8uWvWPOI')

export default async (req, res) => {

    try {
        await doc.useServiceAccountAuth(credencial)
        await doc.loadInfo()
        const folha = doc.sheetsByIndex[1]

        const data = JSON.parse(req.body)

        folha.addRow({
            Nome: data.Nome,
            Whatsapp: data.Whatsapp,
            Email: data.Email,
            Promo: "10% DESC."
        })
    
    res.end(req.body)

    } catch (error) {
        console.log(error);
        res.end('error')
    }
}
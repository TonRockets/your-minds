import { GoogleSpreadsheet } from 'google-spreadsheet'
import moment from 'moment'
import credencial from '../../credencial.json'

const doc = new GoogleSpreadsheet('1s3cbKCOYwoQ06YMeMPUaItHGWhmYyGOYOOI8uWvWPOI')

const geradorCupom = () => {
   const code = parseInt(moment().format('YYMMDDHHMMS')).toString(16)
   return code
}

export default async (req, res) => {

    try {
        await doc.useServiceAccountAuth(credencial)
        await doc.loadInfo()
        const folha = doc.sheetsByIndex[1]

        const data = JSON.parse(req.body)

        folha.addRow({
            Nome: data.Nome,
            Email: data.Email,
            Whatsapp: data.Whatsapp,
            Nota: 3, 
            Data: moment().format('DD/MM/YYYY, HH:MM'), 
            Cupom: geradorCupom(),
            Promo: "10% DESC."
        })
    
    res.end(req.body)

    } catch (error) {
        console.log(error);
        res.end('error')
    }
}
import { GoogleSpreadsheet } from "google-spreadsheet";
import moment from "moment";
import { regexBase64 } from "../../scripts/converts";

const doc = new GoogleSpreadsheet(process.env.SHEET_ID);

const geradorCupom = () => {
  const code = parseInt(moment().format("YYMMDDHHMMS"))
    .toString(16)
    .toUpperCase();
  return code;
};
export default async (req, res) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: regexBase64(process.env.SHEET_PRVT_KEY),
    });
    await doc.loadInfo();
    const folha = doc.sheetsByIndex[1];

    const sheetConfig = doc.sheetsByIndex[2];
    await sheetConfig.loadCells("A3:B3");

    const showPromoCell = sheetConfig.getCell(2, 0);
    const textCell = sheetConfig.getCell(2, 1);

    let showCupom = "";
    let showPromo = "";
    if (showPromoCell.value === "VERDADEIRO") {
      showCupom = geradorCupom();
      showPromo = textCell.value;
    }

    const data = JSON.parse(req.body);

    folha.addRow({
      Contato: data.Nome,
      Email: data.Email,
      Whatsapp: data.Whatsapp,
      Nota: parseInt(data.Nota),
      Data: moment().format("DD/MM/YYYY, HH:MM"),
      Cupom: geradorCupom(),
      Promo: textCell.value,
      Sugestao: data.Sugestao,
    });

    res.end(
      JSON.stringify({
        isPromo: showCupom !== "",
        showCupom,
        showPromo,
      })
    );
  } catch (error) {
    console.log(error);
    res.end("error");
  }
};

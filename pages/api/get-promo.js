import { GoogleSpreadsheet } from "google-spreadsheet";

const doc = new GoogleSpreadsheet(process.env.SHEET_ID);

export default async (req, res) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: process.env.SHEET_PRIVATE_KEY,
    });
    await doc.loadInfo();

    const folha = doc.sheetsByIndex[2];
    await folha.loadCells("A3:B3");

    const celulaPromocional = folha.getCell(2, 0);
    const infoDaPromocao = folha.getCell(2, 1);

    res.end(
      JSON.stringify({
        mostrarCupom: celulaPromocional.value === "VERDADEIRO",
        mensagem: infoDaPromocao.value,
      })
    );
  } catch (error) {
    console.log("deu erro", error);
    res.end(
      JSON.stringify({
        mostrarCupom: false,
        mensagem: "",
      })
    );
  }
};

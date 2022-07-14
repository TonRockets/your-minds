import { GoogleSpreadsheet } from "google-spreadsheet";
import moment from "moment";

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
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCIbjXfmkcqp5hY\nPcTlGMHk8JnzDzSl/QtsF4gvS/QWTZpD/Im1XfW8evJyCGamke1IDV8WqSt0rmfZ\nPyg+FL/enV1wHQBtmfgnDX3CDWSVF5Gbt7mmStPhOOOqQkm5RhutpSoeYSvD1z5+\nkCGoAVWFb96OmU5xkhGuCTC1eGEFYyKvhWsLBjd+YWfbz8I8SiJ5yveSG9LG4zJ0\nPRyGi/vM5IhrCx1P0LVVh3jAV78GGutMjL0wGqb1ZaXqm8xHn0QmQxeOsBFwQRwV\n0IJjQNYCXIH+NnWBQjfiUCH4PmKCIjEndPqabh355mgXFGLID3H8GJ0YiimuNwk1\nEaUkqVXxAgMBAAECggEABON7bLVjgsTEnGIs5vn5y1FPwuTdlxZieA9pItYO5f8G\niGnJKXA3ePcoLtaG5HBq1zUbc31rqt+rpZ4yEUoUYfleOsE0nbjG/+c82rI403An\nwzOpzv/0Ev2YiCZIlqn2He/C0ESHw+8M3zjHlp84SEgXlSErLWigLONJaoc+EBT4\nPSpzMU1VeWH2hpn//EJMFifDYcOCCNTOAopXIKWCZimIV5QH/ot9H7olh5jepb08\nIN4daWbmu9iL94brRKIMMPcxDRVfw5V4E0zdSvSTaEZ9JkauxuywrEhPCDaVZK/O\nLnaUjeoKxQ+BFtoHfBvCCHGG/El7Dt42fJ9Fm4Pj7QKBgQDA4D4++mcpcAtsTPAU\nwGOAOzJCVJLUjI/2eVi7M9ZhBfSyLA7OMnAGehcxQ+TQrdMGx3LWZ/8uLTJKQj2L\n6Hqij+CrpajMd8V1LAV6GeSkv53NldNqMWWmP6aFGu4PWneN+69L7QjubPhkixWB\nxkU6BvgWAUmDrx9v8zjUV/Y0QwKBgQC1FMo0H2PGpZAGLgx9q+ihioXKQkVj79BT\nj+AXmFX+q1PbNlUzneyxRK4GisJEJQ6szYhD7o4RB1yMmMFd9pCS3oJ4PDIXjY09\nhbmrwPZVlBSPn4eYIKToKKRh1ND3oHfZ+bmB2u8omUqDfWlGl7F+Umr5Njv1pbU6\n1Uu6JeQjuwKBgQC9KK+jcE1QlHR/iI1ErNJo5qWJ7Av8rMZcAfKF1nb/vKmZPCBh\nFZJMp9yrEl0MVA3MbjswD9pyXR0fOwvFdQEhAV5kuRltPmHHYp8UeuSEtvB6ueAY\nG84HWBFmJV0obZ8m/pmTKytBOln5sXYsSlmGaWNRoX2JymxYjP9FMedipQKBgQCQ\n3EzWXbYoGBKbnwMHFhtH/9T/9Pwl8pcqAhM3TPqefNjcqR6H6HKNbW/6c87tTOfs\nfY/hKFombUkwgJNQZAtMMw0UurMn/GldKjlamUd3NrssGmcS4CqMPtciHGn/bzPy\nAMDSjR590AO4JP+vJXMspypEq4pT/Xh51GB8TguwOQKBgQDAu8r4ggU/PM83qZ2h\nY3bJ4uzdjGkzIFZYu3GyyrITIy6iz83WV6Fv/HP0MKqald+l2+d0I7jVWWgc8PXo\nbVzo76MZ18dLiA8xYUCFHEiOxh+z+lp+QlbcA8LQ0gzX/KFHsb/xhsyr4298zV2m\n/yHWsLPA+cixK+ChNBhEuFohig==\n-----END PRIVATE KEY-----\n",
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

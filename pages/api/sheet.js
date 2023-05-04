import { google } from "googleapis";

export default function handler(req, res) {
    try {
        const client = new google.auth.JWT(
            process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, null, process.env.GOOGLE_PRIVATE_KEY, ['https://www.googleapis.com/auth/spreadsheets']
        );

        client.authorize(async function (err, tokens) {
            if (err) {
                return res.status(400).send(JSON.stringify({ error: true }));
            }

            const gsapi = google.sheets({ version: 'v4', auth: client });

            /*Your custom spreadsheetID and range here 
            range: Sheetname!FIRSTCOL:LASTCOL => 'A1:B' =  first 2 cols with all rows: */
            const opt = {
                spreadsheetId: process.env.GOOGLE_SHEET_ID,
                range: 'data!A1:B'
            };

            let data = await gsapi.spreadsheets.values.get(opt);
            return res.status(400).send(JSON.stringify({ error: false, data: data.data.values }));
        });
    } catch (e) {
        return res.status(400).send(JSON.stringify({ error: true, message: e.message }));
    }
}
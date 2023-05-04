import { google } from "googleapis";

export default function handler(req, res) {
    try {
        const { date, number } = req.body;

        const client = new google.auth.JWT(
            process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL, null, process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY, ['https://www.googleapis.com/auth/spreadsheets']
        );

        client.authorize(async function (err, tokens) {
            if (err) {
                return res.status(400).send(JSON.stringify({ error: true }));
            }

            const gsapi = google.sheets({ version: 'v4', auth: client });

            /*Your custom spreadsheetID and range here 
            range: Sheetname!FIRSTCOL:LASTCOL => 'A1:B' =  first 2 cols with all rows: */
            const opt = {
                spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID,
                range: 'data!A:B',
                valueInputOption: 'USER_ENTERED',
                insertDataOption: 'INSERT_ROWS',
                resource: {
                    "range": "data!A:B",
                    "values": [
                        [date, number]
                    ]
                }
            };

            let data = await gsapi.spreadsheets.values.append(opt);
            res.json(data);


        });
    } catch (e) {
        console.error(e);
        throw new Error(e).message
    }
}
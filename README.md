# nextjs-google-sheets-database

Use Google Sheets as a Database

Get a nice and short tutorial to create a project, account and how to connect your document:
https://www.youtube.com/watch?v=sRNQ-9DVsQU

https://console.cloud.google.com/
Create project
Create service account
Share your document with the created email account

Add a key
Download the json from cloud.google.com

The file should look like this with your data:
```
{
    "type": "service_account",
    "project_id": "XXX",
    "private_key_id": "XXX",
    "private_key": "XXX",
    "client_email": "XXX",
    "client_id": "112866XXX545980266840711",
    "auth_uri": "XXX",
    "token_uri": "XXXX",
    "auth_provider_x509_cert_url": "XXX",
    "client_x509_cert_url": "XXX"
  }
  
```


## SETUP .env to use the client in your project:
get the DocId from the url of your table in googleDocs (https://docs.google.com/spreadsheets/d/<YOURID>/edit#gid=0

client_email=<client_email from .json>
private_key=<private_key from .json>
SPREADSHEETID=<YOUR DOC ID>
NEXT_PUBLIC_ADMIN=<PASSWORD>

## Start the App
````
npm run dev
```

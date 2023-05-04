import Head from 'next/head'
import Table from '../components/table'
import Create from '../components/create'

export default function Home({ sheetdata }) {
  console.log(sheetdata);

  return (
    <>
      <Head>
        <title>NextJs for google Spreadsheets</title>
        <meta name="description" content="Read and write data from google Spreadsheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <h1>
          Items
        </h1>
        <Create />
        <Table sheetdata={sheetdata} />
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const req = await fetch('http://localhost:3000/api/sheet');
  const res = await req.json();

  return {
    props: {
      sheetdata: res.data
    }
  }
}
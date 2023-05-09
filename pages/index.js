import Head from 'next/head'
import Table from '../components/table'
import Comparison from '../components/comparison'
import Create from '../components/create'
import Graph from '../components/graph';

export default function Home({ sheetdata }) {

  return (
    <>
      <Head>
        <title>NextJs for google Spreadsheets - example Gas meter reading</title>
        <meta name="description" content="Read and write data from google Spreadsheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <h1>
          Gaszählerstände
        </h1>

        <Comparison sheetdata={sheetdata} />
        <Graph sheetdata={sheetdata} />
        <Create />
        <Table sheetdata={sheetdata} />
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const req = await fetch(process.env.NEXT_PUBLIC_BASE + '/api/sheet');
  const res = await req.json();

  return {
    props: {
      sheetdata: res.data
    }
  }
}
import { useState } from "react";
import Head from 'next/head'
import Table from '../components/table'
import Comparison from '../components/comparison'
import Create from '../components/create'
import Graph from '../components/graph';
import de from "../lang/de.json";
import en from "../lang/en.json";

export default function Home({ sheetdata }) {
  const [lang, setLang] = useState('de');
  let content = de;

  if (lang === 'en') {
    content = en;
  }

  const handleLang = (event) => {
    let name = event.target.value;
    setLang(name);
  }
  
  return (
    <>
      <Head>
        <title>{content.title}</title>
        <meta name="description" content="Read and write data from google Spreadsheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <div className="languageSwitcher">
          <input className="radio" type="radio" name="lang" value="de" id="de" checked={lang === 'de' ? true : false} onChange={handleLang} />
          <label htmlFor="de">DE</label>

          <input className="radio" type="radio" name="lang" value="en" id="en" checked={lang === 'en' ? true : false} onChange={handleLang} />
          <label htmlFor="en">EN</label>
        </div>
        <h1>
          {content.headline}
        </h1>

        <Comparison sheetdata={sheetdata} content={content} />
        <Graph sheetdata={sheetdata} />
        <Create content={content} />
        <Table sheetdata={sheetdata} content={content} />
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
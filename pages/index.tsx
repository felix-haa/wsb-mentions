import { ChangeEvent, useState } from 'react'

import Head from 'next/head'
import { GetStaticProps } from 'next'

import styles from '../styles/Home.module.sass'

import Chart from '../components/Chart'
import { ChartDataInterface, WordInterface } from '../lib/types'

const Home = ({ words }: { words: WordInterface[] }): JSX.Element => {
  const [stock, setStock] = useState('aapl')

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const data: ChartDataInterface[] = words
    .find((element) => element.word === stock)!
    .mentions.slice()
    .reverse()
    .map((element) => {
      return {
        name: new Date(element.created_at).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
        }),
        [stock]: element.count,
      }
    })

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setStock(e.currentTarget.value)
  }

  return (
    <>
      <Head>
        <title>WSB Mentions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.wrapper}>
          <h1>WSB Mentions</h1>

          {/* eslint-disable-next-line jsx-a11y/no-onchange */}
          <select onChange={handleChange} className={styles.selector}>
            {words.map((word, index) => (
              <option key={index} value={word.word}>
                {word.word}
              </option>
            ))}
          </select>
        </div>

        <Chart data={data} dataKey={stock} className={styles.chart} />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const firstRes = await fetch(`${process.env.API_URL}words/?page=1`)
  const firstJson = await firstRes.json()
  const words: WordInterface[] = []
  const pages = Math.ceil(firstJson.count / 10)
  for (let i = 1; i <= pages; i++) {
    const res = await fetch(`${process.env.API_URL}words/?page=${i}`)
    const json = await res.json()
    json.results.forEach((result: WordInterface) => {
      words.push(result)
    })
  }

  return {
    props: {
      words,
    },
    revalidate: 10,
  }
}

export default Home

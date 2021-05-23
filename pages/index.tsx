import { useState } from 'react'

import Head from 'next/head'
import { GetStaticProps } from 'next'

import { isSameDay, sub } from 'date-fns'

import styles from '../styles/Home.module.sass'

import Chart from '../components/Chart'
import { WordInterface } from '../lib/types'

const Home = ({ words }: { words: WordInterface[] }): JSX.Element => {
  const [stock, setStock] = useState('aapl')
  const [range, setRange] = useState(30)

  let dates: Date[] = []
  for (let i = 0; i < range; i++) {
    dates = [...dates, sub(new Date(), { days: i })]
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const word: WordInterface = words.find((element) => element.word === stock)!

  const getCount = (word: WordInterface, day: Date): number => {
    const mention = word.mentions.find((mention) =>
      isSameDay(new Date(mention.created_at), day)
    )
    return mention === undefined ? 0 : mention.count
  }

  const data = dates
    .slice()
    .reverse()
    .map((day) => {
      return {
        name: day.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
        }),
        [stock]: getCount(word, day),
      }
    })

  return (
    <>
      <Head>
        <title>WSB Mentions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.wrapper}>
          <h1>WSB Mentions</h1>

          <select
            onChange={(e) => setStock(e.currentTarget.value)}
            className={styles.stockSelector}
          >
            {words.map((word, index) => (
              <option key={index} value={word.word}>
                {word.word}
              </option>
            ))}
          </select>

          <div className={styles.rangeSelector}>
            <button onClick={() => setRange(30)}>30d</button>
            <button onClick={() => setRange(60)}>60d</button>
            <button onClick={() => setRange(90)}>90d</button>
          </div>
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

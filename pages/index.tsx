/* eslint-disable jsx-a11y/no-onchange */

import Head from 'next/head'
import { GetStaticProps } from 'next'

import styles from '../styles/Home.module.sass'

import Chart from '../components/Chart'
import { ChartDataInterface, WordInterface } from '../lib/types'

const Home = ({ words }: { words: WordInterface[] }): JSX.Element => {
  const data: ChartDataInterface[] = words[0].mentions
    .slice()
    .reverse()
    .map((element) => {
      return {
        name: element.created_at,
        [words[0].word]: element.count,
      }
    })

  const handleChange = (): void => {
    console.log('selected')
    // TODO setState to selected ticker name
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>WSB Mentions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>WSB Mentions</h1>

        <select onChange={handleChange}>
          {words.map((word, index) => (
            <option key={index} value={word.word}>
              {word.word}
            </option>
          ))}
        </select>

        <Chart data={data} dataKey={words[0].word} />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const firstRes = await fetch(
    'https://subreddit-scraper.herokuapp.com/words/?page=1'
  )
  const firstJson = await firstRes.json()
  const words: WordInterface[] = []
  const pages = Math.ceil(firstJson.count / 10)
  for (let i = 1; i <= pages; i++) {
    const res = await fetch(
      `https://subreddit-scraper.herokuapp.com/words/?page=${i}`
    )
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

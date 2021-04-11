import Head from 'next/head'
import styles from '../styles/Home.module.sass'

const Home = (): JSX.Element => {
  const x = 10
  return (
    <div className={styles.container}>
      <Head>
        <title>WSB Mentions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Hello World</h1>
        <p>{x}</p>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}

export default Home

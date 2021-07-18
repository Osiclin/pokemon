import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon</title>
        <meta name="description" content="Details about pokemon characters" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to 
          <Link href="/">
            <a>
              <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" width={300} height={100} alt="pokemon logo" />
            </a>
          </Link>
        </h1>

        <p className={styles.description}>Your pokemon characters at your fingertips...</p>

        <div className={styles.grid1}>
          <h2>{data.name.toUpperCase()} PROFILE</h2>
          <ul>
            <li><h3>Name:</h3> <p>{data.name}</p></li>
            <li><h3>Height:</h3> <p>{data.height}</p></li>
            <li><h3>Weight:</h3> <p>{data.weight}</p></li>
            <li><h3>Abilities:</h3> <p>{data.abilities.map((item, index) => <p key={index}>{item.ability.name}</p>)}</p></li>
            <li><h3>Stats:</h3> <p>{data.stats.map((item, index) => <p key={index}>{item.stat.name} - {item.base_stat}</p>)}</p></li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ctx.query.id}`)
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}
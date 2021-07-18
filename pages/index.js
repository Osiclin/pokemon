import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home({ data }) {
  const router = useRouter()
  const [items, setPokemon] = useState({
    loading: false,
    pokemon: data,
    page: 1,
    offset: 0
  })

  const nextPage = async (n, p) => {
    setPokemon({...items, loading: true})
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${n + 20}&limit=20`)
    const data = await res.json()
    setPokemon({
      ...items,
      loading: false,
      pokemon: data,
      page: p + 1,
      offset: n + 20
    })
    window.scrollTo(0,0)
  }

  const previousPage = async (n, p) => {
    setPokemon({...items, loading: true})
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${n - 20}&limit=20`)
    const data = await res.json()
    setPokemon({
      ...items,
      loading: false,
      pokemon: data,
      page: p - 1,
      offset: n - 20
    })
    window.scrollTo(0,0)
  }

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

        <div className={styles.grid}>
          <div className={styles.details}>
            <h2>List of Characters</h2>
            <p>Total Characters: {items.pokemon.count}</p>
          </div>
            <ul>
          {
            !items.pokemon ? items.loading : items.pokemon.results.map((item, index) => <li key={index} className={styles.charList} onClick={() => {
              setPokemon({...items, loading: true})
              router.push(`/pokemon/${index + 1}`)
            }}>{item.name}</li>)
          }
            </ul>
        </div>

        <ul className={styles.pagination}>
          <li onClick={items.page == 1 ? () => {} : () => {
            previousPage(items.offset, items.page)
          }}>Previous</li>
          <li>{items.page}</li>
          <li onClick={items.page == items.pokemon.count ? () => {} : () => {
            nextPage(items.offset, items.page)
          }}>Next</li>
        </ul>
        {!items.loading ? '' : <div className={styles.loading}>Loading...</div>}
      </main>
    </div>
  )
}

export async function getServerSideProps() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon')
    const data = await res.json()

    return {
      props: {
        data
      }
    }
}

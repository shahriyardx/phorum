import Head from 'next/head'

const Metadata = ({ title }: { title: string }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Ultimate forum for all your thoughts" />
    </Head>
  )
}

export default Metadata

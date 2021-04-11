import '../styles/global.css';
import Header from '../components/header'
import { Auth0Provider } from "@auth0/auth0-react";

function MyApp({ Component, pageProps }) {

  return (
    <Auth0Provider
      domain="dev-84dzy0ia.us.auth0.com"
      clientId="Mbi373gamKKZBbD5cMzQJkrAOUtEeVGd"
      redirectUri={process.env.NEXT_PUBLIC_URL}>

      <div className='antialiased text-gray-700'>
        <Header />
        <main className='mt-6 mb-20'>
          <Component {...pageProps} />
        </main>
      </div>

    </Auth0Provider>
  )
}

export default MyApp
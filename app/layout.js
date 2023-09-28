
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';
import ToasterContext from '@components/ToasterContext';


export const metadata = {
  title: 'Promptopai',
  description: 'Discover & Share AI prompts',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
     <Provider>
     <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <ToasterContext/>
          <Nav/>
          {children}
          </main>
     </Provider>
      </body>
    </html>
  )
}

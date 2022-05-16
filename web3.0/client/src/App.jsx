import {Navbar,Welcome,Services,Footer,Transactions } from './components'

function App() {


  return (
    <div className='min-h-screen'>
      <div className=''>
        <Navbar/>
        <Welcome/>
      </div>
      <div>
        <Services/>
        <Transactions/>
        <Footer/>
      </div>
    </div>
  )
}

export default App;

import { CoinsPage } from './Features/Coins/Components'

function App() {

  return (
    <div className='w-full h-full min-h-screen mx-auto flex flex-col items-center p-5 md:p-10 lg:p-20 bg-gray-50'>
      <div className="bg-white w-full lg:max-w-2xl h-full rounded-lg">
        <CoinsPage />
      </div>
    </div>
  )
}

export default App

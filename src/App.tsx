import { CoinsPage } from './Features/Coins/Components'
import { Routes, Route} from 'react-router-dom';
import NotFound from './lib/Components/NotFound/NotFound';
import { useSelector } from 'react-redux';
import {useTemporaryError, useTemporaryMessages} from './lib/hooks/useToasts.hook';
import { useEffect } from 'react';
import AddHolding from './Features/Coins/Components/add.page';
import EditHolding from './Features/Coins/Components/Edit.page';
import CoinPage from './Features/Coins/Components/Coin.page';
import { InitialStateType } from './Features/Coins/redux/coins.slice';
import Toasts from './lib/Components/Toasts/Toasts';

function App() {
  const { error: coinsError, message:coinsMessage } = useSelector((state: any) => state.coins as InitialStateType);
  const [errors, triggerError] = useTemporaryError()
  const [messages, triggerMessage]= useTemporaryMessages()
  
  useEffect(() => {
    coinsError && triggerError?.(coinsError)
  }, [coinsError, ]);
  
  
  useEffect(() => {
    coinsMessage && triggerMessage?.(coinsMessage)
  }, [coinsMessage]);

  return (
    <div className='w-full h-full min-h-screen mx-auto flex flex-col items-center p-5 md:p-10 lg:p-20 bg-gray-50 relative'>
        {
          <Toasts errors={errors} messages={messages} />
        }
      <div className="bg-white w-full lg:max-w-2xl h-full rounded-lg ">
    
      <Routes>
        <Route path="/" element={<CoinsPage />} />
        <Route path="/:symbol" element={<CoinPage />} />
        <Route path="/add-holding" element={<AddHolding />} />
        <Route path="/edit-holding/:symbol" element={<EditHolding />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
        
      </div>
    </div>
  )
}

export default App

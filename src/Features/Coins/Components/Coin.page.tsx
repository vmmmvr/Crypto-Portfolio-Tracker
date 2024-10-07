import { Typography } from '@material-tailwind/react';
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { CustomButton } from '../../../lib/Components';
import { ArrowLeft } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoinInfo, InitialStateType } from '../redux/coins.slice';
import { formatNumber, missingPorperties } from '../../../lib/utils/utils';
import CryptoChart from '../../../lib/Components/CryptoChart/CryptoChart';

export default function CoinPage() {
    const { symbol } = useParams();
    const dispatch = useDispatch();
    const { coin, coinHistory } = useSelector((state: any) => state.coins as InitialStateType);

    useEffect(() => {
        symbol &&  dispatch(fetchCoinInfo({ symbol }))
    }, [symbol, dispatch]);
    return (
        <div className="min-h-full w-full p-4 md:p-6 lg:p-10 gap-5 flex flex-col">
            <div className="flex sm:flex-row  gap-5 w-full justify-between sm:items-center">
                <div className='flex flex-col  gap-1'>
                    {/* <img src="https://min-api.cryptocompare.com/data/media/44154182/tia.png" alt="" /> */}
                    <Typography {...missingPorperties} className='text-sm text-primary-text/70'># {coin?.CoinInfo?.Id}</Typography>
                    <div className='flex flex-col sm:flex-row items-start  sm:items-end gap-2'>
                        <Typography {...missingPorperties} variant="h5" className="text-3xl font-medium text-primary-main">
                            {symbol}
                        </Typography>
                        <Typography {...missingPorperties}>   {coin?.CoinInfo?.FullName} </Typography>
                    </div>
                </div>
                <Link to="/">
                    <CustomButton classes="">
                        <ArrowLeft size={18} /> Back
                    </CustomButton>
                </Link>
            </div>
            <div>
                {
                    coin?.ConversionInfo && (<div className='flex flex-col gap-2 text-sm bg-primary-50 p-4 rounded-lg '>
                        <div className=''>  <span className='font-medium  '>Supply :</span> <span>{formatNumber(coin?.ConversionInfo?.Supply)}</span></div>
                        <div>   <span className='font-medium  '>Total TopTier Volume 24H : </span> <span>{formatNumber(coin?.ConversionInfo?.TotalTopTierVolume24H)}</span></div>
                        <div><span className='font-medium  '>Total Volume 24H : </span> <span>{formatNumber(coin?.ConversionInfo?.TotalVolume24H)}</span></div>
                    </div>)
                }
                {(coinHistory && symbol) && <CryptoChart data={coinHistory} symbol={symbol} />}
            </div>
        </div>
    )
}

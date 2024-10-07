import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../../../lib/Components";
import {  Edit2, Plus } from 'react-feather';
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { fetchLocalCoins, InitialStateType } from "../redux/coins.slice";
import EmptyComponent from "../../../lib/Components/EmptyComponent/EmptyComponent";
import { Coin } from "../../../lib/interfaces/coins";
import { missingPorperties } from "../../../lib/utils/utils";

export default function CoinsPage() {
    const dispatch = useDispatch();
    const { coins } = useSelector((state:any) => state.coins as InitialStateType);


    useEffect(() => {
        coins === null && dispatch(fetchLocalCoins());  // Trigger the saga and state updates
    }, [coins, dispatch]);
    return <div className="min-h-full w-full p-4 md:p-6 lg:p-10 gap-5 flex flex-col">
        <div className=" flex sm:flex-row flex-col gap-5 w-full sm:justify-between sm:items-center ">
            <Typography {...missingPorperties} variant="h6" className="text-md font-medium text-primary-text">Crypto Portfolio</Typography>
            <Link to={"/add-holding"}><CustomButton classes=""><Plus size={18} /> Add New Holding</CustomButton></Link>
        </div>
        <div>
            {
                !coins || coins.length === 0 ? (
                    <EmptyComponent />
                ) : coins.map((coin: Coin) => (
                    <Link to={`/${coin.symbol}`}>
                        <div key={coin.id} className="bg-primary-50 p-3 my-5 flex flex-col gap-2 rounded-lg hover:bg-primary-200 cursor-pointer transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-start justify-between text-primary-text">
                                <Typography {...missingPorperties} variant="h4" className="text-primary-main text-lg sm:text-2xl">
                                    {coin.name} ({coin.symbol})
                                </Typography>
                                <div>
                                    <span className="text-primary-text text-xl font-medium">${coin.price}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-sm text-gray-600 font-medium">Quantity : {coin.quantity}</span>


                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 font-medium">Total : ${coin.total.toFixed(2)}</span>  <Link to={`/edit-holding/${coin.symbol}`}><Edit2 className="text-primary-600" size={16} /></Link>
                            </div>
                        </div>
                    </Link>
                ))
            }

        </div>
    </div>;
}

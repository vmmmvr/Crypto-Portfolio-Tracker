import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinsRequest } from "../redux/coins.slice";
import { CustomButton } from "../../../lib/Components";
import { Plus } from 'react-feather';
import { Typography } from "@material-tailwind/react";

export default function CoinsPage() {
    const dispatch = useDispatch();
    const { coins, loading, error } = useSelector((state) => state.coins);
    const coinsList = [
        {
            title: "Bitcoin (BTC)",
            quantity: "2.2",
            price: "$62,000",
            total: "$150,000",
        },
        {
            title: "Etherium (ETH)",
            quantity: "2.2",
            price: "$2,600",
            total: "$4,000",
        },
        {
            title: "AVALANCHE (AVAX)",
            quantity: "12342",
            price: "$28.00",
            total: "$534,000",
        },
        {
            title: "Bitcoin (BTC)",
            quantity: "2.2",
            price: "$62,000",
            total: "$150,000",
        },
        {
            title: "Bitcoin (BTC)",
            quantity: "2.2",
            price: "$62,000",
            total: "$150,000",
        },
        {
            title: "Etherium (ETH)",
            quantity: "2.2",
            price: "$2,600",
            total: "$4,000",
        },
        {
            title: "AVALANCHE (AVAX)",
            quantity: "12342",
            price: "$28.00",
            total: "$534,000",
        },
        {
            title: "Bitcoin (BTC)",
            quantity: "2.2",
            price: "$62,000",
            total: "$150,000",
        },
        {
            title: "Bitcoin (BTC)",
            quantity: "2.2",
            price: "$62,000",
            total: "$150,000",
        },
        {
            title: "Etherium (ETH)",
            quantity: "2.2",
            price: "$2,600",
            total: "$4,000",
        },
        {
            title: "AVALANCHE (AVAX)",
            quantity: "12342",
            price: "$28.00",
            total: "$534,000",
        },
        {
            title: "Bitcoin (BTC)",
            quantity: "2.2",
            price: "$62,000",
            total: "$150,000",
        },
    ]
    useEffect(() => {
        coins === null && dispatch(fetchCoinsRequest());  // Trigger the saga and state updates
    }, [coins, dispatch]);
    return <div className="min-h-full w-full p-4 md:p-6 lg:p-10 gap-5 flex flex-col">
        <div className=" flex sm:flex-row flex-col gap-5 w-full sm:justify-between sm:items-center ">
            <Typography variant="h6" className="text-md font-medium text-primary-text">Crypto Portfolio</Typography>
            <CustomButton onClick={() => console.log("add")} classes=""><Plus size={18} /> Add New Holding</CustomButton>
        </div>
        <div>
           {
            coinsList.map(coin => (
                <div  key={coin.title} className="bg-primary-50 p-3 my-5 flex flex-col gap-2 rounded-lg hover:bg-primary-200 cursor-pointer transition-all duration-300 transform hover:scale-105">
                <Typography variant="h4" className="text-primary-main text-lg sm:text-2xl">
                    {coin.title}
                </Typography>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-600 font-medium">Quantity : ${coin.quantity}</span>
                    <span className="text-sm text-gray-600 font-medium">
                        Current Price : {coin.price}
                    </span>
                    <span className="text-sm text-gray-600 font-medium">Total : {coin.total}</span>
                </div>
            </div>
            ))
           }

        </div>
    </div>;
}

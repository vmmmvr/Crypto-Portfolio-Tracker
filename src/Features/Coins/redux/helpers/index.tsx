import { Coin } from "../../../../lib/interfaces/coins";

export function calculateTotal(price: number, quantity: number) {
    return { total: price * quantity };
}

export function getCachedCoins() {
    const coins = localStorage.getItem("cryptoHoldings");

    if (!coins) return { coins: [] };
    return { coins: JSON.parse(coins) };
}

export function cacheNewCoins(cachedCoins: Coin[], coin: Coin, update: boolean): Coin[] | false {
    let index = cachedCoins.findIndex((cachedCoin) => cachedCoin.symbol === coin.symbol);
    if(index !== -1 && update === false) return false;
    
     if (index !== -1 && update === true) {
        // Update the existing coin
        cachedCoins[index] = coin;
    } else {
        // Add the new coin to the beginning of the array
        cachedCoins.unshift(coin);
    }
    // Store the updated array in localStorage
    localStorage.setItem("cryptoHoldings", JSON.stringify(cachedCoins));

    return cachedCoins;
}

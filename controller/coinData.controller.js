import CointData from "../models/coinData.models";


const fetchAndStoreCoinData =  async (req, res) => {
    try {
         const url = `https://api.coingecko.com/api/v3/simple/price?ids=${req.params.coinName}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true`;
        
         const response = await fetch(url, {
             method: "GET",
             headers: {
                 'content-type': 'application/json',
                 'x-cg-pro-api-key': 'CG-YquLaVRYKG4gywa5m9QtvTqL'
             }
         });
 
         if (!response) {
             return res.status(500).send("Failed to fetch data");
         }
 
         const tokenDetails = await response.json();
         const coinData = {
            name: req.params.coinName.toLowerCase(),
            price: tokenDetails[req.params.coinName].usd,
            marketCap: tokenDetails[req.params.coinName].usd_market_cap,
            volume_change_24hr: tokenDetails[req.params.coinName].usd_24h_vol,
         }
         return  coinData;
         
    } catch (error) {
         console.error(error);
         res.status(500).send("Internal server error");
    }
 }
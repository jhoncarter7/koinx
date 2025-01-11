import CointData from "../models/coinData.models.js";

const fetchAndStoreCoinData = async (coinName) => {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinName}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-cg-pro-api-key": "CG-YquLaVRYKG4gywa5m9QtvTqL",
      },
    });

    if (!response) {
      throw new Error(`Failed to fetch data for ${coinName}`);
    }

    const tokenDetails = await response.json();

    const coinDataDetails = {
      name: tokenDetails[0]?.id,
      price: tokenDetails[0]?.current_price || null,
      marketCap: tokenDetails[0]?.market_cap || null,
      volume_change_24hr: tokenDetails[0]?.total_volume || null,
    };
    if (tokenDetails) {
      const coin = new CointData(coinDataDetails);
      await coin.save();

      return coinDataDetails;
    }
  } catch (error) {
    console.error(`Error in fetchAndStoreCoinData: ${error.message}`);
  }
};

const saveCoinData = async (req, res) => {
  try {
    const coinData = await fetchAndStoreCoinData(req.params.id);

    console.log("coinData", coinData);
    return res.status(200).send(coinData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Failed to fetch data");
  }
};

const findDeviation = async (req, res) => {
  try {
    const coinName = req.params.id.toString();
    const dataList = await CointData.find({ name: req.params.id })
      .sort({ createdAt: -1 })
      .limit(100);

    const prices = dataList.map((item) => item.price);
    const mean = prices.reduce((acc, val) => acc + val, 0) / prices.length;
    const squaredDifferences = prices.map((price) => Math.pow(price - mean, 2));
    const variance =
      squaredDifferences.reduce((acc, val) => acc + val, 0) / prices.length;
    const standardDeviation = Math.sqrt(variance);

    console.log("Standard Deviation:", standardDeviation);
    return res.status(200).json(standardDeviation);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Failed to fetch data");
  }
};

export { fetchAndStoreCoinData, saveCoinData, findDeviation };

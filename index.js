require('dotenv').config();
const BinanceService = require('./service/binance.js');
const Binance = require('node-binance-api');

const binance = new Binance().options({
    APIKEY: process.env.BINANCE_API_KEY,
    APISECRET: process.env.BINANCE_API_SECRET,
    hedgeMode: true,
    test: true
});


// let websocketname = "btcusdt@trade";
// // let websocketname = "btcusdt@kline_15m";
// const websocket = binance.futuresSubscribe(websocketname, (e) => {
//     console.log(JSON.stringify(e.p));
// });


const start = async () => {
    let res = await binance.futuresMarketBuy("btcusdt", 0.01);
    console.log(res);
    res = await binance.futuresMarketSell("btcusdt", 0.01, { positionSide: "LONG" });
    console.log(res);
}

const binanceService = new BinanceService('btcusdt');
const websocketTrade = binanceService.listen('trade', (e) => {
    console.log(e.p);
});


// start();
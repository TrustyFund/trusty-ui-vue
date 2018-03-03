import axios from 'axios';


async function getStats(fromSymbol) {
  const statsQuery = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${fromSymbol}&tsyms=USD&e=CCCAGG`;
  const nowHourinMS = Date.now();
  const nowHourQuery = `https://min-api.cryptocompare.com/data/histohour?fsym=${fromSymbol}&tsym=USD&limit=1&aggregate=1&toTs=${nowHourinMS}`;
  try {
    const statsResponse = await axios.get(statsQuery);
    const nowResponse = await axios.get(nowHourQuery);

    if (statsResponse.data.Response !== 'Error' && nowResponse.data.Response !== 'Error') {
      const total24 = statsResponse.data.DISPLAY[fromSymbol].USD.TOTALVOLUME24HTO;
      const marketcap = statsResponse.data.DISPLAY[fromSymbol].USD.MKTCAP;
      const price = statsResponse.data.DISPLAY[fromSymbol].USD.PRICE;
      const change24Percent = statsResponse.data.DISPLAY[fromSymbol].USD.CHANGEPCT24HOUR;

      const { close, open } = nowResponse.data.Data[1];
      let hourDivision;
      let side;

      if (close > open) {
        side = '+';
        hourDivision = close / open;
      } else {
        side = '-';
        hourDivision = open / close;
      }

      const changeHourPercent = side + hourDivision.toFixed(2);
      const stats = {
        total24, marketcap, price, change24Percent, changeHourPercent
      };
      return {
        success: true,
        data: stats
      };
    }
    return {
      success: false,
      error: statsResponse.data.Message
    };
  } catch (error) {
    const result = {
      success: false,
      error
    };
    return result;
  }
}


export default { getStats };

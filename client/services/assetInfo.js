/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getStats"] }] */
import axios from 'axios';
import dateFns from 'date-fns';

class AssetInfo {
  static async initCoins() {
    const coinsQuery = 'https://min-api.cryptocompare.com/data/all/coinlist';
    const response = await axios.get(coinsQuery);
    if (response.status === 200) {
      return {
        success: true,
        data: response.data.Data
      };
    }
    return {
      success: false,
      message: 'no coins'
    };
  }


  async getSocialStats(assetSymbol) {
    if (!this.coins) {
      const coinsResult = await AssetInfo.initCoins();
      if (coinsResult.success) {
        this.coins = coinsResult.data;
      } else {
        return coinsResult;
      }
    }
    const coinId = this.coins[assetSymbol].Id;
    const server = 'http://localhost:3000/';
    const socialQuery = server + `socialstats/?id=${coinId}`;
    try {
      const socialStats = await axios.get(socialQuery);
      if (socialStats.data.Response === 'Success') {
        const data = {
          symbol: socialStats.data.Data.General.Name,
          name: socialStats.data.Data.General.CoinName,
          twitter: socialStats.data.Data.Twitter,
          reddit: socialStats.data.Data.Reddit,
          facebook: socialStats.data.Data.Facebook,
          code: socialStats.data.Data.CodeRepository.List.map(item => {
            return {
              url: item.url,
              lastUpdate: dateFns.format(new Date(item.last_update * 1000), 'MMMM DD YYYY HH:mm')
            };
          })
        };
        return {
          success: true,
          data
        };
      }
      return {
        success: false,
        error: socialStats.data.Message
      };
    } catch (error) {
      return {
        success: false,
        error
      };
    }
  }

  async getCoinSnapshot(assetSymbol) {
    if (!this.coins) {
      const coinsResult = await AssetInfo.initCoins();
      if (coinsResult.success) {
        this.coins = coinsResult.data;
      } else {
        return coinsResult;
      }
    }
    const coinId = this.coins[assetSymbol].Id;
    const server = 'http://localhost:3000/';
    const snapshotQuery = server + `coinsnapshotfullbyid/?id=${coinId}`;
    try {
      const snapshotStats = await axios.get(snapshotQuery);
      if (snapshotStats.data.Response === 'Success') {
        const data = {
          description: snapshotStats.data.Data.General.Description,
          features: snapshotStats.data.Data.General.Features,
          technology: snapshotStats.data.Data.General.Technology,
          totalSupply: snapshotStats.data.Data.General.TotalCoinSupply,
          algorithm: snapshotStats.data.Data.General.Algorithm,
          proofType: snapshotStats.data.Data.General.ProofType,
          startDate: snapshotStats.data.Data.General.StartDate,
          name: snapshotStats.data.Data.General.Name,
          ico: {
            status: snapshotStats.data.Data.ICO.Status,
            whitePaper: snapshotStats.data.Data.ICO.WhitePaper
          }
        };
        return {
          success: true,
          data
        };
      }
      return {
        success: false,
        error: snapshotStats.data.Message
      };
    } catch (error) {
      const result = {
        success: false,
        error
      };
      return result;
    }
  }

  async getStats(fromSymbol) {
    const statsQuery = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${fromSymbol}` +
'&tsyms=USD&e=CCCAGG';
    const nowHourinMS = Date.now();
    const nowHourQuery = `https://min-api.cryptocompare.com/data/histohour?fsym=${fromSymbol}` +
`&tsym=USD&limit=1&aggregate=1&toTs=${nowHourinMS}`;
    try {
      const statsResponse = await axios.get(statsQuery);
      const nowResponse = await axios.get(nowHourQuery);

      if (statsResponse.data.Response !== 'Error' && nowResponse.data.Response !== 'Error') {
        const total24 = statsResponse.data.DISPLAY[fromSymbol].USD.TOTALVOLUME24HTO;
        const marketcap = statsResponse.data.DISPLAY[fromSymbol].USD.MKTCAP;
        const price = statsResponse.data.DISPLAY[fromSymbol].USD.PRICE;
        const change24Percent = statsResponse.data.DISPLAY[fromSymbol].USD.CHANGEPCT24HOUR;
        const high24Hour = statsResponse.data.DISPLAY[fromSymbol].USD.HIGH24HOUR;
        const low24Hour = statsResponse.data.DISPLAY[fromSymbol].USD.LOW24HOUR;
        const vol24Hour = statsResponse.data.DISPLAY[fromSymbol].USD.VOLUME24HOUR;
        const open24Hour = statsResponse.data.DISPLAY[fromSymbol].USD.OPEN24HOUR;
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
          total24,
          marketcap,
          price,
          change24Percent,
          changeHourPercent,
          high24Hour,
          low24Hour,
          vol24Hour,
          open24Hour
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
}

export default new AssetInfo();


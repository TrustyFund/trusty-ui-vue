/* eslint class-methods-use-this: [
  "error", {
   "exceptMethods": ["filterFields"]
  }
 ] */
import axios from 'axios';
import dateFns from 'date-fns';

class AssetInfo {
  constructor() {
    this.cancelToken = axios.CancelToken;
  }

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
    const coinId = (this.coins[assetSymbol] && this.coins[assetSymbol].Id) || '';
    if (!coinId) {
      return {
        success: false,
        error: 'Coin not found'
      };
    }
    const socialQuery = 'https://proxy.trusty.fund/' +
      `socialstats/?id=${coinId}`;
    try {
      this.sourceSocial = this.cancelToken.source();
      const socialStats = await axios.get(socialQuery, {
        cancelToken: this.sourceSocial.token
      });
      if (socialStats.data.Response === 'Success') {
        const data = {
          symbol: socialStats.data.Data.General.Name,
          name: socialStats.data.Data.General.CoinName
        };
        if (socialStats.data.Data.Twitter.Points !== 0) {
          data.twitter = socialStats.data.Data.Twitter;
        }
        if (socialStats.data.Data.Reddit.Points !== 0) {
          data.reddit = socialStats.data.Data.Reddit;
        }
        if (socialStats.data.Data.Facebook.Points !== 0) {
          data.facebook = socialStats.data.Data.Facebook;
        }
        if (socialStats.data.Data.CodeRepository.List.length > 0) {
          data.code = socialStats.data.Data.CodeRepository.List.map(item => {
            return {
              url: item.url,
              lastUpdate: dateFns.format(new Date(item.last_update * 1000), 'MMMM DD YYYY HH:mm')
            };
          });
        }
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
      const result = {
        success: false,
        error
      };
      if (axios.isCancel(error)) {
        result.error = 'request canceled';
      } else {
        result.error = error;
      }
      return result;
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
    const coinId = (this.coins[assetSymbol] && this.coins[assetSymbol].Id) || '';
    if (!coinId) {
      return {
        success: false,
        error: 'Coin not found'
      };
    }
    const snapshotQuery = 'https://proxy.trusty.fund/' +
      `coinsnapshotfullbyid/?id=${coinId}`;
    try {
      this.sourceSnapshot = this.cancelToken.source();
      const snapshotStats = await axios.get(snapshotQuery, {
        cancelToken: this.sourceSnapshot.token
      });
      if (snapshotStats.data.Response === 'Success') {
        const technology = {
          technology: snapshotStats.data.Data.General.Technology,
          totalSupply: snapshotStats.data.Data.General.TotalCoinSupply,
          algorithm: snapshotStats.data.Data.General.Algorithm,
          proofType: snapshotStats.data.Data.General.ProofType,
          startDate: snapshotStats.data.Data.General.StartDate,
          name: snapshotStats.data.Data.General.Name,
        };
        const description = snapshotStats.data.Data.General.Description;
        const features = snapshotStats.data.Data.General.Features;
        const ico = this.filterFields(snapshotStats.data.Data.ICO);
        return {
          success: true,
          data: {
            description,
            features,
            technology,
            ico
          }
        };
      }
      return {
        success: false,
        error: snapshotStats.data.Message
      };
    } catch (error) {
      const result = {
        success: false,
        error: ''
      };
      if (axios.isCancel(error)) {
        result.error = 'request canceled';
      } else {
        result.error = error;
      }
      return result;
    }
  }

  filterFields(source) {
    Object.keys(source).forEach((key) => {
      if (key.includes('Date') && !(source[key] === 'N/A' || source[key] === '-')) {
        source[key] = dateFns.format(new Date(source[key] * 1000), 'MMMM DD YYYY HH:mm');
      }
      if (source[key] === 'N/A' || source[key] === '-' || key.includes('Link')) {
        delete source[key];
      }
    });
    return source;
  }

  async getStats(fromSymbol) {
    const statsQuery = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${fromSymbol}` +
'&tsyms=USD&e=CCCAGG';
    const nowHourinMS = Date.now();
    const nowHourQuery = `https://min-api.cryptocompare.com/data/histohour?fsym=${fromSymbol}` +
`&tsym=USD&limit=1&aggregate=1&toTs=${nowHourinMS}`;
    try {
      this.sourceStats = this.cancelToken.source();
      this.sourceNowHour = this.cancelToken.source();
      const statsResponse = await axios.get(statsQuery, {
        cancelToken: this.sourceStats.token
      });
      const nowResponse = await axios.get(nowHourQuery, {
        cancelToken: this.sourceNowHour.token
      });

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
        error: ''
      };
      if (axios.isCancel(error)) {
        result.error = 'request canceled';
      } else {
        result.error = error;
      }
      return result;
    }
  }

  cancelRequests() {
    if (this.sourceSnapshot) this.sourceSnapshot.cancel('canceled request');
    if (this.sourceSocial) this.sourceSocial.cancel('canceled request');
    if (this.sourceStats) this.sourceStats.cancel('canceled request');
    if (this.sourceNowHour) this.sourceNowHour.cancel('canceled request');
  }
}

export default new AssetInfo();


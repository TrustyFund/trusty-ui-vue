/*eslint-disable*/
/*Work in process*/
import { fetchCoins, fetchBridgeCoins, fetchCoinsSimple, getBackedCoins, getActiveWallets } from './methods';
import { blockTradesAPIs } from '../apiConfig';

const inProgress = {};

const GATEWAY_TIMEOUT = 10000;

const onGatewayTimeout = (dispatch, gateway) => {
  dispatch({ down: gateway });
};

export default class GatewayActions {
  constructor() {
    this.state = {};
  }

  fetchCoins({ backer = 'OPEN', url = undefined } = {}) {
    if (!inProgress['fetchCoins_' + backer]) {
      inProgress['fetchCoins_' + backer] = true;
      // return (dispatch) => {
      // let fetchCoinsTimeout = setTimeout(onGatewayTimeout.bind(null, dispatch, backer), GATEWAY_TIMEOUT);

      return Promise.all([
        fetchCoins(url),
        fetchBridgeCoins(blockTradesAPIs.BASE_OL),
        getActiveWallets(url)
      ]).then(result => {
        // clearTimeout(fetchCoinsTimeout);

        delete inProgress['fetchCoins_' + backer];
        const [coins, tradingPairs, wallets] = result;
        const backedCoins = getBackedCoins({ allCoins: coins, tradingPairs, backer }).filter(a => !!a.walletType);
        backedCoins.forEach(a => {
          a.isAvailable = wallets.indexOf(a.walletType) !== -1;
        });

        this.state = {
          coins,
          backedCoins,
          backer
        };
      });
      // };
    }
    return {};
  }

  fetchCoinsSimple({ backer = 'RUDEX', url = undefined } = {}) {
    if (!inProgress['fetchCoinsSimple_' + backer]) {
      inProgress['fetchCoinsSimple_' + backer] = true;
      return (dispatch) => {
        const fetchCoinsTimeout = setTimeout(onGatewayTimeout.bind(null, dispatch, backer), GATEWAY_TIMEOUT);
        fetchCoinsSimple(url)
          .then(coins => {
            clearTimeout(fetchCoinsTimeout);
            delete inProgress['fetchCoinsSimple_' + backer];

            dispatch({
              coins,
              backer
            });
          });
      };
    }
    return {};
  }

  fetchBridgeCoins(url = undefined) {
    if (!inProgress.fetchBridgeCoins) {
      inProgress.fetchBridgeCoins = true;
      return (dispatch) => {
        const fetchCoinsTimeout = setTimeout(onGatewayTimeout.bind(null, dispatch, 'TRADE'), GATEWAY_TIMEOUT);
        Promise.all([
          fetchCoins(url),
          fetchBridgeCoins(blockTradesAPIs.BASE),
          getActiveWallets(url)
        ]).then(result => {
          clearTimeout(fetchCoinsTimeout);
          delete inProgress.fetchBridgeCoins;
          const [coins, bridgeCoins, wallets] = result;
          dispatch({
            coins,
            bridgeCoins,
            wallets
          });
        });
      };
    }
    return {};
  }
}

/*eslint-disable*/

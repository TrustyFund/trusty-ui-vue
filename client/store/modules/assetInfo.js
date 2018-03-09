/* eslint max-len: ["error", { "ignoreStrings": true }] */

import AssetInfo from '@/services/assetInfo';

const FETCH_ASSET_STATS_REQUEST = 'FETCH_ASSET_STATS_REQUEST';
const FETCH_ASSET_STATS_COMPLETE = 'FETCH_ASSET_STATS_COMPLETE';
const FETCH_ASSET_STATS_ERROR = 'FETCH_ASSET_STATS_ERROR';

const FETCH_ASSET_SOCIAL_REQUEST = 'FETCH_ASSET_SOCIAL_REQUEST';
const FETCH_ASSET_SOCIAL_COMPLETE = 'FETCH_ASSET_SOCIAL_COMPLETE';
const FETCH_ASSET_SOCIAL_ERROR = 'FETCH_ASSET_SOCIAL_ERROR';

const FETCH_ASSET_SNAPSHOT_REQUEST = 'FETCH_ASSET_SNAPSHOT_REQUEST';
const FETCH_ASSET_SNAPSHOT_COMPLETE = 'FETCH_ASSET_SNAPSHOT_COMPLETE';
const FETCH_ASSET_SNAPSHOT_ERROR = 'FETCH_ASSET_SNAPSHOT_ERROR';

const statsStub = {
  total24: '$ 3,985.88 M',
  marketcap: '$ 191.36 B',
  price: '$ 11,325.0',
  change24Percent: '1.78',
  changeHourPercent: '+1.00'
};

const snapShotStub = {
  image: 'https://www.cryptocompare.com/media/19633/btc.png',
  description: '<p>Bitcoin uses peer-to-peer technology to operate with no central authority or banks; managing transactions and the issuing of bitcoins is carried out collectively by the network. Although other cryptocurrencies have come before, Bitcoin is the first decentralized cryptocurrency - Its reputation has spawned copies and evolution in the space.</p><p>With the largest variety of markets and the biggest value - having reached a peak of 18 billion USD - Bitcoin is here to stay. As with any new invention, there can be improvements or flaws in the initial model however the community and a team of dedicated developers are pushing to overcome any obstacle they come across. It is also the most traded cryptocurrency and one of the main entry points for all the other cryptocurrencies. The price is as unstable as always and it can go up or down by 10%-20% in a single day.</p><p>Bitcoin is an SHA-256 POW coin with 21,000,000 total minable coins. The block time is 10 minutes. See below for a full range of Bitcoin markets where you can trade US Dollars for Bitcoin, crypto to Bitcoin and many other fiat currencies too.</p><p>Learn about the history of Bitcoin <a href="https://fried.com/history-of-bitcoin/" target="_blank">here</a> and check out 50 crazy-fun facts about Bitcoin <a href="https://bitcoinplay.net/58-insane-facts-about-bitocin/" target="_blank">here</a>!</p>',
  features: '<p><strong>Mobile payments made easy</strong> Bitcoin on mobiles allows you to pay with a simple two step scan-and-pay. No need to sign up, swipe your card, type a PIN, or sign anything. All you need to receive Bitcoin payments is to display the QR code in your Bitcoin wallet app and let your friend scan your mobile, or touch the two phones together (using NFC radio technology).</p><p><strong>Security and control over your money</strong> Bitcoin transactions are secured by military grade cryptography. Nobody can charge you money or make a payment on your behalf. So long as you take the required steps to protect your wallet, Bitcoin can give you control over your money and a strong level of protection against many types of fraud.</p><p><strong>Works everywhere, anytime</strong> Just like with email, you don&#39;t need to ask your family to use the same software or the same service providers. Just let them stick to their own favorites. No problem there; they are all compatible as they use the same open technology. The Bitcoin network never sleeps, even on holidays!</p><p><strong>Fast international payments</strong> Sending bitcoins across borders is as easy as sending them across the street. There are no banks to make you wait three business days, no extra fees for making an international transfer, and no special limitations on the minimum or maximum amount you can send.</p><p><strong>Choose your own fees</strong> There is no fee to receive bitcoins, and many wallets let you control how large a fee to pay when spending. Most wallets have reasonable default fees, and higher fees can encourage faster confirmation of your transactions. Fees are unrelated to the amount transferred, so it&#39;s possible to send 100,000 bitcoins for the same fee it costs to send 1 bitcoin.</p><p><strong>Protect your identity</strong> With Bitcoin, there is no credit card number that some malicious actor can collect in order to impersonate you. In fact, it is even possible to send a payment without revealing your identity, almost just like with physical money. You should however take note that some effort can be required to protect your privacy.</p>',
  technology: '<p><strong>Balances - block chain</strong> The block chain is a shared public ledger on which the entire Bitcoin network relies. All confirmed transactions are included in the block chain. This way, Bitcoin wallets can calculate their spendable balance and new transactions can be verified to be spending bitcoins that are actually owned by the spender. The integrity and the chronological order of the block chain are enforced with cryptography.</p><p><strong>Transactions - private keys</strong> A transaction is a transfer of value between Bitcoin wallets that gets included in the block chain. Bitcoin wallets keep a secret piece of data called a private key or seed, which is used to sign transactions, providing a mathematical proof that they have come from the owner of the wallet. The signature also prevents the transaction from being altered by anybody once it has been issued. All transactions are broadcast between users and usually begin to be confirmed by the network in the following 10 minutes, through a process called mining.</p><p><strong>Processing - mining</strong> Mining is a distributed consensus system that is used to confirm waiting transactions by including them in the block chain. It enforces a chronological order in the block chain, protects the neutrality of the network, and allows different computers to agree on the state of the system. To be confirmed, transactions must be packed in a block that fits very strict cryptographic rules that will be verified by the network. These rules prevent previous blocks from being modified because doing so would invalidate all following blocks. Mining also creates the equivalent of a competitive lottery that prevents any individual from easily adding new blocks consecutively in the block chain. This way, no individuals can control what is included in the block chain or replace parts of the block chain to roll back their own spends.</p>',
  totalSupply: '21000000',
  algorithm: 'SHA256',
  proofType: 'PoW',
  startDate: '03/01/2009',
  ico: {
    status: 'N/A',
    whitePaper: '-'
  }
};

const socialStub = {
  symbol: 'BTC',
  name: 'Bitcoin',
  twitter:
   { following: '127',
     account_creation: '1313643968',
     name: 'Bitcoin',
     lists: 6385,
     statuses: 19554,
     favourites: '243',
     followers: 795372,
     link: 'https://twitter.com/bitcoin',
     Points: 827316 },
  reddit:
   { posts_per_hour: '6.86',
     comments_per_hour: '80.11',
     posts_per_day: '164.57',
     comments_per_day: 1922.56,
     name: 'Bitcoin',
     link: 'https://www.reddit.com/r/bitcoin/',
     active_users: 9521,
     community_creation: '1284042626',
     subscribers: 757570,
     Points: 789978 },
  facebook:
   { likes: 37290,
     link: 'https://www.facebook.com/bitcoins/',
     is_closed: 'false',
     talking_about: '150',
     name: 'Bitcoin P2P Cryptocurrency',
     Points: 37290 },
  code:
   [{ url: 'https://github.com/bitcoinjs/bitcoinjs-lib',
     lastUpdate: 'March 03 2018 15:35:' },
   { url: 'https://github.com/petertodd/python-bitcoinlib',
     lastUpdate: 'March 02 2018 17:13:' },
   { url: 'https://github.com/bitcoin/bitcoin',
     lastUpdate: 'March 03 2018 15:10:' },
   { url: 'https://github.com/bitcoinj/bitcoinj',
     lastUpdate: 'March 03 2018 12:59:' }]
};


const mutations = {
  [FETCH_ASSET_STATS_REQUEST](state) {
    state.penging = true;
  },
  [FETCH_ASSET_STATS_ERROR](state) {
    state.penging = false;
  },
  [FETCH_ASSET_STATS_COMPLETE](state, { stats }) {
    state.stats = stats;
    state.penging = false;
  },

  [FETCH_ASSET_SOCIAL_REQUEST](state) {
    state.penging = true;
  },
  [FETCH_ASSET_SOCIAL_ERROR](state) {
    state.penging = false;
  },
  [FETCH_ASSET_SOCIAL_COMPLETE](state, { social }) {
    state.social = social;
    state.penging = false;
  },

  [FETCH_ASSET_SNAPSHOT_REQUEST](state) {
    state.penging = true;
  },
  [FETCH_ASSET_SNAPSHOT_ERROR](state) {
    state.penging = false;
  },
  [FETCH_ASSET_SNAPSHOT_COMPLETE](state, { snapShot }) {
    state.snapShot = snapShot;
    state.penging = false;
  },
};

const actions = {
  async fetchStats({ commit }, assetSymbol) {
    commit(FETCH_ASSET_STATS_REQUEST);
    const result = await AssetInfo.getStats(assetSymbol);
    if (result.success) {
      commit(FETCH_ASSET_STATS_COMPLETE, { stats: result.data });
    } else {
      commit(FETCH_ASSET_STATS_ERROR);
    }
    return result;
  },

  async fetchSocial({ commit }, assetSymbol) {
    commit(FETCH_ASSET_SOCIAL_REQUEST);
    const result = await AssetInfo.getSocialStats(assetSymbol);
    if (result.success) {
      commit(FETCH_ASSET_SOCIAL_COMPLETE, { social: result.data });
    } else {
      commit(FETCH_ASSET_SOCIAL_ERROR);
    }
    return result;
  },

  async fetchSnapshot({ commit }, assetSymbol) {
    commit(FETCH_ASSET_SNAPSHOT_REQUEST);
    const result = await AssetInfo.getCoinSnapshot(assetSymbol);
    if (result.success) {
      commit(FETCH_ASSET_SNAPSHOT_COMPLETE, { snapShot: result.data });
    } else {
      commit(FETCH_ASSET_SNAPSHOT_ERROR);
    }
    return result;
  }
};

const getters = {
  getStats: state => state.stats,
  getSocial: state => state.social,
  getSnapShot: state => state.snapShot,
};


const initialState = {
  stats: statsStub,
  social: socialStub,
  snapShot: snapShotStub,
  penging: false,
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};


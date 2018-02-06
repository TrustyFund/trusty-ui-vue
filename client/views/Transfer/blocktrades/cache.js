// import WalletDb from 'stores/WalletDb';
/*eslint-disable */
/*Work in process*/
import ls from '@/utils/ls';

const ss = new ls('__bts__');

class BlockTradesDepositAddressCache {
  constructor() {
    // increment this to force generating new addresses for all mappings
    this.current_blocktrades_address_cache_version_string = '2';

    // let wallet = WalletDb.getWallet();
    // delete wallet.deposit_keys["blocktrades"];
    // delete wallet.deposit_keys["openledger"];
    // WalletDb._updateWallet();
  }

  getIndexForDepositKeyInExchange(account_name, input_coin_type, output_coin_type) {
    const args = [this.current_blocktrades_address_cache_version_string, account_name, input_coin_type, output_coin_type];
    return args.reduce((previous, current) => { return previous.concat('[', current, ']'); }, '');
  }

  // returns {"address": address, "memo": memo}, with a null memo if not applicable
  getCachedInputAddress(exchange_name, account_name, input_coin_type, output_coin_type) {
    // let wallet = WalletDb.getWallet();
    const wallet = null;

    const index = this.getIndexForDepositKeyInExchange(account_name, input_coin_type, output_coin_type);
    if (!wallet) {
      const deposit_keys = ss.get('deposit_keys', {});
      deposit_keys[exchange_name] = deposit_keys[exchange_name] || {};
      deposit_keys[exchange_name][index] = deposit_keys[exchange_name][index] || [];
      const number_of_keys = deposit_keys[exchange_name][index].length;
      if (number_of_keys) { return deposit_keys[exchange_name][index][number_of_keys - 1]; }
      return null;
    }
    wallet.deposit_keys = wallet.deposit_keys || {};
    wallet.deposit_keys[exchange_name] = wallet.deposit_keys[exchange_name] || {};
    wallet.deposit_keys[exchange_name][index] = wallet.deposit_keys[exchange_name][index] || [];

    const number_of_keys = wallet.deposit_keys[exchange_name][index].length;
    if (number_of_keys) { return wallet.deposit_keys[exchange_name][index][number_of_keys - 1]; }
    return null;
  }

  cacheInputAddress(exchange_name, account_name, input_coin_type, output_coin_type, address, memo) {
    if (!address) return;

    const index = this.getIndexForDepositKeyInExchange(account_name, input_coin_type, output_coin_type);

    const deposit_keys = ss.get('deposit_keys', {});
    deposit_keys[exchange_name] = deposit_keys[exchange_name] || {};
    deposit_keys[exchange_name][index] = deposit_keys[exchange_name][index] || [];
    deposit_keys[exchange_name][index].push({ address, memo });
    ss.set('deposit_keys', deposit_keys);
  }
} // BlockTradesDepositAddressCache

export default BlockTradesDepositAddressCache;

/*eslint-disable */


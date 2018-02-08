/*eslint-disable */
/*Work in process*/
import BlockTradesDepositAddressCache from '../utils/cache';
import { blockTradesAPIs } from "../apiConfig"


export default class BlockTrades {
  constructor(props) {
    this.refresh_interval = 2 * 60 * 1000; // update deposit limit/estimates every two minutes
    this.props = props;
    this.deposit_address_cache = new BlockTradesDepositAddressCache();

    this.coin_info_request_states = {
      request_in_progress: 0,
      request_complete: 1,
      request_failed: 2
    };

    this.estimation_directions = {
      output_from_input: 0,
      input_from_output: 1
    };

    this.state = {
      coin_symbol: 'btc',
      key_for_withdrawal_dialog: 'btc',
      supports_output_memos: '',
      url: blockTradesAPIs.BASE,
      error: null,

      // things that get displayed for deposits
      deposit_input_coin_type: null,
      deposit_output_coin_type: null,
      input_address_and_memo: null,
      deposit_estimated_input_amount: this.props.initial_deposit_estimated_input_amount || '1.0',
      deposit_estimated_output_amount: null,
      deposit_limit: null,
      deposit_error: null,
      failed_calculate_deposit: null,

      // things that get displayed for withdrawals
      withdraw_input_coin_type: null,
      withdraw_output_coin_type: null,
      withdraw_estimated_input_amount: this.props.initial_withdraw_estimated_input_amount || '1.0',
      withdraw_estimated_output_amount: null,
      withdraw_limit: null,
      withdraw_error: null,
      failed_calculate_withdraw: null,

      // things that get displayed for conversions
      conversion_input_coin_type: null,
      conversion_output_coin_type: null,
      conversion_estimated_input_amount: this.props.initial_conversion_estimated_input_amount || '1.0',
      conversion_estimated_output_amount: null,
      conversion_limit: null,
      conversion_error: null,
      failed_calculate_conversion: null,

      // input address-related
      coin_info_request_state: this.coin_info_request_states.request_in_progress,
      input_address_requests_in_progress: {},

      // estimate-related
      deposit_estimate_direction: this.estimation_directions.output_from_input,

      // deposit limit-related
      deposit_limit_cache: {},
      deposit_limit_requests_in_progress: {},

      // generic data from BlockTrades
      coins_by_type: null,
      allowed_mappings_for_deposit: null,
      allowed_mappings_for_withdraw: null,
      allowed_mappings_for_conversion: null,
      conversion_memo: null
    };

    //this.componentWillMount()

  }

  setState(object) {
    Object.keys(object).forEach((key, index) => {
      this.state[key] = object[key];
    });
  }

  getAndUpdateInputEstimate(deposit_withdraw_or_convert, input_coin_type, output_coin_type, output_amount) {
    if (this.unMounted) return;
    if (deposit_withdraw_or_convert == 'deposit') {
      this.setState({ failed_calculate_deposit: null });
    }
    if (deposit_withdraw_or_convert == 'withdraw') {
      this.setState({ failed_calculate_withdraw: null });
    }
    if (deposit_withdraw_or_convert == 'conversion') {
      this.setState({ failed_calculate_conversion: null });
    }

    let estimate_input_url = this.state.url +
      "/estimate-input-amount?outputAmount=" + encodeURIComponent(output_amount) +
      "&inputCoinType=" + encodeURIComponent(input_coin_type) +
      "&outputCoinType=" + encodeURIComponent(output_coin_type);
    let estimate_input_promise = fetch(estimate_input_url, { method: 'get', headers: new Headers({ "Accept": "application/json" }) })
      .then(response => response.json());
    estimate_input_promise.then(reply => {
      if (this.unMounted) return;

      console.assert(reply.inputCoinType == input_coin_type &&
        reply.outputCoinType == output_coin_type &&
        reply.outputAmount == output_amount,
        "unexpected reply from estimate-input-amount");
      if (reply.inputCoinType != input_coin_type ||
        reply.outputCoinType != output_coin_type ||
        reply.outputAmount != output_amount) {

        if (deposit_withdraw_or_convert == 'deposit') {
          this.setState({ failed_calculate_deposit: 'Failed to calculate' });
        }
        if (deposit_withdraw_or_convert == 'withdraw') {
          this.setState({ failed_calculate_withdraw: 'Failed to calculate' });
        }
        if (deposit_withdraw_or_convert == 'conversion') {
          this.setState({ failed_calculate_conversion: 'Failed to calculate' });
        }
      }

      if (this.state[deposit_withdraw_or_convert + "_input_coin_type"] == input_coin_type &&
        this.state[deposit_withdraw_or_convert + "_output_coin_type"] == output_coin_type &&
        this.state[deposit_withdraw_or_convert + "_estimated_output_amount"] == output_amount &&
        this.state[deposit_withdraw_or_convert + "_estimate_direction"] == this.estimation_directions.input_from_output)
        this.setState({
          [deposit_withdraw_or_convert + "_estimated_input_amount"]: reply.inputAmount, key_for_withdrawal_dialog: reply.inputAmount });
    }, error => {});

    return null;
  }


  cacheInputAddress(input_coin_type, output_coin_type, address, memo) {
    let account_name = this.props.accountName //this.props.account.get('name');
    this.deposit_address_cache.cacheInputAddress(this.props.gateway, account_name, input_coin_type, output_coin_type, address, memo);
  }

  getCachedOrGeneratedInputAddress(input_coin_type, output_coin_type) {

    // if we already have an address, just return it
    let cached_input_address_and_memo = this.getCachedInputAddress(input_coin_type, output_coin_type);
    if (cached_input_address_and_memo)
      return cached_input_address_and_memo;

    // if we've already asked for this address, return null, it will trigger a refresh when it completes
    this.state.input_address_requests_in_progress[input_coin_type] = this.state.input_address_requests_in_progress[input_coin_type] || {};
    if (this.state.input_address_requests_in_progress[input_coin_type][output_coin_type])
      return null;

    // else, no active request for this mapping, kick one off
    let body = JSON.stringify({
      inputCoinType: input_coin_type,
      outputCoinType: output_coin_type,
      outputAddress: this.props.accountName
    });

    this.state.input_address_requests_in_progress[input_coin_type][output_coin_type] = true;

    fetch(this.state.url + '/simple-api/initiate-trade', {
      method: 'post',
      headers: new Headers({ "Accept": "application/json", "Content-Type": "application/json" }),
      body: body
    }).then(reply => {
      reply.json().then(json => {
        console.assert(json.inputCoinType == input_coin_type, "unexpected reply from initiate-trade");
        console.assert(json.outputCoinType == output_coin_type, "unexpected reply from initiate-trade");
        if (json.inputCoinType != input_coin_type ||
          json.outputCoinType != output_coin_type)
          throw Error("unexpected reply from initiate-trade");
        this.cacheInputAddress(json.inputCoinType, json.outputCoinType, json.inputAddress, json.inputMemo);
        delete this.state.input_address_requests_in_progress[input_coin_type][output_coin_type];
        if (this.state.deposit_input_coin_type == json.inputCoinType &&
          this.state.deposit_output_coin_type == json.outputCoinType)
          this.setState({ input_address_and_memo: { "address": json.inputAddress, "memo": json.inputMemo } });
      }, error => {
        delete this.state.input_address_requests_in_progress[input_coin_type][output_coin_type];
        if (this.state.deposit_input_coin_type == input_coin_type &&
          this.state.deposit_output_coin_type == output_coin_type)
          this.setState({ input_address_and_memo: { "address": "error generating address", "memo": null } });
      })
    }, error => {
      delete this.state.input_address_requests_in_progress[input_coin_type][output_coin_type];
      if (this.state.deposit_input_coin_type == input_coin_type &&
        this.state.deposit_output_coin_type == output_coin_type)
        this.setState({ input_address_and_memo: { "address": "error generating address", "memo": null } });
    });
    return null;
  }



  urlConnection(checkUrl, state_coin_info) {
    this.setState({
      url: checkUrl
    });

    // get basic data from blocktrades
    let coin_types_url = checkUrl + "/coins";
    let coin_types_promise = fetch(coin_types_url, { method: 'get', headers: new Headers({ "Accept": "application/json" }) })
      .then(response => response.json());

    let wallet_types_url = checkUrl + "/wallets";
    let wallet_types_promise = fetch(wallet_types_url, { method: 'get', headers: new Headers({ "Accept": "application/json" }) })
      .then(response => response.json());

    let trading_pairs_url = checkUrl + "/trading-pairs";
    let trading_pairs_promise = fetch(trading_pairs_url, { method: 'get', headers: new Headers({ "Accept": "application/json" }) })
      .then(response => response.json());

    let active_wallets_url = checkUrl + "/active-wallets";
    let active_wallets_promise = fetch(active_wallets_url, { method: 'get', headers: new Headers({ "Accept": "application/json" }) })
      .then(response => response.json());

    return Promise.all([coin_types_promise, wallet_types_promise, trading_pairs_promise, active_wallets_promise])
      .then((json_responses) => {


        let [coin_types, wallet_types_reply, trading_pairs, active_wallets] = json_responses;

        // get quick access to coins by their types
        let coins_by_type = {};
        coin_types.forEach(coin_type => coins_by_type[coin_type.coinType] = coin_type);

        // determine which mappings we will display for deposits and withdrawals
        let allowed_mappings_for_deposit = {}; // all non-bts to bts
        let allowed_mappings_for_withdraw = {}; // all bts to non-bts
        let allowed_mappings_for_conversion = {}; // all bts to bts
        trading_pairs.forEach(pair => {
          let input_coin_info = coins_by_type[pair.inputCoinType];
          let output_coin_info = coins_by_type[pair.outputCoinType];

          // filter out pairs where one asset is a backed asset and the other is a backing asset,
          // those pairs rightly belong under the gateway section, not under the bridge section.
          if (input_coin_info.backingCoinType != pair.outputCoinType &&
            output_coin_info.backingCoinType != pair.inputCoinType && (input_coin_info.restricted == false) && (output_coin_info.restricted == false)) {
            // filter out mappings where one of the wallets is offline
            if (active_wallets.indexOf(input_coin_info.walletType) != -1 &&
              active_wallets.indexOf(output_coin_info.walletType) != -1) {
              if (input_coin_info.walletType != "bitshares2" &&
                output_coin_info.walletType == "bitshares2") {
                allowed_mappings_for_deposit[pair.inputCoinType] = allowed_mappings_for_deposit[pair.inputCoinType] || [];
                allowed_mappings_for_deposit[pair.inputCoinType].push(pair.outputCoinType);
              } else if (input_coin_info.walletType == "bitshares2" &&
                output_coin_info.walletType != "bitshares2") {
                allowed_mappings_for_withdraw[pair.inputCoinType] = allowed_mappings_for_withdraw[pair.inputCoinType] || [];
                allowed_mappings_for_withdraw[pair.inputCoinType].push(pair.outputCoinType);
              } else if (input_coin_info.walletType == "bitshares2" &&
                output_coin_info.walletType == "bitshares2") {
                allowed_mappings_for_conversion[pair.inputCoinType] = allowed_mappings_for_conversion[pair.inputCoinType] || [];
                allowed_mappings_for_conversion[pair.inputCoinType].push(pair.outputCoinType);
              }
            }
          }
        });

        // we can now set the input and output coin types
        let deposit_input_coin_type = null;
        let deposit_output_coin_type = null;
        let allowed_deposit_coin_types = Object.keys(allowed_mappings_for_deposit);
        allowed_deposit_coin_types.forEach(deposit_coin_type => { allowed_mappings_for_deposit[deposit_coin_type].sort(); });

        if (allowed_deposit_coin_types.length) {
          if (this.props.initial_deposit_input_coin_type &&
            this.props.initial_deposit_input_coin_type in allowed_mappings_for_deposit)
            deposit_input_coin_type = this.props.initial_deposit_input_coin_type;
          else
            deposit_input_coin_type = allowed_deposit_coin_types[0];
          let output_coin_types_for_this_input = allowed_mappings_for_deposit[deposit_input_coin_type];
          if (this.props.initial_deposit_output_coin_type &&
            output_coin_types_for_this_input.indexOf(this.props.initial_deposit_output_coin_type) != -1)
            deposit_output_coin_type = this.props.initial_deposit_output_coin_type;
          else
            deposit_output_coin_type = output_coin_types_for_this_input[0];
        }

        let withdraw_input_coin_type = null;
        let withdraw_output_coin_type = null;
        let conversion_input_coin_type = null;
        let conversion_output_coin_type = null;
        let allowed_withdraw_coin_types = Object.keys(allowed_mappings_for_withdraw);
        allowed_withdraw_coin_types.forEach(withdraw_coin_type => { allowed_mappings_for_withdraw[withdraw_coin_type].sort(); });

        if (allowed_withdraw_coin_types.length) {
          if (this.props.initial_withdraw_input_coin_type &&
            this.props.initial_withdraw_input_coin_type in allowed_mappings_for_withdraw)
            withdraw_input_coin_type = this.props.initial_withdraw_input_coin_type;
          else
            withdraw_input_coin_type = allowed_withdraw_coin_types[0];
          let output_coin_types_for_this_input = allowed_mappings_for_withdraw[withdraw_input_coin_type];
          if (this.props.initial_withdraw_output_coin_type &&
            output_coin_types_for_this_input.indexOf(this.props.initial_withdraw_output_coin_type) != -1)
            withdraw_output_coin_type = this.props.initial_withdraw_output_coin_type;
          else
            withdraw_output_coin_type = output_coin_types_for_this_input[0];
        }

        let allowed_conversion_coin_types = Object.keys(allowed_mappings_for_conversion);
        allowed_conversion_coin_types.forEach(conversion_coin_type => { allowed_mappings_for_conversion[conversion_coin_type].sort(); });

        if (allowed_conversion_coin_types.length) {
          if (this.props.initial_conversion_input_coin_type &&
            this.props.initial_conversion_input_coin_type in allowed_mappings_for_conversion)
            conversion_input_coin_type = this.props.initial_conversion_input_coin_type;
          else
            conversion_input_coin_type = allowed_conversion_coin_types[0];
          let output_coin_types_for_this_input = allowed_mappings_for_conversion[conversion_input_coin_type];
          if (this.props.initial_conversion_output_coin_type &&
            output_coin_types_for_this_input.indexOf(this.props.initial_conversion_output_coin_type) != -1)
            conversion_output_coin_type = this.props.initial_conversion_output_coin_type;
          else
            conversion_output_coin_type = output_coin_types_for_this_input[0];
        }

        let input_address_and_memo = this.getCachedOrGeneratedInputAddress(deposit_input_coin_type, deposit_output_coin_type);


        let deposit_limit = this.getCachedOrFreshDepositLimit("deposit", deposit_input_coin_type, deposit_output_coin_type);
        let deposit_estimated_output_amount = this.getAndUpdateOutputEstimate("deposit", deposit_input_coin_type, deposit_output_coin_type, this.state.deposit_estimated_input_amount);

        let withdraw_estimated_output_amount = this.getAndUpdateOutputEstimate("withdraw", withdraw_input_coin_type, withdraw_output_coin_type, this.state.withdraw_estimated_input_amount);
        let withdraw_limit = this.getCachedOrFreshDepositLimit("withdraw", withdraw_input_coin_type, withdraw_output_coin_type);

        let conversion_estimated_output_amount = this.getAndUpdateOutputEstimate("conversion", conversion_input_coin_type, conversion_output_coin_type, this.state.conversion_estimated_input_amount);
        let conversion_limit = this.getCachedOrFreshDepositLimit("conversion", conversion_input_coin_type, conversion_output_coin_type);

        if (this.unMounted) return;
        this.setState({
          coin_info_request_state: this.coin_info_request_states.request_complete,
          coins_by_type: coins_by_type,
          allowed_mappings_for_deposit: allowed_mappings_for_deposit,
          allowed_mappings_for_withdraw: allowed_mappings_for_withdraw,
          allowed_mappings_for_conversion: allowed_mappings_for_conversion,
          deposit_input_coin_type: deposit_input_coin_type,
          deposit_output_coin_type: deposit_output_coin_type,
          input_address_and_memo: input_address_and_memo,
          deposit_limit: deposit_limit,
          deposit_estimated_output_amount: deposit_estimated_output_amount,
          deposit_estimate_direction: this.estimation_directions.output_from_input,
          withdraw_input_coin_type: withdraw_input_coin_type,
          withdraw_output_coin_type: withdraw_output_coin_type,
          withdraw_limit: withdraw_limit,
          withdraw_estimated_output_amount: withdraw_estimated_output_amount,
          conversion_input_coin_type: conversion_input_coin_type,
          conversion_output_coin_type: conversion_output_coin_type,
          conversion_limit: conversion_limit,
          conversion_estimated_output_amount: conversion_estimated_output_amount,
          withdraw_estimate_direction: this.estimation_directions.output_from_input,
          conversion_estimate_direction: this.estimation_directions.output_from_input,
          supports_output_memos: coins_by_type['btc'].supportsOutputMemos
        });
      })
      .catch((error) => {
        this.setState({
          coin_info_request_state: state_coin_info,
          coins_by_type: null,
          allowed_mappings_for_deposit: null,
          allowed_mappings_for_withdraw: null,
          allowed_mappings_for_conversion: null
        });
      });
  }

  getAndUpdateOutputEstimate(deposit_withdraw_or_convert, input_coin_type, output_coin_type, input_amount) {
    if (this.unMounted) return;
    if (deposit_withdraw_or_convert == 'deposit') {
      this.setState({ failed_calculate_deposit: null });
    }
    if (deposit_withdraw_or_convert == 'withdraw') {
      this.setState({ failed_calculate_withdraw: null });
    }
    if (deposit_withdraw_or_convert == 'conversion') {
      this.setState({ failed_calculate_conversion: null });
    }

    let estimate_output_url = this.state.url +
      "/estimate-output-amount?inputAmount=" + encodeURIComponent(input_amount) +
      "&inputCoinType=" + encodeURIComponent(input_coin_type) +
      "&outputCoinType=" + encodeURIComponent(output_coin_type);
    let estimate_output_promise = fetch(estimate_output_url, { method: 'get', headers: new Headers({ "Accept": "application/json" }) })
      .then(response => response.json());
    estimate_output_promise.then(reply => {
      if (this.unMounted) return;
      // console.log("Reply: ", reply);
      if (reply.error) {
        if (this.state[deposit_withdraw_or_convert + "_input_coin_type"] == input_coin_type &&
          this.state[deposit_withdraw_or_convert + "_output_coin_type"] == output_coin_type &&
          this.state[deposit_withdraw_or_convert + "_estimated_input_amount"] == input_amount &&
          this.state[deposit_withdraw_or_convert + "_estimate_direction"] == this.estimation_directions.output_from_input) {
          let user_message = reply.error.message;

          if (deposit_withdraw_or_convert == 'deposit') {
            this.setState({ failed_calculate_deposit: 'Failed to calculate' });
          }
          if (deposit_withdraw_or_convert == 'withdraw') {
            this.setState({ failed_calculate_withdraw: 'Failed to calculate' });
          }
          if (deposit_withdraw_or_convert == 'conversion') {
            this.setState({ failed_calculate_conversion: 'Failed to calculate' });
          }

          let expected_prefix = "Internal Server Error: ";
          if (user_message.startsWith(expected_prefix))
            user_message = user_message.substr(expected_prefix.length);

          this.setState({
            [deposit_withdraw_or_convert + "_error"]: user_message
          });
        }
      } else {
        console.assert(reply.inputCoinType == input_coin_type &&
          reply.outputCoinType == output_coin_type &&
          reply.inputAmount == input_amount,
          "unexpected reply from estimate-output-amount");
        if (reply.inputCoinType != input_coin_type ||
          reply.outputCoinType != output_coin_type ||
          reply.inputAmount != input_amount)
          throw Error("unexpected reply from estimate-output-amount");
        if (this.state[deposit_withdraw_or_convert + "_input_coin_type"] == input_coin_type &&
          this.state[deposit_withdraw_or_convert + "_output_coin_type"] == output_coin_type &&
          this.state[deposit_withdraw_or_convert + "_estimated_input_amount"] == input_amount &&
          this.state[deposit_withdraw_or_convert + "_estimate_direction"] == this.estimation_directions.output_from_input)
          this.setState({
            [deposit_withdraw_or_convert + "_estimated_output_amount"]: reply.outputAmount,
            [deposit_withdraw_or_convert + "_error"]: null
          });
      }
    }, error => {
      alert("connection error")
    }).then(() => {
      this.setState({ withdraw_estimated_output_amount: this.props.changedCoinValue })
    });

    return null;
  }

  getCachedDepositLimit(input_coin_type, output_coin_type) {

    this.state.deposit_limit_cache[input_coin_type] = this.state.deposit_limit_cache[input_coin_type] || {};
    if (this.state.deposit_limit_cache[input_coin_type][output_coin_type]) {
      let deposit_limit_record = this.state.deposit_limit_cache[input_coin_type][output_coin_type];
      let cache_age = new Date() - deposit_limit_record.timestamp;
      if (cache_age < this.refresh_interval)
        return deposit_limit_record;
      delete this.state.deposit_limit_cache[input_coin_type][output_coin_type];
    }
    return null;
  }

  getCachedOrFreshDepositLimit(deposit_withdraw_or_convert, input_coin_type, output_coin_type) {
    let deposit_limit_record = this.getCachedDepositLimit(input_coin_type, output_coin_type);
    if (deposit_limit_record)
      return deposit_limit_record;

    this.state.deposit_limit_requests_in_progress[input_coin_type] = this.state.input_address_requests_in_progress[input_coin_type] || {};
    this.state.deposit_limit_requests_in_progress[input_coin_type][output_coin_type] = true;

    let deposit_limit_url = this.state.url +
      "/deposit-limits?inputCoinType=" + encodeURIComponent(input_coin_type) +
      "&outputCoinType=" + encodeURIComponent(output_coin_type);
    let deposit_limit_promise = fetch(deposit_limit_url, { method: 'get', headers: new Headers({ "Accept": "application/json" }) })
      .then(response => response.json());
    deposit_limit_promise.then(reply => {
      if (this.unMounted) return;
      console.assert(reply.inputCoinType == input_coin_type &&
        reply.outputCoinType == output_coin_type,
        "unexpected reply from deposit-limits");
      if (reply.inputCoinType != input_coin_type || reply.outputCoinType != output_coin_type)
        throw Error("unexpected reply from deposit-limits");
      let new_deposit_limit_record = {
        timestamp: new Date(),
        limit: reply.depositLimit
      };
      this.cacheDepositLimit(input_coin_type, output_coin_type, new_deposit_limit_record);
      delete this.state.deposit_limit_requests_in_progress[input_coin_type][output_coin_type];
      if (this.state[deposit_withdraw_or_convert + "_input_coin_type"] == input_coin_type &&
        this.state[deposit_withdraw_or_convert + "_output_coin_type"] == output_coin_type)
        this.setState({
          [deposit_withdraw_or_convert + "_limit"]: new_deposit_limit_record
        });
    }, error => {
      delete this.state.deposit_limit_requests_in_progress[input_coin_type][output_coin_type];
    });
    return null;
  }


  cacheDepositLimit(input_coin_type, output_coin_type, deposit_limit_record) {
    deposit_limit_record.timestamp = new Date();
    this.state.deposit_limit_cache[input_coin_type] = this.state.deposit_limit_cache[input_coin_type] || {};
    this.state.deposit_limit_cache[input_coin_type][output_coin_type] = deposit_limit_record;
  }

  componentWillMount() {

    // check api.blocktrades.us/v2
    const checkUrl = this.state.url;

    return this.urlConnection(checkUrl, 0).then(()=>{

      const coin_types_promisecheck = fetch(
          checkUrl + '/coins', { method: 'get', headers: new Headers({ Accept: 'application/json' }) }
        )
        .then(response => response.json());
      const trading_pairs_promisecheck = fetch(
          checkUrl + '/trading-pairs', { method: 'get', headers: new Headers({ Accept: 'application/json' }) }
        )
        .then(response => response.json());
      const active_wallets_promisecheck = fetch(
          checkUrl + '/active-wallets', { method: 'get', headers: new Headers({ Accept: 'application/json' }) }
        )
        .then(response => response.json());

      return Promise.all([coin_types_promisecheck, trading_pairs_promisecheck, active_wallets_promisecheck])
        .then((json_responses) => {
          const [coin_types, trading_pairs, active_wallets] = json_responses;
          const coins_by_type = {};
          coin_types.forEach(coin_type => coins_by_type[coin_type.coinType] = coin_type);
          trading_pairs.forEach(pair => {
            const input_coin_info = coins_by_type[pair.inputCoinType];
            const output_coin_info = coins_by_type[pair.outputCoinType];
            if ((input_coin_info.backingCoinType != pair.outputCoinType) && (output_coin_info.backingCoinType != pair.inputCoinType)) {
              if ((active_wallets.indexOf(input_coin_info.walletType) != -1) && (active_wallets.indexOf(output_coin_info.walletType) != -1)) {}
            }
          });
        })
        .catch((error) => {
          this.urlConnection('https://api.blocktrades.info/v2', 2);
          this.setState({
            coin_info_request_state: 0,
            coins_by_type: null,
            allowed_mappings_for_deposit: null,
            allowed_mappings_for_withdraw: null,
            allowed_mappings_for_conversion: null
          });
        });


    })
  }


  onInputCoinTypeChanged(deposit_withdraw_or_convert, value) {

    let estimated_input_output_amount = null;
    let estimated_input_output_amount_state = "_estimated_output_amount";
    let new_input_coin_type = value.toLowerCase();
    let possible_output_coin_types = this.state["allowed_mappings_for_" + deposit_withdraw_or_convert][new_input_coin_type];

    let new_output_coin_type = possible_output_coin_types[0];
    if (possible_output_coin_types.indexOf(this.state[deposit_withdraw_or_convert + "_output_coin_type"]) != -1)
      new_output_coin_type = this.state[deposit_withdraw_or_convert + "_output_coin_type"];

    let new_input_address_and_memo = this.state.input_address_and_memo;
    if (deposit_withdraw_or_convert == "deposit")
      new_input_address_and_memo = this.getCachedOrGeneratedInputAddress(new_input_coin_type, new_output_coin_type);
    let new_deposit_limit = this.getCachedOrFreshDepositLimit(deposit_withdraw_or_convert, new_input_coin_type, new_output_coin_type);

    if (!this.state[deposit_withdraw_or_convert + "_estimated_input_amount"]) {
      estimated_input_output_amount = this.getAndUpdateInputEstimate(deposit_withdraw_or_convert, new_input_coin_type, new_output_coin_type, this.state[deposit_withdraw_or_convert + "_estimated_output_amount"]);
      estimated_input_output_amount_state = "_estimated_input_amount";
    } else {
      estimated_input_output_amount = this.getAndUpdateOutputEstimate(deposit_withdraw_or_convert, new_input_coin_type, new_output_coin_type, this.state[deposit_withdraw_or_convert + "_estimated_input_amount"]);
    }

    if (deposit_withdraw_or_convert == "withdraw") {
      possible_output_coin_types.forEach(allowed_withdraw_output_coin_type => {
        if (new_output_coin_type === allowed_withdraw_output_coin_type) {
          this.setState({
            coin_symbol: new_input_coin_type + 'input',
            supports_output_memos: this.state.coins_by_type[allowed_withdraw_output_coin_type].supportsOutputMemos
          });
        }
      });
    }

    this.setState({
      [deposit_withdraw_or_convert + "_input_coin_type"]: new_input_coin_type,
      [deposit_withdraw_or_convert + "_output_coin_type"]: new_output_coin_type,
      input_address_and_memo: new_input_address_and_memo,
      [deposit_withdraw_or_convert + "_limit"]: new_deposit_limit,
      [deposit_withdraw_or_convert + estimated_input_output_amount_state]: estimated_input_output_amount,
      [deposit_withdraw_or_convert + "_estimate_direction"]: this.estimation_directions.output_from_input
    });
  }


  getCachedInputAddress(input_coin_type, output_coin_type, memo) {
    let account_name = this.props.accountName

    return this.deposit_address_cache.getCachedInputAddress(this.props.gateway, account_name, input_coin_type, output_coin_type);
  }

  // componentDidMount()

  // {
  //     this.update_timer = setInterval(this.updateEstimates.bind(this), this.refresh_interval);
  //     let isLocation = path => ~window.location.pathname.indexOf(path)
  //     if(isLocation("withdraw")) {
  //         this.triggerInputAmountChange("withdraw")
  //     }
  //     if(isLocation("deposit")){
  //         this.triggerInputAmountChange("deposit")
  //     }

  // }
}

/*eslint-disable */

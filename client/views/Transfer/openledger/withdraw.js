/*eslint-disable*///wip

import utils from '../vendor/utils';
//import AccountActions from 'actions/AccountActions';
import { validateAddress, WithdrawAddresses } from '../vendor/methods';
import { ChainStore } from 'bitsharesjs/es';
import { checkFeeStatusAsync, checkBalance } from '../vendor/trxHelper';
import { Asset } from '../vendor/MarketClasses';
import { debounce } from 'lodash';

export default class WithdrawModalBlocktrades {
  // static propTypes = {
  //     account: ChainTypes.ChainAccount.isRequired,
  //     issuer: ChainTypes.ChainAccount.isRequired,
  //     asset: ChainTypes.ChainAsset.isRequired,
  //     output_coin_name: PropTypes.string.isRequired,
  //     output_coin_symbol: PropTypes.string.isRequired,
  //     output_coin_type: PropTypes.string.isRequired,
  //     url: PropTypes.string,
  //     output_wallet_type: PropTypes.string,
  //     output_supports_memos: PropTypes.bool.isRequired,
  //     amount_to_withdraw: PropTypes.string,
  //     balance: ChainTypes.ChainObject
  // };

  constructor(props) {
    this.props = props;
    this.state = {
      withdraw_amount: this.props.amount_to_withdraw,
      withdraw_address: WithdrawAddresses.getLast(props.output_wallet_type),
      withdraw_address_check_in_progress: true,
      withdraw_address_is_valid: null,
      options_is_valid: false,
      confirmation_is_valid: false,
      withdraw_address_selected: WithdrawAddresses.getLast(props.output_wallet_type),
      memo: '',
      withdraw_address_first: true,
      empty_withdraw_value: false,
      from_account: props.account,
      fee_asset_id: '1.3.0',
      feeStatus: {}
    };


    this._validateAddress(this.state.withdraw_address, props);

    this._checkBalance = this._checkBalance.bind(this);
    this._updateFee = debounce(this._updateFee.bind(this), 250);
  }


  setState(object) {
    Object.keys(object).forEach((key, index) => {
      this.state[key] = object[key];
    });
  }

  componentWillMount() {
    this._updateFee();
    this._checkFeeStatus();
  }

  componentWillUnmount() {
    this.unMounted = true;
  }

  componentWillReceiveProps(np) {
    if (np.account !== this.state.from_account && np.account !== this.props.account) {
      this.setState({
        from_account: np.account,
        feeStatus: {},
        fee_asset_id: '1.3.0',
        feeAmount: new Asset({ amount: 0 })
      }, () => { this._updateFee(); this._checkFeeStatus(); });
    }

    if (np.changedCoinValue != this.props.changedCoinValue) {
      const newValue = np.changedCoinValue;
      // this.setState({withdraw_estimated_output_amount: newValue})
      this.onWithdrawAmountChange({ amount: newValue });
    }
  }

  _updateFee(state = this.state) {
    let { fee_asset_id, from_account } = state;
    const { fee_asset_types } = this._getAvailableAssets(state);
    if (fee_asset_types.length === 1 && fee_asset_types[0] !== fee_asset_id) {
      fee_asset_id = fee_asset_types[0];
    }

    if (!from_account) return null;
    checkFeeStatusAsync({
      accountID: from_account.get('id'),
      feeID: fee_asset_id,
      options: ['price_per_kbyte'],
      data: {
        type: 'memo',
        content: this.props.output_coin_type + ':' + state.withdraw_address + (state.memo ? ':' + state.memo : '')
      }
    })
      .then(({ fee, hasBalance, hasPoolBalance }) => {
        if (this.unMounted) return;

        this.setState({
          feeAmount: fee,
          hasBalance,
          hasPoolBalance,
          error: (!hasBalance || !hasPoolBalance)
        }, this._checkBalance);
      });
  }

  _checkFeeStatus(state = this.state) {
    const account = state.from_account;
    if (!account) return;

    const { fee_asset_types: assets } = this._getAvailableAssets(state);
    // const assets = ["1.3.0", this.props.asset.get("id")];
    const feeStatus = {};
    const p = [];
    assets.forEach(a => {
      p.push(checkFeeStatusAsync({
        accountID: account.get('id'),
        feeID: a,
        options: ['price_per_kbyte'],
        data: {
          type: 'memo',
          content: this.props.output_coin_type + ':' + state.withdraw_address + (state.memo ? ':' + state.memo : '')
        }
      }));
    });
    Promise.all(p).then(status => {
      assets.forEach((a, idx) => {
        feeStatus[a] = status[idx];
      });
      if (!utils.are_equal_shallow(state.feeStatus, feeStatus)) {
        this.setState({
          feeStatus
        });
      }
      this._checkBalance();
    }).catch(err => {
      console.error(err);
    });
  }

  onMemoChanged(e) {
    this.setState({ memo: e.target.value }, this._updateFee);
  }

  onWithdrawAmountChange({ amount }) {
    this.setState({
      withdraw_amount: amount,
      empty_withdraw_value: amount !== undefined && !parseFloat(amount)
    }, this._checkBalance);
  }

  onSelectChanged(index) {
    const new_withdraw_address = WithdrawAddresses.get(this.props.output_wallet_type)[index];
    WithdrawAddresses.setLast({ wallet: this.props.output_wallet_type, address: new_withdraw_address });

    this.setState({
      withdraw_address_selected: new_withdraw_address,
      options_is_valid: false,
      withdraw_address: new_withdraw_address,
      withdraw_address_check_in_progress: true,
      withdraw_address_is_valid: null
    }, this._updateFee);
    this._validateAddress(new_withdraw_address);
  }

  _pasteAddress() {
    const new_withdraw_address = localStorage.getItem('_trusty_copyed_address');
    document.body.querySelector('.grid-container .trusty_input_container:last-child label').click();
    this.setState({
      withdraw_address: new_withdraw_address,
      withdraw_address_check_in_progress: true,
      withdraw_address_selected: new_withdraw_address,
      withdraw_address_is_valid: null
    }, this._updateFee);
    this._validateAddress(new_withdraw_address);
  }

  onWithdrawAddressChanged(adress, e) {
    const new_withdraw_address = e.target.value.trim();

    this.setState({
      withdraw_address: new_withdraw_address,
      withdraw_address_check_in_progress: true,
      withdraw_address_selected: new_withdraw_address,
      withdraw_address_is_valid: null
    }, this._updateFee);
    this._validateAddress(new_withdraw_address);
  }

  _validateAddress(new_withdraw_address, props = this.props) {
    validateAddress({ url: props.url, walletType: props.output_wallet_type, newAddress: new_withdraw_address })
      .then(isValid => {
        if (this.state.withdraw_address === new_withdraw_address) {
          this.setState({
            withdraw_address_check_in_progress: false,
            withdraw_address_is_valid: isValid
          });
        }
      });
  }

  _checkBalance() {
    const { feeAmount, withdraw_amount } = this.state;
    const { asset, balance } = this.props;
    if (!balance || !feeAmount) return;
    const hasBalance = checkBalance(withdraw_amount, asset, feeAmount, balance);
    if (hasBalance === null) return;
    this.setState({ balanceError: !hasBalance });
    return hasBalance;
  }

  onSubmit() {
    if ((!this.state.withdraw_address_check_in_progress) && (this.state.withdraw_address && this.state.withdraw_address.length) && (this.state.withdraw_amount !== null)) {
      if (!this.state.withdraw_address_is_valid) {
        ZfApi.publish(this.getWithdrawModalId(), 'open');
      } else if (parseFloat(this.state.withdraw_amount) > 0) {
        if (!WithdrawAddresses.has(this.props.output_wallet_type)) {
          const withdrawals = [];
          withdrawals.push(this.state.withdraw_address);
          WithdrawAddresses.set({ wallet: this.props.output_wallet_type, addresses: withdrawals });
        } else {
          const withdrawals = WithdrawAddresses.get(this.props.output_wallet_type);
          if (withdrawals.indexOf(this.state.withdraw_address) == -1) {
            withdrawals.push(this.state.withdraw_address);
            WithdrawAddresses.set({ wallet: this.props.output_wallet_type, addresses: withdrawals });
          }
        }
        WithdrawAddresses.setLast({ wallet: this.props.output_wallet_type, address: this.state.withdraw_address });
        const asset = this.props.asset;

        const { feeAmount } = this.state;

        const amount = parseFloat(String.prototype.replace.call(this.state.withdraw_amount, /,/g, ''));
        const sendAmount = new Asset({
          asset_id: asset.get('id'),
          precision: asset.get('precision'),
          real: amount
        });

        AccountActions.transfer(
          this.props.account.get('id'),
          this.props.issuer.get('id'),
          sendAmount.getAmount(),
          asset.get('id'),
          this.props.output_coin_type + ':' + this.state.withdraw_address + (this.state.memo ? ':' + new Buffer(this.state.memo, 'utf-8') : ''),
          null,
          feeAmount ? feeAmount.asset_id : '1.3.0'
        );

        this.setState({
          empty_withdraw_value: false
        });
      } else {
        this.setState({
          empty_withdraw_value: true
        });
      }
    }
  }

  onSubmitConfirmation() {
    ZfApi.publish(this.getWithdrawModalId(), 'close');

    if (!WithdrawAddresses.has(this.props.output_wallet_type)) {
      const withdrawals = [];
      withdrawals.push(this.state.withdraw_address);
      WithdrawAddresses.set({ wallet: this.props.output_wallet_type, addresses: withdrawals });
    } else {
      const withdrawals = WithdrawAddresses.get(this.props.output_wallet_type);
      if (withdrawals.indexOf(this.state.withdraw_address) == -1) {
        withdrawals.push(this.state.withdraw_address);
        WithdrawAddresses.set({ wallet: this.props.output_wallet_type, addresses: withdrawals });
      }
    }
    WithdrawAddresses.setLast({ wallet: this.props.output_wallet_type, address: this.state.withdraw_address });
    const asset = this.props.asset;
    const precision = utils.get_asset_precision(asset.get('precision'));
    const amount = String.prototype.replace.call(this.state.withdraw_amount, /,/g, '');

    const { feeAmount } = this.state;

    AccountActions.transfer(
      this.props.account.get('id'),
      this.props.issuer.get('id'),
      parseInt(amount * precision, 10),
      asset.get('id'),
      this.props.output_coin_type + ':' + this.state.withdraw_address + (this.state.memo ? ':' + new Buffer(this.state.memo, 'utf-8') : ''),
      null,
      feeAmount ? feeAmount.asset_id : '1.3.0'
    );
  }

  onDropDownList() {
    if (WithdrawAddresses.has(this.props.output_wallet_type)) {
      if (this.state.options_is_valid === false) {
        this.setState({ options_is_valid: true });
        this.setState({ withdraw_address_first: false });
      }

      if (this.state.options_is_valid === true) {
        this.setState({ options_is_valid: false });
      }
    }
  }

  getWithdrawModalId() {
    return 'confirmation';
  }

  onAccountBalance() {
    const { feeAmount } = this.state;
    if (Object.keys(this.props.account.get('balances').toJS()).includes(this.props.asset.get('id'))) {
      const total = new Asset({
        amount: this.props.balance.get('balance'),
        asset_id: this.props.asset.get('id'),
        precision: this.props.asset.get('precision')
      });

      // Subtract the fee if it is using the same asset
      if (total.asset_id === feeAmount.asset_id) {
        total.minus(feeAmount);
      }

      this.setState({
        withdraw_amount: total.getAmount({ real: true }),
        empty_withdraw_value: false
      }, this._checkBalance);
    }
  }

  setNestedRef(ref) {
    this.nestedRef = ref;
  }

  onFeeChanged({ asset }) {
    this.setState({
      fee_asset_id: asset.get('id')
    }, this._updateFee);
  }

  _getAvailableAssets(state = this.state) {
    const { from_account, feeStatus } = state;
    function hasFeePoolBalance(id) {
      if (feeStatus[id] === undefined) return true;
      return feeStatus[id] && feeStatus[id].hasPoolBalance;
    }

    function hasBalance(id) {
      if (feeStatus[id] === undefined) return true;
      return feeStatus[id] && feeStatus[id].hasBalance;
    }

    let fee_asset_types = [];
    if (!(from_account && from_account.get('balances'))) {
      return { fee_asset_types };
    }
    const account_balances = state.from_account.get('balances').toJS();
    fee_asset_types = Object.keys(account_balances).sort(utils.sortID);
    for (const key in account_balances) {
      const asset = ChainStore.getObject(key);
      const balanceObject = ChainStore.getObject(account_balances[key]);
      if (balanceObject && balanceObject.get('balance') === 0) {
        if (fee_asset_types.indexOf(key) !== -1) {
          fee_asset_types.splice(fee_asset_types.indexOf(key), 1);
        }
      }

      if (asset) {
        // Remove any assets that do not have valid core exchange rates
        if (asset.get('id') !== '1.3.0' && !utils.isValidPrice(asset.getIn(['options', 'core_exchange_rate']))) {
          fee_asset_types.splice(fee_asset_types.indexOf(key), 1);
        }
      }
    }

    fee_asset_types = fee_asset_types.filter(a => {
      return hasFeePoolBalance(a) && hasBalance(a);
    });

    return { fee_asset_types };
  }

  componentDidMount() {
    document.body.querySelector('.modal-overlay').classList.add('is-active');
  }

  render() {
    const { withdraw_address_selected, memo } = this.state;
    const storedAddress = WithdrawAddresses.get(this.props.output_wallet_type);
    let balance = null;

    const account_balances = this.props.account.get('balances').toJS();
    const asset_types = Object.keys(account_balances);

    const withdrawModalId = this.getWithdrawModalId();
    let invalid_address_message = null;
    let options = null;
    let confirmation = null;

    if (this.state.options_is_valid) {
      options =
          <div className={!storedAddress.length ? 'blocktrades-disabled-options' : 'blocktrades-options'}>
                    {storedAddress.map(function (name, index) {
                        return <a key={index} onClick={this.onSelectChanged.bind(this, index)}>{name}</a>;
                    }, this)}
                </div>;
    }

    if (!this.state.withdraw_address_check_in_progress && (this.state.withdraw_address && this.state.withdraw_address.length)) {
      if (!this.state.withdraw_address_is_valid) {
        invalid_address_message = <div className="trusty_font_error has-error"><Translate content="gateway.valid_address" coin_type={this.props.output_coin_type} /></div>;
        confirmation =
                <Modal id={withdrawModalId} overlay={true}>
                    <Trigger close={withdrawModalId}>
                        <a href="#" className="close-button">&times;</a>
                    </Trigger>
                    <br/>
          <label><Translate content="modal.confirmation.title"/></label>
            <br/>
            <div className="content-block">
                        <input type="submit" className="button"
                        onClick={this.onSubmitConfirmation.bind(this)}
                        value={counterpart.translate('modal.confirmation.accept')} />
                        <Trigger close={withdrawModalId}>
                            <a href className="secondary button"><Translate content="modal.confirmation.cancel" /></a>
                        </Trigger>
                    </div>
            </Modal>;
      }
      // if (this.state.withdraw_address_is_valid)
      //   invalid_address_message = <Icon name="checkmark-circle" className="success" />;
      // else
      //   invalid_address_message = <Icon name="cross-circle" className="alert" />;
    }

    let tabIndex = 1;
    let withdraw_memo = null;

    if (this.props.output_supports_memos) {
      withdraw_memo =
        <div className="content-block">
          <label><Translate component="span" content="transfer.memo"/></label>
          <textarea rows="1" value={memo} tabIndex={tabIndex++} onChange={this.onMemoChanged.bind(this)} />
        </div>;
    }

    // Estimate fee VARIABLES
    const { fee_asset_types } = this._getAvailableAssets();

    if (asset_types.length > 0) {
      const current_asset_id = this.props.asset.get('id');
      if (current_asset_id) {
        const current = account_balances[current_asset_id];
        balance = (
                    <span style={{ borderBottom: '#A09F9F 1px dotted', cursor: 'pointer' }}>
                        <Translate component="span" content="transfer.available"/>&nbsp;:&nbsp;
                        <span className="set-cursor" onClick={this.onAccountBalance.bind(this)}>
                            {current ? <BalanceComponent balance={account_balances[current_asset_id]}/> : 0}
                        </span>
                    </span>
        );
      } else { balance = 'No funds'; }
    } else {
      balance = 'No funds';
    }

    const addressInput = <input type="text" value={withdraw_address_selected} tabIndex="4" onChange = {this.onWithdrawAddressChanged.bind(this)} autoComplete="off" />;
    const addressSelect = <span onClick={this.onDropDownList.bind(this)} >&#9660;</span>;
    const outputCoinType = this.props.output_coin_type;
    return (<form className="grid-block vertical full-width-content">
                <div className="grid-container">
                    {/* <div className="content-block">
                                        <h3><Translate content="gateway.withdraw_coin" coin={this.props.output_coin_name} symbol={this.props.output_coin_symbol} /></h3>
                                    </div> */}

                    {/* Withdraw amount */}
                    <div className={classnames('content-block', { _hide: this.props.withdrawService != 'OpenLedger' })}>
                        <AmountSelector
                            trustySelects={this.props.trustySelects}
                            trustyLabel="enter amount"
                            label="modal.withdraw.amount"
                            amount={this.state.withdraw_amount}
                            asset={this.props.asset.get('id')}
                            assets={[this.props.asset.get('id')]}
                            placeholder="0"
                            onChange={this.onWithdrawAmountChange.bind(this)}
                            display_balance={balance}
                        />
                        {this.state.empty_withdraw_value ? <p className="trusty_font_error has-error no-margin"><Translate content="transfer.errors.valid" /></p> : null}
                        {this.state.balanceError ? <p className="trusty_font_error has-error no-margin"><Translate content="transfer.errors.insufficient" /></p> : null}
                    </div>

                    {/* Fee selection */}
                    {this.state.feeAmount ? <div className="content-block gate_fee">
                        <AmountSelector
                            trustyLabel="exchange fee"
                            refCallback={this.setNestedRef.bind(this)}
                            label="transfer.fee"
                            disabled={true}
                            amount={this.state.feeAmount.getAmount({ real: true })}
                            onChange={this.onFeeChanged.bind(this)}
                            asset={this.state.feeAmount.asset_id}
                            assets={fee_asset_types}
                            tabIndex={tabIndex++}
                        />
                        {!this.state.hasBalance ? <p className="has-error no-margin trusty_font_error"><Translate content="transfer.errors.noFeeBalance" /></p> : null}
                        {!this.state.hasPoolBalance ? <p className="has-error no-margin trusty_font_error"><Translate content="transfer.errors.noPoolBalance" /></p> : null}
                    </div> : null}

                    {/* Gate fee */}
                    {/* this.props.gateFee ?
                        (<div className="amount-selector right-selector" style={{paddingBottom: 20}}>
                            <TrustyInput
                                style={{marginBottom: 0}}
                                isOpen={true}
                                input={<input type="text" disabled value={this.props.gateFee} />}
                                right={this.props.output_coin_symbol}
                                label={"gateway fee"} />
                        </div>):null */}
                    <div className="content-block">
                        {/* <label className="left-label">
                                                <Translate component="span" content="modal.withdraw.address"/>
                                            </label> */}
                        <div className="blocktrades-select-dropdown">
                            <div className="inline-label">
                                <TrustyInput
                                    input={addressInput} label="ENTER GO RECEIVING ADDRESS"/>

                            </div>
                        </div>
                        <div className="blocktrades-position-options">
                            {options}
                        </div>
                        {/* invalid_address_message */}
                    </div>

                    {/* Memo input */}
                    {withdraw_memo}
                    <p className="_tooltip_p _yellow" style={{ textAlign: 'left', marginTop: 0, marginBottom: 0 }}>Please enter a valid <span style={{ textTransform: 'uppercase' }}>{ ~outputCoinType.search(/open/i) ? outputCoinType.substring(5) : outputCoinType }</span> address</p>
                    <button className="trusty_full_width_button" onClick={this._pasteAddress.bind(this)}>Paste address</button>
                    {/* Withdraw/Cancel buttons */}
                    <div className="button-group trusty_inline_buttons">
                        <div onClick={this.onSubmit.bind(this)} className={'button b_left' + (this.state.error || this.state.balanceError ? (' disabled') : '')}>
                            <Translate content="modal.withdraw.submit" />
                        </div>
                        <div onClick={() => { browserHistory.push('/home'); }}>
                            <Trigger close={this.props.modal_id}>
                                <div className="button b_right"><Translate content="account.perm.cancel" /></div>
                            </Trigger>
                        </div>
                    </div>
                    {confirmation}
                </div>
                <p className="trusty_ps_text" style={{ marginTop: 0 }}>Payment bridge service is provided<br/> by { this.props.withdrawService }</p>
            </form>
    );
  }
}

/*eslint-disable*///wip

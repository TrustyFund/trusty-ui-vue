/*eslint-disable*/

import BlockTradesDepositAddressCache from "../blocktrades/cache";
import { requestDepositAddress } from "./methods";
import { blockTradesAPIs } from "../apiConfig";


export default class BlockTradesGatewayDepositRequest  {


    // static propTypes = {
    //     url:               React.PropTypes.string,
    //     gateway:           React.PropTypes.string,
    //     deposit_coin_type: React.PropTypes.string,
    //     deposit_asset_name: React.PropTypes.string,
    //     deposit_account: React.PropTypes.string,
    //     receive_coin_type: React.PropTypes.string,
    //     account: ChainTypes.ChainAccount,
    //     issuer_account: ChainTypes.ChainAccount,
    //     deposit_asset: React.PropTypes.string,
    //     deposit_wallet_type: React.PropTypes.string,
    //     receive_asset: ChainTypes.ChainAsset,
    //     deprecated_in_favor_of: ChainTypes.ChainAsset,
    //     deprecated_message: React.PropTypes.string,
    //     action: React.PropTypes.string,
    //     supports_output_memos: React.PropTypes.bool.isRequired
    // };



    constructor(props) {

    	this.props = props
        this.deposit_address_cache = new BlockTradesDepositAddressCache();

        let urls = {
            blocktrades: blockTradesAPIs.BASE,
            openledger: blockTradesAPIs.BASE_OL
        };

        this.state = {
            receive_address: null,
            url: props.url || urls[props.gateway]
        };

        this.addDepositAddress = this.addDepositAddress.bind(this);
        this._copy = this._copy.bind(this);
        document.addEventListener("copy", this._copy);

        this.componentWillMount()
    }

    _copy(e) {
        try {
            e.clipboardData.setData("text/plain", this.state.clipboardText);
            e.preventDefault();
        } catch(err) {
            console.error(err);
        }
    }

    _getDepositObject() {
        return {
            inputCoinType: this.props.deposit_coin_type,
            outputCoinType: this.props.receive_coin_type,
            outputAddress: this.props.accountName,//this.props.account.get("name"),
            url: this.state.url,
            stateCallback: this.addDepositAddress
        };
    }

    
    setState(object) {
        Object.keys(object).forEach((key, index) => {
          this.state[key] = object[key];
        });
    }
    componentDidMount(){
        if ( this.props.action == "withdraw" )this.onWithdraw()
    }
    componentWillMount() {
        let account_name = this.props.accountName//this.props.account.get("name");
        let receive_address = this.deposit_address_cache.getCachedInputAddress(this.props.gateway, account_name, this.props.deposit_coin_type, this.props.receive_coin_type);
        if (!receive_address || receive_address.address === "unknown") {
            requestDepositAddress(this._getDepositObject());
        } else {
            this.setState({receive_address});
        }

    }

    componentWillUnmount() {
        document.removeEventListener("copy", this._copy);
    }

    addDepositAddress( receive_address ) {
        let account_name = this.props.accountName;//this.props.account.get("name");
        this.deposit_address_cache.cacheInputAddress(
            this.props.gateway,
            account_name,
            this.props.deposit_coin_type,
            this.props.receive_coin_type,
            receive_address.address,
            receive_address.memo
        );
        this.setState( {receive_address} );
    }

    getWithdrawModalId() {
        // console.log( "this.props.issuer: ", this.props.issuer_account.toJS() )
        // console.log( "this.receive_asset.issuer: ", this.props.receive_asset.toJS() )
        return "withdraw_asset_"+this.props.issuer_account.get("name") + "_"+this.props.receive_asset.get("symbol");
    }

    onWithdraw() {
        if(!this.props.issuer_account || !this.props.receive_asset) {
           return
        } 
        ZfApi.publish(this.getWithdrawModalId(), "open");
    }

    toClipboard(clipboardText) {
        try {
            this.setState({clipboardText}, () => {
                document.execCommand("copy");
            });
            localStorage.setItem("_trusty_copyed_address", clipboardText)
            alert("address copied")
        } catch(err) {
            console.error(err);
        }
    }

    render() {
        const isDeposit = this.props.action === "deposit";
        let emptyRow = <div style={{display:"none", minHeight: 150}}></div>;
        if( !this.props.account || !this.props.issuer_account || !this.props.receive_asset )
            return emptyRow;

        let account_balances_object = this.props.account.get("balances");

        const { gateFee } = this.props;

        let balance = "0 " + this.props.receive_asset.get("symbol");
        if (this.props.deprecated_in_favor_of)
        {
            let has_nonzero_balance = false;
            let balance_object_id = account_balances_object.get(this.props.receive_asset.get("id"));
            if (balance_object_id)
            {
                let balance_object = ChainStore.getObject(balance_object_id);
                if (balance_object)
                {
                    let balance = balance_object.get("balance");
                    if (balance != 0)
                        has_nonzero_balance = true;
                }
            }
            if (!has_nonzero_balance)
                return emptyRow;
        }

        // let account_balances = account_balances_object.toJS();
        // let asset_types = Object.keys(account_balances);
        // if (asset_types.length > 0) {
        //     let current_asset_id = this.props.receive_asset.get("id");
        //     if( current_asset_id )
        //     {
        //         balance = (<span><Translate component="span" content="transfer.available"/>: <BalanceComponent balance={account_balances[current_asset_id]}/></span>);
        //     }
        // }

        let receive_address = this.state.receive_address;
        if( !receive_address )  {
            let account_name = this.props.account.get("name");
            receive_address = this.deposit_address_cache.getCachedInputAddress(this.props.gateway, account_name, this.props.deposit_coin_type, this.props.receive_coin_type);
        }

        if( !receive_address) {
            requestDepositAddress(this._getDepositObject());
            return <div style={{margin: "3rem"}}><LoadingIndicator type="three-bounce"/></div>;
        }

        let withdraw_modal_id = this.getWithdrawModalId();
        let deposit_address_fragment = null;
        let deposit_memo = null;
        // if (this.props.deprecated_in_favor_of)
        // {
        //     deposit_address_fragment = <span>please use {this.props.deprecated_in_favor_of.get("symbol")} instead. <span data-tip={this.props.deprecated_message} data-place="right" data-html={true}><Icon name="question-circle" /></span><ReactTooltip /></span>;
        // }
        // else
        // {
        let clipboardText = "";
        let memoText;
        if (this.props.deposit_account)
        {
            deposit_address_fragment = (<span>{this.props.deposit_account}</span>);
            clipboardText = this.props.receive_coin_type + ":" + this.props.account.get("name");
            deposit_memo = <span>{clipboardText}</span>;
            var withdraw_memo_prefix = this.props.deposit_coin_type + ":";
        }
        else
        {
            if (receive_address.memo)
            {
                // This is a client that uses a deposit memo (like ethereum), we need to display both the address and the memo they need to send
                memoText = receive_address.memo;
                clipboardText = receive_address.address;
                deposit_address_fragment = (<span>{receive_address.address}</span>);
                deposit_memo = <span>{receive_address.memo}</span>;
            }
            else
            {
                // This is a client that uses unique deposit addresses to select the output
                clipboardText = receive_address.address;
                deposit_address_fragment = (<span>{receive_address.address}</span>);
            }
            var withdraw_memo_prefix = "";
        }

        if (!this.props.isAvailable || (isDeposit && !this.props.deposit_account && !this.state.receive_address)) {
            return <div><Translate className="txtlabel cancel" content="gateway.unavailable" component="h4" /></div>;
        }

        let cutAddress = () => {
            let address = receive_address.address
            if(!deposit_memo){
                let firstCount = Math.floor(address.length/2) - 1
                let start = address.slice(0, firstCount)
                let end = address.slice(firstCount)
                return  <div className="trusty_cutted_address">
                            <span>{start}</span><br/>
                            <span>{end}</span>
                        </div>;
            }
        }

        if (isDeposit) {
            return (
                <div className="Blocktrades__gateway grid-block no-padding no-margin">
                    <div className="small-12 medium-7">
                        <div>
                            { receive_address.memo ? deposit_address_fragment : cutAddress()}

                            {deposit_memo ? (
                            <div>
                                <span>memo: {deposit_memo}</span>
                            </div>) : null}

                            {deposit_address_fragment ? <button className="trusty_wide_btn" onClick={this.toClipboard.bind(this, clipboardText)}>Copy address</button> : null}
                            <div className="trusty_help_text _yellow" style={{fontWeight:"initial"}}>Push CONFIRM button as soon as you have completed the payment</div>
                            <div className="trusty_inline_buttons">
                                <Link to="/home" className="b_left"><button>Confirm</button></Link>
                                <Link to="/home" className="b_right"><button >Cancel</button></Link>
                            </div>
                            <p className="trusty_ps_text">Paymen gateway service is provided by<br/> Openledger.io at 0% fee</p>
                            {memoText ? <div className="button" onClick={this.toClipboard.bind(this, memoText)}>Copy memo</div> : null}
                            {/*<button className={"button"} onClick={requestDepositAddress.bind(null, this._getDepositObject())}><Translate content="gateway.generate_new" /></button>*/}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="Blocktrades__gateway grid-block no-padding no-margin">
                    <BaseModal id={withdraw_modal_id} className={"_transparent_modal"} overlay={true}>
                        <div className="grid-block vertical">
                            <WithdrawModalBlocktrades
                                trustySelects={this.props.trustySelects}
                                withdrawService={"OpenLedger"}
                                account={this.props.account.get("name")}
                                issuer={this.props.issuer_account.get("name")}
                                asset={this.props.receive_asset.get("symbol")}
                                url={this.state.url}
                                output_coin_name={this.props.deposit_asset_name}
                                gateFee={gateFee}
                                output_coin_symbol={this.props.deposit_asset}
                                output_coin_type={this.props.deposit_coin_type}
                                output_wallet_type={this.props.deposit_wallet_type}
								output_supports_memos={this.props.supports_output_memos}
                                memo_prefix={withdraw_memo_prefix}
                                modal_id={withdraw_modal_id}
                                balance={this.props.account.get("balances").toJS()[this.props.receive_asset.get("id")]} />
                        </div>
                    </BaseModal>
                </div>
            );
        }
    }
};



/*eslint-disable*/

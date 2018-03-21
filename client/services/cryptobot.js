/* eslint no-underscore-dangle: 0 */
import SockJS from 'sockjs-client';

class CryptobotClient {
  constructor(url) {
    this.callbacks = {};
    this.url = url;
    this.sock = null;
    this.onopen = null;
    this.onclose = null;
    this.onmsg = null;
  }

  connect() {
    this.sock = new SockJS(this.url);
    this.sock.onmessage = this._onmsg.bind(this);
    this.sock.onopen = this.onopen;
    this.sock.onclose = this.onclose;
  }

  close() {
    this.sock.close();
  }

  _onmsg(msg) {
    const resp = JSON.parse(msg.data);
    let result = {};

    const {
      log_list: [
        { code_key: code, user_msg: message }
      ],
      response_map: data
    } = resp;

    console.log('INSIDE', resp);

    const intCode = parseInt(code, 10);

    if (intCode === 200 || intCode === 201) {
      result = { success: true, data };
    } else {
      result = { success: false, error: message };
    }

    if (resp.trans_map && resp.trans_map.trans_id) {
      console.log('DIRECT RESPONSE');
      this.callbacks[resp.trans_map.trans_id](result);
      delete this.callbacks[resp.trans_map.trans_id];
    } else {
      console.log('NOTIFICATION', data);
      this.onmsg(data.order);
    }
  }

  request(action, dataType, request) {
    return new Promise((resolve) => {
      const trans = {};

      trans.sended_at = new Date().getTime();
      trans.sendedAt = new Date().getTime();
      trans.trans_id = Math.random();
      trans.token = request.address;

      this.callbacks[trans.trans_id] = resolve;

      const data = {
        action_str: action,
        data_type: dataType,
        log_list: [],
        request_map: request,
        trans_map: trans
      };
      console.log('-------->', data);
      this.sock.send(JSON.stringify(data));
    });
  }
}

const url = 'http://localhost:8093/channel';

export default new CryptobotClient(url);

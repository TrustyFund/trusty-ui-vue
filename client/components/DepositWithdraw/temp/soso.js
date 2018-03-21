const SockJS = require('sockjs-client');
/*eslint-disable*///wip
function SoSo(url) {
  this.url = url;
  this.log = true;
  this.sock = new SockJS(url);
  this.onmsg = null;
  this.onopen = null;
  this.ondirectmsg = null;
  this.onclose = null;
  this.onerror = null;
  this.callbacks = {};
  const self = this;

  this.sock.onmessage = function (e) {
    const resp = JSON.parse(e.data);
    if (self.onmsg) {
      self.onmsg(resp);
    }

    if (resp.log_list.length > 0) {
      resp.log_map = resp.log_list[0];
    }

    if (resp.trans_map) {
      if (resp.trans_map.trans_id) {
        self.callbacks[resp.trans_map.trans_id](resp);
        delete self.callbacks[resp.trans_map.trans_id];
      } else if (this.ondirectmsg) {
        self.ondirectmsg(resp);
      }
    }

    const sended_at = (resp.trans_map) ? resp.trans_map.sended_at : new Date().getTime();

    if (self.log && sended_at) {
      const sendedAt = sended_at;
      const endTime = new Date().getTime();

      const code_int = parseInt(resp.log_map.code_key);
      let color_code_key = 'color: red';
      if (code_int < 400) {
        color_code_key = 'color: #4CAF50';
      }

      console.log(
        '[CHAN] ' +
       resp.action_str,
        resp.data_type,
        resp.log_map.code_str,
        resp.log_map.user_msg,
        resp.log_map.level_str,
        (endTime - sendedAt) + 'ms'
      );
    }
  };
  this.sock.onopen = function (e) {
    if (self.onopen) {
      self.onopen(e);
    }
  };
  this.sock.onclose = function (e) {
    if (self.onclose) {
      self.onclose(e);
    }
  };
  this.sock.onerror = function (e) {
    if (self.onerror) {
      self.onerror(e);
    }
  };
}

SoSo.prototype.request = function (action_str, data_type, request, trans_map) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const trans = {};

    trans.sended_at = new Date().getTime();
    trans.sendedAt = new Date().getTime();
    trans.trans_id = uuid();
    trans.token = request.address;
    self.callbacks[trans.trans_id] = resolve;

    const data = {
      action_str,
      data_type,
      log_list: [],
      request_map: request,
      trans_map: trans
    };
    console.log('-------->', data);
    self.sock.send(JSON.stringify(data));
  }));
};

// utils

const lut = []; for (let i = 0; i < 256; i++) { lut[i] = (i < 16 ? '0' : '') + (i).toString(16); }
function uuid() {
  const d0 = Math.random() * 0xffffffff | 0;
  const d1 = Math.random() * 0xffffffff | 0;
  const d2 = Math.random() * 0xffffffff | 0;
  const d3 = Math.random() * 0xffffffff | 0;
  return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
    lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
    lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
    lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
}
/*eslint-disable*/

module.exports = SoSo;

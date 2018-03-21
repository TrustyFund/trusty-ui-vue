import CryptobotClient from './client/services/cryptobot.js';


CryptobotClient.onopen = (msg) => {
  console.log('OPEN', msg);
  const request = { order_id: 1, address: 'anlopan364test2' };
  CryptobotClient.request('ge1t', 'order', request).then((result) => {
    console.log("RESULT", result);
    CryptobotClient.close();
  });
};

CryptobotClient.onclose = (msg) => {
  console.log('CLOSE', msg);
};

CryptobotClient.connect();

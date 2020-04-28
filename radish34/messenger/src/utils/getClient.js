const WhisperWrapper = require('../clients/whisper/WhisperWrapper');
const web3utils = require('../clients/whisper/web3Utils.js');
const NatsWrapper = require('../clients/nats/NatsWrapper');
const Config = require('../../config');
const { messagingType } = Config;

async function getClient(messagingType) {
  let messenger;
  switch (messagingType) {
    case 'whisper':
      messenger = await new WhisperWrapper();
      await messenger.loadIdentities();
      await messenger.createFirstIdentity();
      await web3utils.getWeb3();
      break;
    case 'nats':
      messenger = await new NatsWrapper(Config.nats, () => { });
      break;
    default:
      throw('messaging type configuration required');
  }
  return messenger;
}

module.exports = {
  getClient,
};

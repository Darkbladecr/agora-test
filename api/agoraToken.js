import { RtcRole, RtcTokenBuilder } from 'agora-access-token';

const appCertificate = process.env.AGORA_CERTIFICATE;
const role = RtcRole.PUBLISHER;

const expirationTimeInSeconds = 3600;

const currentTimestamp = Math.floor(Date.now() / 1000);

const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

module.exports = (req, res) => {
  const { appId, channel, uid } = req.body;
  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channel,
    uid,
    role,
    privilegeExpiredTs
  );
  res.send(token);
};

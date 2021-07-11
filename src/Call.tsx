import React, { useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from './hooks/useAgora';
import MediaPlayer from './components/MediaPlayer';
import './Call.css';

const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });
const appId = '019667ef9f7440be9811083a44bc8b58';

function Call() {
  const [channel, setChannel] = useState('');
  const {
    localAudioTrack,
    localVideoTrack,
    leave,
    join,
    joinState,
    remoteUsers,
  } = useAgora(client);

  return (
    <div className="call">
      <form className="call-form">
        <label>
          Channel:
          <input
            type="text"
            name="channel"
            onChange={(event) => {
              setChannel(event.target.value);
            }}
          />
        </label>
        <div className="button-group">
          <button
            id="join"
            type="button"
            className="btn btn-primary btn-sm"
            disabled={joinState}
            onClick={() => {
              join(appId, channel);
            }}
          >
            Join
          </button>
          <button
            id="leave"
            type="button"
            className="btn btn-primary btn-sm"
            disabled={!joinState}
            onClick={() => {
              leave();
            }}
          >
            Leave
          </button>
        </div>
      </form>
      <div className="player-container">
        {joinState && (
          <div className="local-player-wrapper">
            <p className="local-player-text">
              {localVideoTrack && `localTrack`}
              {joinState && localVideoTrack ? `(${client.uid})` : ''}
            </p>
            <MediaPlayer
              videoTrack={localVideoTrack}
              audioTrack={undefined}
            ></MediaPlayer>
          </div>
        )}
        {remoteUsers.map((user) => (
          <div className="remote-player-wrapper" key={user.uid}>
            <p className="remote-player-text">{`remoteVideo(${user.uid})`}</p>
            <MediaPlayer
              videoTrack={user.videoTrack}
              audioTrack={user.audioTrack}
            ></MediaPlayer>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Call;

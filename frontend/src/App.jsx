

import { useState, useRef } from 'react'
import videojs from 'video.js'
import VideoJS from "./VideoPlayer.jsx"
import './App.css'

function App() {
  const playerRef = useRef(null)
  const videoLink = "http://localhost:8000/uploads/art/eb5907ae-9c44-4122-b43f-cc1997f7e358/index.m3u8"

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL",
      }
    ]
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.on('waiting', () => { videojs.log('player is waiting'); });
    player.on('dispose', () => { videojs.log('player will dispose'); });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #080808;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }

        .app {
          min-height: 100vh;
          background: #080808;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
        }

        .app::before {
          content: '';
          position: fixed;
          top: -30%;
          left: -20%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255,80,50,0.08) 0%, transparent 70%);
          pointer-events: none;
          animation: drift 12s ease-in-out infinite alternate;
        }

        .app::after {
          content: '';
          position: fixed;
          bottom: -20%;
          right: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(100,60,255,0.07) 0%, transparent 70%);
          pointer-events: none;
          animation: drift 15s ease-in-out infinite alternate-reverse;
        }

        @keyframes drift {
          from { transform: translate(0, 0); }
          to { transform: translate(40px, 30px); }
        }

        .header {
          text-align: center;
          margin-bottom: 36px;
          animation: fadeUp 0.7s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .label {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ff5032;
          background: rgba(255,80,50,0.1);
          border: 1px solid rgba(255,80,50,0.2);
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 18px;
        }

        h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #f5f5f0;
          line-height: 1.05;
          letter-spacing: -0.03em;
        }

        h1 span {
          color: transparent;
          -webkit-text-stroke: 1px rgba(245,245,240,0.3);
        }

        .subtitle {
          margin-top: 10px;
          font-size: 14px;
          color: rgba(245,245,240,0.35);
          font-weight: 300;
          letter-spacing: 0.02em;
        }

        .player-wrapper {
          width: 100%;
          max-width: 860px;
          position: relative;
          animation: fadeUp 0.7s 0.15s ease both;
        }

        .player-frame {
          background: #111;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.03),
            0 30px 80px rgba(0,0,0,0.7),
            0 0 60px rgba(255,80,50,0.05);
          position: relative;
        }

        .player-frame::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,80,50,0.4), rgba(100,60,255,0.4), transparent);
          z-index: 2;
        }

        .player-topbar {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 14px 18px;
          background: rgba(255,255,255,0.02);
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .dot-r { background: #ff5f57; }
        .dot-y { background: #febc2e; }
        .dot-g { background: #28c840; }

        .topbar-title {
          margin-left: auto;
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.1em;
          font-family: 'DM Sans', sans-serif;
        }

        .video-container {
          padding: 0;
        }

        .meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-top: 1px solid rgba(255,255,255,0.04);
        }

        .live-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #ff5032;
          box-shadow: 0 0 8px #ff5032;
          animation: pulse 1.8s ease infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .stream-info {
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          font-family: 'DM Sans', sans-serif;
        }

        /* Override video.js default styles slightly */
        .video-js {
          font-family: 'DM Sans', sans-serif !important;
        }
      `}</style>

      <div className="app">
        <div className="header">
          <div className="label">● Live Stream</div>
          <h1>Watch <span>Now</span></h1>
          <p className="subtitle">HLS · Adaptive bitrate · Ultra-low latency</p>
        </div>

        <div className="player-wrapper">
          <div className="player-frame">
            <div className="player-topbar">
              <div className="dot dot-r" />
              <div className="dot dot-y" />
              <div className="dot dot-g" />
              <span className="topbar-title">stream.m3u8</span>
            </div>

            <div className="video-container">
              <VideoJS
                options={videoPlayerOptions}
                onReady={handlePlayerReady}
              />
            </div>

            <div className="meta-row">
              <div className="live-badge">
                <div className="live-dot" />
                HLS Stream
              </div>
              <div className="stream-info">localhost:8000</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

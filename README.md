# HLS Video Streaming

A simple video streaming project I built to understand how video streaming works behind the scenes using **HTTP, HLS, and FFmpeg**.

## What I Built

I built a pipeline that takes a local video, processes it with **FFmpeg**, splits it into smaller HLS segments, and streams those segments to a frontend through HTTP.

### Streaming Flow

Local Video → FFmpeg → HLS Segmentation → HTTP Server → Custom Frontend → Video Playback

### How It Works

The local video is processed using FFmpeg for compression and encoding, then divided into smaller video segments along with an .m3u8 playlist.

The frontend uses the HLS playlist to request and play the video segments instead of loading the entire video at once.

#Solving the Buffering Issue

One of the main issues I ran into was buffering during playback.

Inconsistent segment durations were causing the buffer to behave unpredictably. I experimented with the segment configuration and switched to uniform 4-second segments.

Using consistent 4-second segments made the buffer more predictable and helped make playback smoother.

#Custom UI :- I designed and built the original UI and HTML for the frontend myself.

The frontend was built specifically for this project to connect with the HLS streaming pipeline and provide a simple video playback experience.



### Building this project helped me understand:

How HLS streaming works
How videos are split into smaller segments
How .m3u8 playlists work
How FFmpeg is used for video processing
How video segments are delivered over HTTP
How segment duration affects buffering
How the frontend connects to the streaming pipeline
Project Goal

I built this project to get hands-on experience with video streaming, encoding, segmentation, buffering, HTTP delivery, and frontend playback.



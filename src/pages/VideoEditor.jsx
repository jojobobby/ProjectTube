import React, { useState, useRef } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useColorMode } from '../ThemeProvider';

const Trim = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [trimmedUrl, setTrimmedUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const theme = useTheme();
  const colorMode = useColorMode();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  const handleTrim = () => {
    if (!videoFile) return;

    setIsProcessing(true);
    recordedChunksRef.current = [];
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    video.currentTime = Number(start);

    video.onseeked = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const stream = canvas.captureStream(30);
      const options = { mimeType: 'video/webm; codecs=vp9' };
      const mediaRecorder = new MediaRecorder(stream, options);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const newVideoUrl = URL.createObjectURL(blob);
        setTrimmedUrl(newVideoUrl);
        setIsProcessing(false);
      };

      mediaRecorder.start();
      video.play();

      const drawFrame = () => {
        if (video.currentTime >= Number(end)) {
          video.pause();
          mediaRecorder.stop();
          return;
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(drawFrame);
      };

      drawFrame();
    };
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}>
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center', pb: 0 }}>
        <Typography variant="h4" gutterBottom>
          Video Uploader & Editor (Using Canvas & MediaRecorder)
        </Typography>
        <input type="file" accept="video/*" onChange={handleFileChange} />

        {videoUrl && (
          <>
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              style={{ maxWidth: '100%', display: 'none' }}
            />

            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Set Trim Times</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
                <label>
                  Start (seconds):
                  <input
                    type="number"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                  />
                </label>
                <label>
                  End (seconds):
                  <input
                    type="number"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                  />
                </label>
              </Box>
              <Button onClick={handleTrim} disabled={isProcessing} variant="contained" color="primary" sx={{ mt: 2 }}>
                {isProcessing ? 'Processing...' : 'Trim Video'}
              </Button>
            </Box>

            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </>
        )}

        {trimmedUrl && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Trimmed Video</Typography>
            <video src={trimmedUrl} controls style={{ maxWidth: '100%' }} />
            <br />
            <Button href={trimmedUrl} download="trimmed-video.webm" variant="contained" color="secondary" sx={{ mt: 2 }}>
              Download Trimmed Video
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Trim;

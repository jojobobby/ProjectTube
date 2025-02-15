import React, { useState, useRef, useEffect } from 'react';
import { Container, Box, Typography, Button, Slider, FormControlLabel, Checkbox, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../App';

const Trim = () => {
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState('');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [trimmedUrl, setTrimmedUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [duration, setDuration] = useState(0);
  const [mute, setMute] = useState(false);
  const [lowerQuality, setLowerQuality] = useState(false);
  const [trim, setTrim] = useState(false);
  const [error, setError] = useState('');
  const [newFileName, setNewFileName] = useState('trimmed-media');

  const mediaRef = useRef(null);
  const canvasRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'video/mp4') {
        setError('Only MP4 files are supported for editing.');
        setMediaFile(null);
        setMediaUrl('');
        return;
      }
      setError('');
      setMediaFile(file);
      setMediaUrl(URL.createObjectURL(file));
    }
  };

  const handleFinish = () => {
    if (!mediaFile) return;

    setIsProcessing(true);
    recordedChunksRef.current = [];
    const media = mediaRef.current;
    const canvas = canvasRef.current;

    if (!canvas) {
      setError('Canvas element is not available.');
      setIsProcessing(false);
      return;
    }

    const ctx = canvas.getContext('2d');

    media.currentTime = Number(start);

    media.onseeked = () => {
      canvas.width = media.videoWidth || 640;
      canvas.height = media.videoHeight || 480;

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
        const newMediaUrl = URL.createObjectURL(blob);
        setTrimmedUrl(newMediaUrl);
        setIsProcessing(false);
      };

      mediaRecorder.start();
      media.play();

      const drawFrame = () => {
        if (media.currentTime >= Number(end)) {
          media.pause();
          mediaRecorder.stop();
          return;
        }
        ctx.drawImage(media, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(drawFrame);
      };

      drawFrame();
    };
  };

  const handleLoadedMetadata = () => {
    const media = mediaRef.current;
    setDuration(media.duration);
    setEnd(media.duration);
  };

  const handleSliderChange = (event, newValue) => {
    setStart(newValue[0]);
    setEnd(newValue[1]);
  };

  const handleMuteChange = (event) => {
    setMute(event.target.checked);
  };

  const handleLowerQualityChange = (event) => {
    setLowerQuality(event.target.checked);
  };

  const handleTrimChange = (event) => {
    setTrim(event.target.checked);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Container maxWidth="md" sx={{ textAlign: 'center', p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Media Uploader & Editor (Using Canvas & MediaRecorder)
        </Typography>
        <input type="file" accept="video/mp4" onChange={handleFileChange} />
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

        {mediaUrl && (
          <>
            <Box sx={{ mt: 4 }}>
              <video
                ref={mediaRef}
                src={mediaUrl}
                controls
                onLoadedMetadata={handleLoadedMetadata}
                style={{ width: '100%' }}
              />
              {trim && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6">Set Trim Times</Typography>
                  <Slider
                    value={[start, end]}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={duration}
                    sx={{ mt: 2 }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <TextField
                      label="Start Time"
                      value={formatTime(start)}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      sx={{ width: '45%' }}
                    />
                    <TextField
                      label="End Time"
                      value={formatTime(end)}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                      sx={{ width: '45%' }}
                    />
                  </Box>
                </Box>
              )}
            </Box>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <FormControlLabel
                control={<Checkbox checked={trim} onChange={handleTrimChange} />}
                label="Trim Media"
              />
              <FormControlLabel
                control={<Checkbox checked={mute} onChange={handleMuteChange} />}
                label="Mute Media"
              />
              <FormControlLabel
                control={<Checkbox checked={lowerQuality} onChange={handleLowerQualityChange} />}
                label="Lower Quality"
              />
            </Box>
            <Box sx={{ mt: 4 }}>
              <TextField
                label="New File Name"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <Button onClick={handleFinish} disabled={isProcessing} variant="contained" color="primary" sx={{ mt: 2 }}>
                {isProcessing ? 'Processing...' : 'Finish'}
              </Button>
            </Box>
          </>
        )}

        {trimmedUrl && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Trimmed Media</Typography>
            <video src={trimmedUrl} controls style={{ width: '100%' }} />
            <br />
            <Button href={trimmedUrl} download={`${newFileName}.webm`} variant="contained" color="secondary" sx={{ mt: 2 }}>
              Download Trimmed Media
            </Button>
          </Box>
        )}
      </Container>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </Box>
  );
};

export default Trim;

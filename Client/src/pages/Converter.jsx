import React, { useState, useRef } from 'react';
import { Container, Box, Typography, Button, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg/dist/ffmpeg.min.js';

const ffmpeg = createFFmpeg({ log: true });

const Converter = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [convertedUrl, setConvertedUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversionType, setConversionType] = useState('mp4ToWebp');
  const [error, setError] = useState('');

  const theme = useTheme();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if ((conversionType === 'mp4ToWebp' && selectedFile.type !== 'video/mp4') || (conversionType === 'webpToMp4' && selectedFile.type !== 'image/webp')) {
        setError('Invalid file type. Please select a valid file.');
        return;
      }
      setError('');
      setFile(selectedFile);
      try {
        setFileUrl(URL.createObjectURL(selectedFile));
      } catch (error) {
        setError('Failed to load the file. Please try again.');
      }
    }
  };

  const handleConversionTypeChange = (e) => {
    setConversionType(e.target.value);
    resetState();
  };

  const resetState = () => {
    setFile(null);
    setFileUrl('');
    setConvertedUrl('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    setIsProcessing(true);
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }

    const inputFileName = file.name;
    const outputFileName = conversionType === 'mp4ToWebp' ? 'output.webp' : 'output.mp4';

    try {
      await ffmpeg.FS('writeFile', inputFileName, await fetchFile(file));

      if (conversionType === 'mp4ToWebp') {
        await ffmpeg.run('-i', inputFileName, '-vf', 'fps=10,scale=320:-1:flags=lanczos', '-c:v', 'libwebp', '-lossless', '0', '-compression_level', '6', '-q:v', '50', '-loop', '0', '-preset', 'default', outputFileName);
      } else {
        await ffmpeg.run('-i', inputFileName, '-c:v', 'libx264', '-crf', '28', '-preset', 'veryfast', outputFileName);
      }

      const data = ffmpeg.FS('readFile', outputFileName);
      const convertedBlob = new Blob([data.buffer], { type: conversionType === 'mp4ToWebp' ? 'image/webp' : 'video/mp4' });
      const convertedUrl = URL.createObjectURL(convertedBlob);

      setConvertedUrl(convertedUrl);
    } catch (error) {
      setError('Failed to convert the file. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Container maxWidth="md" sx={{ textAlign: 'center', p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Video Format Converter
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
          <input type="file" accept="video/mp4,image/webp" onChange={handleFileChange} ref={fileInputRef} />
        </Box>
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

        {fileUrl && (
          <>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Preview</Typography>
              {conversionType === 'mp4ToWebp' ? (
                <video src={fileUrl} controls style={{ width: '100%' }} />
              ) : (
                <img src={fileUrl} alt="Preview" style={{ width: '100%' }} />
              )}
            </Box>

            <Box sx={{ mt: 4 }}>
              <RadioGroup row value={conversionType} onChange={handleConversionTypeChange}>
                <FormControlLabel value="mp4ToWebp" control={<Radio />} label="MP4 to WebP" />
                <FormControlLabel value="webpToMp4" control={<Radio />} label="WebP to MP4" />
              </RadioGroup>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Button onClick={handleConvert} disabled={isProcessing} variant="contained" color="primary">
                {isProcessing ? 'Processing...' : 'Convert'}
              </Button>
            </Box>
          </>
        )}

        {convertedUrl && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Converted File</Typography>
            {conversionType === 'mp4ToWebp' ? (
              <img src={convertedUrl} alt="Converted" style={{ width: '100%' }} />
            ) : (
              <video src={convertedUrl} controls style={{ width: '100%' }} />
            )}
            <br />
            <Button href={convertedUrl} download={conversionType === 'mp4ToWebp' ? 'output.webp' : 'output.mp4'} variant="contained" color="secondary" sx={{ mt: 2 }}>
              Download Converted File
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Converter;

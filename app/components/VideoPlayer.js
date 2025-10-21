'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  LinearProgress,
  Card,
  CardContent,
  Chip
} from '@mui/material'
import {
  ArrowBack,
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
  FullscreenExit
} from '@mui/icons-material'

export default function VideoPlayer({ video, onComplete, onBack }) {
  console.log('VideoPlayer rendered with video:', video)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [videoCompleted, setVideoCompleted] = useState(false)
  
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const controlsTimeoutRef = useRef(null)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration)
      // Auto-play the video when metadata is loaded
      videoElement.play().catch((error) => {
        console.log('Autoplay failed:', error)
        setIsPlaying(false)
      })
    }

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime)
    }

    const handleEnded = () => {
      console.log('Video ended, calling onComplete')
      setIsPlaying(false)
      setVideoCompleted(true)
      onComplete()
    }

    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata)
    videoElement.addEventListener('timeupdate', handleTimeUpdate)
    videoElement.addEventListener('ended', handleEnded)

    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata)
      videoElement.removeEventListener('timeupdate', handleTimeUpdate)
      videoElement.removeEventListener('ended', handleEnded)
    }
  }, [onComplete])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const togglePlay = () => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (isPlaying) {
      videoElement.pause()
    } else {
      videoElement.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (event) => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const rect = event.currentTarget.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const newTime = (clickX / rect.width) * duration
    videoElement.currentTime = newTime
    setCurrentTime(newTime)
  }

  const toggleMute = () => {
    const videoElement = videoRef.current
    if (!videoElement) return

    videoElement.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (event) => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const newVolume = parseFloat(event.target.value)
    videoElement.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } catch (error) {
        console.error('Error attempting to enable fullscreen:', error)
      }
    } else {
      try {
        await document.exitFullscreen()
        setIsFullscreen(false)
      } catch (error) {
        console.error('Error attempting to exit fullscreen:', error)
      }
    }
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false)
    }, 3000)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box 
        sx={{ 
          mb: 3,
          animation: 'slideInUp 0.6s ease-out',
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={onBack}
          variant="outlined"
            sx={{ 
              mb: 2,
              backdropFilter: 'blur(15px)',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              border: '2px solid #8b5cf6',
              color: '#8b5cf6',
              fontWeight: 600,
              borderRadius: '12px',
              padding: '12px 24px',
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)',
              '&:hover': {
                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                transform: 'translateY(-3px)',
                border: '2px solid #7c3aed',
                color: '#7c3aed',
                boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)',
                textShadow: '0 1px 3px rgba(255, 255, 255, 0.7)',
              }
            }}
        >
          Back to Training
        </Button>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          className="gradient-text"
          sx={{ fontWeight: 600 }}
        >
          {video.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, opacity: 0.9, color: '#e2e8f0' }}>
          {video.description}
        </Typography>
        <Chip
          label={`Duration: ${video.duration}`}
          sx={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
            color: 'white',
            fontWeight: 600,
            boxShadow: '0 6px 20px rgba(139, 92, 246, 0.4)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        />
      </Box>

      <Card 
        ref={containerRef}
        sx={{ 
          position: 'relative',
          overflow: 'hidden',
          animation: 'fadeInScale 0.8s ease-out',
          '&:hover .video-controls': {
            opacity: 1
          }
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setShowControls(false)}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: 300, md: 600 },
            backgroundColor: '#000'
          }}
        >
          <video
            ref={videoRef}
            src={video.videoUrl}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
            poster={video.thumbnail}
            autoPlay
            muted
          />

          {/* Video Controls Overlay */}
          <Box
            className="video-controls"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              opacity: showControls ? 1 : 0,
              transition: 'opacity 0.3s ease',
              p: 2
            }}
          >
            {/* Progress Bar */}
            <Box
              sx={{
                position: 'relative',
                mb: 2,
                cursor: 'pointer'
              }}
              onClick={handleSeek}
            >
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#1976d2'
                  }
                }}
              />
            </Box>

            {/* Control Buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton onClick={togglePlay} sx={{ color: 'white' }}>
                {isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 120 }}>
                <IconButton onClick={toggleMute} sx={{ color: 'white' }}>
                  {isMuted ? <VolumeOff /> : <VolumeUp />}
                </IconButton>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  style={{
                    width: 60,
                    accentColor: '#1976d2'
                  }}
                />
              </Box>

              <Typography variant="body2" sx={{ color: 'white', minWidth: 100 }}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </Typography>

              <Box sx={{ flexGrow: 1 }} />

              <IconButton onClick={toggleFullscreen} sx={{ color: 'white' }}>
                {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
              </IconButton>
            </Box>
          </Box>
        </Box>

        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: '#e2e8f0' }}>
              Video {video.id} of 2
            </Typography>
            {videoCompleted && (
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#059669' }}>
                ✓ Video Completed
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

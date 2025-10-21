'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Chip,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper
} from '@mui/material'
import {
  CheckCircle,
  Cancel,
  Home,
  PlayArrow,
  EmojiEvents,
  TrendingUp,
  Assessment
} from '@mui/icons-material'
import AnimatedBackground from './AnimatedBackground'
// Removed canvas-confetti to avoid SSR issues - using CSS animations instead

export default function ResultsScreen({ results, onNextVideo, onBackToHome }) {
  const [showConfetti, setShowConfetti] = useState(false)

  // Get the most recent result (current video)
  const currentResult = results[results.length - 1]
  const currentVideo = currentResult ? {
    title: currentResult.videoIndex === 0 ? "Firefighting Safety Training" : "CPR & First Aid Training",
    index: currentResult.videoIndex + 1
  } : null

  const score = currentResult ? currentResult.score : 0
  const totalQuestions = currentResult ? currentResult.totalQuestions : 0
  const scorePercentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0
  const isPerfectScore = scorePercentage === 100
  const isExcellentScore = scorePercentage >= 90
  const isGoodScore = scorePercentage >= 70

  useEffect(() => {
    // Trigger confetti animation
    const timer = setTimeout(() => {
      setShowConfetti(true)
      triggerConfetti()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const triggerConfetti = () => {
    // Simple CSS-based confetti effect
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const getScoreColor = () => {
    if (isPerfectScore) return 'success'
    if (isExcellentScore) return 'primary'
    if (isGoodScore) return 'warning'
    return 'error'
  }

  const getScoreMessage = () => {
    if (isPerfectScore) return "Perfect! Outstanding performance!"
    if (isExcellentScore) return "Excellent! Great job!"
    if (isGoodScore) return "Good work! Keep it up!"
    return "Keep practicing to improve your score!"
  }

  const getScoreIcon = () => {
    if (isPerfectScore) return <EmojiEvents sx={{ fontSize: 60, color: 'gold' }} />
    if (isExcellentScore) return <TrendingUp sx={{ fontSize: 60, color: 'primary.main' }} />
    return <Assessment sx={{ fontSize: 60, color: 'warning.main' }} />
  }

  const isLastVideo = currentResult && currentResult.videoIndex === 1 // 0-based index, so 1 means second video

  return (
    <Box sx={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflow: 'hidden'
    }}>
      <AnimatedBackground />
      <Container maxWidth="lg" sx={{ py: 2, maxHeight: '100vh', overflow: 'hidden', position: 'relative', zIndex: 2 }}>
      {showConfetti && (
        <Box className="confetti-container">
          {Array.from({ length: 50 }).map((_, i) => (
            <Box
              key={i}
              className="confetti-piece"
              sx={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </Box>
      )}
      <Box 
        sx={{ 
          mb: 4, 
          textAlign: 'center',
          animation: 'slideInUp 0.8s ease-out',
        }}
      >
        {/* <Button
          startIcon={<Home />}
          onClick={onBackToHome}
          variant="outlined"
          sx={{ 
            mb: 3,
            backdropFilter: 'blur(15px)',
            backgroundColor: 'rgba(139, 92, 246, 0.15)',
            border: '2px solid rgba(139, 92, 246, 0.3)',
            color: '#0f172a',
            fontWeight: 600,
            borderRadius: '12px',
            padding: '12px 24px',
            textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(139, 92, 246, 0.25)',
              transform: 'translateY(-3px)',
              border: '2px solid rgba(139, 92, 246, 0.5)',
              boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)',
              textShadow: '0 1px 3px rgba(255, 255, 255, 0.7)',
            }
          }}
        >
          Back to Home
        </Button> */}

        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          className="gradient-text"
          sx={{ 
            fontWeight: 700,
            mb: 1,
            fontSize: '2rem',
            animation: 'pulse 2s infinite',
          }}
        >
          {currentVideo ? `${currentVideo.title} Complete!` : 'Training Complete!'}
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            opacity: 0.9,
            fontWeight: 400,
          }}
        >
          {currentVideo ? `Congratulations on completing ${currentVideo.title}!` : 'Congratulations on finishing the training program'}
        </Typography>
      </Box>

      {/* Overall Score Card */}
      <Card 
        sx={{ 
          mb: 2, 
          textAlign: 'center',
          animation: 'fadeInScale 0.8s ease-out 0.2s both',
        }}
      >
        <CardContent sx={{ py: 3 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 2,
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            {getScoreIcon()}
          </Box>
          
          <Typography 
            variant="h3" 
            component="div" 
            className="gradient-text"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: '2.5rem',
              animation: 'pulse 2s infinite',
            }}
          >
            {scorePercentage}%
          </Typography>
          
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              mb: 1,
            }}
          >
            {getScoreMessage()}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2,
              opacity: 0.8,
            }}
          >
            You answered {score} out of {totalQuestions} questions correctly
          </Typography>

          <LinearProgress
            variant="determinate"
            value={scorePercentage}
            sx={{ 
              height: 12, 
              borderRadius: 6, 
              mb: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              '& .MuiLinearProgress-bar': {
                background: getScoreColor() === 'success'
                  ? 'linear-gradient(90deg, #10b981 0%, #34d399 100%)'
                  : getScoreColor() === 'warning'
                    ? 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)'
                    : 'linear-gradient(90deg, #ef4444 0%, #f87171 100%)',
                borderRadius: 6,
              }
            }}
          />

          <Chip
            label={`${score}/${totalQuestions} Correct`}
            size="medium"
            sx={{ 
              fontSize: '1rem',
              fontWeight: 600,
              background: getScoreColor() === 'success'
                ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
                : getScoreColor() === 'warning'
                  ? 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
                  : 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
              color: 'white',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}
          />
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {results.map((result, index) => {
          const videoTitle = `Video ${result.videoIndex + 1}: Training Module ${result.videoIndex + 1}`
          const videoScore = Math.round((result.score / result.totalQuestions) * 100)
          
          return (
            <Grid 
              item 
              xs={12} 
              md={6} 
              key={result.videoId}
              sx={{
                animation: `slideInUp 0.6s ease-out ${0.4 + index * 0.1}s both`,
              }}
            >
              <Card
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
                  }
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography 
                      variant="body1" 
                      component="h3"
                      sx={{ fontWeight: 600 }}
                    >
                      {videoTitle}
                    </Typography>
                    <Chip
                      label={`${videoScore}%`}
                      sx={{
                        background: videoScore >= 80 
                          ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
                          : videoScore >= 60
                          ? 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
                          : 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
                        color: 'white',
                        fontWeight: 600,
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                      }}
                    />
                  </Box>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ mb: 2, opacity: 0.8 }}
                  >
                    {result.score} out of {result.totalQuestions} questions correct
                  </Typography>
                  
                  <LinearProgress
                    variant="determinate"
                    value={videoScore}
                    sx={{ 
                      height: 10, 
                      borderRadius: 5,
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      '& .MuiLinearProgress-bar': {
                        background: videoScore >= 80 
                          ? 'linear-gradient(90deg, #10b981 0%, #34d399 100%)'
                          : videoScore >= 60
                          ? 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)'
                          : 'linear-gradient(90deg, #ef4444 0%, #f87171 100%)',
                        borderRadius: 5,
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      {/* Performance Summary */}
      <Paper 
        sx={{ 
          p: 2, 
          mb: 2,
          animation: 'slideInUp 0.6s ease-out 0.8s both',
        }}
      >
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            fontWeight: 600,
            mb: 1,
          }}
        >
          <Assessment />
          Performance Summary
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box 
              sx={{ 
                textAlign: 'center',
                animation: 'slideInLeft 0.6s ease-out 1s both',
              }}
            >
              <Typography 
                variant="h3" 
                className="gradient-text"
                sx={{ fontWeight: 700 }}
              >
                {results.length}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                Modules Completed
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Box 
              sx={{ 
                textAlign: 'center',
                animation: 'slideInUp 0.6s ease-out 1.1s both',
              }}
            >
              <Typography 
                variant="h3" 
                sx={{ 
                  color: 'success.main',
                  fontWeight: 700,
                }}
              >
                {score}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                Questions Correct
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Box 
              sx={{ 
                textAlign: 'center',
                animation: 'slideInRight 0.6s ease-out 1.2s both',
              }}
            >
              <Typography 
                variant="h3" 
                sx={{ 
                  color: 'primary.main',
                  fontWeight: 700,
                }}
              >
                {totalQuestions}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                Total Questions
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Action Buttons */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 1.5,
          animation: 'slideInUp 0.6s ease-out 1.4s both',
          mt: 1,
        }}
      >
        {!isLastVideo && (
           <Button
             variant="outlined"
             size="medium"
             onClick={onNextVideo}
             startIcon={<PlayArrow />}
             sx={{ 
               minWidth: 180,
               border: '2px solid #10b981',
               color: '#10b981',
               backgroundColor: 'rgba(16, 185, 129, 0.1)',
               fontWeight: 700,
               fontSize: '1rem',
               padding: '12px 24px',
               borderRadius: '12px',
               textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)',
               '&:hover': {
                 backgroundColor: 'rgba(16, 185, 129, 0.2)',
                 border: '2px solid #059669',
                 color: '#059669',
                 transform: 'translateY(-3px) scale(1.02)',
                 boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                 textShadow: '0 1px 3px rgba(255, 255, 255, 0.7)',
               },
             }}
           >
             Next Training
           </Button>
        )}
        
        <Button
          variant="outlined"
          size="medium"
          onClick={onBackToHome}
          startIcon={<Home />}
          sx={{ 
            minWidth: 180,
            border: '2px solid #8b5cf6',
            color: '#8b5cf6',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            fontWeight: 700,
            fontSize: '1rem',
            padding: '12px 24px',
            borderRadius: '12px',
            textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(139, 92, 246, 0.2)',
              border: '2px solid #7c3aed',
              color: '#7c3aed',
              transform: 'translateY(-3px) scale(1.02)',
              boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)',
              textShadow: '0 1px 3px rgba(255, 255, 255, 0.7)',
            },
          }}
        >
          {isLastVideo ? 'Complete Training' : 'Back to Home'}
        </Button>
      </Box>

      {isPerfectScore && (
        <Alert severity="success" sx={{ mt: 3 }}>
          <Typography variant="h6">
            🎉 Perfect Score! You've mastered all the training materials!
          </Typography>
        </Alert>
      )}

      {isExcellentScore && !isPerfectScore && (
        <Alert severity="info" sx={{ mt: 3 }}>
          <Typography variant="h6">
            🌟 Excellent performance! You're well on your way to mastery!
          </Typography>
        </Alert>
      )}

      {!isExcellentScore && (
        <Alert severity="warning" sx={{ mt: 3 }}>
          <Typography variant="h6">
            📚 Good effort! Consider reviewing the materials to improve your understanding.
          </Typography>
        </Alert>
      )}
      </Container>
    </Box>
  )
}

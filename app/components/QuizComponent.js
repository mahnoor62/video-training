'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  LinearProgress,
  Chip,
  Alert,
  IconButton
} from '@mui/material'
import {
  ArrowBack,
  ArrowForward,
  CheckCircle,
  Quiz
} from '@mui/icons-material'

export default function QuizComponent({ quiz, onComplete, onBack }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30) // 30 seconds per question
  const [isTimerActive, setIsTimerActive] = useState(true)

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  useEffect(() => {
    if (!isTimerActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimerActive(false)
          handleNextQuestion()
          return 30
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isTimerActive, currentQuestionIndex])

  useEffect(() => {
    setSelectedAnswer(answers[currentQuestionIndex] || '')
  }, [currentQuestionIndex, answers])

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value)
  }

  const handleNextQuestion = () => {
    const newAnswers = {
      ...answers,
      [currentQuestionIndex]: selectedAnswer
    }
    setAnswers(newAnswers)

    if (isLastQuestion) {
      calculateScore(newAnswers)
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer('')
      setTimeLeft(30)
      setIsTimerActive(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      setTimeLeft(30)
      setIsTimerActive(true)
    }
  }

  const calculateScore = (finalAnswers) => {
    let score = 0
    const results = quiz.questions.map((question, index) => {
      const userAnswer = finalAnswers[index] // Keep as alphabetic label (A, B, C, D)
      const userAnswerIndex = userAnswer ? userAnswer.charCodeAt(0) - 65 : -1 // Convert A,B,C,D to 0,1,2,3
      const isCorrect = userAnswerIndex === question.correctAnswer
      if (isCorrect) score++
      
      return {
        questionId: question.id,
        question: question.question,
        userAnswer: userAnswerIndex,
        correctAnswer: question.correctAnswer,
        isCorrect,
        options: question.options
      }
    })

    onComplete(finalAnswers, score)
  }

  const getTimerColor = () => {
    if (timeLeft > 20) return 'primary'
    if (timeLeft > 10) return 'warning'
    return 'error'
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!currentQuestion) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          No questions available for this quiz.
        </Alert>
      </Container>
    )
  }

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
          className="crystal-button crystal-button-secondary"
          sx={{ 
            mb: 2,
            borderRadius: '12px',
            padding: '12px 24px',
            fontWeight: 600,
          }}
        >
          Back
        </Button>
        
        <Box sx={{ 
          display: 'flex', 
          // flexDirection: 'column',
          // alignItems: 'center',
          gap: 2,
          mb: 2 
        }}>
          {/* Quiz Assessment Strip - Centered */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #e31b23 0%, #333092 100%)',
              borderRadius: '12px',
              padding: '15px 25px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 8px 25px rgba(227, 27, 35, 0.3)',
              width: '100%',
              maxWidth: '300px',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                borderRadius: '12px'
              }
            }}
          >
            <Typography 
              variant="h4" 
              component="h1"
              sx={{ 
                fontWeight: 700,
                color: 'white',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))',
                background: 'linear-gradient(45deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'shimmer 2s ease-in-out infinite',
                letterSpacing: '-0.02em',
                position: 'relative',
                zIndex: 1,
                fontSize: '1.5rem',
                textAlign: 'center'
              }}
            >
              Quiz Assessment
            </Typography>
          </Box>
          
          {/* Question and Timer Chips - Both at End */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'flex-end',
            gap: 2,
            width: '100%',
            maxWidth: '500px',
            marginLeft: 'auto'
          }}>
            <Chip
              icon={<Quiz />}
              label={`Question ${currentQuestionIndex + 1} of ${quiz.questions.length}`}
              sx={{
                background: 'linear-gradient(135deg, #e31b23 0%, #333092 100%)',
                color: 'white',
                fontWeight: 600,
                boxShadow: '0 6px 20px rgba(227, 27, 35, 0.4)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontSize: '0.9rem',
                height: '36px'
              }}
            />
            <Chip
              label={formatTime(timeLeft)}
              sx={{
                background: getTimerColor() === 'error' 
                  ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
                  : getTimerColor() === 'warning'
                  ? 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)'
                  : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: 'white',
                fontWeight: 600,
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                animation: timeLeft <= 10 ? 'pulse 1s infinite' : 'none',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontSize: '0.9rem',
                height: '36px'
              }}
            />
          </Box>
        </Box>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ 
            height: 12, 
            borderRadius: 6, 
            mb: 3,
            backgroundColor: 'rgba(227, 27, 35, 0.1)',
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(90deg, #e31b23 0%, #333092 100%)',
              borderRadius: 6,
            }
          }}
        />
      </Box>

      <Card 
        sx={{ 
          mb: 4,
          animation: 'fadeInScale 0.6s ease-out',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography 
            variant="h5" 
            component="h2" 
            gutterBottom 
            sx={{ 
              mb: 4,
              fontWeight: 600,
              color: '#0f172a',
            }}
          >
            {currentQuestion.question}
          </Typography>

          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              value={selectedAnswer}
              onChange={handleAnswerChange}
              sx={{ gap: 2 }}
            >
              {currentQuestion.options.map((option, index) => {
                const alphabetLabel = String.fromCharCode(65 + index) // A, B, C, D
                return (
                  <Card
                    key={index}
                    sx={{
                      border: selectedAnswer === alphabetLabel ? 2 : 1,
                      borderColor: selectedAnswer === alphabetLabel 
                        ? 'primary.main' 
                        : 'rgba(255, 255, 255, 0.2)',
                      background: selectedAnswer === alphabetLabel 
                        ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)'
                        : 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      animation: `slideInLeft 0.4s ease-out ${index * 0.1}s both`,
                        '&:hover': {
                          borderColor: 'primary.main',
                          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(37, 99, 235, 0.2)',
                        }
                    }}
                  >
                    <FormControlLabel
                      value={alphabetLabel}
                      control={
                        <Radio 
                          sx={{
                            '& .MuiSvgIcon-root': {
                              fontSize: 0, // Hide the default radio icon
                            },
                            '&:before': {
                              content: `"${alphabetLabel}"`,
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              background: selectedAnswer === alphabetLabel 
                                ? 'linear-gradient(135deg, #e31b23 0%, #333092 100%)'
                                : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: selectedAnswer === alphabetLabel ? 'white' : '#64748b',
                              fontWeight: 700,
                              fontSize: '0.9rem',
                              border: selectedAnswer === alphabetLabel 
                                ? '2px solid #e31b23' 
                                : '2px solid #e2e8f0',
                              transition: 'all 0.3s ease',
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)'
                            }
                          }}
                        />
                      }
                      label={
                        <Typography variant="body1" sx={{ fontWeight: 500, ml: 1 }}>
                          {option}
                        </Typography>
                      }
                      sx={{
                        width: '100%',
                        m: 0,
                        p: 2,
                        '& .MuiFormControlLabel-label': {
                          width: '100%'
                        }
                      }}
                    />
                  </Card>
                )
              })}
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="outlined"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          startIcon={<ArrowBack />}
          className="crystal-button crystal-button-secondary"
          sx={{
            opacity: currentQuestionIndex === 0 ? 0.5 : 1,
          }}
        >
          Previous
        </Button>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {quiz.questions.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: answers[index] !== undefined ? '#e31b23' : 'grey.300',
                border: currentQuestionIndex === index ? 2 : 0,
                borderColor: '#333092'
              }}
            />
          ))}
        </Box>

        <Button
          variant="contained"
          onClick={handleNextQuestion}
          disabled={selectedAnswer === ''}
          endIcon={isLastQuestion ? <CheckCircle /> : <ArrowForward />}
          size="large"
          className="crystal-button crystal-button-primary"
          sx={{
            opacity: selectedAnswer === '' ? 0.5 : 1,
          }}
        >
          {isLastQuestion ? 'Complete Quiz' : 'Next Question'}
        </Button>
      </Box>

      {timeLeft <= 10 && timeLeft > 0 && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          Time running out! {timeLeft} seconds remaining.
        </Alert>
      )}
    </Container>
  )
}

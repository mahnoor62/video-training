'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Chip
} from '@mui/material'
import {
  PlayArrow,
  School,
  Security,
  HealthAndSafety,
  TrendingUp,
  Star
} from '@mui/icons-material'
import AnimatedBackground from './AnimatedBackground'

export default function LandingPage({ onStartTraining }) {
  const [isHovered, setIsHovered] = useState(false)

  const features = [
    {
      icon: <Security sx={{ fontSize: 40, color: '#8b5cf6' }} />,
      title: "Firefighting Safety",
      description: "Learn essential firefighting techniques, safety protocols, and emergency response procedures to protect lives and property"
    },
    {
      icon: <HealthAndSafety sx={{ fontSize: 40, color: '#8b5cf6' }} />,
      title: "CPR & First Aid",
      description: "Master life-saving CPR techniques, first aid procedures, and emergency medical response skills"
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: '#8b5cf6' }} />,
      title: "Certified Training",
      description: "Professional certification in firefighting and CPR that meets industry standards and requirements"
    }
  ]

  const stats = [
    { number: "10K+", label: "Trainees Certified" },
    { number: "99%", label: "Success Rate" },
    { number: "24/7", label: "Access Available" }
  ]

  return (
    <Box sx={{
        height:'100%',
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <AnimatedBackground />
      
      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 2 }}>
        {/* Header Section */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 3,
            animation: 'slideInUp 0.8s ease-out'
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 4
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
                animation: 'pulse 2s infinite',
                border: '4px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <School sx={{ fontSize: 60, color: 'white' }} />
            </Avatar>
          </Box>

          <Typography
            variant="h1"
            component="h1"
            className="gradient-text"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '3rem', md: '4.5rem' },
              letterSpacing: '-0.02em',
              mb: 2,
              animation: 'slideInUp 0.8s ease-out 0.2s both'
            }}
          >
              Professional Training Center
          </Typography>

          {/* <Typography
            variant="h4"
            sx={{
              color: '#0f172a',
              fontWeight: 400,
              mb: 4,
              opacity: 0.9,
              animation: 'slideInUp 0.8s ease-out 0.4s both'
            }}
          >
            Professional Safety & Emergency Response Training
          </Typography> */}

          <Typography
            variant="h6"
            sx={{
              color: '#475569',
              maxWidth: 800,
              mx: 'auto',
              mb: 6,
              lineHeight: 1.6,
              animation: 'slideInUp 0.8s ease-out 0.6s both'
            }}
          >
          Enhance your skills with our comprehensive video training program
          </Typography>

          {/* Start Now Button */}
          <Button
            variant="contained"
            size="large"
            onClick={onStartTraining}
            startIcon={<PlayArrow />}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
              color: 'white',
              fontWeight: 700,
              mb:5,
              fontSize: '1.3rem',
              padding: '20px 40px',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              transform: isHovered ? 'translateY(-5px) scale(1.05)' : 'translateY(0) scale(1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              animation: 'slideInUp 0.8s ease-out 0.8s both',
              '&:hover': {
                background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
                boxShadow: '0 15px 40px rgba(139, 92, 246, 0.6)',
                border: '2px solid rgba(255, 255, 255, 0.4)',
              }
            }}
          >
            Start Training Now
          </Button>
        </Box>

        {/* Features Section */}
        <Box
          sx={{
            mb: 5,
            animation: 'slideInUp 0.8s ease-out 1s both'
          }}
        >
          <Typography
            variant="h3"
            textAlign="center"
            // className="gradient-text"
            sx={{
              fontWeight: 700,
              mb: 6
            }}
          >
            Why Choose Our Training?
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
            {features.map((feature, index) => (
              <Card
                key={index}
                sx={{
                  textAlign: 'center',
                  p: 3,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  animation: `slideInUp 0.6s ease-out ${1.2 + index * 0.1}s both`,
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(139, 92, 246, 0.25)',
                    border: '1px solid rgba(139, 92, 246, 0.4)',
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: '#1e293b',
                      mb: 2
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#475569',
                      lineHeight: 1.6
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Stats Section */}
        <Box
          sx={{
            textAlign: 'center',
            animation: 'slideInUp 0.8s ease-out 1.4s both'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
            {stats.map((stat, index) => (
              <Box
                key={index}
                sx={{
                  textAlign: 'center',
                  animation: `slideInUp 0.6s ease-out ${1.6 + index * 0.1}s both`
                }}
              >
                <Typography
                  variant="h2"
                  className="gradient-text"
                  sx={{
                    fontWeight: 800,
                    mb: 1
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#475569',
                    fontWeight: 500
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Trust Indicators */}
        {/* <Box
          sx={{
            textAlign: 'center',
            mt: 8,
            animation: 'slideInUp 0.8s ease-out 1.8s both'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: '#475569',
              mb: 3,
              fontWeight: 500
            }}
          >
            Trusted by professionals worldwide
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} sx={{ color: '#fbbf24', fontSize: 30 }} />
            ))}
            <Chip
              label="4.9/5 Rating"
              sx={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                color: 'white',
                fontWeight: 600,
                ml: 2
              }}
            />
          </Box>
        </Box> */}
      </Container>
    </Box>
  )
}

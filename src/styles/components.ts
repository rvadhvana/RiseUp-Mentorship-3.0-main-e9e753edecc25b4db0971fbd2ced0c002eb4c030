import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { colors, shadows, typography } from './theme';

export const Card = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: ${shadows.md};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${shadows.lg};
  }
`;

export const Button = styled(motion.button)<{ variant?: 'primary' | 'mentor' | 'mentee' | 'organization' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
  
  ${({ variant = 'primary' }) => {
    const colorMap = {
      primary: colors.primary,
      mentor: colors.mentor,
      mentee: colors.mentee,
      organization: colors.organization,
    };
    
    const color = colorMap[variant];
    
    return `
      background: ${color};
      color: white;
      
      &:hover {
        background: ${color};
      }
      
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `;
  }}
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${colors.gray[300]};
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary[500]};
    box-shadow: 0 0 0 3px ${colors.primary[100]};
  }
`;

export const Heading = styled.h1`
  font-family: ${typography.fontFamily.heading};
  font-weight: 700;
  color: ${colors.gray[900]};
`; 
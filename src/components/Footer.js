import React from 'react'
import { Container, Box, Link } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <Box component={'footer'} sx={{ backgroundColor: '#072942', py: 2, mt: 'auto', position: 'fixed', bottom: 0, width: '100%', zIndex: 1 }}>
        <Container maxWidth="xl" sx={{display: 'flex', justifyContent: 'space-between', flexDirection: {xs: 'column', md: 'row'}, gap: 4, alignItems: 'center'}}>
            <Box sx={{display: 'flex', gap: '20px'}}>
                <FooterLink href="/" text={'Preguntas frecuentes'} />
                <FooterLink href="/" text={'Blog'} />
                <FooterLink href="/" text={'Términos y condiciones'} />
                <FooterLink href="/" text={'Políticas de privacidad'} />
            </Box>
            <Box sx={{display: 'flex', gap: '10px'}}>
                <FooterSocialIcon href="/" icon={<FacebookIcon />} />
                <FooterSocialIcon href="/" icon={<InstagramIcon />} />
                <FooterSocialIcon href="/" icon={<TwitterIcon />} />
            </Box>
        </Container>
    </Box>
  )
}

const FooterLink = ({ href ,text }) => (
  <Link underline="none" color="#FFFFFF" fontSize={14} href={href}>
    {text}
  </Link>
);

const FooterSocialIcon = ({ href, icon }) => (
  <Link underline="none" color="#dcf22b" href={href}>
    {icon}
  </Link>
);

export default Footer
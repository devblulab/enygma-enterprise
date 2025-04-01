import Link from 'next/link';
import { FaShoppingCart, FaStore, FaPhone, FaTachometerAlt, FaChartPie, FaBars } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, memo } from 'react';

const useStyles = makeStyles((theme) => ({
  menuWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, rgb(26, 46, 53) 0%, #1a1a2e 100%)',
  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0,
    filter: 'brightness(0.19) blur(10px)',
    willChange: 'transform, filter', // Performance optimization
  },
  menuContainer: {
    width: '90%',
    maxWidth: '500px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(3),
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(15px)',
    position: 'relative',
    zIndex: 1,
  },
  sectionTitle: {
    color: '#00ff88',
    fontSize: '20px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '5px',
    width: '100%',
    textAlign: 'center', // <-- Centraliza o texto
  },
  
  menuItem: {
    color: '#00ff88',
    fontSize: '1.125rem',
    background: 'rgba(0, 0, 0, 0.32)',
    padding: theme.spacing(1.5, 3),
    borderRadius: '15px',
    width: '100%',
    textAlign: 'center',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(1),
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(0, 255, 136, 0.1)',
      boxShadow: '0 0 10px rgba(0, 255, 136, 0.5)',
    },
  },
  textEffect: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(80, 80, 80, 0.3), transparent)',
    animation: '$shineEffect 20s infinite',
    willChange: 'transform', // Performance optimization
  },
  copyButton: {
    background: 'transparent',
    border: '1px solid #00ff88',
    color: '#00ff88',
    borderRadius: '10px',
    fontSize: '0.75rem',
    padding: theme.spacing(0.5, 1),
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: '#00ff88',
      color: '#1a1a2e',
    },
  },
  '@keyframes shineEffect': {
    '0%': { left: '-100%' },
    '100%': { left: '100%' },
  },
}));

interface MenuItem {
  href: string;
  icon: React.ReactNode;
  label: string;
}

interface MenuSection {
  section: string;
  items: MenuItem[];
}

const NavigationButtons: React.FC = memo(() => {
  const classes = useStyles();
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const baseUrl = 'https://enygna-enterprises.com.br';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.playbackRate = 0.4;
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
  }, []);

  const copyToClipboard = (path: string): void => {
    navigator.clipboard.writeText(`${baseUrl}${path}`).catch((err) => {
      console.error('Failed to copy to clipboard:', err);
    });
  };

  const menuSections: MenuSection[] = [
    {
      section: 'LOJA',
      items: [
        { href: '/beto/dashboard', icon: <FaTachometerAlt />, label: 'Painel de Controle' },
        { href: '/beto/requerimento', icon: <FaStore />, label: 'Intenção de Venda Loja' },
      ],
    },
    {
      section: 'DIGITAL',
      items: [
        { href: '/beto/dashboard/digital', icon: <FaChartPie />, label: 'Painel de Controle Digital' },
        { href: '/beto/requerimento/digital', icon: <FaPhone />, label: 'Intenção de Venda Digital' },
      ],
    },
    {
      section: 'MENU',
      items: [
        { href: '/beto/digital', icon: <FaBars />, label: 'Menu Digital' },
        { href: '/beto/empresas', icon: <FaBars />, label: 'Menu Empresas' },
      ],
    },
  ];

  const motionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: shouldReduceMotion ? {} : { scale: 0.99, rotate: 1 },
    tap: { scale: 0.99 },
  };

  return (
    <div className={classes.menuWrapper}>
      <video ref={videoRef} autoPlay loop muted playsInline className={classes.videoBackground}>
        <source src="/betovideo.mp4" type="video/mp4" />
      </video>

      <motion.div
        className={classes.menuContainer}
        initial="initial"
        animate="animate"
        variants={motionVariants}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} style={{ width: '100%' }}>
            <div className={classes.sectionTitle}>{section.section}</div>
            {section.items.map((item, itemIndex) => (
              <motion.div
                key={itemIndex}
                variants={motionVariants}
                whileHover="hover"
                whileTap="tap"
                transition={{ duration: 0.2 }}
                style={{ width: '100%', marginBottom: '10px' }}
              >
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Link href={item.href} className={classes.menuItem}>
                    {item.icon}
                    {item.label}
                    {!shouldReduceMotion && (
                      <motion.div
                        className={classes.textEffect}
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                      />
                    )}
                  </Link>
                  <button
                    className={classes.copyButton}
                    onClick={() => copyToClipboard(item.href)}
                    aria-label={`Copy ${item.label} URL`}
                  >
                    Copy
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
});

NavigationButtons.displayName = 'NavigationButtons';

export default NavigationButtons;

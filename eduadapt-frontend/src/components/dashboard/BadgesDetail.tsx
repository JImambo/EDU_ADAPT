// src/components/dashboard/BadgesDetail.tsx
import React from 'react';
import { Box, Typography, Modal, Button, Card, CardContent, CardActions } from '@mui/material';
// import { EmojiEvents } from '@mui/icons-material';

interface BadgesDetailProps {
  open: boolean;
  onClose: () => void;
}

// Données mockées pour les badges
const allBadges = [
  { name: 'Premiers Pas', icon: '🚶', achieved: true },
  { name: 'Curieux', icon: '🤔', achieved: true },
  { name: 'Persévérant', icon: '💪', achieved: true },
  { name: 'Expert du Sujet', icon: '🎓', achieved: false },
  { name: 'Génie Créatif', icon: '💡', achieved: false },
];

export const BadgesDetail: React.FC<BadgesDetailProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 500 },
          maxHeight: '80vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Vos Badges Gagnés
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {allBadges.map((badge) => (
            <Card key={badge.name} sx={{ opacity: badge.achieved ? 1 : 0.5 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <span style={{ fontSize: '2rem' }}>{badge.icon}</span>
                <Typography variant="body1">{badge.name}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
        <CardActions>
          <Button onClick={onClose} sx={{ mt: 2 }}>
            Fermer
          </Button>
        </CardActions>
      </Box>
    </Modal>
  );
};
// src/components/dashboard/StudentDashboard.tsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  useTheme,
  alpha,
} from '@mui/material';

import { ChartDetail } from './ChartDetail';
import { BadgesDetail } from './BadgesDetail';

interface StatData {
  icon: React.ElementType;
  title: string;
  value: string;
}

interface StudentDashboardProps {
  stats: StatData[];
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ stats }) => {
  const theme = useTheme();
  // État pour savoir quelle vue détaillée est ouverte
  const [activeView, setActiveView] = useState<string | null>(null);

  const handleCloseDetail = () => {
    setActiveView(null);
  };

  return (
    <>
      <Paper
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
        }}
        elevation={3}
      >
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          Vue d'ensemble de l'apprentissage
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {/* Section du Graphique - RENDU CLIQUABLE */}
          <Box sx={{ flexGrow: 1, flexBasis: { xs: '100%', lg: '66.666%' }, minWidth: 300 }}>
            <Card
              sx={{
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                cursor: 'pointer', // Indique que c'est cliquable
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                }
              }}
              onClick={() => setActiveView('chart')} // Ouvre la vue du graphique
            >
              <Box textAlign="center">
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Graphique de Progression
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  (Cliquez pour voir les détails)
                </Typography>
              </Box>
            </Card>
          </Box>

          {/* Section des cartes de statistiques - RENDUES CLIQUABLES */}
          <Box sx={{ flexGrow: 1, flexBasis: { xs: '100%', lg: '33.333%' }, minWidth: 250 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                    }
                  }}
                  onClick={() => setActiveView(stat.title)} // Ouvre la vue spécifique au titre
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 2,
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                        }}
                      >
                        <stat.icon sx={{ fontSize: 28 }} />
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {stat.title}
                        </Typography>
                        <Typography variant="h5" component="p" fontWeight="bold">
                          {stat.value}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* --- RENDU CONDITIONNEL DES VUES DÉTAILLÉES --- */}
      {activeView === 'chart' && <ChartDetail open={true} onClose={handleCloseDetail} />}
      {activeView === 'Badges gagnés' && <BadgesDetail open={true} onClose={handleCloseDetail} />}
      {/* Vous pouvez ajouter d'autres vues ici pour "Progression hebdomadaire" et "Temps d'étude" si vous le souhaitez */}
    </>
  );
};
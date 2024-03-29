import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  LinearProgress,
  Typography,
} from '@mui/material';

function VocabularySetCard(
  {
    title,
    description,
    link,
    progress,
  }:
  {
    title: string,
    description: string,
    link: string,
    progress: number,
  },
) {
  return (
    <Card sx={{ m: 1 }}>
      <CardContent>
        <Typography variant="body1" component="h3" sx={{ fontSize: 22, fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: 14, mb: 1.5 }}>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">
              {`${Math.round(progress)}%`}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link to={`${link}`}>
            {link}
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default VocabularySetCard;

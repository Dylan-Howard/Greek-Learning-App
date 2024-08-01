// import { react } from 'react';

import './About.css';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CelebrationIcon from '@mui/icons-material/Celebration';
import AbcIcon from '@mui/icons-material/Abc';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SchoolIcon from '@mui/icons-material/School';

function AboutCard(
  { icon, header, description } : { icon: any, header: string, description: string },
) {
  return (
    <Card
      variant="outlined"
      className="AboutCard"
    >
      <CardContent
        sx={{ textAlign: 'center' }}
      >
        {icon}
        <Typography
          variant="h3"
          component="div"
          sx={{ fontSize: 14, fontWeight: 600, mb: 2 }}
          color="text.primary"
          gutterBottom
        >
          {/* Bridge the gap between translation and original text: */}
          {header}
        </Typography>
        <Typography variant="body2">
          {description}
          {/* Scriptura/Koine fosters a deeper understanding of the Scriptures by allowing you to
          interact directly with the Greek words used by the early Christian authors. */}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

function About() {
  return (
    <Stack
      className="AboutPage"
      spacing={6}
      sx={{
        bgcolor: 'background.default',
      }}
    >
      <Stack
        className="PageHeader"
        component="section"
        spacing={2}
        sx={{
          bgcolor: 'primary.main',
          height: '400',
          color: 'primary.contrastText',
          p: 12,
          pt: 8,
          minHeight: 1,
        }}
      >
        <Typography variant="h1" className="TextGreek">κοινὴ</Typography>
        <Typography variant="body1" className="HeadingParagraph">
          Koine is a revolutionary learning app designed to empower you to unlock the richness
          of the New Testament in its original language, Koine Greek.
        </Typography>
      </Stack>
      <Grid
        component="section"
        container
        justifyContent="center"
        alignItems="stretch"
        spacing={0}
        p={2}
      >
        <Grid
          item
          sm={12}
        >
          <Container>
            <Typography variant="h2" sx={{ mb: 2 }}>Our Mission</Typography>
            <Typography variant="body1" className="HeadingParagraph" sx={{ mb: 4 }}>
              We believe that everyone deserves the opportunity to engage with the Bible on a deeper
              level. By making Koine Greek accessible through innovative technology, we aim to:
            </Typography>
          </Container>
        </Grid>
        <Grid
          item
          sm={4}
        >
          <AboutCard
            icon={<SearchIcon sx={{ fontSize: 40, mb: 4 }} />}
            header="Bridge the gap between translation and original text"
            description="Scriptura/Koine fosters a deeper understanding of the Scriptures by allowing you to interact directly with the Greek words used by the early Christian authors."
          />
        </Grid>
        <Grid
          item
          sm={4}
        >
          <AboutCard
            icon={<AutoAwesomeIcon sx={{ fontSize: 40, mb: 4 }} />}
            header="Personalize your learning journey"
            description="Our adaptive interlinear text system adjusts to your knowledge level, revealing more Greek as you progress. This ensures a smooth learning curve that keeps you motivated and engaged."
          />
        </Grid>
        <Grid
          item
          sm={4}
        >
          <AboutCard
            icon={<CelebrationIcon sx={{ fontSize: 40, mb: 4 }} />}
            header="Make learning Koine Greek interactive and fun"
            description="Flashcards, video lectures, and drag-and-drop exercises transform vocabulary and grammar acquisition into an engaging experience."
          />
        </Grid>
      </Grid>
      <Grid
        component="section"
        container
        justifyContent="center"
        alignItems="stretch"
        spacing={0}
        p={2}
      >
        <Grid
          item
          sm={12}
        >
          <Container>
            <Typography variant="h2" sx={{ mb: 4 }}>Our Method</Typography>
            <Typography variant="body1" className="HeadingParagraph">We believe that practice is crucial for mastering any language. The goal of learning Koine Greek shouldn&lsquo;t just be memorization, but to  actively use the language. Scriptura/Koine provides a comprehensive learning framework that supports this by offering a three-pronged approach:</Typography>
          </Container>
        </Grid>
        <Grid
          item
          sm={4}
        >
          <AboutCard
            icon={<AbcIcon sx={{ fontSize: 40, mb: 4 }} />}
            header="Learn and Memorize Words"
            description="Build a solid vocabulary foundation through engaging flashcards and interactive exercises."
          />
        </Grid>
        <Grid
          item
          sm={4}
        >
          <AboutCard
            icon={<LocalLibraryIcon sx={{ fontSize: 40, mb: 4 }} />}
            header="Read the text at your level"
            description="Flashcards, video lectures, and drag-and-drop exercises transform vocabulary and grammar acquisition into an engaging experience."
          />
        </Grid>
        <Grid
          item
          sm={4}
        >
          <AboutCard
            icon={<SchoolIcon sx={{ fontSize: 40, mb: 4 }} />}
            header="Review"
            description="Regularly revisit learned concepts and vocabulary through a structured review system to solidify your understanding and fluency."
          />
        </Grid>
      </Grid>
      <Container
        component="section"
      >
        <Typography variant="body1" sx={{ mb: 4 }}>
          Get started with Scriptura/Koine today and embark on a transformative journey through
          the New Testament!
        </Typography>
        <Link to="/">
          <Button variant="contained">
            Reader
          </Button>
        </Link>
      </Container>
      <Grid
        container
        spacing={0}
        justifyContent="center"
        component="footer"
        sx={{
          bgcolor: 'footer.main',
          p: 2,
        }}
      >
        <Grid item xs={3}>
          <Stack direction="row">
            <img
              className="FooterLogo"
              src="./static/img/icon-500x500.png"
              alt="Koine"
            />
            <Typography
              className="TextGreek"
              sx={{ color: 'footer.contrastText', fontSize: '28px' }}
            >
              κοινὴ
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={2}>
          <Stack spacing={{ xs: 1 }} sx={{ justifyContent: 'center' }}>
            <Link to="/" className="FooterLink">Reader</Link>
            <Link to="/about" className="FooterLink">About</Link>
            <a className="FooterLink" href="https://github.com/eliranwong/OpenGNT">Textual Source</a>
            <Divider
              variant="inset"
              flexItem
              sx={{ opacity: 0.2, bgcolor: 'primary.contrastText' }}
            />
            <Link to="/">
              <Button variant="contained">
                Start Reading
              </Button>
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </Stack>
  );
}

export default About;

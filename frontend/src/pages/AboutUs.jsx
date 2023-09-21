import { Container, Typography, Box, Grid, Card, CardContent, Avatar } from '@mui/material';

const teamMembers = [
  { name: 'Ce Min Pangastur', role: 'Product Owner', image: '' },
  { name: 'Jerry Li', role: 'Scrum Master', image: '' },
  { name: 'Andrew Lin', role: 'Software Engineer', image: '' },
  { name: 'Millie  Hai', role: 'Software Engineer', image: '' },
  { name: 'Edison Chang', role: 'Software Engineer', image: '' },
  { name: 'Blair Zheng', role: 'Software Engineer', image: '' },
];

/**
 * 
 * @returns 
 * 
 * Page containing details for the about us page.
 */
const AboutUs = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box textAlign="center" mb={5}>
        <Typography variant="h3" color='white' component="h1" gutterBottom>
          <b>About Us</b>
        </Typography>
        <Typography variant="body1" color="#F5F5F5">
          Our mission is to connect talented professionals with exciting project opportunities at leading companies. 
          Through a streamlined platform, we aim to facilitate meaningful collaborations that drive success and innovation.
        </Typography>
      </Box>

      <Box mb={8}>
        <Typography variant="h4" color='white' component="h2" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" color="#F5F5F5">
          At Projector, we believe in the power of collaboration and the importance of matching the right skills to 
          the right projects. Our goal is to create a network where professionals can thrive by contributing to 
          impactful company projects, while companies gain access to top-tier talent to bring their visions to life.
        </Typography>
      </Box>

      <Box mb={8}>
        <Typography variant="h4" color='white' component="h2" gutterBottom>
          Meet the Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <Avatar 
                  src={member.image} 
                  alt={member.name} 
                  sx={{ width: 100, height: 100, margin: '0 auto', mb: 2 }}
                />
                <CardContent>
                  <Typography variant="h6">{member.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box textAlign="center" mt={5}>
        <Typography variant="h4" color='white' component="h2" gutterBottom>
          Our Values
        </Typography>
        <Typography variant="body1" color="#F5F5F5">
          We are committed to fostering a culture of growth, inclusivity, and partnership. We believe in creating 
          a platform where professionals and companies alike can achieve their best work through meaningful connections 
          and shared goals.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
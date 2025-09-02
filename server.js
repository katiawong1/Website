import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

// Middleware
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// API endpoint for contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { to, subject, formData } = req.body;

    const emailHtml = `
      <h2>New CPA Consultation Request</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Business Owner:</strong> ${formData.businessOwner}</p>
      <p><strong>Employee Count:</strong> ${formData.employeeCount}</p>
      <p><strong>Business Duration:</strong> ${formData.businessDuration}</p>
      <p><strong>Help Needed:</strong></p>
      <p>${formData.helpNeeded}</p>
      <hr>
      <p><em>Submitted from EW CPA Tax & Bookkeeping LLC website</em></p>
    `;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: to,
      subject: subject,
      html: emailHtml,
      replyTo: formData.email,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

// API endpoint for Google Places reviews
app.get('/api/reviews/:placeId', async (req, res) => {
  try {
    let { placeId } = req.params;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY_SERVER;
    
    // Decode the Place ID
    placeId = decodeURIComponent(placeId);

    console.log('Reviews API called with Place ID:', placeId);
    console.log('API Key configured:', apiKey ? 'Yes' : 'No');

    if (!apiKey) {
      console.error('Google Maps API key not configured');
      return res.status(500).json({ 
        success: false, 
        message: 'Google Places API key not configured' 
      });
    }

    if (!placeId || placeId === 'YOUR_GOOGLE_PLACE_ID' || placeId === 'TEMP_PLACE_ID') {
      console.error('Invalid Place ID:', placeId);
      return res.status(400).json({ 
        success: false, 
        message: 'Valid Place ID required' 
      });
    }

    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`;
    console.log('Calling Google Places API for Place ID:', placeId);

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 'OK') {
      res.json({
        success: true,
        data: {
          name: data.result.name,
          rating: data.result.rating,
          user_ratings_total: data.result.user_ratings_total,
          reviews: data.result.reviews || []
        }
      });
    } else {
      console.error('Google Places API error:', data.status, data.error_message);
      res.status(400).json({
        success: false,
        message: `Google Places API error: ${data.status}`,
        details: data.error_message
      });
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch reviews',
      error: error.message
    });
  }
});

// Serve static assets from Vite build output
app.use(
  express.static(distPath, {
    extensions: ['html'],
    maxAge: '1y',
    etag: true,
    index: false,
  })
);


// Health check endpoint (must be before wildcard route)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    env: {
      hasGoogleKey: !!process.env.GOOGLE_MAPS_API_KEY_SERVER,
      hasPlaceId: !!process.env.VITE_GOOGLE_PLACE_ID,
      port: port
    }
  });
});

// SPA fallback: send index.html for all non-file routes
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
  console.log('Environment check:');
  console.log('- Google Maps API Key:', process.env.GOOGLE_MAPS_API_KEY_SERVER ? 'Configured' : 'MISSING');
  console.log('- Google Place ID:', process.env.VITE_GOOGLE_PLACE_ID ? process.env.VITE_GOOGLE_PLACE_ID : 'Not set (will use client-side)');
  console.log('- Server started successfully');
});



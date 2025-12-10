import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { ClientSecretCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

// Middleware
app.use(express.json());

// Azure AD Configuration for Microsoft Graph API
const clientId = process.env.CLIENT_ID;
const tenantId = process.env.TENANT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const targetEmail = process.env.TARGET_EMAIL;

// Initialize Microsoft Graph client
let graphClient = null;

function getGraphClient() {
  if (!graphClient && clientId && tenantId && clientSecret) {
    const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    const authProvider = new TokenCredentialAuthenticationProvider(credential, {
      scopes: ['https://graph.microsoft.com/.default']
    });
    graphClient = Client.initWithMiddleware({ authProvider });
  }
  return graphClient;
}

// API endpoint for contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { subject, formData } = req.body;
    const client = getGraphClient();

    if (!client) {
      console.error('Microsoft Graph client not initialized. Check Azure credentials.');
      return res.status(500).json({ 
        success: false, 
        message: 'Email service not configured properly' 
      });
    }

    if (!targetEmail) {
      console.error('TARGET_EMAIL environment variable not set');
      return res.status(500).json({ 
        success: false, 
        message: 'Target email not configured' 
      });
    }

    // Build email HTML content - handles both Contact form and Hero intake form fields
    const emailHtml = `
      <h2>${subject || 'New Form Submission'}</h2>
      <p><strong>Name:</strong> ${formData.name || 'Not provided'}</p>
      <p><strong>Email:</strong> ${formData.email || 'Not provided'}</p>
      ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
      ${formData.message ? `<p><strong>Message:</strong></p><p>${formData.message}</p>` : ''}
      ${formData.taxPlanning ? `<p><strong>Interested in Tax Planning:</strong> ${formData.taxPlanning === 'yes' ? 'Yes' : 'No'}</p>` : ''}
      ${formData.discoveryCall ? `<p><strong>Wants Discovery Call:</strong> ${formData.discoveryCall === 'yes' ? 'Yes' : 'No'}</p>` : ''}
      ${formData.businessOwner ? `<p><strong>Business Owner:</strong> ${formData.businessOwner === 'yes' ? 'Yes' : 'No'}</p>` : ''}
      ${formData.employeeCount ? `<p><strong>Employee Count:</strong> ${formData.employeeCount}</p>` : ''}
      ${formData.businessDuration ? `<p><strong>Business Duration:</strong> ${formData.businessDuration}</p>` : ''}
      ${formData.helpNeeded ? `<p><strong>Help Needed:</strong></p><p>${formData.helpNeeded}</p>` : ''}
      <hr>
      <p><em>Submitted from EW CPA Tax & Bookkeeping LLC website</em></p>
    `;

    // Microsoft Graph API email message format
    const message = {
      message: {
        subject: subject || 'New Contact Form Submission',
        body: {
          contentType: 'HTML',
          content: emailHtml
        },
        toRecipients: [
          {
            emailAddress: {
              address: targetEmail
            }
          }
        ],
        replyTo: formData.email ? [
          {
            emailAddress: {
              address: formData.email
            }
          }
        ] : []
      },
      saveToSentItems: true
    };

    // Send email via Microsoft Graph API
    await client.api('/users/' + targetEmail + '/sendMail').post(message);

    console.log('Email sent successfully via Microsoft Graph API');
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email via Microsoft Graph:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
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
      hasAzureConfig: !!(clientId && tenantId && clientSecret),
      hasTargetEmail: !!targetEmail,
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
  console.log('- Azure Client ID:', clientId ? 'Configured' : 'MISSING');
  console.log('- Azure Tenant ID:', tenantId ? 'Configured' : 'MISSING');
  console.log('- Azure Client Secret:', clientSecret ? 'Configured' : 'MISSING');
  console.log('- Target Email:', targetEmail ? targetEmail : 'MISSING');
  console.log('- Microsoft Graph Client:', getGraphClient() ? 'Initialized' : 'Not initialized (check Azure credentials)');
  console.log('- Server started successfully');
});



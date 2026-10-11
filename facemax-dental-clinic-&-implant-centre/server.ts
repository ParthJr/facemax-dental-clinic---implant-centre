import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ConsultationSubmission {
  id: string;
  fullName: string;
  mobile: string;
  service: string;
  preferredDate: string;
  preferredTimeWindow: string;
  clinicalNotes?: string;
  consent: boolean;
  createdAt: string;
  ipAddress?: string;
}

// In-memory collection of submissions
const consultationStore: ConsultationSubmission[] = [];

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Consultation Enquiry API Route
  app.post('/api/consultation', (req: Request, res: Response) => {
    try {
      const { fullName, mobile, service, preferredDate, preferredTimeWindow, clinicalNotes, consent } = req.body;

      // 1. Validate Full Name
      if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
        return res.status(400).json({
          error: 'VALIDATION_FAILED',
          field: 'fullName',
          message: 'Please provide a valid full name (minimum 2 characters).'
        });
      }

      // 2. Validate Indian Mobile Number (10 digits starting with 6-9, stripped of spaces)
      const cleanMobile = (mobile || '').toString().replace(/\D/g, '').slice(-10);
      const indianPhoneRegex = /^[6-9]\d{9}$/;
      if (!indianPhoneRegex.test(cleanMobile)) {
        return res.status(400).json({
          error: 'VALIDATION_FAILED',
          field: 'mobile',
          message: 'Please provide a valid 10-digit Indian mobile contact number.'
        });
      }

      // 3. Validate Preferred Date (if provided, must not be in the past)
      if (preferredDate) {
        const inputDate = new Date(preferredDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isNaN(inputDate.getTime()) || inputDate < today) {
          return res.status(400).json({
            error: 'VALIDATION_FAILED',
            field: 'preferredDate',
            message: 'Please select today or a future date for your consultation.'
          });
        }
      }

      // 4. Validate Consent
      if (!consent) {
        return res.status(400).json({
          error: 'VALIDATION_FAILED',
          field: 'consent',
          message: 'Privacy consent is required to process your consultation enquiry.'
        });
      }

      // 5. Prevent Duplicate Submissions (Same phone within 2 minutes)
      const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
      const duplicate = consultationStore.find(
        (sub) => sub.mobile === cleanMobile && sub.createdAt > twoMinutesAgo
      );

      if (duplicate) {
        return res.status(429).json({
          error: 'DUPLICATE_SUBMISSION',
          message: 'An enquiry with this contact number was submitted recently. Our team will contact you shortly.'
        });
      }

      // Record Submission
      const newSubmission: ConsultationSubmission = {
        id: `FM-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
        fullName: fullName.trim(),
        mobile: `+91 ${cleanMobile.slice(0, 5)} ${cleanMobile.slice(5)}`,
        service: service || 'General Consultation & Checkup',
        preferredDate: preferredDate || 'As soon as available',
        preferredTimeWindow: preferredTimeWindow || 'Morning (10:00 AM - 01:00 PM)',
        clinicalNotes: (clinicalNotes || '').trim(),
        consent: true,
        createdAt: new Date().toISOString(),
        ipAddress: req.ip
      };

      consultationStore.push(newSubmission);

      console.log(`[FACEMAX CLINIC] New enquiry recorded #${newSubmission.id} from ${newSubmission.fullName}`);

      return res.status(200).json({
        success: true,
        id: newSubmission.id,
        message: 'Your consultation enquiry has been recorded. The FACEMAX team in Kudasan will contact you shortly.',
        data: {
          id: newSubmission.id,
          fullName: newSubmission.fullName,
          mobile: newSubmission.mobile,
          service: newSubmission.service,
          preferredDate: newSubmission.preferredDate,
          preferredTimeWindow: newSubmission.preferredTimeWindow
        }
      });
    } catch (err) {
      console.error('[FACEMAX CLINIC] Error handling consultation submission:', err);
      return res.status(500).json({
        error: 'SERVER_ERROR',
        message: 'An unexpected clinical server error occurred. Please call 090338 65172 directly.'
      });
    }
  });

  // Health / Status Check Endpoint
  app.get('/api/consultation/status', (_req: Request, res: Response) => {
    res.json({
      status: 'ONLINE',
      clinic: 'FACEMAX Dental Clinic and Implant Centre',
      location: 'Kudasan, Gandhinagar',
      activeEnquiriesCount: consultationStore.length
    });
  });

  // Serve Vite in development mode or Static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FACEMAX Clinic Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

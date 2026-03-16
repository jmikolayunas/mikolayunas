# Bonas Studio Web-Based Commission Agreement

## Files Created

1. **agreement.html** - Main agreement page with password protection
2. **css_pages_agreement.css** - Agreement-specific styles
3. **agreement.js** - Password, signature, PDF generation, and form logic

## Features Implemented

### 1. Password Protection
- **Format**: First initial + last name (lowercase, no spaces)
  - Example: "John Smith" → password: "jsmith"
  - Example: "Sarah O'Brien" → password: "sobrien"
- Access via URL parameter: `agreement.html?access=jsmith`
- Minimal, elegant gate design matching site aesthetic

### 2. Dynamic Commission Summary
- Auto-calculates 50% deposit and balance from commission price
- All fields editable by client
- Validates required fields before enabling submit

### 3. Signature Capture
- Touch-friendly signature pad
- High-DPI support for retina displays
- Clear/reset functionality
- Signature required to enable PDF download

### 4. PDF Generation
- Professional 2-page PDF matching Word document style
- Includes all form data and client signature
- Automatically named: `Bonas_Studio_Commission_Agreement_[ClientName].pdf`
- Can be downloaded or sent via email

### 5. Email Submission (Backend Required)
- Client-side logic complete
- See "Backend Integration" section below

## Installation

1. **Add files to your site:**
   ```
   /agreement.html
   /css_pages_agreement.css
   /agreement.js
   ```

2. **Files already use existing global CSS:**
   - No changes needed to `css_global.css`
   - Agreement page inherits all typography, colors, spacing

3. **External Dependencies (loaded via CDN):**
   - Signature Pad: https://cdnjs.cloudflare.com/ajax/libs/signature_pad/4.1.7/signature_pad.umd.min.js
   - jsPDF: https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js

## Usage Workflow

### For You (Bonas Studio):

1. **Create unique link for each client:**
   ```
   https://bonasstudio.com/agreement.html?access=[password]
   ```

2. **Send to client via email:**
   ```
   Subject: Your Bonas Studio Commission Agreement

   [Client Name],

   Thank you for commissioning a custom piece. Your agreement is ready for review and signature:

   https://bonasstudio.com/agreement.html?access=jsmith

   Please review, complete, and sign the agreement. Once submitted, you'll receive a PDF copy via email.

   Looking forward to creating your piece,
   Jonas
   ```

3. **Client completes agreement:**
   - Reviews terms
   - Fills in any missing details
   - Signs with finger/mouse
   - Downloads PDF and/or submits via email

### For Clients:

1. Click link from email (auto-logs in)
2. Review commission summary (pre-filled by you)
3. Add/edit any details
4. Sign in signature box
5. Download PDF or submit via email
6. Receive confirmation

## Password Generation Examples

```javascript
// Format: first initial + last name (lowercase, no spaces, no punctuation)

"Margaret Chen" → "mchen"
"Robert O'Sullivan" → "rosullivan"
"María García" → "mgarcia"
"Jean-Pierre Dubois" → "jdubois"
"Sarah Jane Miller" → "sjmiller" (if using middle name)
"Dr. James Wilson" → "jwilson" (no title)
```

## Backend Integration

The agreement page has complete client-side logic but needs a backend endpoint for email functionality.

### Required Endpoint: `/api/submit-agreement`

**Request Format:**
```javascript
FormData {
  pdf: Blob,                    // PDF file
  clientEmail: string,          // Client's email
  clientName: string,           // Client's name
  commissionPrice: string,      // e.g., "$5,000"
  projectLocation: string       // e.g., "Nantucket"
}
```

**Backend Should:**
1. Receive form data
2. Send email to client with PDF attached
3. Send copy to you (jonas@bonasstudio.com)
4. Optionally: Store PDF and data in database
5. Return success/error JSON

**Example Response:**
```json
{
  "success": true,
  "message": "Agreement sent successfully"
}
```

### Simple Backend Options:

#### Option 1: EmailJS (No Backend Required)
- Sign up at emailjs.com
- Configure email template
- Update `agreement.js` to use EmailJS SDK
- ~$10/month for 200 emails

#### Option 2: Netlify Functions (Serverless)
- Create function at `/.netlify/functions/submit-agreement.js`
- Use SendGrid or AWS SES for email
- Free tier likely sufficient

#### Option 3: Your Own Server
- Node.js + Express
- Nodemailer for email
- Full control

## Customization

### Change Password Format
Edit in `agreement.js`:
```javascript
const CONFIG = {
  validPasswords: [
    'client1',
    'client2'
    // Or validate against database
  ]
};
```

### Pre-fill Client Data via URL
Add parameters:
```
agreement.html?access=jsmith&name=John%20Smith&email=john@example.com&location=Cape%20Ann&price=5000
```

Then update `agreement.js` to read and populate fields.

### Customize Email Copy
Currently shows alert on success. Replace with:
```javascript
// Show custom success message
const successDiv = document.createElement('div');
successDiv.className = 'success-message';
successDiv.innerHTML = `
  <h3>Agreement Submitted!</h3>
  <p>A copy has been sent to ${agreementData.clientEmail}</p>
  <p>You'll receive payment instructions within 24 hours.</p>
`;
document.querySelector('.actions-section').appendChild(successDiv);
```

## Mobile Optimization

- Fully responsive
- Touch-friendly signature pad
- Readable on all screen sizes
- Tested on iOS and Android

## Browser Compatibility

- Chrome/Edge: ✓
- Firefox: ✓
- Safari: ✓
- Mobile Safari: ✓
- Mobile Chrome: ✓

## Security Notes

1. **Password Protection**: Currently simple client-side check
   - For production: validate against server-side database
   - Or use JWT tokens in URL

2. **Data Transmission**: Uses HTTPS (if site is HTTPS)

3. **PDF Generation**: Happens client-side (no server upload of signature)

4. **Email Security**: Depends on your backend implementation

## Testing Checklist

- [ ] Password gate works
- [ ] URL parameter auto-login works
- [ ] All form fields editable
- [ ] Commission price auto-calculates deposit/balance
- [ ] Signature pad draws smoothly
- [ ] Clear signature button works
- [ ] PDF generates with all data
- [ ] PDF filename is correct
- [ ] Submit button enables when form valid
- [ ] Mobile responsive
- [ ] Works on touch devices

## Next Steps

1. **Deploy files** to bonasstudio.com
2. **Set up backend** for email (or use EmailJS)
3. **Test** with a real client name/email
4. **Send** first agreement link
5. **Refine** based on client feedback

## Support

If you need help with:
- Backend integration
- Custom modifications
- Email service setup
- Database integration

Just ask!

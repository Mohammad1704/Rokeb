# PLANNING.md

**Purpose**  
A lightweight web platform where users can save multiple delivery addresses, each with step-by-step instructions (text + image). Designed to reduce delivery errors and improve clarity for couriers.

**Architecture**
- **Frontend**:  
  - Built with plain HTML, CSS, and JavaScript.  
  - Pages: Login, Signup, Dashboard (saved addresses), Add Address, View Instructions.  
  - Fully responsive (mobile-first).  
  - Multilingual UI with dynamic language switching.  

- **Backend**:  
  - Node.js + Express.js  
  - REST API for:
    - Auth (signup/login with JWT)
    - CRUD for addresses
    - Public address view via token
  - File handling: uploads via Cloudinary

- **Database**:  
  - MongoDB (cloud or local)  
  - Collections:
    - `users`: email, password (hashed), etc.
    - `addresses`: userId, label, address, contact, steps[]
    - `steps`: array of 3 objects → { text, imageURL, optional lat/lng }

- **Translation**:
  - Languages: English (`en`), Arabic (`ar`), Hindi (`hi`), Bengali (`bn`), Urdu (`ur`)
  - Translations via **Azure Cognitive Services Translation API**
  - JSON translation files loaded dynamically
  - UI updates direction (LTR/RTL) and font family per language

**Constraints**
- Mobile-first layout and UX
- Fast-loading UI (minimal JS, CDN-backed images)
- Full multilingual support (no hardcoded strings)
- Only 3 delivery steps per address in MVP

**Cloud Services**
- **Cloudinary**: for storing step images (uploaded directly from frontend)
- **Azure Translator**: for live translation and fallback cache in local JSON
- **Google Maps**: "Open in Maps" button per address/step (no full map embedding)

**Tools**
- GitHub: version control + task tracking
- Vercel / Netlify: for static frontend deployment
- Render / Railway / Heroku: for hosting Node.js backend
- Postman: for local API testing

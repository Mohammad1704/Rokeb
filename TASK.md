# TASK.md

**✅ MVP ACTIVE TASKS**
- [ ] Login + Signup (HTML form → backend auth API → JWT)
- [ ] Save address form (name, full address, phone, etc.)
- [ ] Add 3 delivery steps (text + upload image via Cloudinary)
- [ ] Public shareable view (via token URL)
- [ ] QR code generator (for sharing public view)
- [ ] Multilingual UI (JSON + Azure API integration)
- [ ] Language switcher (updates `lang`/`dir`, loads correct strings)
- [ ] View instructions screen (3-step card-style UI + Open in Maps link)

**⚠️ MID-PROGRESS NOTES**
- Image uploads must go from client → Cloudinary (using unsigned upload preset or signed token)
- Translation uses Azure API (fetch translated string on-demand, cache to local JSON)
- All strings must be marked for translation (`data-translate` or similar)

**📌 MVP BACKLOG (POST-LAUNCH)**
- [ ] Address editing and deletion
- [ ] Admin moderation (future)
- [ ] Track usage on shared links (analytics)
- [ ] Delivery notifications (optional, future phase)

# Deployment Instructions

## Formspree Setup Required

Before deploying to Vercel, you need to set up Formspree for the lead capture forms:

1. **Create Formspree Account**: Go to https://formspree.io/ and sign up (free tier)
2. **Create New Forms**:
   - Create one form for "Demo Request" 
   - Create one form for "Coverage Request"
3. **Get Form IDs**: Each form will have a unique ID (e.g., `xqzvjqrb`)
4. **Update Code**: Replace `YOUR_FORMSPREE_ID` in these files:
   - `/Users/tachyla/src/nemt-platform/apps/web/src/app/demo-request/page.tsx`
   - `/Users/tachyla/src/nemt-platform/apps/web/src/app/coverage-request/page.tsx`

## Vercel Deployment Steps

1. **Go to Vercel**: https://vercel.com
2. **Import Project**: Click "Add New Project" → "Import Git Repository"
3. **Select Repository**: Choose `tachylamurray/nemt-platform`
4. **Configure Project**:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `apps/web`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. **Deploy**: Click "Deploy"

## Optional: Custom Domain

After deployment, you can add a custom domain:
1. Go to project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Update DNS settings as instructed by Vercel

## Post-Deployment Checklist

- [ ] Test demo request form works
- [ ] Test coverage request form works
- [ ] Check mobile responsiveness
- [ ] Verify all navigation links work
- [ ] Test booking portal demo mode
- [ ] Check load times and performance
- [ ] Verify SSL certificate (automatic with Vercel)
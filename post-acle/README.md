This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

This project is configured for seamless deployment on Vercel. Follow these steps to deploy:

1. Push your code to a GitHub, GitLab, or Bitbucket repository
2. Import your repository on Vercel: https://vercel.com/new
3. Vercel will automatically detect the Next.js project and use the optimal build settings
4. Click "Deploy" and your site will be live in minutes

### Environment Variables

The following environment variables are pre-configured in the `.env.production` file:

- `NEXT_PUBLIC_SITE_URL`: The production URL of your site
- `NEXT_PUBLIC_VERCEL_ENV`: Set to 'production' for production builds

### Custom Domain

To use a custom domain with your Vercel deployment:

1. Go to your project on Vercel
2. Navigate to "Settings" > "Domains"
3. Add your custom domain and follow the verification steps
4. Update the `NEXT_PUBLIC_SITE_URL` in `.env.production` to match your custom domain
5. Update the URLs in `sitemap.xml` and `robots.txt` to match your custom domain

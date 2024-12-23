# AI Resume Builder SaaS

Welcome to the **AI Resume Builder**! This project is a SaaS platform designed to help users create professional resumes effortlessly with the assistance of AI. It supports user authentication, a tiered subscription model, and customization options for advanced users.

---

## Features

### Core Functionality

- **User Authentication**: Users can sign up and log in using social login or email-password authentication via Clerk.
- **AI Resume Building**: Users can create resumes with AI-generated summaries and work experience sections based on the information they provide.
- **Free Plan**:
  - Create one resume for free.
- **Pro Plan**:
  - Create up to 3 resumes.
  - Use AI tools to generate professional summaries and add work experience.
- **Pro Plus Plan**:
  - Unlimited resume creation.
  - Customize resume theme colors, image styles, and skill section border shapes.
  - Full access to all platform features.

---

## Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/)
- **Design**: [ShadCN UI Components](https://shadcn.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [Prisma ORM](https://www.prisma.io/) with [Postgres Neon Serverless DB](https://neon.tech/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **File Storage**: Vercel Blob Store
- **Payments**: [Stripe](https://stripe.com/)
- **Hosting**: [Vercel](https://vercel.com/)

---

## Screenshots

### Home Page

![Home Page](https://github.com/jareerzeenam/nextjs-ai-resume-builder/blob/master/src/assets/images/front-page.png)

### Resume Builder and Preview

![Resume Builder](https://github.com/jareerzeenam/nextjs-ai-resume-builder/blob/master/src/assets/images/resume-builder.png)

### Resume Customization

![Resume Customization](https://github.com/jareerzeenam/nextjs-ai-resume-builder/blob/master/src/assets/images/customize-theme.png)

### AI Work Experience Generation

![AI Work Experience Generation](https://github.com/jareerzeenam/nextjs-ai-resume-builder/blob/master/src/assets/images/generate-experience.png)

### AI Summary Generation

![AI Summary Generation](https://github.com/jareerzeenam/nextjs-ai-resume-builder/blob/master/src/assets/images/generate-summary.png)

### Subscription Plans

![Subscription Plans](https://github.com/jareerzeenam/nextjs-ai-resume-builder/blob/master/src/assets/images/subscription-plans.png)

### Stripe Checkout

![Stripe Checkout](https://github.com/jareerzeenam/nextjs-ai-resume-builder/blob/master/src/assets/images/stripe.png)

### Upgrade Subscription

## ![Upgrade Subscription](https://github.com/jareerzeenam/nextjs-ai-resume-builder/blob/master/src/assets/images/upgrade.png)

## Setup Guide

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Postgres database
- Stripe account
- Clerk account
- Vercel account

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/jareerzeenam/nextjs-ai-resume-builder.git
   cd ai-resume-builder
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create Stripe Products**:
   Create products in the Stripe dashboard and note down the product IDs in the `.env` file.

4. **Environment Variables**:
   The repository already contains a `.env.local` file with the required keys. Copy it to create a `.env` file:

   ```bash
   cp .env.local .env
   ```

5. **Setup Prisma**:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

6. **Run the Development Server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) to view the app.

7. **Testing Payments**:

   - Use Stripe’s test keys to verify the payment flows.

8. **Deploy**:
   Deploy the app on Vercel using the CLI or by connecting the GitHub repository.

   ```bash
   vercel
   ```

---

## Contribution

We welcome contributions! If you find a bug or have a feature request, please open an issue or submit a pull request.

---

# Implementation Plan - Mumbai Nest Finder

A premium, luxury-focused landing page designed to help buyers find their dream home in Mumbai. The application features a high-end visual aesthetic and an interactive multi-step requirement wizard to capture specific buyer needs.

### User Review & Critical Decisions

> [!IMPORTANT]
> Since **Firebase was declined**, lead submissions will be handled via Next.js Server Actions. For this version, submissions will be logged to the server console and provide a polished "Success" state to the user.

- **Confirmed Aesthetic**: Luxury and high-end. We will use a "Warm Cream & Charcoal" palette with elegant serif typography.
- **Key Feature**: Multi-step requirement wizard (BHK, Budget, Locality).
- **Service Name**: Mumbai Nest Finder.

---

### 1. Overview & Core Concept

- **What It Does**: A high-conversion landing page for Mumbai real estate, focusing on personalized property matching.
- **Target Audience**: High-net-worth individuals and families looking for premium residential properties across Mumbai.
- **Key Value**: Simplifies the complex Mumbai property market through a curated, requirement-first approach.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
    1. **Arrival**: User sees a cinematic hero section of the Mumbai skyline/luxury apartments.
    2. **Requirement Capture**: A "Find Your Nest" multi-step wizard asks for BHK (1-5+), Budget (Cr+), and preferred Locality (South Mumbai, Western Suburbs, etc.).
    3. **Personalization**: Based on inputs, the user is presented with a "Consultation Request" or "Matching Properties" teaser.
    4. **Submission**: User provides contact details; high-fidelity feedback animation confirms receipt.

- **Visual Identity & Theme**:
    - **Aesthetic Direction**: Editorial Luxury. Minimalist but sophisticated.
    - **Color Palette**:
        - Canvas: Warm Linen (`#FDFCFB`)
        - Typography: Deep Ebony (`#1A1A1A`)
        - Accents: Burnished Gold (`#C5A059`) for primary CTAs and highlights.
    - **Typography**:
        - Headings: `Instrument Serif` (Elegant, high-contrast)
        - Body: `Satoshi` (Modern, clean geometric sans)
    - **Component Styling**: Hairline borders, generous whitespace, and subtle `motion` transitions (fade-ins, staggered reveals).

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Lead Capture Method**
    - **Chosen Approach**: Next.js Server Actions.
    - **Why**: Since Firebase is unavailable, Server Actions provide a secure way to process form data without exposing client-side logic or requiring complex backend setup.
- **Decision 2: Requirement Wizard**
    - **Chosen Approach**: Custom state-managed multi-step form with `motion` for slide transitions.
    - **Why**: Provides a much higher completion rate than a long, single-page form.

---

### 4. Technical Architecture & Data Strategy

```unicode
┌──────────────────────────────────────────────────────────┐
│                     Next.js App Router                   │
│                                                          │
│  ┌──────────────┐      ┌──────────────────────────────┐  │
│  │    Page      │─────▶│     Requirement Wizard       │  │
│  │ (Home View)  │      │ (BHK -> Budget -> Locality)  │  │
│  └──────────────┘      └──────────────┬───────────────┘  │
│                                       │                  │
│                                       ▼                  │
│  ┌──────────────────┐      ┌──────────────────────────┐  │
│  │   UI Components  │◀─────┤      Server Action       │  │
│  │ (Luxury Design)  │      │   (Process Lead Data)    │  │
│  └──────────────────┘      └──────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

- **Data Model**:
    - `Lead`: { id, name, email, phone, bhk, budget, locality, timestamp }
- **Interactions**:
    - `framer-motion` for step transitions (slide-left/right).
    - `lucide-react` for minimal functional icons (ArrowRight, Check, etc.).
    - Client-side validation for phone numbers and budget ranges.

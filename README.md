# Full Circle Cafe - Scrollytelling Website

A stunning, scroll-driven animated website for Full Circle Cafe featuring wood-fired pizza. Built with Next.js 16, Framer Motion, and Tailwind CSS.

## Features

- **Scroll-driven Animation**: 192-frame pizza animation that plays as users scroll
- **Smooth Loading Screen**: Animated pizza slice loader with progress indicator
- **Responsive Design**: Optimized for phones, tablets, and desktops
- **Modern UI**: Clean typography with smooth transitions and hover effects
- **Performance Optimized**: Canvas-based rendering for smooth 60fps animations

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/IstiqlalBhat/scrollytelling.git
cd scrollytelling
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── components/
│   │   ├── LoadingScreen.tsx   # Animated loading screen
│   │   ├── PizzaScroll.tsx     # Scroll-driven canvas animation
│   │   └── StoryOverlay.tsx    # Text overlays with scroll effects
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page
├── public/
│   └── images/                 # 192 animation frames
└── package.json
```

## How It Works

1. **Loading Screen**: Shows animated pizza slices while assets load
2. **Scrollytelling**: As users scroll through the 500vh section, the pizza animation plays frame-by-frame
3. **Text Overlays**: Story sections fade in/out at different scroll positions
4. **Footer**: Call-to-action section with order links

## Customization

- **Animation Frames**: Replace images in `public/images/` (named `ezgif-frame-001.jpg` to `ezgif-frame-192.jpg`)
- **Colors**: Modify the orange theme in component files
- **Text Content**: Edit `StoryOverlay.tsx` and `page.tsx`
- **Links**: Update the order link in `StoryOverlay.tsx` and `page.tsx`

## License

MIT

## Links

- **Live Site**: [Full Circle Cafes](https://fullcirclecafes.com/)

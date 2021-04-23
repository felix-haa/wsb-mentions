# Wallstreetbets Mentions
The backend counts how many times a ticker symbol was mentioned on r/wallstreetbets and r/mauerstrassenwetten in a day. It uses Reddit's official API to analyze headlines of posts and Tesseract's optical character recognition to gather text from images (to analyze memes). This frontend visualizes the results with Recharts.

## To Do
- [ ] use bar chart
- [ ] show dates without mentions in chart

## Tools
- ESLint
- Next.js
- Prettier
- React
- Recharts
- Sass
- Typescript

## Setup

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Done
- [x] Setup Next.js project w/ ESLint, Prettier, Sass, Typescript
- [x] get data from api
- [x] install recharts
- [x] stock ticker selector
- [x] update chart based on selected stock mentions data

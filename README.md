## Spacestagram

# Stack

Next.js + Typescript + Shopify's Polaris

# Features:

- Photos load as user scrolls (infinite scrolling)
- Photos are sorted by chronological order (newer photos first)
- Using YouTube's embeded API for displaying videos on the feed (infinite loop and muted)

- Segmentated fetching for optimization (we dont fetch things more than once)
- Dot Env file for hiding the API KEY
- Dark Mode / Light Mode switch that persists using localstorage

- Loading indicator using Polaris' native spinner
- Button to show more or less text description (trimemd by default to 256 chars)
- Ability to adapt to different screen sizes (using flexbox)

- Like Button changes it's color when pressed
- "Open in new tab" button (using different routes)
- Next.js SSR for showing single post (SEO optimization) and 404 date handling

- "Copy to clipboard" button that displays a blue text for a second
- Clicking on the "spacestagram" heading reloads the page
- Accesibility included (aria-label and alt for images)

# Usage:

Live on: https://breakdance.github.io/breakdance/

If you want to run it locally:

```bash
npm run dev
# or
yarn dev
```

> The API_KEY is included into the source code for demo purposes (using a .env.local file), although in prod I'd hide it in the .gitignore file.

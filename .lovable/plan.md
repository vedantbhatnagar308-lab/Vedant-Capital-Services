# Light-blue theme and separate pages

## What will change
- Restyle the site with a light-blue page background and dark-blue primary buttons, keeping text readable and preserving existing finance branding details.
- Move the main sections into their own pages: Home, About, Services, Process, and Contact. Keep Place a Request, Track Request, and Admin Login as separate pages.
- Update navigation and internal links so each item opens its matching page, including direct URL access and mobile navigation.

## Technical details
- Update semantic color tokens and shared button styles, then add page components that reuse the existing section content.
- Register the new pages in the existing router; leave request submission, tracking, and administrator access behavior unchanged.

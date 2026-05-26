# TODO - Make website responsive (Tailwind only, no theme changes)

## Step 1
- Update `components/Landing-Sections/hero-section.tsx` to avoid overflow on mobile and scale typography/images correctly.

## Step 2
- Update `app/explore/cars/page.tsx` to ensure headings/cards/grid are mobile-safe (no overflow) while keeping same styling.

## Step 3
- Update table components to be mobile-scrollable:
  - `components/Tables/all-user-bookings.tsx`
  - `components/Tables/total-cars-tables.tsx`
  - (optionally) `components/Tables/my-bookings-table.tsx` if overflow is present

## Step 4
- Update `components/Navbar/navbar.tsx` mobile menu panel to prevent layout overlap and ensure it scrolls if needed.

## Step 5
- Run dev server/build checks and do quick responsive verification.


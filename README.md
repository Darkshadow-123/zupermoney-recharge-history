# Retailer Recharge History

A minimal full-stack module for retailers to view and filter their mobile
recharge history, plus a form to create mock recharges.

- **Backend:** Laravel + MySQL (REST API)
- **Frontend:** React + Vite

## Project layout

```
backend/    Laravel app files (migrations, models, controllers, routes, seeders)
frontend/   React + Vite app (components, pages, API client)
```

The `backend/` folder here is **not a full Laravel installation** — it's the
set of files that differ from a fresh Laravel skeleton (migrations, models,
controllers, requests, routes, seeders). This keeps the repo small and the
diffs reviewable. Follow the setup steps below to drop them into a real
Laravel app.

---

## Backend setup

1. **Create a fresh Laravel app** (requires Composer):
   ```bash
   composer create-project laravel/laravel backend-app
   cd backend-app
   ```

2. **Copy this repo's backend files in**, overwriting the matching paths:
   ```bash
   cp -r ../backend/app/* app/
   cp -r ../backend/database/* database/
   cp ../backend/routes/api.php routes/api.php
   ```

3. **Enable API routing** (Laravel 11+ does not wire up `routes/api.php` by
   default). If `bootstrap/app.php` doesn't already reference `api:`, run:
   ```bash
   php artisan install:api
   ```
   Then make sure `routes/api.php` matches the one copied above (the
   installer generates its own file — replace its contents with ours).

4. **Configure the database** in `.env`:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=zupermoney_recharges
   DB_USERNAME=root
   DB_PASSWORD=
   ```
   Create the database first: `mysql -u root -e "CREATE DATABASE zupermoney_recharges"`

5. **Migrate and seed:**
   ```bash
   php artisan migrate --seed
   ```
   This creates 4 retailers and 48 recharge records spread across the last
   30 days with random operators/statuses.

6. **Allow the frontend origin in CORS.** In `config/cors.php`, make sure
   `'paths' => ['api/*']` and that `allowed_origins` includes
   `http://localhost:5173` (Laravel's default config of `['*']` also works
   for local dev).

7. **Run the server:**
   ```bash
   php artisan serve
   ```
   API is now available at `http://localhost:8000/api`.

### API endpoints

| Method | Endpoint          | Description                                             |
|--------|-------------------|----------------------------------------------------------|
| GET    | `/api/recharges`  | List recharges. Query params: `retailer_id`, `status`, `operator`, `from`, `to` (Y-m-d), `page`, `per_page` (default 10). Returns `{ data, meta }`. |
| POST   | `/api/recharges`  | Create a recharge. Body: `retailer_id`, `mobile_number`, `operator`, `amount`, `status` (optional, defaults to `pending`). |
| GET    | `/api/retailers`  | List retailers (id, name) — used to populate dropdowns.  |

---

## Frontend setup

```bash
cd frontend
npm install
cp .env.example .env   # defaults to http://localhost:8000/api
npm run dev
```

Open `http://localhost:5173`.

---

## Assumptions made

- No authentication/authorization layer was in scope for this task, so
  `retailer_id` is passed explicitly from the client (via a dropdown) rather
  than derived from a logged-in user. In a real system, `POST /recharges`
  would infer the retailer from the authenticated session and `authorize()`
  in `StoreRechargeRequest` would enforce it.
- "Valid mobile number" is interpreted as a 10-digit Indian mobile number
  starting with 6–9 (`^[6-9][0-9]{9}$`), since the brief didn't specify a
  country format.
- "Valid operator" is validated against a fixed list (`Airtel`, `Jio`, `Vi`,
  `BSNL`) rather than a separate `operators` table, since the brief didn't
  ask for operator management.
- Newly created recharges default to `pending` status (a real recharge
  gateway would update this asynchronously); the form allows this to be
  overridden only via direct API calls, not exposed in the UI, to keep the
  mock realistic.
- Retailers are a real table with a `hasMany`/`belongsTo` relationship to
  recharges (rather than a bare `retailer_id` integer with no backing table),
  since the task explicitly calls out Eloquent relationships in the rubric.

## What I'd do differently with more time

- Add authentication (Sanctum) so `retailer_id` is derived from the logged-in
  user instead of being client-supplied, and lock down `POST /recharges`
  accordingly.
- Add a Laravel API Resource (`RechargeResource`) instead of returning raw
  models, to control the exact JSON shape and hide internal fields.
- Write Feature tests for the filter combinations, pagination boundaries, and
  validation failure cases (currently untested due to the time box).
- Debounce the date-range/filter inputs so the API isn't hit on every
  keystroke-equivalent change.
- Add a loading skeleton instead of a plain "Loading…" text, and an
  optimistic UI update when creating a recharge instead of a full refetch.
- Extract shared filter/pagination logic into a `useRecharges` custom hook
  to keep the page component thinner.
- Add rate limiting / throttling on `POST /recharges` since it's an
  unauthenticated write endpoint in this version.
- Support CSV export of the filtered recharge history, which is a common
  ask from retailers wanting records for reconciliation.

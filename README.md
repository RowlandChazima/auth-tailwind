# Auth Tailwind (React) – React + Tailwind



---

-

## 🚀 Installation

```bash
cd auth-tailwind-react
```

Install the dependencies

```bash
npm install
```

Run the dev server

```bash
npm run dev
```

---



## Login / Logout Logic

The original project tracked auth state with one flag in `localStorage`: `auth_logged_in`. I kept that exact mechanism instead of switching to cookies/JWT on the frontend, so the behavior matches 1:1.

**Login**

1. User submits the login form.
2. `loginUser()` sends `POST /auth/login` to the API.
3. If the API responds with `success: true`, we call `login()` from `AuthContext`, which sets `localStorage.auth_logged_in = true` and flips React state to `isLoggedIn = true`.
4. User is redirected to `/dashboard`.

**Logout**

1. User clicks the logout button (on the dashboard, or on the landing page nav).
2. `logout()` from `AuthContext` removes `auth_logged_in` from `localStorage` and flips `isLoggedIn` back to `false`.
3. User is sent back to `/login`.

That's it — no tokens are inspected on the frontend, no expiry logic. It's a simple boolean flag, same as the original scripts.

---

## The "Middleware": `RouteGuard.jsx`

The original project used a `window.onload` handler in `script.js` that ran on every page load and manually checked `window.location.pathname` to decide whether to redirect. `RouteGuard.jsx` is the React equivalent of that — it's a wrapper component that sits above all the routes and re-runs its check every time the URL or auth state changes:

```
Not logged in + on /dashboard   → redirect to /login
Logged in + on /login/register  → redirect to /dashboard
```

It uses `useLocation()` to know the current path and `useNavigate()` to redirect, wrapped in a `useEffect` so the check re-runs whenever `isLoggedIn` or the pathname changes — mirroring the original's "check on every page load" behavior, just reactive instead of running once per full page refresh.

---

## ⚛️ New React Concepts I learned and used

**`createContext`**
Used in `AuthContext.jsx` to create a shared "channel" for auth state. Instead of passing `isLoggedIn`, `login`, and `logout` down as props through every component, any page wrapped inside `<AuthContext.Provider>` can just call `useAuth()` and grab what it needs directly — no prop drilling through `App.jsx` → `Routes` → each page.

**`useCallback`**
Used to wrap the `login` and `logout` functions so React doesn't recreate new function instances on every render:

```js
const login = useCallback(() => {
  localStorage.setItem(STORAGE_KEY, true);
  setIsLoggedIn(true);
}, []);
```

Since `login` and `logout` are placed inside the context's `value` object, giving them a stable reference (via the empty `[]` dependency array) prevents every component consuming `AuthContext` from thinking the context changed and re-rendering unnecessarily.

---

## 📁 Structure

```
src/
  api/
    client.js       # API URL
    auth.js         # registerUser(), loginUser()
    users.js        # fetchUsers()
  components/
    RouteGuard.jsx   # middleware
  context/
    AuthContext.jsx  # login/logout state, backed by localStorage
  hooks/
    useAuth.js
  pages/
    Landing.jsx
    Login.jsx
    Register.jsx
    Dashboard.jsx
  utils/
    validation.js    # phoneRegex, emailRegex, trimFormValues()
  App.jsx
  main.jsx
  index.css
```

---

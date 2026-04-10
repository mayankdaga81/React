# Folder and File Convention in Next.js (App Router)

This note explains the basic rules and conventions for structuring routes using the **app** router in a Next.js project (specifically the `07-first-next-js-app` workspace). It uses examples from this codebase (`about-us`, `contact`, and `user/[id]`).

---

## 1. Basic Route Creation ✅

- Every route corresponds to a **folder** inside the `app` directory.
- A route folder must contain a file named `page.tsx`. No other filename is required for the page itself – Next.js will automatically treat `page.tsx` as the page component.
- The URL path mirrors the folder name but **never includes** `page.tsx`.

### Example:

```
app/
  ├─ contact/
  │   └─ page.tsx      <-- renders at /contact
  ├─ about-us/
  │   └─ page.tsx      <-- renders at /about-us
  └─ user/
      └─ [id]/
          └─ page.tsx  <-- renders at /user/<id>
```

- `http://localhost:3000/` → renders `app/page.tsx` (the root page)
- `http://localhost:3000/contact` → renders `app/contact/page.tsx`
- `http://localhost:3000/about-us` → renders `app/about-us/page.tsx`

> **Note:** `page.tsx` never appears in the URL.

---

## 2. Special UI Files 🧱

These are reserved filenames inside any route folder and affect behavior:

| Filename        | Purpose / Behavior                                                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `page.tsx`      | Route page component (required for page routes).                                                                                                        |
| `layout.tsx`    | Shared UI wrapping all sub-pages. It preserves state and does **not** re-render when navigating between its children. Useful for headers, navbars, etc. |
| `loading.tsx`   | A lightweight loading indicator shown during transitions.                                                                                               |
| `error.tsx`     | Error boundary UI for runtime errors within this segment.                                                                                               |
| `not-found.tsx` | Custom 404 UI when no matching page is found.                                                                                                           |
| `route.ts`      | Defines an **API route** for server actions (not page rendering).                                                                                       |

> Changes to `layout.tsx` do not trigger re-renders of nested pages; the layout persists across navigations.

---

## 3. Type of Routes 🌐

### Static Routes

Folders with fixed names:

- `/about-us` → `app/about-us/page.tsx`
- `/contact` → `app/contact/page.tsx`

### Dynamic Routes

Folders whose name is wrapped in brackets: `[param]`.
These capture segments as parameters.

Example in current project:

- `/user/[id]` → `app/user/[id]/page.tsx`
  ```tsx
  export default function UserId({ params }) {
    const { id } = params; // or await params if async
    return <div>UserId: {id}</div>;
  }
  ```
- You can access the parameter via `params.id`.

### Catch‑All Routes

Enhanced dynamic routes capturing multiple segments with `[...slug]`.
Useful for docs, blogs, etc. (not shown in current code).

### Route Groups `()`

Folders prefixed with parentheses e.g. `(admin)` that help with organization without affecting the url. They are **not** part of the path.

### Parallel Routes

Routes that render simultaneously alongside each other (advanced layout technique).

### Intersecting Routes

Mix of layouts/segments that can overlap; used for complex UI patterns.

> _The last three (groups, parallel, intersecting) are more advanced features; the examples above are mostly for organization and advanced routing scenarios._

---

## 4. Nested and Dynamic Routing 📂

### Nested Routing

Create subfolders; URLs stack accordingly.

Example: wanting `/courses/python`

```
app/
  courses/
    page.tsx              // renders at /courses
    python/
      page.tsx            // renders at /courses/python
```

Each `page.tsx` lives in its own folder; navigation simply shows the corresponding page.

### Dynamic with Nesting

You can combine both techniques. For example:

```
app/users/
  [id]/
    page.tsx            // /users/123, /users/abc
```

Inside `page.tsx` you use `params.id` to fetch data.

> The `params` object can be async (a promise), so `await params` if needed.

---

## 5. Practical Tips from This Codebase 💡

- Look at `app/about-us/page.tsx` and `app/contact/page.tsx` for simple static route examples.
- The dynamic route `app/user/[id]/page.tsx` demonstrates extracting route parameters.
- Add a `layout.tsx` in any folder to share common UI (e.g., `app/user/layout.tsx` would wrap all user pages).
- Use `not-found.tsx` when you need a custom 404 for a segment (e.g., `app/user/not-found.tsx`).

> These notes should help you read the code in `07-first-next-js-app` and understand how changing folders and files affect the generated routes.

---

Keep this file handy as a quick reference when you add new pages or rearrange your `app` directory! 💪

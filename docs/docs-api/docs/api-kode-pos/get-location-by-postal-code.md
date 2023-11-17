---
sidebar_position: 2
---

# Mendapatan Lokasi dengan Kode Pos

**HTTP METHOD : GET**

```txt title="endpoint"
 api.ahmadzidni.site/postal-code/{kode-pos}
```

## Params

Params **(Required)**:

- `kode-pos` type **integer**

## Example Request

```txt title="GET"
 api.ahmadzidni.site/postal-code/55282

```

## Example Response

# Succsess :

```json title="200"
{
  "status": 200,
  "message": "success",
  "data": {
    "postal_code_query": "55285",
    "data": {
      "province": "DI Yogyakarta",
      "city": "Sleman",
      "district": "Mlati",
      "subdistrict": "Sendangadi",
      "postal_code": 55285
    }
  }
}
```

# Gagal :

- Jika data tidak ditemukan maka server akan merespon status code 404 (Not Found) dengan message:

```json title="404"
{
  "status": 404,
  "message": "lokasi tidak ditemukan",
  "data": null
}
```

- Jika terjadi kesalahan pada proses query pada server maka server akan merespon status code 500 (Internal Server Error) dengan message:

```json title="500"
{
  "status": 500,
  "message": "Internal server error!",
  "data": null
}
```

<!--
- `src/pages/index.js` → `localhost:3000/`
- `src/pages/foo.md` → `localhost:3000/foo`
- `src/pages/foo/bar.js` → `localhost:3000/foo/bar`

## Create your first React Page

Create a file at `src/pages/my-react-page.js`:

```jsx title="src/pages/my-react-page.js"
import React from "react";
import Layout from "@theme/Layout";

export default function MyReactPage() {
  return (
    <Layout>
      <h1>My React page</h1>
      <p>This is a React page</p>
    </Layout>
  );
}
```

A new page is now available at [http://localhost:3000/my-react-page](http://localhost:3000/my-react-page).

## Create your first Markdown Page

Create a file at `src/pages/my-markdown-page.md`:

```mdx title="src/pages/my-markdown-page.md"
# My Markdown page

This is a Markdown page
```

A new page is now available at [http://localhost:3000/my-markdown-page](http://localhost:3000/my-markdown-page). -->

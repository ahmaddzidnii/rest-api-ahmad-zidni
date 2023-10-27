---
sidebar_position: 2
---

# Mendapatan Lokasi dengan Kode Pos

**HTTP METHOD : GET**

```txt title="endpoint"
 /postalcode/{kode-pos}
```

## Params

Params (Required):

- `kode-pos` type **integer**

## Example Response

# Succsess :

```json
{
  "postalCode": "55283",
  "data": {
    "province": "DI Yogyakarta",
    "city": "Sleman",
    "district": "Depok",
    "subdistrict": "Condong Catur",
    "postal_code": 55283
  }
}
```

# Gagal :

- Jika query limit kurang dari 50 maka server akan merespon status code 400(Bad Request) dengan message:

```json
{
  "message": "Limit tidak boleh kurang dari 50"
}
```

- Jika query page yang dikirim melebihi jumlah page pada database maka server akan merespon status code 400(Bad Request) dengan message:

```json
{
  "message": "Page yang diminta melebihi page pada data pada database!"
}
```

- Jika terjadi kesalahan pada proses query pada server maka server akan merespon status code 500(Internal Server Error) dengan message:

```json
{
  "message": "Internal server error!"
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

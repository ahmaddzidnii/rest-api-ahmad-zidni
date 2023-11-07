---
sidebar_position: 1
---

# Mendapatkan Semua Data Kode Pos

**HTTP METHOD : GET**

```txt title="endpoint"
  https://api.ahmadzidni.site/postalcodes
```

## Params

Query Params **(Opsional)**:

- `limit` type **integer**
- `page` type **integer**

Default limit: 100 , page: 1

> **Peringatan:** Untuk query limit minimmal adalah 50!

## Example Request

```txt title="GET"
 api.ahmadzidni.site/postalcodes
```

## Example Response

# Succsess :

```json title="200"
{
    "status": 200,
    "message": "Get all postal code success!",
    "data": {
        "pagination": {
            "total_page": 813,
            "has_prev_page": false,
            "has_next_page": true,
            "current_page": 1,
            "items": {
                "count": 100,
                "total": 81266,
                "per_page": 100
            }
        },
        "data": [
            {
                "province": "Bali",
                "city": "Badung",
                "district": "Kuta",
                "subdistrict": "Tuban",
                "postal_code": 80361
            },
            {
                "province": "Bali",
                "city": "Badung",
                "district": "Kuta Utara",
                "subdistrict": "Tibubeneng",
                "postal_code": 80361
            },
            {
                "province": "Bali",
                "city": "Badung",
                "district": "Kuta Selatan",
                "subdistrict": "Tanjung Benoa",
                "postal_code": 80361
            },
            {
                "province": "Bali",
                "city": "Badung",
                "district": "Kuta",
                "subdistrict": "Legian",
                "postal_code": 80361
            },
            {
                "province": "Bali",
                "city": "Badung",
                "district": "Kuta",
                "subdistrict": "Seminyak",
                "postal_code": 80361
            },
            {
                "province": "Bali",
                "city": "Badung",
                "district": "Kuta Selatan",
                "subdistrict": "Pecatu",
                "postal_code": 80361
            },
            {
                "province": "Bali",
                "city": "Badung",
                "district": "Kuta",
                "subdistrict": "Kuta",
                "postal_code": 80361
            },
            {
                "province": "Bali",
                "city": "Badung",
                "district": "Kuta Selatan",
                "subdistrict": "Kutuh",
                "postal_code": 80361
            },
            {
                "province": "Bali",
                "city": "Badung",
                "district": "Kuta Utara",
                "subdistrict": "Kerobokan Kelod",
                "postal_code": 80361
            },
            {
                "province": "Bali",
                "city": "Badung",
                "district": "Kuta Utara",
                "subdistrict": "Kerobokan Kaja",
                "postal_code": 80361
            },
            ...
        ]
    }
}
```

# Gagal :

- Jika query limit kurang dari 50 maka server akan merespon status code 400 (Bad Request) dengan message:

```json title="400"
{
  "message": "Limit tidak boleh kurang dari 50"
}
```

- Jika query page yang dikirim melebihi jumlah page pada database maka server akan merespon status code 400 (Bad Request) dengan message:

```json title="400"
{
  "message": "Page yang diminta melebihi page pada data pada database!"
}
```

- Jika terjadi kesalahan pada proses query pada server maka server akan merespon status code 500 (Internal Server Error) dengan message:

```json title="500"
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

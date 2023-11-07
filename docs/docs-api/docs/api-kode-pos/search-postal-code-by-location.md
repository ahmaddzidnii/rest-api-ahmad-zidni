---
sidebar_position: 3
---

# Search Kode Pos Berdasarkan Lokasi

**HTTP METHOD : GET**

```txt title="endpoint"
 api.ahmadzidni.site/postalcodes/search
```

## Params

Query Params (Required):

- `query` type **string**

Query Params (Opsional):

- `limit` type **integer**
- `page` type **integer**

Default limit: 100 , page: 1

> **Peringatan:** Untuk query limit minimmal adalah 50!

## Example Request

```txt title="GET"
 api.ahmadzidni.site/postalcodes/search?query=yogyakarta
```

## Example Response

# Succsess :

```json title="200"
{
  "status": 200,
  "message": "success",
  "data": {
    "pagination": {
      "total_page": 1,
      "has_prev_page": false,
      "has_next_page": false,
      "current_page": 1,
      "items": {
        "count": 1,
        "total": 1,
        "per_page": 1
      }
    },
    "query_search": "maguwoharjo",
    "data": [
      {
        "province": "DI Yogyakarta",
        "city": "Sleman",
        "district": "Depok",
        "subdistrict": "Maguwoharjo",
        "postal_code": 55282
      }
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

- Jika data tidak ditemukan dalam database maka server akan merespon status code 404 (Not Found) dengan message:

```json title="404"
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

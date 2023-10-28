---
sidebar_position: 3
---

# Search Kode Pos Berdasarkan Lokasi

**HTTP METHOD : GET**

```txt title="endpoint"
 /postalcode/search
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
 api.ahmadzidni.site/postalcode/search?query=yogyakarta
```

## Example Response

# Succsess :

```json title="200"
{
    "pagination": {
        "total_page": 5,
        "has_prev_page": false,
        "has_next_page": true,
        "current_page": 1,
        "items": {
            "count": 100,
            "total": 440,
            "per_page": 100
        }
    },
    "query": "yogyakarta",
    "data": [
        {
            "province": "DI Yogyakarta",
            "city": "Bantul",
            "district": "Piyungan",
            "subdistrict": "Srimulyo",
            "postal_code": 55792
        },
        {
            "province": "DI Yogyakarta",
            "city": "Bantul",
            "district": "Piyungan",
            "subdistrict": "Sitimulyo",
            "postal_code": 55792
        },
        {
            "province": "DI Yogyakarta",
            "city": "Bantul",
            "district": "Pleret",
            "subdistrict": "Wonolelo",
            "postal_code": 55791
        },
        {
            "province": "DI Yogyakarta",
            "city": "Bantul",
            "district": "Pleret",
            "subdistrict": "Segoroyoso",
            "postal_code": 55791
        },
        {
            "province": "DI Yogyakarta",
            "city": "Bantul",
            "district": "Pleret",
            "subdistrict": "Wonokromo",
            "postal_code": 55791
        },
        {
            "province": "DI Yogyakarta",
            "city": "Bantul",
            "district": "Pleret",
            "subdistrict": "Pleret",
            "postal_code": 55791
        },
        {
            "province": "DI Yogyakarta",
            "city": "Bantul",
            "district": "Pleret",
            "subdistrict": "Bawuran",
            "postal_code": 55791
        },
        {
            "province": "DI Yogyakarta",
            "city": "Bantul",
            "district": "Dlingo",
            "subdistrict": "Terong",
            "postal_code": 55783
        },
        {
            "province": "DI Yogyakarta",
            "city": "Bantul",
            "district": "Dlingo",
            "subdistrict": "Temuwuh",
            "postal_code": 55783
        },

            ...
    ]
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

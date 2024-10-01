# Country Info API

This project is an API built with Express.js that delivers population information for various countries. It includes two main endpoints: one for retrieving a list of available countries and another for fetching detailed country information, including borders, population data, and the country flag.

## Running the Project

To run this project locally, follow these steps:

1. Install the necessary dependencies:

    ```bash
    pnpm install
    ```

2. Start the application:

    ```bash
    pnpm start
    ```

The server will be running on `http://localhost:<port>`, where `<port>` is defined in your environment settings as `BACKEND_PORT` (defaults to `5000` if not specified).

## API Endpoints

### 1. Get List of Available Countries

- **Endpoint**: `GET /api/`
- **Description**: Fetches a list of all available countries and their associated ISO2 codes.
- **Response Example**:
    ```json
    [
      { "countryCode": "AR", "name": "Argentina" },
      { "countryCode": "BR", "name": "Brazil" },
      { "countryCode": "US", "name": "United States" },
      ...
    ]
    ```

### 2. Get Country Information

- **Endpoint**: `POST /api/country`
- **Description**: Retrieves detailed information for a specific country based on its ISO2 code and country name, including population statistics (mostly until 2018), borders, and the country flag.
- **Request Body**: The request body should include either the `iso2` or the `country` field. You can provide both fields, but at least one is required.
    ```json
    {
      "iso2": "AR",
      "country": "Argentina"
    }
    ```

- **Response Example**:
    ```json
    {
      "name": "Argentina",
      "borders": [
        {
          "name": "Brazil",
          "iso2": "BR"
        },
        {
          "name": "Chile",
          "iso2": "CL"
        },
        ...
      ],
      "population": [
        {
          "year": 1960,
          "value": 20481779
        },
        ...,
        {
          "year": 2018,
          "value": 44494502
        }
      ],
      "flag": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg"
    }
    ```

## Notes

- This API is part of a full-stack assessment. If you want to run it locally, I suggest checking out this [repository](https://github.com/devfercastro/country-app-assessment) for more information about the full stack project setup.

Let me know if you need further adjustments or more details!

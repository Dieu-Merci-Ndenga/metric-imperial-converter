# Metric–Imperial Converter

A lightweight REST API that converts values between commonly used metric and imperial units. The project is built with Node.js and Express and provides clear JSON responses for distance, volume, and weight conversions.

## Live Demo

Try the deployed API here:

**[https://metric-imperial-converter-119j.onrender.com](https://metric-imperial-converter-119j.onrender.com)**

## Features

- Convert between metric and imperial units.
- Supports distance, volume, and weight conversions.
- Accepts whole numbers, decimals, signed values, and fractions such as `1/2`.
- Provides both query-string and URL-parameter API formats.
- Returns structured JSON responses with the original value, converted value, units, and a readable conversion statement.
- Includes validation for invalid numbers, unsupported units, and missing input.
- Includes automated tests based on Mocha, Chai, and Supertest.
- Enables CORS for convenient use from client applications and freeCodeCamp test suites.

## Supported Conversions

| Input Unit | Description | Output Unit | Description |
| --- | --- | --- | --- |
| `gal` | Gallons | `L` | Liters |
| `L` | Liters | `gal` | Gallons |
| `mi` | Miles | `km` | Kilometers |
| `km` | Kilometers | `mi` | Miles |
| `lbs` | Pounds | `kg` | Kilograms |
| `kg` | Kilograms | `lbs` | Pounds |

Conversion results are rounded to five decimal places for consistent and readable output.

## API Usage

### Query-string format

```text
GET /api/convert?input=10mi
```

Example response:

```json
{
  "initNum": 10,
  "initUnit": "mi",
  "returnNum": 16.0934,
  "returnUnit": "km",
  "string": "10 miles converts to 16.0934 kilometers"
}
```

### URL-parameter format

```text
GET /api/convert/10mi
```

The URL-parameter format returns the same response structure as the query-string format.

### Fraction support

Fractions can be provided as input values:

```text
GET /api/convert?input=1/2kg
```

### Validation responses

The API returns a plain-text validation message when input is missing or invalid:

- `invalid input`
- `invalid number`
- `invalid unit`
- `invalid number and unit`

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later recommended
- npm, included with Node.js

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Dieu-Merci-Ndenga/metric-imperial-converter.git
   ```

2. Move into the project directory:

   ```bash
   cd metric-imperial-converter
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the application:

   ```bash
   npm start
   ```

The server runs on port `3000` by default. You can override the port by setting the `PORT` environment variable.

## Environment Variables

Create a `.env` file when you need to configure environment-specific values. A sample configuration is available in [`sample.env`](./sample.env).

```env
PORT=3000
```

## Running Tests

Execute the automated test suite with:

```bash
npm test
```

The test command runs the Mocha test files in the `tests` directory and exits after completion.

## Project Structure

```text
.
├── controllers/
│   └── convertHandler.js   # Conversion logic and input validation
├── routes/
│   └── api.js              # API endpoints
├── tests/                  # Automated tests
├── server.js               # Express application entry point
├── package.json             # Scripts and dependencies
└── sample.env              # Environment variable example
```

## Technology Stack

- **Node.js** — JavaScript runtime
- **Express** — Web application framework
- **CORS** — Cross-origin request support
- **dotenv** — Environment variable management
- **Mocha** — Test runner
- **Chai** — Assertions
- **Supertest** — HTTP endpoint testing

## Design Notes

The conversion logic is kept in a dedicated controller so it can be reused by both API routes and automated tests. Each conversion uses a defined unit factor, while the API layer is responsible for interpreting requests and returning the appropriate response format.

## License

`MIT`

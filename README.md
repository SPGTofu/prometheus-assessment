# Prometheus Assessment

A stock data application with a React frontend and a TypeScript backend. The backend retrieves stock data and exposes it through an HTTP API; the frontend lets you search for a stock and view its chart.

## Prerequisites

- Node.js and npm

Install dependencies in each project directory if you have not already:

```bash
cd backend && npm install
cd ../frontend && npm install
```

## Run the application

Start the backend in one terminal:

```bash
cd backend
npm run dev
```

The backend listens on `http://localhost:3030`.

Start the frontend in a second terminal:

```bash
cd frontend
npm start
```

The frontend opens in your browser. Search for a stock symbol to view its chart. The frontend development server proxies `/api` requests to the backend.

## Test the backend API

This step is optional if you would like ensure the backend is running correctly. With the backend running, use `curl` to request stock data:

```bash
curl -i http://localhost:3030/api/stocks/TSLA
```

Replace `TSLA` with the stock symbol you want to look up. A successful response includes an HTTP status and JSON data. Or if the stock symbol is invalid, then it should return an error status.

## Build and run the backend

To compile the backend and run the compiled version:

```bash
cd backend
npm run build
npm start
```

## Backend test script

Run the backend test script with:

```bash
cd backend
npm test
```

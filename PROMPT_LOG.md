# Prompt Log

This log summarizes the prompts I used while building and reviewing the stock application, why I used them, and what I did with the recommendations.

### 0. Using Copilot's autosuggestion
I am adding this here as I was utilized copilots in-line autosuggestion throughout the process. This is to highlight that I was utilizing AI throughout, but one where there were no "prompts" for, but for record-keeping thought I would make sense to put in here.

## Backend and API

### 1. Testing approach

**Prompt:** “What is the best approach to running the test file?”

**Purpose:** Learn good practices for writing and running TypeScript tests.

**Outcome:** Used the recommendation to create a simple test structure.

### 2. Understanding the stock response

**Prompt:** “Here is the response data. What should I look at to find intraday data?”

**Purpose:** Understand the structure of the returned data and identify which fields contain intraday values.

**Outcome:** Reviewed the response structure and what each mapping represents.

### 3. Requesting a historical period

**Prompt:** “Here is the URL: `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=15m`. How can I get data from the past X period?”

**Purpose:** Find out how to request the previous month of stock data.

**Outcome:** Added the `range=30d` parameter to request data from the last 30 days.

### 4. Self-hosting the API

**Prompt:** “How can I best self-host my API?”

**Purpose:** Learn how to self-host a TypeScript API.

**Outcome:** Configured Hono with preset environment values.

### 5. Organizing build output and tests

**Prompt:** “My test file is causing the `dist` files to be created alongside the source files instead of in the `dist` directory. How can I fix this?”

**Purpose:** Learn how to organize source, test, and build output files.

**Outcome:** Updated `tsconfig.json` to exclude test files from the production build.

### 6. Running the test entry point

**Prompt:** “I want the test script to run `main` specifically, since that function runs all my other tests.”

**Purpose:** Understand how to run the test suite through one entry-point function.

**Outcome:** Found that `main()` was not being called and added a call at the end of the test file.

### 7. Backend and API review

**Prompt:** “Review my backend and API. Is there anything I am missing that could break functionality, such as edge cases or bugs?”

**Purpose:** Identify possible backend and API bugs or edge cases.

**Outcome:** Added handling for missing candle values during aggregation.

### 8. CORS and local development ports

**Prompt:** “CORS is limited to port 5173. Does that mean I need to set the frontend's localhost port to 5173?”

**Purpose:** Understand whether the frontend and backend ports need to match.

**Outcome:** Made no changes. The frontend uses a development proxy for API requests, so the browser calls the frontend origin and the proxy forwards requests to the backend.

## Frontend and charts

### 9. Page templates

**Prompt:** “Create templates for a homepage with a simple input and a `StockInfo` page with a large graph area. Use Chakra UI components. No current data is needed.”

**Purpose:** Speed up creation of the initial page layouts.

**Outcome:** Did not use the suggested template because I preferred a simpler approach and wanted to avoid overcomplicating the setup.

### 10. Header not appearing

**Prompt:** “Why is my header not appearing?”

**Purpose:** Find out why the header was not showing on the page.

**Outcome:** Fixed the route nesting so the header layout renders with the page routes.

### 11. Stock information page layout

**Prompt:** “Format my stock information page: add a place at the top to show the stock symbol and an area to display a graph.”

**Purpose:** Add a stock heading and graph area to the page.

**Outcome:** Used the layout guidance, then replaced the placeholder graph with my own Recharts implementation.

### 12. Calling the API from the frontend

**Prompt:** “How can I call my API from the frontend?”

**Purpose:** Learn how the frontend can request data from the backend API.

**Outcome:** Added a fetch request and updated the `useEffect` logic to handle loading and error states.

### 13. Stale data after changing symbols

**Prompt:** “When I search for a new stock while already on this page, I get stale data. What is the cause?”

**Purpose:** Find out why data from the previous stock remained visible after changing symbols.

**Outcome:** Fixed the `useEffect` request handling so an aborted request does not incorrectly update the loading state.

### 14. Choosing a chart approach

**Prompt:** “My goal is to display the daily average low, average high, and volume for each day based on the data. What is the best approach?”

**Purpose:** Choose a way to display multiple data series together.

**Outcome:** Reviewed Recharts, then adapted an example to use the volume, average-low, and average-high values returned by my API.

### 15. Chart data keys

**Prompt:** “Look over my `StockChart.js`. Is there a discrepancy between the template and my data values?”

**Purpose:** Check that the chart uses the same field names as the API response.

**Outcome:** Reviewed the suggested optional chart changes and chose not to add them to keep the graph simple.

### 16. Custom chart legend labels

**Prompt:** “How do I change the legend labels to be custom?”

**Purpose:** Find the Recharts property for setting custom legend labels.

**Outcome:** Used the suggested property and chose labels that better describe the returned data.

### 17. Graph component not loading

**Prompt:** “An error message says the graph component is not loading. What is the source of the error?”

**Purpose:** Find out why the graph stopped appearing after adding another component below it.

**Outcome:** Corrected a parameter name so it matched the expected prop.

### 18. Opacity behavior

**Prompt:** “Why is the opacity change not triggering?”

**Purpose:** Understand why the chart-series opacity was not updating on hover.

**Outcome:** Decided to remove the opacity behavior because it was not useful when displaying multiple lines.

### 19. Frontend component review

**Prompt:** “Review my frontend. Is there anything I am missing that could break the functionality of the components?”

**Purpose:** Check for frontend bugs and edge cases.

**Outcome:** Added form submission so Enter triggers a search, and updated the checkbox handler to use Chakra UI v3's API.

### 20. PROMPT_LOG.md formatting
**Prompt:** "Look over my PROMT_LOG.md. I am writing it so that my assessment overviewer will know what prompts I used. I want to format it cleanly and make it look uniform. Ensure that all of my text is grammatically correct and spelled correctly."

**Purpose:** Efficiently check for grammar and spelling of my logs.

**Outcome:** Updated any text that were vague, and reviewed the changes.

### 21. Fix Weird Searches
**Prompt:** "My goal: since no symbol has # or / in it, just replace it with ''"

**Purpose:** Find syntax for search input validation to ensure it does not break the search itself.

**Outcome:** Accepted the ".replace()" method it recommended me.

### 22. README.md formatting
**Prompt:** "Update my readme.md to be formatted and have correct grammar."

**Purpose:** Efficiently check for grammar and spelling of my steps to load the project.

**Outcome:** Added extra tests to ensure that the instructions were clear and the expected outcomes were correct.

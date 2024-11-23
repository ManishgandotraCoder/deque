# how to Run project

For Front end
cd frontend
npm install
npm start

For Backend end
cd backend
npm install
npm start

# React Node.js Google Books Search App

This project is a full-stack application built with React and Node.js that allows users to search for books using the Google Books API. The application supports paginated results, statistics about the search results, and expandable details for each book.

---

## **Features**

1. **Search Functionality**:

   - Users can search for books by entering keywords in a search form.
   - Results are fetched from the [Google Books API](https://www.googleapis.com/books/v1/volumes?key=<VALID_API_KEY>&q=something).

2. **Paginated Results**:

   - Users can choose the number of results per page (e.g., 5, 10, 20).
   - Each result is displayed in the format:
     ```
     first author [, second author [, third author….]] - title
     ```

3. **Expandable Book Details**:

   - Clicking on a book expands its entry to show a description if available.
   - If no description exists, a placeholder message is displayed.

4. **Statistics**:

   - Total number of results.
   - Name of the single author who appears most frequently.
   - Earliest and most recent publication dates from the results.
   - Server response time for fetching data from the API.

5. **State Management with Redux**:

   - Used **Redux** for global state management to ensure a consistent application state.
   - State slices include:
     - `search`: Stores search parameters and results.
     - `pagination`: Stores current page, page size, and total pages.
     - `statistics`: Stores derived statistics such as most common author and publication dates.

6. **Optimized Rendering**:

   - Used `useCallback` to memoize event handlers to avoid unnecessary re-renders.
   - Used `useMemo` to optimize calculations for derived data (e.g., statistics).

7. **Shareable Components**:

   - Created reusable and shareable components like `Table with Expanding`, `SearchInput`, `Header`, `Card`, and `Loader` without relying on external UI libraries to showcase technical skills and design patterns.

8. **Unit Testing**:

   - Includes tests for both React components and Node.js API endpoints using `jest`, `supertest`, and `mocha`.

9. **TypeScript**:

   - Both frontend and backend are fully typed with TypeScript for better maintainability and type safety.

---

## **Technologies Used**

- **Frontend**: React, Axios, React Router, Redux Toolkit
- **Backend**: Node.js, Express
- **Optimization**: `useCallback`, `useMemo`
- **State Management**: Redux Toolkit
- **Testing**:
  - Frontend: Jest, React Testing Library
  - Backend: Jest, Supertest, Mocha
- **TypeScript**: Used in both React and Node.js
- **Others**: Google Books API, Pagination

---

## **Setup Instructions**

### Prerequisites

- Node.js installed on your system
- A valid Google Books API key
- Git for version control

---

### 1. Clone the Repository

```bash
git clone <repository-url>
cd react-node-google-books
```

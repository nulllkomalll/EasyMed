# EasyMed

EasyMed is a small, full-stack medical appointment and simple clinic management project. It contains a few related folders for frontend (static and simple UI), backend API servers, and database schema to run locally for development and testing.

**Repository layout**

- `easyMed/client`: simple static frontend pages (`index.html`, `login.html`, `signup.html`, `dashboard.html`, etc.)
- `easyMed/easymed-frontend`: additional frontend HTML pages used by the project
- `easyMed/easymed-backend`: Node.js backend (CommonJS) that contains server-side code and dependencies
- `easyMed/server`: Express server (ES module) with `app.js` and an `npm start` script
- `easyMed/database`: contains `scheme.sql` for creating the MySQL schema used by the project

**Technologies**

- Node.js / Express
- MySQL (or compatible, e.g., MariaDB)
- HTML/CSS (static frontend files)

**Prerequisites**

- Node.js (16+ recommended)
- npm (comes with Node.js)
- MySQL server (or compatible) for the database schema

**Quick Setup (Windows / PowerShell)**

1. Clone the repo (if you haven't already):

```powershell
git clone https://github.com/nulllkomalll/EasyMed.git
cd "c:\Users\komal\OneDrive\Desktop\react proj\easyMed"
```

2. Install backend dependencies

```powershell
# For the server with start script
cd server
npm install

# For the backend folder (commonjs backend)
cd ..\easymed-backend
npm install
```

3. Prepare the database

- Create a database in your MySQL server (for example `easymed_db`) and import the schema:

```powershell
# Run this in a shell that has access to your mysql client
mysql -u <your_user> -p <your_database_name> < ..\database\scheme.sql
```

4. Run the servers

```powershell
# From the `easyMed/server` directory
npm start

# Or run the other backend directly from `easyMed/easymed-backend` if the project uses index.js
node index.js
```

5. Open the frontend

- The static frontend files are plain HTML/CSS in `easyMed/client` and `easyMed/easymed-frontend`. You can open them directly in a browser or serve them with a static file server.

**Notes & tips**

- The `easyMed/server` package has a `start` script (`node app.js`).
- The `easyMed/easymed-backend` folder declares dependencies but does not include an `npm start` script in `package.json`; run `node index.js` (or add a start script to `package.json`) if needed.
- Update any `.env` or configuration files used by the servers to set DB credentials and ports. The repository might expect environment variables (e.g., `PORT`, `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`).

**Contributing**

- Feel free to open issues or submit pull requests.
- When contributing, include clear steps to reproduce and test changes.

**License**

- This repository does not include an explicit license file.

**Contact**

- Repository owner: `nulllkomalll` (GitHub)

---



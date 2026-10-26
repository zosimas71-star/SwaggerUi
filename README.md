# Letter API docs (React + Swagger UI)

React 18 + Vite + swagger-ui-react. The API spec is `public/openapi.json` (124 endpoints).

## Run
    npm install
    cp .env.example .env     # set VITE_API_BASE_URL to your backend
    npm run dev              # http://localhost:5173

## Build and deploy
    npm run build            # output in dist/
- Netlify / Vercel / GitHub Pages: publish the `dist/` folder (build command `npm run build`, publish dir `dist`).
- Docker: `docker build --build-arg VITE_API_BASE_URL=https://api.example.gov.et/api/v1 -t letter-api-docs . && docker run -p 8080:80 letter-api-docs`

## Try it out
1. Backend must allow CORS from the docs site.
2. Call AUTH-02 login, copy `access_token`, click Authorize, paste it.

## Update the docs
Replace `public/openapi.json` with the new file and rebuild.

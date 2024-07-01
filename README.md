# MojeKlima DMP - UI (React)

This project was developed as part of a long-term high school graduation project.
The project utilizes npm for package management.
The primary UI library is React.
The application implements the minimum PWA elements (service worker), therefore additional certificates for
HTTPS are included in the project. It might or might not work for you.
GraphQL is used to establish a connection and data exchange with the [backend](https://github.com/RamoFX/mojeklima-api-php).
The project has been customized for deployment on school servers (package.jsom homepage used as a basename for React Router DOM). 
I am aware that this code is not ideal for long-term maintenance.
I plan to rewrite the web client to Next.js.
The backend has already been rewritten to have a better and more structured architecture, and most
importantly, the endpoint has changed, which means that the frontend cannot currently fully interact with the
backend.

## Run

`npm i`

`npm run frontend:start`

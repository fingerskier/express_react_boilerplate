# express_react_boilerplate
Express + React boilerplate


## Usage

Develop the react app within the `client` directory.

Run the `npm start` from the `client` directory for a usual React workflow.

Run the server from the root directory via `npm run dev`.

The app is available @ `localhost:3000`

The server is available @ `localhost:3456`

There is a proxy setup from within the client such that API calls can be forwared to the server during development.  
  e.g.  if you `fetch('/users')` it will return the result of `localhost:3456/users`
  i.e.  if you do client-side routing it's up to you to assure there are no conflicting routes
  AND  in production your app is served from `/app` ~ client-side routes are relative to that and server/API routes are relative to `/`

====

When ready to deploy the app run `npm run build` then `npm run deploy` from the client directory.

You will need a `.env` file containing:
  `REACT_APP_ROOT_PATH = localhost/app`


`npm package` from the root directory will build an executable for the current platform.
If you need to customize the distributable then checkout `/compile.js` which uses [nexe](https://www.npmjs.com/package/nexe).
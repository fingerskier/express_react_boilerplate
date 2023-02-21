import './App.css'


function App() {
  return (
    <div>
      <header>
        <h1>Express React Boilerplate</h1>
      </header>

      <section>
        <ul>
          <li>Edit the dev app in <pre>/client</pre></li>

          <li>To "publish" the app: <pre>npm run build</pre> <pre>npm run deploy</pre></li>

          <li>The app will be available at <pre>https:/your.domain/app</pre></li>

          <li>You will need a <code>.env</code> file with this content <pre>REACT_APP_ROOT_PATH = localhost/app</pre></li>
        </ul>
      </section>

      <footer>
        <span> &larr; </span>
        
        <span> &rarr; </span>
      </footer>
    </div>
  )
}


export default App
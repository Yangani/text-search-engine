import "./App.css";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Search from "./components/search/search";
import Results from "./components/results/results";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Text search engine</p>
      </header>
      <Stack direction="column" alignItems="center" justifyContent="center">
        <Search setSearchResults={setSearchResults} />
        <Results searchResults={searchResults} />
      </Stack>
    </div>
  );
}

export default App;

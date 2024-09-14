import "../stylesheets/App.css";
import Header from "../components/Header";
import WordList from "../components/WordList";

/**
 * grab 20 words
 * put them into an array
 * display one by one for user to attempt
 * click next will bring up a new word
 * once all words have been attempted show list of words
 * the list will show which words were correct and incorrect
 * score based on words
 */
function App() {
  return (
    <div className="App">
      <Header />
      <WordList />
    </div>
  );
}

export default App;

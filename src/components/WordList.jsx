import WordCard from "./WordCard";
// import RawWordList from "../data/RawWordList";

const wordSet = [
  "apple",
  "banana",
  "cherry",
  "dragonfruit",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "kiwi",
  "lemon",
];

export default function WordList() {
  return (
    <section>
      {wordSet.map((currentWord, index) => {
        return <WordCard key={index} word={currentWord} />;
      })}
    </section>
  );
}

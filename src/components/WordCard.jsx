import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BiBook } from "react-icons/bi";
import { BiChevronLeft } from "react-icons/bi";

/**
 * header
 * definition icon - component
 *
 * body
 * word - larger text
 * definition - normal text
 * user field - attempt
 * button1 - next
 */

export default function WordCard(props) {
  const { word } = props;
  return (
    <div className="card-container">
      <Card bg="light" border="primary" style={{ width: "18rem" }}>
        <Card.Title className="card-header">
          <BiBook size={40} color="white" />
          <BiChevronLeft size={20} color="white" />
        </Card.Title>
        <Card.Body>
          <Card.Text>
            <h1 id="spellingWord">{word}</h1> {/* Spelling word to attempt */}
            <p>This is where the definition can go!</p> {/* Definition */}
          </Card.Text>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              attempt
            </InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          <Button variant="primary">Next Word</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

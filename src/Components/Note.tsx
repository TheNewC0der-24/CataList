import { Link } from "react-router-dom";
import { useNote } from "../Layout/NoteLayout";

import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

function Note() {

    const note = useNote();

    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>{note.title}</h1>
                    {note.tags.length > 0 && (
                        <div className="mb-3">
                            {note.tags.length > 0 && (
                                <Stack direction="horizontal" gap={2} className="flex-wrap">
                                    {note.tags.map(tag => (
                                        <Badge className="text-truncate" key={tag.id} bg="teal" style={{ backgroundColor: "teal" }}>{tag.label}</Badge>
                                    ))}
                                </Stack>
                            )}
                        </div>
                    )}
                </Col>
                <Col xs="auto">
                    <Stack direction="horizontal" gap={2}>
                        <Link to={`/${note.id}/edit`}>
                            <Button style={{ backgroundColor: "teal", borderColor: "teal" }}>
                                Edit
                            </Button>
                        </Link>
                        <Button variant='outline-danger'>Delete</Button>
                        <Link to="/">
                            <Button variant='outline' style={{ borderColor: "teal", color: "teal" }}>Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </>
    )
}

export default Note;

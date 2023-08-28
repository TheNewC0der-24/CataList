import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

import { Button, Col, Row, Stack, Form } from "react-bootstrap";

import ReactSelect from "react-select";

import { Tag, Note } from "../Types/types";

import NoteCard from "../Components/NoteCard/NoteCard";

type NoteListProps = {
    availableTags: Tag[],
    notes: Note[]
}

export default function NoteList({ availableTags, notes }: NoteListProps) {

    const [title, setTitle] = useState("");
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) &&
                (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
        })
    }, [title, selectedTags, notes])

    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>Notes</h1>
                </Col>
                <Col xs="auto">
                    <Stack direction="horizontal" gap={2}>
                        <Link to="/new" >
                            <Button style={{ backgroundColor: "teal", borderColor: "teal" }}>
                                Create
                            </Button>
                        </Link>
                        <Button variant='outline' style={{ border: "1px solid teal", color: "teal" }}>Edit Tags</Button>
                    </Stack>
                </Col>
            </Row>

            <Form>
                <Row className="mb-4">
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect value={selectedTags.map(tag => {
                                return { label: tag.label, value: tag.id }
                            })}
                                options={availableTags.map(tag => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                onChange={tags => {
                                    setSelectedTags(tags.map(tag => {
                                        return { id: tag.value, label: tag.label }
                                    }));
                                }} isMulti
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>

            <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
                {
                    filteredNotes.map(note => (
                        <Col key={note.id}>
                            <NoteCard id={note.id} title={note.title} tags={note.tags} />
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}

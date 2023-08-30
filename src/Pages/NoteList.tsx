import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

import { Button, Col, Row, Stack, Form, Modal, Alert } from "react-bootstrap";

import ReactSelect from "react-select";

import { Tag, Note } from "../Types/types";

import NoteCard from "../Components/NoteCard/NoteCard";

type NoteListProps = {
    availableTags: Tag[],
    notes: Note[],
    onDeleteTag: (id: string) => void
    onEditTag: (id: string, label: string) => void
}

type EditTagsModalProps = {
    availableTags: Tag[],
    show: boolean,
    handleClose: () => void
    onDeleteTag: (id: string) => void
    onEditTag: (id: string, label: string) => void
    showAlert: string | null
    setShowAlert: (value: string | null) => void
}

export default function NoteList({ availableTags, notes, onEditTag, onDeleteTag }: NoteListProps) {

    const [title, setTitle] = useState("");
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) &&
                (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
        })
    }, [title, selectedTags, notes]);

    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState<string | null>(null);

    const handleClose = () => setShow(false);

    useEffect(() => {
        if (showAlert) {
            setTimeout(() => {
                setShowAlert(null);
            }, 3000);
        }
    }, [showAlert]);

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
                        <Button variant='outline' style={{ border: "1px solid teal", color: "teal" }} onClick={() => setShow(true)}>
                            Edit Tags
                        </Button>
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

            {
                filteredNotes.length === 0 ? (
                    <>
                        <h3>No notes found</h3>
                        <p>Try changing the search query or removing some filters</p>

                        <h1 className="mt-4">OR</h1>

                        <Link to="/new">
                            <Button className="my-3" style={{ backgroundColor: "teal", borderColor: "teal" }}>
                                Create New Note
                            </Button>
                        </Link>
                    </>
                ) : (

                    <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
                        {
                            filteredNotes.map(note => (
                                <Col key={note.id}>
                                    <NoteCard id={note.id} title={note.title} tags={note.tags} />
                                </Col>
                            ))
                        }
                    </Row>
                )
            }

            <EditTagsModal
                show={show}
                handleClose={handleClose}
                availableTags={availableTags}
                onDeleteTag={onDeleteTag}
                onEditTag={onEditTag}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
            />
        </>
    )
}

function EditTagsModal({ availableTags, show, handleClose, onDeleteTag, onEditTag, showAlert, setShowAlert }: EditTagsModalProps) {
    return (
        <Modal centered scrollable show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {
                    showAlert && (
                        <Alert variant="danger" onClose={() => setShowAlert(null)}>
                            Tag <span style={{ wordBreak: "break-word", fontWeight: "bold" }}>"{showAlert}"</span> has been deleted.
                        </Alert>
                    )
                }

                <Form>
                    <Stack gap={2}>
                        {availableTags.map(tag => (
                            <Row key={tag.id}>
                                <Col>
                                    <Form.Control type="text" value={tag.label} onChange={(e) => onEditTag(tag.id, e.target.value)} />
                                </Col>
                                <Col xs="auto">
                                    <Button variant="outline-danger" onClick={() => {
                                        onDeleteTag(tag.id);
                                        setShowAlert(tag.label);
                                    }}>
                                        &#10006;
                                    </Button>
                                </Col>
                            </Row>
                        ))}
                    </Stack>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline" style={{ border: "1px solid teal", color: "teal" }} onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
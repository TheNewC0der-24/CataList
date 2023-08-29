import { useState } from "react";
import { Link } from "react-router-dom";
import { useNote } from "../Layout/NoteLayout";

import { Badge, Button, Col, Row, Stack } from "react-bootstrap";

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import ConfirmDeleteModal from "./ConfirmDeleteModal";

type NoteProps = {
    onDelete: (id: string) => void;
}

function Note({ onDelete }: NoteProps) {

    const note = useNote();

    const [modalShow, setModalShow] = useState(false);

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
                        <Button variant='outline-danger' onClick={() => {
                            setModalShow(true);
                        }}>Delete</Button>
                        <Link to="/">
                            <Button variant='outline' style={{ borderColor: "teal", color: "teal" }}>Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown
                rehypePlugins={[rehypeRaw as any]}
                remarkPlugins={[remarkGfm]}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                {...props}
                                children={String(children).replace(/\n$/, '')}
                                style={a11yDark}
                                language={match[1]}
                                PreTag="div"
                                wrapLines={true}
                                showLineNumbers={true}
                            />
                        ) : (
                            <code {...props} className={className}>
                                {children}
                            </code>
                        )
                    }
                }}
            >
                {note.markdown}
            </ReactMarkdown>

            <ConfirmDeleteModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onDelete={onDelete}
                id={note.id}
                title={note.title}
            />
        </>
    )
}

export default Note;

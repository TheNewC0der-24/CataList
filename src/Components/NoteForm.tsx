import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Form, Stack, Row, Col, Button } from 'react-bootstrap';
import CreatableReactSelect from 'react-select/creatable';

import { NoteData, Tag } from '../Types/types';

import { v4 as uuidV4 } from 'uuid';

type NoteFormProps = {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
}

export default function NoteForm({ onSubmit, onAddTag, availableTags }: NoteFormProps) {

    const navigate = useNavigate();

    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags
        })

        navigate("..");
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref={titleRef} required />
                        </Form.Group>
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect
                                value={selectedTags.map(tag => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                onCreateOption={label => {
                                    const newTag = { id: uuidV4(), label };
                                    onAddTag(newTag);
                                    setSelectedTags(prevTags => [...prevTags, newTag]);
                                }}
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
                <Form.Group className="mb-3" controlId="markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control ref={markdownRef} as="textarea" rows={15} required />
                </Form.Group>

                <Stack gap={2} direction="horizontal" className="justify-content-end">
                    <Button type="submit" style={{ backgroundColor: "teal", border: "1px solid teal", }}>Save</Button>
                    <Link to="..">
                        <Button variant='outline' style={{ border: "1px solid teal", color: "teal" }}>Cancel</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    )
}

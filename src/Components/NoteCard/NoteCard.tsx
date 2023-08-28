import { Link } from "react-router-dom";
import styles from "./NoteCard.module.css";

import { Badge, Card, Stack } from "react-bootstrap";

import { Tag } from "../../Types/types";

type SimplifiedNote = {
    id: string,
    title: string,
    tags: Tag[]
}

export default function NoteCard({ id, title, tags }: SimplifiedNote) {

    return (
        <Card as={Link} to={`/${id}`} className={`border-0 h-100 text-reset text-decoration-none ${styles.card}`}>
            <Card.Body>
                <Stack gap={2} className="align-items-center justify-content-center h-100">
                    <Card.Title className="text-center">{title}</Card.Title>
                    {tags.length > 0 && (
                        <Stack direction="horizontal" gap={2} className="justify-content-center flex-wrap">
                            {tags.map(tag => (
                                <Badge className="text-truncate" key={tag.id} bg="teal" style={{ backgroundColor: "teal" }}>{tag.label}</Badge>
                            ))}
                        </Stack>
                    )}
                </Stack>


            </Card.Body>
        </Card>
    )
}

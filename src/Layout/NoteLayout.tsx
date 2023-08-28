import { Link, Outlet, useOutletContext, useParams } from "react-router-dom";

import { Note } from "../Types/types";
import { Button } from "react-bootstrap";

type NoteLayoutProps = {
    notes: Note[]
}

export default function NoteLayout({ notes }: NoteLayoutProps) {

    const { id } = useParams();

    const note = notes.find(note => note.id === id)

    if (!note) return (
        <div className="text-center my-5">
            <div className="mb-3">
                <h1>No Note not found with ID <span className="mark p-2">{id}</span></h1>
            </div>

            <Link to="/">
                <Button style={{ backgroundColor: "teal", borderColor: "teal" }}>Go Back</Button>
            </Link>
        </div>
    )

    return <Outlet context={note} />
}

export function useNote() {
    return useOutletContext<Note>()
}
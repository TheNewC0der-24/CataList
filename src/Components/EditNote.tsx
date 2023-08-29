import { useNote } from "../Layout/NoteLayout";

import { NoteData, Tag } from "../Types/types";

import NoteForm from "./NoteForm";

type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export default function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {

    const note = useNote();

    return (
        <div>
            <h1 className="mb-4">Edit Note</h1>
            <NoteForm
                title={note.title}
                markdown={note.markdown}
                tags={note.tags}
                onSubmit={data => onSubmit(note.id, data)}
                onAddTag={onAddTag}
                availableTags={availableTags}
            />
        </div>
    )
}
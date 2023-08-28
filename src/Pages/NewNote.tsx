import { NoteData, Tag } from "../Types/types";

import NoteForm from "../Components/NoteForm";

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export default function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {

    return (
        <div>
            <h1 className="mb-4">New Note</h1>
            <NoteForm
                onSubmit={onSubmit}
                onAddTag={onAddTag}
                availableTags={availableTags}
            />
        </div>
    )
}
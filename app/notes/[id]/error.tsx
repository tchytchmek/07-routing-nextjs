'use client';

interface NotesErrorDetailsProps {
  error: Error;
}

export default function NotesDetailsError({error} : NotesErrorDetailsProps){
    return <p>Could not fetch note details. {error.message}</p>

}
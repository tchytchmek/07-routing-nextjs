import axios from 'axios';
const url = 'https://notehub-public.goit.study/api/notes';
const authToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
import type { Note , CreateNoteType} from '../types/note';

interface NotesQuery{
 notes: Note[],
 totalPages: number,
}
export async function fetchNotes(page : number , text: string, tag?: string) : Promise<NotesQuery>{
    const { data } = await axios.get<NotesQuery>(url, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        params: {
            page: page,
            perPage: 12,
            search: text,
            tag: tag === 'all' ? undefined : tag,
        }
    })
    return data;
}

export async function createNote({content, title, tag} : CreateNoteType) : Promise<Note> {
    const { data } = await axios.post<Note>(url, 
        { content, title, tag },
        {    
        headers: {
            Authorization: `Bearer ${authToken}`,
        },

    })
    return data;
}

export async function deleteNote(id: string) : Promise<Note>{
    const { data } = await axios.delete<Note>(`${url}/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    })
    return data;
}

export async function fetchNotesById(id: string): Promise<Note> {
  const { data } = await axios.get<Note>(`${url}/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return data;
}
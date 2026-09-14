"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNotesById } from "@/lib/api";
import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";

export default function NotePreviewClient() {
  const data = useParams();
  const router = useRouter();
  const id = data.id as string;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNotesById(id),
    refetchOnMount: false,
  });
  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }
  if (isError || !note) {
    return <p>Something went wrong.</p>;
  }
  const handleClose = () => {
    router.back();
  };
  return (
    note && (
      <Modal onClose={handleClose}>
        <main className={css.main}>
          <div className={css.container}>
            <div className={css.item}>
              <div className={css.header}>
                <h2>{note.title}</h2>
              </div>
              <p className={css.tag}>{note.tag}</p>
              <p className={css.content}>{note.content}</p>
              <p className={css.date}>{note.createdAt}</p>
            </div>
          </div>
        </main>
      </Modal>
    )
  );
}

// return ( note &&
//     <main className={css.main}>
// 	<div className={css.container}>
// 		<div className={css.item}>
// 		  <div className={css.header}>
// 		    <h2>{note.title}</h2>
// 		  </div>
// 		  <p className={css.tag}>{note.tag}</p>
// 		  <p className={css.content}>{note.content}</p>
// 		  <p className={css.date}>{note.createdAt}</p>
// 		</div>
// 	</div>
// </main>
// )
// }

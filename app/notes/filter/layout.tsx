import css from './LayoutNotes.module.css'

interface LayoutNotesProps {
   children: React.ReactNode;
    sidebar: React.ReactNode;
}

export default function LayoutNotes({ sidebar , children } : LayoutNotesProps){
  return(
    <section className={css.container}>
  <aside className={css.sidebar}>{sidebar}</aside>
  <div className={css.notesWrapper}>{children}</div>
</section>
  )
}
import css from "./SearchBox.module.css";

interface SearchBoxProps{
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  value: string,
}
export default function SearchBox({ onChange, value }: SearchBoxProps) {
  return <input onChange={onChange} value={value} className={css.input} type="text" placeholder="Search notes" />;
}

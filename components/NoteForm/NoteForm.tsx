import css from "./NoteForm.module.css";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";
import type { FormikHelpers } from "formik";
import type { NoteTag } from "../../types/note";
import { createNote } from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NoteFormProps {
  onClose: () => void;
}
interface FormValueProps {
  title: string;
  content: string;
  tag: NoteTag;
}
export default function NoteForm({ onClose }: NoteFormProps) {

  //MUTATIONS
  const queryClient = useQueryClient();

  const { mutate: postMutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notes'] });
        onClose();
    },
    onError: () => {},
  });

  // SCHEMA
  const NoteFormSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title is too long"),

    content: Yup.string().max(500, "Make your note under 500 symbols"),

    tag: Yup.string()
      .required("Tag is required")
      .oneOf(
        ["Todo", "Work", "Personal", "Meeting", "Shopping"],
        "Invalid tag",
      ),
  });

  const initialValues: FormValueProps = {
    title: "",
    content: "",
    tag: "Todo",
  };

  const handleSubmit = (
    values: FormValueProps,
    actions: FormikHelpers<FormValueProps>,
  ) => {
    postMutate({
      title: values.title,
      content: values.content,
      tag: values.tag,
    });
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={NoteFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" onClick={onClose} className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}

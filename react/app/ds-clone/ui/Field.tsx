/* Field — label + control + optional error, the form row every surface uses. */
type Props = {
  id: string;
  label: string;
  error?: string;
  children?: React.ReactNode;
};

export default function Field({ id, label, error, children }: Props) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p className="field-err" id={`${id}-err`}>
          {error}
        </p>
      )}
    </div>
  );
}

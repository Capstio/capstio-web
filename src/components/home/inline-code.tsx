// Turns "{docker ps}" in dictionary copy into inline code chips. The chip
// style differs per section, so the caller passes its classes.
export function withCode(text: string, chipClassName: string) {
  return text.split(/\{([^}]+)\}/).map((part, index) =>
    index % 2 === 1 ? (
      <code key={index} className={chipClassName}>
        {part}
      </code>
    ) : (
      part
    ),
  );
}

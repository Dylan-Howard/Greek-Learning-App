/**
 * Text Unit
 */

function TextUnit({ children }: { children: any }) {
  console.log(children);
  return (
    <span
      className={!children ? 'TextUnit HiglightOnHover' : 'TextUnit'}
    >
      {children}
    </span>
  );
}

export default TextUnit;

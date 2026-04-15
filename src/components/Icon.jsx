export default function Icon({ name, size = 20, fill = 0, style = {} }) {
  return (
    <span
      className="material-symbols-outlined"
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${fill},'wght' 400,'GRAD' 0,'opsz' ${size}`,
        lineHeight: 1,
        ...style,
      }}
    >
      {name}
    </span>
  );
}
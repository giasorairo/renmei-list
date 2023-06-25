export const onPressEnter = (
  event: React.KeyboardEvent<HTMLDivElement>,
  fn?: () => void
) => {
  if (event.key === "Enter") {
    fn?.();
  }
};

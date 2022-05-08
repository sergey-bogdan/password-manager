const copy = (value: string): Promise<void> => {
  return navigator.clipboard.writeText(value);
}

export default copy;
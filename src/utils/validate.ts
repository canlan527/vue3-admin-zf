export const isHttpLink = (path: string): boolean => {
  return /https?/.test(path)
}

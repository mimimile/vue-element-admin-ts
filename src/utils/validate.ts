export function isvalidUsername(str: string) {
  const validMap: string[] = ['admin', 'editor']
  return validMap.indexOf(str.trim()) >= 0
}

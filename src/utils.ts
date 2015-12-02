export function isNullOrEmpty(s: string): boolean {
	return s == null || s == "";
}
export function startsWith(s: string, startsWith: string) {
	return s != null && s.indexOf(startsWith) == 0
}

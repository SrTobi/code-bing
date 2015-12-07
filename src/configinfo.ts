// Config keys.
export const keys = {
	useDefaultProviderOnly: "useDefaultProviderOnly",
	defaultProvider: "defaultProvider",
	noInputBoxIfTextSelected: "noInputBoxIfTextSelected",
	alwaysUseDefaultForSelection: "alwaysUseDefaultForSelection",
	searchProviders: "searchProviders"
};
// Depricated config keys.
export const depricatedKeys = {
	searchprovider: "searchprovider"
};
// The config group for the extension.
export const group = "codebing";

// Creates a command string
export function newCommandString(cmdName: string) {
	return group + "." + cmdName;
}

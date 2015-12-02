# CodeBing

[![Join the chat at https://gitter.im/SrTobi/code-bing](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/SrTobi/code-bing?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A Visual Studio Code Extension to search the selected text with your favorite search engine.

## How it works

Press `ctrl+alt+f` or use the `Bing` command to search the selected text.
You can also enter the text, that you want to search.

![Preview](/images/preview.gif?raw=true)

Specify the search engine you want to use with fully customizable shortcuts in the search box.

## Set your favorite search engine

You can change the search engine in your settings by setting the `codebing.defaultProvider` option to one of your search engine shortcuts or to a new query string.

```
	"codebing.defaultProvider": "b"
```


## Install CodeBing

Use VS Code's extension installer by pressing __F1__ and searching for `Extensions: Install Extensions`.
In the next input box enter `code-bing` and wait for the installer to find CodeBing. Hit Enter to install.

![Installation](/images/install.png)

## Other setting

You can define the list of search providers and their shortcuts in the `codebing.searchProviders` option.
__Note__ that setting this option will remove all default search providers.

```
 "codebing.searchProviders": {
	"b": "https://www.bing.com/search?q={query}",
	"g": "https://www.google.com/search?q={query}",
	"yh": "https://search.yahoo.com/search?p={query}",
	"ddg": "https://duckduckgo.com/?q={query}",
	"wiki": "https://en.wikipedia.org/wiki/{query}",
	"yt": "https://www.youtube.com/results?search_query={query}",
	"twit": "https://twitter.com/search?q={query}",
	"gh": "https://github.com/search?utf8=✓&q={query}"
}
```

If you do not want to use shortcuts, set `codebing.useDefaultProviderOnly` to `true`:

```
"codebing.useDefaultProviderOnly": true
```

Set `codebing.noInputBoxIfTextSelected` to `true` to skip the inputbox if you have selected text:

```
"codebing.noInputBoxIfTextSelected": true
```

## Contributing

Feel free to contribute to this extension. Please read the [CONTRIBUTING.md](/CONTRIBUTING.md). The following people contributed to this extension:

- [SrTobi](https://github.com/SrTobi)
- [jacobhands](https://github.com/jacobhands)

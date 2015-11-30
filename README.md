# code-bing

[![Join the chat at https://gitter.im/SrTobi/code-bing](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/SrTobi/code-bing?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
A Visual Studio Code Extension to search the selected text with your favorite search engine.

## How it works

Press `ctrl+alt+f` or use the `Bing` command to search the selected text.
You can also enter the text, that you want to search.

![Preview](/images/preview.gif?raw=true)

## Set your favorite search engine

You can change the search engine in your settings by setting the `codebing.searchprovider` option to a query string.
The query string is opened in your browser and `{query}` is replaced by the users input.

```
Google:         https://www.google.com/search?q={query}
Bing (default):	https://www.bing.com/search?q={query}
Yahoo:          https://search.yahoo.com/search?p={query}
```

![Setting a search engine](/images/settings.png?raw=true)

## Contributing

Feel free to contribute to this extension. Please read the [CONTRIBUTING.md](/CONTRIBUTING.md). The following people contributed to this extension:

- [SrTobi](https://github.com/SrTobi)
- [jacobhands](https://github.com/jacobhands)
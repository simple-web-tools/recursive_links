# recursive_links

recursive links are links which open in-line, and help reduce context switching. They are recursive because if that rlink has another rlink inside of it, it allows you to continue opening rlinks until you get to an rlink that contains no rlinks.

As previously mentioned, rlinks were created because when you click on a link on a website the default behavior is that you will move to the new page or id tagged element. When this occurs a context switch occurs where the content you were currently looking at disappears, meaning that you have to go back to see it, which in turn hides the other content.

## usage

Simply download scripts.js and then in whatever file you want recursive links to work place the following right before the closing body tag:
```js
    <script src="/path_to_where_you_put_it/scripts.js"></script>
```

In my use case I usually have an html directory with the following structure
```
html
├── js
│   └── recursive_links
│       ├── README.md
│       └── scripts.js
```
and I include it like this

```js
    <script src="/js/recursive_links/scripts.js"></script>
```

## creating recursive links

To create recursive all you have to do is create a link of this form
```js
<a class="rlink" href="/path/to/html_file.html#id-of-element-on-that-page">text for link</a>
```

This creates a recursive link, so long as the `scripts.js` file has been included in the script tag as mentioned above.


## getting updates

This script is pretty stable and probably won't change all that much, but if you downloaded the file, you can come back here occasionally and check for updates.

If you prefer making sure you have the newest version of this script then you can add this project as a submodule, and occasionally git pull it.

xo.ads.gpt with Webpack
===============

[![Code Climate](https://codeclimate.com/repos/540e0ac4e30ba05393002723/badges/9d6c3ab2c0cd53f21878/gpa.svg)](https://codeclimate.com/repos/540e0ac4e30ba05393002723/feed)

[![Test Coverage](https://codeclimate.com/repos/540e0ac4e30ba05393002723/badges/9d6c3ab2c0cd53f21878/coverage.svg)](https://codeclimate.com/repos/540e0ac4e30ba05393002723/feed)


## Requirement
- [The Knot Layout Gem](http://git.xogrp.com/design/the_knot_layout)

Thanks to Enrico Teotti for getting the GPT Ad library integrated in the Knot Layout Gem and the [Pattern Library](http://patterns.xogrp.com) Team for their work on [Ad containers](http://patterns.xogrp.com/ad_containers.html).




## Asynchronous Ad calls

```html
<script>
XO.ads.gpt.addAsyncSlot({
	idSelector: "ad",
	sizes: [300,250],
	targeting: [  
	["pos",1]
	]
});
</script>
```

## Synchronous Ad calls

```html
<script>
XO.ads.gpt.addAsyncSlot({
  idSelector: "ad",
  sync: true,
  sizes: [300,250],
  targeting: [  
  ["pos",1]
  ]
});
</script>
```

## Ad slot refresh and targeting refresh
- This method performs an in-page ad refresh.  The 1st required parameter expects a number from 1 .. n where n is the nth ad call.  The 2nd required parameter expects an array of key/value pairs where the 1st array value is a key and the 2nd array value is either an integer or string.

```
<script>
XO.ads.gpt.refreshAdSlot(1,["pos",1]);
</script>
```


## Interchangeable ad calls
- One ad call will show either a fixed size ad or Native Ad


### New Interchangeable Ad Call
- This ad call will return a fixed 300x250 ad or a native ad.  The [1,1] represents the Native ad card

```
<script>
XO.ads.gpt.addAsyncSlot({
	idSelector: "ad",
	sizes: [ [300,250], [1,1] ],	//[1,1] represents the Native ad card	
	targeting: [  
	["pos",1],
	]
});
</script>
```


### Full Leaderboard Ad Call (For Pattern Library)
- This ad call will return 728x90, 970x90, 970x66, 970x67 (pushdown), 970x68 (super pushdown), 970x91 (super pushdown) ads

```
<script>
XO.ads.gpt.addAsyncSlot({
    idSelector: "ad",
    sizes: [ [728,90], [970,90], [970,91], [970,66], [970,67], [970,68] ],   
    targeting: [  
	    ["pos", "728top"],
    ]
});
</script>
```


| Default Targeting in every ad call | values        |dependencies
| -----------------------------------| --------      |---------------
| device-type                        | mobile,desktop| Breakpoint width
| page                               | 1 .. n        | Page parameter in url
| premium                            | true,false    | Breakpoint width and scroll depth



| Ad Call Options   | Description
| ---------         | --------
| idSelector        | expects a unique id value where the ad will show.
| sizes             | expects an array of ad size objects. Each ad size object is an array of length 2. 
| targeting         | expects an array of custom key value pairs.  Each custom key value pair is an array of length 2.
| width             | expects an integer value
| height            | expects an integer value
| postRenderCallback| expects a function that will execute after the ad has rendered in the ad slot.  Can be used for rendering ads outside of an iframe (aka iframe buster)


| Ad Size        | Ad (IAB Creative Name)
| ---------      | --------
| 1x1            | Reserved for Run of Site Native Ads (Not an IAB Standard)
| 1x2            | Reserved for Native Ads (Not an IAB Standard)
| 1x7            | Reserved for Travel Hotspot / Destination Weddings (Not an IAB Standard)
| 160x600        | Skyscraper
| 300x250        | Super square / Big Box
| 300x600        | Skyscraper
| 300x601        | Sidekicks
| 728x90         | Leaderboard
| 970x66         | Super Leaderboard
| 970x67         | Super Leaderboard Pushdown
| 970x68         | Super Leaderboard Pushdown
| 970x90         | Super Leaderboard 
| 970x91         | Super Leaderboard Pushdown
| 970x91         | Super Leaderboard Pushdown


## Google Publisher Console
You can use an on-screen debugging tool called the Google Publisher Console to troubleshoot delivery problems. The console checks your page for many common JavaScript tagging errors, identifies all of the ad units and creatives on the page, and helps you visualize the ad request behavior of a web page.

To enable the Publisher Console on a page tagged with the Google Publisher Tag:

Append ?google_force_console or ?googfc to your page's URL.

For example, if your page is located at www.google.com/gpt, you’d modify the URL to www.google.com/gpt?google_force_console or www.google.com/gpt?googfc.

## Triplelift Preview Tool
[static.theknot.com/national/ad-test-tool/index.html](static.theknot.com/national/ad-test-tool/index.html)

## Building

* make your changes
* bump the version in xo.ads.gpt.js and package.json
* run `grunt` from the command line
* commit your changes
* tag the release with the appropriate version
* push the branch and the tag to github

## Deploying

* create a pull request to [tk-bootstrap](https://git.xogrp.com/design/tk-bootstrap) updating it to the current version in its `bower.json` file.
* ask someone on patterns to merge and deploy said pull request

## Contributions

* Enrico Teotti @eteotti
* Jack Tarantino @jtarantino
* Marco Carag @mcarag
* Judy Liu @liuj
* Spencer Tang @stang
* Sze Chan @schan

## TODO

* Add tests
* Add inline documentation

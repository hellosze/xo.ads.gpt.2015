##CHANGELOG 



###v1.7.1
Add sync option for Async ad calls to render ads synchronously.  This allows a 1x1 HTML creative to render as a full sized HTML creative.  The final ad rendering is a div element and not an iframe.

###v1.7
Add support for multiple sizes in Ad call, update Docs

###v1.6
Add support for taxonomy metadata targeting 
###(Sept 10, 2014)
- Add AddAsyncSlot() method for Asynchronous rendering
- Add sourceMap support

###(Aug 15 2014)
- Deprecated idSelector in ad call
- Replaced jQuery DOM manipluation with native DOM manipulation 
- Cached metadata values for quicker lookup
- Turned off Empty div collapsing
- GPT automatically sets page-type (results, details,..) targeting based on metadata values, this does not require level to be passed in ad call
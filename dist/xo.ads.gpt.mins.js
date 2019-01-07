/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./xo.ads.gpt.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./xo.ads.gpt.js":
/*!***********************!*\
  !*** ./xo.ads.gpt.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* eslint-env node, browser, mocha, document */\n/* eslint-env browser */\n/* global document */\n/* jslint browser: true */\n/* jslint node: true */\n\nvar XO = XO || {};\nvar googletag = googletag || {};\n\nXO.ads = XO.ads || {};\ngoogletag.cmd = googletag.cmd || [];\nXO.ads.version = '1.10.8';\nXO.ads.gpt = (function(){\n  \n  return {\n    page_metadata: {},\n    hide_ads: false,\n    adSlots: ['null'],\n    setAdBackgrounds: function(){\n      //will be deprecated in version 2.0\n    googletag.pubads().addEventListener('slotRenderEnded', function(event) {\n      var adSlot = document.getElementById(event.slot.b.d);      \n      if( (adSlot.clientHeight !== 270) &&  (adSlot.clientHeight !== 110)){\n        adSlot.parentNode.className = adSlot.parentNode.className.replace(/ad-container /g,'');\n      }\n      });\n\n    },\n    setDeviceTypeMetadata:function(){\n        if(window.innerWidth > 768) { this.page_metadata['device-type'] = 'desktop'; }\n        else { this.page_metadata['device-type'] = 'mobile'; }\n    },\n    setPageNumberMetadata:function(){\n        var pageRegExp = new RegExp(/page=(\\d{1,5})/);\n        var pageValues = document.location.search.match(pageRegExp);\n        if(pageValues !== null){\n          this.page_metadata.page = pageValues[1];\n        }\n        else {\n          this.page_metadata.page = 1;          \n        }\n    },\n    setSIDMetadata:function(){\n        if(XO.metadata.application.name === 'content')\n        {\n          this.page_metadata.sid = XO.metadata.entities[XO.metadata.entities.primary_entity_id].url.split('/').slice(-1);\n        } \n    },\n    retrieveMetadata: function(){\n      try {\n        var gpt_key;\n\n        this.setDeviceTypeMetadata();\n        this.setPageNumberMetadata();\n\n        var audienceSegmentRegExp = new RegExp(/(wedding-categories|wedding-activities|ceremony-types)/);\n\n        this.page_metadata['page-type'] = XO.metadata.page_data.kind;\n        \n        if(XO.metadata.page_data.kind === 'results'){\n          for(var key in XO.metadata.page_data.results_terms.terms){\n            if(XO.metadata.page_data.results_terms.terms.hasOwnProperty(key)){\n            this.page_metadata[key] = XO.metadata.page_data.results_terms.terms[key];\n            if(key.match(audienceSegmentRegExp) !== null){\n              gpt_key = key.replace(/-/g,'_');\n              this.page_metadata[gpt_key] = XO.metadata.page_data.results_terms.terms[key];\n            }\n          }\n          }\n        }\n        if(XO.metadata.page_data.kind === 'detail' || ( (XO.metadata.application.name === 'fashion') && (XO.metadata.page_data.kind) )){\n          for(var metadata_key in XO.metadata.entities[XO.metadata.entities.primary_entity_id].terms){\n            if(XO.metadata.entities[XO.metadata.entities.primary_entity_id].terms.hasOwnProperty(metadata_key)){\n            this.page_metadata[metadata_key] = XO.metadata.entities[XO.metadata.entities.primary_entity_id].terms[metadata_key];\n            if(metadata_key.match(audienceSegmentRegExp) !== null){\n              gpt_key = metadata_key.replace(/-/g,'_'); \n              this.page_metadata[gpt_key] = XO.metadata.entities[XO.metadata.entities.primary_entity_id].terms[metadata_key];\n            }\n            if(metadata_key === 'category_name'){\n              this.page_metadata['wedding-categories'] = XO.metadata.entities[XO.metadata.entities.primary_entity_id].terms[metadata_key]; \n              this.page_metadata.wedding_categories = XO.metadata.entities[XO.metadata.entities.primary_entity_id].terms[metadata_key]; \n            }\n          }\n        }\n        }\n        if(XO.metadata.application.name === 'fashion')\n        {\n          delete this.page_metadata.description;\n          delete this.page_metadata.fullPath;\n          delete this.page_metadata.path;\n          delete this.page_metadata.id;\n        }        \n        this.setSIDMetadata();\n       \n      }\n      catch(e)\n      {\n        if((e.message === 'Cannot read property \"application\" of undefined')&&(document.location.search === '?gpt_console')){\n          console.log('XO.metadata is undefined');\n        }       \n        if((e.message === 'Cannot read property \"kind\" of undefined') && (document.location.search === '?gpt_console')){\n          console.log('XO.metadata.page_data is undefined');\n        }        \n        if((e.message === 'Cannot read property \"primary_entity_id\" of undefined') && (document.location.search === '?gpt_console')){\n          console.log('XO.metadata.entities is undefined');\n        }\n        if((e.message === 'Cannot read property \"terms\" of undefined') && (document.location.search === '?gpt_console')){\n          console.log('XO.metadata.entities.primary_entity_id is undefined');          \n        }\n      }\n\n    },\n\n    initialize: function(){\n\n     var useSSL = 'https:' == document.location.protocol;\n     var src = (useSSL ? 'https:' : 'http:') +'//www.googletagservices.com/tag/js/gpt.js';\n     /* jshint ignore:start */\n     document.write('<scr' + 'ipt src=\"' + src + '\"></scr' + 'ipt>');\n     /* jshint ignore:end */\n     this.retrieveMetadata();\n\n\n    },\n\n    addSlot:function(adObject){\n      if(this.hide_ads === false){\n      var adCategory = XO.metadata.application.name;\n      var width = adObject.width;\n      var height = adObject.height;\n\n      var scriptTags = document.getElementsByTagName('script');\n      var idSelector = adObject.idSelector || scriptTags[scriptTags.length - 1].parentNode.id;\n\n      var page_metadata = this.page_metadata;\n      googletag.cmd.push(function() {\n\n      var adSlot = googletag.defineSlot('/4879/'+adCategory+'.n_TK',[width,height],idSelector);\n      adSlot.setTargeting('adsize',[width+'x'+height,'native']);  \n        var targeting = adObject.targeting;\n        if(targeting !== 'undefined'){\n          for(var i = 0, len = targeting.length; i < len; i++){\n            var target = targeting[i];\n            adSlot.setTargeting(target[0],target[1]);                \n          }\n        }\n        if ( typeof this.page_metadata !== 'undefined'){\n            for(var key in page_metadata){\n              var gpt_key = key.replace(/-/g,'_');\n              adSlot.setTargeting(gpt_key,page_metadata[key]);\n            }\n        }\n\n\n      googletag.pubads().enableSyncRendering();\n      adSlot.addService(googletag.pubads());\n      googletag.enableServices();\n      googletag.display(idSelector);\n    });//end googletag.cmd.push();\n  \n    }\n\n  },\n  refreshAdSlot:function(slotIndex,targetingArray){\n    \n    if(targetingArray !== 'undefined'){\n      XO.ads.gpt.adSlots[slotIndex].setTargeting(targetingArray[0],targetingArray[1]);\n      googletag.pubads().refresh([XO.ads.gpt.adSlots[slotIndex]]);\n    } else {\n      googletag.pubads().refresh([XO.ads.gpt.adSlots[slotIndex]]);      \n    }\n\n  },\n addAsyncSlot:function(adObject){\n  if(this.hide_ads === false){\n    try{\n      var adCategory = XO.metadata.application.name;\n      var adSizes = adObject.sizes || [adObject.width,adObject.height];\n      var scriptTags = document.getElementsByTagName('script');\n      var idSelector = adObject.idSelector || scriptTags[scriptTags.length - 1].parentNode.id;\n\n      var page_metadata = this.page_metadata;\n\n      var adSlots = this.adSlots;\n      googletag.cmd.push(function() {\n\n      var adSlot = googletag.defineSlot('/4879/'+adCategory+'.n_TK',adSizes,idSelector);\n        var targeting = adObject.targeting;\n        var adTopPosition = document.getElementById(idSelector).getBoundingClientRect().top + 1;\n        \n        if( (adTopPosition < 950 && window.innerWidth > 768) || (adTopPosition < 1800 && window.innerWidth < 768) ){\n          adSlot.setTargeting('premium','true');\n        }\n\n        if( (adTopPosition > 950 && window.innerWidth > 768) || (adTopPosition > 1800 && window.innerWidth < 768) ){\n          adSlot.setTargeting('premium','false');\n        }\n        for(var i = 0, len = targeting.length; i < len; i++){\n          var target = targeting[i];\n          adSlot.setTargeting(target[0],target[1]);                \n        }\n        for(var key in page_metadata){\n          adSlot.setTargeting(key,page_metadata[key]);\n        }\n\n      adSlots.push(adSlot);\n\n      adSlot.addService(googletag.pubads());\n      if(adObject.sync === true){\n        googletag.pubads().enableSyncRendering();\n      }\n      googletag.enableServices();\n      googletag.display(idSelector);\n\n      if (adObject.postRenderCallback && typeof adObject.postRenderCallback === 'function') {\n        googletag.pubads().addEventListener('slotRenderEnded', function(event) {\n          if (!event.isEmpty && event.slot === adSlot) {\n            return adObject.postRenderCallback(idSelector, true);\n          } else {\n            return adObject.postRenderCallback(idSelector, false);\n          }\n        });\n      }      \n\n      /* for virtual DFP Impression scoped to Fashion and Real Weddings */\n      /* jshint ignore:start */\n      if(XO.metadata.application.name === 'real-weddings' || XO.metadata.application.name === 'fashion'){\n      var analytics_source;\n\n\n      if(XO.metadata.page_data.kind){\n        analytics_source = 'detail page';\n      }\n      \n      if(document.querySelectorAll('[data-filter-count]').length === 1){\n        analytics_source = 'filtered results page';\n      }\n\n      if(document.querySelectorAll('[data-filter-count]').length === 0){\n        analytics_source = 'unfiltered results page';\n      }\n\n\n      analytics.track('DFP Impression', {\n        product: XO.metadata.application.name,\n        platform: 'web',\n        url: document.location.href,\n        source: analytics_source\n      });   \n    }\n     /* jshint ignore:end */\n\n    });//end googletag.cmd.push();\n  }\n    catch(e)\n    {   \n      if(document.location.search === '?gpt_console'){\n      console.log(e.message); \n          }\n        }\n      }\n    }\n  };\n\n\n})();\nXO.ads.gpt.initialize();\n\n\n//# sourceURL=webpack:///./xo.ads.gpt.js?");

/***/ })

/******/ });
/* eslint-env node, browser, mocha, document */
/* eslint-env browser */
/* global document */
/* jslint browser: true */
/* jslint node: true */

var XO = XO || {};
var googletag = googletag || {};

XO.ads = XO.ads || {};
googletag.cmd = googletag.cmd || [];
XO.ads.version = '1.10.8';
XO.ads.gpt = (function(){
  
  return {
    page_metadata: {},
    hide_ads: false,
    adSlots: ['null'],
    setAdBackgrounds: function(){
      //will be deprecated in version 2.0
    googletag.pubads().addEventListener('slotRenderEnded', function(event) {
      var adSlot = document.getElementById(event.slot.b.d);      
      if( (adSlot.clientHeight !== 270) &&  (adSlot.clientHeight !== 110)){
        adSlot.parentNode.className = adSlot.parentNode.className.replace(/ad-container /g,'');
      }
      });

    },
    setDeviceTypeMetadata:function(){
        if(window.innerWidth > 768) { this.page_metadata['device-type'] = 'desktop'; }
        else { this.page_metadata['device-type'] = 'mobile'; }
    },
    setPageNumberMetadata:function(){
        var pageRegExp = new RegExp(/page=(\d{1,5})/);
        var pageValues = document.location.search.match(pageRegExp);
        if(pageValues !== null){
          this.page_metadata.page = pageValues[1];
        }
        else {
          this.page_metadata.page = 1;          
        }
    },
    setSIDMetadata:function(){
        if(XO.metadata.application.name === 'content')
        {
          this.page_metadata.sid = XO.metadata.entities[XO.metadata.entities.primary_entity_id].url.split('/').slice(-1);
        } 
    },
    retrieveMetadata: function(){
      try {
        var gpt_key;

        this.setDeviceTypeMetadata();
        this.setPageNumberMetadata();

        var audienceSegmentRegExp = new RegExp(/(wedding-categories|wedding-activities|ceremony-types)/);

        this.page_metadata['page-type'] = XO.metadata.page_data.kind;
        
        if(XO.metadata.page_data.kind === 'results'){
          for(var key in XO.metadata.page_data.results_terms.terms){
            if(XO.metadata.page_data.results_terms.terms.hasOwnProperty(key)){
            this.page_metadata[key] = XO.metadata.page_data.results_terms.terms[key];
            if(key.match(audienceSegmentRegExp) !== null){
              gpt_key = key.replace(/-/g,'_');
              this.page_metadata[gpt_key] = XO.metadata.page_data.results_terms.terms[key];
            }
          }
          }
        }
        if(XO.metadata.page_data.kind === 'detail' || ( (XO.metadata.application.name === 'fashion') && (XO.metadata.page_data.kind) )){
          for(var metadata_key in XO.metadata.entities[XO.metadata.entities.primary_entity_id].terms){
            if(XO.metadata.entities[XO.metadata.entities.primary_entity_id].terms.hasOwnProperty(metadata_key)){
            this.page_metadata[metadata_key] = XO.metadata.entities[XO.metadata.entities.primary_entity_id].terms[metadata_key];
            if(metadata_key.match(audienceSegmentRegExp) !== null){
              gpt_key = metadata_key.replace(/-/g,'_'); 
              this.page_metadata[gpt_key] = XO.metadata.entities[XO.metadata.entities.primary_entity_id].terms[metadata_key];
            }
            if(metadata_key === 'category_name'){
              this.page_metadata['wedding-categories'] = XO.metadata.entities[XO.metadata.entities.primary_entity_id].terms[metadata_key]; 
              this.page_metadata.wedding_categories = XO.metadata.entities[XO.metadata.entities.primary_entity_id].terms[metadata_key]; 
            }
          }
        }
        }
        if(XO.metadata.application.name === 'fashion')
        {
          delete this.page_metadata.description;
          delete this.page_metadata.fullPath;
          delete this.page_metadata.path;
          delete this.page_metadata.id;
        }        
        this.setSIDMetadata();
       
      }
      catch(e)
      {
        if((e.message === 'Cannot read property "application" of undefined')&&(document.location.search === '?gpt_console')){
          console.log('XO.metadata is undefined');
        }       
        if((e.message === 'Cannot read property "kind" of undefined') && (document.location.search === '?gpt_console')){
          console.log('XO.metadata.page_data is undefined');
        }        
        if((e.message === 'Cannot read property "primary_entity_id" of undefined') && (document.location.search === '?gpt_console')){
          console.log('XO.metadata.entities is undefined');
        }
        if((e.message === 'Cannot read property "terms" of undefined') && (document.location.search === '?gpt_console')){
          console.log('XO.metadata.entities.primary_entity_id is undefined');          
        }
      }

    },

    initialize: function(){

     var useSSL = 'https:' == document.location.protocol;
     var src = (useSSL ? 'https:' : 'http:') +'//www.googletagservices.com/tag/js/gpt.js';
     /* jshint ignore:start */
     document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
     /* jshint ignore:end */
     this.retrieveMetadata();


    },

    addSlot:function(adObject){
      if(this.hide_ads === false){
      var adCategory = XO.metadata.application.name;
      var width = adObject.width;
      var height = adObject.height;

      var scriptTags = document.getElementsByTagName('script');
      var idSelector = adObject.idSelector || scriptTags[scriptTags.length - 1].parentNode.id;

      var page_metadata = this.page_metadata;
      googletag.cmd.push(function() {

      var adSlot = googletag.defineSlot('/4879/'+adCategory+'.n_TK',[width,height],idSelector);
      adSlot.setTargeting('adsize',[width+'x'+height,'native']);  
        var targeting = adObject.targeting;
        if(targeting !== 'undefined'){
          for(var i = 0, len = targeting.length; i < len; i++){
            var target = targeting[i];
            adSlot.setTargeting(target[0],target[1]);                
          }
        }
        if ( typeof this.page_metadata !== 'undefined'){
            for(var key in page_metadata){
              var gpt_key = key.replace(/-/g,'_');
              adSlot.setTargeting(gpt_key,page_metadata[key]);
            }
        }


      googletag.pubads().enableSyncRendering();
      adSlot.addService(googletag.pubads());
      googletag.enableServices();
      googletag.display(idSelector);
    });//end googletag.cmd.push();
  
    }

  },
  refreshAdSlot:function(slotIndex,targetingArray){
    
    if(targetingArray !== 'undefined'){
      XO.ads.gpt.adSlots[slotIndex].setTargeting(targetingArray[0],targetingArray[1]);
      googletag.pubads().refresh([XO.ads.gpt.adSlots[slotIndex]]);
    } else {
      googletag.pubads().refresh([XO.ads.gpt.adSlots[slotIndex]]);      
    }

  },
 addAsyncSlot:function(adObject){
  if(this.hide_ads === false){
    try{
      var adCategory = XO.metadata.application.name;
      var adSizes = adObject.sizes || [adObject.width,adObject.height];
      var scriptTags = document.getElementsByTagName('script');
      var idSelector = adObject.idSelector || scriptTags[scriptTags.length - 1].parentNode.id;

      var page_metadata = this.page_metadata;

      var adSlots = this.adSlots;
      googletag.cmd.push(function() {

      var adSlot = googletag.defineSlot('/4879/'+adCategory+'.n_TK',adSizes,idSelector);
        var targeting = adObject.targeting;
        var adTopPosition = document.getElementById(idSelector).getBoundingClientRect().top + 1;
        
        if( (adTopPosition < 950 && window.innerWidth > 768) || (adTopPosition < 1800 && window.innerWidth < 768) ){
          adSlot.setTargeting('premium','true');
        }

        if( (adTopPosition > 950 && window.innerWidth > 768) || (adTopPosition > 1800 && window.innerWidth < 768) ){
          adSlot.setTargeting('premium','false');
        }
        for(var i = 0, len = targeting.length; i < len; i++){
          var target = targeting[i];
          adSlot.setTargeting(target[0],target[1]);                
        }
        for(var key in page_metadata){
          adSlot.setTargeting(key,page_metadata[key]);
        }

      adSlots.push(adSlot);

      adSlot.addService(googletag.pubads());
      if(adObject.sync === true){
        googletag.pubads().enableSyncRendering();
      }
      googletag.enableServices();
      googletag.display(idSelector);

      if (adObject.postRenderCallback && typeof adObject.postRenderCallback === 'function') {
        googletag.pubads().addEventListener('slotRenderEnded', function(event) {
          if (!event.isEmpty && event.slot === adSlot) {
            return adObject.postRenderCallback(idSelector, true);
          } else {
            return adObject.postRenderCallback(idSelector, false);
          }
        });
      }      

      /* for virtual DFP Impression scoped to Fashion and Real Weddings */
      /* jshint ignore:start */
      if(XO.metadata.application.name === 'real-weddings' || XO.metadata.application.name === 'fashion'){
      var analytics_source;


      if(XO.metadata.page_data.kind){
        analytics_source = 'detail page';
      }
      
      if(document.querySelectorAll('[data-filter-count]').length === 1){
        analytics_source = 'filtered results page';
      }

      if(document.querySelectorAll('[data-filter-count]').length === 0){
        analytics_source = 'unfiltered results page';
      }


      analytics.track('DFP Impression', {
        product: XO.metadata.application.name,
        platform: 'web',
        url: document.location.href,
        source: analytics_source
      });   
    }
     /* jshint ignore:end */

    });//end googletag.cmd.push();
  }
    catch(e)
    {   
      if(document.location.search === '?gpt_console'){
      console.log(e.message); 
          }
        }
      }
    }
  };


})();
XO.ads.gpt.initialize();

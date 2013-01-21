function interceptRequest(request) {
  if (request && request.url && request.url.indexOf('toogles=0') === -1) {
    var video_id = request.url.split('v=')[1];
    var ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    return { redirectUrl: 'http://toogl.es/#/view/' + video_id }
  }
}
chrome.webRequest.onBeforeRequest.addListener(interceptRequest, { urls: ['*://*.youtube.com/watch*'] }, ['blocking']);

function interceptRequest(request) {
  if (request && request.url && request.url.indexOf('toogles=0') === -1) {
    var videoId = request.url.split('v=')[1];
    videoId = cleanString(videoId);

    if (request.url.indexOf('t=') == -1) {
      return { redirectUrl: 'http://toogl.es/#/view/' + videoId }
    }

    var startTime = request.url.split('t=')[1];
    startTime = cleanString(startTime);
    startTime = durationToSeconds(startTime);

    return { redirectUrl: 'http://toogl.es/#/view/' + videoId + '/' + startTime}
  }
}

/**
 * Remove &whatever and #whatever from strings.
 * @param string
 * @returns string
 */
function cleanString(string) {
  var ampersandPosition = string.indexOf('&');
  if (ampersandPosition != -1) {
    string = string.substring(0, ampersandPosition);
  }
  var poundPosition = string.indexOf('#');
  if (poundPosition != -1) {
    string = string.substring(0, poundPosition);
  }
  return string;
}

/**
 * Convert MmSs or Mm or Ss format to just an integer of seconds.
 * @param startTime
 * @returns int
 */
function durationToSeconds(startTime) {
  if (startTime.indexOf('m') !== -1) {
    minutes = startTime.split('m')[0];
    if (startTime.split('m')[1]) {
      seconds = startTime.split('m')[1].replace('s', '');
    } else {
      seconds = 0;
    }
    startTime = (parseInt(minutes) * 60) + parseInt(seconds);
  } else if (startTime.indexOf('s') !== -1) {
    startTime = startTime.replace('s', '');
  }
  return parseInt(startTime);
}
chrome.webRequest.onBeforeRequest.addListener(interceptRequest, { urls: ['*://*.youtube.com/watch*'] }, ['blocking']);

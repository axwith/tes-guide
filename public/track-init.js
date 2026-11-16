// 과정 보기(?track=lab|mixed)를 첫 페인트 전에 html[data-track]에 붙인다. 숨김은 globals.css가 처리한다.
try {
  var q = new URLSearchParams(location.search).get('track');
  var v = q === 'lab' || q === 'mixed' || q === 'all' ? q : null;
  if (v) {
    localStorage.setItem('track', v);
  } else {
    var s = localStorage.getItem('track');
    v = s === 'lab' || s === 'mixed' ? s : 'all';
  }
  document.documentElement.setAttribute('data-track', v);
} catch {}

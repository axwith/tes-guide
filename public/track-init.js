// 과정 보기(?track=lab|mixed)를 첫 페인트 전에 html[data-track]에 붙인다. 숨김은 globals.css가 처리한다.
// 과정 페이지(/rnd/, /biz/)는 과정이 정해져 있으므로 주소·저장값과 상관없이 그 과정으로 고정한다(저장하지 않음).
try {
  var path = location.pathname;
  var fixed = /^\/rnd(\/|$)/.test(path) ? 'lab' : /^\/biz(\/|$)/.test(path) ? 'mixed' : null;
  var q = new URLSearchParams(location.search).get('track');
  var v = q === 'lab' || q === 'mixed' || q === 'all' ? q : null;
  if (fixed) {
    v = fixed;
  } else if (v) {
    localStorage.setItem('track', v);
  } else {
    var s = localStorage.getItem('track');
    v = s === 'lab' || s === 'mixed' ? s : 'all';
  }
  document.documentElement.setAttribute('data-track', v);
} catch {}

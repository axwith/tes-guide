try {
  var t = localStorage.getItem('theme');
  var light = t === 'light' || (!t && window.matchMedia('(prefers-color-scheme: light)').matches);
  if (light) {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
} catch(e) {}

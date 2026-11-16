// 기본은 라이트 모드. 사용자가 다크를 직접 고른 경우에만 다크로 연다(시스템 설정은 따르지 않음).
try {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
} catch (_) {}

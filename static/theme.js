// runs before the first paint, so a picked theme never flashes the other one
try {
  const theme = localStorage.getItem('theme');
  if (theme) document.documentElement.dataset.theme = theme;
} catch {}

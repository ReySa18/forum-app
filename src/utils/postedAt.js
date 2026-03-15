function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;
  const diffSeconds = Math.floor(diff / 1000);
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const diffYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

  if (diffSeconds < 60) {
    return 'baru saja';
  }
  if (diffMinutes < 60) {
    return `${diffMinutes} menit yang lalu`;
  }
  if (diffHours < 24) {
    return `${diffHours} jam yang lalu`;
  }
  if (diffDays < 30) {
    return `${diffDays} hari yang lalu`;
  }
  if (diffMonths < 12) {
    return `${diffMonths} bulan yang lalu`;
  }
  return `${diffYears} tahun yang lalu`;
}

export default postedAt;

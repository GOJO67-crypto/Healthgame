window.UI = {
  showToast(message, ms = 3000) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), ms);
  },
  setCode(el, code) {
    el.textContent = `Code: ${code}`;
  }
};

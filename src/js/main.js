// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-mobile-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      const bars = toggle.querySelectorAll('span');
      if (links.classList.contains('open')) {
        bars[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        bars[1].style.opacity   = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity   = '';
        bars[2].style.transform = '';
      }
    });
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
      }
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    a.style.display = 'none';
    q.style.cursor  = 'pointer';
    q.addEventListener('click', () => {
      if (a.style.display === 'block') return;
      a.style.display = 'block';
      const icon = q.querySelector('.faq-icon');
      if (icon) icon.textContent = '−';
    });
  });

  // Eligibility checker (daftar page)
  const checker = document.getElementById('eligibility-form');
  if (checker) {
    const radios  = checker.querySelectorAll('input[type="radio"]');
    const result  = document.getElementById('eligibility-result');
    const regForm = document.getElementById('reg-form');
    radios.forEach(() => {
      checker.addEventListener('change', () => {
        const q1 = checker.querySelector('input[name="q1"]:checked');
        const q2 = checker.querySelector('input[name="q2"]:checked');
        const q3 = checker.querySelector('input[name="q3"]:checked');
        if (q1 && q2 && q3) {
          if (q1.value === 'yes' && q2.value === 'yes' && q3.value === 'yes') {
            result.innerHTML = '<div class="eligibility-pass">✅ Tahniah! Anda layak untuk mendaftar. Sila lengkapkan borang di bawah.</div>';
          } else {
            result.innerHTML = '<div class="eligibility-fail">Maaf, anda mungkin tidak memenuhi syarat asas program ini. <a href="/contact.html">Hubungi kami</a> untuk perbincangan lanjut.</div>';
          }
          result.style.display = 'block';
          if (q1.value === 'yes' && q2.value === 'yes' && q3.value === 'yes') {
            regForm.style.display = 'block';
            regForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  // Animate elements on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate').forEach(el => observer.observe(el));
});

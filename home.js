window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  const items = document.querySelectorAll(".layout-item");

  // Animate layout items with staggered delay
  items.forEach((item, index) => {
    item.style.setProperty("--i", index);
  });

  // Click effect and smooth page fade-out
  items.forEach(item => {
    item.addEventListener("click", () => {
      const layout = item.dataset.layout;

      // Disable further clicks
      items.forEach(i => (i.style.pointerEvents = "none"));

      // Add pulse animation
      item.classList.add("clicked");

      // Trigger fade-out
      document.body.classList.add("fade-out");

      // Redirect after fade
      setTimeout(() => {
        window.location.href = `layout-${layout}.html`;
      }, 1000); // match fade duration
    });
  });
});

/* Toggle */



// Typing effect that starts exactly at the first character
document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.subtitle.typing-text');
  if (!el) return;

  const text = el.getAttribute('data-text') || el.textContent.trim();
  el.textContent = ''; // clear initial content so typing starts from the first char

  // create text node and cursor element
  const textNode = document.createTextNode('');
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  el.appendChild(textNode);
  el.appendChild(cursor);

  const typingSpeed = 45; // ms per character (adjust faster/slower)
  const pauseBeforeStart = 200; // small delay before starting
  let i = 0;

  function typeNext() {
    if (i < text.length) {
      textNode.data += text.charAt(i);
      i++;
      setTimeout(typeNext, typingSpeed);
    } else {
      // finished typing — keep cursor blinking; if you want cursor removed after a pause:
      // setTimeout(()=> cursor.remove(), 1000);
    }
  }

  setTimeout(typeNext, pauseBeforeStart);
});

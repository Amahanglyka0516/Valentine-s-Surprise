async function urlToDataURL(url) {
  if (!url) return null;
  if (url.startsWith("data:")) return url;

  try {
    const res = await fetch(url + "?t=" + Date.now(), { mode: "cors" });
    const blob = await res.blob();

    return await new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = reject;
      fr.readAsDataURL(blob);
    });
  } catch {
    return url;
  }
}

async function ensureSlotImagesAreDataURLs() {
  for (let i = 1; i <= 3; i++) {
    const stored = localStorage.getItem(`photo${i}`);
    const slot = document.getElementById(`slot${i}`);
    if (slot && stored) slot.src = stored.trim();
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  await ensureSlotImagesAreDataURLs();

  const templates = document.querySelectorAll(".template-option");
  const layoutFrame = document.getElementById("layout-frame");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const photoSlots = document.querySelectorAll(".photo-slot");

  /* ================= FRAME ================= */
  templates.forEach(t => {
    t.addEventListener("click", async () => {
      templates.forEach(x => x.classList.remove("active"));
      t.classList.add("active");

      layoutFrame.style.opacity = "0.3";
      layoutFrame.src = await urlToDataURL(t.dataset.frame);
      layoutFrame.onload = () => (layoutFrame.style.opacity = "1");
    });
  });

  /* ================= FILTERS ================= */
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      photoSlots.forEach(slot => {
        slot.style.filter = filter === "none" ? "" : filter;
      });
    });
  });

  /* ================= RETAKE ================= */
  document.getElementById("retake-btn").addEventListener("click", () => {
    window.location.href = "../html/layouta.html";
  });

  /* ================= DOWNLOAD (FILTER-SAFE) ================= */
  document.getElementById("download-btn").addEventListener("click", async () => {
    const preview = document.getElementById("preview-area");
    const rect = preview.getBoundingClientRect();

    const canvas = document.createElement("canvas");
    canvas.width = preview.offsetWidth;
    canvas.height = preview.offsetHeight;
    const ctx = canvas.getContext("2d");

    // white background
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw photos WITH filters
    for (const slot of photoSlots) {
      if (!slot.src) continue;

      const img = new Image();
      img.src = slot.src;
      await img.decode();

      const r = slot.getBoundingClientRect();

      ctx.save();
      ctx.filter = slot.style.filter || "none";
      ctx.drawImage(
        img,
        r.left - rect.left,
        r.top - rect.top,
        r.width,
        r.height
      );
      ctx.restore();
    }

    // draw frame on top
    const frame = new Image();
    frame.src = await urlToDataURL(layoutFrame.src);
    await frame.decode();
    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

    // download
    const link = document.createElement("a");
    link.download = "Tolly'sPhotobooth.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});

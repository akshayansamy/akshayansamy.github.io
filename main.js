(function () {
  const figures = Array.isArray(window.FIGURES) ? window.FIGURES : [];
  const grid = document.querySelector("#figure-grid");
  const empty = document.querySelector("#figure-empty");
  const dialog = document.querySelector("#lightbox");
  const lightboxImage = document.querySelector("#lightbox-image");
  const lightboxCaption = document.querySelector("#lightbox-caption");

  if (!grid || !empty || !figures.length) return;

  empty.hidden = true;
  grid.hidden = false;

  figures.forEach(function (figure, index) {
    const title = figure.title || "Untitled figure";
    const caption = figure.caption || "";
    const year = figure.year || "";

    const card = document.createElement("button");
    card.type = "button";
    card.className = "figure-card";

    const frame = document.createElement("span");
    frame.className = "figure-frame";

    const image = document.createElement("img");
    image.src = figure.src || "";
    image.alt = caption ? title + ". " + caption : title;
    image.loading = "lazy";
    image.addEventListener("error", function () {
      frame.classList.add("is-missing");
      image.remove();
    });

    const meta = document.createElement("span");
    meta.className = "figure-meta";

    const plate = document.createElement("span");
    plate.className = "plate";
    plate.textContent = "Plate " + String(index + 1).padStart(2, "0");

    const heading = document.createElement("span");
    heading.className = "figure-title";
    heading.textContent = title;

    const text = document.createElement("span");
    text.className = "figure-caption";
    text.textContent = caption;

    frame.appendChild(image);
    meta.appendChild(plate);
    if (year) {
      const when = document.createElement("span");
      when.textContent = year;
      meta.appendChild(when);
    }
    meta.appendChild(heading);
    if (caption) meta.appendChild(text);

    card.appendChild(frame);
    card.appendChild(meta);
    card.addEventListener("click", function () {
      if (!dialog || !lightboxImage || !lightboxCaption) return;
      lightboxImage.src = figure.src || "";
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = [title, year, caption].filter(Boolean).join(" — ");
      dialog.showModal();
    });

    grid.appendChild(card);
  });
})();

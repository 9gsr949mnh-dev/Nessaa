const siteSettings = birthdayContent;

function setText(selector, text) {
  const node = document.querySelector(selector);
  if (node) node.textContent = text;
}

document.querySelectorAll("[data-gf-name]").forEach((node) => {
  node.textContent = siteSettings.girlfriendName;
});

document.querySelectorAll("[data-your-name]").forEach((node) => {
  node.textContent = siteSettings.yourName;
});

setText("[data-home-subtitle]", siteSettings.home.subtitle);
setText("[data-home-title]", siteSettings.home.title.replace("{girlfriendName}", siteSettings.girlfriendName));
setText("[data-home-message]", siteSettings.home.message);
setText("[data-letter-title]", siteSettings.letter.title);
setText("[data-letter-intro]", siteSettings.letter.intro);
setText("[data-wish-title]", siteSettings.wish.title);
setText("[data-wish-message]", siteSettings.wish.message);

const letterBody = document.querySelector("[data-letter-body]");

if (letterBody) {
  letterBody.innerHTML = `
    <p>Dear <span data-gf-name>${siteSettings.girlfriendName}</span>,</p>
    ${siteSettings.letter.paragraphs.map((text) => `<p>${text}</p>`).join("")}
    <p class="signature">Always,<br><span data-your-name>${siteSettings.yourName}</span></p>
  `;
}

const memoryGrid = document.querySelector("[data-memory-grid]");

if (memoryGrid) {
  memoryGrid.innerHTML = siteSettings.memories.map((memory, index) => {
    const fallbackClass = ["visual-a", "visual-b", "visual-c"][index % 3];
    const visual = memory.image
      ? `<img class="memory-photo" src="${memory.image}" alt="${memory.title}">`
      : `<div class="memory-visual ${fallbackClass}"></div>`;

    return `
      <article class="memory-card">
        ${visual}
        <p class="memory-date">${memory.date}</p>
        <h2>${memory.title}</h2>
        <p>${memory.message}</p>
      </article>
    `;
  }).join("");
}

const envelope = document.querySelector(".envelope");
const letter = document.querySelector(".letter-paper");

if (envelope && letter) {
  envelope.addEventListener("click", () => {
    const isOpen = envelope.classList.toggle("open");
    letter.classList.toggle("show", isOpen);
    envelope.setAttribute("aria-expanded", String(isOpen));
    sprinkleHearts(envelope, 10);
  });
}

const reasonOutput = document.querySelector(".reason-output");
const reasonButtons = document.querySelectorAll("[data-reason-index]");

reasonButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = Number(button.dataset.reasonIndex);
    reasonButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    reasonOutput.textContent = siteSettings.reasons[index] || "I love you more than this list can hold.";
    sprinkleHearts(button, 6);
  });
});

const candleButton = document.querySelector(".candle-button");
const wishMessage = document.querySelector(".wish-message");
const starField = document.querySelector(".star-field");

if (candleButton && wishMessage && starField) {
  candleButton.addEventListener("click", () => {
    candleButton.classList.add("out");
    wishMessage.textContent = siteSettings.wish.afterBlow;
    launchStars(starField, 34);
  });
}

function sprinkleHearts(origin, count) {
  const box = origin.getBoundingClientRect();

  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement("span");
    heart.textContent = "♥";
    heart.style.position = "fixed";
    heart.style.left = `${box.left + box.width / 2}px`;
    heart.style.top = `${box.top + box.height / 2}px`;
    heart.style.color = i % 2 ? "#e45573" : "#ff8f70";
    heart.style.fontSize = `${16 + Math.random() * 16}px`;
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "99";
    heart.style.transform = "translate(-50%, -50%)";
    heart.style.transition = "transform 900ms ease, opacity 900ms ease";
    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      const x = (Math.random() - .5) * 190;
      const y = -70 - Math.random() * 110;
      heart.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 80 - 40}deg)`;
      heart.style.opacity = "0";
    });

    setTimeout(() => heart.remove(), 950);
  }
}

function launchStars(container, count) {
  container.replaceChildren();

  for (let i = 0; i < count; i += 1) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${12 + Math.random() * 76}%`;
    star.style.bottom = `${8 + Math.random() * 28}%`;
    star.style.animationDelay = `${Math.random() * .55}s`;
    star.style.background = i % 3 === 0 ? "#2f9c95" : i % 3 === 1 ? "#f4b84a" : "#e45573";
    container.appendChild(star);
  }
}

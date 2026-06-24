const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const reveals = Array.from(document.querySelectorAll(".reveal"));

const revealObserver = new IntersectionObserver(
  entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.16 }
);

for (const node of reveals) {
  revealObserver.observe(node);
}

const navObserver = new IntersectionObserver(
  entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    for (const link of navLinks) {
      link.classList.toggle("active", link.dataset.nav === visible.target.id);
    }
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: [0.08, 0.2, 0.4]
  }
);

for (const section of sections) {
  navObserver.observe(section);
}

const form = document.querySelector("#contact-form");
const contactRecipient = ["maurik.vandenheuvel", "newlifewearables.com"].join("@");

if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const interest = String(data.get("interest") || "").trim();
    const message = String(data.get("message") || "").trim();

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Interest: ${interest}`,
      "",
      message
    ].join("\n");

    const subject = encodeURIComponent(`DST website enquiry: ${interest || "General contact"}`);
    const encodedBody = encodeURIComponent(body);
    window.location.href = `mailto:${contactRecipient}?subject=${subject}&body=${encodedBody}`;
  });
}

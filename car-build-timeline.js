const root = document.documentElement;
const stages = Array.from(document.querySelectorAll('.stage'));
const stops = Array.from(document.querySelectorAll('.stop'));

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateTimeline() {
  if (!stages.length) return;

  const first = stages[0].getBoundingClientRect();
  const last = stages[stages.length - 1].getBoundingClientRect();
  const start = window.innerHeight * 0.58;
  const end = window.innerHeight * 0.42;
  const total = (last.top - first.top) || 1;
  const raw = (start - first.top) / (total + (start - end));
  const progress = clamp(raw, 0, 1);

  root.style.setProperty('--road-progress', progress.toFixed(4));

  let activeIndex = 0;
  stages.forEach((stage, index) => {
    const box = stage.getBoundingClientRect();
    const center = box.top + box.height / 2;
    if (center < window.innerHeight * 0.62) activeIndex = index;
  });

  stages.forEach((stage, index) => stage.classList.toggle('active', index === activeIndex));
  stops.forEach((stop, index) => stop.classList.toggle('active', index === activeIndex));
}

stops.forEach((stop) => {
  stop.addEventListener('click', () => {
    const stage = document.querySelector(`.stage[data-stage="${stop.dataset.stage}"]`);
    if (stage) stage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

window.addEventListener('scroll', updateTimeline, { passive: true });
window.addEventListener('resize', updateTimeline);
updateTimeline();

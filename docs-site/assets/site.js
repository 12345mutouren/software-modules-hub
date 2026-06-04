const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

document.addEventListener("DOMContentLoaded", () => {
  initRevealMotion();
  initTemplateFilters();
  initProjectStarter();
  initBuildPlanner();
  initMaturityScorecard();
  initRepositoryBrowser();
  initConstellation();
});

function initRevealMotion() {
  const items = qsa(".reveal");
  if (!items.length) return;

  if (!window.gsap) {
    items.forEach((item) => {
      item.style.opacity = "1";
      item.style.transform = "none";
    });
    return;
  }

  window.gsap.set(items, { opacity: 0, y: 18 });
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        window.gsap.to(entry.target, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        });
      });
    },
    { threshold: 0.14 },
  );

  items.forEach((item) => observer.observe(item));
}

function initTemplateFilters() {
  const buttons = qsa("[data-template-filter]");
  const cards = qsa("[data-template-tags]");
  if (!buttons.length || !cards.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.templateFilter;
      buttons.forEach((item) => item.classList.toggle("active", item === button));

      const visible = [];
      cards.forEach((card) => {
        const tags = card.dataset.templateTags.split(" ");
        const show = filter === "all" || tags.includes(filter);
        card.hidden = !show;
        if (show) visible.push(card);
      });

      animateCards(visible);
    });
  });
}

function initRepositoryBrowser() {
  const search = qs("#repo-search");
  const moduleSelect = qs("#repo-module");
  const typeSelect = qs("#repo-type");
  const count = qs("#repo-count");
  const cards = qsa(".repo-card");
  if (!search || !moduleSelect || !typeSelect || !cards.length) return;

  const applyFilters = () => {
    const query = search.value.trim().toLowerCase();
    const moduleValue = moduleSelect.value;
    const typeValue = typeSelect.value;
    const visible = [];

    cards.forEach((card) => {
      const matchQuery = !query || card.dataset.search.includes(query);
      const matchModule = moduleValue === "all" || card.dataset.module === moduleValue;
      const matchType = typeValue === "all" || card.dataset.type === typeValue;
      const show = matchQuery && matchModule && matchType;
      card.hidden = !show;
      if (show) visible.push(card);
    });

    count.textContent = String(visible.length);
    animateCards(visible.slice(0, 24));
  };

  [search, moduleSelect, typeSelect].forEach((control) => {
    control.addEventListener("input", applyFilters);
    control.addEventListener("change", applyFilters);
  });
}

function initProjectStarter() {
  const select = qs("#starter-select");
  const summary = qs("#starter-summary");
  const command = qs("#starter-command");
  const cards = qsa("[data-starter-profile]");
  if (!select || !summary || !command || !cards.length) return;

  const updateStarter = () => {
    const active = cards.find((card) => card.dataset.starterProfile === select.value);
    if (!active) return;

    cards.forEach((card) => card.classList.toggle("active", card === active));
    summary.textContent = active.dataset.summary;
    command.textContent = active.dataset.command;
    animateCards([active]);
  };

  select.addEventListener("change", updateStarter);
}

function initBuildPlanner() {
  const typeSelect = qs("#planner-type");
  const stageSelect = qs("#planner-stage");
  const teamSelect = qs("#planner-team");
  const focus = qs("#planner-focus");
  const windowLabel = qs("#planner-window");
  const risk = qs("#planner-risk");
  const tracks = qsa("[data-planner-track]");
  if (!typeSelect || !stageSelect || !teamSelect || !focus || !windowLabel || !risk || !tracks.length) return;

  const updatePlanner = () => {
    const typeOption = typeSelect.selectedOptions[0];
    const stageOption = stageSelect.selectedOptions[0];
    const teamOption = teamSelect.selectedOptions[0];
    const activeStage = stageSelect.value;
    const activeTracks = [];

    focus.textContent = `${typeOption.dataset.focus} ${teamOption.dataset.focus}`;
    windowLabel.textContent = stageOption.dataset.window;
    risk.textContent = `${stageOption.dataset.risk} ${typeOption.dataset.risk}`;

    tracks.forEach((track) => {
      const active = track.dataset.plannerTrack === activeStage;
      track.classList.toggle("active", active);
      if (active) activeTracks.push(track);
    });

    animateCards(activeTracks);
  };

  [typeSelect, stageSelect, teamSelect].forEach((control) => {
    control.addEventListener("change", updatePlanner);
  });
  updatePlanner();
}

function initMaturityScorecard() {
  const checks = qsa("[data-score-check]");
  const moduleCards = qsa("[data-score-module]");
  const scoreValue = qs("#score-value");
  const scoreLabel = qs("#score-label");
  const scoreCompleted = qs("#score-completed");
  const scoreModules = qs("#score-modules");
  const scoreBarFill = qs("#score-bar-fill");
  const nextActions = qs("#score-next-actions");
  if (!checks.length || !moduleCards.length || !scoreValue || !scoreLabel || !scoreCompleted || !scoreModules || !scoreBarFill || !nextActions) {
    return;
  }

  const getLevel = (score) => {
    if (score >= 90) return "Production Ready";
    if (score >= 70) return "Launch Candidate";
    if (score >= 40) return "Prototype";
    return "Map";
  };

  const updateScore = () => {
    const checkedCount = checks.filter((check) => check.checked).length;
    const score = Math.round((checkedCount / checks.length) * 100);
    const moduleStates = moduleCards.map((card) => {
      const moduleChecks = qsa("[data-score-check]", card);
      const done = moduleChecks.filter((check) => check.checked).length;
      const missing = moduleChecks
        .filter((check) => !check.checked)
        .map((check) => check.closest(".score-check")?.textContent.trim())
        .filter(Boolean);
      const moduleScore = qs("[data-module-score]", card);
      if (moduleScore) moduleScore.textContent = `${done}/${moduleChecks.length}`;
      card.classList.toggle("complete", done === moduleChecks.length);
      return {
        name: card.dataset.scoreModule,
        done,
        total: moduleChecks.length,
        missing,
      };
    });

    const completeModules = moduleStates.filter((state) => state.done === state.total).length;
    scoreValue.textContent = String(score);
    scoreLabel.textContent = getLevel(score);
    scoreCompleted.textContent = String(checkedCount);
    scoreModules.textContent = String(completeModules);
    scoreBarFill.style.width = `${score}%`;

    const gaps = moduleStates
      .filter((state) => state.missing.length)
      .sort((a, b) => a.done - b.done)
      .slice(0, 3);

    nextActions.innerHTML = gaps.length
      ? gaps
          .map((gap) => `<article><strong>${gap.name}</strong><span>${gap.missing[0]}</span></article>`)
          .join("")
      : "<p>10 大模块都已经过线。下一步做真实项目安全复核、上线演练和长期维护节奏。</p>";
  };

  checks.forEach((check) => check.addEventListener("change", updateScore));
  updateScore();
}

function animateCards(cards) {
  if (!window.gsap || !cards.length) return;
  window.gsap.fromTo(
    cards,
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.35, stagger: 0.025, ease: "power2.out" },
  );
}

async function initConstellation() {
  const canvas = qs("#module-constellation");
  if (!canvas) return;

  try {
    const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
    const group = new THREE.Group();
    const palette = [0xe45842, 0x0f766e, 0xc18b12, 0x4f7d31, 0x6b5bd2];

    scene.add(group);
    camera.position.set(0, 0, 9);

    const nodes = Array.from({ length: 10 }, (_, index) => {
      const angle = (index / 10) * Math.PI * 2;
      const radius = index % 2 === 0 ? 3.1 : 2.25;
      const geometry = new THREE.SphereGeometry(0.11, 24, 24);
      const material = new THREE.MeshBasicMaterial({ color: palette[index % palette.length] });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, Math.sin(angle * 1.7) * 1.1);
      group.add(mesh);
      return mesh;
    });

    const linePositions = [];
    nodes.forEach((node, index) => {
      const next = nodes[(index + 1) % nodes.length];
      linePositions.push(node.position.x, node.position.y, node.position.z, next.position.x, next.position.y, next.position.z);
      if (index % 2 === 0) {
        const opposite = nodes[(index + 5) % nodes.length];
        linePositions.push(node.position.x, node.position.y, node.position.z, opposite.position.x, opposite.position.y, opposite.position.z);
      }
    });

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(
      lineGeometry,
      new THREE.LineBasicMaterial({ color: 0xfbfaf6, transparent: true, opacity: 0.22 }),
    );
    group.add(lines);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    let pointerX = 0;
    let pointerY = 0;
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", (event) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 0.45;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 0.35;
    });

    const tick = (time) => {
      group.rotation.y = time * 0.00016 + pointerX;
      group.rotation.x = pointerY;
      nodes.forEach((node, index) => {
        node.scale.setScalar(1 + Math.sin(time * 0.002 + index) * 0.18);
      });
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    resize();
    requestAnimationFrame(tick);
  } catch {
    canvas.style.display = "none";
  }
}

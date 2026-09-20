/* ══════════════════════════════════════════════════════════════
   YOUSEF.DATA_SYS — Data Engineer Portfolio Engine
   Interactivity, Canvas Data Streams, Pipeline Visualizer & REPL
   ══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ═══════════════════════════════════════
  // 1. LIVE CAIRO CLOCK (with Milliseconds)
  // ═══════════════════════════════════════
  function updateLiveClock() {
    const clockEl = document.getElementById('live-clock');
    if (!clockEl) return;

    const now = new Date();
    // Format to Cairo time or local time
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const ms = String(now.getMilliseconds()).padStart(3, '0');

    clockEl.textContent = `${h}:${m}:${s}:${ms}`;
    requestAnimationFrame(updateLiveClock);
  }
  requestAnimationFrame(updateLiveClock);

  // ═══════════════════════════════════════
  // 2. NEON DATA STREAM CANVAS BEHIND AVATAR
  // ═══════════════════════════════════════
  (function initDataStream() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const wrapper = canvas.parentElement;

    function resize() {
      canvas.width = wrapper.offsetWidth;
      canvas.height = wrapper.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Data engineering symbols & tokens
    const tokens = ['01', '10', '0xFF', 'ETL', 'SQL', 'ELT', '3NF', 'ROW', '>>', 'DAT', 'DF', 'IDX', '0x2A', 'KEY', '101'];
    const fontSize = 13;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = new Array(columns).fill(1);

    function drawStream() {
      ctx.fillStyle = 'rgba(6, 12, 29, 0.18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      columns = Math.floor(canvas.width / fontSize);
      while (drops.length < columns) drops.push(1);

      for (let i = 0; i < columns; i++) {
        const text = tokens[Math.floor(Math.random() * tokens.length)];
        const x = i * (fontSize + 8);
        const y = drops[i] * fontSize;

        const rand = Math.random();
        if (rand > 0.85) {
          ctx.fillStyle = '#38bdf8'; // Bright cyan
        } else if (rand > 0.5) {
          ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
        } else if (rand > 0.4) {
          ctx.fillStyle = '#fbbf24'; // Python yellow accent
        } else {
          ctx.fillStyle = 'rgba(59, 130, 246, 0.25)';
        }

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.97) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(drawStream, 65);
  })();

  // ═══════════════════════════════════════
  // 3. 3D TILT EFFECT ON AVATAR
  // ═══════════════════════════════════════
  (function initAvatarTilt() {
    const wrapper = document.querySelector('.profile-img-wrapper');
    const imgFrame = document.querySelector('.profile-img-frame');
    if (!wrapper || !imgFrame) return;

    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 14;
      const rotateX = ((centerY - y) / centerY) * 14;

      imgFrame.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    wrapper.addEventListener('mouseleave', () => {
      imgFrame.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  })();

  // ═══════════════════════════════════════
  // 4. ACTIVE NAVIGATION LINK ON SCROLL
  // ═══════════════════════════════════════
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavigation() {
    const scrollPos = window.scrollY + 140;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNavigation, { passive: true });

  // Smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          const offset = 80;
          const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
      }
    });
  });

  // ═══════════════════════════════════════
  // 5. DATA PIPELINE INTERACTIVE INSPECTOR
  // ═══════════════════════════════════════
  const pipelineData = {
    sources: {
      title: "01. INGESTION & DATA SOURCES",
      badge: "INPUT LAYER",
      desc: "Telemetry acquisition from edge IoT hardware (ESP32 continuous environmental sensors logged to SD card), multi-source business CSVs, and transactional database logs. Incoming records pass through schema verification and encoding checks before hitting the transformation pipeline.",
      specs: [
        { label: "Format:", val: "CSV, JSON, IoT Time-Series Streams" },
        { label: "Protocols:", val: "I2C, SPI Bus, Serial UART, REST" },
        { label: "Quality Gate:", val: "Null-check, Type check, Checksum integrity" }
      ]
    },
    transform: {
      title: "02. PYTHON ETL TRANSFORMATION ENGINE",
      badge: "PROCESSING CORE",
      desc: "Automated cleaning and transformation engine developed in Python (Pandas, NumPy). Standardizes inconsistent column headers, handles missing data imputation, enforces referential rules, executes groupby multi-dimensional aggregations, and computes business KPIs (e.g. Sales derived from unit price & quantity).",
      specs: [
        { label: "Engine:", val: "Python 3.x, Pandas, NumPy Vectorization" },
        { label: "Operations:", val: "Outlier filtering, Groupby, DateTime parsing" },
        { label: "Throughput:", val: "10,000+ rows processed with 100% precision" }
      ]
    },
    storage: {
      title: "03. SQL SERVER RELATIONAL STORAGE",
      badge: "DATA WAREHOUSE",
      desc: "Normalized 3rd Normal Form (3NF) relational database architecture implemented in Microsoft SQL Server. Utilizes strict primary/foreign key cascading, indexed lookups, and stored procedures to improve query response efficiency by over 25%.",
      specs: [
        { label: "Database:", val: "Microsoft SQL Server / RDBMS" },
        { label: "Schema:", val: "6 interconnected normalized tables, 3NF" },
        { label: "Optimization:", val: "Clustered indices, execution plan tuning" }
      ]
    },
    analytics: {
      title: "04. ANALYTICS, KPIS & DECISION REPORTS",
      badge: "CONSUMPTION LAYER",
      desc: "Delivering aggregated business metrics, transactional summaries, and automated exploratory data analysis (EDA). Translates complex raw data flows into actionable insights that optimize operations and reduce operational errors.",
      specs: [
        { label: "Deliverables:", val: "KPI Summaries, Trend Analysis, EDA Charts" },
        { label: "Business Value:", val: "30% reduction in data cleaning errors" },
        { label: "Consumer:", val: "Executive Dashboards & Stakeholder Reports" }
      ]
    }
  };

  const nodes = document.querySelectorAll('.pipeline-node');
  const inspectorTitle = document.getElementById('inspector-title');
  const inspectorBadge = document.getElementById('inspector-badge');
  const inspectorDesc = document.getElementById('inspector-desc');
  const inspectorSpecs = document.getElementById('inspector-specs');

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const nodeKey = node.getAttribute('data-node');
      const data = pipelineData[nodeKey];
      if (!data) return;

      inspectorTitle.textContent = data.title;
      inspectorBadge.textContent = data.badge;
      inspectorDesc.textContent = data.desc;

      inspectorSpecs.innerHTML = data.specs.map(s => `
        <div class="spec-pill"><span>${s.label}</span> ${s.val}</div>
      `).join('');
    });
  });

  // ═══════════════════════════════════════
  // 6. INTERACTIVE SQL / PYTHON QUERY TERMINAL (REPL)
  // ═══════════════════════════════════════
  const termOutput = document.getElementById('terminal-output');
  const termBtns = document.querySelectorAll('.term-btn');

  const queryDatabase = {
    skills: {
      cmd: "SELECT skill, proficiency, domain FROM skills WHERE domain = 'Data Engineering';",
      result: `+------------------------+-------------+---------------------+
| SKILL                  | PROFICIENCY | DOMAIN              |
+------------------------+-------------+---------------------+
| ETL/ELT Architectures  | ADVANCED    | Data Engineering    |
| Data Pipelines         | ADVANCED    | Data Engineering    |
| Batch Processing       | STRONG      | Data Engineering    |
| Data Quality & Clean   | STRONG      | Data Engineering    |
| Relational Schemas     | 3NF MASTER  | Databases           |
+------------------------+-------------+---------------------+
<span class="term-success">>> 5 rows retrieved in 0.0034s. Query execution: 100% valid.</span>`
    },
    pipeline: {
      cmd: "python -c \"import data_pipeline as dp; print(dp.health_check())\"",
      result: `[SYSTEM DIAGNOSTICS: YOUSEF_DATA_SYS]
------------------------------------------------------
[OK] IoT Source Stream (ESP32)  : ACTIVE [1,000+ packets]
[OK] Python ETL Engine (Pandas) : READY  [100% throughput]
[OK] SQL Server Schema (3NF)    : SYNCED [6 tables healthy]
[OK] Query Optimization Index   : ACTIVE [+25% efficiency]
------------------------------------------------------
>> All data pipelines running with ZERO data loss.`
    },
    projects: {
      cmd: "SELECT project_id, name, tech_stack, rows_handled FROM projects;",
      result: `+----+--------------------------+-----------------------+--------------+
| ID | NAME                     | TECH STACK            | ROWS_HANDLED |
+----+--------------------------+-----------------------+--------------+
| 01 | Sales Data Analysis      | Python, Pandas, SQL   | 5,000+       |
| 02 | Library Management DB    | SQL Server, T-SQL     | 6 Tables     |
| 03 | ESP32 Weather Logger     | ESP32, Sensors, SD    | 1,000+       |
| 04 | Li-Fi Laser & Robotic Arm| Arduino, Optics, BLE  | Real-Time    |
+----+--------------------------+-----------------------+--------------+
<span class="term-success">>> Query completed. Status: Production Ready.</span>`
    },
    contact: {
      cmd: "SELECT email, phone, location, status FROM engineer WHERE id = 'YOUSEF_HOSNY';",
      result: `+-------------------------------------+-----------------+-----------------------+---------------------+
| EMAIL                               | PHONE           | LOCATION              | STATUS              |
+-------------------------------------+-----------------+-----------------------+---------------------+
| Yousefhosnyabdelrasoul1@gmail.com   | +201000386808   | Kafr El-Sheikh, Egypt | AVAILABLE FOR HIRE  |
+-------------------------------------+-----------------+-----------------------+---------------------+
<span class="term-success">>> Connection established. Ready to receive packets.</span>`
    }
  };

  termBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      termBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const queryKey = btn.getAttribute('data-query');
      const item = queryDatabase[queryKey];
      if (!item || !termOutput) return;

      termOutput.innerHTML = `
        <div class="term-line prompt-line">
          <span class="term-prompt">yousef@de-system:~$</span>
          <span class="term-cmd">${item.cmd}</span>
        </div>
        <div class="term-result">${item.result}</div>
      `;
    });
  });

  // ═══════════════════════════════════════
  // 7. SKILLS FILTER TABS
  // ═══════════════════════════════════════
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCategoryCards = document.querySelectorAll('.skill-category-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillCategoryCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || filter === cat) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ═══════════════════════════════════════
  // 8. ANIMATED TELEMETRY COUNTERS
  // ═══════════════════════════════════════
  const statsSection = document.getElementById('stats');
  let animated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.2 });

  if (statsSection) counterObserver.observe(statsSection);

  function animateCounters() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
      const valEl = card.querySelector('.stat-value');
      const target = parseInt(valEl.getAttribute('data-target'), 10);
      if (isNaN(target)) return;

      let count = 0;
      const duration = 1500;
      const stepTime = 25;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;

      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }

        if (target === 10000) {
          valEl.textContent = `${Math.floor(count).toLocaleString()}+`;
        } else if (target === 25) {
          valEl.textContent = `${Math.floor(count)}%`;
        } else if (target === 100) {
          valEl.textContent = `${Math.floor(count)}%`;
        } else if (target === 1000) {
          valEl.textContent = `${Math.floor(count).toLocaleString()}+`;
        } else {
          valEl.textContent = Math.floor(count);
        }
      }, stepTime);
    });
  }

  // ═══════════════════════════════════════
  // 9. DIRECT TRANSMISSION DISPATCHER (FORM)
  // ═══════════════════════════════════════
  window.sendPacket = function() {
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const subject = document.getElementById('form-subject').value;
    const msg = document.getElementById('form-msg').value;

    const fullSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} - from ${name}`);
    const fullBody = encodeURIComponent(
`Hi Yousef,

My Name: ${name}
My Email: ${email}

Message:
${msg}

-------------------------
Sent via Yousef.DATA_SYS Portfolio Terminal`
    );

    // Direct Gmail compose web URL (compatible on all devices)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=Yousefhosnyabdelrasoul1@gmail.com&su=${fullSubject}&body=${fullBody}`;
    
    // Open Gmail in a new tab
    window.open(gmailUrl, '_blank');
  };

});

// Basic UI interactions: theme, language, nav highlight, segmentation
(function(){
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle') || document.getElementById('themeToggleTop') || document.getElementById('themeToggleTop2');
  const langSelects = Array.from(document.querySelectorAll('#lang, #langTop, #langTop2'));
  const navBtns = Array.from(document.querySelectorAll('.nav-btn'));
  const segBtns = Array.from(document.querySelectorAll('.seg-btn'));
  const yearEls = [document.getElementById('year'), document.getElementById('year2'), document.getElementById('year3')];

  // Initialize year
  yearEls.forEach(el => { if(el) el.textContent = new Date().getFullYear(); });

  // Theme handling
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  function setTheme(mode){
    if(mode === 'light'){
      document.documentElement.classList.add('light');
      toggleIcon(true);
    } else {
      document.documentElement.classList.remove('light');
      toggleIcon(false);
    }
    localStorage.setItem('theme', mode);
  }

  function toggleIcon(isLight){
    // show sun for light, moon for dark
    document.querySelectorAll('.icon-sun').forEach(i => i.style.display = isLight ? 'inline-block' : 'none');
    document.querySelectorAll('.icon-moon').forEach(i => i.style.display = isLight ? 'none' : 'inline-block');
    // update aria-pressed
    document.querySelectorAll('.icon-btn').forEach(b => b.setAttribute('aria-pressed', isLight ? 'true' : 'false'));
  }

  // Attach theme toggles (multiple buttons)
  document.querySelectorAll('.icon-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isLight = document.documentElement.classList.contains('light');
      setTheme(isLight ? 'dark' : 'light');
    });
  });

  // Language handling (simple dictionary)
  const dictionary = {
    en: {
      title: "Sales Profit Report",
      subtitle: "Data Analytics Power BI",
      "nav.home": "Financial Report",
      "nav.sales": "Sales Report",
      "nav.details": "Sales Details",
      "nav.homeShort": "Home",
      "nav.salesShort": "Sales",
      "nav.detailsShort": "Details",
      "hero.title": "Sales Profit Report",
      "hero.desc": "Learning by doing with Power BI analyst training",
      "cta.explore": "Explore analysis",
      "metrics.totalSales": "Total Sales",
      "metrics.units": "Units Sold",
      "metrics.discount": "Sum of Discounts",
      "metrics.cogs": "Sum of COGS",
      "sales.title": "Sales Over Time",
      "charts.salesTime": "Sales Over Time",
      "charts.bySegment": "Sales by Segment",
      "charts.byCountry": "Sales by Country",
      "charts.table": "Quarterly Sales",
      "table.quarter": "Quarter",
      "table.2013": "2013",
      "table.2014": "2014",
      "table.total": "Total",
      "details.title": "Sales Details",
      "charts.semester": "Sales by Semester",
      "charts.histogram": "Histogram Units Sold",
      "charts.byProduct": "Units Sold x Product"
    },
    pt: {
      title: "Relatório Financeiro",
      subtitle: "Análise de Dados Power BI",
      "nav.home": "Relatório Financeiro",
      "nav.sales": "Relatório de Vendas",
      "nav.details": "Detalhes de Vendas",
      "nav.homeShort": "Início",
      "nav.salesShort": "Vendas",
      "nav.detailsShort": "Detalhes",
      "hero.title": "Relatório de Vendas e Lucros",
      "hero.desc": "Aprendendo fazendo com treinamento Power BI",
      "cta.explore": "Explorar análise",
      "metrics.totalSales": "Vendas Totais",
      "metrics.units": "Unidades Vendidas",
      "metrics.discount": "Soma de Descontos",
      "metrics.cogs": "Soma de COGS",
      "sales.title": "Vendas ao Longo do Tempo",
      "charts.salesTime": "Vendas ao Longo do Tempo",
      "charts.bySegment": "Vendas por Segmento",
      "charts.byCountry": "Vendas por País",
      "charts.table": "Vendas Trimestrais",
      "table.quarter": "Trimestre",
      "table.2013": "2013",
      "table.2014": "2014",
      "table.total": "Total",
      "details.title": "Detalhes de Vendas",
      "charts.semester": "Vendas por Semestre",
      "charts.histogram": "Histograma Unidades Vendidas",
      "charts.byProduct": "Unidades Vendidas x Produto"
    },
    es: {
      title: "Informe Financiero",
      subtitle: "Análisis de Datos Power BI",
      "nav.home": "Informe Financiero",
      "nav.sales": "Informe de Ventas",
      "nav.details": "Detalles de Ventas",
      "nav.homeShort": "Inicio",
      "nav.salesShort": "Ventas",
      "nav.detailsShort": "Detalles",
      "hero.title": "Informe de Ventas y Beneficios",
      "hero.desc": "Aprendiendo haciendo con Power BI",
      "cta.explore": "Explorar análisis",
      "metrics.totalSales": "Ventas Totales",
      "metrics.units": "Unidades Vendidas",
      "metrics.discount": "Suma de Descuentos",
      "metrics.cogs": "Suma de COGS",
      "sales.title": "Ventas en el Tiempo",
      "charts.salesTime": "Ventas en el Tiempo",
      "charts.bySegment": "Ventas por Segmento",
      "charts.byCountry": "Ventas por País",
      "charts.table": "Ventas Trimestrales",
      "table.quarter": "Trimestre",
      "table.2013": "2013",
      "table.2014": "2014",
      "table.total": "Total",
      "details.title": "Detalles de Ventas",
      "charts.semester": "Ventas por Semestre",
      "charts.histogram": "Histograma Unidades Vendidas",
      "charts.byProduct": "Unidades Vendidas x Producto"
    }
  };

  // Apply language
  function applyLanguage(lang){
    const nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach(n => {
      const key = n.getAttribute('data-i18n');
      if(dictionary[lang] && dictionary[lang][key]){
        n.textContent = dictionary[lang][key];
      }
    });
    // set selects
    document.querySelectorAll('select').forEach(s => { s.value = lang; });
    localStorage.setItem('lang', lang);
  }

  // Initialize language
  const savedLang = localStorage.getItem('lang') || 'en';
  applyLanguage(savedLang);

  // Attach language selectors
  langSelects.forEach(sel => {
    sel.value = savedLang;
    sel.addEventListener('change', (e) => {
      applyLanguage(e.target.value);
    });
  });

  // Nav highlight (keeps active class on click)
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Segmentation buttons
  segBtns.forEach(b => {
    b.addEventListener('click', () => {
      segBtns.forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      // Visual feedback: pulse selected
      b.animate([{transform:'scale(1)'},{transform:'scale(1.03)'},{transform:'scale(1)'}],{duration:220});
    });
  });

  // Accessibility: keyboard nav for side nav
  document.querySelectorAll('.side-nav a').forEach(a => {
    a.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        a.click();
      }
    });
  });

  // Save theme and language on unload
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
  });

  // If user opens page with hash to highlight a section
  if(location.hash){
    const target = document.querySelector(location.hash);
    if(target) target.scrollIntoView({behavior:'smooth'});
  }

  // Simple mock for download button
  const downloadMock = document.getElementById('downloadMock');
  if(downloadMock){
    downloadMock.addEventListener('click', () => {
      downloadMock.textContent = 'Preparing...';
      setTimeout(()=> downloadMock.textContent = 'Download', 900);
    });
  }

})();

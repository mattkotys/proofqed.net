const chart = document.getElementById('inspection-chart');
const source = document.getElementById('inspection-chart-source');
const fallback = document.getElementById('inspection-chart-text');

try {
  const { default: mermaid } = await import(
    'https://cdn.jsdelivr.net/npm/mermaid@11.12.2/dist/mermaid.esm.min.mjs'
  );

  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    securityLevel: 'strict',
    htmlLabels: false,
    flowchart: { curve: 'linear' },
    themeVariables: {
      fontFamily: 'system-ui, sans-serif',
      lineColor: '#26332f',
      edgeLabelBackground: '#f5f2e9',
    },
  });

  const { svg } = await mermaid.render('incoming-inspection-flow', source.textContent.trim());
  chart.innerHTML = svg;
  chart.hidden = false;
  chart.tabIndex = 0;
  chart.setAttribute('role', 'region');
  chart.setAttribute('aria-label', 'Incoming inspection flowchart');
  fallback.open = false;
} catch (error) {
  console.warn('The incoming inspection flowchart could not render.', error);
}

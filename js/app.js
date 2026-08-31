// ============================================================
// HBM 景气度监控看板 - 渲染逻辑
// ============================================================

// ECharts 主题色
const COLORS = {
  primary: '#2196F3',
  primaryDark: '#1565C0',
  primaryLight: '#E3F2FD',
  red: '#e74c3c',
  orange: '#e67e22',
  yellow: '#f39c12',
  green: '#27ae60',
  blue: '#2980b9',
  gray: '#8899aa',
  skHynix: '#e74c3c',
  samsung: '#1565C0',
  micron: '#27ae60',
  nvidia: '#76b900',
  amd: '#e74c3c',
  google: '#4285f4',
  aws: '#ff9900',
  microsoft: '#00a4ef',
  meta: '#0866ff'
};

// 通用图表配置
const chartBaseOption = {
  textStyle: {
    fontFamily: 'Microsoft YaHei, sans-serif',
    fontSize: 12
  },
  grid: { left: 60, right: 30, top: 50, bottom: 40 },
  tooltip: { trigger: 'axis' },
  legend: { top: 5, textStyle: { fontSize: 12 } },
  color: [COLORS.primary, COLORS.red, COLORS.green, COLORS.orange, COLORS.yellow]
};

// ============================================================
// 主页渲染函数
// ============================================================

// 景气度仪表盘
function renderProsperityGauge(domId, value, label, color, title) {
  const chart = echarts.init(document.getElementById(domId));
  chart.setOption({
    series: [{
      type: 'gauge',
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 100,
      radius: '90%',
      center: ['50%', '55%'],
      title: {
        offsetCenter: [0, '70%'],
        fontSize: 14,
        color: '#5a6c7d'
      },
      detail: {
        valueAnimation: true,
        offsetCenter: [0, '20%'],
        formatter: '{value}',
        fontSize: 44,
        fontWeight: 'bold',
        color: color
      },
      axisLine: {
        lineStyle: {
          width: 12,
          color: [
            [0.2, '#2980b9'],
            [0.4, '#3498db'],
            [0.6, '#f39c12'],
            [0.8, '#e67e22'],
            [1, '#e74c3c']
          ]
        }
      },
      pointer: { width: 5, length: '60%' },
      data: [{ value: value, name: label }]
    }]
  });
  return chart;
}

// 景气度趋势线 (当前 vs 预期)
function renderProsperityTrend(domId) {
  const chart = echarts.init(document.getElementById(domId));
  const data = HBM_DATA.prosperityIndex;
  const currentData = data.current.timeline.map(d => ({
    value: d.score,
    name: d.quarter,
    itemStyle: d.quarter.includes('*') ? { opacity: 0.4 } : {}
  }));
  const expectedData = data.expected.timeline.map(d => ({
    value: d.score,
    name: d.quarter,
    itemStyle: d.forecast ? { opacity: 0.4, borderType: 'dashed' } : {}
  }));

  chart.setOption({
    ...chartBaseOption,
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        let html = `<b>${params[0].axisValue}</b><br/>`;
        params.forEach(p => {
          html += `${p.marker} ${p.seriesName}: <b>${p.value}</b><br/>`;
        });
        return html;
      }
    },
    legend: { data: ['当前景气度(方案A)', '预期景气度(方案C)'], top: 5 },
    xAxis: {
      type: 'category',
      data: data.current.timeline.map(d => d.quarter),
      axisLabel: { rotate: 30 }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: { formatter: '{value}' },
      splitLine: { lineStyle: { type: 'dashed' } }
    },
    series: [
      {
        name: '当前景气度(方案A)',
        type: 'line',
        data: currentData,
        smooth: true,
        lineStyle: { width: 3, color: COLORS.red },
        itemStyle: { color: COLORS.red },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(231,76,60,0.15)' },
            { offset: 1, color: 'rgba(231,76,60,0.02)' }
          ])
        },
        markLine: {
          data: [
            { yAxis: 80, lineStyle: { color: '#e74c3c', type: 'dashed' }, label: { formatter: '极高景气' } },
            { yAxis: 60, lineStyle: { color: '#e67e22', type: 'dashed' }, label: { formatter: '高景气' } },
            { yAxis: 40, lineStyle: { color: '#f39c12', type: 'dashed' }, label: { formatter: '中性' } }
          ],
          symbol: 'none'
        }
      },
      {
        name: '预期景气度(方案C)',
        type: 'line',
        data: expectedData,
        smooth: true,
        lineStyle: { width: 2, color: COLORS.primary, type: 'dashed' },
        itemStyle: { color: COLORS.primary }
      }
    ]
  });
  return chart;
}

// 供需平衡图
function renderSupplyDemand(domId) {
  const chart = echarts.init(document.getElementById(domId));
  const data = HBM_DATA.supplyDemand.quarterly;
  chart.setOption({
    ...chartBaseOption,
    legend: { data: ['供给量', '需求量', '供需缺口率'], top: 5 },
    xAxis: {
      type: 'category',
      data: data.map(d => d.quarter),
      axisLabel: { rotate: 30 }
    },
    yAxis: [
      { type: 'value', name: '数量(百万GB)', position: 'left' },
      { type: 'value', name: '缺口率(%)', position: 'right', axisLabel: { formatter: '{value}%' } }
    ],
    series: [
      {
        name: '供给量',
        type: 'bar',
        data: data.map(d => d.supply),
        itemStyle: { color: COLORS.primary, borderRadius: [3, 3, 0, 0] }
      },
      {
        name: '需求量',
        type: 'bar',
        data: data.map(d => d.demand),
        itemStyle: { color: COLORS.red, borderRadius: [3, 3, 0, 0] }
      },
      {
        name: '供需缺口率',
        type: 'line',
        yAxisIndex: 1,
        data: data.map(d => d.gap),
        smooth: true,
        lineStyle: { width: 3, color: COLORS.orange },
        itemStyle: { color: COLORS.orange },
        markArea: {
          data: [[{ yAxis: 0, itemStyle: { color: 'rgba(231,76,60,0.03)' } }]]
        }
      }
    ]
  });
  return chart;
}

// HBM均价走势
function renderPriceTrend(domId) {
  const chart = echarts.init(document.getElementById(domId));
  const data = HBM_DATA.price.averagePrice;
  chart.setOption({
    ...chartBaseOption,
    legend: { show: false },
    xAxis: {
      type: 'category',
      data: data.map(d => d.quarter),
      axisLabel: { rotate: 30 }
    },
    yAxis: {
      type: 'value',
      name: '美元/GB',
      axisLabel: { formatter: '${value}' }
    },
    series: [{
      type: 'line',
      data: data.map(d => d.price),
      smooth: true,
      lineStyle: { width: 3, color: COLORS.red },
      itemStyle: { color: COLORS.red, borderColor: '#fff', borderWidth: 2 },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(231,76,60,0.2)' },
          { offset: 1, color: 'rgba(231,76,60,0.02)' }
        ])
      },
      label: { show: true, position: 'top', formatter: '${c}', fontSize: 10 },
      markPoint: {
        data: [
          { coord: [data.findIndex(d => d.hbmGen === 'HBM3'), data.find(d => d.hbmGen === 'HBM3').price], value: 'HBM3' },
          { coord: [data.findIndex(d => d.hbmGen === 'HBM3E'), data.find(d => d.hbmGen === 'HBM3E').price], value: 'HBM3E' },
          { coord: [data.findIndex(d => d.hbmGen === 'HBM4'), data.find(d => d.hbmGen === 'HBM4').price], value: 'HBM4' }
        ]
      }
    }]
  });
  return chart;
}

// 三大供应商产能
function renderCapacity(domId) {
  const chart = echarts.init(document.getElementById(domId));
  const data = HBM_DATA.capacity.bySupplier;
  chart.setOption({
    ...chartBaseOption,
    legend: { data: ['SK Hynix', 'Samsung', 'Micron'], top: 5 },
    xAxis: {
      type: 'category',
      data: data.map(d => d.quarter),
      axisLabel: { rotate: 30 }
    },
    yAxis: { type: 'value', name: '千片/月' },
    series: [
      {
        name: 'SK Hynix',
        type: 'bar',
        stack: 'total',
        data: data.map(d => d.skHynix),
        itemStyle: { color: COLORS.skHynix }
      },
      {
        name: 'Samsung',
        type: 'bar',
        stack: 'total',
        data: data.map(d => d.samsung),
        itemStyle: { color: COLORS.samsung }
      },
      {
        name: 'Micron',
        type: 'bar',
        stack: 'total',
        data: data.map(d => d.micron),
        itemStyle: { color: COLORS.micron }
      }
    ]
  });
  return chart;
}

// 产能利用率
function renderUtilization(domId) {
  const chart = echarts.init(document.getElementById(domId));
  const data = HBM_DATA.capacity.utilization;
  chart.setOption({
    ...chartBaseOption,
    legend: { data: ['SK Hynix', 'Samsung', 'Micron'], top: 5 },
    xAxis: {
      type: 'category',
      data: data.map(d => d.quarter),
      axisLabel: { rotate: 30 }
    },
    yAxis: {
      type: 'value',
      min: 60,
      max: 100,
      name: '利用率(%)',
      axisLabel: { formatter: '{value}%' }
    },
    series: [
      { name: 'SK Hynix', type: 'line', data: data.map(d => d.skHynix), smooth: true, lineStyle: { width: 2, color: COLORS.skHynix }, itemStyle: { color: COLORS.skHynix } },
      { name: 'Samsung', type: 'line', data: data.map(d => d.samsung), smooth: true, lineStyle: { width: 2, color: COLORS.samsung }, itemStyle: { color: COLORS.samsung } },
      { name: 'Micron', type: 'line', data: data.map(d => d.micron), smooth: true, lineStyle: { width: 2, color: COLORS.micron }, itemStyle: { color: COLORS.micron } }
    ]
  });
  return chart;
}

// 库存周转天数
function renderInventoryDays(domId) {
  const chart = echarts.init(document.getElementById(domId));
  const data = HBM_DATA.inventory.supplierDays;
  chart.setOption({
    ...chartBaseOption,
    legend: { data: ['SK Hynix', 'Samsung', 'Micron'], top: 5 },
    xAxis: {
      type: 'category',
      data: data.map(d => d.quarter),
      axisLabel: { rotate: 30 }
    },
    yAxis: {
      type: 'value',
      name: '周转天数',
      inverse: true
    },
    series: [
      { name: 'SK Hynix', type: 'line', data: data.map(d => d.skHynix), smooth: true, lineStyle: { width: 2, color: COLORS.skHynix }, itemStyle: { color: COLORS.skHynix }, areaStyle: { color: 'rgba(231,76,60,0.05)' } },
      { name: 'Samsung', type: 'line', data: data.map(d => d.samsung), smooth: true, lineStyle: { width: 2, color: COLORS.samsung }, itemStyle: { color: COLORS.samsung } },
      { name: 'Micron', type: 'line', data: data.map(d => d.micron), smooth: true, lineStyle: { width: 2, color: COLORS.micron }, itemStyle: { color: COLORS.micron } }
    ]
  });
  return chart;
}

// NVIDIA数据中心营收
function renderNvidiaRevenue(domId) {
  const chart = echarts.init(document.getElementById(domId));
  const data = HBM_DATA.demand.nvidiaRevenue;
  chart.setOption({
    ...chartBaseOption,
    legend: { data: ['总收入', '数据中心收入'], top: 5 },
    xAxis: {
      type: 'category',
      data: data.map(d => d.calQuarter),
      axisLabel: { rotate: 30 }
    },
    yAxis: { type: 'value', name: '百万美元', axisLabel: { formatter: '${value}M' } },
    series: [
      {
        name: '总收入',
        type: 'bar',
        data: data.map(d => ({ value: d.totalRevenue, itemStyle: d.forecast ? { opacity: 0.4 } : {} })),
        itemStyle: { color: COLORS.nvidia, borderRadius: [3, 3, 0, 0] }
      },
      {
        name: '数据中心收入',
        type: 'line',
        data: data.map(d => d.dataCenter),
        smooth: true,
        lineStyle: { width: 3, color: COLORS.red },
        itemStyle: { color: COLORS.red }
      }
    ]
  });
  return chart;
}

// 云厂商CAPEX
function renderCloudCapex(domId) {
  const chart = echarts.init(document.getElementById(domId));
  const data = HBM_DATA.cloud.capex;
  chart.setOption({
    ...chartBaseOption,
    legend: { data: ['AWS', 'Microsoft', 'Google', 'Meta'], top: 5 },
    xAxis: {
      type: 'category',
      data: data.map(d => d.quarter),
      axisLabel: { rotate: 30 }
    },
    yAxis: { type: 'value', name: '十亿美元', axisLabel: { formatter: '${value}B' } },
    series: [
      { name: 'AWS', type: 'bar', stack: 'total', data: data.map(d => d.aws), itemStyle: { color: COLORS.aws } },
      { name: 'Microsoft', type: 'bar', stack: 'total', data: data.map(d => d.microsoft), itemStyle: { color: COLORS.microsoft } },
      { name: 'Google', type: 'bar', stack: 'total', data: data.map(d => d.google), itemStyle: { color: COLORS.google } },
      { name: 'Meta', type: 'bar', stack: 'total', data: data.map(d => d.meta), itemStyle: { color: COLORS.meta } }
    ]
  });
  return chart;
}

// HBM市场规模预测
function renderMarketSize(domId) {
  const chart = echarts.init(document.getElementById(domId));
  const data = HBM_DATA.marketSize.hbmRevenue;
  chart.setOption({
    ...chartBaseOption,
    legend: { show: false },
    xAxis: { type: 'category', data: data.map(d => d.year) },
    yAxis: { type: 'value', name: '十亿美元', axisLabel: { formatter: '${value}B' } },
    series: [{
      type: 'bar',
      data: data.map(d => ({
        value: d.revenue,
        itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: COLORS.primary },
          { offset: 1, color: COLORS.primaryLight }
        ]), borderRadius: [4, 4, 0, 0] }
      })),
      label: { show: true, position: 'top', formatter: '${c}B', fontSize: 11, fontWeight: 'bold', color: COLORS.primaryDark },
      markLine: {
        data: [{ type: 'trend', lineStyle: { color: COLORS.red, type: 'dashed' } }],
        symbol: 'none'
      }
    }]
  });
  return chart;
}

// DRAM市占率
function renderDRAMShare(domId) {
  const chart = echarts.init(document.getElementById(domId));
  const data = HBM_DATA.landscape.dramMarketShare;
  chart.setOption({
    ...chartBaseOption,
    legend: { data: ['SK Hynix', 'Samsung', 'Micron'], top: 5 },
    xAxis: {
      type: 'category',
      data: data.map(d => d.quarter),
      axisLabel: { rotate: 30 }
    },
    yAxis: { type: 'value', name: '市占率(%)', max: 50, axisLabel: { formatter: '{value}%' } },
    series: [
      { name: 'SK Hynix', type: 'line', data: data.map(d => d.skHynix), smooth: true, lineStyle: { width: 2, color: COLORS.skHynix }, itemStyle: { color: COLORS.skHynix } },
      { name: 'Samsung', type: 'line', data: data.map(d => d.samsung), smooth: true, lineStyle: { width: 2, color: COLORS.samsung }, itemStyle: { color: COLORS.samsung } },
      { name: 'Micron', type: 'line', data: data.map(d => d.micron), smooth: true, lineStyle: { width: 2, color: COLORS.micron }, itemStyle: { color: COLORS.micron } }
    ]
  });
  return chart;
}

// HBM占DRAM比重
function renderHBMShare(domId) {
  const chart = echarts.init(document.getElementById(domId));
  const data = HBM_DATA.capacity.hbmShareOfDRAM;
  chart.setOption({
    ...chartBaseOption,
    legend: { show: false },
    xAxis: { type: 'category', data: data.map(d => d.year) },
    yAxis: { type: 'value', name: '占比(%)', axisLabel: { formatter: '{value}%' } },
    series: [{
      type: 'bar',
      data: data.map(d => d.share),
      itemStyle: { color: COLORS.primary, borderRadius: [4, 4, 0, 0] },
      label: { show: true, position: 'top', formatter: '{c}%', fontSize: 12, fontWeight: 'bold', color: COLORS.primaryDark }
    }]
  });
  return chart;
}

// CAPEX对比
function renderCapex(domId) {
  const chart = echarts.init(document.getElementById(domId));
  const data = HBM_DATA.expansion.capex;
  chart.setOption({
    ...chartBaseOption,
    legend: { data: ['SK Hynix', 'Samsung', 'Micron'], top: 5 },
    xAxis: { type: 'category', data: data.map(d => d.year) },
    yAxis: { type: 'value', name: '十亿美元', axisLabel: { formatter: '${value}B' } },
    series: [
      { name: 'SK Hynix', type: 'bar', data: data.map(d => d.skHynix), itemStyle: { color: COLORS.skHynix, borderRadius: [3, 3, 0, 0] } },
      { name: 'Samsung', type: 'bar', data: data.map(d => d.samsung), itemStyle: { color: COLORS.samsung, borderRadius: [3, 3, 0, 0] } },
      { name: 'Micron', type: 'bar', data: data.map(d => d.micron), itemStyle: { color: COLORS.micron, borderRadius: [3, 3, 0, 0] } }
    ]
  });
  return chart;
}

// 需求结构饼图
function renderDemandPie(domId) {
  const chart = echarts.init(document.getElementById(domId));
  const data = HBM_DATA.demand.demandStructure2026;
  chart.setOption({
    tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
    legend: { orient: 'vertical', left: 10, top: 'middle', textStyle: { fontSize: 12 } },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['60%', '50%'],
      data: data.map(d => ({ name: d.segment, value: d.share })),
      label: { formatter: '{b}\n{d}%', fontSize: 11 },
      itemStyle: { borderColor: '#fff', borderWidth: 2 }
    }],
    color: [COLORS.nvidia, COLORS.google, COLORS.amd, COLORS.gray]
  });
  return chart;
}

// 客户端库存周数
function renderClientInventory(domId) {
  const chart = echarts.init(document.getElementById(domId));
  const data = HBM_DATA.inventory.clientWeeks;
  chart.setOption({
    ...chartBaseOption,
    legend: { data: ['NVIDIA', 'AMD', '云厂商'], top: 5 },
    xAxis: {
      type: 'category',
      data: data.map(d => d.quarter),
      axisLabel: { rotate: 30 }
    },
    yAxis: { type: 'value', name: '可用周数', inverse: true },
    series: [
      { name: 'NVIDIA', type: 'line', data: data.map(d => d.nvidia), smooth: true, lineStyle: { width: 2, color: COLORS.nvidia }, itemStyle: { color: COLORS.nvidia } },
      { name: 'AMD', type: 'line', data: data.map(d => d.amd), smooth: true, lineStyle: { width: 2, color: COLORS.amd }, itemStyle: { color: COLORS.amd } },
      { name: '云厂商', type: 'line', data: data.map(d => d.cloud), smooth: true, lineStyle: { width: 2, color: COLORS.primary }, itemStyle: { color: COLORS.primary } }
    ]
  });
  return chart;
}

// HBM需求量
function renderHBMDemand(domId) {
  const chart = echarts.init(document.getElementById(domId));
  const data = HBM_DATA.demand.hbmDemandVolume;
  chart.setOption({
    ...chartBaseOption,
    legend: { show: false },
    xAxis: { type: 'category', data: data.map(d => d.year) },
    yAxis: { type: 'value', name: '百万GB' },
    series: [{
      type: 'bar',
      data: data.map(d => d.volume),
      itemStyle: { color: COLORS.primary, borderRadius: [4, 4, 0, 0] },
      label: { show: true, position: 'top', formatter: '{c}', fontSize: 12, fontWeight: 'bold', color: COLORS.primaryDark }
    }]
  });
  return chart;
}

// 时间轴
function renderTimeline(domId) {
  const data = HBM_DATA.latestNews;
  const container = document.getElementById(domId);
  let html = '<ul class="timeline">';
  data.forEach(item => {
    const tagClass = item.impact === '高' ? 'tag-red' : (item.impact === '中' ? 'tag-orange' : 'tag-blue');
    html += `
      <li class="timeline-item">
        <div class="timeline-date">${item.date} <span class="tag ${tagClass} ml-1">${item.impact}影响</span></div>
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-category">分类: ${item.category}</div>
      </li>
    `;
  });
  html += '</ul>';
  container.innerHTML = html;
}

// ============================================================
// 表格渲染辅助
// ============================================================
function renderTable(headers, rows, options = {}) {
  let html = '<table><thead><tr>';
  headers.forEach(h => html += `<th>${h}</th>`);
  html += '</tr></thead><tbody>';
  rows.forEach(row => {
    html += '<tr>';
    row.forEach((cell, i) => {
      const cls = options.numeric && options.numeric.includes(i) ? 'num' : '';
      html += `<td class="${cls}">${cell}</td>`;
    });
    html += '</tr>';
  });
  html += '</tbody></table>';
  return html;
}

// ============================================================
// 初始化所有图表
// ============================================================
let charts = [];

function initCharts() {
  // 检查 ECharts 是否加载
  if (typeof echarts === 'undefined') {
    console.error('ECharts not loaded');
    return;
  }

  // 依次渲染存在的图表
  const renderers = {
    'chart-prosperity-current': () => {
      const d = HBM_DATA.prosperityIndex.current.latest;
      return renderProsperityGauge('chart-prosperity-current', d.score, d.label, d.color, '当前景气度');
    },
    'chart-prosperity-expected': () => {
      const d = HBM_DATA.prosperityIndex.expected.latest;
      return renderProsperityGauge('chart-prosperity-expected', d.score, d.label, COLORS.primary, '预期景气度');
    },
    'chart-prosperity-trend': () => renderProsperityTrend('chart-prosperity-trend'),
    'chart-supply-demand': () => renderSupplyDemand('chart-supply-demand'),
    'chart-price-trend': () => renderPriceTrend('chart-price-trend'),
    'chart-capacity': () => renderCapacity('chart-capacity'),
    'chart-utilization': () => renderUtilization('chart-utilization'),
    'chart-inventory-days': () => renderInventoryDays('chart-inventory-days'),
    'chart-nvidia-revenue': () => renderNvidiaRevenue('chart-nvidia-revenue'),
    'chart-cloud-capex': () => renderCloudCapex('chart-cloud-capex'),
    'chart-market-size': () => renderMarketSize('chart-market-size'),
    'chart-dram-share': () => renderDRAMShare('chart-dram-share'),
    'chart-hbm-share': () => renderHBMShare('chart-hbm-share'),
    'chart-capex': () => renderCapex('chart-capex'),
    'chart-demand-pie': () => renderDemandPie('chart-demand-pie'),
    'chart-client-inventory': () => renderClientInventory('chart-client-inventory'),
    'chart-hbm-demand': () => renderHBMDemand('chart-hbm-demand')
  };

  for (const [id, fn] of Object.entries(renderers)) {
    if (document.getElementById(id)) {
      try {
        const chart = fn();
        if (chart) charts.push(chart);
      } catch(e) {
        console.error(`Failed to render ${id}:`, e);
      }
    }
  }

  // 渲染时间轴
  if (document.getElementById('timeline-news')) {
    renderTimeline('timeline-news');
  }

  // 渲染核心指标卡片
  renderMetricCards();
}

function renderMetricCards() {
  const priceData = HBM_DATA.price.averagePrice;
  const latestPrice = priceData[priceData.length - 1];
  const prevPrice = priceData[priceData.length - 2];
  const priceChange = ((latestPrice.price - prevPrice.price) / prevPrice.price * 100).toFixed(1);

  const capData = HBM_DATA.capacity.bySupplier;
  const latestCap = capData[capData.length - 1];
  const totalCap = latestCap.skHynix + latestCap.samsung + latestCap.micron;

  const invData = HBM_DATA.inventory.supplierDays;
  const latestInv = invData[invData.length - 1];
  const avgInvDays = ((latestInv.skHynix + latestInv.samsung + latestInv.micron) / 3).toFixed(0);

  const cloudData = HBM_DATA.cloud.capex;
  const latestCloud = cloudData[cloudData.length - 1];
  const totalCloudCapex = (latestCloud.aws + latestCloud.microsoft + latestCloud.google + latestCloud.meta).toFixed(0);

  // 更新指标卡片
  updateElement('metric-price', `$${latestPrice.price}`, `<span class="up">↑ ${priceChange}%</span> 环比`);
  updateElement('metric-capacity', `${totalCap} <span class="unit">千片/月</span>`, '三大厂合计等效晶圆产能');
  updateElement('metric-inventory', `${avgInvDays} <span class="unit">天</span>`, '<span class="down">↓ 库存持续去化</span> 供应商平均周转');
  updateElement('metric-cloud-capex', `$${totalCloudCapex}B`, '四大云厂季度CAPEX合计');
}

function updateElement(id, value, sub) {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = value;
    if (sub) {
      const subEl = el.parentElement.querySelector('.change');
      if (subEl) subEl.innerHTML = sub;
    }
  }
}

// 窗口resize
window.addEventListener('resize', () => {
  charts.forEach(c => c && c.resize());
});

// DOM加载完成
document.addEventListener('DOMContentLoaded', initCharts);

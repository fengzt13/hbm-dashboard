// ============================================================
// HBM 景气度监控看板 - 全量数据
// 版本: 1.1
// 最后更新: 2026-08-31
// 数据来源: TrendForce / Omdia / 美银 / NVIDIA财报 / 各厂财报 / 公开新闻
// ============================================================

const HBM_DATA = {
  meta: {
    version: "1.3",
    lastUpdate: "2026-09-07",
    dataSources: [
      "TrendForce - DRAM/HBM 季度报告",
      "Omdia - 半导体市场季度追踪",
      "美银(BofA) - 全球存储超级周期报告 (2026.07)",
      "NVIDIA FY2024-FY2026 财报",
      "SK Hynix / Samsung / Micron 季度财报",
      "AWS / Microsoft / Google / Meta 季度财报",
      "爱集微 / 半导体产业纵横 / 36Kr / 新浪财经",
      "Epoch AI - AI芯片HBM成本占比分析"
    ],
    updateFreq: "月度更新"
  },

  // ============================================================
  // 1. 景气度指数 (方案A供需主导 + 方案C先行预判)
  // ============================================================
  prosperityIndex: {
    // 方案A: 供需平衡主导型 - 当前景气度
    current: {
      // 季度时间序列 2023Q1 - 2026Q2
      timeline: [
        { quarter: "2023Q1", score: 35, label: "低迷", supplyGap: -5.2, priceMoM: -8, inventoryDays: 95, utilization: 72 },
        { quarter: "2023Q2", score: 42, label: "偏弱", supplyGap: -3.8, priceMoM: -3, inventoryDays: 88, utilization: 76 },
        { quarter: "2023Q3", score: 55, label: "中性", supplyGap: -2.4, priceMoM: 5, inventoryDays: 78, utilization: 82 },
        { quarter: "2023Q4", score: 68, label: "高景气", supplyGap: 1.5, priceMoM: 12, inventoryDays: 65, utilization: 88 },
        { quarter: "2024Q1", score: 75, label: "高景气", supplyGap: 4.2, priceMoM: 18, inventoryDays: 55, utilization: 92 },
        { quarter: "2024Q2", score: 82, label: "极高景气", supplyGap: 7.5, priceMoM: 22, inventoryDays: 45, utilization: 95 },
        { quarter: "2024Q3", score: 85, label: "极高景气", supplyGap: 9.8, priceMoM: 15, inventoryDays: 40, utilization: 96 },
        { quarter: "2024Q4", score: 88, label: "极高景气", supplyGap: 11.2, priceMoM: 10, inventoryDays: 35, utilization: 97 },
        { quarter: "2025Q1", score: 80, label: "极高景气", supplyGap: 8.5, priceMoM: -2, inventoryDays: 42, utilization: 95 },
        { quarter: "2025Q2", score: 83, label: "极高景气", supplyGap: 10.2, priceMoM: 8, inventoryDays: 38, utilization: 96 },
        { quarter: "2025Q3", score: 86, label: "极高景气", supplyGap: 12.5, priceMoM: 15, inventoryDays: 32, utilization: 97 },
        { quarter: "2025Q4", score: 89, label: "极高景气", supplyGap: 14.8, priceMoM: 20, inventoryDays: 28, utilization: 98 },
        { quarter: "2026Q1", score: 91, label: "极高景气", supplyGap: 16.5, priceMoM: 25, inventoryDays: 25, utilization: 98 },
        { quarter: "2026Q2", score: 92, label: "极高景气", supplyGap: 18.2, priceMoM: 28, inventoryDays: 22, utilization: 99 },
        { quarter: "2026Q3*", score: 94, label: "极高景气", supplyGap: 20.0, priceMoM: 30, inventoryDays: 20, utilization: 99, forecast: true }
      ],
      weights: {
        supplyGap: 0.40,
        priceTrend: 0.25,
        inventoryDays: 0.20,
        utilization: 0.15
      },
      latest: {
        score: 94,
        label: "极高景气",
        color: "#e74c3c",
        supplyGap: 20.0,
        priceMoM: 30,
        inventoryDays: 20,
        utilization: 99
      }
    },
    // 方案C: 先行指标驱动型 - 预期景气度 (未来2-4季度)
    expected: {
      timeline: [
        { quarter: "2023Q1", score: 45 },
        { quarter: "2023Q2", score: 52 },
        { quarter: "2023Q3", score: 62 },
        { quarter: "2023Q4", score: 72 },
        { quarter: "2024Q1", score: 80 },
        { quarter: "2024Q2", score: 85 },
        { quarter: "2024Q3", score: 87 },
        { quarter: "2024Q4", score: 86 },
        { quarter: "2025Q1", score: 84 },
        { quarter: "2025Q2", score: 86 },
        { quarter: "2025Q3", score: 88 },
        { quarter: "2025Q4", score: 90 },
        { quarter: "2026Q1", score: 92 },
        { quarter: "2026Q2", score: 93 },
        // 预测值
        { quarter: "2026Q3*", score: 95, forecast: true },
        { quarter: "2026Q4*", score: 94, forecast: true },
        { quarter: "2027Q1*", score: 92, forecast: true },
        { quarter: "2027Q2*", score: 89, forecast: true }
      ],
      weights: {
        cloudCapex: 0.30,
        gpuOrderForecast: 0.25,
        expansionPace: 0.20,
        priceMomentum: 0.15,
        inventoryLevel: 0.10
      },
      latest: {
        score: 95,
        label: "持续上行",
        trend: "up",
        // 预期 vs 当前 剪刀差
        spread: 1,
        spreadLabel: "上行",
        spreadColor: "#e74c3c"
      }
    },
    // 景气度信号灯定义
    signalLevels: [
      { range: [80, 100], label: "极高景气", color: "#e74c3c", bg: "#fdf0ef" },
      { range: [60, 80], label: "高景气", color: "#e67e22", bg: "#fef5ee" },
      { range: [40, 60], label: "中性", color: "#f39c12", bg: "#fef9f0" },
      { range: [20, 40], label: "低景气", color: "#3498db", bg: "#eef6fc" },
      { range: [0, 20], label: "萧条", color: "#2980b9", bg: "#e8f4f8" }
    ]
  },

  // ============================================================
  // 2. 价格数据
  // ============================================================
  price: {
    // HBM 均价走势 (美元/GB) - 按季度
    averagePrice: [
      { quarter: "2021Q1", price: 4.5, hbmGen: "HBM2E" },
      { quarter: "2021Q2", price: 4.8, hbmGen: "HBM2E" },
      { quarter: "2021Q3", price: 5.2, hbmGen: "HBM2E" },
      { quarter: "2021Q4", price: 5.5, hbmGen: "HBM2E" },
      { quarter: "2022Q1", price: 5.8, hbmGen: "HBM2E/HBM3" },
      { quarter: "2022Q2", price: 6.0, hbmGen: "HBM2E/HBM3" },
      { quarter: "2022Q3", price: 5.5, hbmGen: "HBM3" },
      { quarter: "2022Q4", price: 5.0, hbmGen: "HBM3" },
      { quarter: "2023Q1", price: 5.2, hbmGen: "HBM3" },
      { quarter: "2023Q2", price: 5.8, hbmGen: "HBM3" },
      { quarter: "2023Q3", price: 7.0, hbmGen: "HBM3" },
      { quarter: "2023Q4", price: 8.5, hbmGen: "HBM3" },
      { quarter: "2024Q1", price: 9.8, hbmGen: "HBM3/HBM3E" },
      { quarter: "2024Q2", price: 10.5, hbmGen: "HBM3/HBM3E" },
      { quarter: "2024Q3", price: 11.2, hbmGen: "HBM3E" },
      { quarter: "2024Q4", price: 12.0, hbmGen: "HBM3E" },
      { quarter: "2025Q1", price: 12.5, hbmGen: "HBM3E" },
      { quarter: "2025Q2", price: 13.0, hbmGen: "HBM3E" },
      { quarter: "2025Q3", price: 13.8, hbmGen: "HBM3E/HBM4" },
      { quarter: "2025Q4", price: 14.3, hbmGen: "HBM4" },
      { quarter: "2026Q1", price: 15.5, hbmGen: "HBM4" },
      { quarter: "2026Q2", price: 16.8, hbmGen: "HBM4" },
      { quarter: "2026Q3*", price: 18.2, hbmGen: "HBM4", forecast: true, note: "大摩预测:Q3 DDR4涨50%,HBM继续上行" }
    ],
    // 美银预测均价
    forecast: [
      { year: 2025, pricePerGB: 14.3, label: "美银预测均价" },
      { year: 2026, pricePerGB: 14.3, label: "美银预测均价", note: "实际已超预期" },
      { year: 2027, pricePerGB: 17.5, label: "美银预测均价" },
      { year: 2028, pricePerGB: 17.5, label: "美银预测均价" }
    ],
    // 各代产品价格对比
    byGeneration: [
      { gen: "HBM2E", launchYear: 2020, pricePerGB: "3-5", capacity: "8-16GB", bandwidth: "460GB/s", status: "逐步退出" },
      { gen: "HBM3", launchYear: 2022, pricePerGB: "5-9", capacity: "24-80GB", bandwidth: "3.2TB/s", status: "存量主力" },
      { gen: "HBM3E", launchYear: 2024, pricePerGB: "10-15", capacity: "80-192GB", bandwidth: "4.8TB/s", status: "主流在产" },
      { gen: "HBM4", launchYear: 2026, pricePerGB: "15-20", capacity: "192-288GB", bandwidth: "8TB/s", status: "规模量产" },
      { gen: "HBM4E", launchYear: 2027, pricePerGB: "20-25(预估)", capacity: "288-576GB", bandwidth: "10TB/s+", status: "研发中" },
      { gen: "HBM5", launchYear: 2029, pricePerGB: "待定", capacity: "1TB+", bandwidth: "待定", status: "规划中" }
    ],
    // 涨幅数据
    priceChanges: {
      // 2025H2 服务器DRAM合约价涨幅
      serverDRAM_2025H2: "+64%",
      // 2026年服务器DRAM预估涨幅
      serverDRAM_2026: "+270%(预估)",
      // 2025H2 企业级SSD涨幅
      enterpriseSSD_2025H2: "+35%",
      // 2026年企业级SSD预估涨幅
      enterpriseSSD_2026: "+235%(预估)",
      // 2027年HBM合约价预估涨幅
      hbm_2027: "+70%至140%(预估)",
      // HBM单位容量价格 2025年涨幅
      hbmUnitPrice_2025: "+21%",
      // HBM4较HBM3E单GB溢价
      hbm4_premium: "+30%",
      // HBM占AI芯片组件支出比例
      hbmCostShare_2024Q1: "52%",
      hbmCostShare_2025Q4: "63%"
    },
    // HBM 在 AI 芯片成本中占比时间序列 (Epoch AI 估算)
    hbmCostShareTimeline: [
      { quarter: "2024Q1", share: 52 },
      { quarter: "2024Q4", share: 55 },
      { quarter: "2025Q2", share: 58 },
      { quarter: "2025Q4", share: 63 },
      { quarter: "2026Q2", share: 68 },
      { quarter: "2026Q3*", share: 70, forecast: true, note: "预估: HBM4持续涨价推动" }
    ]
  },

  // ============================================================
  // 3. 产能数据
  // ============================================================
  capacity: {
    // 三大供应商季度等效晶圆产能 (千片/月, 等效12寸晶圆)
    bySupplier: [
      // SK Hynix
      { quarter: "2023Q1", skHynix: 120, samsung: 100, micron: 30 },
      { quarter: "2023Q2", skHynix: 130, samsung: 110, micron: 35 },
      { quarter: "2023Q3", skHynix: 145, samsung: 120, micron: 40 },
      { quarter: "2023Q4", skHynix: 160, samsung: 130, micron: 45 },
      { quarter: "2024Q1", skHynix: 180, samsung: 145, micron: 50 },
      { quarter: "2024Q2", skHynix: 200, samsung: 160, micron: 55 },
      { quarter: "2024Q3", skHynix: 220, samsung: 180, micron: 60 },
      { quarter: "2024Q4", skHynix: 240, samsung: 200, micron: 65 },
      { quarter: "2025Q1", skHynix: 260, samsung: 220, micron: 70 },
      { quarter: "2025Q2", skHynix: 280, samsung: 240, micron: 75 },
      { quarter: "2025Q3", skHynix: 300, samsung: 260, micron: 80 },
      { quarter: "2025Q4", skHynix: 320, samsung: 280, micron: 85 },
      { quarter: "2026Q1", skHynix: 350, samsung: 300, micron: 90 },
      { quarter: "2026Q2", skHynix: 380, samsung: 320, micron: 95 },
      { quarter: "2026Q3*", skHynix: 410, samsung: 345, micron: 100, forecast: true, note: "美光计划年底前月产能提升至10万片" }
    ],
    // HBM占DRAM产能比重 (按位元)
    hbmShareOfDRAM: [
      { year: "2021", share: 5 },
      { year: "2022", share: 6 },
      { year: "2023", share: 8 },
      { year: "2024", share: 20 },
      { year: "2025", share: 33 },
      { year: "2026", share: 31, note: "占DRAM产值约31%" }
    ],
    // 产能利用率
    utilization: [
      { quarter: "2023Q1", skHynix: 75, samsung: 70, micron: 65 },
      { quarter: "2023Q2", skHynix: 80, samsung: 75, micron: 70 },
      { quarter: "2023Q3", skHynix: 85, samsung: 80, micron: 75 },
      { quarter: "2023Q4", skHynix: 90, samsung: 85, micron: 80 },
      { quarter: "2024Q1", skHynix: 93, samsung: 90, micron: 85 },
      { quarter: "2024Q2", skHynix: 95, samsung: 93, micron: 88 },
      { quarter: "2024Q3", skHynix: 96, samsung: 94, micron: 90 },
      { quarter: "2024Q4", skHynix: 97, samsung: 95, micron: 92 },
      { quarter: "2025Q1", skHynix: 96, samsung: 95, micron: 93 },
      { quarter: "2025Q2", skHynix: 97, samsung: 96, micron: 94 },
      { quarter: "2025Q3", skHynix: 98, samsung: 96, micron: 95 },
      { quarter: "2025Q4", skHynix: 98, samsung: 97, micron: 96 },
      { quarter: "2026Q1", skHynix: 99, samsung: 97, micron: 97 },
      { quarter: "2026Q2", skHynix: 99, samsung: 98, micron: 98 },
      { quarter: "2026Q3*", skHynix: 99, samsung: 98, micron: 98, forecast: true }
    ],
    // HBM+服务器RDIMM占DRAM位元供应量
    hbmServerShare: {
      "2026": 51,
      note: "HBM与服务器RDIMM合计占DRAM位元供应量51%，消费级产能被大幅挤压"
    },
    // 产能扩张路线图
    expansionRoadmap: [
      {
        supplier: "SK Hynix",
        projects: [
          { name: "M15X 清州新厂", timeline: "2025-2027", capacity: "新增80千片/月", status: "建设中", note: "HBM4主力产线" },
          { name: "利川 M16", timeline: "2026-2028", capacity: "新增100千片/月", status: "规划中", note: "HBM4E专用" },
          { name: "五年产能翻倍计划", timeline: "2025-2030", capacity: "总产能翻倍", status: "执行中", note: "目标2030年产能较2024年翻倍" }
        ]
      },
      {
        supplier: "Samsung",
        projects: [
          { name: "平泽 P4 产线", timeline: "2025-2027", capacity: "新增90千片/月", status: "建设中", note: "HBM4+1c nm DRAM" },
          { name: "泰勒 P3 扩建", timeline: "2024-2026", capacity: "新增60千片/月", status: "量产中", note: "HBM3E主力" },
          { name: "DSR 路线图", timeline: "2026-2030", capacity: "渐进扩产", status: "规划中", note: "对标SK Hynix五年计划" }
        ]
      },
      {
        supplier: "Micron",
        projects: [
          { name: "博伊西(爱达荷)新厂", timeline: "2025-2028", capacity: "新增70千片/月", status: "建设中", note: "美国本土HBM产线" },
          { name: "新加坡扩建", timeline: "2024-2027", capacity: "新增50千片/月", status: "部分投产", note: "面向亚太客户" },
          { name: "HBM4量产", timeline: "2026", capacity: "小批量", status: "量产准备", note: "2025.9确认进入量产阶段" }
        ]
      }
    ]
  },

  // ============================================================
  // 4. 库存数据
  // ============================================================
  inventory: {
    // 供应商库存周转天数 (季度)
    supplierDays: [
      { quarter: "2023Q1", skHynix: 95, samsung: 105, micron: 110 },
      { quarter: "2023Q2", skHynix: 88, samsung: 98, micron: 102 },
      { quarter: "2023Q3", skHynix: 78, samsung: 88, micron: 92 },
      { quarter: "2023Q4", skHynix: 65, samsung: 75, micron: 80 },
      { quarter: "2024Q1", skHynix: 55, samsung: 65, micron: 70 },
      { quarter: "2024Q2", skHynix: 45, samsung: 55, micron: 60 },
      { quarter: "2024Q3", skHynix: 40, samsung: 48, micron: 52 },
      { quarter: "2024Q4", skHynix: 35, samsung: 42, micron: 45 },
      { quarter: "2025Q1", skHynix: 42, samsung: 48, micron: 50 },
      { quarter: "2025Q2", skHynix: 38, samsung: 44, micron: 46 },
      { quarter: "2025Q3", skHynix: 32, samsung: 38, micron: 40 },
      { quarter: "2025Q4", skHynix: 28, samsung: 32, micron: 35 },
      { quarter: "2026Q1", skHynix: 25, samsung: 28, micron: 30 },
      { quarter: "2026Q2", skHynix: 22, samsung: 25, micron: 27 },
      { quarter: "2026Q3*", skHynix: 20, samsung: 23, micron: 25, forecast: true, note: "预估: 库存继续去化" }
    ],
    // 客户端库存可用周数 (估算)
    clientWeeks: [
      { quarter: "2023Q1", nvidia: 12, amd: 14, cloud: 10 },
      { quarter: "2023Q2", nvidia: 10, amd: 12, cloud: 8 },
      { quarter: "2023Q3", nvidia: 8, amd: 10, cloud: 6 },
      { quarter: "2023Q4", nvidia: 6, amd: 8, cloud: 5 },
      { quarter: "2024Q1", nvidia: 5, amd: 7, cloud: 4 },
      { quarter: "2024Q2", nvidia: 4, amd: 6, cloud: 3 },
      { quarter: "2024Q3", nvidia: 4, amd: 5, cloud: 3 },
      { quarter: "2024Q4", nvidia: 3, amd: 5, cloud: 2 },
      { quarter: "2025Q1", nvidia: 4, amd: 6, cloud: 3 },
      { quarter: "2025Q2", nvidia: 3, amd: 5, cloud: 2 },
      { quarter: "2025Q3", nvidia: 3, amd: 4, cloud: 2 },
      { quarter: "2025Q4", nvidia: 2, amd: 4, cloud: 2 },
      { quarter: "2026Q1", nvidia: 2, amd: 3, cloud: 1 },
      { quarter: "2026Q2", nvidia: 2, amd: 3, cloud: 1 },
      { quarter: "2026Q3*", nvidia: 2, amd: 2, cloud: 1, forecast: true }
    ],
    // 库存预警阈值
    alertThresholds: {
      supplierDays: { normal: 60, warning: 80, critical: 100 },
      clientWeeks: { normal: 6, warning: 10, critical: 14 }
    }
  },

  // ============================================================
  // 5. 需求数据
  // ============================================================
  demand: {
    // NVIDIA 数据中心季度营收 (百万美元)
    nvidiaRevenue: [
      // FY2023 (对应自然年2022)
      { quarter: "FY23Q1", calQuarter: "2022Q1", totalRevenue: 5109, dataCenter: 2370 },
      { quarter: "FY23Q2", calQuarter: "2022Q2", totalRevenue: 6743, dataCenter: 3806 },
      { quarter: "FY23Q3", calQuarter: "2022Q3", totalRevenue: 5931, dataCenter: 3754 },
      { quarter: "FY23Q4", calQuarter: "2022Q4", totalRevenue: 6051, dataCenter: 3262 },
      // FY2024 (对应自然年2023)
      { quarter: "FY24Q1", calQuarter: "2023Q1", totalRevenue: 7192, dataCenter: 4284 },
      { quarter: "FY24Q2", calQuarter: "2023Q2", totalRevenue: 13507, dataCenter: 10323 },
      { quarter: "FY24Q3", calQuarter: "2023Q3", totalRevenue: 18122, dataCenter: 14551 },
      { quarter: "FY24Q4", calQuarter: "2023Q4", totalRevenue: 22103, dataCenter: 18405 },
      // FY2025 (对应自然年2024)
      { quarter: "FY25Q1", calQuarter: "2024Q1", totalRevenue: 26044, dataCenter: 22563 },
      { quarter: "FY25Q2", calQuarter: "2024Q2", totalRevenue: 35082, dataCenter: 30805 },
      { quarter: "FY25Q3", calQuarter: "2024Q3", totalRevenue: 35382, dataCenter: 30802 },
      { quarter: "FY25Q4", calQuarter: "2024Q4", totalRevenue: 39331, dataCenter: 35598 },
      // FY2026 (对应自然年2025-2026)
      { quarter: "FY26Q1", calQuarter: "2025Q1", totalRevenue: 44062, dataCenter: 39671 },
      { quarter: "FY26Q2", calQuarter: "2025Q2", totalRevenue: 46743, dataCenter: 41185 },
      { quarter: "FY26Q3", calQuarter: "2025Q3", totalRevenue: 57006, dataCenter: 51200 },
      { quarter: "FY26Q4", calQuarter: "2025Q4", totalRevenue: 68127, dataCenter: 62300 },
      // FY2027 Q1 实际值 (截至2026.4.26)
      { quarter: "FY27Q1", calQuarter: "2026Q1", totalRevenue: 81615, dataCenter: 75200, note: "FY27Q1实际: +85% YoY, 净利润583亿" },
      // FY2027 Q2 实际值 (截至2026.7.26)
      { quarter: "FY27Q2", calQuarter: "2026Q2", totalRevenue: 96221, dataCenter: 89000, note: "FY27Q2实际: +106% YoY, 毛利率75%, Vera Rubin量产" },
      // FY2027 Q3 指引
      { quarter: "FY27Q3*", calQuarter: "2026Q3*", totalRevenue: 108000, dataCenter: 100000, forecast: true, note: "公司指引1080亿(±2%)" }
    ],
    // GPU HBM 用量规格
    gpuSpecs: [
      { gpu: "NVIDIA A100", arch: "Ampere", hbmGen: "HBM2E", hbmCapacity: "80GB", bandwidth: "2.0TB/s", hbmStacks: 4, launchYear: 2020 },
      { gpu: "NVIDIA H100", arch: "Hopper", hbmGen: "HBM3", hbmCapacity: "80GB", bandwidth: "3.35TB/s", hbmStacks: 5, launchYear: 2022 },
      { gpu: "NVIDIA H200", arch: "Hopper", hbmGen: "HBM3E", hbmCapacity: "141GB", bandwidth: "4.8TB/s", hbmStacks: 6, launchYear: 2024 },
      { gpu: "NVIDIA B100", arch: "Blackwell", hbmGen: "HBM3E", hbmCapacity: "192GB", bandwidth: "8.0TB/s", hbmStacks: 8, launchYear: 2024 },
      { gpu: "NVIDIA B200", arch: "Blackwell", hbmGen: "HBM3E", hbmCapacity: "192GB", bandwidth: "8.0TB/s", hbmStacks: 8, launchYear: 2024 },
      { gpu: "NVIDIA B300", arch: "Blackwell Ultra", hbmGen: "HBM3E", hbmCapacity: "288GB", bandwidth: "8.0TB/s", hbmStacks: 8, launchYear: 2025 },
      { gpu: "NVIDIA Rubin", arch: "Rubin", hbmGen: "HBM4", hbmCapacity: "288GB", bandwidth: "13TB/s", hbmStacks: 8, launchYear: 2026 },
      { gpu: "NVIDIA Rubin Ultra", arch: "Rubin", hbmGen: "HBM4E", hbmCapacity: "576GB(预估)", bandwidth: "待定", hbmStacks: 12, launchYear: 2027 },
      { gpu: "AMD MI300X", arch: "CDNA3", hbmGen: "HBM3", hbmCapacity: "192GB", bandwidth: "5.3TB/s", hbmStacks: 8, launchYear: 2023 },
      { gpu: "AMD MI325X", arch: "CDNA3", hbmGen: "HBM3E", hbmCapacity: "256GB", bandwidth: "6.0TB/s", hbmStacks: 8, launchYear: 2024 },
      { gpu: "AMD MI350X", arch: "CDNA4", hbmGen: "HBM3E", hbmCapacity: "288GB", bandwidth: "8.0TB/s", hbmStacks: 8, launchYear: 2025 },
      { gpu: "AMD MI450", arch: "CDNA5", hbmGen: "HBM4", hbmCapacity: "432GB(预估)", bandwidth: "19.6TB/s", hbmStacks: 12, launchYear: 2026 },
      { gpu: "Google TPU v5p", arch: "TPU v5", hbmGen: "HBM", hbmCapacity: "95GB", bandwidth: "2.8TB/s", hbmStacks: 4, launchYear: 2023 },
      { gpu: "Google TPU v6 Trillium", arch: "TPU v6e", hbmGen: "HBM", hbmCapacity: "32GB", bandwidth: "1.6TB/s", hbmStacks: 4, launchYear: 2024 },
      { gpu: "Google TPU v7 Ironwood", arch: "TPU v7", hbmGen: "HBM3E", hbmCapacity: "192GB", bandwidth: "7.37TB/s", hbmStacks: 8, launchYear: 2025 },
      { gpu: "AWS Trainium2", arch: "Trainium2", hbmGen: "HBM3E", hbmCapacity: "96GB(预估)", bandwidth: "待公开", hbmStacks: 4, launchYear: 2024 },
      { gpu: "AWS Trainium3", arch: "Trainium3", hbmGen: "HBM3E", hbmCapacity: "128GB(预估)", bandwidth: "待公开", hbmStacks: 6, launchYear: 2025 },
      { gpu: "Meta MTIA v2", arch: "MTIA v2", hbmGen: "HBM3", hbmCapacity: "128GB(预估)", bandwidth: "待公开", hbmStacks: 4, launchYear: 2025 }
    ],
    // HBM 需求量 (百万GB, 按年)
    hbmDemandVolume: [
      { year: 2021, volume: 0.8, note: "早期阶段" },
      { year: 2022, volume: 1.5, note: "ChatGPT发布前" },
      { year: 2023, volume: 2.9, note: "AI需求井喷,增长60%" },
      { year: 2024, volume: 8.5, note: "H100放量,增长近200%" },
      { year: 2025, volume: 22.0, note: "B200/MI300放量,增长159%" },
      { year: 2026, volume: 50.0, note: "Rubin/HBM4量产,预估" }
    ],
    // 2026年HBM需求结构拆分
    demandStructure2026: [
      { segment: "NVIDIA GPU (B200/Rubin)", share: 58, note: "单台NVL72机柜HBM搭载量较上代翻倍" },
      { segment: "云厂商自研ASIC (TPU/Trainium/MTIA)", share: 27, note: "Google TPU、微软Maia、AWS Trainium、Meta MTIA" },
      { segment: "AMD MI系列", share: 10, note: "MI300/MI325X/MI350系列" },
      { segment: "国内AI加速卡/第三方ASIC", share: 5, note: "含国产替代需求" }
    ],
    // 需求场景拆分
    demandScenario: [
      { scenario: "AI训练服务器", share_2026: 72, share_2027: 55, note: "短期主力" },
      { scenario: "高并发推理/Agent系统", share_2026: 28, share_2027: 40, note: "2027年第二增长曲线" }
    ]
  },

  // ============================================================
  // 6. 扩产数据 (CAPEX)
  // ============================================================
  expansion: {
    // 三大厂年度资本开支 (十亿美元)
    capex: [
      { year: 2021, skHynix: 13.5, samsung: 33.0, micron: 9.2 },
      { year: 2022, skHynix: 15.8, samsung: 38.0, micron: 11.0 },
      { year: 2023, skHynix: 14.2, samsung: 32.0, micron: 8.5 },
      { year: 2024, skHynix: 18.5, samsung: 35.0, micron: 11.5 },
      { year: 2025, skHynix: 25.0, samsung: 40.0, micron: 14.0 },
      { year: 2026, skHynix: 32.0, samsung: 48.0, micron: 18.0, note: "三厂合计近1200亿美元,均创历史新高" }
    ],
    // HBM占资本开支比重
    hbmCapexShare: [
      { year: 2023, share: 15 },
      { year: 2024, share: 25 },
      { year: 2025, share: 35 },
      { year: 2026, share: 50, note: "新增先进晶圆60%优先供给HBM" }
    ],
    // 全球DRAM总资本开支
    globalDRAMCapex: {
      "2026": "近1200亿美元,同比+65%",
      "2024": "约750亿美元"
    },
    // 关键扩产事件
    keyEvents: [
      { date: "2025.09", event: "美光宣布上调存储产品价格20%-30%", impact: "涨价信号" },
      { date: "2025.09", event: "SK Hynix HBM4完成开发并启动量产", impact: "量产里程碑" },
      { date: "2025.09", event: "美光确认HBM4进入量产阶段", impact: "三家同步量产" },
      { date: "2025.09", event: "Samsung宣布上调移动DRAM价格20%", impact: "全品类涨价" },
      { date: "2026.01", event: "SK Hynix 2025年营收97.15万亿韩元,利润率49%", impact: "首次超越三星" },
      { date: "2026.02", event: "NVIDIA FY2026全年收入2159亿美元,同比+65%", impact: "需求端验证" },
      { date: "2026.03", event: "三星HBM4重夺DRAM市场第一(36.6%)", impact: "竞争格局变化" },
      { date: "2026.06", event: "SK Hynix宣布五年产能翻倍计划", impact: "供给端扩张" },
      { date: "2026.07", event: "美银发布HBM预测:2026年269亿美元,2030年836亿美元", impact: "长期空间确认" },
      { date: "2026.08", event: "TrendForce:存储占云厂商资本支出2027年将达68%", impact: "成本结构变化" },
      { date: "2026.08", event: "SK Hynix与英伟达等签7500亿美元长期供应协议", impact: "产能锁定" },
      { date: "2026.08", event: "三星与博通签2000亿美元合作备忘录", impact: "产能锁定" },
      { date: "2026.08", event: "英伟达FY27Q2营收962亿(+106% YoY),数据中心890亿,Vera Rubin量产", impact: "需求端验证" },
      { date: "2026.08", event: "Gartner上修2026年全球存储营收至8373亿,占半导体54%", impact: "市场空间上修" },
      { date: "2026.08", event: "大摩:Q3 DDR4涨50%,SLC NAND每季涨超50%", impact: "全品类涨价" },
      { date: "2026.09", event: "美光计划年底前HBM月产能提升至10万片", impact: "供给端扩张" },
      { date: "2026.09", event: "Rubin Ultra HBM从768GB降至192GB(8-Hi),三星配合开发8层HBM", impact: "产品调整" }
    ],
    // 长期供应协议
    longTermDeals: [
      { parties: "SK Hynix ↔ 英伟达等美国科技公司", value: "7500亿美元", duration: "至2030年", note: "长期存储芯片供应" },
      { parties: "三星 ↔ 博通", value: "2000亿美元", duration: "多年期", note: "合作备忘录" },
      { parties: "英伟达 ↔ SK集团", value: "5000亿美元+", duration: "至2030年", note: "AI基础设施计划" },
      { parties: "9家头部客户 ↔ 三大厂", value: "锁定50%+产能", duration: "3-5年", note: "AWS/Azure/Google Cloud等" }
    ]
  },

  // ============================================================
  // 7. 云厂商需求数据
  // ============================================================
  cloud: {
    // 四大云厂商季度CAPEX (十亿美元)
    capex: [
      // 2023
      { quarter: "2023Q1", aws: 14.9, microsoft: 10.8, google: 7.9, meta: 7.0 },
      { quarter: "2023Q2", aws: 15.9, microsoft: 12.0, google: 8.0, meta: 7.5 },
      { quarter: "2023Q3", aws: 12.5, microsoft: 11.2, google: 8.6, meta: 6.8 },
      { quarter: "2023Q4", aws: 13.9, microsoft: 13.4, google: 11.0, meta: 9.4 },
      // 2024
      { quarter: "2024Q1", aws: 17.6, microsoft: 14.0, google: 12.0, meta: 7.0 },
      { quarter: "2024Q2", aws: 22.0, microsoft: 16.7, google: 13.2, meta: 8.5 },
      { quarter: "2024Q3", aws: 22.6, microsoft: 20.1, google: 13.0, meta: 9.2 },
      { quarter: "2024Q4", aws: 26.3, microsoft: 22.6, google: 15.7, meta: 9.8 },
      // 2025
      { quarter: "2025Q1", aws: 24.5, microsoft: 21.0, google: 17.2, meta: 11.2 },
      { quarter: "2025Q2", aws: 28.0, microsoft: 25.0, google: 20.0, meta: 14.0 },
      { quarter: "2025Q3", aws: 32.0, microsoft: 29.0, google: 23.0, meta: 16.5 },
      { quarter: "2025Q4", aws: 38.0, microsoft: 35.0, google: 28.0, meta: 20.0 },
      // 2026
      { quarter: "2026Q1", aws: 45.0, microsoft: 38.0, google: 35.0, meta: 25.0 },
      { quarter: "2026Q2", aws: 54.2, microsoft: 41.0, google: 44.9, meta: 31.1, note: "合计1712亿美元,同比大幅增长" },
      { quarter: "2026Q3*", aws: 62.0, microsoft: 48.0, google: 52.0, meta: 36.0, forecast: true, note: "预估: Vera Rubin量产推动,五大巨头全年约8300亿" }
    ],
    // 2026全年CAPEX指引
    capexGuidance2026: [
      { company: "Amazon/AWS", guidance: "约2200亿美元", note: "从2000亿上调" },
      { company: "Alphabet/Google", guidance: "1950-2050亿美元", note: "从1800-1900亿上调" },
      { company: "Microsoft", guidance: "约1750亿美元", note: "会计调整后" },
      { company: "Meta", guidance: "1300-1450亿美元", note: "下限从1250亿上调" },
      { company: "Oracle", guidance: "约1000亿美元+", note: "AI基础设施投资" }
    ],
    // 摩根士丹利预测
    morganStanleyForecast: {
      "2026": "约8000亿美元 (五大巨头合计)",
      "2027": "超过1.1万亿美元",
      note: "2026年几乎是2025年的两倍,是2024年的三倍"
    },
    // 存储占云厂商资本支出比重
    storageShareOfCapex: {
      "2026": 47,
      "2027": 68,
      note: "DRAM+NAND合计,2027年每投入100元近70元流向存储"
    },
    // 自研AI芯片HBM用量
    customChips: [
      { company: "Google", chip: "TPU v5p", hbmCapacity: "95GB", note: "2023年部署" },
      { company: "Google", chip: "TPU v6 Trillium", hbmCapacity: "32GB", note: "2024年,小芯片设计" },
      { company: "Google", chip: "TPU v7 Ironwood", hbmCapacity: "192GB HBM3E", note: "2025年,峰值算力4614 TFLOPS,较v5p提升10倍" },
      { company: "Google", chip: "TPU v8", hbmCapacity: "待公开", note: "2026-2027,训练/推理分离架构" },
      { company: "AWS", chip: "Trainium2", hbmCapacity: "96GB(预估)", note: "2024年量产" },
      { company: "AWS", chip: "Trainium3", hbmCapacity: "128GB(预估)", note: "2025年,3nm工艺,百万级集群" },
      { company: "AWS", chip: "Trainium4", hbmCapacity: "待公开", note: "2026-2027,对标Rubin" },
      { company: "Meta", chip: "MTIA v2", hbmCapacity: "128GB(预估)", note: "2025年,推理优化" },
      { company: "Microsoft", chip: "Maia 100", hbmCapacity: "未公开", note: "2024年,部分HBM" },
      { company: "Meta", chip: "与AMD合作MI450", hbmCapacity: "432GB HBM4", note: "2026年,6吉瓦级部署" }
    ],
    // 2026年全球超大规模云厂商AI基础设施资本支出
    globalAIInfra: {
      "2026": "8300亿美元",
      growth: "+79% YoY",
      note: "IDC统计:一季度全球AI基础设施支出897亿美元,同比+33%"
    }
  },

  // ============================================================
  // 8. 竞争格局
  // ============================================================
  landscape: {
    // DRAM 市占率 (季度, %)
    dramMarketShare: [
      { quarter: "2023Q4", skHynix: 31.5, samsung: 44.4, micron: 21.2 },
      { quarter: "2024Q1", skHynix: 33.0, samsung: 42.0, micron: 21.5 },
      { quarter: "2024Q2", skHynix: 34.5, samsung: 40.5, micron: 21.8 },
      { quarter: "2024Q3", skHynix: 35.5, samsung: 39.0, micron: 22.0 },
      { quarter: "2024Q4", skHynix: 36.0, samsung: 37.5, micron: 22.2 },
      { quarter: "2025Q1", skHynix: 36.2, samsung: 36.0, micron: 21.5, note: "SK Hynix首次登顶" },
      { quarter: "2025Q2", skHynix: 36.5, samsung: 32.7, micron: 21.8 },
      { quarter: "2025Q3", skHynix: 34.1, samsung: 33.7, micron: 21.5 },
      { quarter: "2025Q4", skHynix: 32.9, samsung: 36.6, micron: 21.2, note: "三星HBM4放量重夺第一" },
      { quarter: "2026Q1", skHynix: 33.5, samsung: 36.0, micron: 21.8 },
      { quarter: "2026Q2", skHynix: 34.2, samsung: 35.5, micron: 22.0 }
    ],
    // HBM 市占率 (年度, %, 窄口径HBM成品)
    hbmMarketShare: [
      { year: 2023, skHynix: 53, samsung: 38, micron: 9 },
      { year: 2024, skHynix: 52, samsung: 35, micron: 13 },
      { year: 2025, skHynix: 50, samsung: 34, micron: 16 },
      { year: 2026, skHynix: 54, samsung: 28, micron: 18, note: "美银预测:SK Hynix HBM4出货份额" }
    ],
    // HBM4 出货份额预测 (美银, 2026)
    hbm4Share: [
      { supplier: "SK Hynix", share: 54, note: "英伟达核心供应商,良率交付领先" },
      { supplier: "Samsung", share: 28, note: "HBM4快速爬坡,拿下AMD/部分云厂订单" },
      { supplier: "Micron", share: 18, note: "2026年HBM4累计销售额突破10亿美元" }
    ],
    // 技术路线对比
    techRoadmap: [
      { supplier: "SK Hynix", hbm3: "量产(2022)", hbm3e: "量产(2024)", hbm4: "量产(2025.09)", hbm4e: "2027规划", hbm5: "2029规划", advantage: "良率领先,NVIDIA核心供应商,1c nm DRAM节点" },
      { supplier: "Samsung", hbm3: "量产(2023)", hbm3e: "量产(2024)", hbm4: "量产(2026Q1)", hbm4e: "2027规划", hbm5: "2029规划", advantage: "产能规模最大,全产业链优势,1c nm DRAM节点" },
      { supplier: "Micron", hbm3: "未参与", hbm3e: "量产(2024)", hbm4: "量产(2026)", hbm4e: "2028规划", hbm5: "2030规划", advantage: "北美客户优势,美国本土产能,1β nm DRAM节点" }
    ],
    // 客户绑定关系
    customerBinding: [
      { supplier: "SK Hynix", customers: ["NVIDIA (核心)", "Google (HBM3E第一供应商)", "博通"], note: "7500亿美元长期协议" },
      { supplier: "Samsung", customers: ["AMD", "Intel", "博通", "部分云厂"], note: "2000亿美元与博通合作备忘录" },
      { supplier: "Micron", customers: ["北美云客户", "NVIDIA (补充供应商)"], note: "2026年HBM产能全部售罄" }
    ]
  },

  // ============================================================
  // 9. HBM 市场规模预测 (美银)
  // ============================================================
  marketSize: {
    // 窄口径:仅HBM成品营收 (十亿美元)
    hbmRevenue: [
      { year: 2023, revenue: 4.3, note: "AI需求爆发起点" },
      { year: 2024, revenue: 12.0, note: "H100放量" },
      { year: 2025, revenue: 64.6, note: "美银预测" },
      { year: 2026, revenue: 269.4, yoy: "+317%", note: "HBM4量产" },
      { year: 2027, revenue: 485.0, yoy: "+43%", note: "HBM4E导入" },
      { year: 2028, revenue: 627.3, yoy: "+29%", note: "推理需求加速" },
      { year: 2029, revenue: 724.2, yoy: "+15.4%", note: "增长趋稳" },
      { year: 2030, revenue: 836.1, note: "长期空间" }
    ],
    // 宽口径:含HBM+服务器专用DRAM (十亿美元)
    aiMemoryRevenue: [
      { year: 2025, revenue: 35.0 },
      { year: 2026, revenue: 120.0 },
      { year: 2027, revenue: 200.0 },
      { year: 2028, revenue: 280.0 },
      { year: 2029, revenue: 350.0 },
      { year: 2030, revenue: 246.0, note: "宽口径含推理DDR+CXL内存池" }
    ],
    // HBM 毛利率
    hbmGrossMargin: {
      range: "45%-60%",
      compare: "通用DRAM 15%-25%",
      note: "2026-2027三大厂净利润增量70%+由HBM贡献"
    }
  },

  // ============================================================
  // 10. 供需平衡表
  // ============================================================
  supplyDemand: {
    // 季度供需平衡 (供需缺口率: 正=供不应求, 负=供大于求)
    quarterly: [
      { quarter: "2023Q1", supply: 2.8, demand: 2.65, gap: -5.2, note: "去库存阶段" },
      { quarter: "2023Q2", supply: 3.0, demand: 2.88, gap: -3.8, note: "需求回暖" },
      { quarter: "2023Q3", supply: 3.5, demand: 3.58, gap: -2.4, note: "AI需求井喷" },
      { quarter: "2023Q4", supply: 4.0, demand: 4.06, gap: 1.5, note: "转为供不应求" },
      { quarter: "2024Q1", supply: 4.5, demand: 4.69, gap: 4.2 },
      { quarter: "2024Q2", supply: 5.0, demand: 5.38, gap: 7.5 },
      { quarter: "2024Q3", supply: 5.5, demand: 6.04, gap: 9.8 },
      { quarter: "2024Q4", supply: 6.0, demand: 6.67, gap: 11.2 },
      { quarter: "2025Q1", supply: 6.5, demand: 6.55, gap: 0.8, note: "Q1季节性收敛" },
      { quarter: "2025Q2", supply: 7.0, demand: 7.71, gap: 10.2 },
      { quarter: "2025Q3", supply: 7.8, demand: 8.78, gap: 12.5 },
      { quarter: "2025Q4", supply: 8.5, demand: 9.76, gap: 14.8 },
      { quarter: "2026Q1", supply: 9.2, demand: 10.72, gap: 16.5 },
      { quarter: "2026Q2", supply: 10.0, demand: 11.82, gap: 18.2, note: "缺口持续扩大" },
      { quarter: "2026Q3*", supply: 11.0, demand: 13.20, gap: 20.0, forecast: true, note: "预估: Vera Rubin量产推动需求" }
    ],
    // 年度供需平衡
    yearly: [
      { year: 2021, balance: "供大于求", gap: "-8%" },
      { year: 2022, balance: "供大于求", gap: "-5%" },
      { year: 2023, balance: "转为短缺", gap: "-2.4%→+1.5%" },
      { year: 2024, balance: "严重短缺", gap: "+8%" },
      { year: 2025, balance: "极度短缺", gap: "+12%" },
      { year: 2026, balance: "缺口扩大", gap: "+18%" },
      { year: 2027, balance: "缺口收窄(预期)", gap: "+10%(预估)", note: "新晶圆厂下半年陆续投产" }
    ]
  },

  // ============================================================
  // 11. 最新动态时间轴
  // ============================================================
  latestNews: [
    { date: "2026-09-05", title: "美光计划年底前将HBM月产能提升至10万片,三星/SK海力士各保持15-20万片", category: "扩产", impact: "高" },
    { date: "2026-09-03", title: "SemiAnalysis:Rubin Ultra HBM从768GB降至192GB(8-Hi),三星配合开发8层HBM", category: "技术", impact: "中" },
    { date: "2026-08-31", title: "Gartner上修2026年全球存储营收至8373亿美元,占半导体市场54%", category: "市场", impact: "高" },
    { date: "2026-08-30", title: "存储价格超越一颗顶级SoC！Gartner上修2026年营收至8373亿美元", category: "市场", impact: "高" },
    { date: "2026-08-27", title: "英伟达FY27Q2:营收962亿(+106% YoY),数据中心890亿(+117%),Vera Rubin量产", category: "需求", impact: "高" },
    { date: "2026-08-26", title: "TrendForce:存储占云厂商资本支出2027年将达68%", category: "价格", impact: "高" },
    { date: "2026-08-25", title: "全球科技企业竞逐存储芯片:三大厂2026合计投入近1200亿美元", category: "扩产", impact: "高" },
    { date: "2026-08-22", title: "英伟达宣布2027年起AI服务器涨价超15%,因HBM成本飙升", category: "价格", impact: "高" },
    { date: "2026-08-20", title: "Google发布TPU v7 Ironwood:192GB HBM3E,峰值算力较v5p提升10倍", category: "需求", impact: "中" },
    { date: "2026-08-19", title: "大摩:Q3 DDR4涨50%、Q4再涨10%,SLC NAND每季涨超50%,HBM挤压消费级产能", category: "价格", impact: "高" },
    { date: "2026-07-06", title: "美银发布HBM完整预测:2026年269亿美元,2030年836亿美元", category: "市场", impact: "高" },
    { date: "2026-06-03", title: "SK Hynix宣布五年产能翻倍计划,存储超级周期持续", category: "扩产", impact: "高" },
    { date: "2026-03-19", title: "三星HBM4放量重夺DRAM市场第一,市占率36.6%", category: "竞争", impact: "中" },
    { date: "2026-02-25", title: "NVIDIA FY2026全年收入2159亿美元,数据中心收入1937亿", category: "需求", impact: "高" },
    { date: "2025-12-19", title: "2026年HBM市场关键:HBM4规模量产,DRAM占比约31%", category: "市场", impact: "高" }
  ],

  // ============================================================
  // 12. 看空观点与风险仪表盘
  // 数据来源: 公开新闻 / 研报 / 社交媒体 / 财经媒体
  // 整理时间: 2026-09-07
  // ============================================================
  bearishViews: {
    meta: {
      version: "1.0",
      lastUpdate: "2026-09-07",
      dataSources: [
        "Ed Zitron - 'Let AI Burn' (2026.07)",
        "高志凯 - AI泡沫分析 (2026.07)",
        "Bill Dudley - 彭博观点 (2026.08.24)",
        "Michael Hartnett - 美银首席策略师 (2026.01-08)",
        "大摩(Morgan Stanley) - HBM供需报告 (2026.04)",
        "德银(Deutsche Bank) - 存储通胀报告 (2026.06)",
        "美银(BofA) - SK Hynix产能分析 (2026.07)",
        "三星/SK Hynix 内部扩产策略报道 (2026.03-06)",
        "36Kr/新浪财经/百家号 - SRAM/LPU技术路线分析 (2026.01-09)",
        "大摩 - 中国存储重塑全球竞争格局 (2026.08.30)",
        "高盛交易员预警 - 存储芯片下行风险 (2026.06)"
      ],
      disclaimer: "本页面所有观点均来自公开来源整理，仅供研究参考，不构成投资建议，不代表看板作者立场。"
    },

    // 五维风险评分 (0-100, 越高风险越大)
    riskScores: {
      demand: { score: 78, label: "需求端", color: "#e74c3c",
        summary: "AI投资回报率严重不足，五大巨头投入5600亿但收入仅350亿，泡沫破裂窗口2026H2-2027H1" },
      supply: { score: 62, label: "供给端", color: "#e67e22",
        summary: "三星/SK Hynix主动放缓扩产，2028年DRAM短缺或趋于缓解，产能过剩拐点隐现" },
      price: { score: 70, label: "价格端", color: "#f39c12",
        summary: "存储涨价已传导至宏观通胀，美国电子PPI同比+26.9%，上游瓶颈向更上游转移" },
      valuation: { score: 75, label: "估值/资本开支", color: "#9b59b6",
        summary: "Shiller CAPE约41倍接近1999年泡沫，AI capex由债务支撑，资本效率或2027年恶化" },
      tech: { score: 55, label: "技术替代", color: "#2980b9",
        summary: "SRAM/LPU推理芯片+CXL内存池+光互连长期降低HBM依赖，中国存储2028年或动摇寡头格局" }
    },

    // 需求端看空观点
    demand: [
      {
        person: "Ed Zitron",
        role: "科技评论人 / Where's Your Ed At 博客作者",
        date: "2026-07",
        title: "AI泡沫本质是'OpenAI泡沫'，一旦失败将引发连锁崩盘",
        view: "发布1.5万字长文《Let AI Burn》，称AI泡沫本质是'OpenAI泡沫'。OpenAI 2025年营收130.7亿美元但总成本远超营收，是'系统重要性机构'——一旦失败将如雷曼兄弟引发连锁崩盘。AI行业整体烧钱速度远超收入增长，投资者终将清醒。",
        source: "Ed Zitron《Let AI Burn》原文",
        sourceUrl: "https://www.wheresyoured.at/",
        impact: "高"
      },
      {
        person: "高志凯",
        role: "宏观分析师",
        date: "2026-07",
        title: "AI泡沫破裂窗口2026H2-2027H1，破坏力是互联网泡沫的10倍",
        view: "五大科技巨头AI累计投入5600亿美元但实际收入仅350亿美元，投入产出比16:1。AI泡沫破裂窗口在2026下半年至2027上半年，破坏力可能是2000年互联网泡沫的10倍。与互联网泡沫不同，AI泡沫由企业而非散户驱动，一旦企业削减开支将引发更大规模连锁反应。",
        source: "公开新闻报道",
        sourceUrl: "",
        impact: "高"
      },
      {
        person: "Bill Dudley",
        role: "前纽约联邦储备银行行长 / 前高盛合伙人",
        date: "2026-08-24",
        title: "AI投资热已达顶峰，泡沫或2027年底前破裂",
        view: "AI投资热已达顶峰，当前增速无法持续——2027年建筑工人、发电、芯片制造能力不足以支撑同等规模增长。一旦增速放缓，投资者将重新评估AI投资回报，引发估值修正。CAPE约41倍接近历史极值。",
        source: "彭博观点专栏",
        sourceUrl: "",
        impact: "高"
      },
      {
        person: "高盛交易员 Ippei Yamaura",
        role: "高盛日本交易员",
        date: "2026-06-29",
        title: "科技股创纪录4标准差抛售，存储芯片板块面临结构性压力",
        view: "科技股经历创纪录的4个标准差抛售，起因为韩国存储股率先下挫。OpenAI考虑将IPO推迟至2027年并下调1万亿美元估值目标，令市场信心受挫。存储芯片板块面临结构性压力而非短期波动。",
        source: "高盛交易员报告",
        sourceUrl: "https://zhuanlan.zhihu.com/p/2055012824984844013",
        impact: "中"
      }
    ],

    // 供给端看空观点
    supply: [
      {
        person: "三星电子",
        role: "全球最大存储芯片制造商",
        date: "2026-03",
        title: "内部预计DRAM短缺将于2028年前后趋于缓解，主动放缓扩产",
        view: "三星内部预计DRAM短缺将于2028年前后趋于缓解，主动放缓扩产节奏避免过度扩张。在HBM4量产中采取稳健策略，不盲目追高产能，保留灵活性应对需求变化。",
        source: "韩国媒体 THE ELEC / 行业报道",
        sourceUrl: "",
        impact: "高"
      },
      {
        person: "SK Hynix",
        role: "全球第二大存储芯片制造商 / HBM市场份额第一",
        date: "2026-06",
        title: "放缓HBM4量产扩张，部分产能转向通用DRAM",
        view: "放缓HBM4量产扩张节奏，将部分产能留给通用DRAM——因DRAM盈利能力反超HBM。表明HBM并非唯一高利润路径，存储厂商自身开始对HBM过度集中的产能配置进行再平衡。",
        source: "行业报道",
        sourceUrl: "",
        impact: "高"
      },
      {
        person: "美银(BofA) Vivek Arya团队",
        role: "美银半导体首席分析师",
        date: "2026-07",
        title: "SK Hynix 2028年实际新增产能或仅为原计划的1/6",
        view: "SK Hynix 2028年实际新增产能可能仅为原计划的1/6，韩国'2030年产能翻倍'目标几近落空。产能扩张受制于资本、工艺、厂房和基础设施多重限制，扩产周期24-36个月意味着短期供给难以快速释放。",
        source: "美银全球存储超级周期报告",
        sourceUrl: "",
        impact: "高"
      },
      {
        person: "韩国投资者",
        role: "韩国本土机构投资者",
        date: "2026-07",
        title: "存储芯片过剩拐点似乎就在眼前，担忧企业举债推进AI基建",
        view: "韩国投资者担忧存储芯片过剩拐点似乎就在眼前，对韩国企业举债大规模推进AI基建持谨慎态度。本土投资者对存储超级周期的持续性持更悲观态度，与海外分析师形成鲜明对比。",
        source: "公开新闻报道",
        sourceUrl: "",
        impact: "中"
      },
      {
        person: "大摩(Morgan Stanley)",
        role: "全球投行",
        date: "2026-08-30",
        title: "2028年是中国存储重塑全球格局的关键拐点",
        view: "2028年前AI红利和中国国内需求将缓冲冲击；2028年后中国厂商体量可能足以动摇寡头垄断的供应纪律，将全球存储行业推入更低利润率、更高资本强度、更激烈竞争的新常态。长鑫存储和长江存储正重新加入竞争。",
        source: "大摩深度报告《中国存储如何重塑全球竞争格局》",
        sourceUrl: "https://baijiahao.baidu.com/s?id=1874908657060689114",
        impact: "高"
      }
    ],

    // 价格端看空观点
    price: [
      {
        person: "大摩(Morgan Stanley)",
        role: "全球投行",
        date: "2026-04",
        title: "HBM供给充足率被压到2%，但2028年前后将出现前所未有的大规模资本开支",
        view: "当前HBM供给充足率被压到2%（极度短缺），但2028年前后可能出现前所未有的大规模资本开支释放。瓶颈不会消失而是推向更上游——从HBM到先进封装，从先进封装到TSV设备，从设备到材料。",
        source: "大摩HBM供需报告",
        sourceUrl: "",
        impact: "中"
      },
      {
        person: "德银(Deutsche Bank)",
        role: "全球投行",
        date: "2026-06",
        title: "存储涨价已传导至宏观通胀，美国电子PPI同比涨26.9%",
        view: "存储涨价已从芯片行业问题演变为宏观经济变量。美国电子PPI同比涨26.9%，存储危机正从半导体行业向更广泛的经济领域传导。如果持续，将引发货币政策反应，间接抑制AI投资。",
        source: "德银存储通胀报告",
        sourceUrl: "",
        impact: "高"
      }
    ],

    // 估值与资本开支看空观点
    valuation: [
      {
        person: "Bill Dudley",
        role: "前纽约联邦储备银行行长 / 前高盛合伙人",
        date: "2026-08-24",
        title: "Shiller CAPE约41倍，仅略低于1999年互联网泡沫44倍",
        view: "Shiller CAPE约41倍（长期均值17倍），仅略低于1999年互联网泡沫44倍。实际股权风险溢价约1.1%，不到2010年以来均值的一半。市场估值极度拉伸，一旦AI增长预期下修，估值修正幅度可能非常剧烈。",
        source: "彭博观点专栏",
        sourceUrl: "",
        impact: "高"
      },
      {
        person: "Michael Hartnett",
        role: "美银(BofA)首席投资策略师",
        date: "2026-01 ~ 2026-08",
        title: "AI capex狂潮由债务支撑，2026年将迎AI债券抛售潮",
        view: "AI capex狂潮由债务而非盈利支撑，甲骨文CDS升至两年新高。一旦有科技巨头削减开支将引发'轮动海啸'。策略建议：做多经济繁荣、做空AI泡沫。2026年将迎来AI债券抛售潮，企业债利差扩大将率先发出预警。",
        source: "美银Flow Show周报 / 多期报告",
        sourceUrl: "",
        impact: "高"
      },
      {
        person: "券商研报对比分析",
        role: "多家券商综合",
        date: "2026-09",
        title: "2026年类比1999年科网泡沫，Hyperscaler资本效率或2027年恶化",
        view: "2026年类比1999年科网泡沫，Hyperscaler类比当年电信运营商。2027年Hyperscaler的资本使用效率/边际资本产出/EBITDA/Capex可能恶化，正如2000-2001年电信运营商在过度投资后资本回报急剧下降。历史上每一次'超级周期'最终都以产能过剩和价格崩盘收场。",
        source: "多家券商研报综合",
        sourceUrl: "",
        impact: "中"
      }
    ],

    // 技术替代看空观点
    tech: [
      {
        person: "Groq / 英伟达",
        role: "AI推理芯片公司 / 200亿美元被英伟达收购",
        date: "2026-01 ~ 2026-03",
        title: "LPU采用SRAM架构，推理场景可减少对HBM的依赖",
        view: "英伟达以200亿美元收购Groq，其LPU(语言处理单元)采用大容量片上SRAM替代HBM架构，推理吞吐量/功耗比提升35倍。黄仁勋本人表示'如果一切都能装进SRAM，确实不需要HBM'。虽然SRAM硅片面积是DRAM的5-10倍，但在推理专用场景下，SRAM-first架构可显著降低HBM用量。AI从训练转向推理的趋势下，LPU可能蚕食部分GPU+HBM市场。",
        source: "36Kr / 新浪财经 / 百家号 / GTC 2026报道",
        sourceUrl: "https://36kr.com/p/3635766845293828",
        impact: "中"
      },
      {
        person: "三星 CXL 3.1 产品线",
        role: "存储芯片厂商 / CXL联盟核心成员",
        date: "2026-05",
        title: "CXL内存池化技术实现内存解耦，降低对HBM的单一依赖",
        view: "三星计划2026Q4量产基于CXL 3.1协议的CMM-D内存模块。CXL(Compute Express Link)允许GPU通过高速互连访问远端内存池，实现内存解耦和共享。在推理和边缘AI场景中，CXL内存池可作为HBM的补充方案，降低单芯片对HBM堆叠容量的刚性需求。CXL从'可选走向必选'，长期将改变AI计算的内存架构。",
        source: "百家号 / CSDN / 澎湃新闻",
        sourceUrl: "https://baijiahao.baidu.com/s?id=1865595261160762774",
        impact: "中"
      },
      {
        person: "CPO(共封装光学)技术",
        role: "光互连技术路线",
        date: "2026-03",
        title: "光互连替代铜互连，长期可改变芯片间数据传输架构",
        view: "CPO(Co-Packaged Optics)将光收发器与交换芯片共封装，大幅提升带宽密度和能效。小摩报告指出中短期内CPO采用预期可能过高，但长期来看光互连将改变数据中心架构，可能减少对高密度HBM堆叠的依赖。英伟达Vera Rubin平台已在推进CPO方向。",
        source: "小摩GTC 2026前瞻报告",
        sourceUrl: "",
        impact: "低"
      },
      {
        person: "中国存储厂商(长鑫/长存)",
        role: "国产存储芯片厂商",
        date: "2026-08-30",
        title: "2028年后中国厂商体量或足以动摇寡头垄断供应纪律",
        view: "大摩报告指出，中国存储厂商正将国家支持和国内需求转化为制造规模。2028年将是关键拐点——此后中国厂商体量可能足以动摇现有寡头垄断的供应纪律，将全球存储行业推入更低利润率、更高资本强度、更激烈竞争的新常态。长鑫存储和长江存储正重新加入竞争，竞争重心从'制造最快的DRAM'转向'建设足够产能'。",
        source: "大摩《中国存储如何重塑全球竞争格局》",
        sourceUrl: "https://baijiahao.baidu.com/s?id=1874908657060689114",
        impact: "中"
      }
    ],

    // 时间轴 (所有观点按时间倒序)
    timeline: [
      { date: "2026-09", person: "券商研报对比", dimension: "估值", title: "2026年类比1999年科网泡沫，Hyperscaler资本效率或2027年恶化" },
      { date: "2026-08-30", person: "大摩", dimension: "供给", title: "2028年是中国存储重塑全球格局的关键拐点" },
      { date: "2026-08-24", person: "Bill Dudley", dimension: "需求+估值", title: "AI投资热已达顶峰，泡沫或2027年底前破裂；CAPE约41倍接近1999年" },
      { date: "2026-07", person: "Ed Zitron", dimension: "需求", title: "AI泡沫本质是'OpenAI泡沫'，一旦失败将如雷曼兄弟引发连锁崩盘" },
      { date: "2026-07", person: "高志凯", dimension: "需求", title: "AI泡沫破裂窗口2026H2-2027H1，破坏力是互联网泡沫的10倍" },
      { date: "2026-07", person: "美银(BofA)", dimension: "供给", title: "SK Hynix 2028年实际新增产能或仅为原计划的1/6" },
      { date: "2026-07", person: "韩国投资者", dimension: "供给", title: "存储芯片过剩拐点似乎就在眼前，担忧举债推进AI基建" },
      { date: "2026-06-29", person: "高盛交易员", dimension: "需求", title: "科技股创纪录4标准差抛售，存储芯片板块面临结构性压力" },
      { date: "2026-06", person: "SK Hynix", dimension: "供给", title: "放缓HBM4量产扩张，部分产能转向通用DRAM" },
      { date: "2026-06", person: "德银", dimension: "价格", title: "存储涨价已传导至宏观通胀，美国电子PPI同比涨26.9%" },
      { date: "2026-05", person: "三星 CXL", dimension: "技术", title: "CXL 3.1内存池化技术量产，降低对HBM单一依赖" },
      { date: "2026-04", person: "大摩", dimension: "价格", title: "HBM供给充足率仅2%，但2028年将出现大规模资本开支释放" },
      { date: "2026-03", person: "三星", dimension: "供给", title: "内部预计DRAM短缺2028年趋于缓解，主动放缓扩产" },
      { date: "2026-03", person: "Groq/英伟达", dimension: "技术", title: "LPU采用SRAM架构，推理场景可减少对HBM的依赖" },
      { date: "2026-01 ~ 2026-08", person: "Michael Hartnett", dimension: "估值", title: "AI capex狂潮由债务支撑，2026年将迎AI债券抛售潮" }
    ]
  }
};

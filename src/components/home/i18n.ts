import { useCallback, useEffect, useState } from "react";

export type Lang = "en" | "zh";

const LANG_KEY = "agibot-lang";

export const i18nDict: Record<string, { en: string; zh: string }> = {
  "nav.dataset": { en: "Dataset", zh: "数据集" },
  "nav.multi_tasks": { en: "Tasks", zh: "多样化任务" },
  "nav.whole_machine": { en: "Platform", zh: "整机" },
  "nav.dexterous_hand": { en: "Dexterous Hand", zh: "灵巧手" },
  "nav.teleoperation": { en: "Teleoperation", zh: "遥操设备" },
  "nav.stats": { en: "Dataset", zh: "数据集" },
  "nav.footer": { en: "Contact", zh: "联系我们" },
  "nav.model": { en: "Model", zh: "模型" },
  "nav.sim": { en: "Simulation", zh: "仿真" },
  "nav.challenge": { en: "Challenge", zh: "挑战赛" },
  "nav.collab": { en: "Collaboration", zh: "业务合作" },
  "nav.mall": { en: "Mall", zh: "商城" },
  "hero.tag": { en: "Linker Hand", zh: "灵巧手" },
  "hero.brand": { en: "DexScale", zh: "DexScale" },
  "hero.image_alt": {
    en: "Linker Hand — dexterous hand and environment",
    zh: "Linker Hand — 灵巧手与场景",
  },
  "hero.title": {
    en: "A Diverse and Large-Scale Dataset for General Vision-Tactile Dexterous Manipulation",
    zh: "首个面向通用机器人策略的大规模学习数据集",
  },
  "hero.watch": { en: "Watch the full video", zh: "观看完整视频" },
  "hero.download": { en: "Download Dataset", zh: "下载数据集" },
  "hero.github": { en: "Github", zh: "Github" },
  "hero.paper": { en: "Paper", zh: "论文" },
  "hero.partners.title": { en: "Affiliations", zh: "合作单位" },
  "hero.partners.lxxqs": { en: "Linkerbot", zh: "灵心巧手" },
  "hero.partners.sjtu": { en: "Shanghai Jiao Tong University", zh: "上海交通大学" },
  "hero.partners.hku": { en: "The University of Hong Kong", zh: "香港大学" },
  "hero.authors.title": { en: "Authors ", zh: "作者" },
  "hero.authors.affil.sjtu": { en: "SJTU", zh: "上海交大" },
  "hero.authors.affil.hku": { en: "HKU", zh: "香港大学" },
  "hero.authors.affil.linker": { en: "Linkerbot", zh: "灵心巧手" },
  "hero.authors.placeholder": {
    en: "To be announced — content coming soon.",
    zh: "穆尧(sjtu) 秦言（hku） 陈天行(hku) 邵彦铭 （sjtu） 苏洋（灵心） 孙煜童（灵心）周浩宇（灵心）",
  },
  "intro.p1": {
    en: "Dexterous manipulation is essential for building general-purpose embodied agents, yet learning such skills remains challenging due to high-dimensional hand control, complex contact dynamics, and the lack of large-scale, high-quality datasets. Existing robot manipulation datasets are often limited to simple grippers, visual observations, single embodiments, or short-horizon tasks, making them insufficient for studying general dexterous manipulation.",
    zh: "灵巧操纵是构建通用具身智能体的核心基础。但由于手部控制维度高、接触动力学复杂，且缺乏大规模、高质量数据集，学习这类灵巧操作技能一直极具挑战。现有的机器人操纵数据集大多局限于简易夹爪、单一视觉观测、单一种类智能体形态，或是短时程任务，难以支撑通用灵巧操纵领域的研究。",
  },
  "intro.p2": {
    en: "In this work, we introduce DexScale, a diverse and large-scale vision-tactile dataset designed for general dexterous robotic manipulation. DexScale supports dexterous hands with different degrees of freedom and provides synchronized multimodal observations, including robot actions, RGB-D visual perception, and in-hand tactile sensing. Built upon a high-fidelity isomorphic data collection system, DexScale captures fine-grained, smooth, and contact-rich manipulation trajectories that are difficult to obtain with conventional teleoperation pipelines.",
    zh: "我们提出 DexScale—— 一款面向通用机器人灵巧操纵的大规模、多场景视觉 - 触觉数据集。DexScale 支持不同自由度的灵巧手，提供机器人动作、RGB-D 视觉感知、手部触觉传感等多模态同步观测数据。依托高保真同构数据采集系统，DexScale 能够采集到精细化、平滑且富含接触交互的操纵轨迹，这类轨迹难以通过传统遥操作方案获取",
  },
  "intro.p3": {
    en: "The dataset covers a broad range of tasks and scenarios, including tool use, dexterous object manipulation, diverse grasping, bimanual coordination, long-horizon execution, and interactions in varied environments. By scaling dexterous manipulation data across embodiments, modalities, tasks, and scenes, DexScale provides a foundation for training and evaluating policies that integrate spatial perception, tactile feedback, and precise hand control. Together, DexScale aims to bridge the gap between large-scale robot learning and fine-grained dexterous control, offering a data foundation for developing general-purpose vision-tactile manipulation policies.",
    zh: "100 台机器人采集的 100 万+ 轨迹，覆盖五大领域 100+ 真实场景。配备视触觉传感器、灵巧手与移动双臂机器人等前沿多模态硬件。",
  },
  "highlights.title": { en: "Linker Hand Highlights", zh: "项目亮点" },
  "h1.title": { en: "Cutting-Edge Sensor and Hardware Design", zh: "前沿传感与硬件设计" },
  "h1.desc": {
    en: "Visual tactile sensors, 6-DoF dexterous hands and whole-body controlled mobile dual-arm robots.",
    zh: "该数据集覆盖丰富的任务与场景，包括工具使用、物体灵巧操纵、多样化抓取、双臂协同、长时序任务执行以及多环境交互等。通过在智能体形态、感知模态、任务类型、应用场景四个维度扩充灵巧操纵数据规模，DexScale 为融合空间感知、触觉反馈与高精度手部控制的策略模型，提供了训练与评测基础。整体而言，DexScale 旨在弥合大规模机器人学习与精细化灵巧控制之间的鸿沟，为研发通用视觉 - 触觉操纵策略筑牢数据根基。",
  },
  "h2.title": { en: "Wide-Spectrum Scenario Coverage", zh: "广谱场景覆盖" },
  "h2.desc": {
    en: "100+ real-world scenarios spanning five major industries.",
    zh: "覆盖五大行业的 100+ 真实复刻场景。",
  },
  "h3.title": { en: "Quality Assurance with Human-in-the-Loop", zh: "人在回路质量保障" },
  "h3.desc": {
    en: "Strict review pipeline ensures enterprise-level data quality.",
    zh: "严格的人工审核流程，保障企业级数据质量。",
  },
  "tasks.title": { en: "Versatile Scenarios", zh: "多样化场景" },
  "tasks.sub": {
    en: "Challenging tasks across 100+ replicated real-life scenarios in five major industries.",
    zh: "覆盖五大行业 100+ 真实场景的挑战性任务。",
  },
  "tasks.cta": { en: "Task Overview", zh: "任务总览" },
  "multi.title": { en: "Versatile Tasks", zh: "多样化任务" },
  "multi.sub": {
    en: "Five challenging manipulation tasks showcasing dexterous capabilities across industrial, domestic, and collaborative scenarios.",
    zh: "五项具有挑战性的操作任务，展示工业、家用及协作场景下的灵巧操作能力",
  },
  "multi.cta": { en: "View more task overview", zh: "查看更多任务概览" },
  "multi.task_word": { en: "Task", zh: "任务" },
  "multi.prev": { en: "Previous task", zh: "上一个任务" },
  "multi.next": { en: "Next task", zh: "下一个任务" },
  "multi.task.thread": { en: "Thread sewing", zh: "穿针引线" },
  "multi.task.tactile": { en: "Visuotactile fine manipulation", zh: "视触觉精细操作" },
  "multi.task.industrial": { en: "Industrial fine manipulation", zh: "工业化精细操作" },
  "multi.task.multi": { en: "Multi-robot collaboration", zh: "多机器人协作" },
  "multi.task.tool": { en: "Dexterous hand tool use", zh: "灵巧手工具使用" },
  "stats.title": { en: "Dataset Statistics", zh: "数据集统计" },
  "stats.sub": {
    en: "Diversity and usability assurance through strategic collection.",
    zh: "通过策略化采集，确保多样性与可用性。",
  },
  "cta.title": { en: "Need customized robotic learning data?", zh: "需要定制机器人学习数据？" },
  "cta.sub": {
    en: "Request your OWN data with the same ENTERPRISE level quality.",
    zh: "申请同等企业级品质的专属数据采集。",
  },
  "cta.btn": { en: "Data Collection Service", zh: "数据采集服务" },
  "hw.title": { en: "Hardware Ecosystem", zh: "硬件生态" },
  "hw.robot": { en: "Buy Robot", zh: "购买机器人" },
  "hw.kit": { en: "Buy Data Collection Kit", zh: "购买采集套件" },
  "faq.title": { en: "FAQ", zh: "常见问题" },
  "footer.contact": {
    en: "For any inquiries, please contact: business@linkerbot.cn",
    zh: "如有任何咨询，请联系：business@linkerbot.cn",
  },
  "footer.join": { en: "Join the Official Wechat Group", zh: "加入官方微信群" },
  "hand.title": { en: "Dexterous Hand Series", zh: "灵巧手产品系列" },
  "hand.desc": {
    en: "Two hands from lightweight deployment to high-DoF precision: linkage drive with CAN/RS485, integrating seamlessly across our humanoid platforms.",
    zh: "两款灵巧手覆盖从轻量化部署到高精度操作的全场景需求，连杆传动设计配合 CAN/RS485 接口，可与人形机器人全系平台无缝集成。",
  },
  "hand.basic_heading": { en: "Basic specifications", zh: "基础参数" },
  "hand.dof_badge": { en: "DOF", zh: "DOF" },
  "hand.label.dof": { en: "Degrees of freedom", zh: "自由度" },
  "hand.label.joints": { en: "Number of joints", zh: "关节数" },
  "hand.label.transmission": { en: "Drive type", zh: "传动方式" },
  "hand.label.control": { en: "Control interface", zh: "控制接口" },
  "hand.label.comm_freq": { en: "Communication rate", zh: "通信频率" },
  "hand.label.weight": { en: "Weight", zh: "重量" },
  "hand.label.max_load": { en: "Max. payload", zh: "最大负载" },
  "hand.label.voltage": { en: "Operating voltage", zh: "工作电压" },
  "hand.label.static_current": { en: "Quiescent current", zh: "静态电流" },
  "hand.label.avg_current": { en: "Avg. no-load motion current", zh: "空载运动平均电流" },
  "hand.label.max_current": { en: "Max. current", zh: "最大电流" },
  "hand.label.repeatability": { en: "Repeat positioning accuracy", zh: "重复定位精度" },
  "hand.label.open_time": { en: "Open/close time", zh: "开合时间" },
  "hand.force.thumb": { en: "Max. thumb tip force", zh: "拇指最大指尖力" },
  "hand.force.four": { en: "Max. four-finger tip force", zh: "四指最大指尖力" },
  "hand.force.five": { en: "Max. five-finger grasp force", zh: "五指最大抓握力" },
  "hand.l20.subtitle": { en: "High-DoF dexterous hand", zh: "高自由度灵巧手" },
  "hand.l6.subtitle": { en: "Lightweight dexterous hand", zh: "轻量化灵巧手" },
  "hand.l20.model": { en: "Linker Hand L20", zh: "Linker Hand L20" },
  "hand.l6.model": { en: "Linker Hand L6", zh: "Linker Hand L6" },
  "hand.l20.alt": {
    en: "Linker Hand L20 dexterous robotic hand",
    zh: "Linker Hand L20 灵巧手机械手",
  },
  "hand.l6.alt": {
    en: "Linker Hand L6 dexterous robotic hand",
    zh: "Linker Hand L6 灵巧手机械手",
  },
  "hand.val.linkage": { en: "Linkage transmission", zh: "连杆传动" },
  "hand.val.can_rs485": { en: "CAN/RS485", zh: "CAN/RS485" },
  "hand.val.l20.dof": { en: "16", zh: "16" },
  "hand.val.l20.joints": {
    en: "21 (16 active + 5 passive)",
    zh: "21（16 主动 + 5 被动）",
  },
  "hand.val.l20.comm": { en: "500 Hz", zh: "500 Hz" },
  "hand.val.l20.weight": { en: "≈1200 g", zh: "≈1200 g" },
  "hand.val.l20.load": { en: "20 kg", zh: "20 kg" },
  "hand.val.l20.voltage": { en: "DC 24V—48V", zh: "DC 24V—48V" },
  "hand.val.l20.static_i": { en: "0.3 A", zh: "0.3 A" },
  "hand.val.l20.avg_i": { en: "0.4 A", zh: "0.4 A" },
  "hand.val.l20.max_i": { en: "1.8 A", zh: "1.8 A" },
  "hand.val.l20.repeat": { en: "±0.2 mm", zh: "±0.2 mm" },
  "hand.val.l20.open": { en: "0.9 s", zh: "0.9 s" },
  "hand.val.l6.dof": { en: "6", zh: "6" },
  "hand.val.l6.joints": {
    en: "11 (6 active + 5 passive)",
    zh: "11（6 主动 + 5 被动）",
  },
  "hand.val.l6.weight": { en: "607 g", zh: "607 g" },
  "hand.val.l6.load": { en: "28 kg", zh: "28 kg" },
  "hand.val.l6.voltage": { en: "DC 24V ±10%", zh: "DC 24V ±10%" },
  "hand.val.l6.static_i": { en: "0.2 A", zh: "0.2 A" },
  "hand.val.l6.avg_i": { en: "0.75 A", zh: "0.75 A" },
  "hand.val.l6.max_i": { en: "1.4 A", zh: "1.4 A" },
  "hand.val.l6.repeat": { en: "<±0.2 mm", zh: "<±0.2 mm" },
  "teleop.title": { en: "Robot teleoperation system", zh: "机器人遥操设备" },
  "teleop.desc": {
    en: "Deep integration with data collection: real-time capture of robot and teleop device telemetry to support reliable data for humanoid foundation model training.",
    zh: "设备可与数据采集系统深度融合，实时采集机器人及遥操设备的运行数据，为人形机器人大模型训练提供可靠数据支撑。",
  },
  "teleop.image_alt": {
    en: "Robot teleoperation hardware",
    zh: "机器人遥操设备",
  },
  "teleop.lta.name": { en: "Teleoperation arm LTA", zh: "遥操臂 LTA" },
  "teleop.lffg.name": { en: "Force-feedback glove LFFG", zh: "力反馈手套 LFFG" },
  "teleop.lta.i1": {
    en: "DoF: 7 per arm, 14 total (dual arms)",
    zh: "自由度配置：单臂 7 个自由度，双臂共计 14 个自由度",
  },
  "teleop.lta.i2": { en: "Single-arm reach: 658 mm", zh: "单臂臂展：658mm" },
  "teleop.lta.i3": {
    en: "Mounting: suspended and chest-worn",
    zh: "穿戴方式：支持悬挂式、胸前式两种穿戴形态",
  },
  "teleop.lta.i4": {
    en: "Rated supply: 24 V, 0.075 A",
    zh: "额定供电：24V，0.075A",
  },
  "teleop.lta.i5": { en: "Device weight: 1.4 kg", zh: "设备重量：1.4Kg" },
  "teleop.lta.i6": {
    en: "Bus: CAN at 1 Mbps",
    zh: "通信方式：CAN 总线通信，传输速率 1Mbps",
  },
  "teleop.lta.i7": { en: "Sampling rate: 200 Hz", zh: "采样频率：200Hz" },
  "teleop.lta.i8": {
    en: "Joint angle resolution: 0.087°",
    zh: "关节角度精度：0.087°",
  },
  "teleop.lffg.i1": {
    en: "Tracking: 21 DoF per hand, high-precision joint angles",
    zh: "运动捕获：单手 21 自由度，支持全关节角度高精度采集",
  },
  "teleop.lffg.i2": {
    en: "Data rate: 100 Hz wired / 30 Hz wireless",
    zh: "数据传输频率：有线模式 100Hz，无线模式 30Hz",
  },
  "teleop.lffg.i3": {
    en: "Power: 5 V USB Type-C",
    zh: "供电方式：5V Type-C 供电",
  },
  "teleop.lffg.i4": { en: "Weight: 390 g", zh: "产品重量：390g" },
  "teleop.lffg.i5": {
    en: "Joint angle accuracy: 0.08°",
    zh: "关节角度捕获精度：0.08°",
  },
  "teleop.lffg.i6": {
    en: "Peak torque: 3.5 kg·cm",
    zh: "最大扭矩输出：3.5kg・cm",
  },
  "teleop.lffg.i7": {
    en: "Compatible with the full Linker Hand lineup",
    zh: "适配性：兼容本公司全系列灵巧手产品",
  },
  "nav.scenarios": { en: "Multimodal Scenarios", zh: "多模态场景" },
  "scenarios.title": { en: "Multimodal Scenarios", zh: "多模态场景" },
  "scenarios.subtitle": {
    en: "Challenging tasks spanning over 100 replicated real-life scenarios across five major industries",
    zh: "跨越五大行业、100多个真实复刻场景的挑战性任务",
  },
  "scenarios.prev": { en: "Previous", zh: "上一个" },
  "scenarios.next": { en: "Next", zh: "下一个" },
  "scenarios.task_word": { en: "Scenario", zh: "场景" },
  "scenarios.bimanual": { en: "Bimanual Tool Utilization", zh: "双手工具使用" },
  "scenarios.moving": { en: "Moving Objects Grasping", zh: "移动物体抓取" },
  "scenarios.tactile": { en: "Visual Tactile Fine-Grained Manipulation", zh: "视触觉细粒度操作" },
  "scenarios.industrial": { en: "Industrial Precision Assembly", zh: "工业精密装配" },
  "scenarios.domestic": { en: "Domestic Service Tasks", zh: "家庭服务任务" },
  "scenarios.play": { en: "Play", zh: "播放" },
  "scenarios.pause": { en: "Pause", zh: "暂停" },
  "scenarios.mute": { en: "Mute", zh: "静音" },
  "scenarios.unmute": { en: "Unmute", zh: "取消静音" },
  "scenarios.fullscreen": { en: "Full screen", zh: "全屏" },
  "scenarios.exit_fullscreen": { en: "Exit full screen", zh: "退出全屏" },
  "scenarios.more_options": { en: "More options", zh: "更多选项" },
};

export const useLang = () => {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const storedLang = window.localStorage.getItem(LANG_KEY);
    if (storedLang === "zh") setLang("zh");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  const t = useCallback((key: string) => i18nDict[key]?.[lang] ?? key, [lang]);

  const toggleLang = useCallback(() => {
    setLang((currentLang) => (currentLang === "en" ? "zh" : "en"));
  }, []);

  return { lang, t, toggleLang };
};

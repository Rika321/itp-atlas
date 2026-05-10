export const DEFAULT_LOCALE = "en";
export const ZH_LOCALE = "zh-CN";
export const LOCALE_STORAGE_KEY = "itp-atlas-locale";

export const LANGUAGE_OPTIONS = [
  {
    value: DEFAULT_LOCALE,
    shortLabel: "EN",
    label: "English",
  },
  {
    value: ZH_LOCALE,
    shortLabel: "中文",
    label: "简体中文",
  },
];

const ZH_TRANSLATIONS = {
  Mouse: "小鼠",
  Human: "人类",
  "C. elegans": "秀丽隐杆线虫",
  "C. briggsae": "布氏隐杆线虫",
  "C. tropicalis": "热带隐杆线虫",
  "🐭 Mouse": "🐭 小鼠",
  "🧑 Human": "🧑 人类",
  "🪱 C. elegans": "🪱 秀丽隐杆线虫",
  "🪱 C. briggsae": "🪱 布氏隐杆线虫",
  "🪱 C. tropicalis": "🪱 热带隐杆线虫",
  "How to Live Longer: A Small-Molecule Atlas": "如何活得更久：小分子干预图谱",
  "How to Live Longer": "如何活得更久",
  "Compare public mouse, worm, fly, killifish, and curated human datasets to see which small-molecule interventions are linked to longer life.":
    "对比公开的小鼠、线虫、果蝇、青鳉鱼和人工整理的人类数据，查看哪些小分子干预与寿命延长相关。",
  "Compare public mouse, worm, fly, killifish, and human Biobank datasets to see which small-molecule interventions are linked to longer life.":
    "对比公开的小鼠、线虫、果蝇、青鳉鱼和人类 Biobank 数据，查看哪些小分子干预与寿命延长相关。",
  "Lifespan Charts": "Lifespan Charts",
  "Mouse Phenome Database": "小鼠表型数据库",
  "eLife killifish source data": "eLife 青鳉鱼源数据",
  "Nature fly source data": "Nature 果蝇源数据",
  "Curated human medication evidence": "人工整理的人类药物证据",
  "Human Biobank medication signals": "人类 Biobank 药物信号",
  "Human UK Biobank project source": "人类 UK Biobank 项目来源",
  "Human UK Biobank Project Source": "人类 UK Biobank 项目来源",
  "Human UK Biobank ACM Interventions": "人类 UK Biobank 全因死亡率干预信号",
  "Loading UK Biobank project source…": "正在加载 UK Biobank 项目来源…",
  "Loading human UK Biobank ACM signals…": "正在加载人类 UK Biobank 全因死亡率信号…",
  "Project source": "项目来源",
  "Cohort support": "队列支持",
  "UK Biobank project": "UK Biobank 项目",
  "UK Biobank project source": "UK Biobank 项目来源",
  "UK Biobank supplement": "UK Biobank 补充表",
  "Human Biobank ACM effect": "人类 Biobank 全因死亡率影响",
  "Human view limited to the UK Biobank project 1246676 page. No medication-specific ACM ranking is shown because the page does not publish drug-level HR results.":
    "人类数据视图仅限 UK Biobank 1246676 项目页面。该页面未发布药物级 HR 结果，因此不显示药物的全因死亡率排名。",
  "Scan the UK Biobank ACM intervention signals, then click any row to inspect the hazard ratio, source table, drug description, and caution notes.":
    "浏览 UK Biobank 全因死亡率信号，然后点击任一条目查看风险比、来源表、药物描述和谨慎解读说明。",
  "Inspect the single allowed UK Biobank project row and its project-source details.":
    "查看当前可用的 UK Biobank 项目条目及其来源细节。",
  "The score marks source coverage for the allowed UK Biobank project page, not an estimated treatment effect.":
    "该分数表示当前可用的 UK Biobank 项目页面来源覆盖度，不代表治疗效应估计。",
  "Missing source": "缺少来源",
  "Allowed source": "可用来源",
  "No project ACM table": "项目未提供全因死亡率表",
  "The allowed UK Biobank project page is a project listing, not a released medication-effect table.":
    "当前可用的 UK Biobank 项目页面是项目列表页，不是已发布的药物效应表。",
  "No ACM HR values are imported while this view is restricted to the project page only.":
    "当该视图仅限项目页面时，不导入全因死亡率 HR 数值。",
  "No ACM table": "无全因死亡率表",
  "ACM table": "全因死亡率表",
  "Smaller row": "数值较小",
  "Larger row": "数值较大",
  "Smaller ACM effect": "较小的全因死亡率影响",
  "Larger ACM effect": "较大的全因死亡率影响",
  "Human Biobank medication signals. Ranked by the reported reduction in all-cause mortality from the UK Biobank hazard ratio.":
    "人类 Biobank 药物信号。按 UK Biobank 风险比所对应的全因死亡率降低幅度排序。",
  "Human Biobank medication signals. Ranked by the reported ACM hazard-ratio effect; positive values indicate lower ACM and negative values indicate higher ACM.":
    "人类 Biobank 药物信号。按报告的全因死亡率风险比影响排序；正值表示全因死亡率降低，负值表示全因死亡率升高。",
  "Human Biobank medication signals. Shows all 406 Data Table 2 N>=500 medication rows plus Figure 5 class rows, ranked by the reported ACM hazard-ratio effect.":
    "人类 Biobank 药物信号。展示 Data Table 2 中全部 406 个 N>=500 药物条目，并加入图 5 类别条目，按报告的全因死亡率风险比影响排序。",
  "Human Biobank medication signals with reported P values, drawn from all 406 Data Table 2 N>=500 medication rows plus Figure 5 class rows and ranked by the reported ACM hazard-ratio effect.":
    "人类 Biobank 药物信号。仅展示报告 P 值的条目，来源包括 Data Table 2 中全部 406 个 N>=500 药物条目及图 5 类别条目，并按报告的全因死亡率风险比影响排序。",
  "A Biobank-only human view of all 406 Data Table 2 N>=500 medication ACM rows plus Figure 5 medication-class rows, ranked by the reported hazard-ratio effect.":
    "仅基于 Biobank 的人类视图，展示 Data Table 2 中全部 406 个 N>=500 药物全因死亡率条目，并加入图 5 药物类别条目，按报告的风险比影响排序。",
  "A Biobank-only human view of ACM rows with reported P values from all 406 Data Table 2 N>=500 medication rows plus Figure 5 medication-class rows, ranked by the reported hazard-ratio effect.":
    "仅基于 Biobank 的人类视图。展示来自 Data Table 2 全部 406 个 N>=500 药物条目及图 5 药物类别条目中报告 P 值的全因死亡率条目，并按报告的风险比影响排序。",
  "Effect is shown as 1 minus the reported ACM hazard ratio. These retrospective Biobank associations do not remove indication or healthy-user confounding.":
    "影响值显示为 1 减去已报告的全因死亡率风险比。这些回顾性 Biobank 关联不能消除适应证或健康使用者混杂。",
  "Effect is shown as 1 minus the reported ACM hazard ratio. Positive values indicate lower ACM; negative values indicate higher ACM. These retrospective Biobank associations do not remove indication or healthy-user confounding.":
    "影响值显示为 1 减去已报告的全因死亡率风险比。正值表示全因死亡率降低；负值表示全因死亡率升高。这些回顾性 Biobank 关联不能消除适应证或健康使用者混杂。",
  "Human Biobank medication signals. Ranked by the amount of Biobank-only follow-up or replication support.":
    "人类 Biobank 药物信号。按仅来自 Biobank 的后续验证或复核支持排序。",
  "Follow-up scores stay inside Biobank-style cohort resources. They are not randomized effect estimates.":
    "后续验证评分仅来自 Biobank 队列资源，并非随机试验效应估计。",
  "UK Biobank 406-medication mortality screen": "UK Biobank 406 种药物死亡率筛查",
  "Rows here are all 406 public Data Table 2 no-concentration medication rows with N>=500 plus the six Figure 5 / Data Table 4 medication-class rows, ranked as 1 minus the reported ACM hazard ratio.":
    "这里展示公开 Data Table 2 中全部 406 个 N>=500、未按浓度区分的药物条目，并加入 6 个图 5 / Data Table 4 药物类别条目，按 1 减去报告的全因死亡率风险比排序。",
  "The source pool contains all 406 public Data Table 2 no-concentration medication rows with N>=500 plus the six Figure 5 / Data Table 4 medication-class rows; the site view displays rows with reported P values and ranks them as 1 minus the reported ACM hazard ratio.":
    "来源集合包含公开 Data Table 2 中全部 406 个 N>=500、未按浓度区分的药物条目，并加入 6 个图 5 / Data Table 4 药物类别条目；本站仅展示报告 P 值的条目，并按 1 减去报告的全因死亡率风险比排序。",
  "Public Aging Cell supplement: all 406 Data Table 2 no-concentration medication ACM rows with N>=500, plus the six Figure 5 / Data Table 4 medication-class rows, ranked as 1 minus the reported ACM hazard ratio. Includes public UK Biobank project provenance; no participant-level UK Biobank data.":
    "公开 Aging Cell 补充材料：Data Table 2 中全部 406 个 N>=500、未按浓度区分的药物全因死亡率条目，并加入 6 个图 5 / Data Table 4 药物类别条目，按 1 减去报告的全因死亡率风险比排序。包含公开 UK Biobank 项目来源信息；不包含参与者级 UK Biobank 数据。",
  "Public Aging Cell supplement source pool: all 406 Data Table 2 no-concentration medication ACM rows with N>=500, plus the six Figure 5 / Data Table 4 medication-class rows. The site view displays rows with reported P values and ranks them as 1 minus the reported ACM hazard ratio. Includes public UK Biobank project provenance; no participant-level UK Biobank data.":
    "公开 Aging Cell 补充材料来源集合：Data Table 2 中全部 406 个 N>=500、未按浓度区分的药物全因死亡率条目，并加入 6 个图 5 / Data Table 4 药物类别条目。本站仅展示报告 P 值的条目，并按 1 减去报告的全因死亡率风险比排序。包含公开 UK Biobank 项目来源信息；不包含参与者级 UK Biobank 数据。",
  "UK Biobank lifespan-modulating drug project": "UK Biobank 寿命调节药物项目",
  "Biobank sources": "Biobank 来源",
  "Public supplement + UKB metadata": "公开补充表 + UKB 元数据",
  "Public supplement + project provenance": "公开补充表 + 项目来源",
  "UKB screen": "UKB 筛查",
  "Public supplement": "公开补充表",
  "Direct supplement row": "补充表原始条目",
  "Direct dose row": "剂量/剂型条目",
  "Direct class row": "药物类别条目",
  "Prescription users": "处方使用者",
  "UK Biobank row N": "UK Biobank 条目 N",
  Dataset: "数据集",
  "Dataset 2": "数据集 2",
  "Dataset 3": "数据集 3",
  "Dataset 4": "数据集 4",
  "Dataset 5": "数据集 5",
  "Data S2 archive": "Data S2 压缩包",
  "Prescription-user N": "处方使用者 N",
  Caution: "解读提醒",
  "ACM result": "全因死亡率结果",
  Signals: "信号",
  Study: "研究",
  "ACM signal": "全因死亡率信号",
  "ACM signals": "全因死亡率信号",
  "Focus signal": "当前信号",
  "Compare Biobank signals": "比较 Biobank 信号",
  WeChat: "微信",
  Venmo: "Venmo",
  "Scan in WeChat": "在微信中扫码",
  "Scan in Venmo": "在 Venmo 中扫码",
  "Use your WeChat QR image here when you are ready to add it.":
    "准备好后可在这里放入你的微信收款二维码。",
  "Drop in your Venmo QR image later without changing the footer code.":
    "后续可直接放入你的 Venmo 二维码，无需修改页脚代码。",
  "Interventions Testing Program": "干预测试计划（ITP）",
  "Comparative Interventions Testing Program": "比较干预测试计划（CITP）",
  "CITP Data Portal": "比较干预测试计划数据门户",
  "Human Medication Evidence Atlas": "人类药物证据图谱",
  "Human Biobank Medication Signals": "人类 Biobank 药物信号",
  "Medication explorer": "药物探索器",
  "Biobank signal explorer": "Biobank 信号探索器",
  "Biobank project explorer": "Biobank 项目探索器",
  "Evidence explorer": "证据探索器",
  "African turquoise killifish": "非洲绿松石鳉",
  "Fruit fly": "果蝇",
  "April 2026": "2026 年 4 月",
  "May 2026": "2026 年 5 月",
  "Public mouse lifespan data from the NIA's Interventions Testing Program. Compare treatments side by side and see which ones helped mice live longer.":
    "来自 NIA 干预测试计划（ITP）的公开小鼠寿命数据。可并排比较不同处理，查看哪些方案让小鼠活得更久。",
  "Public worm lifespan data from CITP. Compare compounds across worm species, strains, and lab conditions.":
    "来自比较干预测试计划（CITP）的公开线虫寿命数据。可跨线虫物种、品系和实验室条件比较化合物。",
  "A ranked list of 10 medication classes with the strongest human evidence for lower overall death risk, based on meta-analyses, population studies, and Mendelian genetics.":
    "基于荟萃分析、人群研究和孟德尔遗传学，对 10 类全因死亡风险降低证据最强的药物进行排序。",
  "A ranked list of 10 medication classes with the strongest human evidence for lower overall death risk, based on meta-analyses, population studies, Mendelian genetics, and medication-wide UK Biobank data.":
    "基于荟萃分析、人群研究、孟德尔遗传学以及 UK Biobank 全药物范围数据，对 10 类全因死亡风险降低证据最强的药物进行排序。",
  "A Biobank-only human view of medication signals linked to all-cause mortality, centered on UK Biobank prescription, primary-care, and death-registry resources.":
    "仅使用 Biobank 数据的人类药物信号视图，聚焦 UK Biobank 处方、初级保健和死亡登记资源中的全因死亡关联。",
  "A UK Biobank-only human view limited to approved research project 1246676. Drug-level ACM rankings are hidden until that project page releases medication-specific results.":
    "仅使用 UK Biobank 已批准研究项目 1246676 的人类数据视图。在该项目页面发布药物级结果前，隐藏药物的全因死亡率排名。",
  "Public killifish lifespan data from a dietary restriction study. Compare restricted feeding with standard feeding across two cohorts.":
    "来自饮食限制研究的公开青鳉鱼寿命数据。可在两个队列中比较限制喂养与标准喂养。",
  "Public fruit-fly lifespan data from dietary restriction experiments. Compare restricted feeding with standard feeding across fly experiments.":
    "来自饮食限制实验的公开果蝇寿命数据。可跨实验比较限制喂养与标准喂养。",
  "gold-standard aging reference": "衰老研究金标准参考",
  "multi-species longevity portal": "跨物种长寿数据门户",
  "human medication evidence": "人类药物证据",
  "human Biobank evidence": "人类 Biobank 证据",
  "vertebrate diet intervention study": "脊椎动物饮食干预研究",
  "public fly diet study": "公开果蝇饮食研究",
  Mice: "小鼠",
  Animals: "动物",
  Sources: "来源",
  Fish: "鱼",
  Flies: "果蝇",
  Intv: "干预",
  "Intv.": "干预",
  Tests: "测试",
  Meds: "药物",
  Signals: "信号",
  "Project rows": "项目条目",
  Cohorts: "队列",
  Projects: "项目",
  Studies: "研究",
  Catalogs: "目录",
  Experiments: "实验",
  cohort: "队列",
  cohorts: "队列",
  study: "研究",
  studies: "研究",
  catalog: "目录",
  catalogs: "目录",
  project: "项目",
  projects: "项目",
  experiment: "实验",
  experiments: "实验",
  "Focus cohort": "当前队列",
  Explorer: "探索器",
  Site: "站点",
  Lab: "实验室",
  Evidence: "证据",
  "UK Biobank project page": "UK Biobank 项目页面",
  "Biobank project row": "Biobank 项目条目",
  "Biobank project rows": "Biobank 项目条目",
  "Focus project": "当前项目",
  "Compare Biobank projects": "比较 Biobank 项目",
  "Allowed Biobank source": "可用的 Biobank 来源",
  Status: "状态",
  "UKB source": "UKB 来源",
  "Allowed project page": "可用项目页面",
  "Validation plan": "验证计划",
  "Project methods listed": "已列出项目方法",
  Source: "来源",
  "All Sites": "所有站点",
  "All Labs": "所有实验室",
  "All evidence streams": "所有证据来源",
  "Human cohort source": "人类队列来源",
  "Medication-wide mortality data": "全药物范围死亡率数据",
  "UK Biobank records": "UK Biobank 记录",
  "Biobank source": "Biobank 来源",
  "Linked prescription and mortality data": "处方与死亡率关联数据",
  "ACM effect": "全因死亡率影响",
  "UK Biobank ACM effect": "UK Biobank 全因死亡率影响",
  "Lower ACM effect": "全因死亡率降低幅度",
  "Higher ACM effect": "全因死亡率升高幅度",
  "Lower ACM": "全因死亡率降低",
  "Higher ACM": "全因死亡率升高",
  "eLife public data": "eLife 公开数据",
  "Nature source data": "Nature 源数据",
  mice: "小鼠",
  animals: "动物",
  "evidence sources": "证据来源",
  fish: "鱼",
  flies: "果蝇",
  treatment: "处理",
  treatments: "处理",
  intervention: "干预",
  interventions: "干预",
  medication: "药物",
  medications: "药物",
  "Biobank signal": "Biobank 信号",
  "Biobank signals": "Biobank 信号",
  "Focus treatment": "当前处理",
  "Focus intervention": "当前干预",
  "Focus medication": "当前药物",
  "Focus signal": "当前信号",
  "Compare treatments": "比较处理",
  "Compare interventions": "比较干预",
  "Compare medications": "比较药物",
  "Compare Biobank signals": "比较 Biobank 信号",
  "Combined-sex mice": "雌雄合并小鼠",
  "Combined populations": "合并人群",
  "Human evidence": "人类证据",
  "Combined-sex fish": "雌雄合并青鳉鱼",
  "Female flies": "雌性果蝇",
  "Loading the public ITP dataset…": "正在加载公开干预测试计划（ITP）数据集…",
  "Loading the public CITP dataset…": "正在加载公开比较干预测试计划（CITP）数据集…",
  "Loading curated human medication evidence…": "正在加载人工整理的人类药物证据…",
  "Loading human Biobank medication signals…": "正在加载人类 Biobank 药物信号…",
  "Loading the public killifish dataset…": "正在加载公开青鳉鱼数据集…",
  "Loading the public fruit-fly dataset…": "正在加载公开果蝇数据集…",
  "Source files were downloaded from MPD and normalized against the public lifespancharts cohort CSVs.":
    "源文件下载自 MPD，并根据公开 lifespancharts 队列 CSV 做了标准化处理。",
  "Search cohort or compound": "搜索队列或化合物",
  "Search cohort or compound. Four overlays max.":
    "搜索队列或化合物；最多叠加四条曲线。",
  "Choose a row from the leaderboard above or use the controls here to inspect a treatment against its cohort-matched control. Year and site are set in the top scope panel.":
    "可从上方排行榜选择一行，或使用这里的控件查看某个处理与同队列匹配对照的比较。年份和站点可在顶部范围面板设置。",
  "The reference site overlays raw step curves. This version keeps the same public cohort records but adds proper censor handling, a richer opening state, and a more navigable treatment comparison flow.":
    "参考站点叠加展示原始阶梯曲线。这个版本保留相同的公开队列记录，同时加入正确的删失处理、更丰富的默认视图，以及更易浏览的处理比较流程。",
  "Source files were downloaded from the CITP Data Portal and normalized into matched treatment-control strata across dataset, strain, condition, and lab.":
    "源文件下载自比较干预测试计划数据门户，并按数据集、品系、条件和实验室标准化为匹配的处理-对照分层。",
  "Search study, strain, or compound": "搜索研究、品系或化合物",
  "Search study, strain, or compound. Four overlays max.":
    "搜索研究、品系或化合物；最多叠加四条曲线。",
  "Choose a row from the leaderboard above or use the controls here to inspect an intervention against its matched control. Study and lab are set in the top scope panel.":
    "可从上方排行榜选择一行，或使用这里的控件查看某个干预与匹配对照的比较。研究和实验室可在顶部范围面板设置。",
  "Matched control overlays stay within each study, strain, condition, and lab slice so the non-mouse comparisons stay internally consistent.":
    "匹配对照曲线只在相同研究、品系、条件和实验室分组内叠加，以保证非小鼠比较的内部一致性。",
  "Focus study": "当前研究",
  "2017 · Lifespan chemicals study": "2017 · 寿命化合物研究",
  "Lifespan chemicals": "寿命化合物",
  "2017 · Manual lifespan baseline data": "2017 · 手工寿命基线数据",
  "Manual lifespan baseline": "手工寿命基线",
  "2019 · ALM AKG and ThioT study": "2019 · ALM AKG 与 ThioT 研究",
  "ALM AKG and ThioT": "ALM AKG 与 ThioT",
  "2019 · ALM NP1, PG, and RVL study": "2019 · ALM NP1、PG 与 RVL 研究",
  "ALM NP1, PG, and RVL": "ALM NP1、PG 与 RVL",
  "2019 · Automated lifespan baseline data": "2019 · 自动化寿命基线数据",
  "Automated lifespan baseline": "自动化寿命基线",
  "2019 · Imatinib negative result": "2019 · 伊马替尼阴性结果",
  Imatinib: "伊马替尼",
  "2020 · β-GPA negative result": "2020 · β-GPA 阴性结果",
  "2020 · Obeticholic acid negative result": "2020 · 奥贝胆酸阴性结果",
  "Obeticholic acid": "奥贝胆酸",
  "2021 · Antidiabetic study": "2021 · 抗糖尿病药物研究",
  Antidiabetic: "抗糖尿病药物",
  "2021 · Metformin study": "2021 · 二甲双胍研究",
  "2021 · Diuron negative result": "2021 · 敌草隆阴性结果",
  Diuron: "敌草隆",
  "2024 · GTE, ACARB, AEST, NDGA, and RAPA study":
    "2024 · GTE、ACARB、AEST、NDGA 与 RAPA 研究",
  "GTE, ACARB, AEST, NDGA, and RAPA": "GTE、ACARB、AEST、NDGA 与 RAPA",
  "2025 · ATRA, PROP briggsae and tropicalis study":
    "2025 · ATRA、PROP（布氏/热带隐杆线虫）研究",
  "ATRA, PROP briggsae and tropicalis": "ATRA、PROP（布氏/热带隐杆线虫）",
  "2025 · Computational predictions study": "2025 · 计算预测研究",
  "Computational predictions": "计算预测",
  "2025 · Retinoic acid study": "2025 · 维甲酸研究",
  "Retinoic acid": "维甲酸",
  "2025 · Bakuchiol, tamibarotene negative result":
    "2025 · 补骨脂酚、他米巴罗汀阴性结果",
  "Bakuchiol, tamibarotene": "补骨脂酚、他米巴罗汀",
  "2025 · Sulforaphane study": "2025 · 萝卜硫素研究",
  Sulforaphane: "萝卜硫素",
  "2026 · Levetiracetam negative result": "2026 · 左乙拉西坦阴性结果",
  Levetiracetam: "左乙拉西坦",
  "Secondary analysis": "二次分析",
  "Secondary analysis of public ITP survival data.":
    "公开干预测试计划（ITP）生存数据的二次分析。",
  "A water-only matched control used when compounds are delivered without DMSO or another solvent.":
    "当化合物不经 DMSO 或其他溶剂递送时使用的纯水匹配对照组。",
  "A solvent-only matched control used when compounds are dissolved in dimethyl sulfoxide (DMSO).":
    "当化合物溶于二甲基亚砜（DMSO）时使用的仅溶剂匹配对照组。",
  "A no-drug baseline group used as the matched control for untreated animals.":
    "用于未处理动物的无药物基线匹配对照组。",
  "A tricarboxylic acid cycle intermediate, also called 2-oxoglutarate, used as a metabolic supplement.":
    "一种三羧酸循环中间产物，也称 2-氧代戊二酸，可用作代谢补充剂。",
  "A fluorescent dye that binds amyloid-like protein aggregates and is often used as a staining reagent.":
    "一种可结合类淀粉样蛋白聚集体的荧光染料，常用作染色试剂。",
  "An experimental small molecule abbreviated NP1 that has been studied in worm aging screens.":
    "一种简称 NP1 的实验性小分子，已在线虫衰老筛选中被研究。",
  "A synthetic antioxidant used as a food preservative and research additive.":
    "一种合成抗氧化剂，可用作食品防腐剂和研究添加剂。",
  "A polyphenol found in grapes and other plants that is studied for antioxidant signaling effects.":
    "一种存在于葡萄及其他植物中的多酚，常被研究其抗氧化信号作用。",
  "A nonselective beta-blocker used for high blood pressure, tremor, migraine prevention, and performance anxiety.":
    "一种非选择性 β 受体阻滞剂，用于高血压、震颤、偏头痛预防和表演焦虑。",
  "A concentrated tea extract rich in catechin polyphenols such as EGCG.":
    "一种富含 EGCG 等儿茶素多酚的浓缩茶提取物。",
  "A phenylurea herbicide that inhibits photosynthesis in plants and algae.":
    "一种苯脲类除草剂，可抑制植物和藻类的光合作用。",
  "An anti-seizure medicine commonly used for epilepsy and other seizure disorders.":
    "一种常用于癫痫及其他发作性疾病的抗惊厥药。",
  "A vitamin A derivative used in dermatology and in some leukemia treatments.":
    "一种维生素 A 衍生物，用于皮肤科及部分白血病治疗。",
  "An isothiocyanate from broccoli and other cruciferous vegetables that activates cellular stress-response pathways such as Nrf2.":
    "一种来自西兰花等十字花科蔬菜的异硫氰酸酯，可激活 Nrf2 等细胞应激反应通路。",
  "A biguanide diabetes drug that lowers hepatic glucose production and improves insulin sensitivity.":
    "一种双胍类糖尿病药物，可降低肝糖生成并改善胰岛素敏感性。",
  "This human view is a curated medication leaderboard built from high-signal meta-analyses, large epidemiology, and drug-target Mendelian studies. Scores are heuristic navigation aids, not prescribing advice.":
    "这个人类数据视图是一个药物排行榜，依据来自高信号荟萃分析、大规模流行病学研究和药物靶点孟德尔研究。分数仅用于浏览和定位信息，不构成处方建议。",
  "This human view is a curated medication leaderboard built from high-signal meta-analyses, large epidemiology, drug-target Mendelian studies, and medication-wide UK Biobank mortality data. Scores are heuristic navigation aids, not prescribing advice.":
    "这个人类数据视图是一个药物排行榜，依据来自高信号荟萃分析、大规模流行病学研究、药物靶点孟德尔研究以及 UK Biobank 全药物范围死亡率数据。分数仅用于浏览和定位信息，不构成处方建议。",
  "This human view uses Biobank-style cohort evidence only. Scores are heuristic navigation aids for prescription-mortality signals, not causal estimates or prescribing advice.":
    "这个人类数据视图仅使用 Biobank 队列证据。分值只是浏览处方-死亡率信号的辅助信息，不是因果估计，也不构成处方建议。",
  "This human view intentionally uses only the UK Biobank project 1246676 page. It does not import paper-derived HR estimates, GP field documentation, or other Biobank resources.":
    "这个人类数据视图有意只使用 UK Biobank 1246676 项目页面，不导入论文中的 HR 估计、GP 字段文档或其他 Biobank 资源。",
  "This human view intentionally uses only the UK Biobank project 1246676 page. It does not import additional publications, field documentation, or result tables.":
    "这个人类数据视图有意只使用 UK Biobank 1246676 项目页面，不导入其他论文、字段文档或结果表。",
  "Search medication or population": "搜索药物或适用人群",
  "Search signal or population": "搜索信号或人群",
  "Search the curated top 10 medications.": "搜索人工整理的前 10 种药物。",
  "Search the Biobank-only human signals.": "搜索仅来自 Biobank 的人类信号。",
  "Search the UK Biobank project-only human view.": "搜索仅限 UK Biobank 项目页面的人类视图。",
  "Choose a medication from the leaderboard above or the selector here to inspect the evidence anchors behind this human ranking.":
    "可从上方排行榜或这里的选择器中选择一种药物，查看支撑该排名的关键证据。",
  "Choose a Biobank signal from the leaderboard above or the selector here to inspect the cohort sources behind this human ranking.":
    "可从上方排行榜或这里的选择器中选择一个 Biobank 信号，查看支撑该排名的队列来源。",
  "Choose the UK Biobank project row to inspect the single allowed project source behind this human view.":
    "选择 UK Biobank 项目条目，查看这个人类数据视图当前使用的项目来源。",
  "This human view is evidence-first. It does not display survival curves; it summarizes the meta-analysis, epidemiology, and Mendelian anchors used in the ranking.":
    "这个人类数据视图以证据为主，不展示生存曲线，而是汇总用于排名的荟萃分析、流行病学和孟德尔证据。",
  "This human view is evidence-first. It does not display survival curves; it summarizes the meta-analysis, epidemiology, Mendelian, and population-catalog anchors used in the ranking.":
    "这个人类数据视图以证据为主，不展示生存曲线，而是汇总用于排名的荟萃分析、流行病学、孟德尔证据和人群目录依据。",
  "This human view is evidence-first. It does not display survival curves; it summarizes Biobank prescription, primary-care, and death-registry anchors used in the ranking.":
    "这个人类数据视图以证据为主，不展示生存曲线，而是汇总用于排名的 Biobank 处方、初级保健和死亡登记依据。",
  "This human view is source-first. It does not display survival curves or medication-specific ACM ranks because the allowed project page does not publish those results.":
    "这个人类数据视图以来源为主。由于当前可用的项目页面未发布这些结果，因此不显示生存曲线或药物级全因死亡率排名。",
  "Human evidence is summarized as a single evidence panel rather than survival curves.":
    "人类证据以单一证据面板汇总展示，而不是生存曲线。",
  "Human Biobank evidence is summarized as a single cohort panel rather than survival curves.":
    "人类 Biobank 证据以单一队列面板汇总展示，而不是生存曲线。",
  "Human Biobank evidence is summarized as a single project-source panel rather than survival curves.":
    "人类 Biobank 证据以单一项目来源面板汇总展示，而不是生存曲线。",
  refs: "参考",
  meds: "药物",
  signals: "信号",
  "Latest curated catalog verified locally": "本地核验的最新人工整理目录",
  "Latest Biobank catalog verified locally": "本地核验的最新 Biobank 目录",
  "Latest UK Biobank project page verified locally": "本地核验的最新 UK Biobank 项目页面",
  "Source files were downloaded from the eLife Figure 4 source-data CSVs and normalized into dietary restriction versus ad libitum cohort comparisons.":
    "源文件下载自 eLife 图 4 的源数据 CSV，并标准化为饮食限制与自由摄食的队列比较。",
  "Search cohort or intervention": "搜索队列或干预",
  "Search cohort or intervention. Four overlays max.":
    "搜索队列或干预；最多叠加四条曲线。",
  "Choose a row from the leaderboard above or use the controls here to inspect dietary restriction against its cohort-matched ad libitum control. Cohort is set in the top scope panel.":
    "可从上方排行榜选择一行，或使用这里的控件查看饮食限制与同队列自由摄食对照的比较。队列可在顶部范围面板设置。",
  "Each panel overlays raw Kaplan-Meier curves for dietary restriction and the ad libitum control within the same GRZ cohort.":
    "每个面板都叠加展示同一 GRZ 队列中饮食限制与自由摄食对照的原始 Kaplan-Meier 曲线。",
  "Source files were downloaded from the Nature source-data workbook and expanded from per-replicate death counts into one row per fly.":
    "源文件下载自 Nature 的源数据工作簿，并从每个重复的死亡计数展开为每只果蝇一行。",
  "Search genotype or experiment": "搜索基因型或实验",
  "Search genotype or experiment. Four overlays max.":
    "搜索基因型或实验；最多叠加四条曲线。",
  "Choose a row from the leaderboard above or use the controls here to inspect dietary restriction against its matched ad libitum control within the same fly experiment.":
    "可从上方排行榜选择一行，或使用这里的控件查看同一果蝇实验内饮食限制与匹配自由摄食对照的比较。",
  "These curves are reconstructed from workbook death-count tables, expanded into per-fly event rows so they can be compared like the mouse and worm datasets.":
    "这些曲线根据工作簿中的死亡计数表重建，并展开为每只果蝇的事件行，从而可以像小鼠和线虫数据集一样进行比较。",
  "This fruit-fly source dataset is female-only, so the view stays on a single panel.":
    "该果蝇源数据集仅包含雌性，因此视图保持单面板。",
  Control: "对照",
  "Untreated matched control group.": "未处理的匹配对照组。",
  Untreated: "未处理",
  "Untreated control": "未处理对照",
  "DMSO control": "DMSO 对照",
  "Water control": "清水对照",
  "Meta + epidemiology + Mendelian": "荟萃分析 + 流行病学 + 孟德尔",
  "Meta + epidemiology + Mendelian + UK Biobank":
    "荟萃分析 + 流行病学 + 孟德尔 + UK Biobank",
  "Top 10 human medication interventions": "人类药物干预前 10 名",
  "Top 10": "前 10",
  "Meta + epi + MR": "荟萃分析 + 流行病学 + MR",
  "Meta + epi + MR + UKB": "荟萃分析 + 流行病学 + MR + UKB",
  "UK Biobank prescription mortality screen": "UK Biobank 处方药死亡率筛查",
  "UK Biobank linked prescription + mortality": "UK Biobank 处方 + 死亡率关联",
  "UK Biobank medication signals": "UK Biobank 药物信号",
  "UKB signals": "UKB 信号",
  "UKB Rx + mortality": "UKB 处方 + 死亡率",
  "UKB Rx + ACM": "UKB 处方 + 全因死亡率",
  "UK Biobank approved research project 1246676": "UK Biobank 已批准研究项目 1246676",
  "UK Biobank project 1246676": "UK Biobank 项目 1246676",
  "UKB project": "UKB 项目",
  "Project page only": "仅项目页面",
  "16 March 2026": "2026 年 3 月 16 日",
  "UK Biobank data resource": "UK Biobank 数据资源",
  "UK Biobank Showcase data-field 42039": "UK Biobank Showcase 数据字段 42039",
  "GP prescription records": "全科医生处方记录",
  "UK Biobank healthcare records": "UK Biobank 医疗记录",
  "UK Biobank GP prescription records field": "UK Biobank 全科医生处方记录字段",
  "UK Biobank lithium duration study": "UK Biobank 锂盐用药时长研究",
  "UK Biobank medication-wide mortality screen": "UK Biobank 全药物范围死亡率筛查",
  "Medication-wide observational study of 500,000+ UK Biobank participants aged 40-70, analyzing prescribed medications against overall mortality.":
    "一项覆盖 50 万余名 40-70 岁 UK Biobank 参与者的全药物范围观察性研究，分析处方药与总体死亡率的关系。",
  "The paper highlighted sildenafil, atorvastatin, naproxen, and estradiol as associated with increased lifespan, while emphasizing that the retrospective results need randomized or stronger causal follow-up.":
    "该论文重点指出西地那非、阿托伐他汀、萘普生和雌二醇与寿命增加相关，同时强调这些回顾性结果需要随机试验或更强因果设计的后续验证。",
  "Most associations reflected the diseases being treated, but sildenafil, atorvastatin, naproxen, and estradiol were highlighted as associated with increased lifespan; the authors describe the results as retrospective and hypothesis-generating.":
    "大多数关联反映了药物所治疗疾病本身的负担，但西地那非、阿托伐他汀、萘普生和雌二醇被重点指出与寿命增加相关；作者将这些结果描述为回顾性、用于生成假设的发现。",
  "Association between prescription drugs and all-cause mortality risk in the UK population":
    "英国人群中处方药与全因死亡风险的关联",
  Sildenafil: "西地那非",
  Atorvastatin: "阿托伐他汀",
  Naproxen: "萘普生",
  Estradiol: "雌二醇",
  Marvelon: "Marvelon",
  Revaxis: "Revaxis",
  Avaxim: "Avaxim",
  Estraderm: "Estraderm",
  Vagifem: "Vagifem",
  Ovestin: "Ovestin",
  Estriol: "雌三醇",
  Lymecycline: "赖甲环素",
  Otomize: "Otomize",
  Donepezil: "多奈哌齐",
  "Morphine Sulfate": "硫酸吗啡",
  Ropinirole: "罗匹尼罗",
  Oramorph: "Oramorph",
  Amantadine: "金刚烷胺",
  "Epilim Chrono": "Epilim Chrono",
  "MST Continus": "MST Continus",
  Rasagiline: "雷沙吉兰",
  "Mycophenolate Mofetil": "吗替麦考酚酯",
  Zomorph: "Zomorph",
  Azathioprine: "硫唑嘌呤",
  Spironolactone: "螺内酯",
  Exemestane: "依西美坦",
  Alfacalcidol: "阿法骨化醇",
  Cyclizine: "赛克利嗪",
  Thiamine: "硫胺素",
  Salbutamol: "沙丁胺醇",
  Lorazepam: "劳拉西泮",
  Creon: "Creon",
  "Fentanyl transdermal patches": "芬太尼透皮贴剂",
  Carvedilol: "卡维地洛",
  "Chlorhexidine Gluconate": "葡萄糖酸氯己定",
  Risperidone: "利培酮",
  Clonazepam: "氯硝西泮",
  "Uniphyllin Continus": "Uniphyllin Continus",
  Fludrocortisone: "氟氢可的松",
  Quetiapine: "喹硫平",
  "Sodium Valproate": "丙戊酸钠",
  Digoxin: "地高辛",
  Lamotrigine: "拉莫三嗪",
  Nifedipine: "硝苯地平",
  Seretide: "舒利迭",
  Nystatin: "制霉菌素",
  Letrozole: "来曲唑",
  Docusate: "多库酯",
  Bumetanide: "布美他尼",
  Serevent: "施立稳",
  Eplerenone: "依普利酮",
  Carbocisteine: "羧甲司坦",
  Combivent: "可必特",
  Metoclopramide: "甲氧氯普胺",
  Furosemide: "呋塞米",
  "Ipratropium Bromide": "异丙托溴铵",
  Sumatriptan: "舒马曲坦",
  Softclix: "Softclix",
  Omeprazole: "奥美拉唑",
  Lansoprazole: "兰索拉唑",
  Ranitidine: "雷尼替丁",
  Gaviscon: "Gaviscon",
  Ramipril: "雷米普利",
  Lisinopril: "赖诺普利",
  Enalapril: "依那普利",
  Candesartan: "坎地沙坦",
  "Perindopril Erbumine": "培哚普利叔丁胺盐",
  Gliclazide: "格列齐特",
  "Co-Codamol": "复方可待因/对乙酰氨基酚",
  "Co-Dydramol": "复方二氢可待因/对乙酰氨基酚",
  "Co-Proxamol": "复方丙氧芬/对乙酰氨基酚",
  Amitriptyline: "阿米替林",
  Trazodone: "曲唑酮",
  Lofepramine: "洛非帕明",
  Solifenacin: "索利那新",
  Allopurinol: "别嘌醇",
  Warfarin: "华法林",
  Rivaroxaban: "利伐沙班",
  Varenicline: "伐尼克兰",
  Paracetamol: "对乙酰氨基酚",
  Ivabradine: "伊伐布雷定",
  Amiloride: "阿米洛利",
  Amiodarone: "胺碘酮",
  Bisacodyl: "比沙可啶",
  Movicol: "Movicol",
  Salamol: "Salamol",
  Ventolin: "万托林",
  Tegretol: "Tegretol",
  Priadel: "Priadel",
  Fexofenadine: "非索非那定",
  Chlorphenamine: "氯苯那敏",
  Quinine: "奎宁",
  Flecainide: "氟卡尼",
  "Flecainide 100 mg": "氟卡尼 100 mg",
  Tadalafil: "他达拉非",
  "Tadalafil 10 mg": "他达拉非 10 mg",
  Meloxicam: "美洛昔康",
  "Meloxicam 7.5 mg": "美洛昔康 7.5 mg",
  Premarin: "倍美力",
  "Premarin 0.625 mg": "倍美力 0.625 mg",
  Terbinafine: "特比萘芬",
  "Terbinafine 250 mg": "特比萘芬 250 mg",
  "A combined oral contraceptive containing desogestrel and ethinylestradiol.":
    "一种复方口服避孕药，含去氧孕烯和炔雌醇。",
  "A class IC antiarrhythmic drug and sodium-channel blocker used for selected heart rhythm disorders.":
    "一种 IC 类抗心律失常药和钠通道阻滞剂，用于部分心律失常。",
  "A booster vaccine against diphtheria, tetanus, and poliomyelitis.":
    "一种用于预防白喉、破伤风和脊髓灰质炎的加强疫苗。",
  "A class of diabetes and cardiorenal drugs that lower blood glucose by increasing urinary glucose excretion.":
    "一类糖尿病及心肾药物，通过增加尿糖排泄来降低血糖。",
  "An estradiol transdermal patch used as estrogen replacement therapy.":
    "一种雌二醇透皮贴剂，用作雌激素替代治疗。",
  "A tetracycline-class antibiotic used for acne and other susceptible bacterial infections.":
    "一种四环素类抗生素，用于痤疮及其他敏感细菌感染。",
  "An inactivated hepatitis A vaccine used to prevent hepatitis A infection.":
    "一种灭活甲肝疫苗，用于预防甲型肝炎感染。",
  "A PDE5 inhibitor used for erectile dysfunction, pulmonary arterial hypertension, and urinary symptoms from benign prostatic hyperplasia.":
    "一种 PDE5 抑制剂，用于勃起功能障碍、肺动脉高压以及良性前列腺增生相关尿路症状。",
  "An estradiol vaginal tablet used as local estrogen therapy for menopausal urogenital symptoms.":
    "一种雌二醇阴道片，作为局部雌激素治疗用于绝经相关泌尿生殖症状。",
  "A naturally occurring estrogen used in some local hormone-therapy preparations.":
    "一种天然存在的雌激素，用于部分局部激素治疗制剂。",
  "The primary endogenous estrogen, used clinically in hormone replacement and local estrogen therapies.":
    "人体主要内源性雌激素，临床用于激素替代和局部雌激素治疗。",
  "A nonsteroidal anti-inflammatory drug (NSAID) used for pain and inflammation, especially arthritis.":
    "一种非甾体抗炎药（NSAID），用于疼痛和炎症，尤其是关节炎。",
  "A hormone-therapy class using estrogenic compounds for menopausal and other estrogen-deficiency indications.":
    "一类使用雌激素化合物的激素治疗，用于绝经及其他雌激素缺乏相关适应证。",
  "Also called conjugated estrogens, an estrogen-therapy drug used for menopausal symptoms and other hormone indications.":
    "也称结合雌激素，是一种雌激素治疗药物，用于绝经症状及其他激素相关适应证。",
  "A PDE5 inhibitor used for erectile dysfunction and pulmonary arterial hypertension.":
    "一种 PDE5 抑制剂，用于勃起功能障碍和肺动脉高压。",
  "An ear spray combining neomycin, dexamethasone, and acetic acid for inflammatory outer-ear infections.":
    "一种耳喷剂，含新霉素、地塞米松和醋酸，用于炎症性外耳感染。",
  "A drug class that inhibits phosphodiesterase type 5 and is used for erectile dysfunction and pulmonary hypertension.":
    "一类抑制 5 型磷酸二酯酶的药物，用于勃起功能障碍和肺动脉高压。",
  "An allylamine antifungal drug used for fungal skin and nail infections.":
    "一种烯丙胺类抗真菌药，用于皮肤和指/趾甲真菌感染。",
  "A nonsteroidal anti-inflammatory drug (NSAID) used for pain, fever, and inflammation.":
    "一种非甾体抗炎药（NSAID），用于疼痛、发热和炎症。",
  "A statin drug that lowers LDL cholesterol by inhibiting HMG-CoA reductase.":
    "一种他汀类药物，通过抑制 HMG-CoA 还原酶降低 LDL 胆固醇。",
  "A cholesterol-lowering drug class that inhibits HMG-CoA reductase.":
    "一类通过抑制 HMG-CoA 还原酶降低胆固醇的药物。",
  "A mood-stabilizing alkali metal salt used in bipolar disorder and related psychiatric indications.":
    "一种用作心境稳定剂的碱金属盐，用于双相障碍及相关精神科适应证。",
  "SGLT2 inhibitors (class)": "SGLT2 抑制剂（类别）",
  "SGLT2 inhibitors": "SGLT2 抑制剂",
  "Estrogen therapy (class)": "雌激素治疗（类别）",
  "Estrogen therapy": "雌激素治疗",
  "PDE5 inhibitors (class)": "PDE5 抑制剂（类别）",
  "PDE5 inhibitors": "PDE5 抑制剂",
  "Statins (class)": "他汀类（类别）",
  Statins: "他汀类",
  "Lithium duration": "锂盐用药时长",
  Lithium: "锂盐",
  "UK Biobank general-population prescription users": "UK Biobank 一般人群处方使用者",
  "UK Biobank medication-class prescription users": "UK Biobank 药物类别处方使用者",
  "UK Biobank estrogen-class prescription users": "UK Biobank 雌激素类别处方使用者",
  "UK Biobank lithium-prescribed participants": "UK Biobank 锂盐处方参与者",
  "UK Biobank female-only prescription users": "UK Biobank 女性处方使用者",
  "UK Biobank vaccine prescription users": "UK Biobank 疫苗处方使用者",
  "UK Biobank dose-specific prescription users": "UK Biobank 剂量/剂型特异处方使用者",
  "UK Biobank dementia-treatment prescription users": "UK Biobank 痴呆治疗处方使用者",
  "UK Biobank Parkinson or movement-disorder prescription users":
    "UK Biobank 帕金森或运动障碍处方使用者",
  "UK Biobank opioid or severe-pain prescription users": "UK Biobank 阿片或重度疼痛处方使用者",
  "UK Biobank sedative or anxiolytic prescription users": "UK Biobank 镇静或抗焦虑处方使用者",
  "UK Biobank antipsychotic prescription users": "UK Biobank 抗精神病药处方使用者",
  "UK Biobank anti-seizure prescription users": "UK Biobank 抗癫痫药处方使用者",
  "UK Biobank immunosuppressant prescription users": "UK Biobank 免疫抑制剂处方使用者",
  "UK Biobank cancer endocrine-therapy prescription users": "UK Biobank 肿瘤内分泌治疗处方使用者",
  "UK Biobank cardiac glycoside prescription users": "UK Biobank 强心苷处方使用者",
  "UK Biobank cardiorenal or diuretic prescription users": "UK Biobank 心肾或利尿剂处方使用者",
  "UK Biobank calcium-channel blocker prescription users": "UK Biobank 钙通道阻滞剂处方使用者",
  "UK Biobank nitrate vasodilator prescription users": "UK Biobank 硝酸酯血管扩张剂处方使用者",
  "UK Biobank beta-blocker prescription users": "UK Biobank β 受体阻滞剂处方使用者",
  "UK Biobank mineralocorticoid prescription users": "UK Biobank 盐皮质激素处方使用者",
  "UK Biobank respiratory prescription users": "UK Biobank 呼吸系统药物处方使用者",
  "UK Biobank pancreatic enzyme prescription users": "UK Biobank 胰酶处方使用者",
  "UK Biobank antiemetic prescription users": "UK Biobank 止吐药处方使用者",
  "UK Biobank vitamin replacement prescription users": "UK Biobank 维生素替代处方使用者",
  "UK Biobank bone-mineral prescription users": "UK Biobank 骨矿物质相关处方使用者",
  "UK Biobank bowel-care prescription users": "UK Biobank 肠道护理处方使用者",
  "UK Biobank acid-base or renal prescription users": "UK Biobank 酸碱或肾脏相关处方使用者",
  "UK Biobank oral-care prescription users": "UK Biobank 口腔护理处方使用者",
  "UK Biobank antimicrobial prescription users": "UK Biobank 抗微生物药处方使用者",
  "UK Biobank insulin-treated diabetes prescription users": "UK Biobank 胰岛素治疗糖尿病处方使用者",
  "UK Biobank acid-suppression or antacid prescription users":
    "UK Biobank 抑酸或抗酸药处方使用者",
  "UK Biobank RAAS prescription users": "UK Biobank RAAS 药物处方使用者",
  "UK Biobank non-insulin diabetes prescription users": "UK Biobank 非胰岛素糖尿病药物处方使用者",
  "UK Biobank statin prescription users": "UK Biobank 他汀处方使用者",
  "UK Biobank antiplatelet prescription users": "UK Biobank 抗血小板药处方使用者",
  "UK Biobank antidepressant or neuromodulator prescription users":
    "UK Biobank 抗抑郁药或神经调节药处方使用者",
  "UK Biobank urologic prescription users": "UK Biobank 泌尿系统药物处方使用者",
  "UK Biobank gout or urate-lowering prescription users": "UK Biobank 痛风或降尿酸药处方使用者",
  "UK Biobank diabetes-monitoring supply users": "UK Biobank 糖尿病监测用品使用者",
  "UK Biobank dermatology prescription users": "UK Biobank 皮肤科处方使用者",
  "UK Biobank smoking-cessation prescription users": "UK Biobank 戒烟药处方使用者",
  "UK Biobank migraine prescription users": "UK Biobank 偏头痛药物处方使用者",
  "UK Biobank antihistamine prescription users": "UK Biobank 抗组胺药处方使用者",
  "UK Biobank quinine prescription users": "UK Biobank 奎宁处方使用者",
  "UK Biobank cardiac rhythm prescription users": "UK Biobank 心律药物处方使用者",
  "UK Biobank anticoagulant prescription users": "UK Biobank 抗凝药处方使用者",
  "UK Biobank non-opioid pain or spasm prescription users":
    "UK Biobank 非阿片疼痛或痉挛药物处方使用者",
  "The paper highlighted decreased-mortality signals including sildenafil, atorvastatin, naproxen, estradiol, estrogen-related drugs, vaccines, lymecycline, Otomize, Marvelon, and dose/formulation-specific concentration-table hits, while emphasizing that the retrospective results need randomized or stronger causal follow-up.":
    "该论文指出了多种死亡率较低信号，包括西地那非、阿托伐他汀、萘普生、雌二醇、雌激素相关药物、疫苗、赖甲环素、Otomize、Marvelon 以及剂量/剂型特异的浓度表命中项，同时强调这些回顾性结果需要随机试验或更强因果设计验证。",
  "A dementia-treatment medicine used for cognitive symptoms in Alzheimer's disease and related neurodegenerative disorders.":
    "一种痴呆治疗药物，用于阿尔茨海默病及相关神经退行性疾病中的认知症状。",
  "A Parkinson's disease or movement-disorder medicine acting on dopaminergic motor pathways.":
    "一种用于帕金森病或运动障碍的药物，作用于多巴胺能运动通路。",
  "An opioid analgesic used for moderate-to-severe pain, often in severe illness, cancer pain, postoperative, or palliative-care contexts.":
    "一种阿片类镇痛药，用于中重度疼痛，常见于严重疾病、癌痛、术后或姑息治疗背景。",
  "A benzodiazepine or related sedative medicine used for anxiety, insomnia, muscle spasm, or seizure-related indications.":
    "一种苯二氮䓬类或相关镇静药，用于焦虑、失眠、肌肉痉挛或癫痫相关适应证。",
  "An antipsychotic medicine that modulates dopamine and serotonin signaling for psychosis, bipolar disorder, agitation, or related indications.":
    "一种调节多巴胺和血清素信号的抗精神病药，用于精神病性症状、双相障碍、激越或相关适应证。",
  "An anti-seizure medicine used for epilepsy, seizure prevention, neuropathic pain, or mood-stabilizing indications.":
    "一种抗癫痫药，用于癫痫、发作预防、神经病理性疼痛或情绪稳定相关适应证。",
  "An immunosuppressive medicine used after organ transplantation or for autoimmune and inflammatory diseases.":
    "一种免疫抑制药，用于器官移植后，或用于自身免疫及炎症性疾病。",
  "A cancer endocrine-therapy medicine used mainly for hormone-receptor-positive breast cancer.":
    "一种肿瘤内分泌治疗药物，主要用于激素受体阳性乳腺癌。",
  "A cardiac glycoside used for selected heart-failure and atrial-fibrillation rate-control settings.":
    "一种强心苷，用于部分心力衰竭和房颤心率控制场景。",
  "A diuretic or mineralocorticoid-pathway medicine used for heart failure, edema, hypertension, or cardiorenal fluid overload.":
    "一种利尿剂或盐皮质激素通路相关药物，用于心力衰竭、水肿、高血压或心肾液体负荷过重。",
  "A calcium-channel blocker used for hypertension, angina, or other cardiovascular indications.":
    "一种钙通道阻滞剂，用于高血压、心绞痛或其他心血管适应证。",
  "A nitrate vasodilator used for angina and other ischemic-heart-disease symptom control.":
    "一种硝酸酯类血管扩张剂，用于心绞痛及其他缺血性心脏病症状控制。",
  "A beta-blocker medicine used for heart failure, hypertension, angina, rhythm control, or other cardiovascular indications.":
    "一种 β 受体阻滞剂，用于心力衰竭、高血压、心绞痛、心律控制或其他心血管适应证。",
  "A mineralocorticoid corticosteroid used for adrenal insufficiency, orthostatic hypotension, or salt-wasting indications.":
    "一种盐皮质激素类皮质类固醇，用于肾上腺功能不全、体位性低血压或失盐相关适应证。",
  "A respiratory medicine used for asthma, COPD, bronchospasm, airway inflammation, or mucus-clearance indications.":
    "一种呼吸系统药物，用于哮喘、COPD、支气管痉挛、气道炎症或排痰相关适应证。",
  "A pancreatic enzyme replacement used to support digestion in pancreatic exocrine insufficiency.":
    "一种胰酶替代治疗，用于在胰腺外分泌功能不全时支持消化。",
  "An antiemetic or prokinetic medicine used for nausea, vomiting, vestibular symptoms, or gastrointestinal motility indications.":
    "一种止吐药或促动力药，用于恶心、呕吐、前庭症状或胃肠动力相关适应证。",
  "A vitamin replacement or multivitamin preparation used for deficiency, malnutrition risk, alcohol-related care, or supplementation.":
    "一种维生素替代或复合维生素制剂，用于缺乏、营养不良风险、酒精相关照护或补充。",
  "A bone-mineral or active vitamin D medicine used for calcium, phosphate, osteoporosis, or renal bone-disease indications.":
    "一种骨矿物质或活性维生素 D 相关药物，用于钙、磷、骨质疏松或肾性骨病相关适应证。",
  "A laxative or stool-softening medicine used for constipation and bowel-care indications.":
    "一种泻药或软便药，用于便秘和肠道护理相关适应证。",
  "An alkalinizing medicine used for metabolic acidosis, renal tubular acidosis, or related acid-base indications.":
    "一种碱化药物，用于代谢性酸中毒、肾小管酸中毒或相关酸碱适应证。",
  "An oral antiseptic, mouthwash, or anti-inflammatory rinse used for dental, mouth, throat, or mucosal-care indications.":
    "一种口腔抗菌剂、漱口水或抗炎含漱液，用于牙科、口腔、咽喉或黏膜护理相关适应证。",
  "An antimicrobial or antifungal medicine used for bacterial, fungal, or other susceptible infections.":
    "一种抗微生物或抗真菌药，用于细菌、真菌或其他敏感感染。",
  "An insulin preparation used for diabetes glucose control, often marking insulin-treated or more advanced diabetes.":
    "一种胰岛素制剂，用于糖尿病血糖控制，通常提示胰岛素治疗或较进展的糖尿病。",
  "A mood-stabilizing lithium salt used for bipolar disorder and related psychiatric indications.":
    "一种用作心境稳定剂的锂盐，用于双相障碍及相关精神科适应证。",
  "A progestogen-only contraceptive medicine used for hormonal contraception.":
    "一种仅含孕激素的避孕药，用于激素避孕。",
  "An estriol vaginal cream used as local estrogen therapy for menopausal urogenital symptoms.":
    "一种雌三醇阴道乳膏，作为局部雌激素治疗用于绝经相关泌尿生殖症状。",
  "A triptan migraine medicine that activates serotonin 5-HT1 receptors to treat acute migraine attacks.":
    "一种曲坦类偏头痛药物，通过激活血清素 5-HT1 受体治疗急性偏头痛发作。",
  "An acid-suppression, H2-blocker, or alginate antacid medicine used for reflux, ulcer disease, dyspepsia, or gastroprotection.":
    "一种抑酸、H2 阻滞剂或藻酸盐抗酸药，用于反流、溃疡病、消化不良或胃保护。",
  "A renin-angiotensin-system medicine used for hypertension, heart failure, kidney protection, or other cardiovascular indications.":
    "一种肾素-血管紧张素系统药物，用于高血压、心力衰竭、肾脏保护或其他心血管适应证。",
  "A glucose-lowering diabetes medicine used for type 2 diabetes and related cardiometabolic-risk management.":
    "一种降糖类糖尿病药物，用于 2 型糖尿病及相关心代谢风险管理。",
  "An antiplatelet or vascular-risk medicine used to reduce thrombotic events in cardiovascular or cerebrovascular disease contexts.":
    "一种抗血小板或血管风险相关药物，用于在心脑血管疾病背景下降低血栓事件。",
  "An antidepressant or neuromodulatory medicine used for depression, anxiety, neuropathic pain, sleep, or related indications.":
    "一种抗抑郁或神经调节药物，用于抑郁、焦虑、神经病理性疼痛、睡眠或相关适应证。",
  "A urologic medicine used for overactive bladder, urinary symptoms, or prostate-related urinary-flow indications.":
    "一种泌尿系统药物，用于膀胱过度活动、尿路症状或前列腺相关排尿适应证。",
  "A urate-lowering or gout medicine used for gout, hyperuricemia, or inflammatory crystal-disease prevention.":
    "一种降尿酸或痛风药物，用于痛风、高尿酸血症或炎症性晶体病预防。",
  "A glucose-monitoring supply row used by people checking blood glucose, commonly in diabetes care.":
    "一种血糖监测用品条目，常见于糖尿病照护中需要检测血糖的人群。",
  "A vaccine prescription row marking immunization against influenza, pneumococcal disease, shingles, or other infections.":
    "一个疫苗处方条目，表示针对流感、肺炎球菌、带状疱疹或其他感染的免疫接种。",
  "A dermatology medicine, emollient, topical steroid, or antifungal used for eczema, dermatitis, fungal infection, or skin-barrier care.":
    "一种皮肤科药物、润肤剂、外用激素或抗真菌药，用于湿疹、皮炎、真菌感染或皮肤屏障护理。",
  "A nicotinic-receptor partial agonist used for smoking cessation.":
    "一种烟碱受体部分激动剂，用于戒烟。",
  "An antihistamine medicine used for allergy, urticaria, itching, or sedating symptom-control indications.":
    "一种抗组胺药，用于过敏、荨麻疹、瘙痒或镇静性症状控制。",
  "A quinoline medicine historically used for malaria and sometimes prescribed for nocturnal leg cramps.":
    "一种喹啉类药物，历史上用于疟疾，有时也用于夜间腿抽筋。",
  "A cardiac rate or rhythm medicine used for arrhythmia, angina, or heart-failure symptom-control indications.":
    "一种心率或心律相关药物，用于心律失常、心绞痛或心力衰竭症状控制。",
  "An anticoagulant medicine used to reduce clotting risk in atrial fibrillation, venous thromboembolism, or other thrombotic-risk settings.":
    "一种抗凝药，用于在房颤、静脉血栓栓塞或其他血栓风险场景中降低凝血风险。",
  "A non-opioid pain, spasm, or neuromuscular symptom-control medicine used for pain or muscle-spasm indications.":
    "一种非阿片类疼痛、痉挛或神经肌肉症状控制药物，用于疼痛或肌肉痉挛相关适应证。",
  "Highest ACM-effect row because SGLT2 inhibitors had the largest lower all-cause mortality estimate among the reported UK Biobank medication-class signals.":
    "全因死亡率影响最高的条目，因为 SGLT2 抑制剂在已报告的 UK Biobank 药物类别信号中拥有最强的全因死亡风险降低估计。",
  "Medication-class UK Biobank row because SGLT2 inhibitors had the largest lower all-cause mortality estimate among the reported medication-class signals.":
    "UK Biobank 药物类别条目；SGLT2 抑制剂在已报告的药物类别信号中拥有最强的全因死亡风险降低估计。",
  "Largest individual UK Biobank ACM-effect row in the supplement table, ranked by its reported hazard-ratio effect.":
    "补充表中全因死亡率影响最大的 UK Biobank 单药条目，按其报告的风险比影响排序。",
  "Individual vaccine-related UK Biobank signal from the supplement table, ranked by its reported ACM hazard-ratio effect.":
    "补充表中的 UK Biobank 疫苗相关单药信号，按其报告的全因死亡率风险比影响排序。",
  "Dose/formulation-specific UK Biobank concentration-table signal; the parent-drug aggregate did not pass the no-concentration FDR screen.":
    "UK Biobank 浓度表中的剂量/剂型特异信号；该药物的汇总条目未通过未按浓度区分分析的 FDR 筛选。",
  "Individual estrogen-related UK Biobank signal from Figure 2, ranked by its reported ACM hazard-ratio effect.":
    "图 2 中 UK Biobank 雌激素相关单药信号，按其报告的全因死亡率风险比影响排序。",
  "Individual UK Biobank Figure 2 signal ranked by ACM effect; the main text names lymecycline among the increased-lifespan drugs.":
    "UK Biobank 图 2 单药信号，按全因死亡率影响排序；正文将赖甲环素列为寿命增加相关药物之一。",
  "Individual UK Biobank Figure 2 signal ranked by ACM effect; the main text names Otomize among the increased-lifespan drugs.":
    "UK Biobank 图 2 单药信号，按全因死亡率影响排序；正文将 Otomize 列为寿命增加相关药物之一。",
  "Class-level UK Biobank signal from Figure 5, included because PDE5 inhibitors showed a lower ACM hazard ratio as a class.":
    "图 5 中的 UK Biobank 类别层级信号；PDE5 抑制剂作为类别显示较低的全因死亡率风险比，因此纳入。",
  "Class-level UK Biobank signal from Figure 5; the reported HR is below 1, though the confidence interval reaches 1.00.":
    "图 5 中的 UK Biobank 类别层级信号；报告 HR 低于 1，但置信区间达到 1.00。",
  "Highest-priority human row because the medication-wide UK Biobank mortality screen explicitly highlighted sildenafil among drugs associated with increased lifespan.":
    "优先级最高的人类条目，因为 UK Biobank 全药物范围死亡率筛查明确将西地那非列为与寿命增加相关的药物之一。",
  "Biobank-only human candidate because atorvastatin was named as an increased-lifespan signal in the medication-wide UK Biobank mortality screen.":
    "仅来自 Biobank 的人类候选信号，因为阿托伐他汀在 UK Biobank 全药物范围死亡率筛查中被列为寿命增加信号。",
  "Biobank-only human candidate because naproxen was named as an increased-lifespan signal in the medication-wide UK Biobank mortality screen.":
    "仅来自 Biobank 的人类候选信号，因为萘普生在 UK Biobank 全药物范围死亡率筛查中被列为寿命增加信号。",
  "Biobank-only human candidate because estradiol was named as an increased-lifespan signal in the medication-wide UK Biobank mortality screen.":
    "仅来自 Biobank 的人类候选信号，因为雌二醇在 UK Biobank 全药物范围死亡率筛查中被列为寿命增加信号。",
  "Included as a Biobank-only contrast row: a dedicated UK Biobank lithium analysis found no evidence that longer lithium duration predicted all-cause mortality or biological-age markers.":
    "作为仅来自 Biobank 的对照条目纳入：一项专门的 UK Biobank 锂盐分析未发现更长锂盐使用时长可预测全因死亡率或生物年龄标志物。",
  "Highest ACM-effect row because estradiol had the largest named lower all-cause mortality estimate in the medication-wide UK Biobank screen.":
    "全因死亡率影响最高的条目，因为雌二醇在 UK Biobank 全药物范围筛查中拥有被点名药物里最强的全因死亡风险降低估计。",
  "Biobank-only human row ranked by ACM effect because sildenafil was named as an increased-lifespan signal in the medication-wide UK Biobank screen.":
    "仅来自 Biobank 的人类条目；因西地那非在 UK Biobank 全药物范围筛查中被列为寿命增加信号，故按全因死亡率影响排序。",
  "Biobank-only human row ranked by ACM effect because naproxen was named as an increased-lifespan signal in the medication-wide UK Biobank screen.":
    "仅来自 Biobank 的人类条目；因萘普生在 UK Biobank 全药物范围筛查中被列为寿命增加信号，故按全因死亡率影响排序。",
  "Biobank-only human row ranked by ACM effect because atorvastatin was named as an increased-lifespan signal in the medication-wide UK Biobank screen.":
    "仅来自 Biobank 的人类条目；因阿托伐他汀在 UK Biobank 全药物范围筛查中被列为寿命增加信号，故按全因死亡率影响排序。",
  "Class-level UK Biobank signal because estrogen therapy as a medication class was reported with lower all-cause mortality.":
    "UK Biobank 类别层级信号，因为雌激素治疗作为药物类别被报告与较低的全因死亡率相关。",
  "Top Biobank screen signal": "Biobank 筛查最高信号",
  "Named Biobank screen signal": "Biobank 筛查点名信号",
  "Biobank caution row": "Biobank 谨慎解读条目",
  "Largest named ACM effect": "被点名药物中全因死亡率影响最大",
  "Largest reported ACM effect": "已报告全因死亡率影响最大",
  "Second-largest named ACM effect": "被点名药物中全因死亡率影响第二大",
  "Named ACM effect": "被点名的全因死亡率影响",
  "Class-level ACM effect": "类别层级全因死亡率影响",
  "Higher ACM signal": "全因死亡率升高信号",
  "Higher class-level ACM effect": "类别层级全因死亡率升高影响",
  "Higher dose-specific ACM effect": "剂量特异的全因死亡率升高影响",
  "No ACM reduction signal": "未见全因死亡率降低信号",
  "Largest individual ACM effect": "单药全因死亡率影响最大",
  "Largest class-level ACM effect": "类别层级全因死亡率影响最大",
  "Dose-specific ACM effect": "剂量特异全因死亡率影响",
  "Borderline class ACM effect": "边界性的类别层级全因死亡率影响",
  "This ranking now uses Biobank data only. Sildenafil is included because it was one of the named increased-lifespan signals in the UK Biobank screen.":
    "该排名现在只使用 Biobank 数据。西地那非被纳入，是因为它是 UK Biobank 筛查中被点名的寿命增加信号之一。",
  "Atorvastatin stays in the human view only through its UK Biobank screen signal; trial meta-analysis and Mendelian evidence are intentionally excluded.":
    "阿托伐他汀仅凭 UK Biobank 筛查信号保留在人类视图中；试验荟萃分析和孟德尔证据已被有意排除。",
  "Naproxen is retained as a UK Biobank candidate signal, with no non-Biobank evidence streams contributing to its score.":
    "萘普生作为 UK Biobank 候选信号保留，分值不纳入任何非 Biobank 证据流。",
  "Estradiol is shown as a UK Biobank signal only; the row should be read through sex, indication, and hormone-therapy confounding cautions.":
    "雌二醇仅作为 UK Biobank 信号展示；解读该条目时需要注意性别、适应证和激素治疗相关混杂。",
  "Lithium is not a positive leaderboard hit here. It is included because it is a directly relevant UK Biobank medication-aging resource and it tempers candidate interpretation.":
    "这里的锂盐不是排行榜上的正向信号。纳入它是因为它是直接相关的 UK Biobank 药物-衰老资源，并能帮助谨慎解读候选药物。",
  "This ranking now orders Biobank rows by the reported effect on all-cause mortality: larger percent reduction from the hazard ratio appears higher.":
    "该排名现在按已报告的全因死亡率影响排列 Biobank 条目：由风险比换算出的百分比降幅越大，排名越靠前。",
  "SGLT2 inhibitors rank first because the UK Biobank class-level estimate implies the largest all-cause mortality reduction, although the paper notes the sample size was much lower.":
    "SGLT2 抑制剂排名第一，因为 UK Biobank 类别层级估计值对应最大的全因死亡率降低幅度，尽管论文指出该类别样本量小得多。",
  "SGLT2 inhibitors remain the strongest medication-class signal, although individual-drug rows such as Marvelon and Revaxis have larger reported ACM effects.":
    "SGLT2 抑制剂仍是最强的药物类别信号，尽管 Marvelon、Revaxis 等单药条目报告的全因死亡率影响更大。",
  "Rows here are the selected public supplement ACM signals: 169 Data Table 2 no-concentration drug rows with N>=500, Benjamini-Hochberg adjusted P<=0.05, and HR not equal to 1, ranked as 1 minus the reported ACM hazard ratio.":
    "这里的条目是选定的公开补充表全因死亡率信号：Data Table 2 中 169 个 N>=500、未按浓度区分的药物条目，筛选条件为 Benjamini-Hochberg 校正 P<=0.05 且 HR 不等于 1，并按 1 减去报告的全因死亡率风险比排序。",
  "This ranking now orders Biobank rows by the reported effect on all-cause mortality: positive values indicate lower ACM and negative values indicate higher ACM.":
    "该排名按报告的全因死亡率影响排序 Biobank 条目：正值表示全因死亡率降低，负值表示全因死亡率升高。",
  "Marvelon was named among the increased-lifespan drugs and ranks first because Data Table 2 reports the lowest ACM hazard ratio among the decreased-mortality rows.":
    "Marvelon 被列为寿命增加相关药物之一；由于 Data Table 2 在死亡率较低条目中报告其全因死亡率风险比最低，因此排名第一。",
  "Revaxis was named among the decreased-mortality drugs and ranks above SGLT2i because its individual-drug HR implies a larger ACM reduction.":
    "Revaxis 被列为死亡率较低药物；其单药 HR 对应的全因死亡率降幅大于 SGLT2i 类别，因此排在其前面。",
  "Avaxim is included because Data Table 2 reports a lower ACM hazard ratio for this prescription-drug row.":
    "Avaxim 被纳入，因为 Data Table 2 对这一处方药条目报告了较低的全因死亡率风险比。",
  "Flecainide 100 mg is included from Data Table 3 because the concentration-specific row passed FDR, while the parent-drug aggregate was not a no-concentration hit.":
    "氟卡尼 100 mg 来自 Data Table 3；该浓度特异条目通过 FDR，而该药物的汇总条目不是未按浓度区分分析的命中项。",
  "Tadalafil 10 mg is included from Data Table 3 because the concentration-specific row passed FDR, while the parent-drug aggregate was not a no-concentration hit.":
    "他达拉非 10 mg 来自 Data Table 3；该浓度特异条目通过 FDR，而该药物的汇总条目不是未按浓度区分分析的命中项。",
  "Meloxicam 7.5 mg is included from Data Table 3 because the concentration-specific row passed FDR, while the parent-drug aggregate was not a no-concentration hit.":
    "美洛昔康 7.5 mg 来自 Data Table 3；该浓度特异条目通过 FDR，而该药物的汇总条目不是未按浓度区分分析的命中项。",
  "Premarin 0.625 mg is included from Data Table 3 because the concentration-specific row passed FDR, while the parent-drug aggregate was not a no-concentration hit.":
    "倍美力 0.625 mg 来自 Data Table 3；该浓度特异条目通过 FDR，而该药物的汇总条目不是未按浓度区分分析的命中项。",
  "Terbinafine 250 mg is included from Data Table 3 because the concentration-specific row passed FDR, while the parent-drug aggregate was not a no-concentration hit.":
    "特比萘芬 250 mg 来自 Data Table 3；该浓度特异条目通过 FDR，而该药物的汇总条目不是未按浓度区分分析的命中项。",
  "Estrogen therapy is included as a class-level Biobank signal separate from the individual estradiol row, and ranks by its reported ACM hazard-ratio effect.":
    "雌激素治疗作为类别层级 Biobank 信号纳入，并与单个雌二醇条目分开，按其报告的全因死亡率风险比影响排序。",
  "Estraderm ranks above the broader estrogen class because its individual-drug HR implies a larger ACM reduction.":
    "Estraderm 排在更宽泛的雌激素类别之前，因为其单药 HR 对应更大的全因死亡率降幅。",
  "Estradiol is retained as a separate individual-drug row and ranks by its reported ACM hazard-ratio effect.":
    "雌二醇作为单独单药条目保留，并按其报告的全因死亡率风险比影响排序。",
  "Sildenafil ranks below estradiol because its UK Biobank ACM hazard ratio implies a smaller mortality reduction.":
    "西地那非排在雌二醇之后，因为其 UK Biobank 全因死亡率风险比对应的死亡率降低幅度更小。",
  "Sildenafil ranks by its UK Biobank ACM hazard-ratio effect, with no non-Biobank evidence streams contributing to the order.":
    "西地那非按其 UK Biobank 全因死亡率风险比影响排序，排名不纳入任何非 Biobank 证据流。",
  "Lymecycline is included because Figure 2 reports a lower ACM hazard ratio for this prescription-drug row.":
    "赖甲环素被纳入，因为图 2 对这一处方药条目报告了较低的全因死亡率风险比。",
  "Vagifem is retained as a separate individual-drug row because the article reports its ACM HR independently from the broader estrogen class.":
    "Vagifem 作为单独单药条目保留，因为文章独立报告了其全因死亡率 HR，而不是只归入更宽泛的雌激素类别。",
  "Estriol is retained as a separate individual-drug row because the article reports its ACM HR independently from the broader estrogen class.":
    "雌三醇作为单独单药条目保留，因为文章独立报告了其全因死亡率 HR，而不是只归入更宽泛的雌激素类别。",
  "Otomize is included because Figure 2 and Data Table 2 report a lower ACM hazard ratio for this prescription-drug row.":
    "Otomize 被纳入，因为图 2 和 Data Table 2 对这一处方药条目报告了较低的全因死亡率风险比。",
  "PDE5 inhibitors are included as a class-level Biobank signal separate from the individual sildenafil row.":
    "PDE5 抑制剂作为类别层级 Biobank 信号纳入，并与单个西地那非条目分开。",
  "Naproxen ranks by its reported ACM hazard-ratio effect, with no non-Biobank evidence streams contributing to the order.":
    "萘普生按其报告的全因死亡率风险比影响排序，排名不纳入任何非 Biobank 证据流。",
  "Atorvastatin remains in the human view only through its UK Biobank ACM effect; trial meta-analysis and Mendelian evidence are intentionally excluded.":
    "阿托伐他汀仅凭 UK Biobank 全因死亡率影响保留在人类视图中；试验荟萃分析和孟德尔证据已被有意排除。",
  "Statins are included as a class-level Biobank row because the article reports HR 0.97, but this should be read as borderline because the CI reaches 1.00.":
    "他汀类作为类别层级 Biobank 条目纳入，因为文章报告 HR 0.97；但由于 CI 达到 1.00，应按边界性结果解读。",
  "Lithium is not a positive ACM-effect hit here. It is included because it is a directly relevant UK Biobank medication-aging resource and it tempers candidate interpretation.":
    "这里的锂盐不是正向全因死亡率影响命中项。纳入它是因为它是直接相关的 UK Biobank 药物-衰老资源，并能帮助谨慎解读候选药物。",
  "The selected UK Biobank ACM set includes Marvelon with lower all-cause mortality risk.":
    "选定的 UK Biobank 全因死亡率集合包含 Marvelon，其与较低的全因死亡风险相关。",
  "The selected UK Biobank ACM set includes Revaxis with lower all-cause mortality risk.":
    "选定的 UK Biobank 全因死亡率集合包含 Revaxis，其与较低的全因死亡风险相关。",
  "The selected UK Biobank ACM set includes Avaxim with lower all-cause mortality risk.":
    "选定的 UK Biobank 全因死亡率集合包含 Avaxim，其与较低的全因死亡风险相关。",
  "The selected UK Biobank ACM set includes Sildenafil with lower all-cause mortality risk.":
    "选定的 UK Biobank 全因死亡率集合包含西地那非，其与较低的全因死亡风险相关。",
  "The selected UK Biobank ACM set includes Atorvastatin with lower all-cause mortality risk.":
    "选定的 UK Biobank 全因死亡率集合包含阿托伐他汀，其与较低的全因死亡风险相关。",
  "The selected UK Biobank ACM set includes Naproxen with lower all-cause mortality risk.":
    "选定的 UK Biobank 全因死亡率集合包含萘普生，其与较低的全因死亡风险相关。",
  "The selected UK Biobank ACM set includes Estradiol with lower all-cause mortality risk.":
    "选定的 UK Biobank 全因死亡率集合包含雌二醇，其与较低的全因死亡风险相关。",
  "The selected UK Biobank ACM set includes Estraderm with lower all-cause mortality risk.":
    "选定的 UK Biobank 全因死亡率集合包含 Estraderm，其与较低的全因死亡风险相关。",
  "The selected UK Biobank ACM set includes Vagifem with lower all-cause mortality risk.":
    "选定的 UK Biobank 全因死亡率集合包含 Vagifem，其与较低的全因死亡风险相关。",
  "The selected UK Biobank ACM set includes Estriol with lower all-cause mortality risk.":
    "选定的 UK Biobank 全因死亡率集合包含雌三醇，其与较低的全因死亡风险相关。",
  "The selected UK Biobank ACM set includes Lymecycline with lower all-cause mortality risk.":
    "选定的 UK Biobank 全因死亡率集合包含赖甲环素，其与较低的全因死亡风险相关。",
  "The selected UK Biobank ACM set includes Otomize with lower all-cause mortality risk.":
    "选定的 UK Biobank 全因死亡率集合包含 Otomize，其与较低的全因死亡风险相关。",
  "The selected UK Biobank ACM set includes PDE5 inhibitors as a class with lower all-cause mortality risk.":
    "选定的 UK Biobank 全因死亡率集合包含 PDE5 抑制剂类别，其与较低的全因死亡风险相关。",
  "The selected UK Biobank ACM set includes statins as a class with lower all-cause mortality risk.":
    "选定的 UK Biobank 全因死亡率集合包含他汀类，其与较低的全因死亡风险相关。",
  "The UK Biobank concentration analysis highlighted Flecainide 100 mg with lower all-cause mortality risk.":
    "UK Biobank 浓度分析显示氟卡尼 100 mg 与较低的全因死亡风险相关。",
  "The UK Biobank concentration analysis highlighted Tadalafil 10 mg with lower all-cause mortality risk.":
    "UK Biobank 浓度分析显示他达拉非 10 mg 与较低的全因死亡风险相关。",
  "The UK Biobank concentration analysis highlighted Meloxicam 7.5 mg with lower all-cause mortality risk.":
    "UK Biobank 浓度分析显示美洛昔康 7.5 mg 与较低的全因死亡风险相关。",
  "The UK Biobank concentration analysis highlighted Premarin 0.625 mg with lower all-cause mortality risk.":
    "UK Biobank 浓度分析显示倍美力 0.625 mg 与较低的全因死亡风险相关。",
  "The UK Biobank concentration analysis highlighted Terbinafine 250 mg with lower all-cause mortality risk.":
    "UK Biobank 浓度分析显示特比萘芬 250 mg 与较低的全因死亡风险相关。",
  "The selected UK Biobank ACM set includes SGLT2 inhibitors as a class with lower all-cause mortality risk.":
    "选定的 UK Biobank 全因死亡率集合包含 SGLT2 抑制剂类别，其与较低的全因死亡风险相关。",
  "The selected UK Biobank ACM set includes estrogen therapy as a class with lower all-cause mortality risk.":
    "选定的 UK Biobank 全因死亡率集合包含雌激素治疗类别，其与较低的全因死亡风险相关。",
  "Reported screen estimate: HR 0.85 (95% CI 0.78-0.93). Retrospective Biobank association, not a randomized effect estimate.":
    "筛查报告估计值：HR 0.85（95% CI 0.78-0.93）。这是回顾性 Biobank 关联，不是随机试验效应估计。",
  "Reported screen estimate: HR 0.91 (95% CI 0.87-0.95). Retrospective Biobank association, not a randomized effect estimate.":
    "筛查报告估计值：HR 0.91（95% CI 0.87-0.95）。这是回顾性 Biobank 关联，不是随机试验效应估计。",
  "Reported screen estimate: HR 0.90 (95% CI 0.85-0.96). Retrospective Biobank association, not a randomized effect estimate.":
    "筛查报告估计值：HR 0.90（95% CI 0.85-0.96）。这是回顾性 Biobank 关联，不是随机试验效应估计。",
  "Reported screen estimate: HR 0.75 (95% CI 0.59-0.95). Retrospective Biobank association, not a randomized effect estimate.":
    "筛查报告估计值：HR 0.75（95% CI 0.59-0.95）。这是回顾性 Biobank 关联，不是随机试验效应估计。",
  "Reported screen estimate: HR 0.64 (95% CI 0.45-0.89). Retrospective Biobank association, not a randomized effect estimate.":
    "筛查报告估计值：HR 0.64（95% CI 0.45-0.89）。这是回顾性 Biobank 关联，不是随机试验效应估计。",
  "Reported screen estimate: HR 0.76 (95% CI 0.67-0.85). Retrospective Biobank association, not a randomized effect estimate.":
    "筛查报告估计值：HR 0.76（95% CI 0.67-0.85）。这是回顾性 Biobank 关联，不是随机试验效应估计。",
  "Reported screen estimate: HR 0.18 (95% CI 0.05-0.62). Retrospective Biobank association, not a randomized effect estimate.":
    "筛查报告估计值：HR 0.18（95% CI 0.05-0.62）。这是回顾性 Biobank 关联，不是随机试验效应估计。",
  "Reported screen estimate: HR 0.59 (95% CI 0.40-0.85). Retrospective Biobank association, not a randomized effect estimate.":
    "筛查报告估计值：HR 0.59（95% CI 0.40-0.85）。这是回顾性 Biobank 关联，不是随机试验效应估计。",
  "Reported screen estimate: HR 0.67 (95% CI 0.51-0.88). Retrospective Biobank association, not a randomized effect estimate.":
    "筛查报告估计值：HR 0.67（95% CI 0.51-0.88）。这是回顾性 Biobank 关联，不是随机试验效应估计。",
  "Reported screen estimate: HR 0.69 (95% CI 0.52-0.90). Retrospective Biobank association, not a randomized effect estimate.":
    "筛查报告估计值：HR 0.69（95% CI 0.52-0.90）。这是回顾性 Biobank 关联，不是随机试验效应估计。",
  "Reported screen estimate: HR 0.71 (95% CI 0.55-0.91). Retrospective Biobank association, not a randomized effect estimate.":
    "筛查报告估计值：HR 0.71（95% CI 0.55-0.91）。这是回顾性 Biobank 关联，不是随机试验效应估计。",
  "Reported screen estimate: HR 0.73 (95% CI 0.59-0.91). Retrospective Biobank association, not a randomized effect estimate.":
    "筛查报告估计值：HR 0.73（95% CI 0.59-0.91）。这是回顾性 Biobank 关联，不是随机试验效应估计。",
  "Reported screen estimate: HR 0.74 (95% CI 0.60-0.92). Retrospective Biobank association, not a randomized effect estimate.":
    "筛查报告估计值：HR 0.74（95% CI 0.60-0.92）。这是回顾性 Biobank 关联，不是随机试验效应估计。",
  "Reported screen estimate: HR 0.85 (95% CI 0.76-0.96). Retrospective Biobank association, not a randomized effect estimate.":
    "筛查报告估计值：HR 0.85（95% CI 0.76-0.96）。这是回顾性 Biobank 关联，不是随机试验效应估计。",
  "Reported screen estimate: HR 0.86 (95% CI 0.80-0.93). Retrospective Biobank association, not a randomized effect estimate.":
    "筛查报告估计值：HR 0.86（95% CI 0.80-0.93）。这是回顾性 Biobank 关联，不是随机试验效应估计。",
  "Reported screen estimate: HR 0.97 (95% CI 0.94-1.00). Retrospective Biobank association, not a randomized effect estimate.":
    "筛查报告估计值：HR 0.97（95% CI 0.94-1.00）。这是回顾性 Biobank 关联，不是随机试验效应估计。",
  "Reported screen estimate: HR 0.50 (95% CI 0.29-0.87). Retrospective Biobank association, not a randomized effect estimate.":
    "筛查报告估计值：HR 0.50（95% CI 0.29-0.87）。这是回顾性 Biobank 关联，不是随机试验效应估计。",
  "Reported screen estimate: HR 0.72 (95% CI 0.58-0.89). Retrospective Biobank association, not a randomized effect estimate.":
    "筛查报告估计值：HR 0.72（95% CI 0.58-0.89）。这是回顾性 Biobank 关联，不是随机试验效应估计。",
  "Reported screen estimate: HR 0.75 (95% CI 0.60-0.94). Retrospective Biobank association, not a randomized effect estimate.":
    "筛查报告估计值：HR 0.75（95% CI 0.60-0.94）。这是回顾性 Biobank 关联，不是随机试验效应估计。",
  "Reported screen estimate: HR 0.77 (95% CI 0.64-0.93). Retrospective Biobank association, not a randomized effect estimate.":
    "筛查报告估计值：HR 0.77（95% CI 0.64-0.93）。这是回顾性 Biobank 关联，不是随机试验效应估计。",
  "Reported screen estimate: HR 0.87 (95% CI 0.78-0.97). Retrospective Biobank association, not a randomized effect estimate.":
    "筛查报告估计值：HR 0.87（95% CI 0.78-0.97）。这是回顾性 Biobank 关联，不是随机试验效应估计。",
  "Dedicated Biobank follow-up row with no reported ACM reduction signal from duration of lithium use.":
    "专门的 Biobank 后续条目；锂盐使用时长未报告全因死亡率降低信号。",
  "A current UK Biobank project is a natural follow-up resource, but no independent Biobank replication is listed here yet.":
    "当前 UK Biobank 项目是自然的后续资源，但这里尚未列出独立的 Biobank 复核结果。",
  "Keep this as a candidate signal until active-comparator or propensity-based validation is available.":
    "在主动对照或基于倾向评分的验证可用前，应将其视为候选信号。",
  "The signal is observational and may reflect indication, prescribing, adherence, and healthy-user patterns.":
    "该信号是观察性关联，可能反映适应证、处方模式、依从性和健康使用者模式。",
  "The published screen explicitly frames the findings as retrospective and warranting randomized controlled trials.":
    "已发表筛查明确将这些发现表述为回顾性结果，并认为需要随机对照试验。",
  "Interpretation is especially indication-sensitive because hormone therapy exposure is strongly tied to sex, menopause status, and prescribing context.":
    "该结果尤其受适应证影响，因为激素治疗暴露与性别、绝经状态和处方场景强相关。",
  "The published paper notes this class signal had a much lower sample size than larger medication classes.":
    "已发表论文指出，该类别信号的样本量远低于较大的药物类别。",
  "Interpretation is especially indication-sensitive because estrogen exposure is strongly tied to sex, menopause status, and prescribing context.":
    "该结果尤其受适应证影响，因为雌激素暴露与性别、绝经状态和处方场景强相关。",
  "Interpretation is especially indication-sensitive because estrogen exposure is women-only in this analysis and tied to hormone-therapy context.":
    "该结果尤其受适应证影响，因为该分析中的雌激素暴露只涉及女性，并与激素治疗场景相关。",
  "Interpretation is very sensitive to indication, sex, and small exposed sample size for this contraceptive row.":
    "该避孕药条目对适应证、性别和较小暴露样本量非常敏感。",
  "Vaccine rows can be especially healthy-user and travel-behavior sensitive, so this is a rankable signal rather than a causal claim.":
    "疫苗条目尤其可能受到健康使用者和旅行行为影响，因此这里只作为可排序信号，而不是因果结论。",
  "Class-level interpretation is weaker than the individual atorvastatin row because the reported confidence interval reaches 1.00.":
    "类别层级解读弱于单个阿托伐他汀条目，因为报告的置信区间达到 1.00。",
  "This is a dose/formulation-specific concentration-table row, so interpret it separately from the parent-drug aggregate.":
    "这是浓度表中的剂量/剂型特异条目，应与该药物的汇总结果分开解读。",
  "This row has fewer than 500 exposed users, so treat the large ACM estimate as a small-sample concentration signal.":
    "该条目的暴露使用者少于 500 人，因此这个较大的全因死亡率估计应按小样本浓度信号解读。",
  "A UK Biobank lithium-duration study did not find that lithium duration predicted all-cause mortality.":
    "一项 UK Biobank 锂盐使用时长研究未发现锂盐时长可预测全因死亡率。",
  "591 lithium-prescribed participants; primary-care prescriptions linked to telomere length, frailty, metabolomic age, pulse, and mortality.":
    "591 名有锂盐处方的参与者；初级保健处方与端粒长度、虚弱、代谢组年龄、脉搏和死亡率相关联。",
  "This is already a focused UK Biobank follow-up analysis rather than a broad medication screen hit.":
    "这已经是一项聚焦的 UK Biobank 后续分析，而不是广泛药物筛查中的命中项。",
  "Useful as a methodological contrast for future candidate-drug validation in the human view.":
    "可作为人类视图中未来候选药物验证的方法学对照。",
  "The null duration finding is easier to treat as a caution than as evidence against all possible lithium effects.":
    "这一时长分析的阴性结果更适合作为谨慎解读，而不是否定锂盐所有可能作用的证据。",
  "The study tests duration among prescribed users, not randomized lithium assignment versus nonuse.":
    "该研究检验的是处方使用者中的用药时长，而不是随机分配锂盐与未使用的比较。",
  "Systematic identification of potential lifespan-modulating drugs and long-term health outcomes in the UK Biobank":
    "在 UK Biobank 中系统识别潜在寿命调节药物及长期健康结局",
  "UK Biobank lifespan drug project": "UK Biobank 寿命药物项目",
  "UK Biobank drug-screen project": "UK Biobank 药物筛查项目",
  "Official UK Biobank project page for approved research project 1246676, focused on prescription medications, all-cause mortality, multimorbidity, and candidate geroprotective drugs.":
    "UK Biobank 已批准研究项目 1246676 的官方项目页面，聚焦处方药、全因死亡率、多病共存和候选护老药物。",
  "The page describes a current project and validation plan, but it does not publish medication-specific ACM hazard ratios or a ranked drug result table.":
    "该页面描述的是当前项目和验证计划，但没有发布药物级全因死亡率风险比或药物结果排名表。",
  "A UK Biobank approved research project to identify potential lifespan-modulating drugs from prescription-medication records and long-term health outcomes.":
    "一个 UK Biobank 已批准研究项目，旨在从处方药记录和长期健康结局中识别潜在寿命调节药物。",
  Current: "当前",
  "No ACM HR table": "无全因死亡率 HR 表",
  "Project status": "项目状态",
  "Result availability": "结果可用性",
  "Only the UK Biobank project page is included here. Because that page is a project listing rather than a released result table, the human tab does not rank individual medications by ACM effect.":
    "这里仅纳入 UK Biobank 项目页面。由于该页面是项目列表页而非已发布结果表，人类标签页不会按全因死亡率影响对单个药物排序。",
  "The project plans to screen prescription medications within UK Biobank for associations with reduced all-cause mortality and delayed multimorbidity.":
    "该项目计划在 UK Biobank 中筛查处方药与较低的全因死亡率和延迟多病共存之间的关联。",
  "The source page lists linked primary-care, hospital, and mortality records as the data basis for high-throughput survival analysis.":
    "来源页面列出关联的初级保健、住院和死亡记录，作为高通量生存分析的数据基础。",
  "The project page explicitly names propensity-based approaches and active-comparator designs as planned validation methods.":
    "项目页面明确列出基于倾向评分的方法和主动对照设计作为计划验证方法。",
  "This is a project-source score, not a drug-effect score. Add drug-level rows only after this project releases medication-specific estimates.":
    "这是项目来源分数，不是药物效应分数。只有在该项目发布药物级估计后，才添加药物级条目。",
  "No medication-specific all-cause-mortality effects are displayed because the allowed UK Biobank page does not publish them.":
    "不显示药物级全因死亡率影响，因为当前可用的 UK Biobank 页面没有发布这些结果。",
  "Avoid importing additional UK Biobank publications, field documentation, or result tables unless they are explicitly allowed again.":
    "除非再次明确允许，否则不要导入其他 UK Biobank 论文、字段文档或结果表。",
  "Avoid importing the medication-wide paper, lithium-duration study, GP field page, or other UK Biobank resources unless they are explicitly allowed again.":
    "除非再次明确允许，否则不要导入全药物范围论文、锂盐时长研究、GP 字段页面或其他 UK Biobank 资源。",
  "Current UK Biobank project designed to screen prescription medications for reduced all-cause mortality and delayed multimorbidity across the pharmacome.":
    "当前 UK Biobank 项目，旨在跨药物组筛选与降低全因死亡率和延缓多病共存相关的处方药。",
  "Useful follow-up resource because it explicitly plans propensity-based and active-comparator validation for candidate geroprotective drugs.":
    "这是有用的后续资源，因为它明确计划对候选护老药物进行基于倾向评分和主动对照的验证。",
  "The duration of lithium use and biological ageing: telomere length, frailty, metabolomic age and all-cause mortality":
    "锂盐使用时长与生物衰老：端粒长度、虚弱、代谢组年龄和全因死亡率",
  "UK Biobank primary-care prescription analysis of lithium duration, telomere length, frailty, metabolomic age, pulse rate, and all-cause mortality.":
    "基于 UK Biobank 初级保健处方记录，分析锂盐使用时长、端粒长度、虚弱、代谢组年龄、脉率和全因死亡率。",
  "Adds a Biobank-only cautionary example: lithium duration did not predict all-cause mortality or biological-age markers in this cohort.":
    "补充一个仅来自 Biobank 的谨慎解读案例：在该队列中，锂盐使用时长不能预测全因死亡率或生物年龄标志物。",
  "Official resource describing linked GP, hospital, cancer, and death registry records behind human medication-mortality analyses.":
    "官方资源，说明支撑人类药物-死亡率分析的全科医生、住院、癌症和死亡登记关联记录。",
  "Primary care data include coded prescriptions, while death data provide date and cause of death for mortality endpoints.":
    "初级保健数据包含编码处方，死亡数据则提供死亡终点所需的日期和死因。",
  "Showcase field for GP prescription record counts and access to the gp_scripts primary-care prescriptions table.":
    "用于全科医生处方记录数量及 gp_scripts 初级保健处方表访问的 Showcase 字段。",
  "The field documents prescription-record availability for 221,863 participants and points to the record-level table used for drug exposure work.":
    "该字段记录了 221,863 名参与者的处方记录可用性，并指向用于药物暴露研究的记录级数据表。",
  "Statins (HMGCR inhibitors)": "他汀类（HMGCR 抑制剂）",
  "SGLT2 inhibitors": "SGLT2 抑制剂",
  "GLP-1 receptor agonists": "GLP-1 受体激动剂",
  "ACE inhibitors": "ACE 抑制剂",
  "Beta-blockers": "β 受体阻滞剂",
  "Mineralocorticoid receptor antagonists": "盐皮质激素受体拮抗剂",
  "Direct oral anticoagulants (DOACs)": "直接口服抗凝药（DOACs）",
  Metformin: "二甲双胍",
  "Metformin (Figure 5)": "二甲双胍（图 5）",
  "PCSK9 inhibitors": "PCSK9 抑制剂",
  "Calcium-channel blockers": "钙通道阻滞剂",
  "Secondary prevention and high atherosclerotic cardiovascular risk":
    "二级预防及高动脉粥样硬化性心血管风险",
  "Type 2 diabetes, chronic kidney disease, and heart failure risk":
    "2 型糖尿病、慢性肾病及心力衰竭风险",
  "Type 2 diabetes and obesity with elevated cardiovascular risk":
    "伴心血管高风险的 2 型糖尿病与肥胖人群",
  "Hypertension, heart failure with reduced ejection fraction, and vascular risk":
    "高血压、射血分数降低型心衰及血管风险",
  "Heart failure with reduced ejection fraction and selected post-MI/AF populations":
    "射血分数降低型心衰及部分心梗后/房颤人群",
  "Heart failure with reduced ejection fraction and selected cardiorenal disease":
    "射血分数降低型心衰及部分心肾疾病人群",
  "Atrial fibrillation and other thromboembolic-risk indications":
    "房颤及其他血栓栓塞风险适应证",
  "Type 2 diabetes and cardiometabolic-risk populations":
    "2 型糖尿病及心代谢高风险人群",
  "Very-high-risk atherosclerotic cardiovascular disease and severe LDL elevation":
    "极高风险动脉粥样硬化性心血管疾病及严重 LDL 升高",
  "Hypertension, coronary disease, and selected vascular-risk populations":
    "高血压、冠心病及部分血管高风险人群",
  "Best overall medication-class case for lower human all-cause mortality when used in appropriately selected adults, especially secondary prevention and other high-risk lipid-lowering settings.":
    "在合适筛选的成年人中，尤其是二级预防和其他高风险降脂场景下，他汀类是降低全因死亡风险证据最强的药物类别之一。",
  "Among newer cardiometabolic classes, SGLT2 inhibitors have one of the strongest class-level all-cause mortality signals and the cleanest consistency across randomized and real-world data.":
    "在较新的心代谢药物类别中，SGLT2 抑制剂拥有最强的一类全因死亡获益信号之一，并且在随机研究和真实世界数据中一致性很高。",
  "GLP-1 receptor agonists now have a credible class-level all-cause mortality signal in randomized evidence plus supportive real-world and drug-target genetic data.":
    "GLP-1 受体激动剂如今已在随机证据中展现出可信的类别级全因死亡获益信号，同时还有真实世界和药物靶点遗传数据支持。",
  "ACE inhibitors hold up well under a medication-only evidence filter because the all-cause mortality benefit appears in class-level meta-analysis and remains directionally supported by real-world and drug-target evidence.":
    "在仅看药物证据的筛选下，ACE 抑制剂表现稳健，因为其全因死亡获益已在类别级荟萃分析中出现，且仍得到真实世界与药物靶点证据的方向性支持。",
  "Beta-blockers remain high on the list because mortality benefit is still robust in the populations where they are biologically and clinically well matched, especially reduced-EF heart failure.":
    "β 受体阻滞剂仍排名靠前，因为在其生物学和临床适配度高的人群中，尤其是射血分数降低型心衰患者中，死亡获益仍然稳健。",
  "MRAs rank below beta-blockers mostly because the genetic layer is thinner, not because the heart-failure mortality signal is weak.":
    "MRA 排名低于 β 受体阻滞剂，主要是因为遗传证据层更薄弱，而不是因为其心衰死亡获益信号不足。",
  "DOACs stay in the top 10 because indication-specific mortality evidence is large and consistent, but the Mendelian layer is more pathway-level than direct class validation.":
    "DOAC 仍位列前 10，是因为其针对适应证的人群死亡证据量大且一致，但孟德尔证据更多停留在通路层面，而非直接验证药物类别。",
  "Metformin drops under the stricter filter because much of the all-cause mortality signal still comes from observational data, but it remains top 10 on breadth and healthy-aging plausibility.":
    "在更严格的筛选下，二甲双胍排名下滑，因为其大量全因死亡信号仍来自观察性数据，但凭借证据广度和健康衰老的合理性，它仍保持前 10。",
  "PCSK9 inhibition ranks below the older lipid classes because the randomized all-cause mortality signal remains weak overall, even though the drug-target genetics are attractive for lifespan and longevity.":
    "PCSK9 抑制排在传统降脂类别之后，因为其随机试验中的全因死亡信号整体仍偏弱，尽管药物靶点遗传学对寿命和长寿而言相当有吸引力。",
  "Calcium-channel blockers only barely stay in the top 10. The meta-analytic mortality signal is modest, but epidemiology and antihypertensive drug-target genetics keep the class above the cut line.":
    "钙通道阻滞剂勉强留在前 10。其荟萃分析中的死亡信号较弱，但流行病学和降压药物靶点遗传学仍让这一类别保持在入选线之上。",
  "Strongest medication-class triangulation": "药物类别三角互证最强",
  "Very strong modern class signal": "现代药物类别信号极强",
  "Strong cross-stream cardiometabolic support": "跨证据流的心代谢支持强",
  "Strong conventional cardiovascular evidence": "传统心血管证据强",
  "Strong in the right phenotype": "在合适表型中证据强",
  "Strong HF signal, thinner genetics": "心衰信号强，遗传层较薄",
  "Strong indication-specific benefit": "适应证特异性获益强",
  "Broad but still confounded signal": "信号广泛但仍受混杂影响",
  "Excellent genetics, softer ACM trials": "遗传证据优秀，但全因死亡试验较弱",
  "Borderline top-10 inclusion": "勉强进入前 10",
  "Large randomized meta-analyses, supportive observational syntheses, and lipid-target Mendelian evidence all point in the same direction.":
    "大型随机荟萃分析、支持性的观察性综合研究以及脂质靶点的孟德尔证据都指向同一方向。",
  "Randomized meta-analysis, multinational real-world mortality reductions, and SLC5A2-target Mendelian data all support a genuine cardiometabolic survival benefit.":
    "随机荟萃分析、多国真实世界死亡率下降，以及 SLC5A2 靶点的孟德尔数据都支持真实存在的心代谢生存获益。",
  "The randomized signal is now mature, epidemiology is supportive in high-risk diabetes and obesity populations, and GLP1R-target genetics reinforce cardiovascular plausibility.":
    "随机信号现已较成熟，流行病学在人群高风险糖尿病和肥胖患者中也提供支持，而 GLP1R 靶点遗传学进一步强化了心血管因果合理性。",
  "The trial meta-analysis is cleaner than for ARBs, observational cohorts remain supportive, and antihypertensive drug-target MR keeps the class in the upper tier.":
    "与 ARB 相比，其试验荟萃分析更清晰，观察性队列仍提供支持，降压药物靶点 MR 也让该类别维持在上位梯队。",
  "The mortality signal is concentrated in reduced-EF heart failure and some post-MI settings, with supportive real-world data and indirect drug-target genetics.":
    "死亡获益信号主要集中在射血分数降低型心衰和部分心梗后场景，同时有支持性的真实世界数据和间接药物靶点遗传证据。",
  "Heart-failure meta-analyses and real-world comparisons are supportive, but the Mendelian layer is less mature than for the higher-ranked cardiometabolic classes.":
    "心衰荟萃分析和真实世界比较提供支持，但孟德尔证据层的成熟度不及排名更高的心代谢类别。",
  "The randomized and real-world evidence is substantial in atrial fibrillation, but the genetic layer is more indirect because clean drug-target MR for current marketed DOAC classes is limited.":
    "在房颤人群中，随机和真实世界证据都相当充分，但遗传层更为间接，因为当前上市 DOAC 类别缺少足够干净的药物靶点 MR。",
  "There is a large observational literature and increasingly interesting target genetics, but the hard-mortality case is less clean than for SGLT2 inhibitors or GLP-1 receptor agonists.":
    "虽然观察性文献庞大、靶点遗传学也愈发有趣，但其硬终点死亡证据仍不如 SGLT2 抑制剂或 GLP-1 受体激动剂清晰。",
  "The class looks biologically compelling for lifespan and high-risk ASCVD, but the direct randomized all-cause mortality signal is still mostly neutral at the class level.":
    "这一类别在寿命和高风险 ASCVD 上具有很强的生物学吸引力，但直接的随机全因死亡信号在类别层面仍大多中性。",
  "The randomized mortality effect is small, but the broader stroke-prevention and antihypertensive drug-target story keeps the class in the list.":
    "随机死亡获益较小，但更广泛的卒中预防和降压药物靶点逻辑仍让该类别保留在榜单中。",
  "More intensive LDL lowering with statin therapy reduced all-cause mortality in randomized evidence.":
    "随机证据显示，更强化的他汀降 LDL 治疗可降低全因死亡率。",
  "Observational syntheses in adults aged 65 years and older support lower all-cause mortality with statin therapy.":
    "针对 65 岁及以上成年人的观察性综合研究支持他汀治疗与更低全因死亡率相关。",
  "Drug-target lipid genetics support longer lifespan and longevity for LDL-lowering pathways, including HMGCR.":
    "药物靶点脂质遗传学支持包括 HMGCR 在内的降 LDL 通路与更长寿命和长寿相关。",
  "Randomized meta-analysis showed lower all-cause mortality alongside lower cardiovascular death and heart-failure hospitalization.":
    "随机荟萃分析显示，SGLT2 抑制剂在降低心血管死亡和心衰住院的同时，也降低了全因死亡率。",
  "Large international cohorts comparing SGLT2 inhibitors with DPP-4 inhibitors found substantially lower all-cause mortality.":
    "大型国际队列比较 SGLT2 抑制剂与 DPP-4 抑制剂后发现，前者与显著更低的全因死亡率相关。",
  "SLC5A2-based Mendelian analyses support favorable downstream effects on coronary disease and atrial fibrillation biology.":
    "基于 SLC5A2 的孟德尔分析支持其对冠心病和房颤相关生物学具有有利的下游影响。",
  "Large randomized meta-analyses show a lower all-cause death rate for the GLP-1 receptor agonist class.":
    "大型随机荟萃分析显示，GLP-1 受体激动剂类别的全因死亡率更低。",
  "Large population-based cohorts associate GLP-1 receptor agonist use with lower all-cause mortality in high-risk diabetes populations.":
    "大型人群队列研究显示，在高风险糖尿病人群中，GLP-1 受体激动剂的使用与更低全因死亡率相关。",
  "GLP1R-target Mendelian evidence supports lower coronary and heart-failure risk, strengthening causal plausibility.":
    "GLP1R 靶点的孟德尔证据支持更低的冠心病和心衰风险，从而增强了因果合理性。",
  "ACE inhibitor treatment was associated with lower all-cause mortality in hypertension trials, unlike ARBs.":
    "与 ARB 不同，ACE 抑制剂在高血压试验中与更低全因死亡率相关。",
  "Propensity-matched heart-failure cohorts in older adults show lower all-cause mortality with renin-angiotensin system inhibitor use.":
    "在老年心衰人群的倾向评分匹配队列中，肾素-血管紧张素系统抑制剂的使用与更低全因死亡率相关。",
  "Antihypertensive drug-target Mendelian evidence supports blood-pressure-mediated prevention of atrial fibrillation and related vascular risk.":
    "降压药物靶点的孟德尔证据支持通过降压来预防房颤及相关血管风险。",
  "Individual patient-level meta-analysis supports lower mortality for beta-blockers in heart failure when the phenotype fits the class.":
    "个体患者水平的荟萃分析支持：当表型与药物类别匹配时，β 受体阻滞剂可在心衰中降低死亡率。",
  "Nationwide atrial-fibrillation cohorts with concomitant heart failure show lower mortality with beta-blocker therapy.":
    "全国范围的房颤合并心衰队列显示，β 受体阻滞剂治疗与更低死亡率相关。",
  "ADRB1-centered antihypertensive drug-target Mendelian evidence supports lower atrial-fibrillation and stroke risk.":
    "以 ADRB1 为中心的降压药物靶点孟德尔证据支持更低的房颤和卒中风险。",
  "Modern heart-failure meta-analyses support lower all-cause mortality with mineralocorticoid receptor antagonists.":
    "现代心衰荟萃分析支持盐皮质激素受体拮抗剂可降低全因死亡率。",
  "Propensity-matched real-world comparisons suggest lower all-cause mortality with eplerenone versus spironolactone in HFrEF.":
    "倾向评分匹配的真实世界比较提示，在 HFrEF 中依普利酮相较螺内酯与更低全因死亡率相关。",
  "Drug-target Mendelian evidence exists inside antihypertensive class analyses, but the MRA-specific signal is still limited.":
    "降压药类别分析中存在药物靶点孟德尔证据，但针对 MRA 的特异性信号仍然有限。",
  "Randomized atrial-fibrillation meta-analysis found modest all-cause mortality advantage for DOACs over warfarin.":
    "针对房颤的随机荟萃分析发现，DOAC 相比华法林具有适度的全因死亡优势。",
  "Population-based cohorts continue to report lower or slightly lower mortality with DOACs relative to warfarin.":
    "基于人群的队列研究持续报告，与华法林相比，DOAC 的死亡率更低或略低。",
  "The strongest genetic support is pathway-level, with coagulation-factor Mendelian data supporting thromboembolic risk reduction rather than a clean DOAC class proxy.":
    "最强的遗传支持仍停留在通路层面，凝血因子相关的孟德尔数据支持血栓栓塞风险下降，而非清晰的 DOAC 类别代理信号。",
  "Systematic reviews suggest lower all-cause mortality for metformin, but much of the evidence is observational and indication-sensitive.":
    "系统综述提示二甲双胍与更低全因死亡率相关，但其中大量证据来自观察性研究且受适应证影响。",
  "High-risk diabetes cohorts consistently associate metformin use with lower all-cause mortality.":
    "高风险糖尿病队列持续显示，二甲双胍使用与更低全因死亡率相关。",
  "Metformin-target Mendelian studies support healthier aging phenotypes, but the target architecture is complex and not yet a clean mortality story.":
    "针对二甲双胍靶点的孟德尔研究支持更健康的衰老表型，但其靶点架构复杂，尚未形成清晰的死亡获益证据链。",
  "Randomized meta-analyses show strong event reduction but mostly neutral class-wide all-cause mortality.":
    "随机荟萃分析显示，PCSK9 抑制剂可显著减少事件，但类别层面的全因死亡率总体仍接近中性。",
  "Retrospective cohort analyses suggest lower mortality in selected real-world users, but this remains less mature than the statin evidence base.":
    "回顾性队列分析提示，在特定真实世界使用者中死亡率更低，但这部分证据仍不如他汀证据体系成熟。",
  "Drug-target Mendelian studies support a lifespan benefit from lower LDL, with PCSK9 often emerging as one of the cleaner longevity-linked pathways.":
    "药物靶点孟德尔研究支持降低 LDL 有利于寿命延长，而 PCSK9 常被视为较清晰的长寿相关通路之一。",
  "Long-acting calcium-channel blocker meta-analysis showed a small all-cause mortality reduction and a clearer stroke benefit.":
    "长效钙通道阻滞剂的荟萃分析显示，全因死亡率略有下降，卒中获益则更为明确。",
  "Large stable-coronary-disease cohorts suggest calcium antagonists are not associated with excess mortality and may be directionally favorable in selected groups.":
    "大型稳定性冠心病队列提示，钙拮抗剂并不伴随额外死亡风险，且在部分人群中可能方向性有利。",
  "Antihypertensive drug-target Mendelian evidence supports lower atrial-fibrillation and stroke risk for calcium-channel blocker biology.":
    "降压药物靶点的孟德尔证据支持钙通道阻滞剂相关生物学与更低的房颤和卒中风险相关。",
  "170,000 participants across 26 trials.": "26 项试验，共 170,000 名参与者。",
  "815,667 participants across 10 observational studies.": "10 项观察性研究，共 815,667 名参与者。",
  "Two-sample Mendelian randomization of lifespan and longevity outcomes.":
    "针对寿命与长寿结局的双样本孟德尔随机化分析。",
  "Cardiovascular-disease RCT meta-analysis.": "心血管疾病随机对照试验荟萃分析。",
  "CVD-REAL 2 multinational cohort.": "CVD-REAL 2 多国队列。",
  "Drug-target Mendelian randomization for SGLT2 inhibition.":
    "针对 SGLT2 抑制的药物靶点孟德尔随机化。",
  "99,599 participants across 21 randomized trials.": "21 项随机试验，共 99,599 名参与者。",
  "Propensity-matched nationwide cohort in type 2 diabetes.":
    "2 型糖尿病全国性倾向评分匹配队列。",
  "Drug-target Mendelian randomization using GLP1R variants.":
    "基于 GLP1R 变异的药物靶点孟德尔随机化。",
  "158,998 participants across 20 morbidity-mortality trials.":
    "20 项发病率-死亡率试验，共 158,998 名参与者。",
  "Swedish Heart Failure Registry cohort aged over 80 years.":
    "瑞典心衰注册队列，年龄超过 80 岁。",
  "The genetic layer is supportive but less direct for lifespan than lipid targets.":
    "遗传证据层提供支持，但对寿命的直接性不如脂质靶点。",
  "Double-blind trial-level synthesis across heart-failure phenotypes.":
    "覆盖不同心衰表型的双盲试验层级综合分析。",
  "Large registry-based observational cohort.": "大型基于注册数据库的观察性队列。",
  "Indirect genetic support rather than a clean longevity readout.":
    "属于间接遗传支持，而非清晰的长寿结果。",
  "Individual patient-level heart-failure synthesis.":
    "个体患者水平的心衰综合分析。",
  "Real-world matched cohort of reduced-EF heart failure.":
    "射血分数降低型心衰的真实世界匹配队列。",
  "Genetic support is weaker and less precise than for ACE inhibitors, beta-blockers, or calcium-channel blockers.":
    "遗传支持弱于 ACE 抑制剂、β 受体阻滞剂或钙通道阻滞剂，且精确度也更低。",
  "Meta-analysis of randomized AF trials.": "房颤随机试验荟萃分析。",
  "Modern comparative-effectiveness cohorts in routine care.":
    "常规医疗环境下的现代比较效果队列。",
  "Factor XI biology is supportive but indirect for current DOAC use.":
    "Factor XI 生物学提供支持，但对当前 DOAC 使用而言仍属间接证据。",
  "Broad meta-analysis focused on mortality and aging-related disease outcomes.":
    "聚焦死亡率和衰老相关疾病结局的广泛荟萃分析。",
  "Large cardiovascular-risk cohort from SAVOR-TIMI 53.":
    "来自 SAVOR-TIMI 53 的大型心血管高风险队列。",
  "Healthy-aging MR using metformin target proxies and phenotypic age.":
    "基于二甲双胍靶点代理和表型年龄的健康衰老孟德尔随机化分析。",
  "35 randomized controlled trials in hypercholesterolemia and secondary prevention.":
    "35 项关于高胆固醇血症和二级预防的随机对照试验。",
  "TriNetX-style retrospective comparative cohort evidence.":
    "TriNetX 风格的回顾性比较队列证据。",
  "Lifespan and longevity Mendelian randomization with target-specific LDL lowering.":
    "基于靶点特异性 LDL 降低的寿命与长寿孟德尔随机化分析。",
  "175,634 patients across 27 trials.": "27 项试验，共 175,634 名患者。",
  "International cohort in stable coronary artery disease.":
    "稳定性冠心病国际队列。",
  "The genetic layer is more convincing for rhythm and stroke endpoints than for longevity itself.":
    "遗传证据层在心律和卒中终点上更有说服力，而对长寿本身的支持较弱。",
};

const MOUSE_INTERVENTION_TRANSLATIONS = {
  "17-alpha-Estradiol": "17-α-雌二醇",
  "alpha-(4-hydroxyphenyl)-N-tert-butylnitrone":
    "α-(4-羟基苯基)-N-叔丁基硝酮",
  Astaxanthin: "虾青素",
  "(R/S)-1,3-Butanediol": "(R/S)-1,3-丁二醇",
  "Caffeic acid phenethyl ester": "咖啡酸苯乙酯",
  "Candesartan cilexetil": "坎地沙坦酯",
  Canagliflozin: "卡格列净",
  Captopril: "卡托普利",
  "17-dimethylaminoethylamino-17-demethoxygeldanamycin":
    "17-二甲氨基乙氨基-17-去甲氧基格尔德霉素",
  "Dimethyl fumarate": "富马酸二甲酯",
  "2,4-Dinitrophenol": "2,4-二硝基苯酚",
  Enalapril: "依那普利",
  "Fish oil": "鱼油",
  Fisetin: "漆黄素",
  Geranylgeranylacetone: "香叶基香叶基丙酮",
  Glycine: "甘氨酸",
  "2-(2-Hydroxyphenyl)benzoxazole": "2-(2-羟基苯基)苯并恶唑",
  Hydralazine: "肼屈嗪",
  Inulin: "菊粉",
  "L-Leucine": "L-亮氨酸",
  "Methylene blue": "亚甲蓝",
  "Medium-chain triglyceride oil": "中链甘油三酯油",
  "Mycophenolic acid": "霉酚酸",
  Meclizine: "美克洛嗪",
  "Metformin + Rapamycin": "二甲双胍 + 雷帕霉素",
  Minocycline: "米诺环素",
  MitoQ: "MitoQ（线粒体靶向泛醌）",
  Nebivolol: "奈必洛尔",
  Nitroflurbiprofen: "硝基氟比洛芬",
  "Nicotinamide riboside": "烟酰胺核糖",
  "Oxaloacetic acid": "草酰乙酸",
  "16-alpha-Hydroxyestriol": "16-α-羟基雌三醇",
  "4-Phenylbutyrate": "4-苯丁酸",
  Protandim: "Protandim（植物抗氧化配方）",
  "Rapamycin + Acarbose": "雷帕霉素 + 阿卡波糖",
  Simvastatin: "辛伐他汀",
  Sulindac: "舒林酸",
  Syringaresinol: "丁香树脂酚",
  "Sodium thiosulfate": "硫代硫酸钠",
  "Ursolic acid": "熊果酸",
  "Ursodeoxycholic acid": "熊去氧胆酸",
  "beta-Guanidinopropionic acid": "β-胍基丙酸",
};

const MOUSE_INTERVENTION_DESCRIPTION_TRANSLATIONS = {
  "An estrogen-related steroid and stereoisomer of estradiol studied for metabolic and neuroprotective effects.":
    "一种与雌二醇相关的类固醇及其立体异构体，常被研究其代谢和神经保护作用。",
  "A synthetic nitrone compound studied as an antioxidant and free-radical scavenger.":
    "一种合成硝酮化合物，常被研究其抗氧化和清除自由基作用。",
  "A carotenoid pigment and antioxidant found in algae, salmon, and shellfish.":
    "一种存在于藻类、鲑鱼和贝类中的类胡萝卜素色素兼抗氧化剂。",
  "A ketone-body precursor alcohol that can be metabolized to beta-hydroxybutyrate.":
    "一种可代谢为 β-羟基丁酸的酮体前体醇类化合物。",
  "A propolis-derived polyphenol studied for antioxidant and anti-inflammatory activity.":
    "一种来源于蜂胶的多酚，常被研究其抗氧化和抗炎活性。",
  "An angiotensin II receptor blocker (ARB) used to treat high blood pressure.":
    "一种用于治疗高血压的血管紧张素 II 受体阻滞剂（ARB）。",
  "An SGLT2 inhibitor diabetes drug that increases urinary glucose excretion.":
    "一种 SGLT2 抑制剂类糖尿病药物，可增加尿糖排泄。",
  "An ACE inhibitor used to treat hypertension and heart failure.":
    "一种用于治疗高血压和心力衰竭的 ACE 抑制剂。",
  "A renin-angiotensin-system medication class used for hypertension, heart failure, kidney protection, and related cardiovascular indications.":
    "一种肾素-血管紧张素系统药物类别，用于高血压、心力衰竭、肾脏保护及相关心血管适应证。",
  "UK Biobank ACE-inhibitor class prescription users":
    "UK Biobank ACE 抑制剂类别处方使用者",
  "A glucose-lowering biguanide medicine used for type 2 diabetes and cardiometabolic-risk management.":
    "一种降糖双胍类药物，用于 2 型糖尿病和心血管代谢风险管理。",
  "UK Biobank metformin prescription users": "UK Biobank 二甲双胍处方使用者",
  "UK Biobank Figure 5 metformin prescription users":
    "UK Biobank 图 5 二甲双胍处方使用者",
  "A PDE5 inhibitor used for erectile dysfunction, pulmonary arterial hypertension, and urinary symptoms from benign prostatic hyperplasia.":
    "一种 PDE5 抑制剂，用于勃起功能障碍、肺动脉高压，以及良性前列腺增生相关尿路症状。",
  "UK Biobank PDE5 inhibitor prescription users": "UK Biobank PDE5 抑制剂处方使用者",
  "A hormonal contraceptive or progestogen medicine used for contraception, menstrual symptoms, or other hormone-related indications.":
    "一种激素避孕药或孕激素类药物，用于避孕、月经相关症状或其他激素相关适应证。",
  "A hormone-therapy preparation used for menopausal symptoms, local estrogen replacement, or other estrogen/progestogen indications.":
    "一种激素治疗制剂，用于绝经相关症状、局部雌激素替代或其他雌激素/孕激素相关适应证。",
  "A vaginal moisturiser used for vaginal dryness and menopausal urogenital symptoms.":
    "一种阴道保湿制剂，用于阴道干涩和绝经期泌尿生殖道症状。",
  "An ocular lubricant or artificial-tear preparation used for dry-eye symptoms and eye-surface protection.":
    "一种眼部润滑剂或人工泪液制剂，用于干眼症状和眼表保护。",
  "UK Biobank ocular lubricant users": "UK Biobank 眼部润滑剂使用者",
  "A glaucoma or ocular-hypertension eye medicine used to lower intraocular pressure.":
    "一种用于青光眼或高眼压的眼科药物，可降低眼内压。",
  "UK Biobank glaucoma eye-drop users": "UK Biobank 青光眼滴眼液使用者",
  "An allergy, rhinitis, asthma, or airway medicine used for allergic inflammation, nasal symptoms, or respiratory control.":
    "一种用于过敏、鼻炎、哮喘或气道症状的药物，可处理过敏性炎症、鼻部症状或呼吸道控制。",
  "UK Biobank allergy or airway prescription users":
    "UK Biobank 过敏或气道药物处方使用者",
  "An antihypertensive medicine or cardiovascular combination used for blood-pressure control and related cardiovascular indications.":
    "一种降压药或心血管复方药物，用于血压控制及相关心血管适应证。",
  "UK Biobank antihypertensive prescription users": "UK Biobank 降压药处方使用者",
  "A lipid-lowering medicine used to manage cholesterol, triglycerides, or broader cardiovascular risk.":
    "一种降脂药物，用于管理胆固醇、甘油三酯或更广泛的心血管风险。",
  "UK Biobank lipid-lowering prescription users": "UK Biobank 降脂药处方使用者",
  "A gastrointestinal lipase inhibitor used for weight management in obesity or overweight with risk factors.":
    "一种胃肠道脂肪酶抑制剂，用于肥胖或伴风险因素超重人群的体重管理。",
  "UK Biobank weight-management prescription users": "UK Biobank 体重管理药物处方使用者",
  "A thyroid medicine used for thyroid hormone replacement or treatment of overactive thyroid disease.":
    "一种甲状腺药物，用于甲状腺激素替代或治疗甲状腺功能亢进。",
  "UK Biobank thyroid prescription users": "UK Biobank 甲状腺药物处方使用者",
  "An atovaquone-proguanil antimalarial medicine used for malaria prevention or treatment.":
    "一种阿托伐醌-氯胍复方抗疟药，用于疟疾预防或治疗。",
  "UK Biobank antimalarial prescription users": "UK Biobank 抗疟药处方使用者",
  "An adrenaline auto-injector used for emergency treatment of severe allergic reactions and anaphylaxis.":
    "一种肾上腺素自动注射器，用于严重过敏反应和过敏性休克的急救。",
  "UK Biobank adrenaline auto-injector users": "UK Biobank 肾上腺素自动注射器使用者",
  "An anorectal symptom medicine used for haemorrhoids, anal irritation, or local rectal inflammation.":
    "一种肛肠症状用药，用于痔疮、肛门刺激或局部直肠炎症。",
  "UK Biobank anorectal prescription users": "UK Biobank 肛肠用药处方使用者",
  "A gastrointestinal antispasmodic or peppermint-oil preparation used for irritable-bowel-type abdominal cramping and bowel symptoms.":
    "一种胃肠解痉药或薄荷油制剂，用于肠易激样腹部痉挛和肠道症状。",
  "UK Biobank gastrointestinal antispasmodic users":
    "UK Biobank 胃肠解痉药使用者",
  "An anti-inflammatory medicine used for inflammatory bowel disease or related immune-inflammatory conditions.":
    "一种抗炎药物，用于炎症性肠病或相关免疫炎症性疾病。",
  "UK Biobank intestinal anti-inflammatory prescription users":
    "UK Biobank 肠道抗炎药处方使用者",
  "A supplement or non-prescription preparation used for joint symptoms, skin symptoms, or general supportive care.":
    "一种补充剂或非处方制剂，用于关节症状、皮肤症状或一般支持性护理。",
  "UK Biobank supplement or supportive-care users": "UK Biobank 补充剂或支持性护理使用者",
  "An antifibrinolytic medicine used to reduce heavy bleeding, including heavy menstrual bleeding or surgical bleeding contexts.":
    "一种抗纤溶药物，用于减少大量出血，包括月经过多或手术相关出血场景。",
  "UK Biobank antifibrinolytic prescription users": "UK Biobank 抗纤溶药处方使用者",
  "A non-opioid analgesic, anti-inflammatory, local anaesthetic, or muscle-spasm medicine used for pain or musculoskeletal symptoms.":
    "一种非阿片类镇痛、抗炎、局部麻醉或肌肉痉挛用药，用于疼痛或肌肉骨骼症状。",
  "Also called alvespimycin, a geldanamycin-derived small molecule that inhibits the Hsp90 chaperone.":
    "也称 alvespimycin，是一种来源于格尔德霉素的小分子，可抑制 Hsp90 伴侣蛋白。",
  "Also called teprenone, an anti-ulcer drug studied for heat-shock-protein induction.":
    "也称 teprenone，是一种被研究可诱导热休克蛋白的抗溃疡药物。",
  "A fumarate ester drug used clinically for relapsing multiple sclerosis and psoriasis.":
    "一种富马酸酯类药物，临床上用于复发型多发性硬化和银屑病。",
  "A mitochondrial uncoupler that increases energy expenditure; it is not an approved therapeutic drug.":
    "一种可提高能量消耗的线粒体解偶联剂；它并非获批治疗药物。",
  "An omega-3 fatty acid supplement rich in EPA and DHA.":
    "一种富含 EPA 和 DHA 的 omega-3 脂肪酸补充剂。",
  "The simplest amino acid and a common nutritional and metabolic supplement.":
    "最简单的氨基酸之一，也是常见的营养和代谢补充剂。",
  "A synthetic benzoxazole compound studied experimentally as an antioxidant small molecule.":
    "一种合成苯并恶唑化合物，被实验性研究为抗氧化小分子。",
  "A direct-acting vasodilator used to lower blood pressure.":
    "一种直接作用型血管扩张剂，用于降低血压。",
  "An experimental dual FXR/TGR5 agonist that modulates bile-acid signaling.":
    "一种实验性的双重 FXR/TGR5 激动剂，可调节胆汁酸信号。",
  "A soluble prebiotic fiber, often derived from chicory root.":
    "一种可溶性益生元纤维，常来源于菊苣根。",
  "A branched-chain essential amino acid involved in protein synthesis and mTOR signaling.":
    "一种支链必需氨基酸，参与蛋白质合成和 mTOR 信号。",
  "A redox-active dye and drug used clinically for methemoglobinemia and studied for mitochondrial effects.":
    "一种具有氧化还原活性的染料和药物，临床上用于高铁血红蛋白血症，也被研究其线粒体作用。",
  "A dietary fat supplement made of medium-chain triglycerides that are rapidly oxidized for energy.":
    "一种由中链甘油三酯构成的膳食脂肪补充剂，可被快速氧化供能。",
  "An experimental small-molecule antagonist of macrophage migration inhibitory factor (MIF).":
    "一种实验性的小分子巨噬细胞迁移抑制因子（MIF）拮抗剂。",
  "An immunosuppressant that inhibits inosine monophosphate dehydrogenase and purine synthesis.":
    "一种免疫抑制剂，可抑制肌苷酸单磷酸脱氢酶和嘌呤合成。",
  "An antihistamine used for motion sickness and vertigo.":
    "一种用于晕动病和眩晕的抗组胺药。",
  "A combination of metformin and rapamycin pairing a biguanide with an mTOR inhibitor.":
    "二甲双胍与雷帕霉素的联合方案，将双胍类药物与 mTOR 抑制剂配对使用。",
  "A tetracycline antibiotic with anti-inflammatory and neuroprotective research interest.":
    "一种四环素类抗生素，因其抗炎和神经保护潜力而受到研究关注。",
  "A mitochondria-targeted ubiquinone antioxidant.":
    "一种线粒体靶向的泛醌类抗氧化剂。",
  "A beta1-selective beta-blocker with nitric-oxide-mediated vasodilatory effects.":
    "一种 β1 选择性 β 受体阻滞剂，并具有一氧化氮介导的血管扩张作用。",
  "A nitric-oxide-releasing derivative of the NSAID flurbiprofen.":
    "一种可释放一氧化氮的氟比洛芬 NSAID 衍生物。",
  "A vitamin B3-related NAD+ precursor used as a nutritional supplement.":
    "一种与维生素 B3 相关的 NAD+ 前体，可作为营养补充剂。",
  "A tricarboxylic acid cycle intermediate involved in cellular energy metabolism.":
    "一种参与细胞能量代谢的三羧酸循环中间产物。",
  "An estrogenic steroid metabolite related to estriol.":
    "一种与雌三醇相关的雌激素性类固醇代谢物。",
  "A phytochemical blend designed to activate the Nrf2 cellular stress-response pathway.":
    "一种旨在激活 Nrf2 细胞应激反应通路的植物化学混合物。",
  "A short-chain fatty acid derivative used clinically as a nitrogen-scavenging drug and chemical chaperone.":
    "一种短链脂肪酸衍生物，临床上可用作清氮药物和化学伴侣。",
  "A multi-ingredient botanical supplement marketed as an Nrf2 activator.":
    "一种以 Nrf2 激活剂为卖点的多成分植物补充剂。",
  "A combination of rapamycin, an mTOR inhibitor, and acarbose, a carbohydrate-digestion blocker.":
    "雷帕霉素与阿卡波糖的联合方案，将 mTOR 抑制剂与碳水消化阻断剂配对使用。",
  "An experimental oral hydrogen sulfide donor.":
    "一种实验性口服硫化氢供体。",
  "A statin drug that lowers cholesterol by inhibiting HMG-CoA reductase.":
    "一种通过抑制 HMG-CoA 还原酶来降低胆固醇的他汀类药物。",
  "A nonsteroidal anti-inflammatory drug (NSAID) used for pain and inflammation.":
    "一种用于止痛和抗炎的非甾体抗炎药（NSAID）。",
  "A plant lignan polyphenol studied for antioxidant activity.":
    "一种被研究其抗氧化活性的植物木脂素多酚。",
  "An inorganic salt used medically as a cyanide antidote and sulfur donor.":
    "一种在医学上可用作氰化物解毒剂和硫供体的无机盐。",
  "An experimental small-molecule inhibitor of plasminogen activator inhibitor-1 (PAI-1).":
    "一种实验性的小分子纤溶酶原激活物抑制剂-1（PAI-1）抑制剂。",
  "A pentacyclic triterpenoid found in apple peels and other plants.":
    "一种存在于苹果皮及其他植物中的五环三萜类化合物。",
  "A bile acid drug used for cholestatic liver disease and to dissolve some gallstones.":
    "一种用于胆汁淤积性肝病并可溶解部分胆结石的胆汁酸药物。",
  "A creatine analog that perturbs cellular energy metabolism.":
    "一种会扰动细胞能量代谢的肌酸类似物。",
};

const INTERVENTION_QUALIFIER_TRANSLATIONS = {
  "start 6 mo": "6 月龄开始",
  "start 9 mo": "9 月龄开始",
  "start 16 mo": "16 月龄开始",
  "start 18 mo": "18 月龄开始",
  "start 20 mo": "20 月龄开始",
  "600 ppm, 3 days on / 11 days off": "600 ppm，给药 3 天 / 停药 11 天",
  "600 ppm, continuous": "600 ppm，持续给药",
  "42 ppm, continuous from 20 mo": "42 ppm，自 20 月龄起持续给药",
  "42 ppm, cycling from 20 mo": "42 ppm，自 20 月龄起周期给药",
  "42 ppm, 20 to 23 mo only": "42 ppm，仅 20 至 23 月龄",
  "FXR/TGR5 agonist": "FXR/TGR5 激动剂",
  "MIF antagonist": "MIF 拮抗剂",
  "Nrf2 activator blend": "Nrf2 激活混合物",
  "PAI-1 inhibitor": "PAI-1 抑制剂",
  "hydrogen sulfide donor": "硫化氢供体",
};

const PATHWAY_LABEL_TRANSLATIONS = {
  "control condition": "对照条件",
  "carbohydrate absorption": "碳水吸收",
  "AMPK / hepatic glucose": "AMPK / 肝脏葡萄糖输出",
  "glucose regulation": "葡萄糖调节",
  "renal glucose handling": "肾脏葡萄糖处理",
  "mTOR signaling": "mTOR 信号",
  "AMPK + mTOR": "AMPK + mTOR",
  "mTOR + carbohydrate load": "mTOR + 碳水负荷",
  "antioxidant / stress response": "抗氧化 / 应激反应",
  "mitochondrial metabolism": "线粒体代谢",
  "lipid / fuel handling": "脂质 / 燃料处理",
  "PDE5 / cGMP signaling": "PDE5 / cGMP 信号",
  "sex-hormone signaling": "性激素信号",
  "migraine serotonin signaling": "偏头痛血清素信号",
  "vaccine / immune memory": "疫苗 / 免疫记忆",
  "antimicrobial exposure": "抗微生物暴露",
  "gastric acid suppression": "胃酸抑制",
  "cardiac electrophysiology": "心脏电生理",
  "lithium signaling": "锂盐信号",
  "nutrient sensing": "营养感知",
  "microbiome-host metabolites": "微生物组-宿主代谢物",
  "RAAS signaling": "RAAS 信号",
  "vascular tone": "血管张力",
  "beta-adrenergic signaling": "β-肾上腺素能信号",
  "bile-acid signaling": "胆汁酸信号",
  "sulfur / gasotransmitters": "硫 / 气体递质",
  "nuclear receptor signaling": "核受体信号",
  "kinase signaling": "激酶信号",
  proteostasis: "蛋白稳态",
  "inflammatory signaling": "炎症信号",
  "neuronal signaling": "神经元信号",
  "cholinergic / dementia care": "胆碱能 / 痴呆照护",
  "dopaminergic movement control": "多巴胺能运动控制",
  "opioid analgesia": "阿片镇痛",
  "anti-seizure neurophysiology": "抗癫痫神经生理",
  "GABA sedation": "GABA 镇静",
  "antipsychotic dopamine signaling": "抗精神病药多巴胺信号",
  immunosuppression: "免疫抑制",
  "cancer endocrine therapy": "肿瘤内分泌治疗",
  "respiratory airway control": "呼吸道控制",
  "cardiorenal fluid balance": "心肾液体平衡",
  "cardiac glycoside signaling": "强心苷信号",
  "calcium-channel vascular tone": "钙通道血管张力",
  "nitrate vasodilation": "硝酸酯血管扩张",
  "bone-mineral metabolism": "骨矿物质代谢",
  "vitamin replacement": "维生素替代",
  "antiemetic / GI motility": "止吐 / 胃肠动力",
  "pancreatic enzyme replacement": "胰酶替代",
  "bowel-care physiology": "肠道护理生理",
  "oral antiseptic care": "口腔抗菌护理",
  "insulin glucose control": "胰岛素血糖控制",
  "renal acid-base balance": "肾脏酸碱平衡",
  "dermatologic barrier care": "皮肤屏障护理",
  "monoamine neuropsychiatry": "单胺神经精神通路",
  "autonomic urology": "自主神经泌尿通路",
  "urate / gout inflammation": "尿酸 / 痛风炎症",
  "antiplatelet vascular risk": "抗血小板血管风险",
  "anticoagulant vascular risk": "抗凝血管风险",
  "nicotine dependence treatment": "尼古丁依赖治疗",
  "chromatin regulation": "染色质调控",
  "immune / cell-state signaling": "免疫 / 细胞状态信号",
  "targeted stress node": "定向应激节点",
  "project workflow": "项目流程",
  "mechanism under study": "研究中的机制",
};

const PATHWAY_ASCII_TRANSLATIONS = {
  "baseline exposure only": "仅基线暴露",
  "reference aging trajectory": "参考衰老轨迹",
  "matched comparison anchor": "匹配比较基准",
  "lifespan effect readout": "寿命效应结果",
  "gut alpha-glucosidase inhibition": "肠道 α-葡萄糖苷酶抑制",
  "slower carbohydrate absorption": "碳水吸收减慢",
  "lower post-meal glucose spikes": "餐后血糖峰值更低",
  "metabolic stress relief": "代谢应激缓解",
  "hepatic glucose output down": "肝糖输出下降",
  "AMPK-linked energy sensing": "AMPK 相关能量感知",
  "lower metabolic load": "代谢负荷降低",
  "stress-resilience phenotype": "应激韧性表型",
  "glucose / insulin control": "葡萄糖 / 胰岛素控制",
  "glycemic and anabolic load down": "血糖与合成代谢负荷下降",
  "metabolic stress balance": "代谢应激平衡",
  "renal SGLT2 blockade": "肾脏 SGLT2 阻断",
  "urinary glucose loss": "尿糖排出增加",
  "fuel-use shift + glycemic relief": "能量利用转变 + 血糖负担缓解",
  "mTORC1 signaling down": "mTORC1 信号下降",
  "translation down / autophagy up": "翻译下降 / 自噬上升",
  "cellular maintenance": "细胞维护",
  "AMPK up / mTOR down": "AMPK 上调 / mTOR 下调",
  "nutrient-stress balance": "营养应激平衡",
  "nutrient-signaling load down": "营养信号负荷下降",
  "stress resistance": "应激抵抗",
  "redox + electrophile sensing": "氧化还原 + 亲电应激感知",
  "detox / antioxidant programs": "解毒 / 抗氧化程序",
  "lower oxidative-stress burden": "氧化应激负担降低",
  "mitochondrial / TCA metabolism": "线粒体 / TCA 代谢",
  "energy-state signaling": "能量状态信号",
  "cellular stress adaptation": "细胞应激适应",
  "lipid handling / mevalonate tone": "脂质处理 / 甲羟戊酸通路张力",
  "membrane and fuel-state signaling": "膜与能量状态信号",
  "PDE5 inhibition": "PDE5 抑制",
  "cGMP signaling preserved": "cGMP 信号维持",
  "vascular smooth-muscle relaxation": "血管平滑肌舒张",
  "cardiopulmonary context": "心肺背景",
  "estrogen / progestin receptor signaling": "雌激素 / 孕激素受体信号",
  "reproductive-hormone axis shift": "生殖激素轴转变",
  "vascular + metabolic context": "血管 + 代谢背景",
  "mortality association readout": "死亡率关联结果",
  "5-HT1 receptor agonism": "5-HT1 受体激动",
  "cranial vascular / trigeminal signaling shift": "颅内血管 / 三叉神经信号转变",
  "acute migraine treatment context": "急性偏头痛治疗背景",
  "vaccine antigen exposure": "疫苗抗原暴露",
  "adaptive immune priming": "适应性免疫预激",
  "infection-risk context": "感染风险背景",
  "antimicrobial or anti-infective exposure": "抗微生物或抗感染暴露",
  "pathogen / microbiome pressure shift": "病原体 / 微生物组压力转变",
  "immune-inflammatory context": "免疫炎症背景",
  "gastric acid suppression / buffering": "胃酸抑制 / 缓冲",
  "reflux or ulcer symptom control": "反流或溃疡症状控制",
  "GI comorbidity context": "胃肠合并症背景",
  "cardiac ion-channel modulation": "心脏离子通道调节",
  "rhythm / conduction shift": "心律 / 传导转变",
  "cardiac event context": "心脏事件背景",
  "lithium ion exposure": "锂离子暴露",
  "inositol / GSK3-linked signaling": "肌醇 / GSK3 相关信号",
  "neuropsychiatric treatment context": "神经精神治疗背景",
  "nutrient / substrate availability": "营养 / 底物可用性",
  "fuel selection + anabolic tone": "燃料选择 + 合成代谢张力",
  "systemic metabolic state": "全身代谢状态",
  "gut microbiome substrate": "肠道微生物组底物",
  "fermentation + host metabolites": "发酵 + 宿主代谢物",
  "systemic metabolic tone": "全身代谢张力",
  "renin-angiotensin signaling down": "肾素-血管紧张素信号下降",
  "vascular / cardiac load down": "血管 / 心脏负荷下降",
  "systemic stress tone": "全身应激张力",
  "vascular smooth-muscle tone shift": "血管平滑肌张力转变",
  "hemodynamic load adjustment": "血流动力学负荷调整",
  "beta-adrenergic signaling down": "β-肾上腺素能信号下降",
  "sympathetic / cardiac tone shift": "交感 / 心脏张力转变",
  "FXR / TGR5-style signaling": "FXR / TGR5 样信号",
  "metabolic + inflammatory tone": "代谢 + 炎症张力",
  "cell-state adaptation": "细胞状态适应",
  "H2S / sulfur signaling": "H2S / 硫信号",
  "redox + mitochondrial tone": "氧化还原 + 线粒体张力",
  "nuclear receptor engagement": "核受体参与",
  "transcriptional program shift": "转录程序转变",
  "growth / differentiation tone": "生长 / 分化张力",
  "receptor / tyrosine kinase blockade": "受体 / 酪氨酸激酶阻断",
  "growth-factor signaling down": "生长因子信号下降",
  "cell-state remodeling": "细胞状态重塑",
  "folding / aggregate handling": "折叠 / 聚集体处理",
  "proteostasis burden down": "蛋白稳态负担下降",
  "inflammatory mediator signaling": "炎症介质信号",
  "immune-stress burden down": "免疫应激负担下降",
  "tissue-damage pressure down": "组织损伤压力下降",
  "neuronal receptor / excitability shift": "神经元受体 / 兴奋性转变",
  "network + neuroendocrine tone": "神经网络 + 神经内分泌张力",
  "systemic stress response": "全身应激反应",
  "acetylcholine signaling modulation": "乙酰胆碱信号调节",
  "cognitive-symptom treatment": "认知症状治疗",
  "dementia / frailty context": "痴呆 / 衰弱背景",
  "dopamine-pathway modulation": "多巴胺通路调节",
  "motor-symptom treatment": "运动症状治疗",
  "Parkinson / neurodegeneration context": "帕金森 / 神经退行性背景",
  "mu-opioid receptor agonism": "μ 阿片受体激动",
  "analgesia + CNS / respiratory effects": "镇痛 + 中枢神经 / 呼吸影响",
  "severe pain / palliative context": "重度疼痛 / 姑息治疗背景",
  "neuronal excitability modulation": "神经元兴奋性调节",
  "seizure-threshold control": "发作阈值控制",
  "epilepsy / neurologic-burden context": "癫痫 / 神经系统负担背景",
  "GABA-A signaling potentiation": "GABA-A 信号增强",
  "sedation / anxiolysis / seizure control": "镇静 / 抗焦虑 / 发作控制",
  "falls + frailty context": "跌倒 + 衰弱背景",
  "dopamine / serotonin receptor blockade": "多巴胺 / 血清素受体阻断",
  "psychosis or agitation treatment": "精神病性症状或激越治疗",
  "neuropsychiatric vulnerability context": "神经精神易感背景",
  "serotonin / norepinephrine signaling shift": "血清素 / 去甲肾上腺素信号转变",
  "mood, pain, or sleep treatment": "情绪、疼痛或睡眠治疗",
  "neuropsychiatric comorbidity context": "神经精神合并症背景",
  "alpha-adrenergic or muscarinic signaling shift": "α-肾上腺素能或毒蕈碱信号转变",
  "urinary-flow / bladder symptom control": "尿流 / 膀胱症状控制",
  "urologic comorbidity context": "泌尿系统合并症背景",
  "urate production or crystal inflammation down": "尿酸生成或晶体炎症下降",
  "gout flare prevention": "痛风发作预防",
  "metabolic-inflammatory context": "代谢炎症背景",
  "platelet activation down": "血小板活化下降",
  "thrombotic event prevention": "血栓事件预防",
  "vascular disease context": "血管疾病背景",
  "coagulation cascade activity down": "凝血级联活性下降",
  "clot formation risk reduced": "血栓形成风险降低",
  "atrial-fibrillation / thrombosis context": "房颤 / 血栓背景",
  "nicotinic receptor partial agonism": "烟碱受体部分激动",
  "smoking-cessation support": "戒烟支持",
  "tobacco-exposure risk context": "烟草暴露风险背景",
  "lymphocyte proliferation / signaling down": "淋巴细胞增殖 / 信号下降",
  "immune suppression": "免疫抑制",
  "transplant / autoimmune disease context": "移植 / 自身免疫病背景",
  "estrogen synthesis or receptor signaling down": "雌激素合成或受体信号下降",
  "hormone-sensitive tumor treatment": "激素敏感肿瘤治疗",
  "cancer-care context": "肿瘤照护背景",
  "bronchodilation / airway inflammation control": "支气管舒张 / 气道炎症控制",
  "gas-exchange burden shift": "气体交换负担转变",
  "asthma / COPD severity context": "哮喘 / COPD 严重程度背景",
  "renal sodium / fluid handling": "肾脏钠 / 液体处理",
  "volume + cardiac load shift": "容量 + 心脏负荷转变",
  "heart-failure / renal context": "心力衰竭 / 肾脏背景",
  "Na+/K+ ATPase inhibition": "Na+/K+ ATPase 抑制",
  "contractility + rate-control effects": "收缩力 + 心率控制影响",
  "heart-failure / atrial-fibrillation context": "心力衰竭 / 房颤背景",
  "L-type calcium-channel blockade": "L 型钙通道阻断",
  "hypertension / angina context": "高血压 / 心绞痛背景",
  "nitric-oxide donor signaling": "一氧化氮信号供体",
  "venous / coronary vasodilation": "静脉 / 冠脉血管扩张",
  "ischemic-heart-disease context": "缺血性心脏病背景",
  "vitamin D / mineral handling": "维生素 D / 矿物质处理",
  "calcium-phosphate balance": "钙磷平衡",
  "renal bone / osteoporosis context": "肾性骨病 / 骨质疏松背景",
  "micronutrient replacement": "微量营养素替代",
  "deficiency-state correction": "缺乏状态纠正",
  "nutrition / alcohol-care context": "营养 / 酒精相关照护背景",
  "dopamine / histamine / motility signaling": "多巴胺 / 组胺 / 动力信号",
  "nausea and vomiting control": "恶心和呕吐控制",
  "acute illness / GI context": "急性疾病 / 胃肠背景",
  "digestive enzyme replacement": "消化酶替代",
  "fat / protein absorption support": "脂肪 / 蛋白吸收支持",
  "pancreatic disease context": "胰腺疾病背景",
  "osmotic / stool-softening effect": "渗透性 / 软便作用",
  "bowel motility support": "肠道动力支持",
  "constipation / care-dependency context": "便秘 / 照护依赖背景",
  "local antimicrobial / anti-inflammatory exposure": "局部抗微生物 / 抗炎暴露",
  "oral mucosal burden shift": "口腔黏膜负担转变",
  "dental / hospital-care context": "牙科 / 医院照护背景",
  "skin-barrier / topical inflammation control": "皮肤屏障 / 局部炎症控制",
  "itch, eczema, or fungal-burden care": "瘙痒、湿疹或真菌负担护理",
  "dermatologic comorbidity context": "皮肤科合并症背景",
  "insulin replacement": "胰岛素替代",
  "blood-glucose lowering": "血糖降低",
  "advanced diabetes context": "进展期糖尿病背景",
  "alkali replacement": "碱剂替代",
  "metabolic acidosis buffering": "代谢性酸中毒缓冲",
  "renal / acid-base context": "肾脏 / 酸碱背景",
  "chromatin / epigenetic control": "染色质 / 表观遗传控制",
  "gene-expression program shift": "基因表达程序转变",
  "immune or cell-state target": "免疫或细胞状态靶点",
  "proliferation / signaling tone": "增殖 / 信号张力",
  "systemic stress balance": "全身应激平衡",
  "named stress-response target": "特定命名的应激反应靶点",
  "inflammatory / fibrinolytic tone": "炎症 / 纤溶张力",
  "systemic stress state": "全身应激状态",
  "UK Biobank prescription records": "UK Biobank 处方记录",
  "mortality + multimorbidity outcomes": "死亡率 + 多病共存结局",
  "candidate drug prioritization": "候选药物优先级排序",
  "future validation": "未来验证",
  "cellular target under study": "研究中的细胞靶点",
  "stress-response network": "应激反应网络",
  "physiology shift": "生理状态转变",
};

const CITP_SUBJECT_TRANSLATIONS = {
  Acarbose: "阿卡波糖",
  Aldosterone: "醛固酮",
  Arecoline: "槟榔碱",
  Aspirin: "阿司匹林",
  Bakuchiol: "补骨脂酚",
  Berberine: "小檗碱",
  Bortezomib: "硼替佐米",
  Bromocriptine: "溴隐亭",
  Curcumin: "姜黄素",
  Dapagliflozin: "达格列净",
  Dasatinib: "达沙替尼",
  Decitabine: "地西他滨",
  Dexamethazone: "地塞米松",
  Erlotinib: "厄洛替尼",
  Everolimus: "依维莫司",
  Gefitinib: "吉非替尼",
  Glipizide: "格列吡嗪",
  "Green tea extract": "绿茶提取物",
  Metoprolol: "美托洛尔",
  Nateglinide: "那格列奈",
  "Nordihydroguaiaretic acid": "去甲二氢愈创木酸",
  Pioglitazone: "吡格列酮",
  Propranolol: "普萘洛尔",
  "Propyl gallate": "没食子酸丙酯",
  Quercetin: "槲皮素",
  Rapamycin: "雷帕霉素",
  Resveratrol: "白藜芦醇",
  "Retinoic acid (tretinoin)": "维甲酸（全反式维甲酸）",
  Ritonavir: "利托那韦",
  Sitagliptin: "西格列汀",
  Tamibarotene: "他米巴罗汀",
  Temsirolimus: "替西罗莫司",
  Thalidomide: "沙利度胺",
  "Thioflavin T": "硫黄素 T",
  "Valproic acid": "丙戊酸",
  "alpha-Estradiol": "α-雌二醇",
  "alpha-Ketoglutarate": "α-酮戊二酸",
  "alpha-Lipoic acid": "α-硫辛酸",
  "beta-GPA": "β-胍基丙酸",
};

const CITP_DESCRIPTION_LEAD_TRANSLATIONS = {
  "A DNA methyltransferase inhibitor used in some blood cancers and other epigenetic therapy settings.":
    "一种 DNA 甲基转移酶抑制剂，用于某些血液肿瘤及其他表观遗传治疗场景。",
  "A DPP-4 inhibitor diabetes drug that helps raise meal-related insulin signaling.":
    "一种 DPP-4 抑制剂类糖尿病药物，可增强餐后胰岛素信号。",
  "A beta1-selective beta-blocker used for high blood pressure, angina, and heart rhythm control.":
    "一种 β1 选择性 β 受体阻滞剂，用于高血压、心绞痛和心律控制。",
  "A corticosteroid drug with strong anti-inflammatory and immunosuppressive effects.":
    "一种具有强抗炎和免疫抑制作用的糖皮质激素药物。",
  "A dopamine receptor agonist used clinically for Parkinson disease, hyperprolactinemia, and some diabetes indications.":
    "一种多巴胺受体激动剂，临床上用于帕金森病、高泌乳素血症及部分糖尿病适应证。",
  "A flavonol found in fruits and vegetables that is studied for antioxidant and senolytic effects.":
    "一种存在于水果和蔬菜中的黄酮醇，常被研究其抗氧化和清除衰老细胞作用。",
  "A mineralocorticoid steroid hormone that regulates salt balance, fluid retention, and blood pressure.":
    "一种盐皮质激素类固醇激素，可调节盐平衡、体液潴留和血压。",
  "A naturally occurring alkaloid from areca nut that acts on muscarinic acetylcholine receptors.":
    "一种来源于槟榔的天然生物碱，可作用于毒蕈碱型乙酰胆碱受体。",
  "A nonsteroidal anti-inflammatory drug (NSAID) with pain-relieving, anti-inflammatory, and antiplatelet effects.":
    "一种非甾体抗炎药（NSAID），具有镇痛、抗炎和抗血小板作用。",
  "A plant alkaloid studied for effects on glucose control, lipid metabolism, and cellular stress responses.":
    "一种植物生物碱，常被研究其对血糖控制、脂质代谢和细胞应激反应的影响。",
  "A plant flavonol found in many fruits and vegetables that is studied for antioxidant and signaling effects.":
    "一种存在于多种水果和蔬菜中的植物黄酮醇，常被研究其抗氧化和信号调节作用。",
  "A plant lignan antioxidant from creosote bush, commonly abbreviated NDGA.":
    "一种来源于愈创木灌木的植物木脂素抗氧化剂，常缩写为 NDGA。",
  "A plant-derived meroterpene often marketed as a retinol-like skin-care ingredient and studied for antioxidant effects.":
    "一种植物来源的混源萜，常作为类视黄醇护肤成分销售，并被研究其抗氧化作用。",
  "A proteasome inhibitor cancer drug used mainly for multiple myeloma and related blood cancers.":
    "一种蛋白酶体抑制剂类抗癌药，主要用于多发性骨髓瘤及相关血液肿瘤。",
  "A semisynthetic bile acid and FXR agonist used for some cholestatic liver diseases.":
    "一种半合成胆汁酸和 FXR 激动剂，用于部分胆汁淤积性肝病。",
  "A short-acting diabetes drug that stimulates insulin secretion around meals.":
    "一种短效糖尿病药物，可在进餐时促进胰岛素分泌。",
  "A sulfonylurea diabetes drug that increases insulin release from the pancreas.":
    "一种磺脲类糖尿病药物，可增加胰腺胰岛素释放。",
  "A sulfur-containing mitochondrial cofactor used as an antioxidant supplement.":
    "一种含硫的线粒体辅因子，可作为抗氧化补充剂。",
  "A synthetic retinoid related to retinoic acid that is used clinically in some leukemia settings.":
    "一种与维甲酸相关的合成类维甲酸药物，临床上用于部分白血病场景。",
  "A thiazolidinedione diabetes drug that improves insulin sensitivity through PPAR-gamma signaling.":
    "一种噻唑烷二酮类糖尿病药物，可通过 PPAR-gamma 信号改善胰岛素敏感性。",
  "A turmeric-derived polyphenol studied for antioxidant and anti-inflammatory effects.":
    "一种来源于姜黄的多酚，常被研究其抗氧化和抗炎作用。",
  "A tyrosine kinase inhibitor cancer drug used for leukemia and other kinase-driven diseases.":
    "一种酪氨酸激酶抑制剂类抗癌药，用于白血病及其他激酶驱动疾病。",
  "A tyrosine kinase inhibitor used for chronic myeloid leukemia, GIST, and related cancers.":
    "一种酪氨酸激酶抑制剂，用于慢性髓性白血病、GIST 及相关肿瘤。",
  "Also called 17-alpha-estradiol, an estrogen-related steroid studied for metabolic and neuroprotective effects.":
    "也称 17-α-雌二醇，一种与雌激素相关的类固醇，常被研究其代谢和神经保护作用。",
  "Also called beta-guanidinopropionic acid, a creatine analog that perturbs cellular energy metabolism.":
    "也称 β-胍基丙酸，是一种肌酸类似物，可扰动细胞能量代谢。",
  "Also called sirolimus, a macrolide drug and mTOR inhibitor used as an immunosuppressant.":
    "也称西罗莫司，是一种大环内酯类药物和 mTOR 抑制剂，可用作免疫抑制剂。",
  "An EGFR tyrosine kinase inhibitor used in several cancer treatments.":
    "一种 EGFR 酪氨酸激酶抑制剂，用于多种癌症治疗。",
  "An EGFR tyrosine kinase inhibitor used in targeted cancer therapy.":
    "一种 EGFR 酪氨酸激酶抑制剂，用于靶向癌症治疗。",
  "An HIV protease inhibitor now often used as a pharmacokinetic booster for other antiviral drugs.":
    "一种 HIV 蛋白酶抑制剂，如今常用作其他抗病毒药物的药代动力学增强剂。",
  "An SGLT2 inhibitor diabetes drug that lowers blood glucose by increasing urinary glucose excretion.":
    "一种 SGLT2 抑制剂类糖尿病药物，可通过增加尿糖排泄来降低血糖。",
  "An alpha-glucosidase inhibitor used for type 2 diabetes that slows intestinal carbohydrate digestion.":
    "一种用于 2 型糖尿病的 α-葡萄糖苷酶抑制剂，可减缓肠道碳水化合物消化。",
  "An anti-seizure and mood-stabilizing drug that also affects histone deacetylase activity.":
    "一种兼具抗惊厥和情绪稳定作用的药物，也会影响组蛋白去乙酰化酶活性。",
  "An immunomodulatory drug with anti-inflammatory and anti-angiogenic activity and a well-known teratogenic history.":
    "一种具有抗炎和抗血管生成活性的免疫调节药物，并以致畸历史广为人知。",
  "An mTOR inhibitor related to rapamycin that is used in cancer and transplant medicine.":
    "一种与雷帕霉素相关的 mTOR 抑制剂，用于肿瘤和移植医学。",
  "An mTOR inhibitor related to sirolimus that is used in targeted cancer therapy.":
    "一种与西罗莫司相关的 mTOR 抑制剂，用于靶向癌症治疗。",
};

function getExactChineseTranslation(value) {
  return (
    ZH_TRANSLATIONS[value] ||
    MOUSE_INTERVENTION_TRANSLATIONS[value] ||
    MOUSE_INTERVENTION_DESCRIPTION_TRANSLATIONS[value] ||
    CITP_SUBJECT_TRANSLATIONS[value] ||
    CITP_DESCRIPTION_LEAD_TRANSLATIONS[value] ||
    null
  );
}

function translateInterventionQualifier(value) {
  return INTERVENTION_QUALIFIER_TRANSLATIONS[value] || value;
}

function translateInterventionLabel(value, locale) {
  const qualifiedLabelMatch = value.match(/^(?<base>.+?) \((?<qualifier>[^()]+)\)$/);
  if (!qualifiedLabelMatch?.groups) {
    return null;
  }

  const { base, qualifier } = qualifiedLabelMatch.groups;
  const translatedBase = translateDataText(base, locale);
  const translatedQualifier = translateInterventionQualifier(qualifier);

  if (translatedBase === base && translatedQualifier === qualifier) {
    return null;
  }

  return `${translatedBase}（${translatedQualifier}）`;
}

function translateMedicationDoseLabel(value) {
  if (
    typeof value !== "string" ||
    !/\b(\d|mg|mcg|ml|nanogram|microgram|caps|tabs|patches|inhaler|nebuliser|mouthwash|rinse|suspension|syringe|pen|hour|dose|actuation|gastro-resistant|pre-filled)\b|%|\//i.test(
      value,
    )
  ) {
    return null;
  }

  const baseEntry = Object.keys(ZH_TRANSLATIONS)
    .filter((base) => value.startsWith(`${base} `))
    .sort((left, right) => right.length - left.length)[0];

  if (!baseEntry) {
    return null;
  }

  const suffix = value
    .slice(baseEntry.length)
    .trim()
    .replace(/\bcaps or tabs\b/gi, "胶囊或片剂")
    .replace(/\bgastro-resistant tabs\b/gi, "肠溶片")
    .replace(/\btransdermal patches\b/gi, "透皮贴剂")
    .replace(/\bpre-filled syringe\b/gi, "预充注射器")
    .replace(/\bpre-filled pen\b/gi, "预充笔")
    .replace(/\boral suspension\b/gi, "口服混悬液")
    .replace(/\boral rinse\b/gi, "含漱液")
    .replace(/\bmouthwash\b/gi, "漱口水")
    .replace(/\binhaler\b/gi, "吸入器")
    .replace(/\bnebuliser\b/gi, "雾化液")
    .replace(/\bactuation\b/gi, "喷")
    .replace(/\bdose\b/gi, "剂")
    .replace(/\bhour\b/gi, "小时");

  return `${ZH_TRANSLATIONS[baseEntry]} ${suffix}`;
}

function translateHumanAcmSentence(value) {
  const screenMatch = value.match(
    /^The UK Biobank 406-medication screen reports (.+) with (lower|higher) all-cause mortality risk\.$/,
  );
  if (screenMatch) {
    const [, label, direction] = screenMatch;
    const translatedLabel =
      getExactChineseTranslation(label) || translateMedicationDoseLabel(label) || label;
    const translatedDirection = direction === "lower" ? "较低" : "较高";
    return `UK Biobank 406 种药物筛查报告 ${translatedLabel} 与${translatedDirection}的全因死亡风险相关。`;
  }

  const figure5Match = value.match(
    /^The UK Biobank Figure 5 ACM analysis reports (.+) with (lower|higher) all-cause mortality risk\.$/,
  );
  if (figure5Match) {
    const [, label, direction] = figure5Match;
    const translatedLabel =
      getExactChineseTranslation(label) || translateMedicationDoseLabel(label) || label;
    const translatedDirection = direction === "lower" ? "较低" : "较高";
    return `UK Biobank 图 5 全因死亡率分析报告 ${translatedLabel} 与${translatedDirection}的全因死亡风险相关。`;
  }

  if (value === "Screened ACM row") {
    return "筛查全因死亡率条目";
  }

  if (value === "This row is shown as part of the full 406-medication N>=500 screen.") {
    return "该条目作为完整 406 种 N>=500 药物筛查的一部分展示。";
  }

  if (
    value ===
    "This Figure 5 / Data Table 4 row is shown alongside the full 406-medication N>=500 screen."
  ) {
    return "该图 5 / Data Table 4 条目与完整 406 种 N>=500 药物筛查一并展示。";
  }

  if (value === "This row passed the Benjamini-Hochberg FDR selection at alpha 0.05.") {
    return "该条目通过 alpha=0.05 的 Benjamini-Hochberg FDR 筛选。";
  }

  if (
    value ===
    "This row is shown to complete the 406-medication screen; it did not pass the Benjamini-Hochberg FDR selection at alpha 0.05."
  ) {
    return "该条目用于完整展示 406 种药物筛查；它未通过 alpha=0.05 的 Benjamini-Hochberg FDR 筛选。";
  }

  const selectedMatch = value.match(
    /^The row is one of the 169 FDR-significant Data Table 2 drugs for (lower|higher) all-cause mortality: N>=500, Benjamini-Hochberg adjusted P<=0\.05, and HR not equal to 1\. Source type: drug\.$/,
  );
  if (selectedMatch) {
    const direction = selectedMatch[1] === "lower" ? "较低" : "较高";
    return `该条目是 Data Table 2 中 169 个 FDR 显著药物之一，方向为全因死亡率${direction}：N>=500、Benjamini-Hochberg 校正 P<=0.05 且 HR 不等于 1。来源类型：药物。`;
  }

  const fullScreenMatch = value.match(
    /^The row is retained from the full 406-medication Data Table 2 N>=500 screen and reports (lower|higher) all-cause mortality\. Source type: drug\.$/,
  );
  if (fullScreenMatch) {
    const direction = fullScreenMatch[1] === "lower" ? "较低" : "较高";
    return `该条目来自完整的 Data Table 2 中 406 种 N>=500 药物筛查，并报告全因死亡率${direction}。来源类型：药物。`;
  }

  const figure5DetailMatch = value.match(
    /^The row is retained from Figure 5 \/ Data Table 4 and reports (lower|higher) all-cause mortality\. Source type: class\.$/,
  );
  if (figure5DetailMatch) {
    const direction = figure5DetailMatch[1] === "lower" ? "较低" : "较高";
    return `该条目来自图 5 / Data Table 4，并报告全因死亡率${direction}。来源类型：类别。`;
  }

  if (
    value ===
    "The row is retained to show the full 406-medication Data Table 2 N>=500 screen. It did not pass the FDR selection at alpha 0.05. Source type: drug."
  ) {
    return "保留该条目是为了展示完整的 Data Table 2 中 406 种 N>=500 药物筛查。它未通过 alpha=0.05 的 FDR 筛选。来源类型：药物。";
  }

  return null;
}

function translatePathwayPhrase(value) {
  return getExactChineseTranslation(value) || PATHWAY_ASCII_TRANSLATIONS[value] || value;
}

function translatePathwayLabel(value) {
  return PATHWAY_LABEL_TRANSLATIONS[value] || value;
}

function translatePathwayAscii(value) {
  if (typeof value !== "string" || !value.includes("\n")) {
    return value;
  }

  return value
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed || /^[|v]+$/i.test(trimmed)) {
        return line;
      }

      const branchMatch = line.match(/^(?<prefix>\s*\+-->\s*)(?<text>.+)$/);
      if (branchMatch?.groups) {
        return `${branchMatch.groups.prefix}${translatePathwayPhrase(
          branchMatch.groups.text.trim(),
        )}`;
      }

      const connectorMatch = line.match(
        /^(?<prefix>\s*)(?<text>.+?)(?<connector>\s+-{2,}[\\/])(?<suffix>.*)$/,
      );
      if (connectorMatch?.groups) {
        return `${connectorMatch.groups.prefix}${translatePathwayPhrase(
          connectorMatch.groups.text.trim(),
        )}${connectorMatch.groups.connector}${connectorMatch.groups.suffix}`;
      }

      const leadingWhitespace = line.match(/^\s*/)?.[0] || "";
      return `${leadingWhitespace}${translatePathwayPhrase(trimmed)}`;
    })
    .join("\n");
}

export function normalizeLocale(value) {
  if (!value) {
    return DEFAULT_LOCALE;
  }

  return String(value).toLowerCase().startsWith("zh") ? ZH_LOCALE : DEFAULT_LOCALE;
}

export function isChineseLocale(locale) {
  return normalizeLocale(locale) === ZH_LOCALE;
}

export function getIntlLocale(locale) {
  return isChineseLocale(locale) ? ZH_LOCALE : "en-US";
}

export function getPreferredLocale() {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const storedLocale = window.localStorage?.getItem(LOCALE_STORAGE_KEY);
  if (storedLocale) {
    return normalizeLocale(storedLocale);
  }

  const browserLocale =
    window.navigator.languages?.find(Boolean) || window.navigator.language;

  return normalizeLocale(browserLocale);
}

export function persistLocale(locale) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage?.setItem(LOCALE_STORAGE_KEY, normalizeLocale(locale));
}

export function t(locale, english, chinese) {
  return isChineseLocale(locale) ? chinese : english;
}

const CITP_CONDITION_TRANSLATIONS = {
  filtered: "过滤",
  nofilter: "未过滤",
  phadjusted: "pH 调整",
};

function ensureSentence(value) {
  if (!value) {
    return value;
  }

  return /[。.!?]$/.test(value) ? value : `${value}。`;
}

function translateCitpCondition(condition) {
  return CITP_CONDITION_TRANSLATIONS[condition] || condition;
}

function translateCitpDescription(value) {
  if (typeof value !== "string" || !value.includes("In this CITP study")) {
    return null;
  }

  const testedPattern =
    /^(?<lead>.+?) In this CITP study, (?<subject>.+?) was tested in (?<species>C\. [A-Za-z]+) strain (?<strain>[^.]+?) at (?<dose>[^.]+?)(?: under (?<condition>[^.]+?) conditions)?\.$/;
  const controlPattern =
    /^(?<lead>.+?) In this CITP study, it served as the matched control for (?<species>C\. [A-Za-z]+) strain (?<strain>[^.]+?)(?: under (?<condition>[^.]+?) conditions)?\.$/;

  const testedMatch = value.match(testedPattern);
  if (testedMatch?.groups) {
    const { lead, subject, species, strain, dose, condition } = testedMatch.groups;
    const translatedLead = CITP_DESCRIPTION_LEAD_TRANSLATIONS[lead] || ZH_TRANSLATIONS[lead];

    if (!translatedLead) {
      return null;
    }

    const translatedSubject =
      CITP_SUBJECT_TRANSLATIONS[subject] || ZH_TRANSLATIONS[subject] || subject;
    const translatedSpecies = ZH_TRANSLATIONS[species] || species;
    const conditionClause = condition
      ? `，在${translateCitpCondition(condition)}条件下`
      : "";

    return `${ensureSentence(translatedLead)}在本次比较干预测试计划（CITP）研究中，${translatedSubject}在${translatedSpecies}品系 ${strain} 中以 ${dose} 剂量${conditionClause}接受测试。`;
  }

  const controlMatch = value.match(controlPattern);
  if (controlMatch?.groups) {
    const { lead, species, strain, condition } = controlMatch.groups;
    const translatedLead = CITP_DESCRIPTION_LEAD_TRANSLATIONS[lead] || ZH_TRANSLATIONS[lead];

    if (!translatedLead) {
      return null;
    }

    const translatedSpecies = ZH_TRANSLATIONS[species] || species;
    const conditionClause = condition
      ? `在${translateCitpCondition(condition)}条件下`
      : "";

    return `${ensureSentence(translatedLead)}在本次比较干预测试计划（CITP）研究中，它${conditionClause ? `${conditionClause}` : ""}作为${translatedSpecies}品系 ${strain} 的匹配对照组。`;
  }

  return null;
}

export function translateDataText(value, locale) {
  if (typeof value !== "string" || !isChineseLocale(locale)) {
    return value;
  }

  const directTranslation = getExactChineseTranslation(value);
  if (directTranslation) {
    return directTranslation;
  }

  const translatedInterventionLabel = translateInterventionLabel(value, locale);
  if (translatedInterventionLabel) {
    return translatedInterventionLabel;
  }

  const translatedMedicationDoseLabel = translateMedicationDoseLabel(value);
  if (translatedMedicationDoseLabel) {
    return translatedMedicationDoseLabel;
  }

  const translatedHumanAcmSentence = translateHumanAcmSentence(value);
  if (translatedHumanAcmSentence) {
    return translatedHumanAcmSentence;
  }

  const translatedCitpDescription = translateCitpDescription(value);
  if (translatedCitpDescription) {
    return translatedCitpDescription;
  }

  if (value.startsWith("Pathway sketch · ")) {
    return `通路示意 · ${translatePathwayLabel(
      value.slice("Pathway sketch · ".length),
    )}`;
  }

  if (value.startsWith("Water control")) {
    return `清水对照${value.slice("Water control".length)}`;
  }

  if (value.startsWith("DMSO control")) {
    return `DMSO 对照${value.slice("DMSO control".length)}`;
  }

  if (value.startsWith("Untreated control")) {
    return `未处理对照${value.slice("Untreated control".length)}`;
  }

  if (value.startsWith("Control")) {
    return `对照${value.slice("Control".length)}`;
  }

  const translatedPathwayAscii = translatePathwayAscii(value);
  if (translatedPathwayAscii !== value) {
    return translatedPathwayAscii;
  }

  return value;
}

export function localizeValue(value, locale) {
  if (!isChineseLocale(locale)) {
    return value;
  }

  if (typeof value === "string") {
    return translateDataText(value, locale);
  }

  if (Array.isArray(value)) {
    return value.map((entry) => localizeValue(entry, locale));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, localizeValue(entry, locale)]),
    );
  }

  return value;
}

function buildReleaseTag(profile, latestPublicReleaseLabel, locale) {
  const releaseLabel = translateDataText(latestPublicReleaseLabel, locale);

  if (profile.id === "human") {
    return t(
      locale,
      `human Biobank evidence · curated through ${releaseLabel}`,
      `人类 Biobank 证据 · 更新至 ${releaseLabel}`,
    );
  }

  return t(
    locale,
    `${profile.badgePrefix} · public data through ${releaseLabel}`,
    `${profile.badgePrefix} · 公开数据截至 ${releaseLabel}`,
  );
}

function localizePublication(publication, locale) {
  if (!publication || !isChineseLocale(locale)) {
    return publication;
  }

  return {
    ...localizeValue(publication, locale),
    kindLabel:
      publication.kind === "secondary"
        ? translateDataText("Secondary analysis", locale)
        : null,
  };
}

function localizeGroupMeta(meta, locale) {
  if (!meta || !isChineseLocale(locale)) {
    return meta;
  }

  return {
    ...meta,
    label: translateDataText(meta.label, locale),
    description: localizeValue(meta.description, locale),
    pathwayDescription: meta.description,
    pathwayCompoundDisplayName: meta.compoundDisplayName || meta.label,
    species: translateDataText(meta.species, locale),
    strain: translateDataText(meta.strain, locale),
    condition: translateDataText(meta.condition, locale),
    publication: localizePublication(meta.publication, locale),
    evidence: localizeValue(meta.evidence, locale),
    ukbMetadata: localizeValue(meta.ukbMetadata, locale),
    sourceCatalog: localizeValue(meta.sourceCatalog, locale),
  };
}

export function localizeDatasetMetadata(dataset, locale) {
  if (!dataset || !isChineseLocale(locale)) {
    return dataset;
  }

  const profile = localizeValue(dataset.profile, locale);
  if (dataset.profile.id === "citp" && dataset.profile.activeAnimalLabel) {
    const speciesLabel = translateDataText(dataset.profile.activeAnimalLabel, locale);

    profile.badgePrefix = speciesLabel;
    profile.description = `来自比较干预测试计划（CITP）的 ${speciesLabel} 公开寿命数据。可跨品系与实验室条件比较化合物。`;
    profile.explorerBody = `可从上方排行榜选择一行，或使用这里的控件查看 ${speciesLabel} 干预与匹配对照的比较。研究和实验室可在顶部范围面板设置。`;
    profile.focusSectionBody = `匹配对照曲线只在相同${speciesLabel}研究、品系、条件和实验室分组内叠加，以保持这些比较的内部一致性。`;
  }
  const siteMeta = localizeValue(dataset.siteMeta, locale);
  const cohortMetaByName = Object.fromEntries(
    Object.entries(dataset.cohortMetaByName || {}).map(([cohort, meta]) => [
      cohort,
      {
        ...localizeValue(meta, locale),
        publication: localizePublication(meta.publication, locale),
      },
    ]),
  );
  const groupMetaByKey = Object.fromEntries(
    Object.entries(dataset.groupMetaByKey || {}).map(([key, meta]) => [
      key,
      localizeGroupMeta(meta, locale),
    ]),
  );
  const compareOptions = (dataset.compareOptions || []).map((option) => {
    const translatedOption = {
      ...option,
      label: translateDataText(option.label, locale),
    };
    const groupMeta = groupMetaByKey[`${option.cohort}::${option.group}`] || null;
    const cohortMeta = cohortMetaByName[option.cohort] || null;

    return {
      ...translatedOption,
      searchText: [
        option.searchText,
        translatedOption.label,
        groupMeta?.description,
        groupMeta?.condition,
        cohortMeta?.label,
        cohortMeta?.shortLabel,
        cohortMeta?.secondaryLabel,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase(),
    };
  });
  const cohortOverview = (dataset.cohortOverview || []).map((entry) =>
    localizeValue(entry, locale),
  );
  const latestPublicReleaseLabel =
    dataset.overview.latestPublicReleaseLabel ||
    dataset.overview.latestPublicCohort ||
    dataset.cohorts?.[dataset.cohorts.length - 1] ||
    "";
  const localizedLatestPublicReleaseLabel = translateDataText(
    latestPublicReleaseLabel,
    locale,
  );

  return {
    ...dataset,
    profile,
    siteMeta,
    cohortMetaByName,
    groupMetaByKey,
    compareOptions,
    cohortOverview,
    overview: {
      ...dataset.overview,
      latestPublicReleaseLabel: localizedLatestPublicReleaseLabel,
      releaseTag: buildReleaseTag(profile, localizedLatestPublicReleaseLabel, locale),
    },
  };
}

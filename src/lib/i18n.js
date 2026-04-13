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
    "对比公开的小鼠、线虫、果蝇、青鳉鱼以及人工整理的人类数据集，查看哪些小分子干预与更长寿命相关。",
  "Lifespan Charts": "Lifespan Charts",
  "Mouse Phenome Database": "小鼠表型数据库",
  "eLife killifish source data": "eLife 青鳉鱼源数据",
  "Nature fly source data": "Nature 果蝇源数据",
  "Curated human medication evidence": "人工整理的人类药物证据",
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
  "Medication explorer": "药物探索器",
  "Evidence explorer": "证据探索器",
  "African turquoise killifish": "非洲青鳉鱼",
  "Fruit fly": "果蝇",
  "April 2026": "2026 年 4 月",
  "Public mouse lifespan data from the NIA's Interventions Testing Program. Compare treatments side by side and see which ones helped mice live longer.":
    "来自 NIA 干预测试计划（ITP）的公开小鼠寿命数据。可并排比较不同处理，查看哪些方案让小鼠活得更久。",
  "Public worm lifespan data from CITP. Compare compounds across worm species, strains, and lab conditions.":
    "来自比较干预测试计划（CITP）的公开线虫寿命数据。可跨线虫物种、品系和实验室条件比较化合物。",
  "A ranked list of 10 medication classes with the strongest human evidence for lower overall death risk, based on meta-analyses, population studies, and Mendelian genetics.":
    "基于荟萃分析、人群研究和孟德尔遗传学，对 10 类与较低全因死亡风险证据最强的药物进行排序。",
  "Public killifish lifespan data from a dietary restriction study. Compare restricted feeding with standard feeding across two cohorts.":
    "来自饮食限制研究的公开青鳉鱼寿命数据。可在两个队列中比较限制喂养与标准喂养。",
  "Public fruit-fly lifespan data from dietary restriction experiments. Compare restricted feeding with standard feeding across fly experiments.":
    "来自饮食限制实验的公开果蝇寿命数据。可跨实验比较限制喂养与标准喂养。",
  "gold-standard aging reference": "金标准衰老参考",
  "multi-species longevity portal": "跨物种长寿门户",
  "human medication evidence": "人类药物证据",
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
  Cohorts: "队列",
  Studies: "研究",
  Catalogs: "目录",
  Experiments: "实验",
  cohort: "队列",
  cohorts: "队列",
  study: "研究",
  studies: "研究",
  catalog: "目录",
  catalogs: "目录",
  experiment: "实验",
  experiments: "实验",
  "Focus cohort": "焦点队列",
  Explorer: "探索器",
  Site: "站点",
  Lab: "实验室",
  Evidence: "证据",
  Source: "来源",
  "All Sites": "所有站点",
  "All Labs": "所有实验室",
  "All evidence streams": "全部证据流",
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
  "Focus treatment": "焦点处理",
  "Focus intervention": "焦点干预",
  "Focus medication": "焦点药物",
  "Compare treatments": "比较处理",
  "Compare interventions": "比较干预",
  "Compare medications": "比较药物",
  "Combined-sex mice": "雌雄合并小鼠",
  "Combined populations": "合并人群",
  "Human evidence": "人类证据",
  "Combined-sex fish": "雌雄合并青鳉鱼",
  "Female flies": "雌性果蝇",
  "Loading the public ITP dataset…": "正在加载公开干预测试计划（ITP）数据集…",
  "Loading the public CITP dataset…": "正在加载公开比较干预测试计划（CITP）数据集…",
  "Loading curated human medication evidence…": "正在加载人工整理的人类药物证据…",
  "Loading the public killifish dataset…": "正在加载公开青鳉鱼数据集…",
  "Loading the public fruit-fly dataset…": "正在加载公开果蝇数据集…",
  "Source files were downloaded from MPD and normalized against the public lifespancharts cohort CSVs.":
    "源文件下载自 MPD，并根据公开 lifespancharts 队列 CSV 做了标准化处理。",
  "Search cohort or compound": "搜索队列或化合物",
  "Search cohort or compound. Four overlays max.":
    "搜索队列或化合物。最多叠加四条曲线。",
  "Choose a row from the leaderboard above or use the controls here to inspect a treatment against its cohort-matched control. Year and site are set in the top scope panel.":
    "可从上方排行榜选择一行，或使用此处控件查看某个处理与其同队列匹配对照的比较。年份和站点可在顶部范围面板设置。",
  "The reference site overlays raw step curves. This version keeps the same public cohort records but adds proper censor handling, a richer opening state, and a more navigable treatment comparison flow.":
    "参考站点叠加展示原始阶梯曲线。此版本保留相同公开队列记录，同时补充了正确的删失处理、更丰富的默认视图以及更易用的处理比较流程。",
  "Source files were downloaded from the CITP Data Portal and normalized into matched treatment-control strata across dataset, strain, condition, and lab.":
    "源文件下载自比较干预测试计划数据门户，并按数据集、品系、条件和实验室标准化为匹配的处理-对照分层。",
  "Search study, strain, or compound": "搜索研究、品系或化合物",
  "Search study, strain, or compound. Four overlays max.":
    "搜索研究、品系或化合物。最多叠加四条曲线。",
  "Choose a row from the leaderboard above or use the controls here to inspect an intervention against its matched control. Study and lab are set in the top scope panel.":
    "可从上方排行榜选择一行，或使用此处控件查看某个干预与其匹配对照的比较。研究和实验室可在顶部范围面板设置。",
  "Matched control overlays stay within each study, strain, condition, and lab slice so the non-mouse comparisons stay internally consistent.":
    "匹配对照叠加仅限于相同研究、品系、条件和实验室切片内，以保证非小鼠比较内部一致。",
  "Focus study": "焦点研究",
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
  "CITP lifespan exports are shown as combined populations, so the worm view stays on a single panel.":
    "比较干预测试计划（CITP）的寿命导出数据以合并人群形式呈现，因此线虫视图保持单面板。",
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
    "该人类视图是基于高信号荟萃分析、大规模流行病学研究和药物靶点孟德尔研究整理出的药物排行榜。分数仅用于导航，不构成处方建议。",
  "Search medication or population": "搜索药物或适用人群",
  "Search the curated top 10 medications.": "搜索人工整理的前 10 种药物。",
  "Choose a medication from the leaderboard above or the selector here to inspect the evidence anchors behind this human ranking.":
    "可从上方排行榜或此处选择器中选择一种药物，查看支撑该人类排名的证据锚点。",
  "This human view is evidence-first. It does not display survival curves; it summarizes the meta-analysis, epidemiology, and Mendelian anchors used in the ranking.":
    "该人类视图以证据为先，不展示生存曲线，而是汇总用于排名的荟萃分析、流行病学和孟德尔证据锚点。",
  "Human evidence is summarized as a single evidence panel rather than survival curves.":
    "人类证据以单一证据面板汇总展示，而不是生存曲线。",
  refs: "参考",
  meds: "药物",
  "Latest curated catalog verified locally": "本地核验的最新人工整理目录",
  "Source files were downloaded from the eLife Figure 4 source-data CSVs and normalized into dietary restriction versus ad libitum cohort comparisons.":
    "源文件下载自 eLife 图 4 的源数据 CSV，并标准化为饮食限制与自由摄食的队列比较。",
  "Search cohort or intervention": "搜索队列或干预",
  "Search cohort or intervention. Four overlays max.":
    "搜索队列或干预。最多叠加四条曲线。",
  "Choose a row from the leaderboard above or use the controls here to inspect dietary restriction against its cohort-matched ad libitum control. Cohort is set in the top scope panel.":
    "可从上方排行榜选择一行，或使用此处控件查看饮食限制与其同队列自由摄食对照的比较。队列可在顶部范围面板设置。",
  "Each panel overlays raw Kaplan-Meier curves for dietary restriction and the ad libitum control within the same GRZ cohort.":
    "每个面板都叠加展示同一 GRZ 队列中饮食限制与自由摄食对照的原始 Kaplan-Meier 曲线。",
  "Source files were downloaded from the Nature source-data workbook and expanded from per-replicate death counts into one row per fly.":
    "源文件下载自 Nature 的源数据工作簿，并从每个重复的死亡计数展开为每只果蝇一行。",
  "Search genotype or experiment": "搜索基因型或实验",
  "Search genotype or experiment. Four overlays max.":
    "搜索基因型或实验。最多叠加四条曲线。",
  "Choose a row from the leaderboard above or use the controls here to inspect dietary restriction against its matched ad libitum control within the same fly experiment.":
    "可从上方排行榜选择一行，或使用此处控件查看同一果蝇实验内饮食限制与其匹配自由摄食对照的比较。",
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
  "Top 10 human medication interventions": "人类药物干预前 10 名",
  "Top 10": "前 10",
  "Meta + epi + MR": "Meta + 流行病学 + MR",
  "Statins (HMGCR inhibitors)": "他汀类（HMGCR 抑制剂）",
  "SGLT2 inhibitors": "SGLT2 抑制剂",
  "GLP-1 receptor agonists": "GLP-1 受体激动剂",
  "ACE inhibitors": "ACE 抑制剂",
  "Beta-blockers": "β 受体阻滞剂",
  "Mineralocorticoid receptor antagonists": "盐皮质激素受体拮抗剂",
  "Direct oral anticoagulants (DOACs)": "直接口服抗凝药（DOACs）",
  Metformin: "二甲双胍",
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
    "针对二甲双胍靶点的孟德尔研究支持更健康的衰老表型，但其靶点架构复杂，尚未形成清晰的死亡获益故事。",
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
    "属于间接遗传支持，而非清晰的长寿读出。",
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
  "chromatin regulation": "染色质调控",
  "immune / cell-state signaling": "免疫 / 细胞状态信号",
  "targeted stress node": "定向应激节点",
  "mechanism under study": "研究中的机制",
};

const PATHWAY_ASCII_TRANSLATIONS = {
  "baseline exposure only": "仅基线暴露",
  "reference aging trajectory": "参考衰老轨迹",
  "matched comparison anchor": "匹配比较锚点",
  "lifespan effect readout": "寿命效应读出",
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
  "chromatin / epigenetic control": "染色质 / 表观遗传控制",
  "gene-expression program shift": "基因表达程序转变",
  "immune or cell-state target": "免疫或细胞状态靶点",
  "proliferation / signaling tone": "增殖 / 信号张力",
  "systemic stress balance": "全身应激平衡",
  "named stress-response target": "特定命名的应激反应靶点",
  "inflammatory / fibrinolytic tone": "炎症 / 纤溶张力",
  "systemic stress state": "全身应激状态",
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
      `human medication evidence · curated through ${releaseLabel}`,
      `人类药物证据 · 更新至 ${releaseLabel}`,
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
    species: translateDataText(meta.species, locale),
    strain: translateDataText(meta.strain, locale),
    condition: translateDataText(meta.condition, locale),
    publication: localizePublication(meta.publication, locale),
    evidence: localizeValue(meta.evidence, locale),
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
    profile.explorerBody = `可从上方排行榜选择一行，或使用此处控件查看 ${speciesLabel} 干预与其匹配对照的比较。研究和实验室可在顶部范围面板设置。`;
    profile.focusSectionBody = `匹配对照叠加仅限于相同${speciesLabel}研究、品系、条件和实验室切片内，以保持这些比较的内部一致性。`;
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

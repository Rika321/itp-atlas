function buildLinearPathway(name, steps) {
  return [name, ...steps].join("\n  |\n  v\n");
}

function stripTrailingQualifier(name) {
  return (name || "").trim().replace(/\s+\([^()]+\)$/, "");
}

const PATHWAY_TEMPLATES = {
  control: {
    label: "Pathway sketch · control condition",
    render: (name) =>
      buildLinearPathway(name, [
        "baseline exposure only",
        "reference aging trajectory",
        "matched comparison anchor",
        "lifespan effect readout",
      ]),
  },
  acarbose: {
    label: "Pathway sketch · carbohydrate absorption",
    render: (name) =>
      buildLinearPathway(name, [
        "gut alpha-glucosidase inhibition",
        "slower carbohydrate absorption",
        "lower post-meal glucose spikes",
        "metabolic stress relief",
      ]),
  },
  metformin: {
    label: "Pathway sketch · AMPK / hepatic glucose",
    render: (name) =>
      buildLinearPathway(name, [
        "hepatic glucose output down",
        "AMPK-linked energy sensing",
        "lower metabolic load",
        "stress-resilience phenotype",
      ]),
  },
  glucoseRegulation: {
    label: "Pathway sketch · glucose regulation",
    render: (name) =>
      buildLinearPathway(name, [
        "glucose / insulin control",
        "glycemic and anabolic load down",
        "metabolic stress balance",
        "stress-resilience phenotype",
      ]),
  },
  sglt2: {
    label: "Pathway sketch · renal glucose handling",
    render: (name) =>
      buildLinearPathway(name, [
        "renal SGLT2 blockade",
        "urinary glucose loss",
        "fuel-use shift + glycemic relief",
        "stress-resilience phenotype",
      ]),
  },
  mtor: {
    label: "Pathway sketch · mTOR signaling",
    render: (name) =>
      buildLinearPathway(name, [
        "mTORC1 signaling down",
        "translation down / autophagy up",
        "cellular maintenance",
        "stress-resilience phenotype",
      ]),
  },
  comboMetforminRapa: {
    label: "Pathway sketch · AMPK + mTOR",
    render: () => `Metformin ----\\
               +--> AMPK up / mTOR down
Rapamycin ----/         |
                        v
                  nutrient-stress balance
                        |
                        v
                  stress-resilience phenotype`,
  },
  comboRapaAcarbose: {
    label: "Pathway sketch · mTOR + carbohydrate load",
    render: () => `Rapamycin ----\\
               +--> nutrient-signaling load down
Acarbose -----/         |
                        v
                  stress resistance
                        |
                        v
                  stress-resilience phenotype`,
  },
  antioxidant: {
    label: "Pathway sketch · antioxidant / stress response",
    render: (name) =>
      buildLinearPathway(name, [
        "redox + electrophile sensing",
        "detox / antioxidant programs",
        "lower oxidative-stress burden",
        "stress-resilience phenotype",
      ]),
  },
  mitochondrial: {
    label: "Pathway sketch · mitochondrial metabolism",
    render: (name) =>
      buildLinearPathway(name, [
        "mitochondrial / TCA metabolism",
        "energy-state signaling",
        "cellular stress adaptation",
        "stress-resilience phenotype",
      ]),
  },
  lipidMetabolism: {
    label: "Pathway sketch · lipid / fuel handling",
    render: (name) =>
      buildLinearPathway(name, [
        "lipid handling / mevalonate tone",
        "membrane and fuel-state signaling",
        "metabolic stress balance",
        "stress-resilience phenotype",
      ]),
  },
  nutrientSensing: {
    label: "Pathway sketch · nutrient sensing",
    render: (name) =>
      buildLinearPathway(name, [
        "nutrient / substrate availability",
        "fuel selection + anabolic tone",
        "systemic metabolic state",
        "stress-resilience phenotype",
      ]),
  },
  microbiome: {
    label: "Pathway sketch · microbiome-host metabolites",
    render: (name) =>
      buildLinearPathway(name, [
        "gut microbiome substrate",
        "fermentation + host metabolites",
        "systemic metabolic tone",
        "stress-resilience phenotype",
      ]),
  },
  raas: {
    label: "Pathway sketch · RAAS signaling",
    render: (name) =>
      buildLinearPathway(name, [
        "renin-angiotensin signaling down",
        "vascular / cardiac load down",
        "systemic stress tone",
        "stress-resilience phenotype",
      ]),
  },
  vascular: {
    label: "Pathway sketch · vascular tone",
    render: (name) =>
      buildLinearPathway(name, [
        "vascular smooth-muscle tone shift",
        "hemodynamic load adjustment",
        "systemic stress tone",
        "stress-resilience phenotype",
      ]),
  },
  adrenergic: {
    label: "Pathway sketch · beta-adrenergic signaling",
    render: (name) =>
      buildLinearPathway(name, [
        "beta-adrenergic signaling down",
        "sympathetic / cardiac tone shift",
        "systemic stress tone",
        "stress-resilience phenotype",
      ]),
  },
  bileAcid: {
    label: "Pathway sketch · bile-acid signaling",
    render: (name) =>
      buildLinearPathway(name, [
        "FXR / TGR5-style signaling",
        "metabolic + inflammatory tone",
        "cell-state adaptation",
        "stress-resilience phenotype",
      ]),
  },
  gasotransmitter: {
    label: "Pathway sketch · sulfur / gasotransmitters",
    render: (name) =>
      buildLinearPathway(name, [
        "H2S / sulfur signaling",
        "redox + mitochondrial tone",
        "cellular stress adaptation",
        "stress-resilience phenotype",
      ]),
  },
  nuclearReceptor: {
    label: "Pathway sketch · nuclear receptor signaling",
    render: (name) =>
      buildLinearPathway(name, [
        "nuclear receptor engagement",
        "transcriptional program shift",
        "growth / differentiation tone",
        "stress-resilience phenotype",
      ]),
  },
  kinase: {
    label: "Pathway sketch · kinase signaling",
    render: (name) =>
      buildLinearPathway(name, [
        "receptor / tyrosine kinase blockade",
        "growth-factor signaling down",
        "cell-state remodeling",
        "stress-resilience phenotype",
      ]),
  },
  proteostasis: {
    label: "Pathway sketch · proteostasis",
    render: (name) =>
      buildLinearPathway(name, [
        "folding / aggregate handling",
        "proteostasis burden down",
        "cellular maintenance",
        "stress-resilience phenotype",
      ]),
  },
  inflammation: {
    label: "Pathway sketch · inflammatory signaling",
    render: (name) =>
      buildLinearPathway(name, [
        "inflammatory mediator signaling",
        "immune-stress burden down",
        "tissue-damage pressure down",
        "stress-resilience phenotype",
      ]),
  },
  neuronal: {
    label: "Pathway sketch · neuronal signaling",
    render: (name) =>
      buildLinearPathway(name, [
        "neuronal receptor / excitability shift",
        "network + neuroendocrine tone",
        "systemic stress response",
        "stress-resilience phenotype",
      ]),
  },
  epigenetic: {
    label: "Pathway sketch · chromatin regulation",
    render: (name) =>
      buildLinearPathway(name, [
        "chromatin / epigenetic control",
        "gene-expression program shift",
        "cell-state remodeling",
        "stress-resilience phenotype",
      ]),
  },
  immuneMetabolism: {
    label: "Pathway sketch · immune / cell-state signaling",
    render: (name) =>
      buildLinearPathway(name, [
        "immune or cell-state target",
        "proliferation / signaling tone",
        "systemic stress balance",
        "stress-resilience phenotype",
      ]),
  },
  targetedStress: {
    label: "Pathway sketch · targeted stress node",
    render: (name) =>
      buildLinearPathway(name, [
        "named stress-response target",
        "inflammatory / fibrinolytic tone",
        "systemic stress state",
        "stress-resilience phenotype",
      ]),
  },
  experimental: {
    label: "Pathway sketch · mechanism under study",
    render: (name) =>
      buildLinearPathway(name, [
        "cellular target under study",
        "stress-response network",
        "physiology shift",
        "stress-resilience phenotype",
      ]),
  },
};

const PATHWAY_KEY_BY_NAME = {
  "17-alpha-Estradiol": "nuclearReceptor",
  "17-dimethylaminoethylamino-17-demethoxygeldanamycin": "proteostasis",
  "16-alpha-Hydroxyestriol": "nuclearReceptor",
  "2,4-Dinitrophenol": "mitochondrial",
  "2-(2-Hydroxyphenyl)benzoxazole": "antioxidant",
  "4-Phenylbutyrate": "proteostasis",
  "(R/S)-1,3-Butanediol": "nutrientSensing",
  Acarbose: "acarbose",
  Aldosterone: "nuclearReceptor",
  "alpha-(4-hydroxyphenyl)-N-tert-butylnitrone": "antioxidant",
  "alpha-Estradiol": "nuclearReceptor",
  "alpha-Ketoglutarate": "mitochondrial",
  "alpha-Lipoic acid": "mitochondrial",
  Arecoline: "neuronal",
  Aspirin: "inflammation",
  Astaxanthin: "antioxidant",
  Bakuchiol: "antioxidant",
  Berberine: "glucoseRegulation",
  Bortezomib: "proteostasis",
  Bromocriptine: "glucoseRegulation",
  "Caffeic acid phenethyl ester": "antioxidant",
  Canagliflozin: "sglt2",
  "Candesartan cilexetil": "raas",
  Captopril: "raas",
  Curcumin: "antioxidant",
  Dapagliflozin: "sglt2",
  Dasatinib: "kinase",
  Decitabine: "epigenetic",
  Dexamethazone: "nuclearReceptor",
  Diuron: "experimental",
  "DMSO control": "control",
  "Dimethyl fumarate": "mitochondrial",
  Enalapril: "raas",
  Erlotinib: "kinase",
  Everolimus: "mtor",
  Fisetin: "antioxidant",
  "Fish oil": "lipidMetabolism",
  Gefitinib: "kinase",
  Geranylgeranylacetone: "proteostasis",
  Glipizide: "glucoseRegulation",
  "Green tea extract": "antioxidant",
  Glycine: "nutrientSensing",
  Hydralazine: "vascular",
  Imatinib: "kinase",
  Inulin: "microbiome",
  "INT-767": "bileAcid",
  "L-Leucine": "nutrientSensing",
  Levetiracetam: "neuronal",
  Meclizine: "neuronal",
  Metformin: "metformin",
  "Metformin + Rapamycin": "comboMetforminRapa",
  Metoprolol: "adrenergic",
  "Medium-chain triglyceride oil": "lipidMetabolism",
  "Methylene blue": "mitochondrial",
  MIF098: "targetedStress",
  Minocycline: "inflammation",
  MitoQ: "mitochondrial",
  "Mycophenolic acid": "immuneMetabolism",
  Nateglinide: "glucoseRegulation",
  Nebivolol: "adrenergic",
  "Nicotinamide riboside": "mitochondrial",
  Nitroflurbiprofen: "inflammation",
  "Nordihydroguaiaretic acid": "antioxidant",
  NP1: "experimental",
  "Obeticholic acid": "bileAcid",
  "Oxaloacetic acid": "mitochondrial",
  PB125: "antioxidant",
  Pioglitazone: "glucoseRegulation",
  Protandim: "antioxidant",
  Propranolol: "adrenergic",
  "Propyl gallate": "antioxidant",
  Quercetin: "antioxidant",
  Rapamycin: "mtor",
  "Rapamycin + Acarbose": "comboRapaAcarbose",
  Resveratrol: "antioxidant",
  "Retinoic acid (tretinoin)": "nuclearReceptor",
  Ritonavir: "immuneMetabolism",
  SG1002: "gasotransmitter",
  Simvastatin: "lipidMetabolism",
  Sitagliptin: "glucoseRegulation",
  "Sodium thiosulfate": "gasotransmitter",
  Sulforaphane: "antioxidant",
  Sulindac: "inflammation",
  Syringaresinol: "antioxidant",
  Tamibarotene: "nuclearReceptor",
  Temsirolimus: "mtor",
  Thalidomide: "immuneMetabolism",
  "Thioflavin T": "proteostasis",
  TM5441: "targetedStress",
  Untreated: "control",
  "Untreated control": "control",
  "Ursolic acid": "antioxidant",
  "Ursodeoxycholic acid": "bileAcid",
  "Valproic acid": "epigenetic",
  "Water control": "control",
  "beta-GPA": "mitochondrial",
  "beta-Guanidinopropionic acid": "mitochondrial",
};

const PATHWAY_INFERENCE_RULES = [
  { key: "control", pattern: /\bcontrol\b|\buntreated\b/ },
  { key: "comboMetforminRapa", pattern: /metformin\s*\+\s*rapamycin/ },
  { key: "comboRapaAcarbose", pattern: /rapamycin\s*\+\s*acarbose/ },
  { key: "acarbose", pattern: /alpha-glucosidase|carbohydrate digestion/ },
  { key: "sglt2", pattern: /sglt2|urinary glucose excretion/ },
  { key: "metformin", pattern: /\bbiguanide\b|hepatic glucose production|ampk/ },
  {
    key: "glucoseRegulation",
    pattern: /glucose control|insulin sensitivity|insulin release|dpp-4|sulfonylurea|meal-related insulin|type 2 diabetes|diabetes drug/,
  },
  { key: "mtor", pattern: /mTOR inhibitor|sirolimus|temsirolimus|everolimus/ },
  { key: "bileAcid", pattern: /fxr|tgr5|bile acid/ },
  { key: "raas", pattern: /ace inhibitor|angiotensin ii receptor blocker|\barb\b|renin-angiotensin/ },
  { key: "adrenergic", pattern: /beta-blocker|beta1-selective|beta1 selective/ },
  { key: "vascular", pattern: /vasodilator|blood pressure/ },
  { key: "gasotransmitter", pattern: /hydrogen sulfide|sulfur donor|cyanide antidote/ },
  { key: "lipidMetabolism", pattern: /hmg-coa|omega-3|lipid metabolism|cholesterol/ },
  { key: "microbiome", pattern: /prebiotic|chicory root|microbiome/ },
  { key: "nuclearReceptor", pattern: /steroid|retinoid|vitamin a derivative|estrogen|ppar|corticosteroid|hormone/ },
  { key: "kinase", pattern: /tyrosine kinase inhibitor|egfr|kinase-driven|growth-factor/ },
  { key: "proteostasis", pattern: /hsp90|heat-shock|chemical chaperone|protein aggregate|proteasome|deacetylase/ },
  { key: "epigenetic", pattern: /dna methyltransferase|epigenetic|chromatin/ },
  { key: "inflammation", pattern: /anti-inflammatory|nsaid|prostaglandin/ },
  { key: "neuronal", pattern: /anti-seizure|dopamine receptor|muscarinic|antihistamine|vertigo|epilepsy|seizure/ },
  { key: "immuneMetabolism", pattern: /immunosuppressant|immunomodulatory|protease inhibitor|purine synthesis|antiviral/ },
  { key: "targetedStress", pattern: /\bmif\b|pai-1|plasminogen activator inhibitor/ },
  {
    key: "antioxidant",
    pattern: /antioxidant|nrf2|polyphenol|flavonol|carotenoid|electrophile|redox|isothiocyanate|free-radical/,
  },
  {
    key: "mitochondrial",
    pattern: /mitochond|tricarboxylic|tca cycle|2-oxoglutarate|ketone-body|nad\+|energy metabolism|creatine analog|uncoupler|fumarate ester/,
  },
  { key: "nutrientSensing", pattern: /amino acid|dietary fat supplement|medium-chain triglycerides|beta-hydroxybutyrate/ },
];

function inferPathwayKey(name, description) {
  const haystack = `${name || ""} ${description || ""}`;
  const match = PATHWAY_INFERENCE_RULES.find((rule) =>
    new RegExp(rule.pattern.source, "i").test(haystack),
  );
  return match?.key || "experimental";
}

export function getInterventionPathway(name, description) {
  const normalizedName = stripTrailingQualifier(name) || "Intervention";
  const pathwayKey =
    PATHWAY_KEY_BY_NAME[normalizedName] || inferPathwayKey(normalizedName, description);
  const template = PATHWAY_TEMPLATES[pathwayKey] || PATHWAY_TEMPLATES.experimental;

  return {
    key: pathwayKey,
    name: normalizedName,
    label: template.label,
    ascii: template.render(normalizedName),
  };
}

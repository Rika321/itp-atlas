function buildLinearPathway(name, steps) {
  return [name, ...steps].join("\n  |\n  v\n");
}

function stripTrailingQualifier(name) {
  return (name || "").trim().replace(/\s+\([^()]+\)$/, "");
}

function stripDoseFormulation(name) {
  return stripTrailingQualifier(name)
    .replace(
      /\s+\d+(?:[.,]\d+)?\s*(mg|mgs|mcg|microgram|nanogram|g|ml|units|dose|hour|%)\b.*$/i,
      "",
    )
    .replace(/\s+(caps or tabs|cream or ointment|oral|inhaler|mouthwash|strips|lancets|gel)$/i, "")
    .trim();
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
  pde5: {
    label: "Pathway sketch · PDE5 / cGMP signaling",
    render: (name) =>
      buildLinearPathway(name, [
        "PDE5 inhibition",
        "cGMP signaling preserved",
        "vascular smooth-muscle relaxation",
        "cardiopulmonary context",
      ]),
  },
  reproductiveHormone: {
    label: "Pathway sketch · sex-hormone signaling",
    render: (name) =>
      buildLinearPathway(name, [
        "estrogen / progestin receptor signaling",
        "reproductive-hormone axis shift",
        "vascular + metabolic context",
        "mortality association readout",
      ]),
  },
  migraineSerotonin: {
    label: "Pathway sketch · migraine serotonin signaling",
    render: (name) =>
      buildLinearPathway(name, [
        "5-HT1 receptor agonism",
        "cranial vascular / trigeminal signaling shift",
        "acute migraine treatment context",
        "mortality association readout",
      ]),
  },
  vaccineImmunity: {
    label: "Pathway sketch · vaccine / immune memory",
    render: (name) =>
      buildLinearPathway(name, [
        "vaccine antigen exposure",
        "adaptive immune priming",
        "infection-risk context",
        "mortality association readout",
      ]),
  },
  antimicrobial: {
    label: "Pathway sketch · antimicrobial exposure",
    render: (name) =>
      buildLinearPathway(name, [
        "antimicrobial or anti-infective exposure",
        "pathogen / microbiome pressure shift",
        "immune-inflammatory context",
        "mortality association readout",
      ]),
  },
  acidSuppression: {
    label: "Pathway sketch · gastric acid suppression",
    render: (name) =>
      buildLinearPathway(name, [
        "gastric acid suppression / buffering",
        "reflux or ulcer symptom control",
        "GI comorbidity context",
        "mortality association readout",
      ]),
  },
  cardiacElectrophysiology: {
    label: "Pathway sketch · cardiac electrophysiology",
    render: (name) =>
      buildLinearPathway(name, [
        "cardiac ion-channel modulation",
        "rhythm / conduction shift",
        "cardiac event context",
        "mortality association readout",
      ]),
  },
  lithiumSignaling: {
    label: "Pathway sketch · lithium signaling",
    render: (name) =>
      buildLinearPathway(name, [
        "lithium ion exposure",
        "inositol / GSK3-linked signaling",
        "neuropsychiatric treatment context",
        "mortality association readout",
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
  monoaminePsychiatry: {
    label: "Pathway sketch · monoamine neuropsychiatry",
    render: (name) =>
      buildLinearPathway(name, [
        "serotonin / norepinephrine signaling shift",
        "mood, pain, or sleep treatment",
        "neuropsychiatric comorbidity context",
        "mortality association readout",
      ]),
  },
  autonomicUrology: {
    label: "Pathway sketch · autonomic urology",
    render: (name) =>
      buildLinearPathway(name, [
        "alpha-adrenergic or muscarinic signaling shift",
        "urinary-flow / bladder symptom control",
        "urologic comorbidity context",
        "mortality association readout",
      ]),
  },
  goutUrate: {
    label: "Pathway sketch · urate / gout inflammation",
    render: (name) =>
      buildLinearPathway(name, [
        "urate production or crystal inflammation down",
        "gout flare prevention",
        "metabolic-inflammatory context",
        "mortality association readout",
      ]),
  },
  antiplateletVascular: {
    label: "Pathway sketch · antiplatelet vascular risk",
    render: (name) =>
      buildLinearPathway(name, [
        "platelet activation down",
        "thrombotic event prevention",
        "vascular disease context",
        "mortality association readout",
      ]),
  },
  anticoagulantVascular: {
    label: "Pathway sketch · anticoagulant vascular risk",
    render: (name) =>
      buildLinearPathway(name, [
        "coagulation cascade activity down",
        "clot formation risk reduced",
        "atrial-fibrillation / thrombosis context",
        "mortality association readout",
      ]),
  },
  nicotineSmoking: {
    label: "Pathway sketch · nicotine dependence treatment",
    render: (name) =>
      buildLinearPathway(name, [
        "nicotinic receptor partial agonism",
        "smoking-cessation support",
        "tobacco-exposure risk context",
        "mortality association readout",
      ]),
  },
  cholinergicDementia: {
    label: "Pathway sketch · cholinergic / dementia care",
    render: (name) =>
      buildLinearPathway(name, [
        "acetylcholine signaling modulation",
        "cognitive-symptom treatment",
        "dementia / frailty context",
        "mortality association readout",
      ]),
  },
  dopaminergicParkinson: {
    label: "Pathway sketch · dopaminergic movement control",
    render: (name) =>
      buildLinearPathway(name, [
        "dopamine-pathway modulation",
        "motor-symptom treatment",
        "Parkinson / neurodegeneration context",
        "mortality association readout",
      ]),
  },
  opioidAnalgesia: {
    label: "Pathway sketch · opioid analgesia",
    render: (name) =>
      buildLinearPathway(name, [
        "mu-opioid receptor agonism",
        "analgesia + CNS / respiratory effects",
        "severe pain / palliative context",
        "mortality association readout",
      ]),
  },
  antiseizureNeuro: {
    label: "Pathway sketch · anti-seizure neurophysiology",
    render: (name) =>
      buildLinearPathway(name, [
        "neuronal excitability modulation",
        "seizure-threshold control",
        "epilepsy / neurologic-burden context",
        "mortality association readout",
      ]),
  },
  gabaSedative: {
    label: "Pathway sketch · GABA sedation",
    render: (name) =>
      buildLinearPathway(name, [
        "GABA-A signaling potentiation",
        "sedation / anxiolysis / seizure control",
        "falls + frailty context",
        "mortality association readout",
      ]),
  },
  antipsychoticDopamine: {
    label: "Pathway sketch · antipsychotic dopamine signaling",
    render: (name) =>
      buildLinearPathway(name, [
        "dopamine / serotonin receptor blockade",
        "psychosis or agitation treatment",
        "neuropsychiatric vulnerability context",
        "mortality association readout",
      ]),
  },
  immunosuppression: {
    label: "Pathway sketch · immunosuppression",
    render: (name) =>
      buildLinearPathway(name, [
        "lymphocyte proliferation / signaling down",
        "immune suppression",
        "transplant / autoimmune disease context",
        "mortality association readout",
      ]),
  },
  endocrineCancer: {
    label: "Pathway sketch · cancer endocrine therapy",
    render: (name) =>
      buildLinearPathway(name, [
        "estrogen synthesis or receptor signaling down",
        "hormone-sensitive tumor treatment",
        "cancer-care context",
        "mortality association readout",
      ]),
  },
  respiratoryAirway: {
    label: "Pathway sketch · respiratory airway control",
    render: (name) =>
      buildLinearPathway(name, [
        "bronchodilation / airway inflammation control",
        "gas-exchange burden shift",
        "asthma / COPD severity context",
        "mortality association readout",
      ]),
  },
  cardiorenalFluid: {
    label: "Pathway sketch · cardiorenal fluid balance",
    render: (name) =>
      buildLinearPathway(name, [
        "renal sodium / fluid handling",
        "volume + cardiac load shift",
        "heart-failure / renal context",
        "mortality association readout",
      ]),
  },
  cardiacGlycoside: {
    label: "Pathway sketch · cardiac glycoside signaling",
    render: (name) =>
      buildLinearPathway(name, [
        "Na+/K+ ATPase inhibition",
        "contractility + rate-control effects",
        "heart-failure / atrial-fibrillation context",
        "mortality association readout",
      ]),
  },
  calciumChannel: {
    label: "Pathway sketch · calcium-channel vascular tone",
    render: (name) =>
      buildLinearPathway(name, [
        "L-type calcium-channel blockade",
        "vascular smooth-muscle relaxation",
        "hypertension / angina context",
        "mortality association readout",
      ]),
  },
  nitrateVasodilator: {
    label: "Pathway sketch · nitrate vasodilation",
    render: (name) =>
      buildLinearPathway(name, [
        "nitric-oxide donor signaling",
        "venous / coronary vasodilation",
        "ischemic-heart-disease context",
        "mortality association readout",
      ]),
  },
  mineralBone: {
    label: "Pathway sketch · bone-mineral metabolism",
    render: (name) =>
      buildLinearPathway(name, [
        "vitamin D / mineral handling",
        "calcium-phosphate balance",
        "renal bone / osteoporosis context",
        "mortality association readout",
      ]),
  },
  vitaminReplacement: {
    label: "Pathway sketch · vitamin replacement",
    render: (name) =>
      buildLinearPathway(name, [
        "micronutrient replacement",
        "deficiency-state correction",
        "nutrition / alcohol-care context",
        "mortality association readout",
      ]),
  },
  antiemeticGi: {
    label: "Pathway sketch · antiemetic / GI motility",
    render: (name) =>
      buildLinearPathway(name, [
        "dopamine / histamine / motility signaling",
        "nausea and vomiting control",
        "acute illness / GI context",
        "mortality association readout",
      ]),
  },
  pancreaticEnzyme: {
    label: "Pathway sketch · pancreatic enzyme replacement",
    render: (name) =>
      buildLinearPathway(name, [
        "digestive enzyme replacement",
        "fat / protein absorption support",
        "pancreatic disease context",
        "mortality association readout",
      ]),
  },
  laxativeGi: {
    label: "Pathway sketch · bowel-care physiology",
    render: (name) =>
      buildLinearPathway(name, [
        "osmotic / stool-softening effect",
        "bowel motility support",
        "constipation / care-dependency context",
        "mortality association readout",
      ]),
  },
  antisepticOral: {
    label: "Pathway sketch · oral antiseptic care",
    render: (name) =>
      buildLinearPathway(name, [
        "local antimicrobial / anti-inflammatory exposure",
        "oral mucosal burden shift",
        "dental / hospital-care context",
        "mortality association readout",
      ]),
  },
  dermatologicBarrier: {
    label: "Pathway sketch · dermatologic barrier care",
    render: (name) =>
      buildLinearPathway(name, [
        "skin-barrier / topical inflammation control",
        "itch, eczema, or fungal-burden care",
        "dermatologic comorbidity context",
        "mortality association readout",
      ]),
  },
  insulinGlucose: {
    label: "Pathway sketch · insulin glucose control",
    render: (name) =>
      buildLinearPathway(name, [
        "insulin replacement",
        "blood-glucose lowering",
        "advanced diabetes context",
        "mortality association readout",
      ]),
  },
  acidBaseRenal: {
    label: "Pathway sketch · renal acid-base balance",
    render: (name) =>
      buildLinearPathway(name, [
        "alkali replacement",
        "metabolic acidosis buffering",
        "renal / acid-base context",
        "mortality association readout",
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
  projectWorkflow: {
    label: "Pathway sketch · project workflow",
    render: (name) =>
      buildLinearPathway(name, [
        "UK Biobank prescription records",
        "mortality + multimorbidity outcomes",
        "candidate drug prioritization",
        "future validation",
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
  "UK Biobank drug-screen project": "projectWorkflow",
  "UK Biobank lifespan drug project": "projectWorkflow",
  "L-Leucine": "nutrientSensing",
  Alfacalcidol: "mineralBone",
  Amantadine: "dopaminergicParkinson",
  Azathioprine: "immunosuppression",
  Benzydamine: "antisepticOral",
  Bumetanide: "cardiorenalFluid",
  Carbocisteine: "respiratoryAirway",
  Carvedilol: "adrenergic",
  Chlorhexidine: "antisepticOral",
  "Chlorhexidine Gluconate": "antisepticOral",
  Clonazepam: "gabaSedative",
  Creon: "pancreaticEnzyme",
  Cyclizine: "antiemeticGi",
  Digoxin: "cardiacGlycoside",
  Donepezil: "cholinergicDementia",
  Docusate: "laxativeGi",
  "Epilim Chrono": "antiseizureNeuro",
  Eplerenone: "cardiorenalFluid",
  Exemestane: "endocrineCancer",
  Fentanyl: "opioidAnalgesia",
  "Fentanyl Transdermal Patches": "opioidAnalgesia",
  Fludrocortisone: "cardiorenalFluid",
  Furosemide: "cardiorenalFluid",
  Ipratropium: "respiratoryAirway",
  "Ipratropium Bromide": "respiratoryAirway",
  Isotard: "nitrateVasodilator",
  Laxido: "laxativeGi",
  Letrozole: "endocrineCancer",
  Levetiracetam: "antiseizureNeuro",
  Lorazepam: "gabaSedative",
  Omeprazole: "acidSuppression",
  Lansoprazole: "acidSuppression",
  Ranitidine: "acidSuppression",
  Gaviscon: "acidSuppression",
  "Gaviscon Advance": "acidSuppression",
  Peptac: "acidSuppression",
  Ovestin: "reproductiveHormone",
  Ramipril: "raas",
  Lisinopril: "raas",
  Enalapril: "raas",
  Candesartan: "raas",
  "Perindopril Erbumine": "raas",
  Ace: "raas",
  Gliclazide: "glucoseRegulation",
  Amitriptyline: "monoaminePsychiatry",
  Trazodone: "monoaminePsychiatry",
  Lofepramine: "monoaminePsychiatry",
  Citalopram: "monoaminePsychiatry",
  Sertraline: "monoaminePsychiatry",
  Solifenacin: "autonomicUrology",
  Doxazosin: "autonomicUrology",
  Allopurinol: "goutUrate",
  "Aviva Testing Strips": "glucoseRegulation",
  "Contour Testing Strips": "glucoseRegulation",
  "Contour Next Testing Strips": "glucoseRegulation",
  "Active Testing Strips": "glucoseRegulation",
  "Freestyle Optium Testing Strips": "glucoseRegulation",
  "Microlet Lancets": "glucoseRegulation",
  "Multiclix Lancets": "glucoseRegulation",
  "Sharpsafe Disposal Unit Yellow": "glucoseRegulation",
  "Sharpsguard Disposal Unit Yellow": "glucoseRegulation",
  Softclix: "glucoseRegulation",
  Oilatum: "dermatologicBarrier",
  Cetraben: "dermatologicBarrier",
  Epaderm: "dermatologicBarrier",
  Doublebase: "dermatologicBarrier",
  Aqueous: "dermatologicBarrier",
  Diprobase: "dermatologicBarrier",
  Betnovate: "dermatologicBarrier",
  Clotrimazole: "dermatologicBarrier",
  "Polytar Liquid": "dermatologicBarrier",
  Varenicline: "nicotineSmoking",
  Warfarin: "anticoagulantVascular",
  Rivaroxaban: "anticoagulantVascular",
  Paracetamol: "neuronal",
  Nefopam: "neuronal",
  Baclofen: "neuronal",
  Ivabradine: "cardiacElectrophysiology",
  Amiodarone: "cardiacElectrophysiology",
  "Phyllocontin Continus": "respiratoryAirway",
  Salamol: "respiratoryAirway",
  Sumatriptan: "migraineSerotonin",
  Ventolin: "respiratoryAirway",
  Amiloride: "cardiorenalFluid",
  "Co-Amilofruse": "cardiorenalFluid",
  Meclizine: "neuronal",
  Metformin: "metformin",
  "Metformin + Rapamycin": "comboMetforminRapa",
  Metoprolol: "adrenergic",
  "Medium-chain triglyceride oil": "lipidMetabolism",
  "Methylene blue": "mitochondrial",
  "Estrogen therapy": "reproductiveHormone",
  Estraderm: "reproductiveHormone",
  Estradiol: "reproductiveHormone",
  Estriol: "reproductiveHormone",
  Flecainide: "cardiacElectrophysiology",
  "ACE inhibitors": "raas",
  Lithium: "lithiumSignaling",
  MIF098: "targetedStress",
  Minocycline: "inflammation",
  MitoQ: "mitochondrial",
  Marvelon: "reproductiveHormone",
  Meloxicam: "inflammation",
  "Morphine Sulfate": "opioidAnalgesia",
  "MST Continus": "opioidAnalgesia",
  "Mycophenolate Mofetil": "immunosuppression",
  "Mycophenolic acid": "immunosuppression",
  Nateglinide: "glucoseRegulation",
  Nebivolol: "adrenergic",
  Nifedipine: "calciumChannel",
  "Nicotinamide riboside": "mitochondrial",
  Nitroflurbiprofen: "inflammation",
  Nystatin: "antimicrobial",
  "Nordihydroguaiaretic acid": "antioxidant",
  NP1: "experimental",
  "Obeticholic acid": "bileAcid",
  Oramorph: "opioidAnalgesia",
  Otomize: "antimicrobial",
  "Oxaloacetic acid": "mitochondrial",
  PB125: "antioxidant",
  "PDE5 inhibitors": "pde5",
  Pioglitazone: "glucoseRegulation",
  Premarin: "reproductiveHormone",
  Protandim: "antioxidant",
  Propranolol: "adrenergic",
  "Propyl gallate": "antioxidant",
  Quercetin: "antioxidant",
  Rapamycin: "mtor",
  "Rapamycin + Acarbose": "comboRapaAcarbose",
  Resveratrol: "antioxidant",
  "Retinoic acid (tretinoin)": "nuclearReceptor",
  Revaxis: "vaccineImmunity",
  Ritonavir: "immuneMetabolism",
  Risperidone: "antipsychoticDopamine",
  Ropinirole: "dopaminergicParkinson",
  SG1002: "gasotransmitter",
  Salbutamol: "respiratoryAirway",
  Serevent: "respiratoryAirway",
  Sildenafil: "pde5",
  Simvastatin: "lipidMetabolism",
  Sitagliptin: "glucoseRegulation",
  "SGLT2 inhibitors": "sglt2",
  "Sodium Bicarbonate": "acidBaseRenal",
  "Sodium Valproate": "antiseizureNeuro",
  "Sodium thiosulfate": "gasotransmitter",
  Spironolactone: "cardiorenalFluid",
  Statins: "lipidMetabolism",
  "Strontium Ranelate": "mineralBone",
  Sulforaphane: "antioxidant",
  Sulindac: "inflammation",
  Syringaresinol: "antioxidant",
  Tadalafil: "pde5",
  Tamibarotene: "nuclearReceptor",
  Temsirolimus: "mtor",
  Terbinafine: "antimicrobial",
  Thalidomide: "immuneMetabolism",
  "Thioflavin T": "proteostasis",
  Thiamine: "vitaminReplacement",
  TM5441: "targetedStress",
  "Uniphyllin Continus": "respiratoryAirway",
  Untreated: "control",
  "Untreated control": "control",
  "Ursolic acid": "antioxidant",
  "Ursodeoxycholic acid": "bileAcid",
  "Valproic acid": "epigenetic",
  Avaxim: "vaccineImmunity",
  Lymecycline: "antimicrobial",
  Naproxen: "inflammation",
  Vagifem: "reproductiveHormone",
  "Water control": "control",
  "beta-GPA": "mitochondrial",
  "beta-Guanidinopropionic acid": "mitochondrial",
};

const PATHWAY_INFERENCE_RULES = [
  { key: "control", pattern: /^((dmso|water)\s+)?control\b|^untreated\b/ },
  { key: "projectWorkflow", pattern: /uk biobank.*project|project 1246676|drug-screen project|lifespan-modulating drug project/ },
  { key: "comboMetforminRapa", pattern: /metformin\s*\+\s*rapamycin/ },
  { key: "comboRapaAcarbose", pattern: /rapamycin\s*\+\s*acarbose/ },
  { key: "acarbose", pattern: /alpha-glucosidase|carbohydrate digestion/ },
  { key: "sglt2", pattern: /sglt2|urinary glucose excretion/ },
  { key: "metformin", pattern: /\bbiguanide\b|hepatic glucose production|ampk/ },
  { key: "insulinGlucose", pattern: /\binsulin\b|insulin-treated|rapid-acting insulin|basal insulin|pre-filled pen/ },
  {
    key: "glucoseRegulation",
    pattern: /glucose control|glucose-lowering diabetes|diabetes-monitoring|blood glucose|insulin sensitivity|insulin release|dpp-4|sulfonylurea|meal-related insulin|type 2 diabetes|diabetes drug/,
  },
  { key: "mtor", pattern: /mTOR inhibitor|sirolimus|temsirolimus|everolimus/ },
  { key: "pde5", pattern: /pde5|phosphodiesterase type 5|cGMP|pulmonary arterial hypertension|erectile dysfunction/ },
  { key: "migraineSerotonin", pattern: /triptan|migraine|5-ht1|serotonin.*receptor/ },
  { key: "acidSuppression", pattern: /acid-suppression|h2-blocker|alginate antacid|gastric acid|reflux|ulcer|dyspepsia|gastroprotection/ },
  { key: "vaccineImmunity", pattern: /vaccine|immunization|antigen|hepatitis a|diphtheria|tetanus|poliomyelitis/ },
  { key: "cardiacElectrophysiology", pattern: /antiarrhythmic|arrhythmia|sodium-channel|sodium channel|heart rhythm|cardiac rhythm|cardiac rate|conduction/ },
  { key: "lithiumSignaling", pattern: /\blithium\b|gsk3|inositol/ },
  { key: "cholinergicDementia", pattern: /dementia|alzheimer|cholinesterase|cognitive symptoms/ },
  { key: "dopaminergicParkinson", pattern: /parkinson|movement-disorder|dopaminergic|dopamine-pathway|mao-b|motor-symptom/ },
  { key: "nicotineSmoking", pattern: /nicotinic-receptor|smoking cessation|smoking-cessation|tobacco-exposure/ },
  { key: "opioidAnalgesia", pattern: /(^|[^-])opioid|morphine|fentanyl|oxycodone|severe pain|palliative|mu-opioid/ },
  { key: "neuronal", pattern: /non-opioid pain|muscle-spasm|muscle spasm|neuromuscular symptom/ },
  { key: "antiseizureNeuro", pattern: /anti-seizure|seizure|epilepsy|valproate|levetiracetam|lamotrigine|carbamazepine|gabapentin|pregabalin/ },
  { key: "gabaSedative", pattern: /benzodiazepine|sedative|anxiolytic|hypnotic|gaba-a|insomnia|falls/ },
  { key: "antipsychoticDopamine", pattern: /antipsychotic|psychosis|agitation|dopamine.*serotonin|dopamine d2/ },
  { key: "monoaminePsychiatry", pattern: /antidepressant|neuromodulatory|serotonin|norepinephrine|depression|neuropathic pain|mood, pain, or sleep/ },
  { key: "autonomicUrology", pattern: /urologic|overactive bladder|urinary symptoms|urinary-flow|bladder symptom|prostate-related/ },
  { key: "immunosuppression", pattern: /immunosuppress|transplant|autoimmune|mycophenolate|azathioprine|tacrolimus|ciclosporin/ },
  { key: "endocrineCancer", pattern: /aromatase inhibitor|cancer endocrine|breast cancer|hormone-receptor-positive|hormone-sensitive tumor/ },
  { key: "respiratoryAirway", pattern: /respiratory medicine|bronchodilator|airway inflammation|asthma|copd|bronchospasm|mucus-clearance|methylxanthine|inhaler/ },
  { key: "raas", pattern: /ace inhibitor|angiotensin ii receptor blocker|\barb\b|renin-angiotensin|raas|kidney protection/ },
  { key: "cardiacGlycoside", pattern: /cardiac glycoside|digoxin|na\+\/k\+ atpase|atrial-fibrillation/ },
  { key: "cardiorenalFluid", pattern: /diuretic|mineralocorticoid|fluid overload|edema|heart failure|heart-failure|cardiorenal|renal sodium/ },
  { key: "calciumChannel", pattern: /calcium-channel|calcium channel|nifedipine|amlodipine|hypertension.*angina/ },
  { key: "nitrateVasodilator", pattern: /nitrate vasodilator|nicorandil|nitric-oxide donor|isosorbide|ischemic-heart-disease|angina/ },
  { key: "mineralBone", pattern: /active vitamin d|bone-mineral|calcium|phosphate|renal bone|osteoporosis|strontium ranelate/ },
  { key: "vitaminReplacement", pattern: /vitamin replacement|multivitamin|thiamine|vitamin b|micronutrient|deficiency|malnutrition|alcohol-related/ },
  { key: "antiemeticGi", pattern: /antiemetic|prokinetic|antispasmodic|nausea|vomiting|gastrointestinal motility|vestibular symptoms/ },
  { key: "pancreaticEnzyme", pattern: /pancreatic enzyme|pancreatin|exocrine insufficiency|digestion/ },
  { key: "laxativeGi", pattern: /laxative|stool-softening|constipation|bowel-care|bulk-forming|ispaghula|macrogol|docusate/ },
  { key: "antisepticOral", pattern: /oral antiseptic|mouthwash|oral rinse|dental|mouth|throat|mucosal-care|chlorhexidine|benzydamine/ },
  { key: "acidBaseRenal", pattern: /alkalinizing|metabolic acidosis|acid-base|sodium bicarbonate/ },
  { key: "dermatologicBarrier", pattern: /dermatology|emollient|topical steroid|skin-barrier|eczema|dermatitis|skin.*fungal|itch/ },
  { key: "goutUrate", pattern: /urate-lowering|gout|hyperuricemia|crystal-disease/ },
  { key: "antiplateletVascular", pattern: /antiplatelet|thrombotic event|cerebrovascular|vascular-risk/ },
  { key: "anticoagulantVascular", pattern: /anticoagulant|coagulation cascade|clotting risk|thrombotic-risk|venous thromboembolism/ },
  { key: "antimicrobial", pattern: /antibiotic|antifungal|anti-infective|neomycin|terbinafine|tetracycline|infection|pathogen/ },
  { key: "bileAcid", pattern: /fxr|tgr5|bile acid/ },
  { key: "adrenergic", pattern: /beta-blocker|beta1-selective|beta1 selective/ },
  { key: "vascular", pattern: /vasodilator|blood pressure/ },
  { key: "gasotransmitter", pattern: /hydrogen sulfide|sulfur donor|cyanide antidote/ },
  { key: "lipidMetabolism", pattern: /hmg-coa|omega-3|lipid metabolism|cholesterol/ },
  { key: "microbiome", pattern: /prebiotic|chicory root|microbiome/ },
  { key: "reproductiveHormone", pattern: /estradiol|estriol|estrogen|progestin|ethinylestradiol|desogestrel|contraceptive|hormone replacement|hormone-therapy/ },
  { key: "nuclearReceptor", pattern: /steroid|retinoid|vitamin a derivative|ppar|corticosteroid|hormone/ },
  { key: "kinase", pattern: /tyrosine kinase inhibitor|egfr|kinase-driven|growth-factor/ },
  { key: "proteostasis", pattern: /hsp90|heat-shock|chemical chaperone|protein aggregate|proteasome|deacetylase/ },
  { key: "epigenetic", pattern: /dna methyltransferase|epigenetic|chromatin/ },
  { key: "inflammation", pattern: /anti-inflammatory|nsaid|prostaglandin/ },
  { key: "neuronal", pattern: /anti-seizure|dopamine receptor|muscarinic|antihistamine|quinoline|leg cramps|vertigo|epilepsy|seizure/ },
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
  const baseName = stripDoseFormulation(normalizedName);
  const pathwayKey =
    PATHWAY_KEY_BY_NAME[normalizedName] ||
    PATHWAY_KEY_BY_NAME[baseName] ||
    inferPathwayKey(normalizedName, description);
  const template = PATHWAY_TEMPLATES[pathwayKey] || PATHWAY_TEMPLATES.experimental;

  return {
    key: pathwayKey,
    name: normalizedName,
    label: template.label,
    ascii: template.render(normalizedName),
  };
}

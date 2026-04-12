export const GROUP_CODE_NORMALIZATION = {
  CAPT: "Capt",
};

const INTERVENTION_DISPLAY = {
  "17aE2": { name: "17-alpha-Estradiol" },
  "17aE2_16m": { name: "17-alpha-Estradiol", qualifier: "start 16 mo" },
  "17aE2_20m": { name: "17-alpha-Estradiol", qualifier: "start 20 mo" },
  "17aE2_hi": { name: "17-alpha-Estradiol", qualifier: "14 ppm" },
  "4-OH-PBN": {
    name: "alpha-(4-hydroxyphenyl)-N-tert-butylnitrone",
  },
  ACA: { name: "Acarbose" },
  ACA_hi: { name: "Acarbose", qualifier: "2500 ppm" },
  ACA_lo: { name: "Acarbose", qualifier: "400 ppm" },
  ACA_mid: { name: "Acarbose", qualifier: "1000 ppm" },
  AKG_18: { name: "alpha-Ketoglutarate", qualifier: "start 18 mo" },
  Asp: { name: "Aspirin" },
  Asp_200: { name: "Aspirin", qualifier: "200 ppm" },
  Asp_60: { name: "Aspirin", qualifier: "60 ppm" },
  Asta: { name: "Astaxanthin" },
  BD: { name: "(R/S)-1,3-Butanediol" },
  CAPE_hi: { name: "Caffeic acid phenethyl ester", qualifier: "300 ppm" },
  CAPE_lo: { name: "Caffeic acid phenethyl ester", qualifier: "30 ppm" },
  CC: { name: "Candesartan cilexetil" },
  Cana: { name: "Canagliflozin" },
  Cana_16: { name: "Canagliflozin", qualifier: "start 16 mo" },
  Cana_6: { name: "Canagliflozin", qualifier: "start 6 mo" },
  Capt: { name: "Captopril" },
  Cur: { name: "Curcumin" },
  DMAG: {
    name: "17-dimethylaminoethylamino-17-demethoxygeldanamycin",
  },
  DMF_16: { name: "Dimethyl fumarate", qualifier: "start 16 mo" },
  DMF_9: { name: "Dimethyl fumarate", qualifier: "start 9 mo" },
  DNP: { name: "2,4-Dinitrophenol" },
  Enal: { name: "Enalapril" },
  FO_hi: { name: "Fish oil", qualifier: "50,000 ppm" },
  FO_lo: { name: "Fish oil", qualifier: "15,000 ppm" },
  Fis_Cyc: {
    name: "Fisetin",
    qualifier: "600 ppm, 3 days on / 11 days off",
  },
  Fis_On: { name: "Fisetin", qualifier: "600 ppm, continuous" },
  GGA: { name: "Geranylgeranylacetone" },
  GTE: { name: "Green tea extract" },
  Gly: { name: "Glycine" },
  HBX: { name: "2-(2-Hydroxyphenyl)benzoxazole" },
  HYD_16: { name: "Hydralazine", qualifier: "start 16 mo" },
  HYD_6: { name: "Hydralazine", qualifier: "start 6 mo" },
  "INT-767": { name: "INT-767", qualifier: "FXR/TGR5 agonist" },
  Inu: { name: "Inulin" },
  Leu: { name: "L-Leucine" },
  MB: { name: "Methylene blue" },
  MCTO: { name: "Medium-chain triglyceride oil" },
  MIF098: { name: "MIF098", qualifier: "MIF antagonist" },
  MPA: { name: "Mycophenolic acid" },
  Mec: { name: "Meclizine" },
  Met: { name: "Metformin" },
  MetRapa: { name: "Metformin + Rapamycin" },
  Min: { name: "Minocycline" },
  MitoQ: { name: "MitoQ" },
  NDGA: { name: "Nordihydroguaiaretic acid" },
  NDGA_hi: { name: "Nordihydroguaiaretic acid", qualifier: "5000 ppm" },
  NDGA_lo: { name: "Nordihydroguaiaretic acid", qualifier: "800 ppm" },
  NDGA_mid: { name: "Nordihydroguaiaretic acid", qualifier: "2500 ppm" },
  NEBI: { name: "Nebivolol" },
  NFP: { name: "Nitroflurbiprofen" },
  NR: { name: "Nicotinamide riboside" },
  OAA: { name: "Oxaloacetic acid" },
  "OH-EST": { name: "16-alpha-Hydroxyestriol" },
  PB125: { name: "PB125", qualifier: "Nrf2 activator blend" },
  PBA: { name: "4-Phenylbutyrate" },
  Prot: { name: "Protandim" },
  RaAc16: { name: "Rapamycin + Acarbose", qualifier: "start 16 mo" },
  RaAc9: { name: "Rapamycin + Acarbose", qualifier: "start 9 mo" },
  Rapa: { name: "Rapamycin" },
  Rapa_hi: { name: "Rapamycin", qualifier: "42 ppm" },
  Rapa_hi_continuous: {
    name: "Rapamycin",
    qualifier: "42 ppm, continuous from 20 mo",
  },
  Rapa_hi_cycle: { name: "Rapamycin", qualifier: "42 ppm, cycling from 20 mo" },
  Rapa_hi_start_stop: {
    name: "Rapamycin",
    qualifier: "42 ppm, 20 to 23 mo only",
  },
  Rapa_lo: { name: "Rapamycin", qualifier: "4.7 ppm" },
  Rapa_mid: { name: "Rapamycin", qualifier: "14 ppm" },
  Res: { name: "Resveratrol" },
  Res_hi: { name: "Resveratrol", qualifier: "1200 ppm" },
  Res_lo: { name: "Resveratrol", qualifier: "300 ppm" },
  SG1002: { name: "SG1002", qualifier: "hydrogen sulfide donor" },
  Sim_hi: { name: "Simvastatin", qualifier: "120 ppm" },
  Sim_lo: { name: "Simvastatin", qualifier: "12 ppm" },
  Sul: { name: "Sulindac" },
  Syr: { name: "Syringaresinol" },
  THIO: { name: "Sodium thiosulfate" },
  TM5441: { name: "TM5441", qualifier: "PAI-1 inhibitor" },
  UA: { name: "Ursolic acid" },
  UDCA: { name: "Ursodeoxycholic acid" },
  bGPA: { name: "beta-Guanidinopropionic acid" },
};

export const INTERVENTION_DESCRIPTIONS = {
  "17-alpha-Estradiol":
    "An estrogen-related steroid and stereoisomer of estradiol studied for metabolic and neuroprotective effects.",
  "alpha-(4-hydroxyphenyl)-N-tert-butylnitrone":
    "A synthetic nitrone compound studied as an antioxidant and free-radical scavenger.",
  Acarbose:
    "An alpha-glucosidase inhibitor used for type 2 diabetes that slows intestinal carbohydrate digestion.",
  "alpha-Ketoglutarate":
    "A tricarboxylic acid cycle intermediate, also called 2-oxoglutarate, used as a metabolic supplement.",
  Aspirin:
    "A nonsteroidal anti-inflammatory drug (NSAID) with pain-relieving, anti-inflammatory, and antiplatelet effects.",
  Astaxanthin:
    "A carotenoid pigment and antioxidant found in algae, salmon, and shellfish.",
  "(R/S)-1,3-Butanediol":
    "A ketone-body precursor alcohol that can be metabolized to beta-hydroxybutyrate.",
  "Caffeic acid phenethyl ester":
    "A propolis-derived polyphenol studied for antioxidant and anti-inflammatory activity.",
  "Candesartan cilexetil":
    "An angiotensin II receptor blocker (ARB) used to treat high blood pressure.",
  Canagliflozin:
    "An SGLT2 inhibitor diabetes drug that increases urinary glucose excretion.",
  Captopril:
    "An ACE inhibitor used to treat hypertension and heart failure.",
  Curcumin:
    "A turmeric-derived polyphenol studied for antioxidant and anti-inflammatory effects.",
  "17-dimethylaminoethylamino-17-demethoxygeldanamycin":
    "Also called alvespimycin, a geldanamycin-derived small molecule that inhibits the Hsp90 chaperone.",
  "Dimethyl fumarate":
    "A fumarate ester drug used clinically for relapsing multiple sclerosis and psoriasis.",
  "2,4-Dinitrophenol":
    "A mitochondrial uncoupler that increases energy expenditure; it is not an approved therapeutic drug.",
  Enalapril:
    "An ACE inhibitor used to treat hypertension and heart failure.",
  "Fish oil":
    "An omega-3 fatty acid supplement rich in EPA and DHA.",
  Fisetin:
    "A flavonol found in fruits and vegetables that is studied for antioxidant and senolytic effects.",
  Geranylgeranylacetone:
    "Also called teprenone, an anti-ulcer drug studied for heat-shock-protein induction.",
  "Green tea extract":
    "A concentrated tea extract rich in catechin polyphenols such as EGCG.",
  Glycine:
    "The simplest amino acid and a common nutritional and metabolic supplement.",
  "2-(2-Hydroxyphenyl)benzoxazole":
    "A synthetic benzoxazole compound studied experimentally as an antioxidant small molecule.",
  Hydralazine:
    "A direct-acting vasodilator used to lower blood pressure.",
  "INT-767":
    "An experimental dual FXR/TGR5 agonist that modulates bile-acid signaling.",
  Inulin:
    "A soluble prebiotic fiber, often derived from chicory root.",
  "L-Leucine":
    "A branched-chain essential amino acid involved in protein synthesis and mTOR signaling.",
  "Methylene blue":
    "A redox-active dye and drug used clinically for methemoglobinemia and studied for mitochondrial effects.",
  "Medium-chain triglyceride oil":
    "A dietary fat supplement made of medium-chain triglycerides that are rapidly oxidized for energy.",
  MIF098:
    "An experimental small-molecule antagonist of macrophage migration inhibitory factor (MIF).",
  "Mycophenolic acid":
    "An immunosuppressant that inhibits inosine monophosphate dehydrogenase and purine synthesis.",
  Meclizine:
    "An antihistamine used for motion sickness and vertigo.",
  Metformin:
    "A biguanide diabetes drug that lowers hepatic glucose production and improves insulin sensitivity.",
  "Metformin + Rapamycin":
    "A combination of metformin and rapamycin pairing a biguanide with an mTOR inhibitor.",
  Minocycline:
    "A tetracycline antibiotic with anti-inflammatory and neuroprotective research interest.",
  MitoQ:
    "A mitochondria-targeted ubiquinone antioxidant.",
  "Nordihydroguaiaretic acid":
    "A plant lignan antioxidant from creosote bush, commonly abbreviated NDGA.",
  Nebivolol:
    "A beta1-selective beta-blocker with nitric-oxide-mediated vasodilatory effects.",
  Nitroflurbiprofen:
    "A nitric-oxide-releasing derivative of the NSAID flurbiprofen.",
  "Nicotinamide riboside":
    "A vitamin B3-related NAD+ precursor used as a nutritional supplement.",
  "Oxaloacetic acid":
    "A tricarboxylic acid cycle intermediate involved in cellular energy metabolism.",
  "16-alpha-Hydroxyestriol":
    "An estrogenic steroid metabolite related to estriol.",
  PB125:
    "A phytochemical blend designed to activate the Nrf2 cellular stress-response pathway.",
  "4-Phenylbutyrate":
    "A short-chain fatty acid derivative used clinically as a nitrogen-scavenging drug and chemical chaperone.",
  Protandim:
    "A multi-ingredient botanical supplement marketed as an Nrf2 activator.",
  "Rapamycin + Acarbose":
    "A combination of rapamycin, an mTOR inhibitor, and acarbose, a carbohydrate-digestion blocker.",
  Rapamycin:
    "Also called sirolimus, a macrolide drug and mTOR inhibitor used as an immunosuppressant.",
  Resveratrol:
    "A polyphenol found in grapes and other plants that is studied for antioxidant signaling effects.",
  SG1002:
    "An experimental oral hydrogen sulfide donor.",
  Simvastatin:
    "A statin drug that lowers cholesterol by inhibiting HMG-CoA reductase.",
  Sulindac:
    "A nonsteroidal anti-inflammatory drug (NSAID) used for pain and inflammation.",
  Syringaresinol:
    "A plant lignan polyphenol studied for antioxidant activity.",
  "Sodium thiosulfate":
    "An inorganic salt used medically as a cyanide antidote and sulfur donor.",
  TM5441:
    "An experimental small-molecule inhibitor of plasminogen activator inhibitor-1 (PAI-1).",
  "Ursolic acid":
    "A pentacyclic triterpenoid found in apple peels and other plants.",
  "Ursodeoxycholic acid":
    "A bile acid drug used for cholestatic liver disease and to dissolve some gallstones.",
  "beta-Guanidinopropionic acid":
    "A creatine analog that perturbs cellular energy metabolism.",
  Aldosterone:
    "A mineralocorticoid steroid hormone that regulates salt balance, fluid retention, and blood pressure.",
  "alpha-Estradiol":
    "Also called 17-alpha-estradiol, an estrogen-related steroid studied for metabolic and neuroprotective effects.",
  "alpha-Lipoic acid":
    "A sulfur-containing mitochondrial cofactor used as an antioxidant supplement.",
  Arecoline:
    "A naturally occurring alkaloid from areca nut that acts on muscarinic acetylcholine receptors.",
  Bakuchiol:
    "A plant-derived meroterpene often marketed as a retinol-like skin-care ingredient and studied for antioxidant effects.",
  Berberine:
    "A plant alkaloid studied for effects on glucose control, lipid metabolism, and cellular stress responses.",
  Bortezomib:
    "A proteasome inhibitor cancer drug used mainly for multiple myeloma and related blood cancers.",
  Bromocriptine:
    "A dopamine receptor agonist used clinically for Parkinson disease, hyperprolactinemia, and some diabetes indications.",
  Dapagliflozin:
    "An SGLT2 inhibitor diabetes drug that lowers blood glucose by increasing urinary glucose excretion.",
  Dasatinib:
    "A tyrosine kinase inhibitor cancer drug used for leukemia and other kinase-driven diseases.",
  Decitabine:
    "A DNA methyltransferase inhibitor used in some blood cancers and other epigenetic therapy settings.",
  Dexamethazone:
    "A corticosteroid drug with strong anti-inflammatory and immunosuppressive effects.",
  Diuron:
    "A phenylurea herbicide that inhibits photosynthesis in plants and algae.",
  "DMSO control":
    "A solvent-only matched control used when compounds are dissolved in dimethyl sulfoxide (DMSO).",
  Erlotinib:
    "An EGFR tyrosine kinase inhibitor used in several cancer treatments.",
  Everolimus:
    "An mTOR inhibitor related to rapamycin that is used in cancer and transplant medicine.",
  Gefitinib:
    "An EGFR tyrosine kinase inhibitor used in targeted cancer therapy.",
  Glipizide:
    "A sulfonylurea diabetes drug that increases insulin release from the pancreas.",
  Imatinib:
    "A tyrosine kinase inhibitor used for chronic myeloid leukemia, GIST, and related cancers.",
  Levetiracetam:
    "An anti-seizure medicine commonly used for epilepsy and other seizure disorders.",
  Metoprolol:
    "A beta1-selective beta-blocker used for high blood pressure, angina, and heart rhythm control.",
  NP1:
    "An experimental small molecule abbreviated NP1 that has been studied in worm aging screens.",
  Nateglinide:
    "A short-acting diabetes drug that stimulates insulin secretion around meals.",
  "Obeticholic acid":
    "A semisynthetic bile acid and FXR agonist used for some cholestatic liver diseases.",
  Pioglitazone:
    "A thiazolidinedione diabetes drug that improves insulin sensitivity through PPAR-gamma signaling.",
  Propranolol:
    "A nonselective beta-blocker used for high blood pressure, tremor, migraine prevention, and performance anxiety.",
  "Propyl gallate":
    "A synthetic antioxidant used as a food preservative and research additive.",
  Quercetin:
    "A plant flavonol found in many fruits and vegetables that is studied for antioxidant and signaling effects.",
  "Retinoic acid (tretinoin)":
    "A vitamin A derivative used in dermatology and in some leukemia treatments.",
  Ritonavir:
    "An HIV protease inhibitor now often used as a pharmacokinetic booster for other antiviral drugs.",
  Sitagliptin:
    "A DPP-4 inhibitor diabetes drug that helps raise meal-related insulin signaling.",
  Sulforaphane:
    "An isothiocyanate from broccoli and other cruciferous vegetables that activates cellular stress-response pathways such as Nrf2.",
  Tamibarotene:
    "A synthetic retinoid related to retinoic acid that is used clinically in some leukemia settings.",
  Temsirolimus:
    "An mTOR inhibitor related to sirolimus that is used in targeted cancer therapy.",
  Thalidomide:
    "An immunomodulatory drug with anti-inflammatory and anti-angiogenic activity and a well-known teratogenic history.",
  "Thioflavin T":
    "A fluorescent dye that binds amyloid-like protein aggregates and is often used as a staining reagent.",
  Untreated:
    "A no-compound baseline condition without an added drug or supplement.",
  "Untreated control":
    "A no-drug baseline group used as the matched control for untreated animals.",
  "Valproic acid":
    "An anti-seizure and mood-stabilizing drug that also affects histone deacetylase activity.",
  "Water control":
    "A water-only matched control used when compounds are delivered without DMSO or another solvent.",
  "beta-GPA":
    "Also called beta-guanidinopropionic acid, a creatine analog that perturbs cellular energy metabolism.",
};

export function normalizeGroupCode(group) {
  return GROUP_CODE_NORMALIZATION[group] ?? group;
}

export function getInterventionDisplay(group) {
  const normalizedGroup = normalizeGroupCode(group);
  const display = INTERVENTION_DISPLAY[normalizedGroup] ?? { name: normalizedGroup };

  return {
    ...display,
    description: INTERVENTION_DESCRIPTIONS[display.name] ?? null,
  };
}

export function getInterventionLabel(_cohort, group) {
  const { name, qualifier } = getInterventionDisplay(group);
  return qualifier ? `${name} (${qualifier})` : name;
}

export function getInterventionDescription(group) {
  return getInterventionDisplay(group).description;
}

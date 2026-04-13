const HUMAN_COHORT = "HUMAN_MEDICATION_EVIDENCE_2026";

const lipidLongevityPublication = {
  title:
    "Genetic insights into the association of statin and newer nonstatin drug target genes with human longevity: a Mendelian randomization analysis",
  year: 2023,
  pmid: "38082436",
};

const lipidLifespanPublication = {
  title: "Low-density lipoprotein cholesterol and lifespan: A Mendelian randomization study",
  year: 2021,
  pmid: "33704808",
};

const antihypertensiveMrPublication = {
  title: "Antihypertensive Drugs for the Prevention of Atrial Fibrillation: A Drug Target Mendelian Randomization Study",
  year: 2024,
  journal: "Hypertension",
  pmid: "39018378",
};

const factorXiPublication = {
  title: "Genetically Determined FXI (Factor XI) Levels and Risk of Stroke",
  year: 2018,
  journal: "Stroke",
  pmid: "30355187",
};

const medications = [
  {
    group: "STATINS",
    sortIndex: 1,
    label: "Statins (HMGCR inhibitors)",
    compoundDisplayName: "Statins",
    condition: "Secondary prevention and high atherosclerotic cardiovascular risk",
    description:
      "Best overall medication-class case for lower human all-cause mortality when used in appropriately selected adults, especially secondary prevention and other high-risk lipid-lowering settings.",
    publication: {
      title:
        "Efficacy and safety of more intensive lowering of LDL cholesterol: a meta-analysis of data from 170,000 participants in 26 randomised trials",
      year: 2010,
      journal: "Lancet",
      pmid: "21067804",
    },
    evidence: {
      overall: {
        score: 95,
        label: "Strongest medication-class triangulation",
        note:
          "Large randomized meta-analyses, supportive observational syntheses, and lipid-target Mendelian evidence all point in the same direction.",
      },
      meta: {
        score: 95,
        effect_label:
          "More intensive LDL lowering with statin therapy reduced all-cause mortality in randomized evidence.",
        detail: "170,000 participants across 26 trials.",
        publication: {
          title:
            "Efficacy and safety of more intensive lowering of LDL cholesterol: a meta-analysis of data from 170,000 participants in 26 randomised trials",
          year: 2010,
          journal: "Lancet",
          pmid: "21067804",
        },
      },
      epidemiology: {
        score: 88,
        effect_label:
          "Observational syntheses in adults aged 65 years and older support lower all-cause mortality with statin therapy.",
        detail: "815,667 participants across 10 observational studies.",
        publication: {
          title:
            "Association of statin use in older people primary prevention group with risk of cardiovascular events and mortality: a systematic review and meta-analysis of observational studies",
          year: 2021,
          pmid: "34154589",
        },
      },
      mendelian: {
        score: 92,
        effect_label:
          "Drug-target lipid genetics support longer lifespan and longevity for LDL-lowering pathways, including HMGCR.",
        detail: "Two-sample Mendelian randomization of lifespan and longevity outcomes.",
        publication: lipidLongevityPublication,
      },
    },
  },
  {
    group: "SGLT2",
    sortIndex: 2,
    label: "SGLT2 inhibitors",
    compoundDisplayName: "SGLT2 inhibitors",
    condition: "Type 2 diabetes, chronic kidney disease, and heart failure risk",
    description:
      "Among newer cardiometabolic classes, SGLT2 inhibitors have one of the strongest class-level all-cause mortality signals and the cleanest consistency across randomized and real-world data.",
    publication: {
      title:
        "Effects of sodium-glucose cotransporter type 2 inhibitors on cardiovascular, renal, and safety outcomes in patients with cardiovascular disease: a meta-analysis of randomized controlled trials",
      year: 2021,
      pmid: "33888126",
    },
    evidence: {
      overall: {
        score: 92,
        label: "Very strong modern class signal",
        note:
          "Randomized meta-analysis, multinational real-world mortality reductions, and SLC5A2-target Mendelian data all support a genuine cardiometabolic survival benefit.",
      },
      meta: {
        score: 90,
        effect_label:
          "Randomized meta-analysis showed lower all-cause mortality alongside lower cardiovascular death and heart-failure hospitalization.",
        detail: "Cardiovascular-disease RCT meta-analysis.",
        publication: {
          title:
            "Effects of sodium-glucose cotransporter type 2 inhibitors on cardiovascular, renal, and safety outcomes in patients with cardiovascular disease: a meta-analysis of randomized controlled trials",
          year: 2021,
          pmid: "33888126",
        },
      },
      epidemiology: {
        score: 86,
        effect_label:
          "Large international cohorts comparing SGLT2 inhibitors with DPP-4 inhibitors found substantially lower all-cause mortality.",
        detail: "CVD-REAL 2 multinational cohort.",
        publication: {
          title:
            "Risk of cardiovascular events and death associated with initiation of SGLT2 inhibitors compared with DPP-4 inhibitors: an analysis from the CVD-REAL 2 multinational cohort study",
          year: 2020,
          pmid: "32559476",
        },
      },
      mendelian: {
        score: 88,
        effect_label:
          "SLC5A2-based Mendelian analyses support favorable downstream effects on coronary disease and atrial fibrillation biology.",
        detail: "Drug-target Mendelian randomization for SGLT2 inhibition.",
        publication: {
          title:
            "SGLT2 Inhibition, Choline Metabolites, and Cardiometabolic Diseases: A Mediation Mendelian Randomization Study",
          year: 2022,
          pmid: "36161993",
        },
      },
    },
  },
  {
    group: "GLP1",
    sortIndex: 3,
    label: "GLP-1 receptor agonists",
    compoundDisplayName: "GLP-1 receptor agonists",
    condition: "Type 2 diabetes and obesity with elevated cardiovascular risk",
    description:
      "GLP-1 receptor agonists now have a credible class-level all-cause mortality signal in randomized evidence plus supportive real-world and drug-target genetic data.",
    publication: {
      title:
        "Cardiovascular Effects and Tolerability of GLP-1 Receptor Agonists: A Systematic Review and Meta-Analysis of 99,599 Patients",
      year: 2025,
      pmid: "40892610",
    },
    evidence: {
      overall: {
        score: 90,
        label: "Strong cross-stream cardiometabolic support",
        note:
          "The randomized signal is now mature, epidemiology is supportive in high-risk diabetes and obesity populations, and GLP1R-target genetics reinforce cardiovascular plausibility.",
      },
      meta: {
        score: 87,
        effect_label:
          "Large randomized meta-analyses show a lower all-cause death rate for the GLP-1 receptor agonist class.",
        detail: "99,599 participants across 21 randomized trials.",
        publication: {
          title:
            "Cardiovascular Effects and Tolerability of GLP-1 Receptor Agonists: A Systematic Review and Meta-Analysis of 99,599 Patients",
          year: 2025,
          pmid: "40892610",
        },
      },
      epidemiology: {
        score: 84,
        effect_label:
          "Large population-based cohorts associate GLP-1 receptor agonist use with lower all-cause mortality in high-risk diabetes populations.",
        detail: "Propensity-matched nationwide cohort in type 2 diabetes.",
        publication: {
          title:
            "Effects of glucagon-like peptide-1 receptor agonists on liver-related and cardiovascular mortality in patients with type 2 diabetes",
          year: 2024,
          pmid: "38172833",
        },
      },
      mendelian: {
        score: 85,
        effect_label:
          "GLP1R-target Mendelian evidence supports lower coronary and heart-failure risk, strengthening causal plausibility.",
        detail: "Drug-target Mendelian randomization using GLP1R variants.",
        publication: {
          title:
            "A genomic approach to therapeutic target validation identifies a glucose-lowering GLP1R variant protective for coronary heart disease",
          year: 2016,
          pmid: "27252175",
        },
      },
    },
  },
  {
    group: "ACEI",
    sortIndex: 4,
    label: "ACE inhibitors",
    compoundDisplayName: "ACE inhibitors",
    condition: "Hypertension, heart failure with reduced ejection fraction, and vascular risk",
    description:
      "ACE inhibitors hold up well under a medication-only evidence filter because the all-cause mortality benefit appears in class-level meta-analysis and remains directionally supported by real-world and drug-target evidence.",
    publication: {
      title:
        "Angiotensin-converting enzyme inhibitors reduce mortality in hypertension: a meta-analysis of randomized clinical trials of renin-angiotensin-aldosterone system inhibitors involving 158,998 patients",
      year: 2012,
      journal: "Eur Heart J",
      pmid: "22511654",
    },
    evidence: {
      overall: {
        score: 84,
        label: "Strong conventional cardiovascular evidence",
        note:
          "The trial meta-analysis is cleaner than for ARBs, observational cohorts remain supportive, and antihypertensive drug-target MR keeps the class in the upper tier.",
      },
      meta: {
        score: 84,
        effect_label:
          "ACE inhibitor treatment was associated with lower all-cause mortality in hypertension trials, unlike ARBs.",
        detail: "158,998 participants across 20 morbidity-mortality trials.",
        publication: {
          title:
            "Angiotensin-converting enzyme inhibitors reduce mortality in hypertension: a meta-analysis of randomized clinical trials of renin-angiotensin-aldosterone system inhibitors involving 158,998 patients",
          year: 2012,
          journal: "Eur Heart J",
          pmid: "22511654",
        },
      },
      epidemiology: {
        score: 76,
        effect_label:
          "Propensity-matched heart-failure cohorts in older adults show lower all-cause mortality with renin-angiotensin system inhibitor use.",
        detail: "Swedish Heart Failure Registry cohort aged over 80 years.",
        publication: {
          title:
            "Association between renin-angiotensin system inhibitor use and mortality/morbidity in elderly patients with heart failure with reduced ejection fraction: a prospective propensity score-matched cohort study",
          year: 2018,
          pmid: "30351407",
        },
      },
      mendelian: {
        score: 67,
        effect_label:
          "Antihypertensive drug-target Mendelian evidence supports blood-pressure-mediated prevention of atrial fibrillation and related vascular risk.",
        detail: "The genetic layer is supportive but less direct for lifespan than lipid targets.",
        publication: antihypertensiveMrPublication,
      },
    },
  },
  {
    group: "BETA_BLOCKERS",
    sortIndex: 5,
    label: "Beta-blockers",
    compoundDisplayName: "Beta-blockers",
    condition: "Heart failure with reduced ejection fraction and selected post-MI/AF populations",
    description:
      "Beta-blockers remain high on the list because mortality benefit is still robust in the populations where they are biologically and clinically well matched, especially reduced-EF heart failure.",
    publication: {
      title:
        "Beta-blockers for heart failure with reduced, mid-range, and preserved ejection fraction: an individual patient-level analysis of double-blind randomized trials",
      year: 2018,
      pmid: "29040525",
    },
    evidence: {
      overall: {
        score: 80,
        label: "Strong in the right phenotype",
        note:
          "The mortality signal is concentrated in reduced-EF heart failure and some post-MI settings, with supportive real-world data and indirect drug-target genetics.",
      },
      meta: {
        score: 83,
        effect_label:
          "Individual patient-level meta-analysis supports lower mortality for beta-blockers in heart failure when the phenotype fits the class.",
        detail: "Double-blind trial-level synthesis across heart-failure phenotypes.",
        publication: {
          title:
            "Beta-blockers for heart failure with reduced, mid-range, and preserved ejection fraction: an individual patient-level analysis of double-blind randomized trials",
          year: 2018,
          pmid: "29040525",
        },
      },
      epidemiology: {
        score: 72,
        effect_label:
          "Nationwide atrial-fibrillation cohorts with concomitant heart failure show lower mortality with beta-blocker therapy.",
        detail: "Large registry-based observational cohort.",
        publication: {
          title:
            "β-Blockers in Atrial Fibrillation Patients With or Without Heart Failure: Association With Mortality in a Nationwide Cohort Study",
          year: 2016,
          pmid: "26823497",
        },
      },
      mendelian: {
        score: 63,
        effect_label:
          "ADRB1-centered antihypertensive drug-target Mendelian evidence supports lower atrial-fibrillation and stroke risk.",
        detail: "Indirect genetic support rather than a clean longevity readout.",
        publication: antihypertensiveMrPublication,
      },
    },
  },
  {
    group: "MRA",
    sortIndex: 6,
    label: "Mineralocorticoid receptor antagonists",
    compoundDisplayName: "Mineralocorticoid receptor antagonists",
    condition: "Heart failure with reduced ejection fraction and selected cardiorenal disease",
    description:
      "MRAs rank below beta-blockers mostly because the genetic layer is thinner, not because the heart-failure mortality signal is weak.",
    publication: {
      title: "Mineralocorticoid receptor antagonists in heart failure: an individual patient level meta-analysis",
      year: 2024,
      pmid: "39232490",
    },
    evidence: {
      overall: {
        score: 77,
        label: "Strong HF signal, thinner genetics",
        note:
          "Heart-failure meta-analyses and real-world comparisons are supportive, but the Mendelian layer is less mature than for the higher-ranked cardiometabolic classes.",
      },
      meta: {
        score: 81,
        effect_label:
          "Modern heart-failure meta-analyses support lower all-cause mortality with mineralocorticoid receptor antagonists.",
        detail: "Individual patient-level heart-failure synthesis.",
        publication: {
          title: "Mineralocorticoid receptor antagonists in heart failure: an individual patient level meta-analysis",
          year: 2024,
          pmid: "39232490",
        },
      },
      epidemiology: {
        score: 70,
        effect_label:
          "Propensity-matched real-world comparisons suggest lower all-cause mortality with eplerenone versus spironolactone in HFrEF.",
        detail: "Real-world matched cohort of reduced-EF heart failure.",
        publication: {
          title: "Real world comparison of spironolactone and eplerenone in patients with heart failure",
          year: 2022,
          pmid: "35000806",
        },
      },
      mendelian: {
        score: 55,
        effect_label:
          "Drug-target Mendelian evidence exists inside antihypertensive class analyses, but the MRA-specific signal is still limited.",
        detail: "Genetic support is weaker and less precise than for ACE inhibitors, beta-blockers, or calcium-channel blockers.",
        publication: antihypertensiveMrPublication,
      },
    },
  },
  {
    group: "DOACS",
    sortIndex: 7,
    label: "Direct oral anticoagulants (DOACs)",
    compoundDisplayName: "Direct oral anticoagulants",
    condition: "Atrial fibrillation and other thromboembolic-risk indications",
    description:
      "DOACs stay in the top 10 because indication-specific mortality evidence is large and consistent, but the Mendelian layer is more pathway-level than direct class validation.",
    publication: {
      title:
        "Comparing mortality in patients with atrial fibrillation who are receiving a direct-acting oral anticoagulant or warfarin: a meta-analysis of randomized trials",
      year: 2014,
      pmid: "24986568",
    },
    evidence: {
      overall: {
        score: 74,
        label: "Strong indication-specific benefit",
        note:
          "The randomized and real-world evidence is substantial in atrial fibrillation, but the genetic layer is more indirect because clean drug-target MR for current marketed DOAC classes is limited.",
      },
      meta: {
        score: 75,
        effect_label:
          "Randomized atrial-fibrillation meta-analysis found modest all-cause mortality advantage for DOACs over warfarin.",
        detail: "Meta-analysis of randomized AF trials.",
        publication: {
          title:
            "Comparing mortality in patients with atrial fibrillation who are receiving a direct-acting oral anticoagulant or warfarin: a meta-analysis of randomized trials",
          year: 2014,
          pmid: "24986568",
        },
      },
      epidemiology: {
        score: 71,
        effect_label:
          "Population-based cohorts continue to report lower or slightly lower mortality with DOACs relative to warfarin.",
        detail: "Modern comparative-effectiveness cohorts in routine care.",
        publication: {
          title: "Risk of mortality between warfarin and direct oral anticoagulants: population-based cohort studies",
          year: 2024,
          pmid: "39710653",
        },
      },
      mendelian: {
        score: 52,
        effect_label:
          "The strongest genetic support is pathway-level, with coagulation-factor Mendelian data supporting thromboembolic risk reduction rather than a clean DOAC class proxy.",
        detail: "Factor XI biology is supportive but indirect for current DOAC use.",
        publication: factorXiPublication,
      },
    },
  },
  {
    group: "METFORMIN",
    sortIndex: 8,
    label: "Metformin",
    compoundDisplayName: "Metformin",
    condition: "Type 2 diabetes and cardiometabolic-risk populations",
    description:
      "Metformin drops under the stricter filter because much of the all-cause mortality signal still comes from observational data, but it remains top 10 on breadth and healthy-aging plausibility.",
    publication: {
      title:
        "Metformin reduces all-cause mortality and diseases of ageing independent of its effect on diabetes control: A systematic review and meta-analysis",
      year: 2017,
      pmid: "28802803",
    },
    evidence: {
      overall: {
        score: 70,
        label: "Broad but still confounded signal",
        note:
          "There is a large observational literature and increasingly interesting target genetics, but the hard-mortality case is less clean than for SGLT2 inhibitors or GLP-1 receptor agonists.",
      },
      meta: {
        score: 72,
        effect_label:
          "Systematic reviews suggest lower all-cause mortality for metformin, but much of the evidence is observational and indication-sensitive.",
        detail: "Broad meta-analysis focused on mortality and aging-related disease outcomes.",
        publication: {
          title:
            "Metformin reduces all-cause mortality and diseases of ageing independent of its effect on diabetes control: A systematic review and meta-analysis",
          year: 2017,
          pmid: "28802803",
        },
      },
      epidemiology: {
        score: 74,
        effect_label:
          "High-risk diabetes cohorts consistently associate metformin use with lower all-cause mortality.",
        detail: "Large cardiovascular-risk cohort from SAVOR-TIMI 53.",
        publication: {
          title:
            "Metformin Use and Clinical Outcomes Among Patients With Diabetes Mellitus With or Without Heart Failure or Kidney Dysfunction: Observations From the SAVOR-TIMI 53 Trial",
          year: 2019,
          pmid: "31362530",
        },
      },
      mendelian: {
        score: 45,
        effect_label:
          "Metformin-target Mendelian studies support healthier aging phenotypes, but the target architecture is complex and not yet a clean mortality story.",
        detail: "Healthy-aging MR using metformin target proxies and phenotypic age.",
        publication: {
          title:
            "Effects of putative metformin targets on phenotypic age and leukocyte telomere length: a mendelian randomisation study using data from the UK Biobank",
          year: 2023,
          pmid: "37421961",
        },
      },
    },
  },
  {
    group: "PCSK9",
    sortIndex: 9,
    label: "PCSK9 inhibitors",
    compoundDisplayName: "PCSK9 inhibitors",
    condition: "Very-high-risk atherosclerotic cardiovascular disease and severe LDL elevation",
    description:
      "PCSK9 inhibition ranks below the older lipid classes because the randomized all-cause mortality signal remains weak overall, even though the drug-target genetics are attractive for lifespan and longevity.",
    publication: {
      title: "Effect of PCSK9 Inhibitors on Clinical Outcomes in Patients With Hypercholesterolemia: A Meta-Analysis of 35 Randomized Controlled Trials",
      year: 2018,
      journal: "J Am Heart Assoc",
      pmid: "29223954",
    },
    evidence: {
      overall: {
        score: 66,
        label: "Excellent genetics, softer ACM trials",
        note:
          "The class looks biologically compelling for lifespan and high-risk ASCVD, but the direct randomized all-cause mortality signal is still mostly neutral at the class level.",
      },
      meta: {
        score: 58,
        effect_label:
          "Randomized meta-analyses show strong event reduction but mostly neutral class-wide all-cause mortality.",
        detail: "35 randomized controlled trials in hypercholesterolemia and secondary prevention.",
        publication: {
          title: "Effect of PCSK9 Inhibitors on Clinical Outcomes in Patients With Hypercholesterolemia: A Meta-Analysis of 35 Randomized Controlled Trials",
          year: 2018,
          journal: "J Am Heart Assoc",
          pmid: "29223954",
        },
      },
      epidemiology: {
        score: 62,
        effect_label:
          "Retrospective cohort analyses suggest lower mortality in selected real-world users, but this remains less mature than the statin evidence base.",
        detail: "TriNetX-style retrospective comparative cohort evidence.",
        publication: {
          title: "Association of PCSK9 inhibitors with mortality: insights from a retrospective cohort analysis",
          year: 2024,
          pmid: "39054050",
        },
      },
      mendelian: {
        score: 83,
        effect_label:
          "Drug-target Mendelian studies support a lifespan benefit from lower LDL, with PCSK9 often emerging as one of the cleaner longevity-linked pathways.",
        detail: "Lifespan and longevity Mendelian randomization with target-specific LDL lowering.",
        publication: lipidLifespanPublication,
      },
    },
  },
  {
    group: "CCBS",
    sortIndex: 10,
    label: "Calcium-channel blockers",
    compoundDisplayName: "Calcium-channel blockers",
    condition: "Hypertension, coronary disease, and selected vascular-risk populations",
    description:
      "Calcium-channel blockers only barely stay in the top 10. The meta-analytic mortality signal is modest, but epidemiology and antihypertensive drug-target genetics keep the class above the cut line.",
    publication: {
      title: "Calcium channel blockers and cardiovascular outcomes: a meta-analysis of 175,634 patients",
      year: 2009,
      pmid: "19451836",
    },
    evidence: {
      overall: {
        score: 61,
        label: "Borderline top-10 inclusion",
        note:
          "The randomized mortality effect is small, but the broader stroke-prevention and antihypertensive drug-target story keeps the class in the list.",
      },
      meta: {
        score: 64,
        effect_label:
          "Long-acting calcium-channel blocker meta-analysis showed a small all-cause mortality reduction and a clearer stroke benefit.",
        detail: "175,634 patients across 27 trials.",
        publication: {
          title: "Calcium channel blockers and cardiovascular outcomes: a meta-analysis of 175,634 patients",
          year: 2009,
          pmid: "19451836",
        },
      },
      epidemiology: {
        score: 59,
        effect_label:
          "Large stable-coronary-disease cohorts suggest calcium antagonists are not associated with excess mortality and may be directionally favorable in selected groups.",
        detail: "International cohort in stable coronary artery disease.",
        publication: {
          title: "β-blockers, calcium antagonists, and mortality in stable coronary artery disease: an international cohort study",
          year: 2019,
          pmid: "30590529",
        },
      },
      mendelian: {
        score: 58,
        effect_label:
          "Antihypertensive drug-target Mendelian evidence supports lower atrial-fibrillation and stroke risk for calcium-channel blocker biology.",
        detail: "The genetic layer is more convincing for rhythm and stroke endpoints than for longevity itself.",
        publication: antihypertensiveMrPublication,
      },
    },
  },
];

export const HUMAN_DATASET_MANIFEST = {
  latest_public_cohort_downloaded: HUMAN_COHORT,
  latest_public_release_label: "April 2026",
  cohort_order: [HUMAN_COHORT],
  site_meta: {
    ALL: "Meta + epidemiology + Mendelian",
  },
  cohort_meta_by_name: {
    [HUMAN_COHORT]: {
      label: "Top 10 human medication interventions",
      short_label: "Top 10",
      secondary_label: "Meta + epi + MR",
    },
  },
  group_meta_by_key: Object.fromEntries(
    medications.map((medication) => [
      `${HUMAN_COHORT}::${medication.group}`,
      {
        cohort: HUMAN_COHORT,
        group: medication.group,
        control_group: null,
        is_control: false,
        label: medication.label,
        description: medication.description,
        species: "Human",
        strain: medication.condition,
        compound_display_name: medication.compoundDisplayName,
        condition: medication.condition,
        publication: medication.publication,
        evidence: medication.evidence,
        sort_index: medication.sortIndex,
      },
    ]),
  ),
};

const HUMAN_COHORT = "HUMAN_UKB_PROJECT_1246676";

const ukBiobankLifespanDrugProject = {
  title:
    "Systematic identification of potential lifespan-modulating drugs and long-term health outcomes in the UK Biobank",
  author: "Ristow lab",
  year: 2026,
  journal: "UK Biobank approved research project 1246676",
  url:
    "https://www.ukbiobank.ac.uk/projects/systematic-identification-of-potential-lifespan-modulating-drugs-and-long-term-health-outcomes-in-the-uk-biobank/",
};

const humanStudySources = [
  {
    key: "uk-biobank-lifespan-drug-project-1246676",
    label: "UK Biobank lifespan-modulating drug project",
    summary:
      "Official UK Biobank project page for approved research project 1246676, focused on prescription medications, all-cause mortality, multimorbidity, and candidate geroprotective drugs.",
    finding:
      "The page describes a current project and validation plan, but it does not publish medication-specific ACM hazard ratios or a ranked drug result table.",
    publication: ukBiobankLifespanDrugProject,
  },
];

const projectEvidence = {
  overall: {
    value: "Current",
    value_kind: "text",
    label: "Project status",
    note:
      "Only the UK Biobank project page is included here. Because that page is a project listing rather than a released result table, the human tab does not rank individual medications by ACM effect.",
  },
  biobank: {
    score: 100,
    effect_label:
      "The project plans to screen prescription medications within UK Biobank for associations with reduced all-cause mortality and delayed multimorbidity.",
    detail:
      "The source page lists linked primary-care, hospital, and mortality records as the data basis for high-throughput survival analysis.",
    publication: ukBiobankLifespanDrugProject,
  },
  followup: {
    score: 100,
    effect_label:
      "The project page explicitly names propensity-based approaches and active-comparator designs as planned validation methods.",
    detail:
      "This is a project-source score, not a drug-effect score. Add drug-level rows only after this project releases medication-specific estimates.",
    publication: ukBiobankLifespanDrugProject,
  },
  caution: {
    value: "No ACM HR table",
    value_kind: "text",
    label: "Result availability",
    effect_label:
      "No medication-specific all-cause-mortality effects are displayed because the allowed UK Biobank page does not publish them.",
    detail:
      "Avoid importing additional UK Biobank publications, field documentation, or result tables unless they are explicitly allowed again.",
    publication: ukBiobankLifespanDrugProject,
  },
};

const humanProjectRows = [
  {
    group: "UKB_LIFESPAN_DRUG_PROJECT",
    sortIndex: 1,
    label: "UK Biobank lifespan drug project",
    compoundDisplayName: "UK Biobank drug-screen project",
    condition: "UK Biobank approved research project 1246676",
    description:
      "A UK Biobank approved research project to identify potential lifespan-modulating drugs from prescription-medication records and long-term health outcomes.",
    publication: ukBiobankLifespanDrugProject,
    evidence: projectEvidence,
  },
];

export const HUMAN_DATASET_MANIFEST = {
  latest_public_cohort_downloaded: HUMAN_COHORT,
  latest_public_release_label: "16 March 2026",
  cohort_order: [HUMAN_COHORT],
  site_meta: {
    ALL: "UK Biobank project 1246676",
  },
  source_catalog: humanStudySources,
  cohort_meta_by_name: {
    [HUMAN_COHORT]: {
      label: "UK Biobank project 1246676",
      short_label: "UKB project",
      secondary_label: "Project page only",
    },
  },
  group_meta_by_key: Object.fromEntries(
    humanProjectRows.map((row) => [
      `${HUMAN_COHORT}::${row.group}`,
      {
        cohort: HUMAN_COHORT,
        group: row.group,
        control_group: null,
        is_control: false,
        label: row.label,
        description: row.description,
        species: "Human",
        strain: row.condition,
        compound_display_name: row.compoundDisplayName,
        condition: row.condition,
        publication: row.publication,
        evidence: row.evidence,
        acm_hazard_ratio: null,
        acm_confidence_interval: null,
        acm_effect_percent: null,
        source_catalog: humanStudySources,
        sort_index: row.sortIndex,
      },
    ]),
  ),
};

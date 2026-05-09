import { csvParse } from "d3";
import {
  getInterventionDescription as getMouseInterventionDescription,
  getInterventionLabel as getMouseInterventionLabel,
  normalizeGroupCode,
} from "./interventions";
import { getIntlLocale, isChineseLocale } from "./i18n";
import { getInterventionPathway as getKnownInterventionPathway } from "./pathways";

export const CONTROL_GROUP = "Control";
export const SEX_META = {
  m: { label: "Male", labelZh: "雄性" },
  f: { label: "Female", labelZh: "雌性" },
  all: { label: "Combined", labelZh: "合并" },
};
export const COMPARISON_PALETTE = ["#176087", "#d46a36", "#7f8f29", "#c8952d", "#9b4b3f"];

const DEFAULT_SITE = "ALL";
const ITP_SITE_META = {
  ALL: "All Sites",
  TJL: "TJL",
  UM: "UM",
  UT: "UT",
};

function sortMouseCohortsAscending(left, right) {
  return Number(left.slice(1)) - Number(right.slice(1));
}

function parseInitiationMonths(value) {
  if (!value || value === "NA") {
    return null;
  }
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function getGroupMetaKey(cohort, group) {
  return `${cohort}::${group}`;
}

function compareDatasetCohortsAscending(dataset, left, right) {
  const leftIndex = dataset?.cohortSortIndex?.[left] ?? Number.POSITIVE_INFINITY;
  const rightIndex = dataset?.cohortSortIndex?.[right] ?? Number.POSITIVE_INFINITY;

  if (leftIndex !== rightIndex) {
    return leftIndex - rightIndex;
  }

  return left.localeCompare(right);
}

function compareDatasetCohortsDescending(dataset, left, right) {
  return compareDatasetCohortsAscending(dataset, right, left);
}

function buildParsedDataset({
  rows,
  manifest,
  profile,
  siteMeta,
  latestPublicCohort,
  latestPublicReleaseLabel,
  cohortOrder,
  cohortMetaByName,
  groupMetaByKey,
}) {
  const orderedCohorts = Array.from(
    new Set((cohortOrder?.length ? cohortOrder : rows.map((row) => row.cohort)).filter(Boolean)),
  );
  const cohortSortIndex = Object.fromEntries(
    orderedCohorts.map((cohort, index) => [cohort, index]),
  );
  const siteLabels = {
    [DEFAULT_SITE]: profile.siteAllLabel,
    ...siteMeta,
  };
  const sites = Array.from(
    new Set(rows.map((row) => row.site).filter((site) => site && site !== DEFAULT_SITE)),
  ).sort((left, right) => (siteLabels[left] || left).localeCompare(siteLabels[right] || right));

  const groupsByCohort = {};
  const compareOptions = [];
  const cohortOverview = [];

  orderedCohorts.forEach((cohort) => {
    const cohortRows = rows.filter((row) => row.cohort === cohort);
    const cohortMeta = cohortMetaByName[cohort] || {};
    const interventionGroups = Object.values(groupMetaByKey)
      .filter((meta) => meta.cohort === cohort && !meta.isControl)
      .sort((left, right) => {
        const leftIndex = left.sortIndex ?? Number.POSITIVE_INFINITY;
        const rightIndex = right.sortIndex ?? Number.POSITIVE_INFINITY;
        if (leftIndex !== rightIndex) {
          return leftIndex - rightIndex;
        }

        return left.label.localeCompare(right.label);
      });

    groupsByCohort[cohort] = interventionGroups.map((meta) => meta.group);
    compareOptions.push(
      ...interventionGroups.map((meta) => ({
        key: getInterventionKey(cohort, meta.group),
        cohort,
        group: meta.group,
        label: meta.label,
        sortIndex: meta.sortIndex ?? null,
        searchText: [
          cohort,
          cohortMeta.label,
          cohortMeta.shortLabel,
          cohortMeta.secondaryLabel,
          meta.label,
          meta.description,
          meta.species,
          meta.strain,
          meta.compoundDisplayName,
          meta.condition,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase(),
      })),
    );
    cohortOverview.push({
      cohort,
      label: cohortMeta.label || cohort,
      shortLabel: cohortMeta.shortLabel || cohort,
      secondaryLabel: cohortMeta.secondaryLabel || null,
      sampleCount: cohortRows.length,
      interventionCount: interventionGroups.length,
      latest: cohort === latestPublicCohort,
    });
  });

  compareOptions.sort((left, right) => {
    if (left.cohort === right.cohort) {
      const leftIndex = left.sortIndex ?? Number.POSITIVE_INFINITY;
      const rightIndex = right.sortIndex ?? Number.POSITIVE_INFINITY;
      if (leftIndex !== rightIndex) {
        return leftIndex - rightIndex;
      }

      return left.label.localeCompare(right.label);
    }
    return compareDatasetCohortsDescending({ cohortSortIndex }, left.cohort, right.cohort);
  });

  return {
    rows,
    sites,
    siteMeta: siteLabels,
    siteOptions: [DEFAULT_SITE, ...sites],
    cohorts: orderedCohorts,
    cohortSortIndex,
    cohortMetaByName,
    groupMetaByKey,
    groupsByCohort,
    compareOptions,
    cohortOverview,
    overview: {
      cohortCount: orderedCohorts.length,
      interventionCount: compareOptions.length,
      sampleCount: rows.length,
      siteCount: sites.length,
      latestPublicCohort,
      latestPublicReleaseLabel:
        latestPublicReleaseLabel || latestPublicCohort || orderedCohorts[orderedCohorts.length - 1],
      releaseTag: `${profile.badgePrefix} · public data through ${
        latestPublicReleaseLabel || latestPublicCohort || orderedCohorts[orderedCohorts.length - 1]
      }`,
    },
    manifest,
    profile,
    defaultSite: DEFAULT_SITE,
  };
}

export function formatInteger(value, locale = "en-US") {
  if (value == null || Number.isNaN(value)) {
    return "—";
  }

  return new Intl.NumberFormat(getIntlLocale(locale)).format(Math.round(value));
}

export function formatSignedDays(value, locale = "en-US") {
  if (value == null || Number.isNaN(value)) {
    return "—";
  }
  const formattedValue = new Intl.NumberFormat(getIntlLocale(locale)).format(
    Math.round(Math.abs(value)),
  );

  return `${value > 0 ? "+" : value < 0 ? "-" : ""}${formattedValue} ${
    isChineseLocale(locale) ? "天" : "d"
  }`;
}

export function formatSignedPercent(value, locale = "en-US") {
  if (value == null || Number.isNaN(value)) {
    return "—";
  }
  const formattedValue = new Intl.NumberFormat(getIntlLocale(locale), {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(Math.abs(value));

  return `${value > 0 ? "+" : value < 0 ? "-" : ""}${formattedValue}%`;
}

export function formatMonths(value, locale = "en-US") {
  if (value == null || Number.isNaN(value)) {
    return "—";
  }
  const formattedValue = new Intl.NumberFormat(getIntlLocale(locale), {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);

  return `${formattedValue} ${isChineseLocale(locale) ? "个月" : "mo"}`;
}

export function getInterventionKey(cohort, group) {
  return `${cohort}::${group}`;
}

export function parseInterventionKey(key) {
  const [cohort, ...groupParts] = key.split("::");
  return { cohort, group: groupParts.join("::") };
}

export function getGroupMeta(dataset, cohort, group) {
  return dataset?.groupMetaByKey?.[getGroupMetaKey(cohort, group)] || null;
}

export function getCohortMeta(dataset, cohort) {
  const meta = dataset?.cohortMetaByName?.[cohort];
  if (meta) {
    return meta;
  }
  return {
    label: cohort,
    shortLabel: cohort,
    secondaryLabel: null,
    publication: null,
  };
}

export function getCohortLabel(dataset, cohort) {
  return getCohortMeta(dataset, cohort).label || cohort;
}

export function getCohortShortLabel(dataset, cohort) {
  const cohortMeta = getCohortMeta(dataset, cohort);
  return cohortMeta.shortLabel || cohortMeta.label || cohort;
}

export function getInterventionLabel(dataset, cohort, group) {
  return getGroupMeta(dataset, cohort, group)?.label || group;
}

export function getInterventionDescription(dataset, cohort, group) {
  return getGroupMeta(dataset, cohort, group)?.description || null;
}

export function getInterventionEvidence(dataset, cohort, group) {
  return getGroupMeta(dataset, cohort, group)?.evidence || null;
}

function buildPubMedUrl(pmid) {
  if (!pmid) {
    return null;
  }

  return `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
}

export function getInterventionPubMedReference(dataset, cohort, group) {
  const meta = getGroupMeta(dataset, cohort, group);
  if (!meta || meta.isControl) {
    return null;
  }

  const cohortMeta = getCohortMeta(dataset, cohort);
  const publication = meta.publication || cohortMeta.publication || null;
  if (!publication) {
    return null;
  }

  return {
    label: publication.pmid ? "PubMed" : null,
    url: buildPubMedUrl(publication.pmid),
    citation: publication.title || null,
    detail: [
      publication.author,
      publication.year,
      publication.journal,
      publication.pmid ? `PMID ${publication.pmid}` : null,
      publication.doi ? `DOI ${publication.doi}` : null,
      publication.kindLabel ||
        (publication.kind === "secondary" ? "Secondary analysis" : null),
      publication.note || null,
    ]
      .filter(Boolean)
      .join(" · "),
    title: publication.title || null,
    pmid: publication.pmid || null,
  };
}

export function getInterventionPathway(dataset, cohort, group) {
  const meta = getGroupMeta(dataset, cohort, group);
  if (!meta && !group) {
    return null;
  }

  return getKnownInterventionPathway(
    meta?.pathwayCompoundDisplayName || meta?.compoundDisplayName || meta?.label || group,
    meta?.pathwayDescription || meta?.description || null,
  );
}

export function getDefaultGroupForCohort(dataset, groups) {
  if (!groups?.length) {
    return "";
  }
  if (dataset?.profile?.defaultGroup && groups.includes(dataset.profile.defaultGroup)) {
    return dataset.profile.defaultGroup;
  }
  if (dataset?.profile?.id === "itp" && groups.includes("AKG_18")) {
    return "AKG_18";
  }
  return groups[0];
}

export function parseItpDataset(csvText, manifest) {
  const rows = csvParse(csvText, (row) => {
    const ageDays = Number(row["age(days)"]);
    if (!Number.isFinite(ageDays)) {
      return null;
    }

    return {
      cohort: row.cohort,
      site: row.site,
      sex: row.sex,
      id: row.id,
      group: normalizeGroupCode(row.group),
      controlGroup: CONTROL_GROUP,
      ageDays,
      dead: String(row.dead).toLowerCase() === "true",
      status: row.status,
      ageInitiationMonths: parseInitiationMonths(row["age_initiation(mo)"]),
      species: "Mouse",
    };
  }).filter(Boolean);

  const groupMetaByKey = {};
  const publicationByGroupKey = manifest?.publication_by_group_key || {};
  rows.forEach((row) => {
    const metaKey = getGroupMetaKey(row.cohort, row.group);
    if (groupMetaByKey[metaKey]) {
      return;
    }

    const isControl = row.group === CONTROL_GROUP;
    groupMetaByKey[metaKey] = {
      cohort: row.cohort,
      group: row.group,
      controlGroup: CONTROL_GROUP,
      isControl,
      label: isControl
        ? "Control"
        : getMouseInterventionLabel(row.cohort, row.group),
      description: isControl
        ? "Untreated matched control group."
        : getMouseInterventionDescription(row.group),
      species: "Mouse",
      strain: null,
      compoundDisplayName: isControl
        ? "Control"
        : getMouseInterventionLabel(row.cohort, row.group),
      condition: null,
      publication: publicationByGroupKey[metaKey] || null,
    };
  });

  const cohorts = Array.from(new Set(rows.map((row) => row.cohort))).sort(
    sortMouseCohortsAscending,
  );
  const cohortMetaByName = Object.fromEntries(
    cohorts.map((cohort) => [
      cohort,
      {
        label: cohort,
        shortLabel: cohort,
        secondaryLabel: null,
      },
    ]),
  );
  const latestPublicCohort =
    manifest?.latest_public_cohort_downloaded || cohorts[cohorts.length - 1];

  return buildParsedDataset({
    rows,
    manifest,
    profile: {
      id: "itp",
      title: "Interventions Testing Program",
      description:
        "Public mouse lifespan data from the NIA's Interventions Testing Program. Compare treatments side by side and see which ones helped mice live longer.",
      badgePrefix: "gold-standard aging reference",
      sampleStatLabel: "Mice",
      interventionStatLabel: "Intv.",
      cohortStatLabel: "Cohorts",
      focusScopeLabel: "cohort",
      focusScopePlural: "cohorts",
      focusSectionLabel: "Focus cohort",
      explorerSectionLabel: "Explorer",
      siteLabel: "Site",
      siteAllLabel: "All Sites",
      sampleNounPlural: "mice",
      sampleMetricLabel: "Mice",
      groupNounSingular: "treatment",
      groupNounPlural: "treatments",
      focusGroupLabel: "Focus treatment",
      compareSectionLabel: "Compare treatments",
      sexSupported: true,
      combinedPopulationLabel: "Combined-sex mice",
      manifestFileName: "itp_dataset_manifest.json",
      loadingLabel: "Loading the public ITP dataset…",
      footerText:
        "Source files were downloaded from MPD and normalized against the public lifespancharts cohort CSVs.",
      comparisonSearchPlaceholder: "Search cohort or compound",
      comparisonHelperText: "Search cohort or compound. Four overlays max.",
      explorerBody:
        "Choose a row from the leaderboard above or use the controls here to inspect a treatment against its cohort-matched control. Year and site are set in the top scope panel.",
      focusSectionBody:
        "The reference site overlays raw step curves. This version keeps the same public cohort records but adds proper censor handling, a richer opening state, and a more navigable treatment comparison flow.",
    },
    siteMeta: ITP_SITE_META,
    latestPublicCohort,
    latestPublicReleaseLabel: latestPublicCohort,
    cohortOrder: cohorts,
    cohortMetaByName,
    groupMetaByKey,
  });
}

export function parseCitpDataset(csvText, manifest) {
  const rows = csvParse(csvText, (row) => {
    const ageDays = Number(row.age_days);
    if (!Number.isFinite(ageDays)) {
      return null;
    }

    return {
      cohort: row.cohort,
      site: row.site,
      sex: row.sex || "all",
      id: row.id,
      group: row.group,
      controlGroup: row.control_group || row.group,
      ageDays,
      dead: String(row.dead).toLowerCase() === "true",
      status: row.status,
      ageInitiationMonths: null,
      species: row.species || null,
      strain: row.strain || null,
    };
  }).filter(Boolean);

  const groupMetaByKey = Object.fromEntries(
    Object.entries(manifest?.group_meta_by_key || {}).map(([key, meta]) => [
      key,
      {
        cohort: meta.cohort,
        group: meta.group,
        controlGroup: meta.control_group,
        isControl: Boolean(meta.is_control),
        label: meta.label,
        description: meta.description || null,
        species: meta.species || null,
        strain: meta.strain || null,
        compoundDisplayName: meta.compound_display_name || null,
        condition: meta.condition || null,
        publication: meta.publication || null,
      },
    ]),
  );
  const cohortMetaByName = Object.fromEntries(
    Object.entries(manifest?.cohort_meta_by_name || {}).map(([cohort, meta]) => [
      cohort,
      {
        label: meta.label || cohort,
        shortLabel: meta.short_label || meta.label || cohort,
        secondaryLabel: meta.secondary_label || null,
        publication: meta.publication || null,
      },
    ]),
  );
  const latestPublicCohort =
    manifest?.latest_public_cohort_downloaded ||
    manifest?.cohort_order?.[manifest.cohort_order.length - 1];
  const latestPublicReleaseLabel = String(
    manifest?.latest_public_release_year || latestPublicCohort || "",
  );

  return buildParsedDataset({
    rows,
    manifest,
    profile: {
      id: "citp",
      title: "Comparative Interventions Testing Program",
      description:
        "Public worm lifespan data from CITP. Compare compounds across worm species, strains, and lab conditions.",
      badgePrefix: "multi-species longevity portal",
      sampleStatLabel: "Animals",
      interventionStatLabel: "Tests",
      cohortStatLabel: "Studies",
      focusScopeLabel: "study",
      focusScopePlural: "studies",
      focusSectionLabel: "Focus study",
      explorerSectionLabel: "Explorer",
      siteLabel: "Lab",
      siteAllLabel: "All Labs",
      sampleNounPlural: "animals",
      sampleMetricLabel: "Animals",
      groupNounSingular: "intervention",
      groupNounPlural: "interventions",
      focusGroupLabel: "Focus intervention",
      compareSectionLabel: "Compare interventions",
      sexSupported: false,
      combinedPopulationLabel: "Combined populations",
      manifestFileName: "citp_dataset_manifest.json",
      loadingLabel: "Loading the public CITP dataset…",
      footerText:
        "Source files were downloaded from the CITP Data Portal and normalized into matched treatment-control strata across dataset, strain, condition, and lab.",
      comparisonSearchPlaceholder: "Search study, strain, or compound",
      comparisonHelperText: "Search study, strain, or compound. Four overlays max.",
      explorerBody:
        "Choose a row from the leaderboard above or use the controls here to inspect an intervention against its matched control. Study and lab are set in the top scope panel.",
      focusSectionBody:
        "Matched control overlays stay within each study, strain, condition, and lab slice so the non-mouse comparisons stay internally consistent.",
    },
    siteMeta: manifest?.site_meta || { [DEFAULT_SITE]: "All Labs" },
    latestPublicCohort,
    latestPublicReleaseLabel,
    cohortOrder: manifest?.cohort_order || [],
    cohortMetaByName,
    groupMetaByKey,
  });
}

export function parseHumanDataset(_csvText, manifest) {
  const humanMetaEntries = Object.entries(manifest?.group_meta_by_key || {});
  const shouldEnforceAcmScreenFilter = humanMetaEntries.some(([, meta]) => {
    const sourceTable = meta.acm_source_table || meta.raw_result?.source_table;
    return sourceTable === "Data Table 2";
  });
  const filteredHumanMetaEntries = shouldEnforceAcmScreenFilter
    ? humanMetaEntries.filter(([, meta]) => {
      const sourceTable = meta.acm_source_table || meta.raw_result?.source_table;
      const sourceKind = meta.acm_source_kind || meta.raw_result?.source_kind;
      const prescriptionUserCount =
        meta.acm_prescription_user_count ?? meta.raw_result?.n ?? null;
      const hazardRatio = meta.acm_hazard_ratio ?? meta.raw_result?.hr ?? null;
      const n = Number(prescriptionUserCount);
      const hr = Number(hazardRatio);

      return (
        (
          sourceTable === "Data Table 2" &&
          sourceKind === "drug" &&
          Number.isFinite(n) &&
          n >= 500 &&
          Number.isFinite(hr)
        ) ||
        (
          sourceTable === "Data Table 4" &&
          sourceKind === "class" &&
          Number.isFinite(n) &&
          Number.isFinite(hr)
        )
      );
    })
    : humanMetaEntries;
  const groupMetaByKey = Object.fromEntries(
    filteredHumanMetaEntries.map(([key, meta]) => [
      key,
      {
        cohort: meta.cohort,
        group: meta.group,
        controlGroup: meta.control_group || null,
        isControl: Boolean(meta.is_control),
        label: meta.label,
        description: meta.description || null,
        species: meta.species || "Human",
        strain: meta.strain || meta.condition || null,
        compoundDisplayName: meta.compound_display_name || meta.label || meta.group,
        condition: meta.condition || null,
        publication: meta.publication || null,
        evidence: meta.evidence || null,
        acmHazardRatio: meta.acm_hazard_ratio ?? null,
        acmConfidenceInterval: meta.acm_confidence_interval || null,
        acmEffectPercent: meta.acm_effect_percent ?? null,
        acmPValue: meta.acm_p_value ?? meta.raw_result?.p ?? null,
        acmAdjustedPValue: meta.acm_adjusted_p_value ?? meta.raw_result?.fdr_or_padj ?? null,
        acmPrescriptionUserCount: meta.acm_prescription_user_count ?? meta.raw_result?.n ?? null,
        acmSourceKind: meta.acm_source_kind || meta.raw_result?.source_kind || null,
        acmSourceTable: meta.acm_source_table || meta.raw_result?.source_table || null,
        acmFdrSignificant:
          meta.acm_fdr_significant ?? meta.raw_result?.fdr_significant ?? false,
        acmStatisticallySignificant:
          meta.acm_statistically_significant ??
          meta.raw_result?.statistically_significant ??
          meta.acm_fdr_significant ??
          meta.raw_result?.fdr_significant ??
          false,
        acmDatasetLabel: meta.acm_dataset_label || meta.raw_result?.dataset_label || null,
        acmDatasetUrl: meta.acm_dataset_url || meta.raw_result?.dataset_url || null,
        acmDatasetDetail: meta.acm_dataset_detail || null,
        ukbMetadata: meta.ukb_metadata || manifest?.ukb_metadata || null,
        sourceCatalog: Array.isArray(meta.source_catalog)
          ? meta.source_catalog
          : manifest?.source_catalog || [],
        sortIndex: meta.sort_index ?? null,
      },
    ]),
  );
  const cohortMetaByName = Object.fromEntries(
    Object.entries(manifest?.cohort_meta_by_name || {}).map(([cohort, meta]) => [
      cohort,
      {
        label: meta.label || cohort,
        shortLabel: meta.short_label || meta.label || cohort,
        secondaryLabel: meta.secondary_label || null,
        publication: meta.publication || null,
      },
    ]),
  );
  const rows = Object.values(groupMetaByKey)
    .filter((meta) => !meta.isControl)
    .map((meta, index) => ({
      cohort: meta.cohort,
      site: DEFAULT_SITE,
      sex: "all",
      id: `human-evidence-${index + 1}`,
      group: meta.group,
      controlGroup: null,
      ageDays: index + 1,
      dead: true,
      status: "evidence",
      ageInitiationMonths: null,
      species: "Human",
      strain: meta.condition || null,
    }));
  const latestPublicCohort =
    manifest?.latest_public_cohort_downloaded ||
    manifest?.cohort_order?.[manifest.cohort_order.length - 1];
  const latestPublicReleaseLabel =
    manifest?.latest_public_release_label || latestPublicCohort;
  const defaultProfile = {
    id: "human",
    title: "Human UK Biobank ACM Interventions",
    description:
      "A Biobank-only human view of medication signals linked to all-cause mortality, centered on public UK Biobank prescription and mortality resources.",
    badgePrefix: "human Biobank evidence",
    sampleStatLabel: "Sources",
    interventionStatLabel: "Signals",
    cohortStatLabel: "Studies",
    focusScopeLabel: "study",
    focusScopePlural: "studies",
    focusSectionLabel: "Evidence explorer",
    explorerSectionLabel: "Biobank signal explorer",
    siteLabel: "Evidence",
    siteAllLabel: "UK Biobank public supplement",
    sampleNounPlural: "evidence sources",
    sampleMetricLabel: "Evidence sources",
    groupNounSingular: "ACM signal",
    groupNounPlural: "ACM signals",
    focusGroupLabel: "Focus signal",
    compareSectionLabel: "Compare Biobank signals",
    sexSupported: false,
    combinedPopulationLabel: "Human evidence",
    manifestFileName: "human_acm_dataset_manifest.json",
    loadingLabel: "Loading human UK Biobank ACM signals…",
    footerText:
      "This human view uses the public Aging Cell 2024 UK Biobank supplement plus public UK Biobank project and Showcase metadata. It does not ship participant-level UK Biobank records.",
    comparisonSearchPlaceholder: "Search signal, drug, class, or population",
    comparisonHelperText: "Search human Biobank ACM signals.",
    explorerBody:
      "Choose a UK Biobank medication or class signal to inspect the ACM estimate, source table, drug description, and caution notes.",
    focusSectionBody:
      "Human rows summarize reported all-cause mortality hazard-ratio associations from a retrospective UK Biobank screen rather than survival curves from an intervention trial.",
    singlePanelNotice:
      "Human Biobank evidence is summarized as ACM hazard-ratio signals rather than individual survival curves.",
    defaultRankingMetric: "acm",
    allowCompare: false,
    cohortSampleSuffix: "sources",
    cohortInterventionSuffix: "signals",
    footerLeadLabel: "Latest human Biobank supplement processed",
    defaultGroup:
      manifest?.default_group ||
      manifest?.profile?.defaultGroup ||
      Object.values(groupMetaByKey).find((meta) => !meta.isControl)?.group ||
      null,
  };
  const parsed = buildParsedDataset({
    rows,
    manifest,
    profile: {
      ...defaultProfile,
      ...(manifest?.profile || {}),
      id: "human",
      defaultGroup:
        manifest?.profile?.defaultGroup ||
        manifest?.default_group ||
        defaultProfile.defaultGroup,
    },
    siteMeta: manifest?.site_meta || { [DEFAULT_SITE]: "UK Biobank project page" },
    latestPublicCohort,
    latestPublicReleaseLabel,
    cohortOrder: manifest?.cohort_order || [],
    cohortMetaByName,
    groupMetaByKey,
  });
  const cohortSourceCount = new Set(
    Object.values(groupMetaByKey)
      .flatMap((meta) => (Array.isArray(meta.sourceCatalog) ? meta.sourceCatalog : []))
      .map((source) => source.key || source.publication?.pmid || source.publication?.title)
      .filter(Boolean),
  ).size;
  const evidenceSourceCount = cohortSourceCount;

  return {
    ...parsed,
    cohortOverview: parsed.cohortOverview.map((entry) => ({
      ...entry,
      sampleCount: evidenceSourceCount,
    })),
    overview: {
      ...parsed.overview,
      sampleCount: evidenceSourceCount,
      releaseTag: `human Biobank evidence · curated through ${latestPublicReleaseLabel}`,
    },
  };
}

export function parseKillifishDataset(csvText, manifest) {
  const rows = csvParse(csvText, (row) => {
    const ageDays = Number(row.age_days);
    if (!Number.isFinite(ageDays)) {
      return null;
    }

    return {
      cohort: row.cohort,
      site: row.site || DEFAULT_SITE,
      sex: row.sex || "all",
      id: row.id,
      group: row.group,
      controlGroup: row.control_group || CONTROL_GROUP,
      ageDays,
      dead: String(row.dead).toLowerCase() === "true",
      status: row.status,
      ageInitiationMonths: parseInitiationMonths(row.age_initiation_months),
      species: row.species || null,
      strain: row.strain || null,
    };
  }).filter(Boolean);

  const groupMetaByKey = Object.fromEntries(
    Object.entries(manifest?.group_meta_by_key || {}).map(([key, meta]) => [
      key,
      {
        cohort: meta.cohort,
        group: meta.group,
        controlGroup: meta.control_group,
        isControl: Boolean(meta.is_control),
        label: meta.label,
        description: meta.description || null,
        species: meta.species || null,
        strain: meta.strain || null,
        compoundDisplayName: meta.compound_display_name || null,
        condition: meta.condition || null,
        publication: meta.publication || null,
      },
    ]),
  );
  const cohortMetaByName = Object.fromEntries(
    Object.entries(manifest?.cohort_meta_by_name || {}).map(([cohort, meta]) => [
      cohort,
      {
        label: meta.label || cohort,
        shortLabel: meta.short_label || meta.label || cohort,
        secondaryLabel: meta.secondary_label || null,
        publication: meta.publication || null,
      },
    ]),
  );
  const latestPublicCohort =
    manifest?.latest_public_cohort_downloaded ||
    manifest?.cohort_order?.[manifest.cohort_order.length - 1];
  const latestPublicReleaseLabel = String(
    manifest?.latest_public_release_label || latestPublicCohort || "",
  );

  return buildParsedDataset({
    rows,
    manifest,
    profile: {
      id: "killifish",
      title: "African turquoise killifish",
      description:
        "Public killifish lifespan data from a dietary restriction study. Compare restricted feeding with standard feeding across two cohorts.",
      badgePrefix: "vertebrate diet intervention study",
      sampleStatLabel: "Fish",
      interventionStatLabel: "Intv.",
      cohortStatLabel: "Cohorts",
      focusScopeLabel: "cohort",
      focusScopePlural: "cohorts",
      focusSectionLabel: "Focus cohort",
      explorerSectionLabel: "Explorer",
      siteLabel: "Source",
      siteAllLabel: "eLife public data",
      sampleNounPlural: "fish",
      sampleMetricLabel: "Fish",
      groupNounSingular: "intervention",
      groupNounPlural: "interventions",
      focusGroupLabel: "Focus intervention",
      compareSectionLabel: "Compare interventions",
      sexSupported: true,
      combinedPopulationLabel: "Combined-sex fish",
      manifestFileName: "killifish_dataset_manifest.json",
      loadingLabel: "Loading the public killifish dataset…",
      footerText:
        "Source files were downloaded from the eLife Figure 4 source-data CSVs and normalized into dietary restriction versus ad libitum cohort comparisons.",
      comparisonSearchPlaceholder: "Search cohort or intervention",
      comparisonHelperText: "Search cohort or intervention. Four overlays max.",
      explorerBody:
        "Choose a row from the leaderboard above or use the controls here to inspect dietary restriction against its cohort-matched ad libitum control. Cohort is set in the top scope panel.",
      focusSectionBody:
        "Each panel overlays raw Kaplan-Meier curves for dietary restriction and the ad libitum control within the same GRZ cohort.",
    },
    siteMeta: manifest?.site_meta || { [DEFAULT_SITE]: "eLife public data" },
    latestPublicCohort,
    latestPublicReleaseLabel,
    cohortOrder: manifest?.cohort_order || [],
    cohortMetaByName,
    groupMetaByKey,
  });
}

export function parseDrosophilaDataset(csvText, manifest) {
  const rows = csvParse(csvText, (row) => {
    const ageDays = Number(row.age_days);
    if (!Number.isFinite(ageDays)) {
      return null;
    }

    return {
      cohort: row.cohort,
      site: row.site || DEFAULT_SITE,
      sex: row.sex || "all",
      id: row.id,
      group: row.group,
      controlGroup: row.control_group || CONTROL_GROUP,
      ageDays,
      dead: String(row.dead).toLowerCase() === "true",
      status: row.status,
      ageInitiationMonths: parseInitiationMonths(row.age_initiation_months),
      species: row.species || null,
      strain: row.strain || null,
    };
  }).filter(Boolean);

  const groupMetaByKey = Object.fromEntries(
    Object.entries(manifest?.group_meta_by_key || {}).map(([key, meta]) => [
      key,
      {
        cohort: meta.cohort,
        group: meta.group,
        controlGroup: meta.control_group,
        isControl: Boolean(meta.is_control),
        label: meta.label,
        description: meta.description || null,
        species: meta.species || null,
        strain: meta.strain || null,
        compoundDisplayName: meta.compound_display_name || null,
        condition: meta.condition || null,
        publication: meta.publication || null,
      },
    ]),
  );
  const cohortMetaByName = Object.fromEntries(
    Object.entries(manifest?.cohort_meta_by_name || {}).map(([cohort, meta]) => [
      cohort,
      {
        label: meta.label || cohort,
        shortLabel: meta.short_label || meta.label || cohort,
        secondaryLabel: meta.secondary_label || null,
        publication: meta.publication || null,
      },
    ]),
  );
  const latestPublicCohort =
    manifest?.latest_public_cohort_downloaded ||
    manifest?.cohort_order?.[manifest.cohort_order.length - 1];
  const latestPublicReleaseLabel = String(
    manifest?.latest_public_release_label || latestPublicCohort || "",
  );

  return buildParsedDataset({
    rows,
    manifest,
    profile: {
      id: "drosophila",
      title: "Fruit fly",
      description:
        "Public fruit-fly lifespan data from dietary restriction experiments. Compare restricted feeding with standard feeding across fly experiments.",
      badgePrefix: "public fly diet study",
      sampleStatLabel: "Flies",
      interventionStatLabel: "Intv.",
      cohortStatLabel: "Experiments",
      focusScopeLabel: "experiment",
      focusScopePlural: "experiments",
      focusSectionLabel: "Focus experiment",
      explorerSectionLabel: "Explorer",
      siteLabel: "Source",
      siteAllLabel: "Nature source data",
      sampleNounPlural: "flies",
      sampleMetricLabel: "Flies",
      groupNounSingular: "intervention",
      groupNounPlural: "interventions",
      focusGroupLabel: "Focus intervention",
      compareSectionLabel: "Compare interventions",
      sexSupported: false,
      combinedPopulationLabel: "Female flies",
      manifestFileName: "drosophila_dataset_manifest.json",
      loadingLabel: "Loading the public fruit-fly dataset…",
      footerText:
        "Source files were downloaded from the Nature source-data workbook and expanded from per-replicate death counts into one row per fly.",
      comparisonSearchPlaceholder: "Search genotype or experiment",
      comparisonHelperText: "Search genotype or experiment. Four overlays max.",
      explorerBody:
        "Choose a row from the leaderboard above or use the controls here to inspect dietary restriction against its matched ad libitum control within the same fly experiment.",
      focusSectionBody:
        "These curves are reconstructed from workbook death-count tables, expanded into per-fly event rows so they can be compared like the mouse and worm datasets.",
      singlePanelNotice:
        "This fruit-fly source dataset is female-only, so the view stays on a single panel.",
    },
    siteMeta: manifest?.site_meta || { [DEFAULT_SITE]: "Nature source data" },
    latestPublicCohort,
    latestPublicReleaseLabel,
    cohortOrder: manifest?.cohort_order || [],
    cohortMetaByName,
    groupMetaByKey,
  });
}

export function filterDatasetBySpecies(dataset, species) {
  if (!species || dataset?.profile?.id !== "citp") {
    return dataset;
  }

  const filteredRows = dataset.rows.filter((row) => row.species === species);
  const cohortSet = new Set(filteredRows.map((row) => row.cohort));
  const filteredCohortOrder = dataset.cohorts.filter((cohort) => cohortSet.has(cohort));
  const filteredGroupMetaByKey = Object.fromEntries(
    Object.entries(dataset.groupMetaByKey).filter(
      ([, meta]) => meta.species === species && cohortSet.has(meta.cohort),
    ),
  );
  const filteredCohortMetaByName = Object.fromEntries(
    filteredCohortOrder.map((cohort) => [
      cohort,
      dataset.cohortMetaByName[cohort],
    ]),
  );
  const latestPublicCohort =
    filteredCohortOrder[filteredCohortOrder.length - 1] ||
    dataset.overview.latestPublicCohort;
  const latestPublicReleaseLabel =
    filteredCohortMetaByName[latestPublicCohort]?.secondaryLabel ||
    latestPublicCohort;

  return buildParsedDataset({
    rows: filteredRows,
    manifest: dataset.manifest,
    profile: {
      ...dataset.profile,
      badgePrefix: species,
      description: `Public worm lifespan data for ${species} from CITP. Compare compounds across strains and lab conditions.`,
      activeAnimalLabel: species,
      explorerBody:
        `Choose a row from the leaderboard above or use the controls here to inspect a ${species} intervention against its matched control. Study and lab are set in the top scope panel.`,
      focusSectionBody:
        `Matched control overlays stay within each ${species} study, strain, condition, and lab slice so these comparisons stay internally consistent.`,
      reverseCohortPresentation: true,
    },
    siteMeta: dataset.siteMeta,
    latestPublicCohort,
    latestPublicReleaseLabel,
    cohortOrder: filteredCohortOrder,
    cohortMetaByName: filteredCohortMetaByName,
    groupMetaByKey: filteredGroupMetaByKey,
  });
}

export const parseDataset = parseItpDataset;

function matchesSex(rowSex, sex) {
  return sex === "all" || rowSex === sex;
}

function complementaryErrorFunction(value) {
  const magnitude = Math.abs(value);
  const t = 1 / (1 + magnitude / 2);
  const approximation =
    t *
    Math.exp(
      -magnitude * magnitude -
        1.26551223 +
        t *
          (1.00002368 +
            t *
              (0.37409196 +
                t *
                  (0.09678418 +
                    t *
                      (-0.18628806 +
                        t *
                          (0.27886807 +
                            t *
                              (-1.13520398 +
                                t *
                                  (1.48851587 +
                                    t * (-0.82215223 + t * 0.17087277)))))))),
    );

  return value >= 0 ? approximation : 2 - approximation;
}

function computeLogRankStats(controlRows, treatmentRows) {
  const countsByDay = new Map();

  function addRows(rows, prefix) {
    rows.forEach((row) => {
      const dayCounts = countsByDay.get(row.ageDays) || {
        controlDeaths: 0,
        controlCensored: 0,
        treatmentDeaths: 0,
        treatmentCensored: 0,
      };

      if (row.dead) {
        dayCounts[`${prefix}Deaths`] += 1;
      } else {
        dayCounts[`${prefix}Censored`] += 1;
      }

      countsByDay.set(row.ageDays, dayCounts);
    });
  }

  addRows(controlRows, "control");
  addRows(treatmentRows, "treatment");

  const orderedDays = [...countsByDay.keys()].sort((left, right) => left - right);

  let atRiskControl = controlRows.length;
  let atRiskTreatment = treatmentRows.length;
  let observedMinusExpected = 0;
  let variance = 0;

  orderedDays.forEach((day) => {
    const counts = countsByDay.get(day);
    const controlDeaths = counts.controlDeaths;
    const treatmentDeaths = counts.treatmentDeaths;
    const totalDeaths = controlDeaths + treatmentDeaths;
    const totalAtRisk = atRiskControl + atRiskTreatment;

    if (totalDeaths > 0 && totalAtRisk > 1) {
      const expectedTreatment = (atRiskTreatment * totalDeaths) / totalAtRisk;
      const timeVariance =
        (atRiskTreatment *
          atRiskControl *
          totalDeaths *
          (totalAtRisk - totalDeaths)) /
        (totalAtRisk * totalAtRisk * (totalAtRisk - 1));

      observedMinusExpected += treatmentDeaths - expectedTreatment;
      variance += timeVariance;
    }

    atRiskControl -= controlDeaths + counts.controlCensored;
    atRiskTreatment -= treatmentDeaths + counts.treatmentCensored;
  });

  if (!(variance > 0)) {
    return {
      pValue: null,
      zScore: null,
      chiSquare: null,
      significant: false,
    };
  }

  const zScore = observedMinusExpected / Math.sqrt(variance);
  const chiSquare = zScore * zScore;
  const pValue = Math.max(
    0,
    Math.min(1, complementaryErrorFunction(Math.abs(zScore) / Math.SQRT2)),
  );

  return {
    pValue,
    zScore,
    chiSquare,
    significant: pValue < 0.05,
  };
}

export function filterRows(rows, { cohort, group, sex, site = DEFAULT_SITE }) {
  return rows.filter(
    (row) =>
      row.cohort === cohort &&
      row.group === group &&
      matchesSex(row.sex, sex) &&
      (site === DEFAULT_SITE || row.site === site),
  );
}

export function buildKaplanMeierCurve(rows) {
  if (!rows.length) {
    return {
      points: [],
      medianDay: null,
      p90Day: null,
      maxDay: null,
      maxObservedDay: null,
      sampleCount: 0,
      eventCount: 0,
      eventRate: null,
    };
  }

  const sorted = [...rows].sort((left, right) => left.ageDays - right.ageDays);
  const points = [{ day: 0, survival: 100 }];
  const maxObservedDay = sorted[sorted.length - 1].ageDays;

  let survival = 1;
  let atRisk = sorted.length;
  let index = 0;
  let medianDay = null;
  let p90Day = null;
  let eventCount = 0;
  let maxDay = null;

  while (index < sorted.length) {
    const day = sorted[index].ageDays;
    let deaths = 0;
    let censored = 0;

    while (index < sorted.length && sorted[index].ageDays === day) {
      if (sorted[index].dead) {
        deaths += 1;
      } else {
        censored += 1;
      }
      index += 1;
    }

    if (deaths > 0 && atRisk > 0) {
      survival *= (atRisk - deaths) / atRisk;
      eventCount += deaths;
      maxDay = day;
    }

    points.push({
      day,
      survival: Number((survival * 100).toFixed(3)),
      deaths,
      censored,
      atRisk,
    });

    if (medianDay == null && survival <= 0.5) {
      medianDay = day;
    }
    if (p90Day == null && survival <= 0.1) {
      p90Day = day;
    }

    atRisk -= deaths + censored;
  }

  return {
    points,
    medianDay,
    p90Day,
    maxDay,
    maxObservedDay,
    sampleCount: rows.length,
    eventCount,
    eventRate: rows.length ? eventCount / rows.length : null,
  };
}

export function summarizeAgainstControl(dataset, { cohort, group, sex, site }) {
  const groupMeta = getGroupMeta(dataset, cohort, group);
  const controlGroup = groupMeta?.controlGroup || CONTROL_GROUP;
  const controlRows = filterRows(dataset.rows, {
    cohort,
    group: controlGroup,
    sex,
    site,
  });
  const treatmentRows = filterRows(dataset.rows, { cohort, group, sex, site });

  if (!controlRows.length || !treatmentRows.length) {
    return null;
  }

  const controlCurve = buildKaplanMeierCurve(controlRows);
  const treatmentCurve = buildKaplanMeierCurve(treatmentRows);
  const logRankStats = computeLogRankStats(controlRows, treatmentRows);

  const medianDelta =
    treatmentCurve.medianDay != null && controlCurve.medianDay != null
      ? treatmentCurve.medianDay - controlCurve.medianDay
      : null;
  const p90Delta =
    treatmentCurve.p90Day != null && controlCurve.p90Day != null
      ? treatmentCurve.p90Day - controlCurve.p90Day
      : null;

  return {
    sex,
    cohort,
    group,
    controlGroup,
    groupMeta,
    controlMeta: getGroupMeta(dataset, cohort, controlGroup),
    treatmentCurve,
    controlCurve,
    treatmentCount: treatmentCurve.sampleCount,
    controlCount: controlCurve.sampleCount,
    logRankPValue: logRankStats.pValue,
    logRankZScore: logRankStats.zScore,
    logRankChiSquare: logRankStats.chiSquare,
    isStatisticallySignificant: logRankStats.significant,
    medianDelta,
    medianDeltaPercent:
      medianDelta != null && controlCurve.medianDay
        ? (medianDelta / controlCurve.medianDay) * 100
        : null,
    p90Delta,
    p90DeltaPercent:
      p90Delta != null && controlCurve.p90Day
        ? (p90Delta / controlCurve.p90Day) * 100
        : null,
    maxDelta:
      treatmentCurve.maxDay != null && controlCurve.maxDay != null
        ? treatmentCurve.maxDay - controlCurve.maxDay
        : null,
    maxDeltaPercent:
      treatmentCurve.maxDay != null && controlCurve.maxDay
        ? ((treatmentCurve.maxDay - controlCurve.maxDay) / controlCurve.maxDay) * 100
        : null,
    treatmentStartAge:
      treatmentRows.find((row) => row.ageInitiationMonths != null)?.ageInitiationMonths ??
      null,
  };
}

export function buildPanelSeries(
  dataset,
  {
    focusCohort,
    focusGroup,
    compareKeys,
    sex,
    site,
    showComparisonControls,
    focusLabelSuffix = "focus",
  },
) {
  const lines = [];
  const renderedControlKeys = new Set();

  function addSeries(cohort, group, variant, color) {
    const groupRows = filterRows(dataset.rows, { cohort, group, sex, site });
    if (!groupRows.length) {
      return;
    }

    const curve = buildKaplanMeierCurve(groupRows);
    const baseLabel = getInterventionLabel(dataset, cohort, group);
    const cohortLabel = getCohortShortLabel(dataset, cohort);
    const key = `${cohort}:${group}:${sex}:${site}`;

    lines.push({
      id: key,
      label:
        cohort === focusCohort && group === focusGroup
          ? `${baseLabel} · ${cohortLabel} (${focusLabelSuffix})`
          : `${baseLabel} · ${cohortLabel}`,
      cohort,
      group,
      color,
      variant,
      points: curve.points,
    });
  }

  const focusControlGroup =
    getGroupMeta(dataset, focusCohort, focusGroup)?.controlGroup || CONTROL_GROUP;
  addSeries(focusCohort, focusControlGroup, "focus-control", "#1e3142");
  renderedControlKeys.add(`${focusCohort}:${focusControlGroup}:${sex}:${site}`);
  addSeries(focusCohort, focusGroup, "focus-group", "#d46a36");

  compareKeys.forEach((key, index) => {
    const { cohort, group } = parseInterventionKey(key);
    if (cohort === focusCohort && group === focusGroup) {
      return;
    }

    const controlGroup =
      getGroupMeta(dataset, cohort, group)?.controlGroup || CONTROL_GROUP;
    const controlKey = `${cohort}:${controlGroup}:${sex}:${site}`;

    if (showComparisonControls && !renderedControlKeys.has(controlKey)) {
      addSeries(cohort, controlGroup, "comparison-control", "#8ca0b3");
      renderedControlKeys.add(controlKey);
    }

    addSeries(
      cohort,
      group,
      "comparison-group",
      COMPARISON_PALETTE[index % COMPARISON_PALETTE.length],
    );
  });

  return lines;
}

export function buildRankingRows(dataset, { cohort, cohorts, sex, site }) {
  const cohortScope = Array.isArray(cohorts)
    ? cohorts.filter(Boolean)
    : cohort
      ? [cohort]
      : [];

  if (dataset?.profile?.id === "human") {
    return cohortScope
      .flatMap((rowCohort) =>
        (dataset.groupsByCohort[rowCohort] || []).map((group) => {
          const groupMeta = getGroupMeta(dataset, rowCohort, group);
          const evidence = groupMeta?.evidence || {};

          return {
            cohort: rowCohort,
            group,
            groupMeta,
            acmEffectPercent: groupMeta?.acmEffectPercent ?? null,
            acmHazardRatio: groupMeta?.acmHazardRatio ?? null,
            acmConfidenceInterval: groupMeta?.acmConfidenceInterval ?? null,
            acmFdrSignificant: Boolean(groupMeta?.acmFdrSignificant),
            acmStatisticallySignificant: Boolean(groupMeta?.acmStatisticallySignificant),
            logRankPValue: groupMeta?.acmPValue ?? null,
            acmPValue: groupMeta?.acmPValue ?? null,
            acmAdjustedPValue: groupMeta?.acmAdjustedPValue ?? null,
            isStatisticallySignificant: Boolean(groupMeta?.acmStatisticallySignificant),
            statisticalTestLabel: "CoxPH",
            overallScore: groupMeta?.acmEffectPercent ?? evidence.overall?.score ?? null,
            biobankSupportScore: evidence.biobank?.score ?? null,
            followupSupportScore: evidence.followup?.score ?? null,
            cautionSupportScore: evidence.caution?.score ?? null,
            metaSupportScore: evidence.meta?.score ?? null,
            epiSupportScore: evidence.epidemiology?.score ?? null,
            mrSupportScore: evidence.mendelian?.score ?? null,
            overallLabel: evidence.overall?.label ?? null,
            biobankEvidenceLabel: evidence.biobank?.effect_label ?? null,
            followupEvidenceLabel: evidence.followup?.effect_label ?? null,
            cautionEvidenceLabel: evidence.caution?.effect_label ?? null,
            metaEvidenceLabel: evidence.meta?.effect_label ?? null,
            epiEvidenceLabel: evidence.epidemiology?.effect_label ?? null,
            mrEvidenceLabel: evidence.mendelian?.effect_label ?? null,
          };
        }),
      )
      .filter((row) => row.groupMeta);
  }

  return cohortScope
    .flatMap((rowCohort) =>
      (dataset.groupsByCohort[rowCohort] || []).map((group) => ({ cohort: rowCohort, group })),
    )
    .map(({ cohort: rowCohort, group }) =>
      summarizeAgainstControl(dataset, { cohort: rowCohort, group, sex, site }),
    )
    .filter(Boolean)
    .sort((left, right) => {
      const leftValue = left.medianDeltaPercent ?? -Infinity;
      const rightValue = right.medianDeltaPercent ?? -Infinity;
      if (rightValue !== leftValue) {
        return rightValue - leftValue;
      }
      if (left.cohort !== right.cohort) {
        return compareDatasetCohortsDescending(dataset, left.cohort, right.cohort);
      }
      return getInterventionLabel(dataset, left.cohort, left.group).localeCompare(
        getInterventionLabel(dataset, right.cohort, right.group),
      );
    });
}

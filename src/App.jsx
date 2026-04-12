/* eslint-disable react/prop-types */
import {
  Activity,
  Database,
  FlaskConical,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {
  startTransition,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import EffectSizeChart from "./components/EffectSizeChart";
import SurvivalChart from "./components/SurvivalChart";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { NativeSelect } from "./components/ui/select";
import {
  SEX_META,
  buildPanelSeries,
  buildRankingRows,
  filterDatasetBySpecies,
  formatInteger,
  formatMonths,
  formatSignedDays,
  formatSignedPercent,
  getCohortLabel,
  getCohortMeta,
  getCohortShortLabel,
  getDefaultGroupForCohort,
  getInterventionDescription,
  getInterventionKey,
  getInterventionLabel,
  parseCitpDataset,
  parseItpDataset,
  parseInterventionKey,
  summarizeAgainstControl,
} from "./lib/itp";
import { cn } from "./lib/utils";

const DATA_SOURCE_CONFIG = {
  mouse: {
    csvPath: "data/itp_lifespan_all.csv",
    manifestPath: "data/itp_dataset_manifest.json",
    parse: parseItpDataset,
    loadingLabel: "Loading the public ITP dataset…",
  },
  citp: {
    csvPath: "data/citp_lifespan_all.csv",
    manifestPath: "data/citp_dataset_manifest.json",
    parse: parseCitpDataset,
    loadingLabel: "Loading the public CITP dataset…",
  },
};

const ANIMAL_OPTIONS = [
  { value: "mouse", label: "Mouse", sourceKey: "mouse", species: null },
  {
    value: "c_elegans",
    label: "C. elegans",
    sourceKey: "citp",
    species: "C. elegans",
  },
  {
    value: "c_briggsae",
    label: "C. briggsae",
    sourceKey: "citp",
    species: "C. briggsae",
  },
  {
    value: "c_tropicalis",
    label: "C. tropicalis",
    sourceKey: "citp",
    species: "C. tropicalis",
  },
];

function StatBlock({ icon: Icon, label, value, hint, className }) {
  return (
    <div
      className={cn(
        "rounded-[20px] border border-border/70 bg-white/70 p-3.5 shadow-sm",
        className,
      )}
    >
      <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {Icon ? <Icon className="h-3 w-3 shrink-0" /> : null}
        <span className="truncate">{label}</span>
      </div>
      <div className="space-y-0.5">
        <p className="font-display text-xl sm:text-2xl font-semibold leading-none tracking-tight text-foreground">
          {value}
        </p>
        {hint ? <p className="text-[11px] text-muted-foreground truncate">{hint}</p> : null}
      </div>
    </div>
  );
}


function SectionHeader({ label, title, body, actions }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(280px,0.75fr)] lg:items-end">
      <div className="space-y-3">
        <Badge variant="outline">{label}</Badge>
        <div className="space-y-2">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
            {title}
          </h2>
          {body ? (
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              {body}
            </p>
          ) : null}
        </div>
      </div>
      {actions ? <div className="flex justify-start lg:justify-end">{actions}</div> : null}
    </div>
  );
}

function ToggleChipGroup({ label, value, options, onChange, compact }) {
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">{label}</span>
        <div className="flex bg-secondary/30 rounded-full p-0.5 border border-border/50">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={cn(
                "px-2.5 py-1 text-[10px] font-bold rounded-full transition-all duration-200",
                value === option.value
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option.value}
            type="button"
            variant={value === option.value ? "default" : "outline"}
            size="sm"
            className="rounded-full px-4"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function formatMaxAgeHint(curve) {
  if (!curve) {
    return "—";
  }

  if (
    curve.maxDay != null &&
    curve.maxObservedDay != null &&
    curve.maxObservedDay !== curve.maxDay
  ) {
    return `Observed through ${formatInteger(curve.maxObservedDay)} d`;
  }

  if (curve.maxDay != null) {
    return `${formatInteger(curve.maxDay)} d endpoint`;
  }

  if (curve.maxObservedDay != null) {
    return `Observed through ${formatInteger(curve.maxObservedDay)} d`;
  }

  return "—";
}

function compareCohortsDescending(dataset, left, right) {
  const leftIndex = dataset?.cohortSortIndex?.[left] ?? -1;
  const rightIndex = dataset?.cohortSortIndex?.[right] ?? -1;
  if (leftIndex !== rightIndex) {
    return rightIndex - leftIndex;
  }
  return right.localeCompare(left);
}

function sortRankingRowsByMetric(dataset, rows, metricKey) {
  return [...rows]
    .filter((row) => row[metricKey] != null)
    .sort((left, right) => {
      const delta = right[metricKey] - left[metricKey];
      if (delta !== 0) {
        return delta;
      }
      if (left.cohort !== right.cohort) {
        return compareCohortsDescending(dataset, left.cohort, right.cohort);
      }
      return getInterventionLabel(dataset, left.cohort, left.group).localeCompare(
        getInterventionLabel(dataset, right.cohort, right.group),
      );
    });
}

function FocusInsight({ dataset, summary }) {
  if (!summary) {
    return (
      <div className="rounded-[24px] border border-dashed border-border bg-white/50 p-5 text-sm text-muted-foreground">
        {dataset.profile.sexSupported
          ? "No records match this slice. Adjust cohort, site, or sex."
          : `No records match this slice. Adjust ${dataset.profile.focusScopeLabel}, ${dataset.profile.siteLabel.toLowerCase()}, or ${dataset.profile.groupNounSingular}.`}
      </div>
    );
  }

  return (
    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      <StatBlock
        icon={Activity}
        label="Median shift"
        value={formatSignedDays(summary.medianDelta)}
        hint={formatSignedPercent(summary.medianDeltaPercent)}
      />
      <StatBlock
        icon={Database}
        label="Focus median"
        value={formatInteger(summary.treatmentCurve.medianDay)}
        hint={`Control ${formatInteger(summary.controlCurve.medianDay)} d`}
      />
      <StatBlock
        label="90th pct shift"
        value={formatSignedDays(summary.p90Delta)}
        hint={formatSignedPercent(summary.p90DeltaPercent)}
      />
      <StatBlock
        icon={FlaskConical}
        label="Oldest death shift"
        value={formatSignedDays(summary.maxDelta)}
        hint={formatMaxAgeHint(summary.treatmentCurve)}
      />
      <StatBlock
        label={dataset.profile.sampleMetricLabel}
        value={formatInteger(summary.treatmentCount)}
        hint={`${Math.round((summary.treatmentCurve.eventRate || 0) * 100)}% events`}
      />
      {dataset.profile.sexSupported ? (
        <StatBlock
          label="Start age"
          value={formatMonths(summary.treatmentStartAge)}
          hint={SEX_META[summary.sex].label}
        />
      ) : (
        <StatBlock
          label="Strain"
          value={summary.groupMeta?.strain || "—"}
          hint={summary.groupMeta?.species || dataset.profile.combinedPopulationLabel}
        />
      )}
    </div>
  );
}


function App() {
  const [selectedAnimal, setSelectedAnimal] = useState("mouse");
  const [datasetsByAnimal, setDatasetsByAnimal] = useState({});
  const [errorsBySource, setErrorsBySource] = useState({});
  const [selectedCohort, setSelectedCohort] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedSite, setSelectedSite] = useState("ALL");
  const [sexMode, setSexMode] = useState("split");
  const [rankingSex, setRankingSex] = useState("m");
  const [rankingScope, setRankingScope] = useState("all");
  const [rankingMetric, setRankingMetric] = useState("median");
  const [compareKeys, setCompareKeys] = useState([]);
  const [compareSearch, setCompareSearch] = useState("");
  const [showComparisonControls, setShowComparisonControls] = useState(true);
  const [showInsightDescription, setShowInsightDescription] = useState(true);

  const selectedAnimalOption =
    ANIMAL_OPTIONS.find((option) => option.value === selectedAnimal) || ANIMAL_OPTIONS[0];
  const activeSourceKey = selectedAnimalOption.sourceKey;
  const activeSource = DATA_SOURCE_CONFIG[activeSourceKey];
  const dataset = datasetsByAnimal[selectedAnimal] || null;
  const error = errorsBySource[activeSourceKey] || "";

  useEffect(() => {
    if (
      (activeSourceKey === "mouse" && datasetsByAnimal.mouse) ||
      (activeSourceKey === "citp" &&
        ANIMAL_OPTIONS.filter((option) => option.sourceKey === "citp").every(
          (option) => datasetsByAnimal[option.value],
        )) ||
      errorsBySource[activeSourceKey]
    ) {
      return undefined;
    }

    let isCancelled = false;
    const base = import.meta.env.BASE_URL;

    Promise.all([
      fetch(`${base}${activeSource.csvPath}`).then((response) => {
        if (!response.ok) {
          throw new Error("Dataset fetch failed.");
        }
        return response.text();
      }),
      fetch(`${base}${activeSource.manifestPath}`).then((response) => {
        if (!response.ok) {
          throw new Error("Manifest fetch failed.");
        }
        return response.json();
      }),
    ])
      .then(([csvText, manifest]) => {
        if (isCancelled) {
          return;
        }

        const parsed = activeSource.parse(csvText, manifest);
        const nextAnimalViews =
          activeSourceKey === "mouse"
            ? { mouse: parsed }
            : Object.fromEntries(
                ANIMAL_OPTIONS.filter((option) => option.sourceKey === activeSourceKey).map(
                  (option) => [
                    option.value,
                    filterDatasetBySpecies(parsed, option.species),
                  ],
                ),
              );

        startTransition(() => {
          setDatasetsByAnimal((current) => ({
            ...current,
            ...nextAnimalViews,
          }));
        });
      })
      .catch((loadError) => {
        if (!isCancelled) {
          setErrorsBySource((current) => ({
            ...current,
            [activeSourceKey]: loadError.message || "Unable to load data.",
          }));
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [activeSource, activeSourceKey, datasetsByAnimal, errorsBySource]);

  useEffect(() => {
    if (!dataset) {
      return;
    }

    const initialCohort = dataset.overview.latestPublicCohort;
    const initialGroup = getDefaultGroupForCohort(
      dataset,
      dataset.groupsByCohort[initialCohort],
    );

    startTransition(() => {
      setSelectedCohort(initialCohort);
      setSelectedGroup(initialGroup);
      setSelectedSite(dataset.defaultSite);
      setSexMode(dataset.profile.sexSupported ? "split" : "combined");
      setRankingSex(dataset.profile.sexSupported ? "m" : "all");
      setRankingScope("all");
      setCompareKeys([]);
      setCompareSearch("");
      setShowComparisonControls(true);
      setShowInsightDescription(true);
    });
  }, [dataset, selectedAnimal]);

  const deferredCompareSearch = useDeferredValue(compareSearch);

  useEffect(() => {
    setShowInsightDescription(true);
  }, [
    selectedCohort,
    selectedGroup,
    rankingScope,
    rankingSex,
    selectedSite,
    rankingMetric,
  ]);

  function focusIntervention(cohort, group) {
    setSelectedCohort(cohort);
    setSelectedGroup(group);
    setCompareKeys((current) =>
      current.filter((key) => key !== getInterventionKey(cohort, group)),
    );
  }

  function updateCohort(nextCohort) {
    if (!dataset) {
      return;
    }
    const nextGroup = getDefaultGroupForCohort(
      dataset,
      dataset.groupsByCohort[nextCohort],
    );
    focusIntervention(nextCohort, nextGroup);
  }

  function updateGroup(nextGroup) {
    const cohortForGroup = dataset?.cohorts.includes(selectedCohort)
      ? selectedCohort
      : dataset?.overview.latestPublicCohort || "";
    focusIntervention(cohortForGroup, nextGroup);
  }

  function toggleCompareKey(key) {
    setCompareKeys((current) => {
      if (current.includes(key)) {
        return current.filter((entry) => entry !== key);
      }
      if (current.length >= 4) {
        return current;
      }
      return [...current, key];
    });
  }

  if (error) {
    return (
      <div className="grid min-h-screen place-items-center bg-noise px-6 text-center">
        <div className="space-y-3">
          <Badge variant="outline">Longevity Atlas</Badge>
          <h1 className="font-display text-5xl font-semibold tracking-[-0.05em] text-foreground">
            Unable to load data
          </h1>
          <p className="mx-auto max-w-xl text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (!dataset) {
    return (
      <div className="grid min-h-screen place-items-center bg-noise px-6 text-center">
        <div className="space-y-3">
          <Badge variant="outline">Longevity Atlas</Badge>
          <h1 className="font-display text-5xl font-semibold tracking-[-0.05em] text-foreground">
            {activeSource.loadingLabel}
          </h1>
        </div>
      </div>
    );
  }

  const activeSite = dataset.siteOptions.includes(selectedSite)
    ? selectedSite
    : dataset.defaultSite;
  const fallbackCohort = dataset.overview.latestPublicCohort || dataset.cohorts[0] || "";
  const activeCohort = dataset.cohorts.includes(selectedCohort)
    ? selectedCohort
    : fallbackCohort;
  const currentGroups = dataset.groupsByCohort[activeCohort] || [];
  const activeGroup = currentGroups.includes(selectedGroup)
    ? selectedGroup
    : getDefaultGroupForCohort(dataset, currentGroups);
  const selectedCohortLabel = getCohortLabel(dataset, activeCohort);
  const focusLabel = getInterventionLabel(dataset, activeCohort, activeGroup);
  const selectedInterventionKey = getInterventionKey(activeCohort, activeGroup);
  const displayedCohorts = dataset.profile.reverseCohortPresentation
    ? [...dataset.cohorts].reverse()
    : dataset.cohorts;
  const displayedCohortOverview = dataset.profile.reverseCohortPresentation
    ? [...dataset.cohortOverview].reverse()
    : dataset.cohortOverview;
  const panelSexes =
    dataset.profile.sexSupported && sexMode === "split"
      ? ["m", "f"]
      : [
        dataset.profile.sexSupported
          ? sexMode === "male"
            ? "m"
            : sexMode === "female"
              ? "f"
              : "all"
          : "all",
      ];

  const panelSummaries = panelSexes.map((sex) =>
    summarizeAgainstControl(dataset, {
      cohort: activeCohort,
      group: activeGroup,
      sex,
      site: activeSite,
    }),
  );

  const panelCharts = panelSexes.map((sex) => ({
    sex,
    lines: buildPanelSeries(dataset, {
      focusCohort: activeCohort,
      focusGroup: activeGroup,
      compareKeys,
      sex,
      site: activeSite,
      showComparisonControls,
    }),
  }));

  const rankingCohorts =
    rankingScope === "all" ? dataset.cohorts : activeCohort ? [activeCohort] : [];
  const isMultiYearRanking = rankingCohorts.length > 1;
  const rankingRows = buildRankingRows(dataset, {
    cohorts: rankingCohorts,
    sex: dataset.profile.sexSupported ? rankingSex : "all",
    site: activeSite,
  });
  const rankingSiteLabel = dataset.siteMeta[activeSite];
  const rankingSexLabel =
    dataset.profile.sexSupported
      ? rankingSex === "all"
        ? `Combined-sex ${dataset.profile.sampleNounPlural}`
        : `${SEX_META[rankingSex].label} ${dataset.profile.sampleNounPlural}`
      : dataset.profile.combinedPopulationLabel;
  const rankingScopeLabel = isMultiYearRanking
    ? `All public ${dataset.profile.focusScopePlural}`
    : selectedCohortLabel;
  const rankingMetricConfig =
    rankingMetric === "max"
      ? {
        title: "Oldest death age shift",
        subtitle: `${rankingSexLabel} · ${rankingScopeLabel} · ${rankingSiteLabel}. Ranked by percent change versus matched control.`,
        metricKey: "maxDeltaPercent",
        dayMetricKey: "maxDelta",
        curveMetricKey: "maxDay",
        curveMetricLabel: "Oldest death",
        footnote:
          `Uses the oldest death event for each group. Longer last-observed ages from censored ${dataset.profile.sampleNounPlural} still appear in the spotlight when relevant.`,
      }
      : rankingMetric === "p90"
        ? {
          title: "90th percentile age shift",
          subtitle: `${rankingSexLabel} · ${rankingScopeLabel} · ${rankingSiteLabel}. Ranked by percent change in estimated 90th percentile age versus matched control.`,
          metricKey: "p90DeltaPercent",
          dayMetricKey: "p90Delta",
          curveMetricKey: "p90Day",
          curveMetricLabel: "90th pct",
          footnote:
            "90th percentile age is the first age where Kaplan-Meier survival falls to 10%. This is descriptive and does not replace a formal late-life significance test.",
        }
        : {
          title: "Median lifespan shift",
          subtitle: `${rankingSexLabel} · ${rankingScopeLabel} · ${rankingSiteLabel}. Ranked by percent change versus matched control.`,
          metricKey: "medianDeltaPercent",
          dayMetricKey: "medianDelta",
          curveMetricKey: "medianDay",
          curveMetricLabel: "Median",
          footnote:
            `Each row is a ${dataset.profile.focusScopeLabel}-matched comparison. Click any row to sync the survival explorer.`,
        };
  const rankingMetricRows = sortRankingRowsByMetric(
    dataset,
    rankingRows,
    rankingMetricConfig.metricKey,
  );
  const rankingChartRows = rankingMetricRows.map((row) => ({
    ...row,
    key: getInterventionKey(row.cohort, row.group),
    label: getInterventionLabel(dataset, row.cohort, row.group),
    metaLabel:
      dataset.profile.id === "citp"
        ? [
          getCohortMeta(dataset, row.cohort).secondaryLabel,
          getCohortMeta(dataset, row.cohort).shortLabel,
        ]
          .filter(Boolean)
          .join(" ")
        : getCohortShortLabel(dataset, row.cohort),
    description: getInterventionDescription(dataset, row.cohort, row.group),
  }));
  const selectedRankingRow =
    rankingMetricRows.find(
      (row) =>
        getInterventionKey(row.cohort, row.group) === selectedInterventionKey,
    ) || null;
  const activeRankingRow = selectedRankingRow || rankingMetricRows[0] || null;
  const activeRankingKey = activeRankingRow
    ? getInterventionKey(activeRankingRow.cohort, activeRankingRow.group)
    : "";
  const activeInterventionDescription = activeRankingRow
    ? getInterventionDescription(dataset, activeRankingRow.cohort, activeRankingRow.group)
    : null;

  const compareLibrary = dataset.compareOptions.filter((option) => {
    if (option.key === selectedInterventionKey) {
      return false;
    }

    const query = deferredCompareSearch.trim().toLowerCase();
    if (!query) {
      return true;
    }

    return option.searchText.includes(query);
  });
  const rankingTitle = isMultiYearRanking
    ? `Intervention leaderboard across public ${dataset.profile.focusScopePlural}`
    : `Intervention leaderboard for ${selectedCohortLabel}`;
  const rankingBody =
    "Scan the full intervention set in one horizontal leaderboard, then click any row to load that treatment in the survival explorer below.";
  const rankingScopeHint = isMultiYearRanking
    ? `${formatInteger(rankingMetricRows.length)} rows across ${formatInteger(rankingCohorts.length)} ${dataset.profile.focusScopePlural}`
    : `${formatInteger(rankingMetricRows.length)} rows in ${selectedCohortLabel}`;

  const selectedLabel = activeRankingRow
    ? getInterventionLabel(dataset, activeRankingRow.cohort, activeRankingRow.group)
    : "No ranked row";
  const primaryMetric =
    rankingMetric === "max"
      ? {
        label: "Oldest death shift",
        value: activeRankingRow ? formatSignedDays(activeRankingRow.maxDelta) : "—",
        hint: activeRankingRow ? formatSignedPercent(activeRankingRow.maxDeltaPercent) : "No value",
      }
      : rankingMetric === "p90"
        ? {
          label: "90th pct shift",
          value: activeRankingRow ? formatSignedDays(activeRankingRow.p90Delta) : "—",
          hint: activeRankingRow ? formatSignedPercent(activeRankingRow.p90DeltaPercent) : "No value",
        }
        : {
          label: "Median shift",
          value: activeRankingRow ? formatSignedDays(activeRankingRow.medianDelta) : "—",
          hint: activeRankingRow ? formatSignedPercent(activeRankingRow.medianDeltaPercent) : "No value",
        };

  return (
    <div className="min-h-screen bg-noise text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1480px] flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <header className="relative animate-in fade-in slide-in-from-top-4 duration-700 overflow-hidden rounded-[32px] border border-border/70 bg-[linear-gradient(155deg,rgba(255,255,255,0.94),rgba(255,255,255,0.8),rgba(232,239,242,0.92))] shadow-panel p-4 sm:p-5 flex flex-col gap-4">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-80 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(212,106,54,0.12), transparent 34%), radial-gradient(circle at left center, rgba(23,96,135,0.12), transparent 42%)",
            }}
          />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight leading-none text-foreground">
                  {dataset.profile.title}
                </h1>
                <Badge variant="outline" className="bg-white/60 shadow-sm border-border/70 text-[10px] py-0.5">
                  {dataset.overview.releaseTag}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground border-l border-border/70 pl-3 leading-relaxed hidden lg:block max-w-[280px]">
                {dataset.profile.description}
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-white/50 rounded-full px-4 py-1.5 border border-border/50 shadow-sm self-start md:self-auto">
              {[
                { label: dataset.profile.sampleStatLabel, val: dataset.overview.sampleCount },
                { label: dataset.profile.interventionStatLabel, val: dataset.overview.interventionCount },
                { label: dataset.profile.cohortStatLabel, val: dataset.overview.cohortCount }
              ].map((s, i) => (
                <div key={s.label} className="flex items-center">
                  {i > 0 && <div className="w-px h-3.5 bg-border/70 mx-3" />}
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{s.label}</span>
                    <span className="text-sm font-semibold tracking-tight font-display whitespace-nowrap">{formatInteger(s.val)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </header>

        <Card className="border-border/70 bg-card/75 shadow-none mt-2">
          <CardContent className="space-y-6 lg:p-8">
            {/* <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/70 pb-6">
              <SectionHeader
                label="Leaderboard"
                title={rankingTitle}
                body={rankingBody}
              />
              <div className="text-left sm:text-right">
                <p className="font-display text-2xl font-semibold tracking-tight text-foreground">{formatInteger(rankingMetricRows.length)} results</p>
                <p className="text-xs text-muted-foreground mt-1">{rankingScopeHint}</p>
              </div>
            </div> */}

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3 bg-white/40 rounded-[22px] p-2 border border-border/70 shadow-sm">
                <div className="flex items-center gap-2 px-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 whitespace-nowrap">
                    Animal
                  </span>
                  <NativeSelect
                    value={selectedAnimal}
                    onChange={(event) => setSelectedAnimal(event.target.value)}
                    className="h-7 py-0 min-w-[150px] rounded-full text-xs bg-white border-border/70"
                  >
                    {ANIMAL_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </NativeSelect>
                </div>

                <div className="w-px h-4 bg-border/70" />

                <div className="flex items-center gap-2 pl-2 border-r border-border/70 pr-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 whitespace-nowrap">Settings</span>
                  <NativeSelect
                    value={activeCohort}
                    onChange={(e) => updateCohort(e.target.value)}
                    className={cn(
                      "h-7 py-0 rounded-full text-xs bg-white border-border/70",
                      dataset.profile.id === "citp" ? "min-w-[220px]" : "min-w-[90px]",
                    )}
                  >
                    {displayedCohorts.map((cohort) => (
                      <option key={cohort} value={cohort}>
                        {getCohortLabel(dataset, cohort)}
                      </option>
                    ))}
                  </NativeSelect>
                  <NativeSelect
                    value={activeSite}
                    onChange={(e) => setSelectedSite(e.target.value)}
                    className="h-7 py-0 min-w-[100px] rounded-full text-xs bg-white border-border/70"
                  >
                    {dataset.siteOptions.map((site) => (
                      <option key={site} value={site}>
                        {dataset.siteMeta[site]}
                      </option>
                    ))}
                  </NativeSelect>
                </div>

                <div className="flex flex-wrap items-center gap-4 px-2">
                  <ToggleChipGroup compact label="Metric" value={rankingMetric} options={[{ value: "median", label: "Median" }, { value: "p90", label: "90th" }, { value: "max", label: "Oldest" }]} onChange={setRankingMetric} />
                  <div className="w-px h-4 bg-border/70" />
                  <ToggleChipGroup compact label="Scope" value={rankingScope} options={[{ value: "focus", label: "Focus" }, { value: "all", label: "All" }]} onChange={setRankingScope} />
                  {dataset.profile.sexSupported ? (
                    <>
                      <div className="w-px h-4 bg-border/70" />
                      <ToggleChipGroup compact label="Sex" value={rankingSex} options={[{ value: "m", label: "Male" }, { value: "f", label: "Female" }, { value: "all", label: "Combined" }]} onChange={setRankingSex} />
                    </>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 bg-white/95 rounded-[22px] px-5 py-2.5 shadow-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                <div className="relative flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <p className="font-display text-base font-bold tracking-tight text-foreground truncate">
                        {selectedLabel}
                      </p>
                      {activeInterventionDescription && (
                        <button
                          type="button"
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-[10px] font-black leading-none text-primary/80 transition-colors hover:bg-primary/10 hover:text-primary"
                          aria-expanded={showInsightDescription}
                          aria-controls="insight-description"
                          aria-label={`${showInsightDescription ? "Hide" : "Show"} description for ${selectedLabel}`}
                          onClick={() =>
                            setShowInsightDescription((current) => !current)
                          }
                        >
                          ?
                        </button>
                      )}
                      {activeRankingRow?.cohort && activeRankingRow.cohort !== activeCohort && (
                        <Badge variant="outline" className="text-[9px] py-0 px-1.5 font-bold h-4 border-primary/20 bg-primary/5 text-primary/80 whitespace-nowrap">{getCohortShortLabel(dataset, activeRankingRow.cohort)}</Badge>
                      )}
                    </div>
                    {showInsightDescription && activeInterventionDescription && (
                      <div
                        id="insight-description"
                        className="mt-2 max-w-2xl rounded-[14px] border border-primary/15 bg-primary/5 px-3 py-2 text-[11px] leading-5 text-muted-foreground"
                      >
                        {activeInterventionDescription}
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative flex items-center gap-6 shrink-0">
                  <div className="w-px h-8 bg-border/70" />
                  <div className="flex flex-col items-end">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-lg font-extrabold tracking-tight text-foreground">{primaryMetric.value}</span>
                      <span className="text-xs font-bold text-primary">{primaryMetric.hint}</span>
                    </div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground leading-none">{primaryMetric.label}</p>
                  </div>
                </div>
              </div>
            </div>

            <EffectSizeChart
              title={rankingMetricConfig.title}
              subtitle={rankingMetricConfig.subtitle}
              rows={rankingChartRows}
              metricKey={rankingMetricConfig.metricKey}
              dayMetricKey={rankingMetricConfig.dayMetricKey}
              curveMetricKey={rankingMetricConfig.curveMetricKey}
              curveMetricLabel={rankingMetricConfig.curveMetricLabel}
              selectedKey={activeRankingKey}
              onSelect={(row) => focusIntervention(row.cohort, row.group)}
              footnote={rankingMetricConfig.footnote}
            />
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-border/70 bg-card/80 shadow-none">
          <div className="grid lg:grid-cols-[340px_minmax(0,1fr)]">
            <aside className="border-b border-border/70 bg-white/45 lg:border-b-0 lg:border-r">
              <CardContent className="space-y-6 p-6">
                <div className="space-y-3">
                  <Badge variant="outline">{dataset.profile.explorerSectionLabel}</Badge>
                  <div className="space-y-2">
                    <h2 className="font-display text-3xl font-semibold tracking-[-0.05em]">
                      {focusLabel}
                    </h2>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {dataset.profile.explorerBody}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {dataset.profile.focusGroupLabel}
                    </label>
                    <NativeSelect
                      value={activeGroup}
                      onChange={(event) => updateGroup(event.target.value)}
                    >
                      {currentGroups.map((group) => (
                        <option key={group} value={group}>
                          {getInterventionLabel(dataset, activeCohort, group)}
                        </option>
                      ))}
                    </NativeSelect>
                  </div>

                  {dataset.profile.sexSupported ? (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-foreground">Sex layout</p>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { value: "split", label: "Split" },
                          { value: "combined", label: "Combined" },
                          { value: "male", label: "Male" },
                          { value: "female", label: "Female" },
                        ].map((option) => (
                          <Button
                            key={option.value}
                            type="button"
                            variant={sexMode === option.value ? "default" : "outline"}
                            className="rounded-2xl"
                            onClick={() => setSexMode(option.value)}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-[22px] border border-border/70 bg-secondary/30 p-4 text-sm text-muted-foreground">
                      CITP lifespan exports are shown as combined populations, so the worm view stays on a single panel.
                    </div>
                  )}
                </div>

                <div className="space-y-4 rounded-[24px] border border-border/70 bg-secondary/45 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        {dataset.profile.compareSectionLabel}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Search {dataset.profile.focusScopeLabel}, strain, or compound. Four overlays max.
                      </p>
                    </div>
                    <Badge variant="outline">{compareKeys.length}/4</Badge>
                  </div>

                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      className="pl-9"
                      placeholder={dataset.profile.comparisonSearchPlaceholder}
                      value={compareSearch}
                      onChange={(event) => setCompareSearch(event.target.value)}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {compareKeys.length ? (
                      compareKeys.map((key) => {
                        const { cohort, group } = parseInterventionKey(key);
                        const label = getInterventionLabel(dataset, cohort, group);
                        return (
                          <Button
                            key={key}
                            type="button"
                            variant="secondary"
                            size="sm"
                            className="rounded-full"
                            onClick={() => toggleCompareKey(key)}
                          >
                            {label} · {getCohortShortLabel(dataset, cohort)}
                          </Button>
                        );
                      })
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        No comparison overlays selected yet.
                      </p>
                    )}
                  </div>

                  <div className="max-h-72 space-y-2 overflow-auto pr-1">
                    {compareLibrary.map((option) => (
                      <button
                        key={option.key}
                        type="button"
                        className={cn(
                          "flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all duration-200",
                          compareKeys.includes(option.key)
                            ? "border-primary/30 bg-primary/10 text-foreground"
                            : "border-border/70 bg-white/70 text-foreground hover:-translate-y-0.5 hover:bg-white",
                        )}
                        onClick={() => toggleCompareKey(option.key)}
                      >
                        <span className="font-medium">{option.label}</span>
                        <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          {getCohortShortLabel(dataset, option.cohort)}
                        </span>
                      </button>
                    ))}
                  </div>

                  <label className="flex items-center gap-3 rounded-2xl border border-border/70 bg-white/70 px-4 py-3 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-[hsl(var(--primary))]"
                      checked={showComparisonControls}
                      onChange={(event) =>
                        setShowComparisonControls(event.target.checked)
                      }
                    />
                    <span>Show {dataset.profile.focusScopeLabel}-specific control overlays</span>
                  </label>
                </div>
              </CardContent>
            </aside>

            <div className="space-y-6 p-6">
              <SectionHeader
                label={dataset.profile.focusSectionLabel}
                title={`${selectedCohortLabel} survival explorer`}
                body={dataset.profile.focusSectionBody}
                actions={
                  <div className="flex items-center gap-2 rounded-full border border-border/70 bg-white/70 px-4 py-2 text-sm text-muted-foreground">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>{dataset.profile.siteLabel}: {dataset.siteMeta[activeSite]}</span>
                  </div>
                }
              />

              <div className="flex flex-wrap gap-2 rounded-[24px] border border-border/70 bg-white/55 p-3">
                {displayedCohortOverview.map((entry) => {
                  return (
                    <button
                      key={entry.cohort}
                      type="button"
                      className={cn(
                        "group flex-1 min-w-[90px] flex flex-col items-center justify-center gap-1 rounded-[16px] border px-2 py-2.5 text-center transition-all duration-200",
                        entry.cohort === activeCohort
                          ? "border-primary/30 bg-primary/10 shadow-sm ring-1 ring-primary/20"
                          : "border-border/60 bg-white/70 hover:-translate-y-[2px] hover:shadow-sm hover:border-border/80 hover:bg-white",
                      )}
                      onClick={() => updateCohort(entry.cohort)}
                    >
                      <strong className={cn("font-display text-sm font-bold tracking-tight leading-tight", entry.cohort === activeCohort ? "text-primary" : "text-foreground")}>
                        {entry.shortLabel}
                      </strong>
                      {entry.secondaryLabel ? (
                        <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          {entry.secondaryLabel}
                        </span>
                      ) : null}
                      <div className="flex items-center gap-1.5 opacity-80">
                        <span className="text-[9px] font-semibold text-muted-foreground">
                          {formatInteger(entry.sampleCount)} n
                        </span>
                        <div className="w-[3px] h-[3px] rounded-full bg-border/80" />
                        <span className="text-[9px] font-semibold text-muted-foreground">
                          {entry.interventionCount} tx
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className={cn("grid gap-5", panelCharts.length > 1 && "xl:grid-cols-2")}>
                {panelCharts.map((panel, index) => (
                  <Card
                    key={panel.sex}
                    className="border-border/70 bg-white/60 shadow-none"
                  >
                    <CardContent className="space-y-5 p-5">
                      <FocusInsight dataset={dataset} summary={panelSummaries[index]} />
                      <SurvivalChart
                        title={`${SEX_META[panel.sex].label} survival`}
                        subtitle={`${focusLabel} against matched control${activeSite === dataset.defaultSite
                          ? ` across ${dataset.profile.siteAllLabel.toLowerCase()}`
                          : ` at ${dataset.siteMeta[activeSite]}`
                          }.`}
                        lines={panel.lines}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="border-border/70 bg-card/70">
          <CardContent className="flex flex-col gap-4 p-6 text-sm text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1">
              <p>
                Latest public {dataset.profile.focusScopeLabel} verified locally:{" "}
                <strong className="text-foreground">
                  {getCohortLabel(dataset, dataset.overview.latestPublicCohort)}
                </strong>
                . {dataset.profile.footerText}
              </p>
              <p>
                Build manifest:{" "}
                <a
                  className="font-medium text-primary hover:underline"
                  href={`${import.meta.env.BASE_URL}data/${dataset.profile.manifestFileName}`}
                >
                  {dataset.profile.manifestFileName}
                </a>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{focusLabel}</Badge>
              <Badge variant="outline">{dataset.siteMeta[activeSite]}</Badge>
              <Badge variant="outline">{selectedAnimalOption.label}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;

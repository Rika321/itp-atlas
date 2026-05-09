/* eslint-disable react/prop-types */
import {
  Activity,
  CircleDollarSign,
  Database,
  FlaskConical,
  MessageCircle,
  Moon,
  Search,
  SlidersHorizontal,
  Sun,
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
import { HUMAN_DATASET_MANIFEST } from "./lib/humanEvidence";
import {
  LANGUAGE_OPTIONS,
  getPreferredLocale,
  localizeDatasetMetadata,
  localizeValue,
  persistLocale,
  t,
  translateDataText,
} from "./lib/i18n";
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
  getInterventionEvidence,
  getInterventionKey,
  getInterventionLabel,
  getInterventionPathway,
  getInterventionPubMedReference,
  parseCitpDataset,
  parseHumanDataset,
  parseItpDataset,
  parseInterventionKey,
  summarizeAgainstControl,
} from "./lib/itp";
import { cn } from "./lib/utils";

function fetchTextAsset(base, path) {
  return fetch(`${base}${path}`).then((response) => {
    if (!response.ok) {
      throw new Error("Dataset fetch failed.");
    }
    return response.text();
  });
}

function fetchJsonAsset(base, path) {
  return fetch(`${base}${path}`).then((response) => {
    if (!response.ok) {
      throw new Error("Manifest fetch failed.");
    }
    return response.json();
  });
}

async function loadCitpSource(base) {
  const manifest = await fetchJsonAsset(base, "data/citp_dataset_manifest.json");
  const csvPaths =
    Array.isArray(manifest?.combined_csv_parts) && manifest.combined_csv_parts.length > 0
      ? manifest.combined_csv_parts
      : ["data/citp_lifespan_all.csv"];
  const csvText = (await Promise.all(csvPaths.map((path) => fetchTextAsset(base, path)))).join("");

  return { csvText, manifest };
}

async function loadHumanSource(base) {
  let humanManifest = null;

  try {
    humanManifest = await fetchJsonAsset(base, "data/human_acm_dataset_manifest.json");
  } catch {
    humanManifest = HUMAN_DATASET_MANIFEST;
  }

  return {
    csvText: null,
    manifest: humanManifest,
  };
}

const DATA_SOURCE_CONFIG = {
  mouse: {
    csvPath: "data/itp_lifespan_all.csv",
    manifestPath: "data/itp_dataset_manifest.json",
    parse: parseItpDataset,
    loadingLabel: "Loading the public ITP dataset…",
  },
  citp: {
    manifestPath: "data/citp_dataset_manifest.json",
    parse: parseCitpDataset,
    loadingLabel: "Loading the public CITP dataset…",
    load: loadCitpSource,
  },
  human: {
    parse: parseHumanDataset,
    loadingLabel: "Loading human UK Biobank ACM signals…",
    load: loadHumanSource,
  },
};

const ANIMAL_OPTIONS = [
  {
    value: "mouse",
    label: "Mouse",
    menuLabel: "🐭 Mouse",
    sourceKey: "mouse",
    species: null,
  },
  {
    value: "human",
    label: "Human",
    menuLabel: "🧑 Human",
    sourceKey: "human",
    species: null,
  },
  {
    value: "c_elegans",
    label: "C. elegans",
    menuLabel: "🪱 C. elegans",
    sourceKey: "citp",
    species: "C. elegans",
  },
  {
    value: "c_briggsae",
    label: "C. briggsae",
    menuLabel: "🪱 C. briggsae",
    sourceKey: "citp",
    species: "C. briggsae",
  },
  {
    value: "c_tropicalis",
    label: "C. tropicalis",
    menuLabel: "🪱 C. tropicalis",
    sourceKey: "citp",
    species: "C. tropicalis",
  },
];

const SITE_TITLE = "How to Live Longer: A Small-Molecule Atlas";
const SITE_SHORT_TITLE = "How to Live Longer";
const SITE_DESCRIPTION =
  "Compare public mouse, worm, fly, killifish, and human Biobank datasets to see which small-molecule interventions are linked to longer life.";
const THEME_STORAGE_KEY = "itp-atlas-theme";
const THEME_OPTIONS = [
  {
    value: "light",
    label: "Light",
    labelZh: "浅色",
    Icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    labelZh: "深色",
    Icon: Moon,
  },
];
const DATASET_ACKNOWLEDGEMENTS = [
  {
    label: "Lifespan Charts",
    href: "https://matthost.github.io/lifespancharts/",
  },
  {
    label: "Mouse Phenome Database",
    href: "https://phenome.jax.org",
  },
  {
    label: "CITP Data Portal",
    href: "https://citpaging.org",
  },
  {
    label: "eLife killifish source data",
    href: "https://elifesciences.org/articles/69008",
  },
  {
    label: "Nature fly source data",
    href: "https://www.nature.com/articles/s41467-022-30975-4",
  },
  {
    label: "Human UK Biobank project source",
  },
  {
    label: "UK Biobank lifespan-modulating drug project",
    href:
      "https://www.ukbiobank.ac.uk/projects/systematic-identification-of-potential-lifespan-modulating-drugs-and-long-term-health-outcomes-in-the-uk-biobank/",
  },
];
const QR_IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "webp", "svg"];
const SUPPORT_QR_CODES = [
  {
    key: "wechat",
    label: "WeChat",
    eyebrow: "Scan in WeChat",
    description: "Use your WeChat QR image here when you are ready to add it.",
    imageStem: "wechat-pay",
    suggestedFileName: "public/qr/wechat-pay.png",
    Icon: MessageCircle,
    iconClassName: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700",
    panelClassName:
      "border-emerald-500/15 bg-[linear-gradient(180deg,rgba(236,253,245,0.96),rgba(255,255,255,0.92))]",
    frameClassName: "border-emerald-500/15 bg-emerald-500/[0.04]",
  },
  {
    key: "venmo",
    label: "Venmo",
    eyebrow: "Scan in Venmo",
    description: "Drop in your Venmo QR image later without changing the footer code.",
    imageStem: "venmo",
    suggestedFileName: "public/qr/venmo.png",
    Icon: CircleDollarSign,
    iconClassName: "border-sky-500/20 bg-sky-500/10 text-sky-700",
    panelClassName:
      "border-sky-500/15 bg-[linear-gradient(180deg,rgba(239,248,255,0.96),rgba(255,255,255,0.92))]",
    frameClassName: "border-sky-500/15 bg-sky-500/[0.04]",
  },
];

function upsertMetaTag(selector, attributeName, attributeValue, content) {
  if (typeof document === "undefined") {
    return;
  }

  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attributeName, attributeValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function normalizeTheme(value) {
  return value === "dark" || value === "light" ? value : null;
}

function getPreferredTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = normalizeTheme(window.localStorage?.getItem(THEME_STORAGE_KEY));
  if (storedTheme) {
    return storedTheme;
  }

  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
}

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
      {actions ? <div className="flex w-full justify-start lg:w-auto lg:justify-end">{actions}</div> : null}
    </div>
  );
}

function ToggleChipGroup({ label, value, options, onChange, compact }) {
  if (compact) {
    return (
      <div className="flex w-full flex-col items-start gap-1.5 sm:w-auto sm:flex-row sm:items-center sm:gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">{label}</span>
        <div className="flex w-full flex-wrap gap-1 rounded-[18px] border border-border/50 bg-secondary/30 p-0.5 sm:w-auto sm:flex-nowrap sm:gap-0 sm:rounded-full">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={cn(
                "flex-1 rounded-[14px] px-2.5 py-1 text-[10px] font-bold transition-all duration-200 sm:flex-none sm:rounded-full",
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

function getSexLabel(sex, locale) {
  return t(locale, SEX_META[sex].label, SEX_META[sex].labelZh || SEX_META[sex].label);
}

function SupportQrCard({ locale, method }) {
  const imageCandidates = QR_IMAGE_EXTENSIONS.map(
    (extension) => `${import.meta.env.BASE_URL}qr/${method.imageStem}.${extension}`,
  );
  const Icon = method.Icon;
  const [imageIndex, setImageIndex] = useState(0);
  const imageSrc = imageCandidates[imageIndex] || null;
  const hasImage = imageSrc != null;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[24px] border p-4 shadow-[0_18px_40px_-34px_rgba(17,33,49,0.42)] dark:bg-none dark:bg-card/80 dark:shadow-[0_18px_40px_-34px_rgba(0,0,0,0.65)]",
        method.panelClassName,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.88),transparent_70%)]"
      />
      <div className="relative flex items-start justify-between gap-2.5">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/85">
            {method.eyebrow}
          </p>
          <h3 className="font-display text-base font-semibold tracking-tight text-foreground">
            {method.label}
          </h3>
        </div>
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
            method.iconClassName,
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </div>
      </div>
      <div
        className={cn(
          "relative mt-4 overflow-hidden rounded-[20px] border p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] dark:bg-secondary/30 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
          method.frameClassName,
        )}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={t(
              locale,
              `${method.label} support QR code`,
              `${method.label} 支持二维码`,
            )}
            className="aspect-square w-full rounded-[16px] bg-white object-cover"
            loading="lazy"
            onError={() => setImageIndex((current) => current + 1)}
          />
        ) : (
          <div className="grid aspect-square place-items-center rounded-[16px] border border-dashed border-border/80 bg-white/95 px-4 text-center">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground">
                {t(locale, "QR image not added yet", "尚未添加二维码图片")}
              </p>
              <p className="text-[11px] leading-5 text-muted-foreground">
                {t(locale, "Add", "添加")} `{method.suggestedFileName}`
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function formatMaxAgeHint(curve, locale) {
  if (!curve) {
    return "—";
  }

  if (
    curve.maxDay != null &&
    curve.maxObservedDay != null &&
    curve.maxObservedDay !== curve.maxDay
  ) {
    return t(
      locale,
      `Observed through ${formatInteger(curve.maxObservedDay, locale)} d`,
      `观察至 ${formatInteger(curve.maxObservedDay, locale)} 天`,
    );
  }

  if (curve.maxDay != null) {
    return t(
      locale,
      `${formatInteger(curve.maxDay, locale)} d endpoint`,
      `${formatInteger(curve.maxDay, locale)} 天终点`,
    );
  }

  if (curve.maxObservedDay != null) {
    return t(
      locale,
      `Observed through ${formatInteger(curve.maxObservedDay, locale)} d`,
      `观察至 ${formatInteger(curve.maxObservedDay, locale)} 天`,
    );
  }

  return "—";
}

function formatScore(value, locale) {
  if (value == null || Number.isNaN(value)) {
    return "—";
  }

  return `${formatInteger(value, locale)}/100`;
}

function formatAcmEffect(value, locale) {
  if (value == null || Number.isNaN(value)) {
    return "—";
  }

  const formattedValue = formatInteger(Math.abs(value), locale);
  if (value > 0) {
    return t(locale, `${formattedValue}% lower ACM`, `全因死亡率降低 ${formattedValue}%`);
  }
  if (value < 0) {
    return t(locale, `${formattedValue}% higher ACM`, `全因死亡率升高 ${formattedValue}%`);
  }

  return t(
    locale,
    "0% ACM effect",
    "全因死亡率影响 0%",
  );
}

function formatAcmEffectDelta(value, locale) {
  return formatAcmEffect(value, locale);
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

function FocusInsight({ dataset, locale, summary }) {
  if (!summary) {
    return (
      <div className="rounded-[24px] border border-dashed border-border bg-white/50 p-5 text-sm text-muted-foreground">
        {dataset.profile.sexSupported
          ? t(
            locale,
            "No records match this slice. Adjust cohort, site, or sex.",
            "没有记录匹配当前筛选条件。请调整队列、站点或性别。",
          )
          : t(
            locale,
            `No records match this slice. Adjust ${dataset.profile.focusScopeLabel}, ${dataset.profile.siteLabel.toLowerCase()}, or ${dataset.profile.groupNounSingular}.`,
            `没有记录匹配当前筛选条件。请调整${dataset.profile.focusScopeLabel}、${dataset.profile.siteLabel}或${dataset.profile.groupNounSingular}。`,
          )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3">
      <StatBlock
        icon={Activity}
        label={t(locale, "Median shift", "中位寿命变化")}
        value={formatSignedDays(summary.medianDelta, locale)}
        hint={formatSignedPercent(summary.medianDeltaPercent, locale)}
      />
      <StatBlock
        icon={Database}
        label={t(locale, "Focus median", "当前组中位数")}
        value={formatInteger(summary.treatmentCurve.medianDay, locale)}
        hint={t(
          locale,
          `Control ${formatInteger(summary.controlCurve.medianDay, locale)} d`,
          `对照 ${formatInteger(summary.controlCurve.medianDay, locale)} 天`,
        )}
      />
      <StatBlock
        label={t(locale, "90th pct shift", "第 90 百分位变化")}
        value={formatSignedDays(summary.p90Delta, locale)}
        hint={formatSignedPercent(summary.p90DeltaPercent, locale)}
      />
      <StatBlock
        icon={FlaskConical}
        label={t(locale, "Oldest death shift", "最长寿命死亡变化")}
        value={formatSignedDays(summary.maxDelta, locale)}
        hint={formatMaxAgeHint(summary.treatmentCurve, locale)}
      />
      <StatBlock
        label={dataset.profile.sampleMetricLabel}
        value={formatInteger(summary.treatmentCount, locale)}
        hint={t(
          locale,
          `${Math.round((summary.treatmentCurve.eventRate || 0) * 100)}% events`,
          `${formatInteger(Math.round((summary.treatmentCurve.eventRate || 0) * 100), locale)}% 事件`,
        )}
      />
      {dataset.profile.sexSupported ? (
        summary.treatmentStartAge != null || !summary.groupMeta?.strain ? (
          <StatBlock
            label={t(locale, "Start age", "起始年龄")}
            value={formatMonths(summary.treatmentStartAge, locale)}
            hint={getSexLabel(summary.sex, locale)}
          />
        ) : (
          <StatBlock
            label={t(locale, "Strain", "品系")}
            value={summary.groupMeta.strain}
            hint={summary.groupMeta.species || dataset.profile.combinedPopulationLabel}
          />
        )
      ) : (
        <StatBlock
          label={t(locale, "Strain", "品系")}
          value={summary.groupMeta?.strain || "—"}
          hint={summary.groupMeta?.species || dataset.profile.combinedPopulationLabel}
        />
      )}
    </div>
  );
}


function App() {
  const [locale, setLocale] = useState(() => getPreferredLocale());
  const [theme, setTheme] = useState(() => getPreferredTheme());
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
  const [humanAcmFilter, setHumanAcmFilter] = useState("all");
  const [compareKeys, setCompareKeys] = useState([]);
  const [compareSearch, setCompareSearch] = useState("");
  const [showComparisonControls, setShowComparisonControls] = useState(true);
  const [showInsightDescription, setShowInsightDescription] = useState(true);
  const [showSupportQrs, setShowSupportQrs] = useState(false);

  const selectedAnimalOption =
    ANIMAL_OPTIONS.find((option) => option.value === selectedAnimal) || ANIMAL_OPTIONS[0];
  const animalOptions = localizeValue(ANIMAL_OPTIONS, locale);
  const supportQrCodes = localizeValue(SUPPORT_QR_CODES, locale);
  const datasetAcknowledgements = localizeValue(DATASET_ACKNOWLEDGEMENTS, locale);
  const activeSourceKey = selectedAnimalOption.sourceKey;
  const activeSource = DATA_SOURCE_CONFIG[activeSourceKey];
  const dataset = datasetsByAnimal[selectedAnimal] || null;
  const datasetView = dataset ? localizeDatasetMetadata(dataset, locale) : null;
  const error = errorsBySource[activeSourceKey] || "";
  const siteTitle = translateDataText(SITE_TITLE, locale);
  const siteShortTitle = translateDataText(SITE_SHORT_TITLE, locale);
  const siteDescription = translateDataText(SITE_DESCRIPTION, locale);
  const pageTitle = error
    ? `${siteTitle} | ${t(locale, "Unable to load data", "无法加载数据")}`
    : datasetView
      ? `${siteTitle} | ${datasetView.profile.title}`
      : siteTitle;
  const pageDescription = datasetView?.profile?.description || siteDescription;

  useEffect(() => {
    const sourceAnimalOptions = ANIMAL_OPTIONS.filter(
      (option) => option.sourceKey === activeSourceKey,
    );

    if (
      sourceAnimalOptions.every((option) => datasetsByAnimal[option.value]) ||
      errorsBySource[activeSourceKey]
    ) {
      return undefined;
    }

    let isCancelled = false;
    const base = import.meta.env.BASE_URL;

    const loadSource =
      activeSource.load ||
      ((assetBase) =>
        Promise.all([
          activeSource.csvPath
            ? fetchTextAsset(assetBase, activeSource.csvPath)
            : Promise.resolve(null),
          activeSource.manifestPath
            ? fetchJsonAsset(assetBase, activeSource.manifestPath)
            : Promise.resolve(null),
        ]).then(([csvText, manifest]) => ({ csvText, manifest })));

    loadSource(base)
      .then(({ csvText, manifest }) => {
        if (isCancelled) {
          return;
        }

        const parsed = activeSource.parse(csvText, manifest);
        const nextAnimalViews = Object.fromEntries(
          sourceAnimalOptions.map((option) => [
            option.value,
            option.species ? filterDatasetBySpecies(parsed, option.species) : parsed,
          ]),
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
      setRankingMetric(dataset.profile.defaultRankingMetric || "median");
      setRankingScope("all");
      setHumanAcmFilter("all");
      setCompareKeys([]);
      setCompareSearch("");
      setShowComparisonControls(dataset.profile.allowCompare !== false);
      setShowInsightDescription(true);
    });
  }, [dataset, selectedAnimal]);

  const deferredCompareSearch = useDeferredValue(compareSearch);

  useEffect(() => {
    persistLocale(locale);
  }, [locale]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    window.localStorage?.setItem(THEME_STORAGE_KEY, theme);
    upsertMetaTag(
      'meta[name="theme-color"]',
      "name",
      "theme-color",
      isDark ? "#0b111a" : "#f5efe2",
    );
  }, [theme]);

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

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.documentElement.lang = locale;
    document.title = pageTitle;
    upsertMetaTag('meta[name="application-name"]', "name", "application-name", siteTitle);
    upsertMetaTag(
      'meta[name="apple-mobile-web-app-title"]',
      "name",
      "apple-mobile-web-app-title",
      siteShortTitle,
    );
    upsertMetaTag('meta[name="description"]', "name", "description", pageDescription);
    upsertMetaTag('meta[property="og:site_name"]', "property", "og:site_name", siteTitle);
    upsertMetaTag('meta[property="og:title"]', "property", "og:title", pageTitle);
    upsertMetaTag(
      'meta[property="og:description"]',
      "property",
      "og:description",
      pageDescription,
    );
    upsertMetaTag('meta[name="twitter:title"]', "name", "twitter:title", pageTitle);
    upsertMetaTag(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      pageDescription,
    );
  }, [locale, pageDescription, pageTitle, siteShortTitle, siteTitle]);

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
          <Badge variant="outline">{siteShortTitle}</Badge>
          <h1 className="font-display text-5xl font-semibold tracking-[-0.05em] text-foreground">
            {siteTitle}
          </h1>
          <p className="mx-auto max-w-xl text-sm uppercase tracking-[0.18em] text-muted-foreground">
            {t(locale, "Unable to load data", "无法加载数据")}
          </p>
          <p className="mx-auto max-w-xl text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (!dataset) {
    return (
      <div className="grid min-h-screen place-items-center bg-noise px-6 text-center">
        <div className="space-y-3">
          <Badge variant="outline">{siteShortTitle}</Badge>
          <h1 className="font-display text-5xl font-semibold tracking-[-0.05em] text-foreground">
            {siteTitle}
          </h1>
          <p className="mx-auto max-w-xl text-muted-foreground">
            {translateDataText(activeSource.loadingLabel, locale)}
          </p>
        </div>
      </div>
    );
  }

  const view = datasetView || dataset;
  const profile = view.profile;
  const overview = view.overview;
  const siteMeta = view.siteMeta;

  const activeSite = view.siteOptions.includes(selectedSite)
    ? selectedSite
    : view.defaultSite;
  const isHumanDataset = profile.id === "human";
  const canCompare = profile.allowCompare !== false;
  const fallbackCohort = overview.latestPublicCohort || view.cohorts[0] || "";
  const activeCohort = view.cohorts.includes(selectedCohort)
    ? selectedCohort
    : fallbackCohort;
  const currentGroups = view.groupsByCohort[activeCohort] || [];
  const activeGroup = currentGroups.includes(selectedGroup)
    ? selectedGroup
    : getDefaultGroupForCohort(view, currentGroups);
  const selectedCohortLabel = getCohortLabel(view, activeCohort);
  const focusLabel = getInterventionLabel(view, activeCohort, activeGroup);
  const selectedInterventionKey = getInterventionKey(activeCohort, activeGroup);
  const displayedCohorts = profile.reverseCohortPresentation
    ? [...view.cohorts].reverse()
    : view.cohorts;
  const displayedCohortOverview = profile.reverseCohortPresentation
    ? [...view.cohortOverview].reverse()
    : view.cohortOverview;
  const panelSexes =
    profile.sexSupported && sexMode === "split"
      ? ["m", "f"]
      : [
        profile.sexSupported
          ? sexMode === "male"
            ? "m"
            : sexMode === "female"
              ? "f"
              : "all"
          : "all",
      ];
  const panelSummaries = isHumanDataset
    ? []
    : panelSexes.map((sex) =>
      summarizeAgainstControl(view, {
        cohort: activeCohort,
        group: activeGroup,
        sex,
        site: activeSite,
      }),
    );

  const panelCharts = isHumanDataset
    ? []
    : panelSexes.map((sex) => ({
      sex,
      lines: buildPanelSeries(view, {
        focusCohort: activeCohort,
        focusGroup: activeGroup,
        compareKeys,
        sex,
        site: activeSite,
        showComparisonControls,
        focusLabelSuffix: t(locale, "focus", "当前"),
      }),
    }));

  const rankingCohorts =
    rankingScope === "all" ? view.cohorts : activeCohort ? [activeCohort] : [];
  const isMultiYearRanking = rankingCohorts.length > 1;
  const rankingRows = buildRankingRows(view, {
    cohorts: rankingCohorts,
    sex: profile.sexSupported ? rankingSex : "all",
    site: activeSite,
  });
  const humanPValueRankingRows = isHumanDataset
    ? rankingRows.filter(
      (row) => Number.isFinite(Number(row.acmPValue)) && Number(row.acmPValue) <= 0.05,
    )
    : rankingRows;
  const humanAcmFilterCounts = isHumanDataset
    ? humanPValueRankingRows.reduce(
      (counts, row) => {
        if (row.acmEffectPercent > 0) {
          counts.lower += 1;
        } else if (row.acmEffectPercent < 0) {
          counts.higher += 1;
        }
        return counts;
      },
      { all: humanPValueRankingRows.length, lower: 0, higher: 0 },
    )
    : { all: rankingRows.length, lower: 0, higher: 0 };
  const humanAcmFilterOptions = [
    {
      value: "all",
      label: `${t(locale, "All", "全部")} ${formatInteger(humanAcmFilterCounts.all, locale)}`,
    },
    {
      value: "lower",
      label: `${t(locale, "Lower ACM", "全因死亡率降低")} ${formatInteger(humanAcmFilterCounts.lower, locale)}`,
    },
    {
      value: "higher",
      label: `${t(locale, "Higher ACM", "全因死亡率升高")} ${formatInteger(humanAcmFilterCounts.higher, locale)}`,
    },
  ];
  const filteredRankingRows = isHumanDataset
    ? humanPValueRankingRows.filter((row) => {
      if (humanAcmFilter === "lower") {
        return row.acmEffectPercent > 0;
      }
      if (humanAcmFilter === "higher") {
        return row.acmEffectPercent < 0;
      }
      return true;
    })
    : rankingRows;
  const rankingSiteLabel = siteMeta[activeSite];
  const rankingSexLabel =
    profile.sexSupported
      ? rankingSex === "all"
        ? t(
          locale,
          `Combined-sex ${profile.sampleNounPlural}`,
          `合并性别 ${profile.sampleNounPlural}`,
        )
        : `${getSexLabel(rankingSex, locale)} ${profile.sampleNounPlural}`
      : profile.combinedPopulationLabel;
  const rankingScopeLabel = isMultiYearRanking
    ? t(
      locale,
      `All public ${profile.focusScopePlural}`,
      `全部公开${profile.focusScopePlural}`,
    )
    : selectedCohortLabel;
  const rankingMetricConfig = isHumanDataset
    ? {
      title: t(locale, "Human Biobank ACM effect", "人类 Biobank 全因死亡率影响"),
      subtitle: t(
        locale,
        "Human Biobank medication signals with reported P<=0.05, drawn from all 406 Data Table 2 N>=500 medication rows plus Figure 5 class rows and ranked by the reported ACM hazard-ratio effect.",
        "人类 Biobank 药物信号。仅展示报告 P<=0.05 的条目，来源包括 Data Table 2 中全部 406 个 N>=500 药物条目及图 5 类别条目，并按报告的全因死亡率风险比影响排序。",
      ),
      metricKey: "acmEffectPercent",
      dayMetricKey: null,
      curveMetricKey: null,
      curveMetricLabel: null,
      footnote: t(
        locale,
        "Effect is shown as 1 minus the reported ACM hazard ratio. Positive values indicate lower ACM; negative values indicate higher ACM. These retrospective Biobank associations do not remove indication or healthy-user confounding.",
        "影响值显示为 1 减去已报告的全因死亡率风险比。正值表示全因死亡率降低；负值表示全因死亡率升高。这些回顾性 Biobank 关联不能消除适应证或健康使用者混杂。",
      ),
      valueFormatter: formatAcmEffectDelta,
      axisStartLabel: t(locale, "Higher ACM", "全因死亡率升高"),
      axisEndLabel: t(locale, "Lower ACM", "全因死亡率降低"),
    }
    : rankingMetric === "max"
      ? {
        title: t(locale, "Oldest death age shift", "最长寿命死亡年龄变化"),
        subtitle: t(
          locale,
          `${rankingSexLabel} · ${rankingScopeLabel} · ${rankingSiteLabel}. Ranked by percent change versus matched control.`,
          `${rankingSexLabel} · ${rankingScopeLabel} · ${rankingSiteLabel}。按相对匹配对照的百分比变化排序。`,
        ),
        metricKey: "maxDeltaPercent",
        dayMetricKey: "maxDelta",
        curveMetricKey: "maxDay",
        curveMetricLabel: t(locale, "Oldest death", "最长寿命死亡"),
        footnote: t(
          locale,
          `Uses the oldest death event for each group. Longer last-observed ages from censored ${profile.sampleNounPlural} still appear in the spotlight when relevant.`,
          `每组使用最长寿命死亡事件。若相关，删失${profile.sampleNounPlural}的更长末次观察年龄仍会在当前条目信息中显示。`,
        ),
        axisStartLabel: t(locale, "Lower", "较低"),
        axisEndLabel: t(locale, "Higher", "较高"),
      }
      : rankingMetric === "p90"
        ? {
          title: t(locale, "90th percentile age shift", "第 90 百分位年龄变化"),
          subtitle: t(
            locale,
            `${rankingSexLabel} · ${rankingScopeLabel} · ${rankingSiteLabel}. Ranked by percent change in estimated 90th percentile age versus matched control.`,
            `${rankingSexLabel} · ${rankingScopeLabel} · ${rankingSiteLabel}。按估计第 90 百分位年龄相对匹配对照的百分比变化排序。`,
          ),
          metricKey: "p90DeltaPercent",
          dayMetricKey: "p90Delta",
          curveMetricKey: "p90Day",
          curveMetricLabel: t(locale, "90th pct", "第 90 百分位"),
          footnote: t(
            locale,
            "90th percentile age is the first age where Kaplan-Meier survival falls to 10%. This is descriptive and does not replace a formal late-life significance test.",
            "第 90 百分位年龄指 Kaplan-Meier 生存率首次降至 10% 的年龄。该指标仅供描述，不替代正式的晚寿期显著性检验。",
          ),
          axisStartLabel: t(locale, "Lower", "较低"),
          axisEndLabel: t(locale, "Higher", "较高"),
        }
        : {
          title: t(locale, "Median lifespan shift", "中位寿命变化"),
          subtitle: t(
            locale,
            `${rankingSexLabel} · ${rankingScopeLabel} · ${rankingSiteLabel}. Ranked by percent change versus matched control.`,
            `${rankingSexLabel} · ${rankingScopeLabel} · ${rankingSiteLabel}。按相对匹配对照的百分比变化排序。`,
          ),
          metricKey: "medianDeltaPercent",
          dayMetricKey: "medianDelta",
          curveMetricKey: "medianDay",
          curveMetricLabel: t(locale, "Median", "中位数"),
          footnote: t(
            locale,
            `Each row is a ${profile.focusScopeLabel}-matched comparison. Click any row to sync the survival explorer.`,
            `每一行都是同一${profile.focusScopeLabel}内的匹配比较。点击任一行即可同步下方的生存探索器。`,
          ),
          axisStartLabel: t(locale, "Lower", "较低"),
          axisEndLabel: t(locale, "Higher", "较高"),
        };
  const rankingMetricRows = sortRankingRowsByMetric(
    view,
    filteredRankingRows,
    rankingMetricConfig.metricKey,
  );
  const rankingChartRows = rankingMetricRows.map((row) => {
    const sampleSizeCount = isHumanDataset
      ? row.groupMeta?.acmPrescriptionUserCount ?? null
      : row.treatmentCount ?? null;
    const sampleSizeTitle = isHumanDataset
      ? t(locale, "Prescription users", "处方使用者")
      : t(locale, `Treatment ${profile.sampleNounPlural}`, `处理组${profile.sampleNounPlural}`);

    return {
      ...row,
      key: getInterventionKey(row.cohort, row.group),
      label: getInterventionLabel(view, row.cohort, row.group),
      metaLabel:
        isHumanDataset
          ? row.groupMeta?.condition || null
          : profile.id === "citp"
            ? [
              getCohortMeta(view, row.cohort).secondaryLabel,
              getCohortMeta(view, row.cohort).shortLabel,
            ]
              .filter(Boolean)
              .join(" ")
            : getCohortShortLabel(view, row.cohort),
      description: getInterventionDescription(view, row.cohort, row.group),
      pubmed: getInterventionPubMedReference(view, row.cohort, row.group),
      datasetLink:
        isHumanDataset && row.groupMeta?.acmDatasetUrl
          ? {
            label: row.groupMeta.acmDatasetLabel || t(locale, "Dataset", "数据集"),
            url: row.groupMeta.acmDatasetUrl,
            title: row.groupMeta.acmDatasetDetail || row.groupMeta.acmSourceTable || null,
          }
          : null,
      sampleSizeLabel:
        sampleSizeCount != null ? `N=${formatInteger(sampleSizeCount, locale)}` : null,
      sampleSizeTitle: sampleSizeCount != null ? sampleSizeTitle : null,
    };
  });
  const selectedRankingRow =
    rankingMetricRows.find(
      (row) =>
        getInterventionKey(row.cohort, row.group) === selectedInterventionKey,
    ) || null;
  const activeRankingRow = selectedRankingRow || rankingMetricRows[0] || null;
  const activeRankingKey = activeRankingRow
    ? getInterventionKey(activeRankingRow.cohort, activeRankingRow.group)
    : "";
  const activeInterventionEvidence = activeRankingRow
    ? getInterventionEvidence(
      view,
      activeRankingRow.cohort,
      activeRankingRow.group,
    )
    : null;
  const activeInterventionDescription = activeRankingRow
    ? getInterventionDescription(view, activeRankingRow.cohort, activeRankingRow.group)
    : null;
  const activeInterventionPathway = activeRankingRow
    ? getInterventionPathway(view, activeRankingRow.cohort, activeRankingRow.group)
    : null;
  const activeInterventionPubMed = activeRankingRow
    ? getInterventionPubMedReference(
      view,
      activeRankingRow.cohort,
      activeRankingRow.group,
    )
    : null;
  const hasInsightDetails = Boolean(
    activeInterventionDescription ||
    activeInterventionPathway?.ascii ||
    activeInterventionPubMed?.citation,
  );

  const compareLibrary = view.compareOptions.filter((option) => {
    if (!canCompare) {
      return false;
    }

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
    ? t(
      locale,
      `Intervention leaderboard across public ${profile.focusScopePlural}`,
      `公开${profile.focusScopePlural}干预排行榜`,
    )
    : t(
      locale,
      `Intervention leaderboard for ${selectedCohortLabel}`,
      `${selectedCohortLabel}干预排行榜`,
    );
  const rankingBody = isHumanDataset
    ? t(
      locale,
      "Scan the UK Biobank ACM intervention signals, then click any row to inspect the hazard ratio, source table, drug description, and caution notes.",
      "浏览 UK Biobank 全因死亡率干预信号，然后点击任一条目查看风险比、来源表、药物描述和谨慎解读说明。",
    )
    : t(
      locale,
      "Scan the full intervention set in one horizontal leaderboard, then click any row to load that treatment in the survival explorer below.",
      "在横向排行榜中浏览全部干预集合，然后点击任一行，将该处理加载到下方生存探索器中。",
    );
  const rankingScopeHint = isMultiYearRanking
    ? t(
      locale,
      `${formatInteger(rankingMetricRows.length, locale)} rows across ${formatInteger(rankingCohorts.length, locale)} ${profile.focusScopePlural}`,
      `${formatInteger(rankingMetricRows.length, locale)} 行，覆盖 ${formatInteger(rankingCohorts.length, locale)} 个${profile.focusScopePlural}`,
    )
    : t(
      locale,
      `${formatInteger(rankingMetricRows.length, locale)} rows in ${selectedCohortLabel}`,
      `${selectedCohortLabel} 中共 ${formatInteger(rankingMetricRows.length, locale)} 行`,
    );

  const selectedLabel = activeRankingRow
    ? getInterventionLabel(view, activeRankingRow.cohort, activeRankingRow.group)
    : t(locale, "No ranked row", "暂无排名行");
  const primaryMetric = isHumanDataset
    ? {
      label: t(locale, "ACM effect", "全因死亡率影响"),
      value: activeRankingRow ? formatAcmEffect(activeRankingRow.acmEffectPercent, locale) : "—",
      hint: activeRankingRow?.acmHazardRatio
        ? t(
          locale,
          `HR ${activeRankingRow.acmHazardRatio.toFixed(2)}`,
          `HR ${activeRankingRow.acmHazardRatio.toFixed(2)}`,
        )
        : t(locale, "Biobank-only signal", "仅 Biobank 信号"),
    }
    : rankingMetric === "max"
      ? {
        label: t(locale, "Oldest death shift", "最长寿命死亡变化"),
        value: activeRankingRow ? formatSignedDays(activeRankingRow.maxDelta, locale) : "—",
        hint: activeRankingRow
          ? formatSignedPercent(activeRankingRow.maxDeltaPercent, locale)
          : t(locale, "No value", "无数值"),
      }
      : rankingMetric === "p90"
        ? {
          label: t(locale, "90th pct shift", "第 90 百分位变化"),
          value: activeRankingRow ? formatSignedDays(activeRankingRow.p90Delta, locale) : "—",
          hint: activeRankingRow
            ? formatSignedPercent(activeRankingRow.p90DeltaPercent, locale)
            : t(locale, "No value", "无数值"),
        }
        : {
          label: t(locale, "Median shift", "中位变化"),
          value: activeRankingRow ? formatSignedDays(activeRankingRow.medianDelta, locale) : "—",
          hint: activeRankingRow
            ? formatSignedPercent(activeRankingRow.medianDeltaPercent, locale)
            : t(locale, "No value", "无数值"),
        };
  const showCohortSelector = displayedCohorts.length > 1;
  const showSiteSelector = view.siteOptions.length > 1;
  const showScopeToggle = !isHumanDataset && displayedCohorts.length > 1;

  return (
    <div className="min-h-screen bg-noise text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1480px] flex-col gap-4 px-3 py-3 sm:gap-6 sm:px-6 sm:py-4 lg:px-8">
        <header className="relative animate-in fade-in slide-in-from-top-4 duration-700 overflow-hidden rounded-[32px] border border-border/70 bg-[linear-gradient(155deg,rgba(255,255,255,0.94),rgba(255,255,255,0.8),rgba(232,239,242,0.92))] shadow-panel p-4 sm:p-5 flex flex-col gap-4 dark:bg-[linear-gradient(155deg,rgba(25,36,49,0.94),rgba(15,24,35,0.92),rgba(30,39,48,0.9))]">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-80 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(212,106,54,0.12), transparent 34%), radial-gradient(circle at left center, rgba(23,96,135,0.12), transparent 42%)",
            }}
          />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="bg-white/60 shadow-sm border-border/70 text-[10px] py-0.5">
                  {profile.title}
                </Badge>
                <Badge variant="outline" className="bg-white/60 shadow-sm border-border/70 text-[10px] py-0.5">
                  {overview.releaseTag}
                </Badge>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight leading-none text-foreground">
                {siteTitle}
              </h1>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[640px]">
                {profile.description}
              </p>
            </div>

            <div className="flex flex-col items-start gap-2.5 self-start md:items-end md:self-auto">
              <div className="flex flex-wrap items-center gap-2 md:justify-end">
                <div className="flex items-center gap-1 rounded-full border border-border/50 bg-white/55 p-1 shadow-sm">
                  <span className="px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                    {t(locale, "Language", "语言")}
                  </span>
                  {LANGUAGE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={cn(
                        "rounded-full px-3 py-1 text-[10px] font-bold transition-colors",
                        locale === option.value
                          ? "bg-foreground text-background shadow-sm"
                          : "text-muted-foreground hover:bg-white hover:text-foreground",
                      )}
                      onClick={() => setLocale(option.value)}
                    >
                      {option.shortLabel}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1 rounded-full border border-border/50 bg-white/55 p-1 shadow-sm">
                  <span className="px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
                    {t(locale, "Theme", "主题")}
                  </span>
                  {THEME_OPTIONS.map((option) => {
                    const Icon = option.Icon;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        className={cn(
                          "inline-flex h-6 items-center gap-1 rounded-full px-2.5 text-[10px] font-bold transition-colors",
                          theme === option.value
                            ? "bg-foreground text-background shadow-sm"
                            : "text-muted-foreground hover:bg-white hover:text-foreground",
                        )}
                        aria-pressed={theme === option.value}
                        onClick={() => setTheme(option.value)}
                      >
                        <Icon className="h-3 w-3" />
                        <span>{t(locale, option.label, option.labelZh)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-[22px] border border-border/50 bg-white/50 px-3 py-2 shadow-sm sm:flex-nowrap sm:gap-1.5 sm:rounded-full sm:px-4 sm:py-1.5">
                {[
                  { label: profile.sampleStatLabel, val: overview.sampleCount },
                  { label: profile.interventionStatLabel, val: overview.interventionCount },
                  { label: profile.cohortStatLabel, val: overview.cohortCount },
                ].map((s, i) => (
                  <div key={s.label} className="flex items-center">
                    {i > 0 && <div className="mx-3 hidden h-3.5 w-px bg-border/70 sm:block" />}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                        {s.label}
                      </span>
                      <span className="text-sm font-semibold tracking-tight font-display whitespace-nowrap">
                        {formatInteger(s.val, locale)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
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
              <div className="flex flex-col gap-3 rounded-[22px] border border-border/70 bg-white/40 p-3 shadow-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:p-2">
                <div className="flex flex-col gap-1.5 px-0 sm:flex-row sm:items-center sm:gap-2 sm:px-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 whitespace-nowrap">
                    {t(locale, "Species", "物种")}
                  </span>
                  <NativeSelect
                    value={selectedAnimal}
                    onChange={(event) => setSelectedAnimal(event.target.value)}
                    className="h-7 w-full py-0 rounded-full border-border/70 bg-white text-xs sm:w-auto sm:min-w-[150px]"
                  >
                    {animalOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.menuLabel || option.label}
                      </option>
                    ))}
                  </NativeSelect>
                </div>

                {(showCohortSelector || showSiteSelector) ? (
                  <>
                    <div className="hidden h-4 w-px bg-border/70 sm:block" />
                    <div className="flex flex-col gap-2 border-b border-border/50 pb-3 sm:flex-row sm:items-center sm:gap-2 sm:border-b-0 sm:border-r sm:pb-0 sm:pl-2 sm:pr-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 whitespace-nowrap">
                        {t(locale, "Settings", "设置")}
                      </span>
                      {showCohortSelector ? (
                        <NativeSelect
                          value={activeCohort}
                          onChange={(e) => updateCohort(e.target.value)}
                          className={cn(
                            "h-7 w-full py-0 rounded-full border-border/70 bg-white text-xs sm:w-auto",
                            profile.id === "citp" ? "sm:min-w-[220px]" : "sm:min-w-[90px]",
                          )}
                        >
                          {displayedCohorts.map((cohort) => (
                            <option key={cohort} value={cohort}>
                              {getCohortLabel(view, cohort)}
                            </option>
                          ))}
                        </NativeSelect>
                      ) : null}
                      {showSiteSelector ? (
                        <NativeSelect
                          value={activeSite}
                          onChange={(e) => setSelectedSite(e.target.value)}
                          className="h-7 w-full py-0 rounded-full border-border/70 bg-white text-xs sm:w-auto sm:min-w-[100px]"
                        >
                          {view.siteOptions.map((site) => (
                            <option key={site} value={site}>
                              {siteMeta[site]}
                            </option>
                          ))}
                        </NativeSelect>
                      ) : null}
                    </div>
                  </>
                ) : null}

                <div className="flex flex-col gap-3 px-0 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:px-2">
                  <ToggleChipGroup
                    compact
                    label={t(locale, "Metric", "指标")}
                    value={isHumanDataset ? "acm" : rankingMetric}
                    options={
                      isHumanDataset
                        ? [
                          { value: "acm", label: t(locale, "ACM effect", "全因死亡率影响") },
                        ]
                        : [
                          { value: "median", label: t(locale, "Median", "中位数") },
                          { value: "p90", label: t(locale, "90th", "第 90 百分位") },
                          { value: "max", label: t(locale, "Oldest", "最长寿命") },
                        ]
                    }
                    onChange={setRankingMetric}
                  />
                  {isHumanDataset ? (
                    <>
                      <div className="hidden h-4 w-px bg-border/70 sm:block" />
                      <ToggleChipGroup
                        compact
                        label={t(locale, "Filter", "筛选")}
                        value={humanAcmFilter}
                        options={humanAcmFilterOptions}
                        onChange={setHumanAcmFilter}
                      />
                    </>
                  ) : null}
                  {showScopeToggle ? (
                    <>
                      <div className="hidden h-4 w-px bg-border/70 sm:block" />
                      <ToggleChipGroup
                        compact
                        label={t(locale, "Scope", "范围")}
                        value={rankingScope}
                        options={[
                          { value: "focus", label: t(locale, "Focus", "当前") },
                          { value: "all", label: t(locale, "All", "全部") },
                        ]}
                        onChange={setRankingScope}
                      />
                    </>
                  ) : null}
                  {profile.sexSupported ? (
                    <>
                      <div className="hidden h-4 w-px bg-border/70 sm:block" />
                      <ToggleChipGroup
                        compact
                        label={t(locale, "Sex", "性别")}
                        value={rankingSex}
                        options={[
                          { value: "m", label: getSexLabel("m", locale) },
                          { value: "f", label: getSexLabel("f", locale) },
                          { value: "all", label: getSexLabel("all", locale) },
                        ]}
                        onChange={setRankingSex}
                      />
                    </>
                  ) : null}
                </div>
              </div>

              <div className="group relative flex flex-col gap-4 overflow-hidden rounded-[22px] border border-primary/20 bg-white/95 px-4 py-4 shadow-sm transition-all duration-300 hover:border-primary/40 sm:px-5 sm:py-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                <div className="relative flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
                  <div className="flex flex-col min-w-0">
                    <div className="flex min-w-0 flex-wrap items-start gap-2">
                      <p className="min-w-0 break-words font-display text-base font-bold leading-tight tracking-tight text-foreground sm:text-lg">
                        {selectedLabel}
                      </p>
                      {hasInsightDetails && (
                        <button
                          type="button"
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-[10px] font-black leading-none text-primary/80 transition-colors hover:bg-primary/10 hover:text-primary"
                          aria-expanded={showInsightDescription}
                          aria-controls="insight-details"
                          aria-label={t(
                            locale,
                            `${showInsightDescription ? "Hide" : "Show"} details for ${selectedLabel}`,
                            `${showInsightDescription ? "隐藏" : "显示"} ${selectedLabel} 的详情`,
                          )}
                          onClick={() =>
                            setShowInsightDescription((current) => !current)
                          }
                        >
                          ?
                        </button>
                      )}
                      {activeInterventionPubMed?.url ? (
                        <a
                          href={activeInterventionPubMed.url}
                          target="_blank"
                          rel="noreferrer"
                          title={activeInterventionPubMed.citation || t(locale, "Search PubMed", "在 PubMed 中搜索")}
                          className="inline-flex h-5 shrink-0 items-center rounded-full border border-primary/20 bg-primary/5 px-2 text-[9px] font-bold uppercase tracking-[0.16em] text-primary/85 transition-colors hover:bg-primary/10 hover:text-primary"
                        >
                          PubMed
                        </a>
                      ) : null}
                      {activeRankingRow?.cohort && activeRankingRow.cohort !== activeCohort && (
                        <Badge variant="outline" className="text-[9px] py-0 px-1.5 font-bold h-4 border-primary/20 bg-primary/5 text-primary/80 whitespace-nowrap">{getCohortShortLabel(view, activeRankingRow.cohort)}</Badge>
                      )}
                    </div>
                    {showInsightDescription && hasInsightDetails && (
                      <div
                        id="insight-details"
                        className="mt-2 max-w-4xl rounded-[14px] border border-primary/15 bg-primary/5 px-3 py-2"
                      >
                        <div className="flex flex-col gap-3">
                          {activeInterventionDescription ? (
                            <p className="max-w-3xl text-[11px] leading-5 text-muted-foreground">
                              {activeInterventionDescription}
                            </p>
                          ) : null}
                          {activeInterventionPubMed?.citation ? (
                            <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                              <span>{activeInterventionPubMed.citation}</span>
                              {activeInterventionPubMed.detail ? (
                                <span className="text-muted-foreground/70">
                                  {activeInterventionPubMed.detail}
                                </span>
                              ) : null}
                            </div>
                          ) : null}
                          {activeInterventionPathway?.ascii ? (
                            <div className="w-full max-w-[560px] rounded-[12px] border border-primary/12 bg-white/70 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80">
                                {translateDataText(activeInterventionPathway.label, locale)}
                              </p>
                              <div className="mt-2 overflow-x-auto">
                                <pre className="m-0 min-w-max whitespace-pre font-mono text-[10px] leading-4 text-foreground/85">
                                  {translateDataText(activeInterventionPathway.ascii, locale)}
                                </pre>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative flex w-full items-start justify-between gap-3 border-t border-border/60 pt-3 lg:w-auto lg:shrink-0 lg:self-center lg:border-t-0 lg:pt-0">
                  <div className="hidden h-8 w-px bg-border/70 lg:block" />
                  <div className="flex flex-col items-start lg:items-end">
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
              locale={locale}
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
              valueDomain={rankingMetricConfig.valueDomain}
              visualValueCap={100}
              valueFormatter={rankingMetricConfig.valueFormatter}
              axisStartLabel={rankingMetricConfig.axisStartLabel}
              axisEndLabel={rankingMetricConfig.axisEndLabel}
            />
          </CardContent>
        </Card>

        {!isHumanDataset ? (
        <Card className="overflow-hidden border-border/70 bg-card/80 shadow-none">
          <div className="grid lg:grid-cols-[340px_minmax(0,1fr)]">
            <aside className="border-b border-border/70 bg-white/45 lg:border-b-0 lg:border-r">
              <CardContent className="space-y-6 p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {profile.focusGroupLabel}
                    </label>
                    <NativeSelect
                      value={activeGroup}
                      onChange={(event) => updateGroup(event.target.value)}
                    >
                      {currentGroups.map((group) => (
                        <option key={group} value={group}>
                          {getInterventionLabel(view, activeCohort, group)}
                        </option>
                      ))}
                    </NativeSelect>
                  </div>

                  {profile.sexSupported ? (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-foreground">
                        {t(locale, "Sex layout", "性别布局")}
                      </p>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {[
                          { value: "split", label: t(locale, "Split", "分栏") },
                          { value: "combined", label: t(locale, "Combined", "合并") },
                          { value: "male", label: getSexLabel("m", locale) },
                          { value: "female", label: getSexLabel("f", locale) },
                        ].map((option) => (
                          <Button
                            key={option.value}
                            type="button"
                            variant={sexMode === option.value ? "default" : "outline"}
                            className="h-auto min-h-11 rounded-2xl px-3 py-2 whitespace-normal leading-tight"
                            onClick={() => setSexMode(option.value)}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : profile.singlePanelNotice ? (
                    <div className="rounded-[22px] border border-border/70 bg-secondary/30 p-4 text-sm text-muted-foreground">
                      {profile.singlePanelNotice}
                    </div>
                  ) : (
                    null
                  )}
                </div>

                {canCompare ? (
                  <div className="space-y-4 rounded-[24px] border border-border/70 bg-secondary/45 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                          {profile.compareSectionLabel}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {profile.comparisonHelperText ||
                            t(
                              locale,
                              `Search ${profile.focusScopeLabel}. Four overlays max.`,
                              `搜索${profile.focusScopeLabel}。最多叠加四条曲线。`,
                            )}
                        </p>
                      </div>
                      <Badge variant="outline">{compareKeys.length}/4</Badge>
                    </div>

                    <div className="relative">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="pl-9"
                        placeholder={profile.comparisonSearchPlaceholder}
                        value={compareSearch}
                        onChange={(event) => setCompareSearch(event.target.value)}
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {compareKeys.length ? (
                        compareKeys.map((key) => {
                          const { cohort, group } = parseInterventionKey(key);
                          const label = getInterventionLabel(view, cohort, group);
                          return (
                            <Button
                              key={key}
                              type="button"
                              variant="secondary"
                              size="sm"
                              className="h-auto rounded-full py-2 text-left whitespace-normal"
                              onClick={() => toggleCompareKey(key)}
                            >
                              {label} · {getCohortShortLabel(view, cohort)}
                            </Button>
                          );
                        })
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          {t(locale, "No comparison overlays selected yet.", "尚未选择比较叠加曲线。")}
                        </p>
                      )}
                    </div>

                    <div className="max-h-72 space-y-2 overflow-auto pr-1">
                      {compareLibrary.map((option) => (
                        <button
                          key={option.key}
                          type="button"
                          className={cn(
                            "flex w-full flex-col items-start gap-2 rounded-2xl border px-4 py-3 text-left transition-all duration-200 sm:flex-row sm:items-center sm:justify-between",
                            compareKeys.includes(option.key)
                              ? "border-primary/30 bg-primary/10 text-foreground"
                              : "border-border/70 bg-white/70 text-foreground hover:-translate-y-0.5 hover:bg-white",
                          )}
                          onClick={() => toggleCompareKey(option.key)}
                        >
                          <span className="font-medium">{option.label}</span>
                          <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                            {getCohortShortLabel(view, option.cohort)}
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
                      <span>
                        {t(
                          locale,
                          `Show ${profile.focusScopeLabel}-specific control overlays`,
                          `显示${profile.focusScopeLabel}特异的对照叠加曲线`,
                        )}
                      </span>
                    </label>
                  </div>
                ) : null}
              </CardContent>
            </aside>

            <div className="space-y-6 p-4 sm:p-6">
              {/* <SectionHeader
                label={profile.focusSectionLabel}
                title={t(
                  locale,
                  `${selectedCohortLabel} ${isHumanDataset ? "evidence" : "survival"} explorer`,
                  `${selectedCohortLabel}${isHumanDataset ? "证据" : "生存"}探索器`,
                )}
                body={profile.focusSectionBody}
                actions={
                  <div className="flex w-full items-center gap-2 rounded-[18px] border border-border/70 bg-white/70 px-4 py-2 text-sm text-muted-foreground sm:w-auto sm:rounded-full">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>{profile.siteLabel}: {siteMeta[activeSite]}</span>
                  </div>
                }
              /> */}

              <div className="grid grid-cols-2 gap-2 rounded-[24px] border border-border/70 bg-white/55 p-3 sm:flex sm:flex-wrap">
                {displayedCohortOverview.map((entry) => {
                  return (
                    <button
                      key={entry.cohort}
                      type="button"
                      className={cn(
                        "group flex min-h-[88px] flex-col items-center justify-center gap-1 rounded-[16px] border px-2 py-2.5 text-center transition-all duration-200 sm:min-w-[90px] sm:flex-1",
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
                          {formatInteger(entry.sampleCount, locale)} {profile.cohortSampleSuffix || "n"}
                        </span>
                        <div className="w-[3px] h-[3px] rounded-full bg-border/80" />
                        <span className="text-[9px] font-semibold text-muted-foreground">
                          {formatInteger(entry.interventionCount, locale)} {profile.cohortInterventionSuffix || "tx"}
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
                      <FocusInsight dataset={view} locale={locale} summary={panelSummaries[index]} />
                      <SurvivalChart
                        locale={locale}
                        title={t(
                          locale,
                          `${getSexLabel(panel.sex, locale)} survival`,
                          `${getSexLabel(panel.sex, locale)}生存曲线`,
                        )}
                        subtitle={t(
                          locale,
                          `${focusLabel} against matched control${activeSite === view.defaultSite
                            ? ` across ${profile.siteAllLabel.toLowerCase()}`
                            : ` at ${siteMeta[activeSite]}`
                          }.`,
                          `${focusLabel} 对比匹配对照${activeSite === view.defaultSite
                            ? `，覆盖${profile.siteAllLabel}`
                            : `，位于 ${siteMeta[activeSite]}`
                          }。`,
                        )}
                        lines={panel.lines}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Card>
        ) : null}

        <Card className="relative overflow-hidden border-border/70 bg-[linear-gradient(160deg,rgba(255,255,255,0.94),rgba(246,239,228,0.92),rgba(244,246,248,0.96))] shadow-none dark:bg-[linear-gradient(160deg,rgba(22,32,44,0.94),rgba(15,24,35,0.92),rgba(24,32,42,0.96))]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(circle at top left, rgba(212,106,54,0.12), transparent 32%), radial-gradient(circle at bottom right, rgba(23,96,135,0.12), transparent 38%)",
            }}
          />
          <CardContent className="relative p-6 text-sm text-muted-foreground lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-6 text-muted-foreground">
                {locale === "en" ? (
                  <>
                    This website is created by{" "}
                    <a
                      href="https://github.com/Rika321/itp-atlas"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {" "}
                      Rika{" "}
                    </a>{" "}
                    with <span className="font-medium text-foreground">Curiosity</span>.
                  </>
                ) : (
                  <>
                    这个网站来自于{" "}
                    <a
                      href="https://github.com/Rika321/itp-atlas"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {" "}
                      Rika{" "}
                    </a>{" "}
                    对生物学的好奇心。
                  </>
                )}
              </p>
              <Button
                type="button"
                variant="outline"
                className="rounded-full bg-white/80 px-4"
                aria-expanded={showSupportQrs}
                aria-controls="support-qr-panel"
                onClick={() => setShowSupportQrs((current) => !current)}
              >
                <FlaskConical className="mr-2 h-4 w-4" />
                {showSupportQrs
                  ? t(locale, "Hide QR Codes", "隐藏二维码")
                  : t(locale, "Buy Rika a milligram of Rapamycin", "帮 Rika 买一毫克雷帕霉素")}
              </Button>
            </div>

            {showSupportQrs ? (
              <div
                id="support-qr-panel"
                className="mt-5 w-full max-w-[920px] rounded-[24px] border border-border/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(248,241,233,0.92))] p-4 shadow-[0_20px_52px_-42px_rgba(17,33,49,0.42)] sm:p-5 dark:bg-[linear-gradient(180deg,rgba(22,32,44,0.86),rgba(15,24,35,0.92))] dark:shadow-[0_20px_52px_-42px_rgba(0,0,0,0.75)]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-xl space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      {t(locale, "Support", "支持")}
                    </p>
                    <p className="font-display text-xl font-semibold tracking-tight text-foreground">
                      {t(locale, "Buy me a milligram of Rapamycin", "帮我买一毫克雷帕霉素")}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-white/75 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
                    <FlaskConical className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {supportQrCodes.map((method) => (
                    <SupportQrCard key={method.key} locale={locale} method={method} />
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-5 border-t border-border/60 pt-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t(locale, "Acknowledgements", "鸣谢")}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {datasetAcknowledgements.map((source) =>
                  source.href ? (
                    <a
                      key={source.label}
                      className="inline-flex items-center rounded-full border border-border/70 bg-white/75 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-white hover:text-primary"
                      href={source.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {source.label}
                    </a>
                  ) : (
                    <span
                      key={source.label}
                      className="inline-flex items-center rounded-full border border-border/70 bg-white/75 px-3 py-1.5 text-xs font-medium text-foreground"
                    >
                      {source.label}
                    </span>
                  ),
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;

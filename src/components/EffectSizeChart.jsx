import { useState } from "react";
import { scaleLinear } from "d3";
import { formatInteger, formatSignedDays, formatSignedPercent } from "../lib/itp";
import { getIntlLocale, t } from "../lib/i18n";
import { cn } from "../lib/utils";

function formatTick(value, locale) {
  const precision = Math.abs(value) < 5 ? 1 : 0;
  const formattedValue = new Intl.NumberFormat(getIntlLocale(locale), {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(Math.abs(value));

  return `${value > 0 ? "+" : value < 0 ? "-" : ""}${formattedValue}%`;
}

function formatRank(index) {
  return String(index + 1).padStart(2, "0");
}

function formatCurveMetricLabel(row, curveMetricKey, curveMetricLabel, locale) {
  if (!curveMetricKey || !curveMetricLabel) {
    return null;
  }

  const metricDay = row.treatmentCurve?.[curveMetricKey];
  if (metricDay == null) {
    return null;
  }

  return `${curveMetricLabel} ${formatInteger(metricDay, locale)} ${
    locale === "zh-CN" ? "天" : "d"
  }`;
}

function defaultValueFormatter(value, locale) {
  return formatSignedPercent(value, locale);
}

function defaultAuxValueFormatter(value, locale) {
  return formatSignedDays(value, locale);
}

function clampVisualValue(value, cap) {
  if (cap == null || !Number.isFinite(cap) || cap <= 0) {
    return value;
  }

  return Math.max(-cap, Math.min(cap, value));
}

function formatPValue(value) {
  if (value == null || Number.isNaN(value)) {
    return null;
  }

  if (value < 0.001) {
    return "p<0.001";
  }

  return `p=${value.toFixed(3)}`;
}

function StatisticalSignificanceBadge({ locale, pValue, testLabel, className }) {
  const label = formatPValue(pValue) || "p<0.05";
  const defaultTestLabel = t(locale, "Overall survival log-rank", "总体生存 log-rank");
  const resolvedTestLabel = testLabel || defaultTestLabel;
  const detail =
    pValue != null
      ? t(
        locale,
        `${resolvedTestLabel} ${formatPValue(pValue)} vs matched control`,
        `${resolvedTestLabel} ${formatPValue(pValue)}，对比匹配对照`,
      )
      : t(
        locale,
        `${resolvedTestLabel} p<0.05 vs matched control`,
        `${resolvedTestLabel} p<0.05，对比匹配对照`,
      );

  return (
    <span
      title={detail}
      aria-label={detail}
      className={cn(
        "inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-amber-400/50 bg-amber-50 px-1.5 py-0.5 text-[9px] font-bold tracking-[0.08em] text-amber-800",
        className,
      )}
    >
      {label}
    </span>
  );
}

function PubMedBadge({ locale, pubmed, className }) {
  if (!pubmed?.url) {
    return null;
  }

  return (
    <a
      href={pubmed.url}
      target="_blank"
      rel="noreferrer"
      title={pubmed.citation || t(locale, "Search PubMed", "在 PubMed 中搜索")}
      className={cn(
        "inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-primary/85 transition-colors hover:bg-primary/10 hover:text-primary",
        className,
      )}
      onClick={(event) => event.stopPropagation()}
    >
      {pubmed.label || "PubMed"}
    </a>
  );
}

function DatasetBadge({ locale, datasetLink, className }) {
  if (!datasetLink?.url) {
    return null;
  }

  return (
    <a
      href={datasetLink.url}
      target="_blank"
      rel="noreferrer"
      title={datasetLink.title || t(locale, "Dataset", "数据集")}
      className={cn(
        "inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-primary/20 bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-primary/85 transition-colors hover:bg-primary/10 hover:text-primary",
        className,
      )}
      onClick={(event) => event.stopPropagation()}
    >
      {datasetLink.label || t(locale, "Dataset", "数据集")}
    </a>
  );
}

function SampleSizeBadge({ label, title }) {
  if (!label) {
    return null;
  }

  return (
    <span
      title={title || label}
      className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-border/60 bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground tabular-nums"
    >
      {label}
    </span>
  );
}

function EffectLane({ value, positionScale, isSelected }) {
  const zeroPosition = positionScale(0);
  const valuePosition = positionScale(value);
  const left = Math.min(zeroPosition, valuePosition);
  const width = Math.max(Math.abs(valuePosition - zeroPosition), 1.2);
  const isPositive = value >= 0;

  return (
    <div className="relative h-10 overflow-hidden rounded-full border border-border/60 bg-white/85 dark:bg-secondary/55">
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(23,96,135,0.08) 0%, rgba(23,96,135,0.03) 42%, rgba(17,33,49,0.02) 50%, rgba(212,106,54,0.03) 58%, rgba(212,106,54,0.08) 100%)",
        }}
      />
      <div
        className="absolute inset-y-2 w-px -translate-x-1/2 bg-border/90"
        style={{ left: `${zeroPosition}%` }}
      />
      <div
        className={cn(
          "absolute top-1/2 h-4 -translate-y-1/2 rounded-full shadow-sm",
          isPositive ? "bg-primary" : "bg-[hsl(var(--chart-1))]",
          isSelected && "ring-2 ring-foreground/55",
        )}
        style={{
          left: `${left}%`,
          width: `${width}%`,
        }}
      />
      <div
        className={cn(
          "absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm",
          isPositive ? "bg-primary" : "bg-[hsl(var(--chart-1))]",
          isSelected && "ring-2 ring-foreground/55",
        )}
        style={{ left: `clamp(0.5rem, ${valuePosition}%, calc(100% - 0.5rem))` }}
      />
    </div>
  );
}

function EffectValue({
  value,
  dayValue,
  curveMetricValueLabel,
  isSelected,
  locale,
  valueFormatter,
  auxValueFormatter,
}) {
  const isPositive = value >= 0;

  return (
    <div className="flex min-w-[132px] flex-col items-end gap-1 text-right sm:min-w-[148px]">
      <div className="flex flex-wrap items-center justify-end gap-2">
        <span
          className={cn(
            "inline-flex min-w-[84px] items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold tabular-nums",
            isSelected
              ? isPositive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-[hsl(var(--chart-1))] text-background shadow-sm"
              : isPositive
                ? "bg-primary/10 text-primary"
                : "bg-[rgba(23,96,135,0.12)] text-[hsl(var(--chart-1))]",
          )}
        >
          {valueFormatter(value, locale)}
        </span>
        {dayValue != null ? (
          <span
            className={cn(
              "text-xs font-semibold tabular-nums",
              isSelected
                ? "text-foreground"
                : isPositive
                ? "text-primary"
                : "text-[hsl(var(--chart-1))]",
            )}
          >
            {auxValueFormatter(dayValue, locale)}
          </span>
        ) : null}
      </div>
      {curveMetricValueLabel ? (
        <span
          className={cn(
            "text-[11px] font-medium tabular-nums",
            isSelected ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {curveMetricValueLabel}
        </span>
      ) : null}
    </div>
  );
}

function EffectRow({
  index,
  row,
  selectedKey,
  onSelect,
  positionScale,
  showMetaLabels,
  curveMetricKey,
  curveMetricLabel,
  locale,
  valueFormatter,
  auxValueFormatter,
}) {
  const isSelected = row.key === selectedKey;
  const label = row.label || row.group;
  const isStatisticallySignificant = Boolean(row.isStatisticallySignificant);
  const curveMetricValueLabel = formatCurveMetricLabel(
    row,
    curveMetricKey,
    curveMetricLabel,
    locale,
  );
  const hasExpandedDetails = Boolean(row.description || row.pubmed?.citation);
  const [showDescription, setShowDescription] = useState(false);

  function handleSelect() {
    onSelect?.(row);
  }

  function handleKeyDown(event) {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect();
    }
  }

  function toggleDescription(event) {
    event.stopPropagation();
    setShowDescription((current) => !current);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        "w-full cursor-pointer text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/30",
        isSelected ? "bg-white/85" : "hover:bg-white/55",
      )}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
    >
      <div className="grid gap-3 px-4 py-3 md:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/70 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">
              {formatRank(index)}
            </span>
            <div className="min-w-0 space-y-1">
              <p
                className={cn(
                  "min-w-0 break-words text-sm leading-5 text-foreground",
                  isSelected ? "font-semibold" : "font-medium",
                )}
              >
                {label}
                {hasExpandedDetails ? (
                  <button
                    type="button"
                    className="ml-1.5 inline-flex h-5 w-5 shrink-0 align-bottom items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-[10px] font-black leading-none text-primary/80 transition-colors hover:bg-primary/10 hover:text-primary"
                    aria-expanded={showDescription}
                    aria-label={t(
                      locale,
                      `${showDescription ? "Hide" : "Show"} details for ${label}`,
                      `${showDescription ? "隐藏" : "显示"} ${label} 的详情`,
                    )}
                    onClick={toggleDescription}
                  >
                    ?
                  </button>
                ) : null}
              </p>
              <div className="mt-1 flex min-w-0 flex-nowrap items-center gap-1.5 overflow-hidden">
                {showMetaLabels && row.metaLabel ? (
                  <span
                    title={row.metaLabel}
                    className="inline-flex min-w-0 max-w-[8rem] shrink rounded-full bg-secondary/60 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-muted-foreground"
                  >
                    <span className="truncate">{row.metaLabel}</span>
                  </span>
                ) : null}
                <SampleSizeBadge label={row.sampleSizeLabel} title={row.sampleSizeTitle} />
                <DatasetBadge locale={locale} datasetLink={row.datasetLink} />
                <PubMedBadge locale={locale} pubmed={row.pubmed} />
                {isStatisticallySignificant ? (
                  <StatisticalSignificanceBadge
                    locale={locale}
                    pValue={row.logRankPValue}
                    testLabel={row.statisticalTestLabel}
                  />
                ) : null}
              </div>
              {showDescription && hasExpandedDetails ? (
                <div className="space-y-2 rounded-[14px] border border-primary/15 bg-primary/5 px-3 py-2 text-[11px] leading-5 text-muted-foreground">
                  {row.description ? <p>{row.description}</p> : null}
                  {row.pubmed?.citation ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <span>{row.pubmed.citation}</span>
                      {row.pubmed.detail ? (
                        <span className="text-muted-foreground/70">
                          {row.pubmed.detail}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
          <EffectValue
            value={row.value}
            dayValue={row.dayValue}
            curveMetricValueLabel={curveMetricValueLabel}
            isSelected={isSelected}
            locale={locale}
            valueFormatter={valueFormatter}
            auxValueFormatter={auxValueFormatter}
          />
        </div>

        <EffectLane
          value={row.visualValue}
          positionScale={positionScale}
          isSelected={isSelected}
        />
      </div>

      <div className="hidden md:grid md:grid-cols-[44px_minmax(270px,320px)_minmax(140px,1fr)_150px] md:items-center md:gap-4 md:px-4 md:py-3">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-secondary/70 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">
          {formatRank(index)}
        </span>

        <div className="min-w-0">
          <p
            className={cn(
              "min-w-0 break-words text-sm leading-5 text-foreground",
              isSelected ? "font-semibold" : "font-medium",
            )}
          >
            {label}
            {hasExpandedDetails ? (
              <button
                type="button"
                className="ml-1.5 inline-flex h-5 w-5 shrink-0 align-bottom items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-[10px] font-black leading-none text-primary/80 transition-colors hover:bg-primary/10 hover:text-primary"
                aria-expanded={showDescription}
                aria-label={t(
                  locale,
                  `${showDescription ? "Hide" : "Show"} details for ${label}`,
                  `${showDescription ? "隐藏" : "显示"} ${label} 的详情`,
                )}
                onClick={toggleDescription}
              >
                ?
              </button>
            ) : null}
          </p>
          <div className="mt-1 flex min-w-0 flex-nowrap items-center gap-1.5 overflow-hidden">
            {showMetaLabels && row.metaLabel ? (
              <span
                title={row.metaLabel}
                className="inline-flex min-w-0 max-w-[8rem] shrink rounded-full bg-secondary/60 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-muted-foreground"
              >
                <span className="truncate">{row.metaLabel}</span>
              </span>
            ) : null}
            <SampleSizeBadge label={row.sampleSizeLabel} title={row.sampleSizeTitle} />
            <DatasetBadge locale={locale} datasetLink={row.datasetLink} />
            <PubMedBadge locale={locale} pubmed={row.pubmed} />
            {isStatisticallySignificant ? (
              <StatisticalSignificanceBadge
                locale={locale}
                pValue={row.logRankPValue}
                testLabel={row.statisticalTestLabel}
              />
            ) : null}
          </div>
          {showDescription && hasExpandedDetails ? (
            <div className="mt-2 space-y-2 rounded-[14px] border border-primary/15 bg-primary/5 px-3 py-2 text-[11px] leading-5 text-muted-foreground">
              {row.description ? <p>{row.description}</p> : null}
              {row.pubmed?.citation ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span>{row.pubmed.citation}</span>
                  {row.pubmed.detail ? (
                    <span className="text-muted-foreground/70">
                      {row.pubmed.detail}
                    </span>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <EffectLane
          value={row.visualValue}
          positionScale={positionScale}
          isSelected={isSelected}
        />

        <div className="justify-self-end">
          <EffectValue
            value={row.value}
            dayValue={row.dayValue}
            curveMetricValueLabel={curveMetricValueLabel}
            isSelected={isSelected}
            locale={locale}
            valueFormatter={valueFormatter}
            auxValueFormatter={auxValueFormatter}
          />
        </div>
      </div>
    </div>
  );
}

export default function EffectSizeChart({
  title,
  subtitle,
  rows,
  metricKey,
  dayMetricKey,
  curveMetricKey,
  curveMetricLabel,
  locale = "en",
  selectedKey,
  onSelect,
  footnote,
  valueDomain,
  visualValueCap,
  valueFormatter = defaultValueFormatter,
  auxValueFormatter = defaultAuxValueFormatter,
  axisStartLabel = "Lower",
  axisEndLabel = "Higher",
}) {
  const chartRows = rows
    .map((row) => ({
      ...row,
      value: row[metricKey],
      visualValue: clampVisualValue(row[metricKey], visualValueCap),
      dayValue: dayMetricKey ? row[dayMetricKey] : null,
    }))
    .filter((row) => row.value != null);

  if (!chartRows.length) {
    return (
      <div className="space-y-2 rounded-[22px] border border-dashed border-border bg-white/65 p-5">
        <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-6 text-muted-foreground">{subtitle}</p>
        <p className="text-sm text-muted-foreground">
          {t(locale, "No values for this slice.", "当前筛选条件没有可显示的数值。")}
        </p>
      </div>
    );
  }

  const maxAbs = Math.max(5, ...chartRows.map((row) => Math.abs(row.visualValue)));
  const resolvedValueDomain =
    valueDomain || (visualValueCap ? [-visualValueCap, visualValueCap] : [-maxAbs, maxAbs]);
  const positionScale = scaleLinear()
    .domain(resolvedValueDomain)
    .range([0, 100]);
  const showMetaLabels = chartRows.some((row) => row.metaLabel);
  const showSignificanceLegend = chartRows.some((row) => row.isStatisticallySignificant);

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-foreground">
            {title}
          </h3>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{subtitle}</p>
        </div>

        {/* <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2">
          {showSignificanceLegend ? (
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <StatisticalSignificanceBadge />
              <span>Overall survival log-rank vs matched control</span>
            </div>
          ) : null}
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <span>{formatTick(-maxAbs, locale)}</span>
            <span>0%</span>
            <span>{formatTick(maxAbs, locale)}</span>
          </div>
        </div> */}
      </div>

      <div className="overflow-hidden rounded-[26px] border border-border/70 bg-white/88">
        <div className="hidden border-b border-border/70 px-4 py-3 md:grid md:grid-cols-[44px_minmax(270px,320px)_minmax(140px,1fr)_150px] md:items-center md:gap-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {t(locale, "Rank", "排名")}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {t(locale, "Intervention", "干预")}
          </span>
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span>{axisStartLabel}</span>
            <span>{axisEndLabel}</span>
          </div>
          <span className="text-right text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {t(locale, "Effect", "效应")}
          </span>
        </div>

        <div className="divide-y divide-border/60">
          {chartRows.map((row, index) => (
            <EffectRow
              key={row.key || `${row.group}-${metricKey}`}
              index={index}
              row={row}
              selectedKey={selectedKey}
              onSelect={onSelect}
              positionScale={positionScale}
              showMetaLabels={showMetaLabels}
              curveMetricKey={curveMetricKey}
              curveMetricLabel={curveMetricLabel}
              locale={locale}
              valueFormatter={valueFormatter}
              auxValueFormatter={auxValueFormatter}
            />
          ))}
        </div>
      </div>

      {footnote ? <p className="text-xs leading-5 text-muted-foreground">{footnote}</p> : null}
    </section>
  );
}

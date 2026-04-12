import { useState } from "react";
import { scaleLinear } from "d3";
import { formatInteger, formatSignedDays, formatSignedPercent } from "../lib/itp";
import { cn } from "../lib/utils";

function formatTick(value) {
  const precision = Math.abs(value) < 5 ? 1 : 0;
  return `${value > 0 ? "+" : ""}${value.toFixed(precision)}%`;
}

function formatRank(index) {
  return String(index + 1).padStart(2, "0");
}

function formatCurveMetricLabel(row, curveMetricKey, curveMetricLabel) {
  if (!curveMetricKey || !curveMetricLabel) {
    return null;
  }

  const metricDay = row.treatmentCurve?.[curveMetricKey];
  if (metricDay == null) {
    return null;
  }

  return `${curveMetricLabel} ${formatInteger(metricDay)} d`;
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

function StatisticalSignificanceBadge({ pValue, className }) {
  const label = formatPValue(pValue) || "p<0.05";
  const detail =
    pValue != null
      ? `Overall survival log-rank ${formatPValue(pValue)} vs matched control`
      : "Overall survival log-rank p<0.05 vs matched control";

  return (
    <span
      title={detail}
      aria-label={detail}
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full border border-amber-400/50 bg-amber-50 px-2 py-0.5 text-[10px] font-bold tracking-[0.14em] text-amber-800",
        className,
      )}
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
    <div className="relative h-10 overflow-hidden rounded-full border border-border/60 bg-white/85">
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
          isSelected
            ? "bg-foreground"
            : isPositive
              ? "bg-primary"
              : "bg-[hsl(var(--chart-1))]",
        )}
        style={{
          left: `${left}%`,
          width: `${width}%`,
        }}
      />
      <div
        className={cn(
          "absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm",
          isSelected
            ? "bg-foreground"
            : isPositive
              ? "bg-primary"
              : "bg-[hsl(var(--chart-1))]",
        )}
        style={{ left: `${valuePosition}%` }}
      />
    </div>
  );
}

function EffectValue({ value, dayValue, curveMetricValueLabel, isSelected }) {
  const isPositive = value >= 0;

  return (
    <div className="flex min-w-[132px] flex-col items-end gap-1 text-right sm:min-w-[148px]">
      <div className="flex flex-wrap items-center justify-end gap-2">
        <span
          className={cn(
            "inline-flex min-w-[84px] items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold tabular-nums",
            isSelected
              ? "bg-foreground text-white"
              : isPositive
                ? "bg-primary/10 text-primary"
                : "bg-[rgba(23,96,135,0.12)] text-[hsl(var(--chart-1))]",
          )}
        >
          {formatSignedPercent(value)}
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
            {formatSignedDays(dayValue)}
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
}) {
  const isSelected = row.key === selectedKey;
  const label = row.label || row.group;
  const isStatisticallySignificant = Boolean(row.isStatisticallySignificant);
  const curveMetricValueLabel = formatCurveMetricLabel(
    row,
    curveMetricKey,
    curveMetricLabel,
  );
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
                {row.description ? (
                  <button
                    type="button"
                    className="ml-1.5 inline-flex h-5 w-5 shrink-0 align-bottom items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-[10px] font-black leading-none text-primary/80 transition-colors hover:bg-primary/10 hover:text-primary"
                    aria-expanded={showDescription}
                    aria-label={`${showDescription ? "Hide" : "Show"} description for ${label}`}
                    onClick={toggleDescription}
                  >
                    ?
                  </button>
                ) : null}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                {showMetaLabels && row.metaLabel ? (
                  <span className="inline-flex rounded-full bg-secondary/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {row.metaLabel}
                  </span>
                ) : null}
                {isStatisticallySignificant ? (
                  <StatisticalSignificanceBadge pValue={row.logRankPValue} />
                ) : null}
              </div>
              {showDescription && row.description ? (
                <div className="rounded-[14px] border border-primary/15 bg-primary/5 px-3 py-2 text-[11px] leading-5 text-muted-foreground">
                  {row.description}
                </div>
              ) : null}
            </div>
          </div>
          <EffectValue
            value={row.value}
            dayValue={row.dayValue}
            curveMetricValueLabel={curveMetricValueLabel}
            isSelected={isSelected}
          />
        </div>

        <EffectLane
          value={row.value}
          positionScale={positionScale}
          isSelected={isSelected}
        />
      </div>

      <div className="hidden md:grid md:grid-cols-[44px_minmax(0,250px)_minmax(0,1fr)_160px] md:items-center md:gap-4 md:px-4 md:py-3">
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
            {row.description ? (
              <button
                type="button"
                className="ml-1.5 inline-flex h-5 w-5 shrink-0 align-bottom items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-[10px] font-black leading-none text-primary/80 transition-colors hover:bg-primary/10 hover:text-primary"
                aria-expanded={showDescription}
                aria-label={`${showDescription ? "Hide" : "Show"} description for ${label}`}
                onClick={toggleDescription}
              >
                ?
              </button>
            ) : null}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {showMetaLabels && row.metaLabel ? (
              <span className="inline-flex rounded-full bg-secondary/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {row.metaLabel}
              </span>
            ) : null}
            {isStatisticallySignificant ? (
              <StatisticalSignificanceBadge pValue={row.logRankPValue} />
            ) : null}
          </div>
          {showDescription && row.description ? (
            <div className="mt-2 rounded-[14px] border border-primary/15 bg-primary/5 px-3 py-2 text-[11px] leading-5 text-muted-foreground">
              {row.description}
            </div>
          ) : null}
        </div>

        <EffectLane
          value={row.value}
          positionScale={positionScale}
          isSelected={isSelected}
        />

        <div className="justify-self-end">
          <EffectValue
            value={row.value}
            dayValue={row.dayValue}
            curveMetricValueLabel={curveMetricValueLabel}
            isSelected={isSelected}
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
  selectedKey,
  onSelect,
  footnote,
}) {
  const chartRows = rows
    .map((row) => ({
      ...row,
      value: row[metricKey],
      dayValue: dayMetricKey ? row[dayMetricKey] : null,
    }))
    .filter((row) => row.value != null)
    .sort((left, right) => right.value - left.value);

  if (!chartRows.length) {
    return (
      <div className="space-y-2 rounded-[22px] border border-dashed border-border bg-white/65 p-5">
        <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-6 text-muted-foreground">{subtitle}</p>
        <p className="text-sm text-muted-foreground">No values for this slice.</p>
      </div>
    );
  }

  const maxAbs = Math.max(5, ...chartRows.map((row) => Math.abs(row.value)));
  const positionScale = scaleLinear().domain([-maxAbs, maxAbs]).range([0, 100]);
  const showMetaLabels = chartRows.some((row) => row.metaLabel);
  const showSignificanceLegend = chartRows.some(
    (row) => row.isStatisticallySignificant,
  );

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
            <span>{formatTick(-maxAbs)}</span>
            <span>0%</span>
            <span>{formatTick(maxAbs)}</span>
          </div>
        </div> */}
      </div>

      <div className="overflow-hidden rounded-[26px] border border-border/70 bg-white/88">
        <div className="hidden border-b border-border/70 px-4 py-3 md:grid md:grid-cols-[44px_minmax(0,250px)_minmax(0,1fr)_160px] md:items-center md:gap-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Rank
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Intervention
          </span>
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span>Lower</span>
            <span>Higher</span>
          </div>
          <span className="text-right text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Effect
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
            />
          ))}
        </div>
      </div>

      {footnote ? <p className="text-xs leading-5 text-muted-foreground">{footnote}</p> : null}
    </section>
  );
}

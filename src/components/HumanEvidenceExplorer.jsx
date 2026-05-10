import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { getIntlLocale, t } from "../lib/i18n";

function buildPubMedUrl(pmid) {
  if (!pmid) {
    return null;
  }

  return `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
}

function buildPublicationUrl(publication) {
  return publication?.url || buildPubMedUrl(publication?.pmid);
}

function formatScore(value, locale) {
  if (value == null || Number.isNaN(value)) {
    return "—";
  }

  return `${new Intl.NumberFormat(getIntlLocale(locale)).format(Math.round(value))}/100`;
}

function formatAcmEffect(value, locale) {
  if (value == null || Number.isNaN(value)) {
    return "—";
  }

  const formattedValue = new Intl.NumberFormat(getIntlLocale(locale)).format(
    Math.round(Math.abs(value)),
  );

  if (value > 0) {
    return t(locale, `${formattedValue}% lower ACM`, `全因死亡率降低 ${formattedValue}%`);
  }
  if (value < 0) {
    return t(locale, `${formattedValue}% higher ACM`, `全因死亡率升高 ${formattedValue}%`);
  }

  return t(locale, "0% ACM effect", "全因死亡率影响 0%");
}

function formatEvidenceValue(evidence, locale) {
  if (evidence?.value_kind === "text") {
    return evidence.value || "—";
  }

  if (evidence?.value_kind === "acm_effect") {
    return formatAcmEffect(evidence.score, locale);
  }

  return formatScore(evidence?.score, locale);
}

function formatPublicationDetail(publication) {
  if (!publication) {
    return null;
  }

  return [
    publication.author,
    publication.year,
    publication.journal,
    publication.pmid ? `PMID ${publication.pmid}` : null,
    publication.doi ? `DOI ${publication.doi}` : null,
  ]
    .filter(Boolean)
    .join(" · ");
}

function ScoreTile({ label, locale, value, valueKind, hint }) {
  const formattedValue =
    valueKind === "text"
      ? value || "—"
      : valueKind === "acm_effect"
        ? formatAcmEffect(value, locale)
        : formatScore(value, locale);

  return (
    <div className="min-w-0 rounded-[20px] border border-border/70 bg-white/75 p-3.5 shadow-sm sm:rounded-[22px] sm:p-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
        {label}
      </p>
      <p className="mt-2 break-words font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {formattedValue}
      </p>
      {hint ? <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function formatCount(value, locale) {
  if (value == null || Number.isNaN(value)) {
    return "—";
  }

  return new Intl.NumberFormat(getIntlLocale(locale)).format(value);
}

function formatSourceKind(kind, locale) {
  if (kind === "dose/formulation") {
    return t(locale, "Direct dose row", "剂量/剂型条目");
  }

  if (kind === "class") {
    return t(locale, "Direct class row", "药物类别条目");
  }

  return t(locale, "Direct supplement row", "补充表原始条目");
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

function AcmResultCard({
  evidence,
  locale,
  hazardRatio,
  confidenceInterval,
  pValue,
  adjustedPValue,
  prescriptionUserCount,
  sourceKind,
  sourceTable,
  datasetLabel,
  datasetUrl,
  datasetDetail,
}) {
  const pLabel = formatPValue(pValue);
  const adjustedPLabel = formatPValue(adjustedPValue);

  return (
    <Card className="border-border/70 bg-white/75 shadow-none xl:col-span-2">
      <CardContent className="space-y-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <Badge variant="outline">{t(locale, "ACM result", "全因死亡率结果")}</Badge>
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground">
              {hazardRatio == null ? "HR —" : `HR ${hazardRatio.toFixed(2)}`}
            </p>
            {confidenceInterval ? (
              <p className="text-[11px] leading-5 text-muted-foreground">
                {t(locale, "95% CI", "95% CI")} {confidenceInterval}
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {pLabel ? (
              <span className="inline-flex rounded-full border border-amber-400/50 bg-amber-50 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-amber-800">
                {pLabel}
              </span>
            ) : null}
            {adjustedPLabel ? (
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-primary/85">
                {t(locale, `adj. ${adjustedPLabel}`, `校正 ${adjustedPLabel}`)}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{formatSourceKind(sourceKind, locale)}</Badge>
          {sourceTable ? <Badge variant="secondary">{sourceTable}</Badge> : null}
          {datasetUrl ? (
            <a
              href={datasetUrl}
              target="_blank"
              rel="noreferrer"
              title={datasetDetail || datasetLabel || t(locale, "Dataset", "数据集")}
              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary/85 transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {datasetLabel || t(locale, "Dataset", "数据集")}
            </a>
          ) : null}
          {prescriptionUserCount != null ? (
            <Badge variant="secondary">
              {t(
                locale,
                `N=${formatCount(prescriptionUserCount, locale)} prescription users`,
                `N=${formatCount(prescriptionUserCount, locale)} 处方使用者`,
              )}
            </Badge>
          ) : null}
        </div>

        {evidence?.effect_label ? (
          <p className="text-sm leading-6 text-foreground">{evidence.effect_label}</p>
        ) : null}
        {evidence?.detail ? (
          <p className="text-[11px] leading-5 text-muted-foreground">{evidence.detail}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

function EvidenceCard({ label, evidence, locale }) {
  if (!evidence) {
    return null;
  }

  const publication = evidence.publication || null;
  const publicationDetail = formatPublicationDetail(publication);
  const publicationUrl = buildPublicationUrl(publication);

  return (
    <Card className="border-border/70 bg-white/75 shadow-none">
      <CardContent className="space-y-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <Badge variant="outline">{label}</Badge>
            <p className="break-words font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {formatEvidenceValue(evidence, locale)}
            </p>
          </div>
          {publicationUrl ? (
            <a
              href={publicationUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-7 items-center rounded-full border border-primary/20 bg-primary/5 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-primary/85 transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {publication?.pmid ? "PubMed" : t(locale, "Source", "来源")}
            </a>
          ) : null}
        </div>

        {evidence.effect_label ? (
          <p className="text-sm leading-6 text-foreground">{evidence.effect_label}</p>
        ) : null}
        {evidence.detail ? (
          <p className="text-[11px] leading-5 text-muted-foreground">{evidence.detail}</p>
        ) : null}

        {publication?.title ? (
          <div className="rounded-[16px] border border-border/60 bg-secondary/35 px-3 py-3">
            <p className="text-[11px] leading-5 text-foreground">{publication.title}</p>
            {publicationDetail ? (
              <p className="mt-1 text-[10px] leading-5 text-muted-foreground">
                {publicationDetail}
              </p>
            ) : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function SourceCatalogPanel({ sources, locale }) {
  if (!Array.isArray(sources) || sources.length === 0) {
    return null;
  }

  return (
    <div className="rounded-[22px] border border-border/70 bg-white/70 p-4 sm:rounded-[24px] sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{t(locale, "Biobank sources", "Biobank 来源")}</Badge>
          <span className="text-sm text-foreground">
            {t(locale, "Public supplement + project provenance", "公开补充表 + 项目来源")}
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/80">
          {new Intl.NumberFormat(getIntlLocale(locale)).format(sources.length)}
          {" "}
          {t(locale, "study", "研究")}
        </span>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {sources.map((source) => {
          const publication = source.publication || null;
          const publicationDetail = formatPublicationDetail(publication);
          const publicationUrl = buildPublicationUrl(publication);

          return (
            <div
              key={source.key || publication?.pmid || publication?.title}
              className="min-w-0 rounded-[18px] border border-border/60 bg-secondary/30 p-3 sm:p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="min-w-0 break-words text-xs font-bold uppercase tracking-[0.14em] text-primary/85">
                  {source.label}
                </p>
                {publicationUrl ? (
                  <a
                    href={publicationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-7 items-center rounded-full border border-primary/20 bg-primary/5 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-primary/85 transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {publication?.pmid ? "PubMed" : t(locale, "Source", "来源")}
                  </a>
                ) : null}
              </div>
              {source.summary ? (
                <p className="mt-3 text-sm leading-6 text-foreground">{source.summary}</p>
              ) : null}
              {source.finding ? (
                <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
                  {source.finding}
                </p>
              ) : null}
              {Array.isArray(source.dataset_links) && source.dataset_links.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {source.dataset_links.map((link) => (
                    <a
                      key={`${source.key || source.label}-${link.label}-${link.table || ""}`}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      title={link.detail || link.table || link.label}
                      className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary/85 transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
              {publication?.title ? (
                <div className="mt-3 border-t border-border/60 pt-3">
                  <p className="text-[11px] leading-5 text-foreground">{publication.title}</p>
                  {publicationDetail ? (
                    <p className="mt-1 text-[10px] leading-5 text-muted-foreground">
                      {publicationDetail}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function HumanEvidenceExplorer({ summary, locale = "en" }) {
  const evidence = summary?.groupMeta?.evidence || null;
  const sourceCatalog = summary?.groupMeta?.sourceCatalog || [];
  const prescriptionUserCount = summary?.groupMeta?.acmPrescriptionUserCount ?? null;
  const sourceKind = summary?.groupMeta?.acmSourceKind || null;
  const sourceTable = summary?.groupMeta?.acmSourceTable || null;
  const datasetLabel = summary?.groupMeta?.acmDatasetLabel || null;
  const datasetUrl = summary?.groupMeta?.acmDatasetUrl || null;
  const datasetDetail = summary?.groupMeta?.acmDatasetDetail || null;
  const hazardRatio = summary?.groupMeta?.acmHazardRatio ?? null;
  const confidenceInterval = summary?.groupMeta?.acmConfidenceInterval || null;
  const pValue = summary?.groupMeta?.acmPValue ?? null;
  const adjustedPValue = summary?.groupMeta?.acmAdjustedPValue ?? null;

  if (!summary || !evidence) {
    return (
      <div className="rounded-[22px] border border-dashed border-border bg-white/55 p-4 text-sm text-muted-foreground sm:rounded-[24px] sm:p-5">
        {t(locale, "No evidence summary is available for this medication.", "该药物暂无可显示的证据摘要。")}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <ScoreTile
          label={t(locale, "ACM effect", "全因死亡率影响")}
          locale={locale}
          value={evidence.overall?.value ?? evidence.overall?.score}
          valueKind={evidence.overall?.value_kind}
          hint={evidence.overall?.label}
        />
        <ScoreTile
          label={t(locale, "UKB screen", "UKB 筛查")}
          locale={locale}
          value={formatSourceKind(sourceKind, locale)}
          valueKind="text"
          hint={sourceTable || t(locale, "Public supplement", "公开补充表")}
        />
        <ScoreTile
          label={t(locale, "Prescription users", "处方使用者")}
          locale={locale}
          value={prescriptionUserCount == null ? "—" : `N=${formatCount(prescriptionUserCount, locale)}`}
          valueKind="text"
          hint={t(locale, "UK Biobank row N", "UK Biobank 条目 N")}
        />
        <ScoreTile
          label={t(locale, "Caution", "解读提醒")}
          locale={locale}
          value={evidence.caution?.value ?? evidence.caution?.score}
          valueKind={evidence.caution?.value_kind}
          hint={evidence.caution?.label}
        />
      </div>

      <div className="rounded-[22px] border border-border/70 bg-white/70 p-4 sm:rounded-[24px] sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{t(locale, "Biobank population", "Biobank 人群")}</Badge>
          {summary.groupMeta?.condition ? (
            <span className="text-sm text-foreground">{summary.groupMeta.condition}</span>
          ) : null}
        </div>
        {evidence.overall?.note ? (
          <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">
            {evidence.overall.note}
          </p>
        ) : null}
      </div>

      <SourceCatalogPanel sources={sourceCatalog} locale={locale} />

      <div className="grid gap-4 xl:grid-cols-3">
        <AcmResultCard
          evidence={evidence.biobank}
          locale={locale}
          hazardRatio={hazardRatio}
          confidenceInterval={confidenceInterval}
          pValue={pValue}
          adjustedPValue={adjustedPValue}
          prescriptionUserCount={prescriptionUserCount}
          sourceKind={sourceKind}
          sourceTable={sourceTable}
          datasetLabel={datasetLabel}
          datasetUrl={datasetUrl}
          datasetDetail={datasetDetail}
        />
        <EvidenceCard label={t(locale, "Caution", "解读提醒")} evidence={evidence.caution} locale={locale} />
      </div>
    </div>
  );
}

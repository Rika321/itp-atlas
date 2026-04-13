import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { getIntlLocale, t } from "../lib/i18n";

function buildPubMedUrl(pmid) {
  if (!pmid) {
    return null;
  }

  return `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
}

function formatScore(value, locale) {
  if (value == null || Number.isNaN(value)) {
    return "—";
  }

  return `${new Intl.NumberFormat(getIntlLocale(locale)).format(Math.round(value))}/100`;
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
  ]
    .filter(Boolean)
    .join(" · ");
}

function ScoreTile({ label, locale, value, hint }) {
  return (
    <div className="rounded-[22px] border border-border/70 bg-white/75 p-4 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground">
        {formatScore(value, locale)}
      </p>
      {hint ? <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function EvidenceCard({ label, evidence, locale }) {
  if (!evidence) {
    return null;
  }

  const publication = evidence.publication || null;
  const publicationDetail = formatPublicationDetail(publication);
  const pubmedUrl = buildPubMedUrl(publication?.pmid);

  return (
    <Card className="border-border/70 bg-white/75 shadow-none">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <Badge variant="outline">{label}</Badge>
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground">
              {formatScore(evidence.score, locale)}
            </p>
          </div>
          {pubmedUrl ? (
            <a
              href={pubmedUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-7 items-center rounded-full border border-primary/20 bg-primary/5 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-primary/85 transition-colors hover:bg-primary/10 hover:text-primary"
            >
              PubMed
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

export default function HumanEvidenceExplorer({ summary, locale = "en" }) {
  const evidence = summary?.groupMeta?.evidence || null;

  if (!summary || !evidence) {
    return (
      <div className="rounded-[24px] border border-dashed border-border bg-white/55 p-5 text-sm text-muted-foreground">
        {t(locale, "No evidence summary is available for this medication.", "该药物暂无可显示的证据摘要。")}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <ScoreTile
          label={t(locale, "Overall", "总体")}
          locale={locale}
          value={evidence.overall?.score}
          hint={evidence.overall?.label}
        />
        <ScoreTile
          label={t(locale, "Meta", "Meta")}
          locale={locale}
          value={evidence.meta?.score}
          hint={t(locale, "Randomized and pooled human evidence", "随机试验与汇总人类证据")}
        />
        <ScoreTile
          label={t(locale, "Epidemiology", "流行病学")}
          locale={locale}
          value={evidence.epidemiology?.score}
          hint={t(locale, "Large observational and real-world support", "大规模观察性与真实世界支持")}
        />
        <ScoreTile
          label={t(locale, "Mendelian", "孟德尔")}
          locale={locale}
          value={evidence.mendelian?.score}
          hint={t(locale, "Drug-target genetic support", "药物靶点遗传支持")}
        />
      </div>

      <div className="rounded-[24px] border border-border/70 bg-white/70 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{t(locale, "Best-fit population", "最匹配人群")}</Badge>
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

      <div className="grid gap-4 xl:grid-cols-3">
        <EvidenceCard label={t(locale, "Meta-analysis", "Meta 分析")} evidence={evidence.meta} locale={locale} />
        <EvidenceCard label={t(locale, "Epidemiology", "流行病学")} evidence={evidence.epidemiology} locale={locale} />
        <EvidenceCard label={t(locale, "Mendelian", "孟德尔")} evidence={evidence.mendelian} locale={locale} />
      </div>
    </div>
  );
}

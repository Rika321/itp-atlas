import { curveStepAfter, line as d3Line, scaleLinear } from "d3";

export default function SurvivalChart({ title, subtitle, lines }) {
  const width = 920;
  const height = 360;
  const margin = { top: 28, right: 24, bottom: 42, left: 56 };

  const allPoints = lines.flatMap((series) => series.points);
  const maxDay =
    allPoints.reduce((max, point) => Math.max(max, point.day), 0) || 1000;

  const x = scaleLinear()
    .domain([0, Math.ceil(maxDay / 100) * 100])
    .range([margin.left, width - margin.right]);

  const y = scaleLinear().domain([0, 100]).range([height - margin.bottom, margin.top]);

  const xTicks = x.ticks(6);
  const yTicks = [0, 25, 50, 75, 100];

  const pathBuilder = d3Line()
    .x((point) => x(point.day))
    .y((point) => y(point.survival))
    .curve(curveStepAfter);

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-6 text-muted-foreground">{subtitle}</p>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-border/70 bg-white/85 p-4">
        <svg
          className="h-auto w-full overflow-visible"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={title}
        >
          {yTicks.map((tick) => (
            <g key={`y-${tick}`}>
              <line
                className="itp-grid-line"
                x1={margin.left}
                x2={width - margin.right}
                y1={y(tick)}
                y2={y(tick)}
              />
              <text className="itp-axis-text" x={margin.left - 14} y={y(tick) + 4}>
                {tick}
              </text>
            </g>
          ))}

          {xTicks.map((tick) => (
            <g key={`x-${tick}`}>
              <line
                className="itp-grid-line itp-grid-line-vertical"
                x1={x(tick)}
                x2={x(tick)}
                y1={margin.top}
                y2={height - margin.bottom}
              />
              <text
                className="itp-axis-text itp-axis-text-bottom"
                x={x(tick)}
                y={height - 12}
              >
                {tick}
              </text>
            </g>
          ))}

          <line
            className="itp-axis-line"
            x1={margin.left}
            x2={width - margin.right}
            y1={height - margin.bottom}
            y2={height - margin.bottom}
          />
          <line
            className="itp-axis-line"
            x1={margin.left}
            x2={margin.left}
            y1={margin.top}
            y2={height - margin.bottom}
          />

          {lines.map((series) => (
            <path
              key={series.id}
              d={pathBuilder(series.points)}
              className={`itp-series-line itp-series-line--${series.variant}`}
              style={{ stroke: series.color }}
            />
          ))}

          <text className="itp-axis-label itp-axis-label-y" x={18} y={height / 2}>
            Survival %
          </text>
          <text className="itp-axis-label itp-axis-label-x" x={width / 2} y={height - 6}>
            Age in days
          </text>
        </svg>
      </div>

      <div className="flex flex-wrap gap-3">
        {lines.map((series) => (
          <div
            key={series.id}
            className="flex items-center gap-2 rounded-full border border-border/70 bg-white/70 px-3 py-1.5 text-xs text-muted-foreground"
          >
            <span
              className={`itp-legend-swatch itp-legend-swatch--${series.variant}`}
              style={{ backgroundColor: series.color }}
            />
            <span>{series.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

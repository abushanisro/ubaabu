'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  LinearYAxis,
  LinearYAxisTickSeries,
  AreaSeries,
  Area,
  Gradient,
  GradientStop,
  GridlineSeries,
  Gridline,
  ChartNestedDataShape,
} from 'reaviz';

// Brand palette (matches src/app/globals.css --primary / --primary-glow / --primary-deep)
const BRAND = {
  primary: 'oklch(0.68 0.13 180)',
  glow: 'oklch(0.78 0.13 175)',
  deep: 'oklch(0.52 0.12 185)',
  tickFill: 'oklch(0.554 0.046 257.417)',
  gridline: 'oklch(0.929 0.013 255.508)',
};

interface ChartDataPoint {
  key: Date;
  data: number | null | undefined;
}

interface ChartSeries {
  key: string;
  data: ChartDataPoint[];
}

const LEGEND_ITEMS = [
  { name: 'Pass Rate', color: BRAND.primary },
  { name: 'Defects', color: BRAND.glow },
  { name: 'Compliance', color: BRAND.deep },
];

const now = new Date();
const generateDate = (offsetDays: number): Date => {
  const date = new Date(now);
  date.setDate(now.getDate() - offsetDays);
  return date;
};

const initialChartData: ChartSeries[] = [
  {
    key: 'Pass Rate',
    data: [
      { key: generateDate(6), data: 88 }, { key: generateDate(5), data: 90 },
      { key: generateDate(4), data: 91 }, { key: generateDate(3), data: 93 },
      { key: generateDate(2), data: 95 }, { key: generateDate(1), data: 97 },
      { key: generateDate(0), data: 98.6 },
    ],
  },
  {
    key: 'Compliance',
    data: [
      { key: generateDate(6), data: 82 }, { key: generateDate(5), data: 85 },
      { key: generateDate(4), data: 88 }, { key: generateDate(3), data: 90 },
      { key: generateDate(2), data: 94 }, { key: generateDate(1), data: 97 },
      { key: generateDate(0), data: 100 },
    ],
  },
  {
    key: 'Defects',
    data: [
      { key: generateDate(6), data: 34 }, { key: generateDate(5), data: 30 },
      { key: generateDate(4), data: 28 }, { key: generateDate(3), data: 24 },
      { key: generateDate(2), data: 22 }, { key: generateDate(1), data: 19 },
      { key: generateDate(0), data: 18 },
    ],
  },
];

const validateChartData = (data: ChartSeries[]): ChartNestedDataShape[] => {
  return data.map((series) => ({
    ...series,
    data: series.data.map((item) => ({
      ...item,
      data: typeof item.data !== 'number' || isNaN(item.data) ? 0 : item.data,
    })),
  }));
};

const validatedChartData = validateChartData(initialChartData);

interface MetricInfo {
  id: string;
  label: string;
  value: string;
  delay: number;
}

const METRICS_DATA: MetricInfo[] = [
  { id: 'pass', label: 'Pass', value: '1,227', delay: 0 },
  { id: 'defects', label: 'Defects', value: '18', delay: 0.05 },
  { id: 'compliance', label: 'Compliance', value: '100%', delay: 0.1 },
];

const QualityAreaChartCard: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-between w-full mb-1.5">
        {LEGEND_ITEMS.map((item) => (
          <div key={item.name} className="flex gap-1.5 items-center">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-muted-foreground text-[9px] font-medium">{item.name}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-0">
        <AreaChart
          height={118}
          id="quality-area-chart"
          data={validatedChartData}
          xAxis={
            <LinearXAxis
              type="time"
              tickSeries={
                <LinearXAxisTickSeries
                  label={
                    <LinearXAxisTickLabel
                      format={(v) => new Date(v).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}
                      fill={BRAND.tickFill}
                    />
                  }
                  tickSize={10}
                />
              }
            />
          }
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries line={null} label={null} tickSize={10} />}
            />
          }
          series={
            <AreaSeries
              type="grouped"
              interpolation="smooth"
              area={
                <Area
                  gradient={
                    <Gradient
                      stops={[
                        <GradientStop key={1} stopOpacity={0} />,
                        <GradientStop key={2} offset="100%" stopOpacity={0.4} />,
                      ]}
                    />
                  }
                />
              }
              colorScheme={[BRAND.primary, BRAND.deep, BRAND.glow]}
            />
          }
          gridlines={<GridlineSeries line={<Gridline strokeColor={BRAND.gridline} />} />}
        />
      </div>

      <div className="grid grid-cols-3 gap-2 mt-1.5 w-full">
        {METRICS_DATA.map((metric) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: metric.delay }}
            className="flex flex-col items-center gap-0.5 py-1.5 rounded-md bg-muted/40"
          >
            <span className="text-sm font-bold text-foreground tabular-nums">{metric.value}</span>
            <span className="text-[9px] text-muted-foreground uppercase">{metric.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QualityAreaChartCard;

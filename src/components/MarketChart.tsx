import React, { useEffect, useRef, useState } from 'react';
import {
  createChart,
  ColorType,
  CandlestickSeries,
  type ISeriesApi,
  type CandlestickData,
  type UTCTimestamp,
} from 'lightweight-charts';

interface MarketChartProps {
  symbol: string;
  timeframe: string;
}

const MarketChart: React.FC<MarketChartProps> = ({ symbol, timeframe }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    const width = chartContainerRef.current.clientWidth || 600;
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#6b7280',
      },
      grid: {
        vertLines: { color: 'rgba(107, 114, 128, 0.05)' },
        horzLines: { color: 'rgba(107, 114, 128, 0.05)' },
      },
      width: width,
      height: 400,
      timeScale: {
        borderColor: 'rgba(107, 114, 128, 0.1)',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;
    candlestickSeriesRef.current = chart.addSeries(CandlestickSeries, {
      upColor: '#10b981',
      downColor: '#f43f5e',
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#f43f5e',
    });

    const fetchHistoricalData = async () => {
      setLoading(true);
      try {
        const intervalMap: Record<string, string> = {
          '1H': '1h', '4H': '4h', '1D': '1d', '1W': '1w', '1M': '1M'
        };
        const interval = intervalMap[timeframe] || '1h';
        const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol.replace('/', '')}&interval=${interval}&limit=100`);
        const data = await res.json();
        const formattedData: CandlestickData[] = data.map((d: any) => ({
          time: (d[0] / 1000) as UTCTimestamp,
          open: parseFloat(d[1]),
          high: parseFloat(d[2]),
          low: parseFloat(d[3]),
          close: parseFloat(d[4]),
        }));
        candlestickSeriesRef.current?.setData(formattedData);
      } catch (e) {
        console.error('Chart data error:', e);
      }
      setLoading(false);
    };

    fetchHistoricalData();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        try {
          chartRef.current.remove();
        } catch (e) {
          console.error('Chart removal error:', e);
        }
      }
    };
  }, [symbol, timeframe]);

  return (
    <div className="relative w-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-sm z-10 rounded-2xl">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
      )}
      <div ref={chartContainerRef} />
    </div>
  );
};

export default MarketChart;

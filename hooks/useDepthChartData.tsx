import { useMemo } from 'react';

export const useDepthChartData = (orderbook: Orderbook | null) => {
  const {
    bidData,
    askData,
    midPrice,
    maxVolume,
    spreadPercentage,
    chartData,
    options,
  } = useMemo(() => {
    if (!orderbook) return {};

    const sortedBids = [...orderbook.bids].sort((a, b) => b.price - a.price);
    const sortedAsks = [...orderbook.asks].sort((a, b) => a.price - b.price);
    const midPrice = (sortedBids[0]?.price + sortedAsks[0]?.price) / 2;

    let bidCumulative = 0;
    const bidData = sortedBids.map((bid) => {
      bidCumulative += bid.volume;
      return { x: bid.price, y: bidCumulative };
    });

    let askCumulative = 0;
    const askData = sortedAsks.map((ask) => {
      askCumulative += ask.volume;
      return { x: ask.price, y: askCumulative };
    });

    const maxVolume = Math.max(bidCumulative, askCumulative);
    const spreadPercentage =
      ((sortedAsks[0]?.price - sortedBids[0]?.price) / sortedBids[0]?.price) *
      100;

    const chartData = {
      datasets: [
        {
          label: 'Bids',
          data: bidData,
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.3)',
          fill: true,
          stepped: 'after' as const,
          tension: 0,
          pointRadius: 0,
          segment: { borderWidth: 1.5 },
          borderJoinStyle: 'miter' as const,
        },
        {
          label: 'Asks',
          data: askData,
          borderColor: '#FF5252',
          backgroundColor: 'rgba(255, 82, 82, 0.3)',
          fill: true,
          stepped: 'before' as const,
          tension: 0,
          pointRadius: 0,
          segment: { borderWidth: 1.5 },
          borderJoinStyle: 'miter' as const,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'nearest' as const,
      },
      scales: {
        x: {
          type: 'linear' as const,
          grid: {
            display: true,
            color: 'rgba(255, 255, 255, 0.05)',
            drawBorder: false,
          },
          ticks: { color: 'white', maxRotation: 0 },
          border: { display: false },
        },
        y: {
          type: 'linear' as const,
          position: 'left' as const,
          grid: {
            display: true,
            color: 'rgba(255, 255, 255, 0.05)',
            drawBorder: false,
          },
          ticks: {
            color: 'white',
            callback: function (tickValue: string | number) {
              return typeof tickValue === 'number'
                ? tickValue.toFixed(0)
                : parseFloat(tickValue).toFixed(0);
            },
            min: 0,
            max: maxVolume > 0 ? maxVolume * 1.2 : 100,
            stepSize: 10,
          },
          border: { display: false },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const label = context.dataset.label || '';
              const price = context.parsed.x.toFixed(3);
              const volume = context.parsed.y.toFixed(2);
              return `${label}: ${volume} at ${price} USDT`;
            },
          },
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          titleColor: 'rgba(255, 255, 255, 0.9)',
          bodyColor: 'rgba(255, 255, 255, 0.9)',
        },
        legend: { display: false },
        annotation: {
          annotations: {
            midPriceLabel: {
              type: 'label',
              xValue: midPrice,
              yValue: maxVolume * 0.1,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: '#FFD700',
              font: { weight: 'bold', size: 14 },
              content: `Mid Price: ${midPrice.toFixed(3)} USDT`,
              padding: { top: 10, left: 10, right: 10, bottom: 10 },
            },
          },
        },
      },
    };

    return {
      bidData,
      askData,
      midPrice,
      maxVolume,
      spreadPercentage,
      chartData,
      options,
    };
  }, [orderbook]);

  return { bidData, askData, midPrice, maxVolume, spreadPercentage, chartData, options };
};

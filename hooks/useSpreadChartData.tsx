import { useMemo } from "react";

const useSpreadChartData = (data: number[]) => {
  const chartData = useMemo(() => {
    return {
      labels: Array(data.length).fill(""),
      datasets: [
        {
          label: "Spread",
          data,
          borderColor: "blue",
          backgroundColor: "rgba(0, 0, 255, 0.1)",
        },
      ],
    };
  }, [data]);

  return chartData;
};

export default useSpreadChartData;

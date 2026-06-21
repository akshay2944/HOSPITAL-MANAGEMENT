import * as d3 from "d3";
import React, { useEffect, useRef } from "react";


const data = [
  { name: "Jan", value: 120 },
  { name: "Feb", value: 200 },
  { name: "Mar", value: 150 },
  { name: "Apr", value: 300 },
];

const Graph = ({ data}) => {
  const svgRef = useRef();


  // Stats
  const stats = React.useMemo(() => {
    if (!data.length) {
      return {
        total: 0,
        current: 0,
        average: 0,
        max: null,
      };
    }

    const total = data.reduce((sum, item) => sum + item.value, 0);

    const max = data.reduce((a, b) =>
      a.value > b.value ? a : b
    );

    return {
      total,
      current: data[data.length - 1].value,
      average: (total / data.length).toFixed(2),
      max,
    };
  }, [data]);

  useEffect(() => {
    if (!data.length) return;

    const width = 700;
    const height = 350;

    const margin = {
      top: 20,
      right: 20,
      bottom: 40,
      left: 50,
    };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Bars
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d.value))
      .attr("fill", "#3b82f6")
      .attr("rx", 4);

    // X Axis
    svg
      .append("g")
      .attr(
        "transform",
        `translate(0,${height - margin.bottom})`
      )
      .call(d3.axisBottom(x));

    // Y Axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, [data]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" text-gray-700>
        <div className="p-4 rounded-lg bg-gray-100">
          <p className="text-sm text-gray-500">Total</p>
          <h2 className="text-2xl font-bold">{stats.total}</h2>
        </div>

        <div className="p-4 rounded-lg bg-gray-100">
          <p className="text-sm text-gray-500">Current</p>
          <h2 className="text-2xl font-bold">{stats.current}</h2>
        </div>

        <div className="p-4 rounded-lg bg-gray-100">
          <p className="text-sm text-gray-500">Average</p>
          <h2 className="text-2xl font-bold">{stats.average}</h2>
        </div>

        <div className="p-4 rounded-lg bg-gray-100">
          <p className="text-sm text-gray-500">Highest</p>
          <h2 className="text-2xl font-bold">
            {stats.max?.value || 0}
          </h2>
          <p className="text-xs text-gray-400">
            {stats.max?.name}
          </p>
        </div>
      </div>

      {/* Chart */}
      <svg
        ref={svgRef}
        viewBox="0 0 700 350"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default Graph;
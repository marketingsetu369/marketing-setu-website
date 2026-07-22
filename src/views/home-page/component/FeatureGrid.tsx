import React from "react";
import { FeatureItem } from "../data/features";

interface FeatureGridProps {
  items: FeatureItem[];
  /** Number of columns — defaults to 2 */
  columns?: 2 | 3;
}

export default function FeatureGrid({ items, columns = 2 }: FeatureGridProps) {
  // For 2-col layout, split items evenly into two columns
  if (columns === 2) {
    const mid = Math.ceil(items.length / 2);
    const left = items.slice(0, mid);
    const right = items.slice(mid);

    return (
      <div className="grid grid-2">
        <div>
          {left.map((item, i) => (
            <div key={i} className="feature-row reveal">
              <div className="icon">{item.icon}</div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          {right.map((item, i) => (
            <div key={i} className="feature-row reveal">
              <div className="icon">{item.icon}</div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3-col layout: flat grid
  return (
    <div className="grid grid-3">
      {items.map((item, i) => (
        <div key={i} className="card reveal">
          <div className="icon">{item.icon}</div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

import type { CSSProperties } from "react";

const levels = [0, 1, 2, 3];
const sides = [0, 1, 2, 3];

const varStyle = (key: "--x" | "--i", value: number): CSSProperties =>
  ({ [key]: value }) as CSSProperties;

export default function WebsiteLoader() {
  return (
    <div className="website-loader-shell" role="status" aria-live="polite">
      <div className="website-loader-tree" aria-label="Loading">
        {levels.map((level) => (
          <div key={`branch-${level}`} className="website-loader-branch" style={varStyle("--x", level)}>
            {sides.map((side) => (
              <span key={`branch-${level}-side-${side}`} style={varStyle("--i", side)} />
            ))}
          </div>
        ))}

        <div className="website-loader-stem">
          {sides.map((side) => (
            <span key={`stem-side-${side}`} style={varStyle("--i", side)} />
          ))}
        </div>

        <span className="website-loader-shadow" />
      </div>
    </div>
  );
}

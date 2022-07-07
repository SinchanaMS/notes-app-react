import "../styles/filters.css";
import { useState } from "react";
import { useFilter, useAuth, useNote } from "../contexts/contexts";

export default function Filters() {
  const { filterState, filterDispatch } = useFilter();
  const { allLabelsList } = useNote();
  const { loggedIn } = useAuth();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="filter-by">
      {loggedIn && (
        <>
          <div className="filters">
            <p
              className="filter-title"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filter:
            </p>
          </div>
          <div
            className={
              showFilters
                ? "filter-options shadow active"
                : "filter-options shadow"
            }
          >
            <div className="filter-option">
              <button
                className="clear-filter"
                onClick={(e) => filterDispatch({ type: "CLEAR" })}
              >
                Clear Filters
              </button>
              <p>Labels</p>
              {allLabelsList.map((label) => (
                <label className="filter">
                  <input
                    type="checkbox"
                    name="label"
                    checked={filterState.labels.includes(label)}
                    value={label}
                    onChange={(e) =>
                      filterDispatch({ type: "LABEL", payload: e.target.value })
                    }
                  />
                  {label}
                </label>
              ))}
            </div>

            <div className="filter-option">
              <p>Priority</p>
              <label className="filter">
                <input
                  type="radio"
                  name="priority"
                  checked={filterState.priority === "1"}
                  value="1"
                  onChange={(e) =>
                    filterDispatch({
                      type: "PRIORITY",
                      payload: e.target.value,
                    })
                  }
                />
                High
              </label>
              <label className="filter">
                <input
                  type="radio"
                  name="priority"
                  checked={filterState.priority === "2"}
                  value="2"
                  onChange={(e) =>
                    filterDispatch({
                      type: "PRIORITY",
                      payload: e.target.value,
                    })
                  }
                />
                Medium
              </label>
              <label className="filter">
                <input
                  type="radio"
                  name="priority"
                  checked={filterState.priority === "3"}
                  value="3"
                  onChange={(e) =>
                    filterDispatch({
                      type: "PRIORITY",
                      payload: e.target.value,
                    })
                  }
                />
                Low
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

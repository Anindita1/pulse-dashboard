// Recidiviz - a data platform for criminal justice reform
// Copyright (C) 2020 Recidiviz, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
// =============================================================================

import expandMetricRepresentation from "./optimizedMetricFileParser";

/**
 * Parses the given metric response based on the format of the given data.
 */
const parseResponseByFileFormat = (responseData, file, eagerExpand = true) => {
  const metricFile = responseData[file];

  // If it has the key flattenedValueMatrix, it's the optimized format.
  if (metricFile.flattenedValueMatrix && eagerExpand) {
    return expandMetricRepresentation(
      metricFile.flattenedValueMatrix,
      metricFile.metadata
    );
  }

  // If it's verbose json lines format that is ready to go, return that.
  // If it's the optimized format but we don't want to eagerly expand it to
  // the json lines format, return it unaltered for later processing.
  return metricFile;
};

/**
 * Parses the given metric responses which is assumed to have multiple metric files,
 * one per object key.
 */
const parseResponsesByFileFormat = (responseData, eagerExpand = true) => {
  const parsedResponses = {};
  const files = Object.keys(responseData);

  files.forEach((file) => {
    const parsedResponse = parseResponseByFileFormat(
      responseData,
      file,
      eagerExpand
    );
    parsedResponses[file] = parsedResponse;
  });

  return parsedResponses;
};

export { parseResponseByFileFormat, parseResponsesByFileFormat };

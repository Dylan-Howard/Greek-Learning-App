import fs from 'fs';
import { CsvData, DataFile, Row } from './types/types';

export const testCSV = (filePath: string, newLineChar: string) => {
  let csv: CsvData | undefined;

  try {
    csv = fs.readFileSync(filePath, 'utf8')
      .split(newLineChar)
      .map((row: string) => (
        row.split('","')
          .map((fld) => fld
            .replace('"', '')
            .replace('\r', ''))
      ));
  } catch (err: any) {
    // log(err);
    return undefined;
  }

  return csv;
};

export const readCSV = (filePath: string, delimiter: string, newLineChar: string) => {
  let csv: CsvData | undefined;

  try {
    csv = fs.readFileSync(filePath, 'utf8')
      .split(newLineChar)
      .map((row: string) => (
        row.split(delimiter)
          .map((fld) => fld.replace('"', '')
            .replace('\r', ''))
      ));
  } catch (err: any) {
    return undefined;
  }

  return csv;
};

export const fetchDataFile = (
  filePath: string,
  delimiter: string,
  newLineChar: string,
) : DataFile | undefined => {
  const csv = readCSV(filePath, delimiter, newLineChar);

  /* Guards from no CSV or less than 2 rows */
  if (!csv || csv.length < 2) { return undefined; }

  /** @TODO - Consider defining an object for each row rather than an array */
  /* const headers = csv[0]; */

  const data: Row[] = [];
  for (let i = 1; i < csv.length; i += 1) {
    data.push({
      index: i,
      uniqueIdentifier: csv[i][0],
      values: csv[i],
    });
  }

  return {
    fileName: filePath,
    headers: csv[0],
    rows: data,
  };
};

export const readJSON = (filePath: string) => {
  let json: string | undefined;

  try {
    json = fs.readFileSync(filePath, 'utf8');
  } catch (err: any) {
    return undefined;
  }

  return JSON.parse(json);
};

export const writeJSONToFile = (filePath: string, data: any) => {
  try {
    /* Clears the results file */
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    return false;
  }
  return true;
};

export default fetchDataFile;

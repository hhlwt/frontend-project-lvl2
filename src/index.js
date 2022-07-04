import fs from 'fs';
import getFormat from './getFormat.js';
import parseFiles from './parsers.js';
import chooseFormater from './formatters/index.js';
import buildTree from './buildTree.js';

export default (filePath1, filePath2, format) => {
  const [formatName1, formatName2] = [getFormat(filePath1), getFormat(filePath2)];
  const [fileContent1, fileContent2] = [fs.readFileSync(filePath1, 'utf-8'), fs.readFileSync(filePath2, 'utf-8')];
  const data1 = parseFiles(fileContent1, formatName1);
  const data2 = parseFiles(fileContent2, formatName2);

  const formattedDiff = chooseFormater(buildTree(data1, data2), format);
  return formattedDiff;
};

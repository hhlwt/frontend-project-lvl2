import _ from 'lodash';

const stylish = (tree, replacer = '  ', replacersCount = 2) => {
  const iter = (subTree, depth = 1) => {
    const indent = replacer.repeat(replacersCount * depth);
    const plusMinusIndent = replacer.repeat(replacersCount * depth - 1);
    const bracketIndent = replacer.repeat(replacersCount * depth - replacersCount);

    const stringifyValue = (value, level) => {
      if (_.isObject(value)) {
        return iter(Object.entries(value), level + 1);
      }
      return value;
    };

    const strings = subTree.map((node) => {
      switch (node.type) {
        case 'added':
          return `${plusMinusIndent}+ ${node.key}: ${stringifyValue(node.value, depth)}`;
        case 'removed':
          return `${plusMinusIndent}- ${node.key}: ${stringifyValue(node.value, depth)}`;
        case 'changed':
          return `${plusMinusIndent}- ${node.key}: ${stringifyValue(node.value1, depth)}\n${plusMinusIndent}+ ${node.key}: ${stringifyValue(node.value2, depth)}`;
        case 'unchanged':
          return `${indent}${node.key}: ${stringifyValue(node.value, depth)}`;
        case 'nested':
          return `${indent}${node.key}: ${iter(node.children, depth + 1)}`;
        default:
          return `${indent}${node[0]}: ${_.isObject(node[1]) ? iter(Object.entries(node[1]), depth + 1) : node[1]}`;
      }
    });
    return ['{', ...strings, `${bracketIndent}}`].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;

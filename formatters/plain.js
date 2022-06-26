import _ from 'lodash';

const plain = (tree) => {
  const iter = (node, path) => {
    const strings = node.flatMap((item) => {
      const newPath = `${path}.${item.key}`;
      const addedValue = _.isObject(item.value) ? '[complex value]' : item.value;
      const changedValue1 = _.isObject(item.value.value1) ? '[complex value]' : item.value.value1;
      const changedValue2 = _.isObject(item.value.value2) ? '[complex value]' : item.value.value2;
      switch (item.type) {
        case 'removed':
          return `Property '${newPath.slice(1)}' was removed`;
        case 'added':
          return `Property '${newPath.slice(1)}' was added with value: ${typeof addedValue === 'string' && addedValue !== '[complex value]' ? `'${addedValue}'` : `${addedValue}`}`;
        case 'changed':
          return `Property '${newPath.slice(1)}' was updated. From ${typeof changedValue1 === 'string' && changedValue1 !== '[complex value]' ? `'${changedValue1}'` : `${changedValue1}`} to ${typeof changedValue2 === 'string' && changedValue2 !== '[complex value]' ? `'${changedValue2}'` : `${changedValue2}`}`;
        case 'nested':
          return iter(item.value, newPath);
        default:
          return '';
      }
    });
    return strings;
  };
  return iter(tree, '').filter((string) => string).join('\n');
};

export default plain;

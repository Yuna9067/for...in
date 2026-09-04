import { orderByProps } from '../src/orderByProps.js';

describe('orderByProps', () => {
  test('should return sorted array of key-value objects', () => {
    const obj = { name: 'мечник', health: 10, level: 2, attack: 80, defence: 40 };
    const order = ['name', 'level'];
    const expected = [
      { key: 'name', value: 'мечник' },
      { key: 'level', value: 2 },
      { key: 'attack', value: 80 },
      { key: 'defence', value: 40 },
      { key: 'health', value: 10 }
    ];

    expect(orderByProps(obj, order)).toEqual(expected);
  });

  test('should handle empty object', () => {
    expect(orderByProps({}, [])).toEqual([]);
  });

  test('should handle empty order array', () => {
    const obj = { b: 2, a: 1, c: 3 };
    const expected = [
      { key: 'a', value: 1 },
      { key: 'b', value: 2 },
      { key: 'c', value: 3 }
    ];

    expect(orderByProps(obj, [])).toEqual(expected);
  });

  test('should handle all keys in order array', () => {
    const obj = { c: 3, a: 1, b: 2 };
    const order = ['b', 'c', 'a'];
    const expected = [
      { key: 'b', value: 2 },
      { key: 'c', value: 3 },
      { key: 'a', value: 1 }
    ];

    expect(orderByProps(obj, order)).toEqual(expected);
  });

  test('should handle object with one property', () => {
    const obj = { only: 'value' };
    const expected = [{ key: 'only', value: 'value' }];

    expect(orderByProps(obj, [])).toEqual(expected);
  });

  test('ignores inherited properties (hasOwnProperty branch)', () => {
    const proto = { inherited: 42 };
    const obj = Object.create(proto);
    obj.a = 1;
    obj.b = 2;

    const result = orderByProps(obj, []);

    expect(result).toEqual([
      { key: 'a', value: 1 },
      { key: 'b', value: 2 }
    ]);
  });

  test('splits keys into "in order" and "not in order"', () => {
    const obj = { x: 1, y: 2, z: 3 };
    const order = ['z'];

    const result = orderByProps(obj, order);

    expect(result).toEqual([
      { key: 'z', value: 3 },
      { key: 'x', value: 1 },
      { key: 'y', value: 2 }
    ]);
  });

  test('alphabetical sort uses all comparison branches', () => {
    const obj = { b: 2, a: 1, c: 3 };
    const result = orderByProps(obj, []);

    expect(result).toEqual([
      { key: 'a', value: 1 },
      { key: 'b', value: 2 },
      { key: 'c', value: 3 }
    ]);
  });
});
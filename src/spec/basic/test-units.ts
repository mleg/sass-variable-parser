export type UnitName =
  | 'withoutComments'
  | 'withComments'
  | 'indentedSass'
  | 'emptySassFile';

export interface TestUnit {
  title: string;
  name: UnitName;
  sass: string;
  variablesCount: number;
}

export const testUnits: TestUnit[] = [
  {
    name: 'withoutComments',
    title: 'sass without comments',
    sass:
      '$gray-base: #000 !default;\n$gray-darker: lighten($gray-base, 13.5%) !default; // #222\n$gray-dark: lighten($gray-base, 20%) !default;  // #333\n$gray:  lighten($gray-base, 33.5%) !default; // #555\n$gray-light:  lighten($gray-base, 46.7%) !default; // #777\n$gray-lighter:  lighten($gray-base, 93.5%) !default; // #eee',
    variablesCount: 6
  },
  {
    name: 'withComments',
    title: 'sass with comments',
    sass:
      "$one: 123;\n$x: $one;\n// $y: $two; // ERROR - $two not existed, but it's commented",
    variablesCount: 2
  },
  {
    name: 'indentedSass',
    title: 'indented sass',
    sass: '$one: 123\n$x: $one\n',
    variablesCount: 2
  },
  {
    name: 'emptySassFile',
    title: 'empty sass-file',
    sass: '',
    variablesCount: 0
  }
];

export function unitByName(name: UnitName): TestUnit | undefined {
  return testUnits.find(unit => unit.name === name);
}

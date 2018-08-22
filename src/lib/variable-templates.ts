export const sass = (name: string) => `
@if variable-exists('${name}')
  @if type-of($${name}) != map
    .${name}
      value: $${name}
  @else
    @each $key, $value in $${name}
      .${name}[is-map]
        #{$key}: "#{$value}"
`

export const scss = (name: string) => `
@if variable-exists('${name}') {
	@if type-of($${name}) != map {
	  .${name} {
		 value: $${name};
	  }
	} @else {
	  @each $key, $value in $${name} {
		 .${name}[is-map] {
			#{$key}: "#{$value}";
		 }
	  }
	}
 }
 `
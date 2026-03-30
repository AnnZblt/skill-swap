export function getBadgeColor(value: number | string): string {
  const first = String(value)[0];

  switch (first) {
    case '1':
      return 'var(--tag-business-color)';
    case '2':
      return 'var(--tag-languages-color)';
    case '3':
      return 'var(--tag-house-color)';
    case '4':
      return 'var(--tag-creation-color)';
    case '5':
      return 'var(--tag-education-color)';
    case '6':
      return 'var(--tag-health-color)';
    default:
      return 'var(--tag-plus-color)';
  }
}

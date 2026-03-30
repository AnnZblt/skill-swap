import { useRef, useState, useLayoutEffect } from 'react';

import type { TSubcategories } from '@/api/types';
import { Tag } from '@/shared/ui/tag';

type Props = {
  skills: TSubcategories[];
  maxWidth: number;
};

export const CompactTagsList = ({ skills, maxWidth }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleSkills, setVisibleSkills] = useState<typeof skills>([]);
  const [overflowTagsCount, setOverflowTagsCount] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const container = ref.current;
    const children = Array.from(container.children) as HTMLElement[];

    let totalWidth = 0;
    const fits: typeof skills = [];
    let overflowCount = skills.length;

    if (skills.length === 1) {
      fits.push(skills[0]);
      setVisibleSkills([skills[0]]);
      return;
    }

    for (let i = 0; i < children.length; i++) {
      const w = children[i].offsetWidth;

      if (totalWidth + w + 45 > maxWidth) break;

      totalWidth += w;
      fits.push(skills[i]);
      overflowCount--;
    }

    // ----- ЛОГИКА 4 -----
    // Если первый не влез, обрезаем только его
    if (fits.length === 0 && skills.length > 1) {
      setVisibleSkills([skills[0]]);
      setOverflowTagsCount(skills.length - 1);
      return;
    }

    // ----- ЛОГИКА 3 -----
    setVisibleSkills(fits);
    setOverflowTagsCount(overflowCount);
  }, [skills, maxWidth]);

  return (
    <div
      ref={ref}
      style={{
        maxWidth,
        display: 'flex',
        gap: '4px',
        overflow: 'hidden'
      }}
    >
      {skills.map((skill) => (
        <div
          key={skill.subcategoryId}
          style={{
            position: 'absolute',
            visibility: 'hidden',
            whiteSpace: 'nowrap'
          }}
        >
          <Tag id={skill.subcategoryId} title={skill.title} overflowEllipsis />
        </div>
      ))}

      {visibleSkills.map((skill) => (
        <Tag
          key={skill.subcategoryId}
          id={skill.subcategoryId}
          title={skill.title}
          overflowEllipsis
        />
      ))}

      {overflowTagsCount > 0 && <Tag id={-1} title={`+${overflowTagsCount}`} />}
    </div>
  );
};

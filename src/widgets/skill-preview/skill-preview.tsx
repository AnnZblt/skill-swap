import { useEffect, useState } from 'react';
import { useSelector } from '@/app/store/store';
import { categoriesList } from '@/entities/categories/categories-slice';
import { pickCategory } from '@/utils/pick-categories';
import { Modal } from '@/shared/ui/modal';
import { DetailedSkill } from '@/widgets/skill-detailed';
import styles from './skill-preview.module.scss';
import type { SkillPreviewProps } from './types';

export const SkillPreviewModal = ({
  formData,
  onClose,
  onEdit,
  onConfirm
}: SkillPreviewProps) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const allCategories = useSelector(categoriesList);
  const categoryTitle = pickCategory(
    allCategories,
    formData.categoryId,
    formData.subcategoryId
  );

  useEffect(() => {
    if (formData.images?.length) {
      const urls = formData.images.map((file) => URL.createObjectURL(file));
      setPreviews(urls);
      return () => urls.forEach((url) => URL.revokeObjectURL(url));
    }
  }, [formData.images]);

  return (
    <Modal
      onClose={onClose}
      title='Ваше предложение'
      description='Пожалуйста, проверьте и подтвердите правильность данных'
      mode='dialog'
      zIndex={20}
    >
      <div className={styles.modalContent}>
        <DetailedSkill
          name={formData.skillName}
          category={categoryTitle!.categoryTitle}
          subcategory={categoryTitle!.subcategoryTitle}
          description={formData.description}
          gallery={previews}
          variant='preview'
          onSubmit={onConfirm}
          onEdit={onEdit}
        />
      </div>
    </Modal>
  );
};

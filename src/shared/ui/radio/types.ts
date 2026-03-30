export type TRadioProps = {
  value: string; // возвращаемое значение
  title: string; // текст label
  groupName: string; // название группы кнопок
  checked?: boolean; // выбранное состояние
  onChange?: () => void; // событие изменения
};

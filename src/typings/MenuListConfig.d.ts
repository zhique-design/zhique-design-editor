interface menuItemConfig {
  title: string;
  icon?: string;
  text?: string;
  // @ts-ignore
  onClick: (event: MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

export type MenuListConfig = Array<menuItemConfig | '|'>;

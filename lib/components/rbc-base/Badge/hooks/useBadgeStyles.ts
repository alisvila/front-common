import { BadgeProps } from "../Badge";

export type BadgeColorsType = 'primary' | 'red' | 'green' 

function useBadgeStyles({color = 'primary'}: Partial<BadgeProps>) {

  const badgeStylesColors: Record<BadgeColorsType, string> = {
    'primary': 'rbc-text-primary  rbc-bg-primary-50 rbc-border rbc-border-primary-200 rbc-text-[11.24px]',
    'green': 'rbc-text-green-500 rbc-bg-green-50 rbc-border rbc-border-green-200 rbc-text-[11.24px]',
    'red': 'rbc-text-red-500 rbc-bg-red-50 rbc-border rbc-border-red-200 rbc-text-[11.24px]',
   
  }

  const badgeStyles = {
    color: badgeStylesColors[color]
  }

  return {badgeStyles}
}

export default useBadgeStyles;
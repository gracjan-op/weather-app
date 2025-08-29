import type { SVGProps } from 'react';

interface PressureIconProps extends SVGProps<globalThis.SVGSVGElement> {
  className?: string;
}

const PressureIcon = ({ className = '', ...props }: PressureIconProps) => {
  return (
    <svg
      width='800px'
      height='800px'
      viewBox='0 0 508 508'
      className={className}
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M508,254c0,70.8-28.8,134.4-75.2,180.4C386.8,480,323.6,508,254,508s-132.8-28-178.8-73.6C28.8,388.4,0,324.8,0,254C0,113.6,113.6,0,254,0S508,113.6,508,254z'
        fill='#FFD05B'
      />
      <circle cx='254' cy='254' r='175.2' fill='#2B3B4E' />
      <circle cx='254' cy='254' r='139.6' fill='#324A5E' />
      <rect x='250.4' y='127.6' width='7.2' height='36.4' fill='#FFFFFF' />
      <circle cx='254' cy='316' r='28.8' fill='#ACB3BA' />
      <path
        d='M293.6,202.8c0.8-2.4-0.8-4.8-3.2-5.6c-2.4-0.8-5.2,0.4-6,2.8l-48.8,144.4v0.4c-1.6,5.2,1.2,10.8,6.4,12c5.2,1.2,10.4-1.6,11.6-6.8L293.6,202.8z'
        fill='#FFFFFF'
      />
    </svg>
  );
};

export default PressureIcon;

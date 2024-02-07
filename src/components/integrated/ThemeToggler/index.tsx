'use client';
import React, { useContext } from 'react';
import { Button } from '@/components/core/Button';
import { TbSunLow, TbMoonStars } from 'react-icons/tb';
import { ThemeContext, ThemeContextType } from '../ThemeProvider';

// interface ThemeContextType {
//   dark: boolean;
//   toggleTheme: () => void;
// }

export default function ThemeToggleButton() {
  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <Button
      className="px-2"
      variant={!dark ? 'warning' : 'secondary'}
      onClick={toggleTheme}
    >
      {!dark ? <TbSunLow size={20} /> : <TbMoonStars size={20} color="white" />}
    </Button>
  );
}

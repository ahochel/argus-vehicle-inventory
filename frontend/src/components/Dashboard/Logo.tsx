import React from 'react';
import { ColorScheme } from '@mantine/core';
import { TruckReturn } from 'tabler-icons-react';

export function Logo({ colorScheme }: { colorScheme: ColorScheme }) {
  const color = colorScheme === 'dark' ? '#fff' : '#000';
  return (
    <>
      <TruckReturn size={36} strokeWidth={2} color={color} />
      <strong style={{ color }}>Vehicle Inventory</strong>
    </>
  );
}

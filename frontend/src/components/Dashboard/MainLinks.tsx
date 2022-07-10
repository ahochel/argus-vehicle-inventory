import React from 'react';
import { CarCrane, Map2, Users, Logout } from 'tabler-icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
}

function MainLink({ icon, color, label }: MainLinkProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  { icon: <Map2 size={16} />, color: 'teal', label: 'Map' },
  { icon: <CarCrane size={16} />, color: 'blue', label: 'Inventory' },
  { icon: <Users size={16} />, color: 'violet', label: 'Users' },
  { icon: <Logout size={16} />, color: 'grape', label: 'Logout' },
];

export function MainLinks() {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}

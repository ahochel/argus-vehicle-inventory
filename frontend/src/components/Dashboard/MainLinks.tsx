import React from 'react';
import { CarCrane, Map2 } from 'tabler-icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { Link, useMatch } from 'react-router-dom';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  to: string;
}

function MainLink({ icon, color, label, to }: MainLinkProps) {
  const match = useMatch({
    path: to,
    end: true,
  });

  return (
    <UnstyledButton
      to={to}
      component={Link}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        [match ? '&' : '&:hover']: {
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
  { to: '/', icon: <Map2 size={16} />, color: 'teal', label: 'Map' },
  {
    to: '/vehicles',
    icon: <CarCrane size={16} />,
    color: 'blue',
    label: 'Vehicles',
  },
];

export function MainLinks() {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}

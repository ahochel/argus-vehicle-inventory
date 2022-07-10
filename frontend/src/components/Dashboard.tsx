import React from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Group,
  ActionIcon,
  useMantineColorScheme,
} from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MoonStars, Sun } from 'tabler-icons-react';
import { Logo } from './Dashboard/Logo';
import { MainLinks } from './Dashboard/MainLinks';
import { User } from './Dashboard/User';
import Map from './Dashboard/pages/Map';
import Vehicles from './Dashboard/pages/Vehicles';

function Dashboard() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <BrowserRouter>
      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 300 }} height={500} p="xs">
            <Navbar.Section grow mt="xs">
              <MainLinks />
            </Navbar.Section>
            <Navbar.Section>
              <User />
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={60}>
            <Group sx={{ height: '100%' }} px={20} position="apart">
              <Logo colorScheme={colorScheme} />
              <ActionIcon
                variant="default"
                onClick={() => toggleColorScheme()}
                size={30}
              >
                {colorScheme === 'dark' ? (
                  <Sun size={16} />
                ) : (
                  <MoonStars size={16} />
                )}
              </ActionIcon>
            </Group>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <Routes>
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/" element={<Map />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default Dashboard;

import { useMantineColorScheme, useMantineTheme, Switch, rem, Tooltip, Paper } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return (
    <center>
    <Tooltip
      label={colorScheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      position="bottom"
      withArrow
      withinPortal
    >   
    <Paper>
      <Switch
        size="lg"
        color="dark.4"
        onLabel={sunIcon}
        offLabel={moonIcon}
        checked={colorScheme === 'dark'}
        onChange={() => toggleColorScheme()}
      />
      </Paper>
    </Tooltip>
    </center>
  );
}

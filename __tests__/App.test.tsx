import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import App, { getGreeting } from '../App';

describe('App Initialization', () => {
  it('renders the greeting after initialization', async () => {
    const { findByText } = render(<App />);

    expect(await findByText(getGreeting())).toBeTruthy();
  });

  it('displays all five bottom tabs', async () => {
    const { findByLabelText } = render(<App />);

    for (const tab of ['Inicio', 'Calendario', 'Proyectos', 'IA', 'Ajustes']) {
      expect(await findByLabelText(`Pestaña ${tab}`)).toBeTruthy();
    }
  });

  it('marks the Home tab as selected', async () => {
    const { findByLabelText } = render(<App />);
    const homeTab = await findByLabelText('Pestaña Inicio');

    expect(homeTab.props.accessibilityState).toEqual({ selected: true });
  });

  it('renders the Home content by default', async () => {
    const { findByText } = render(<App />);

    expect(await findByText('Tareas de hoy')).toBeTruthy();
  });

  it('provides the action for creating a task', async () => {
    const { findByLabelText } = render(<App />);

    expect(await findByLabelText('Añadir nueva tarea')).toBeTruthy();
  });

  it('uses the morning greeting before noon', () => {
    expect(getGreeting(new Date(2026, 5, 13, 8))).toBe('Buenos días');
  });

  it('uses the afternoon greeting before 19:00', () => {
    expect(getGreeting(new Date(2026, 5, 13, 15))).toBe('Buenas tardes');
  });

  it('uses the evening greeting from 19:00', () => {
    expect(getGreeting(new Date(2026, 5, 13, 21))).toBe('Buenas noches');
  });
});

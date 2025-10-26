import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('@iconify/react', () => ({
  Icon: () => null
}));

test('renders footer branding', () => {
  render(<App />);
  const branding = screen.getAllByText(/jy\./i);
  expect(branding.length).toBeGreaterThan(0);
});

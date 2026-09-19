import { render, screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('photography journal', () => {
  it('shows all sixteen photographs and working section destinations', () => {
    render(<App />);
    expect(screen.getAllByRole('button', { name: /^View / })).toHaveLength(16);
    for (const link of document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) expect(document.querySelector(link.hash)).not.toBeNull();
  });
  it('filters photographs and restores the complete collection', async () => {
    const user = userEvent.setup(); render(<App />);
    await user.click(screen.getByRole('button', { name: 'After dark' }));
    expect(screen.getAllByRole('button', { name: /^View / })).toHaveLength(4);
    expect(screen.getByRole('status')).toHaveTextContent('04 PHOTOGRAPHS');
    await user.click(screen.getByRole('button', { name: 'All photographs' }));
    expect(screen.getAllByRole('button', { name: /^View / })).toHaveLength(16);
  });
  it('opens, navigates, wraps, and closes the viewer with scroll cleanup', async () => {
    const user = userEvent.setup(); render(<App />);
    await user.click(screen.getByRole('button', { name: 'View A quiet kind of morning' }));
    const viewer = screen.getByRole('dialog');
    expect(document.body.style.overflow).toBe('hidden');
    await user.click(within(viewer).getByRole('button', { name: 'Previous photograph' }));
    expect(within(viewer).getByRole('heading')).toHaveTextContent('A city in motion');
    fireEvent.keyDown(viewer, { key: 'ArrowRight' });
    expect(within(viewer).getByRole('heading')).toHaveTextContent('A quiet kind of morning');
    await user.click(within(viewer).getByRole('button', { name: 'Close photograph viewer' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });
  it('supports native Escape cancellation', async () => {
    const user = userEvent.setup(); render(<App />);
    await user.click(screen.getByRole('button', { name: 'View The golden hour' }));
    fireEvent(screen.getByRole('dialog'), new Event('cancel'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });
});

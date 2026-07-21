import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { CompareTable } from '../components/Compare/CompareTable';
import { carsData } from '../data/brands';

const [carA, carB] = carsData;

describe('<CompareTable />', () => {
  it('renders the selected cars side by side', () => {
    render(<CompareTable cars={[carA, carB]} onRemove={() => {}} />);
    expect(screen.getAllByText(carA.brand).length).toBeGreaterThan(0);
    expect(screen.getAllByText(carB.brand).length).toBeGreaterThan(0);
  });

  it('shows an empty state when there are no cars', () => {
    render(<CompareTable cars={[]} onRemove={() => {}} />);
    expect(screen.getByText(/Sin vehículos para comparar/i)).toBeInTheDocument();
  });

  it('calls onRemove with the car id when the remove button is clicked', () => {
    const onRemove = vi.fn();
    render(<CompareTable cars={[carA, carB]} onRemove={onRemove} />);
    const removeButton = screen.getByLabelText(
      new RegExp(`Quitar ${carA.brand} ${carA.model}`, 'i')
    );
    removeButton.click();
    expect(onRemove).toHaveBeenCalledWith(carA.id);
  });

  it('renders the diff toggle button', () => {
    render(<CompareTable cars={[carA, carB]} onRemove={() => {}} />);
    expect(
      screen.getByRole('button', { name: /Resaltar diferencias/i })
    ).toBeInTheDocument();
  });
});

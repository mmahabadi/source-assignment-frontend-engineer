import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { Cultivations } from '../cultivations';

jest.mock('../cultivation-list', () => ({
  CultivationList: () => <div>Cultivation List Component</div>,
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  Outlet: () => <div>Outlet Component</div>,
}));

describe('Cultivations Component', () => {
  it('renders correctly', () => {
    render(<Cultivations />);

    expect(screen.getByText('Cultivations')).toBeTruthy();
    expect(screen.getByText('Manage cultivations')).toBeTruthy();
    expect(screen.getByText('Add new')).toBeTruthy();
    expect(screen.getByText('Cultivation List Component')).toBeTruthy();
    expect(screen.getByText('Outlet Component')).toBeTruthy();
  });

  it('navigates to new cultivation on button click', () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(<Cultivations />);

    fireEvent.click(screen.getByText('Add new'));
    expect(navigate).toHaveBeenCalledWith('new', { relative: 'path' });
  });
});

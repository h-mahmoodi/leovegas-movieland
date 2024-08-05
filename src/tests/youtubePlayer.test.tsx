import { render, screen } from '@testing-library/react';
import YoutubePlayer from '../components/ui/YoutubePlayer';

describe('youtube component', () => {
  it('render with videoKey', async () => {
    render(<YoutubePlayer videoKey="LY19rHKAaAg" />);

    const youtubePlayerElement = await screen.findByTestId('youtube-player');
    expect(youtubePlayerElement).toBeInTheDocument();
  });
});

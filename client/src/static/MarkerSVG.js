import { darkModeToggle } from '../utils/preferences';

const MarkerSVG = ({ viewport, altStroke }) => (
  <svg
    style={{
      width: `${6 * viewport.zoom}px`,
      height: `${6 * viewport.zoom}px`,
      transform: 'translate(-50%, -100%)',
      stroke: altStroke
        ? darkModeToggle
          ? '#ffc190'
          : '#086d74'
        : darkModeToggle
        ? 'aliceblue'
        : '#111111',
    }}
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

export default MarkerSVG;

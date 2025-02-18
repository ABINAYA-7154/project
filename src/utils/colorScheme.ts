interface ColorScheme {
  background: string;
  text: string;
}

export const getNotificationColors = (type: string): ColorScheme => {
  switch (type) {
    case 'speed':
      return { background: 'bg-red-100', text: 'text-red-800' };
    case 'fuel':
      return { background: 'bg-orange-100', text: 'text-orange-800' };
    case 'license':
      return { background: 'bg-blue-100', text: 'text-blue-800' };
    case 'bus':
      return { background: 'bg-green-100', text: 'text-green-800' };
    default:
      return { background: 'bg-gray-100', text: 'text-gray-800' };
  }
};
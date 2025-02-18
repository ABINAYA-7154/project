export const formatBusNumber = (number: number): string => 
  `KA01F${String(number).padStart(4, '0')}`;

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
import React from 'react';
import { MessageSquare, Star } from 'lucide-react';

export default function FeedbackReview() {
  // Updated feedback data with realistic scenarios
  const feedbackData = [
    {
      id: 1,
      student: 'Priya Sharma',
      message: 'Bus KA01F3322 driver is very punctual and professional. Great service!',
      rating: 5,
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 2,
      student: 'Rahul Patel',
      message: 'The new route timing works much better for my schedule. Thank you for the adjustment.',
      rating: 5,
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0]
    },
    {
      id: 3,
      student: 'Ananya Singh',
      message: 'Bus was delayed by 15 minutes today due to traffic. Better route planning needed.',
      rating: 3,
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0]
    }
  ];

  // Rest of the component remains exactly the same
}
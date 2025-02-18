import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';

interface ReviewFormData {
  driverRating: number;
  punctualityRating: number;
  comment: string;
}

export default function StudentReview() {
  const [formData, setFormData] = useState<ReviewFormData>({
    driverRating: 0,
    punctualityRating: 0,
    comment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle review submission
    console.log('Review submitted:', formData);
    // Reset form
    setFormData({ driverRating: 0, punctualityRating: 0, comment: '' });
  };

  const StarRating = ({ value, onChange }: { value: number; onChange: (rating: number) => void }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`focus:outline-none ${
            star <= value ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          <Star className="w-6 h-6 fill-current" />
        </button>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transform transition-all hover:shadow-lg">
      <div className="flex items-center space-x-2 mb-6">
        <MessageSquare className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Service Review</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Driver Behavior
            </label>
            <StarRating
              value={formData.driverRating}
              onChange={(rating) => setFormData(prev => ({ ...prev, driverRating: rating }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Punctuality
            </label>
            <StarRating
              value={formData.punctualityRating}
              onChange={(rating) => setFormData(prev => ({ ...prev, punctualityRating: rating }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Comments
            </label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Share your experience..."
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
        >
          <ThumbsUp className="w-5 h-5" />
          <span>Submit Review</span>
        </button>
      </form>
    </div>
  );
}
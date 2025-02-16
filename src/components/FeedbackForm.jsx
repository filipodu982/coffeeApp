import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import emailjs from '@emailjs/browser';

const FeedbackForm = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setSending(true);

    // Prepare the feedback data
    const templateParams = {
      rating: rating,
      comment: comment,
      timestamp: new Date().toLocaleString(),
    };

    try {
      await emailjs.send(
        'service_d7jz7b2',  // Replace with your EmailJS service ID
        'template_mg0qk6k', // Replace with your EmailJS template ID
        templateParams,
        'pGU_XLHOBp29W-sFz'   // Replace with your EmailJS public key
      );

      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setError('Failed to send feedback. Please try again later.');
      console.error('Failed to send feedback:', error);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <Alert>
            <AlertDescription>
              Thank you for your feedback! We appreciate your input.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">We Value Your Feedback</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              How would you rate your experience?
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="p-1 focus:outline-none"
                  disabled={sending}
                >
                  <Star
                    className={`w-8 h-8 ${
                      value <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-none text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              What could we improve?
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Share your thoughts..."
              disabled={sending}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              disabled={sending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              disabled={sending}
            >
              {sending ? 'Sending...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
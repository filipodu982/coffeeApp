// src/utils/feedbackStorage.js

class FeedbackStorage {
    constructor() {
      this.storageKey = 'feedbacks';
    }
  
    saveFeedback(feedback) {
      const feedbacks = this.getAllFeedback();
      feedbacks.push({
        ...feedback,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      });
      localStorage.setItem(this.storageKey, JSON.stringify(feedbacks));
      return feedback;
    }
  
    getAllFeedback() {
      const feedbackJson = localStorage.getItem(this.storageKey);
      return feedbackJson ? JSON.parse(feedbackJson) : [];
    }
  
    getAverageRating() {
      const feedbacks = this.getAllFeedback();
      if (feedbacks.length === 0) return 0;
      
      const sum = feedbacks.reduce((acc, curr) => acc + curr.rating, 0);
      return (sum / feedbacks.length).toFixed(1);
    }
  
    clearAllFeedback() {
      localStorage.removeItem(this.storageKey);
    }
  }
  
  export const feedbackStorage = new FeedbackStorage();
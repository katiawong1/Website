import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

interface Review {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface PlaceDetails {
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: Review[];
}

interface GoogleReviewsProps {
  placeId?: string;
  className?: string;
}

const GoogleReviews = ({ placeId, className = "" }: GoogleReviewsProps) => {
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!placeId) {
      setError('Place ID is required');
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews/${encodeURIComponent(placeId)}`);
        const result = await response.json();

        if (result.success) {
          setPlaceDetails(result.data);
        } else {
          // Fallback to real reviews from Google Business Profile
          const mockPlaceDetails: PlaceDetails = {
            name: "EW CPA Tax & Bookkeeping LLC",
            rating: 5.0,
            user_ratings_total: 33,
            reviews: [
              {
                author_name: "R.R.",
                language: "en",
                profile_photo_url: "",
                rating: 5,
                relative_time_description: "4 months ago",
                text: "Katia is very patient in responding all your queries, she has extensive knowledge and experience on any type of Tax queries, she also has a good knowledge on various Visa types and how the tax system works for different Visas. During my tax preparation, she provided detailed explanations and made the process smooth.",
                time: Date.now() - 120 * 24 * 60 * 60 * 1000,
              },
              {
                author_name: "A.M.",
                language: "en",
                profile_photo_url: "",
                rating: 5,
                relative_time_description: "5 months ago",
                text: "I've been filing my taxes with Ekaterina's assistance for several years, and she has consistently done an excellent job. Her work is thorough, reliable, and I've never encountered any issues throughout the process.",
                time: Date.now() - 150 * 24 * 60 * 60 * 1000,
              },
              {
                author_name: "M.A.",
                language: "en",
                profile_photo_url: "",
                rating: 5,
                relative_time_description: "4 months ago",
                text: "I had a great experience working with Katia! She was professional, knowledgeable, and made the entire process easy to understand. We communicated entirely online, and everything was super easy and smooth. Highly recommend her services!",
                time: Date.now() - 120 * 24 * 60 * 60 * 1000,
              },
              {
                author_name: "R.G.",
                language: "en",
                profile_photo_url: "",
                rating: 5,
                relative_time_description: "5 months ago",
                text: "I have worked with several CPAs but Katia outshines them all BY MILES. She is responsive, helpful, and really gets into all the details to make sure she's got my correct information. Her software system is easy to use and thanks to her expertise, my tax process is seamless.",
                time: Date.now() - 150 * 24 * 60 * 60 * 1000,
              }
            ]
          };
          setPlaceDetails(mockPlaceDetails);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews');
        setLoading(false);
      }
    };

    fetchReviews();
  }, [placeId]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card-professional">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/6"></div>
                  <div className="space-y-1">
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !placeDetails) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-muted-foreground">Unable to load reviews at this time.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Overall rating header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="flex space-x-1">
            {renderStars(Math.floor(placeDetails.rating))}
          </div>
          <span className="text-2xl font-bold">{placeDetails.rating}</span>
        </div>
        <p className="text-muted-foreground">
          Based on {placeDetails.user_ratings_total} Google reviews
        </p>
      </div>

      {/* Reviews grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {placeDetails.reviews.map((review, index) => (
          <div key={index} className="card-professional hover-lift">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-semibold text-lg">
                {review.author_name}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground truncate">
                    {review.author_name}
                  </h4>
                  <span className="text-sm text-muted-foreground whitespace-nowrap ml-2">
                    {review.relative_time_description}
                  </span>
                </div>
                
                <div className="flex items-center space-x-1 mb-3">
                  {renderStars(review.rating)}
                </div>
                
                <div className="relative">
                  <Quote className="absolute -top-1 -left-1 h-4 w-4 text-accent/30" />
                  <p className="text-muted-foreground leading-relaxed pl-4">
                    {review.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Google attribution */}
      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          <a 
            href="https://www.google.com/search?sca_esv=465159d7bf2b0b64&rlz=1C5CHFA_enAE1045AE1045&sxsrf=AE3TifNa5t_UHsIgvvuRZGrBvxy09aKdWA:1756402173590&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-EyNsC09lEws62ukhsD3m-bSDAmjv83HnGX4MlVkbFqaseyyYQgw2PiJpA6_mvqbfBcW9pgQKldwsvPZor7oQwgYSRqnTAlwBI8Hfs2LSZa743y-aog%3D%3D&q=EW+CPA+Tax+%26+Bookkeeping+LLC+Reviews&sa=X&ved=2ahUKEwj41I79g66PAxXrmWoFHcycBCcQ0bkNegQIOxAD&biw=1571&bih=793&dpr=2.2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline font-medium"
          >
            See more reviews on Google →
          </a>
        </p>
      </div>
    </div>
  );
};

export default GoogleReviews;

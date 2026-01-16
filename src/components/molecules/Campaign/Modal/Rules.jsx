import { useState, useEffect } from 'react';
import { FETCH_CAMPAIGN } from '@/store/campaign';
import Star from '@/assets/icons/star.png';

const Rules = () => {
  const [rules, setRules] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchRules = async () => {
    try {
      setLoading(true);
      const data = await FETCH_CAMPAIGN();
      setRules(data?.campaigns?.description || '');
    } catch (error) {
      console.error('Error fetching rules:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRules();
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <img
            src={Star}
            alt="Loading"
            className="w-14 h-14 animate-spin"
          />
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: rules }} />
      )}
    </>
  );
};

export default Rules;


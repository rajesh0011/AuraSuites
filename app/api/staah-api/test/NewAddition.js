// app/sliders/NewAddition.js (SERVER COMPONENT)

import NewaddSlider from './NewAdditionSlider';
const API_BASE_URL_Home = process.env.NEXT_PUBLIC_API_BASE_URL_Home;

export default async function NewAddition() {
  let newhotel = [];

  try {
    const res = await fetch(`${API_BASE_URL_Home}/getNewHotelslist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ s_slug: 'safaris' }),
       next: { revalidate: 60 }, // 👈 cache & revalidate every 60s
    });

    const data = await res.json();

    if (data.status) {
      newhotel = data.data;
    } else {
      console.error('API responded with error:', data.message);
    }
  } catch (error) {
    console.error('Server error:', error);
  }

  return (
    <div className="container mt-4">
      <NewaddSlider newhotel={newhotel} />
    </div>
  );
}
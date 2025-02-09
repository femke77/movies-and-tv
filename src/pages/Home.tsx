import ItemCard from '../components/ItemCard';
import SwiperElement from '../components/Swiper';

const mockMovie = {
  
    "adult": false,
    "backdrop_path": "/xZm5YUNY3PlYD1Q4k7X8zd2V4AK.jpg",
    "genre_ids": [
      28,
      35
    ],
    "id": 993710,
    "original_language": "en",
    "original_title": "Back in Action",
    "overview": "Fifteen years after vanishing from the CIA to start a family, elite spies Matt and Emily jump back into the world of espionage when their cover is blown.",
    "popularity": 1312.816,
    "poster_path": "/3L3l6LsiLGHkTG4RFB2aBA6BttB.jpg",
    "release_date": "2025-01-15",
    "title": "Back in Action",
    "video": false,
    "vote_average": 6.642,
    "vote_count": 795
  
}
const Home = () => {
  return (
    <>
      <SwiperElement />
      <ItemCard item={mockMovie}/>
      </>);
};

export default Home;
